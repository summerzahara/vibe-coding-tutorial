import Papa from "papaparse";
import * as XLSX from "xlsx";

export type ColumnType = "date" | "number" | "category" | "text";

export interface DetectedColumn {
  name: string;
  type: ColumnType;
  uniqueCount: number;
}

export type ParsedRow = Record<string, string | number | null>;

export interface ParsedDataset {
  fileName: string;
  columns: DetectedColumn[];
  rows: ParsedRow[];
  dateColumn: string | null;
  numericColumns: string[];
  categoryColumns: string[];
}

function looksLikeDate(value: string): boolean {
  if (!value || value.length < 6) return false;
  const d = new Date(value);
  return !isNaN(d.getTime()) && value.match(/\d{4}|\d{1,2}[\/\-]\d{1,2}/) !== null;
}

function detectType(values: string[], colName: string): ColumnType {
  const nonEmpty = values.filter((v) => v !== "" && v != null);
  if (nonEmpty.length === 0) return "text";

  // Date check — sample first 20 non-empty values
  const sample = nonEmpty.slice(0, 20);
  const dateLike = sample.filter(looksLikeDate).length;
  if (dateLike / sample.length >= 0.7) return "date";

  // Number check
  const numLike = sample.filter((v) => !isNaN(Number(v.replace(/[$,%]/g, "")))).length;
  if (numLike / sample.length >= 0.8) return "number";

  // Category vs free text — low cardinality = category
  const unique = new Set(values).size;
  if (unique <= Math.min(30, values.length * 0.5)) return "category";

  return "text";
}

function coerceValue(raw: string, type: ColumnType): string | number | null {
  if (raw === "" || raw == null) return null;
  if (type === "number") {
    const n = Number(raw.replace(/[$,%]/g, ""));
    return isNaN(n) ? null : n;
  }
  if (type === "date") {
    // Normalize to YYYY-MM-DD string for sorting
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
  }
  return raw;
}

function buildDataset(fileName: string, rawRows: Record<string, string>[]): ParsedDataset {
  if (rawRows.length === 0) {
    return { fileName, columns: [], rows: [], dateColumn: null, numericColumns: [], categoryColumns: [] };
  }

  const colNames = Object.keys(rawRows[0]);
  const columns: DetectedColumn[] = colNames.map((name) => {
    const vals = rawRows.map((r) => r[name] ?? "");
    const type = detectType(vals, name);
    const unique = new Set(vals.filter(Boolean)).size;
    return { name, type, uniqueCount: unique };
  });

  const rows: ParsedRow[] = rawRows.map((raw) =>
    Object.fromEntries(
      columns.map((col) => [col.name, coerceValue(raw[col.name] ?? "", col.type)])
    )
  );

  // Pick best date column: first detected, or column named "date"
  const dateColumns = columns.filter((c) => c.type === "date");
  const dateColumn =
    dateColumns.find((c) => /^date$/i.test(c.name))?.name ??
    dateColumns[0]?.name ??
    null;

  const numericColumns = columns.filter((c) => c.type === "number").map((c) => c.name);
  const categoryColumns = columns.filter((c) => c.type === "category").map((c) => c.name);

  return { fileName, columns, rows, dateColumn, numericColumns, categoryColumns };
}

export async function parseFile(file: File): Promise<ParsedDataset> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "xlsx" || ext === "xls" || ext === "ods") {
    return parseExcel(file);
  }
  return parseCSVFile(file);
}

function parseCSVFile(file: File): Promise<ParsedDataset> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(buildDataset(file.name, results.data)),
      error: reject,
    });
  });
}

async function parseExcel(file: File): Promise<ParsedDataset> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: "array", cellDates: false });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, {
    defval: "",
    raw: false,
  });
  return buildDataset(file.name, rawRows);
}

// ── Computed helpers for dynamic dashboard ────────────────────────────────────

export interface DynKPI {
  label: string;
  value: string;
  sub?: string;
}

export function computeDynKPIs(dataset: ParsedDataset): DynKPI[] {
  const kpis: DynKPI[] = [{ label: "Total Rows", value: dataset.rows.length.toLocaleString() }];

  dataset.numericColumns.slice(0, 4).forEach((col) => {
    const vals = dataset.rows.map((r) => r[col]).filter((v): v is number => typeof v === "number");
    const sum = vals.reduce((a, b) => a + b, 0);
    const avg = vals.length ? sum / vals.length : 0;
    const isMonetary = /price|revenue|sale|amount|cost|total/i.test(col);
    const fmt = (n: number) => isMonetary ? `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : n.toLocaleString("en-US", { maximumFractionDigits: 1 });
    kpis.push({ label: col, value: fmt(sum), sub: `avg ${fmt(avg)}` });
  });

  return kpis;
}

export interface DynTimeSeries {
  date: string;
  [key: string]: string | number;
}

export function computeTimeSeries(dataset: ParsedDataset): { data: DynTimeSeries[]; valueKey: string } | null {
  if (!dataset.dateColumn || dataset.numericColumns.length === 0) return null;

  const dateCol = dataset.dateColumn;
  const valueKey = dataset.numericColumns[0];

  const byDate: Record<string, number> = {};
  dataset.rows.forEach((r) => {
    const d = r[dateCol];
    if (!d || typeof d !== "string") return;
    const v = r[valueKey];
    byDate[d] = (byDate[d] ?? 0) + (typeof v === "number" ? v : 0);
  });

  const data = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([rawDate, val]) => {
      const d = new Date(rawDate + "T00:00:00");
      const label = isNaN(d.getTime())
        ? rawDate
        : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return { date: label, [valueKey]: Math.round(val * 100) / 100 };
    });

  return data.length >= 2 ? { data, valueKey } : null;
}

export interface DynBarItem {
  name: string;
  value: number;
}

export function computeBarData(dataset: ParsedDataset, catCol: string, valueCol?: string): DynBarItem[] {
  const map: Record<string, number> = {};
  dataset.rows.forEach((r) => {
    const name = String(r[catCol] ?? "—");
    if (!name || name === "null") return;
    const v = valueCol ? (typeof r[valueCol] === "number" ? (r[valueCol] as number) : 0) : 1;
    map[name] = (map[name] ?? 0) + v;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }));
}
