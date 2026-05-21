"use client";

import { useMemo } from "react";
import {
  ParsedDataset,
  computeDynKPIs,
  computeTimeSeries,
  computeBarData,
} from "@/lib/parse-upload";
import { KpiCard } from "./kpi-card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  dataset: ParsedDataset;
}

const ACCENT_COLORS = ["bg-[#e8f5f1] border-[#a4d4c5]/60", "bg-white", "bg-white", "bg-[#fdf5dc] border-[#e8b94a]/40"];

export function DynamicDashboard({ dataset }: Props) {
  const kpis = useMemo(() => computeDynKPIs(dataset), [dataset]);
  const timeSeries = useMemo(() => computeTimeSeries(dataset), [dataset]);
  const barData = useMemo(() => {
    const catCol = dataset.categoryColumns[0];
    if (!catCol) return null;
    const valueCol = dataset.numericColumns[0];
    return {
      catCol,
      valueCol,
      data: computeBarData(dataset, catCol, valueCol),
      isMonetary: valueCol ? /price|revenue|sale|amount|cost|total/i.test(valueCol) : false,
    };
  }, [dataset]);

  const bar2Data = useMemo(() => {
    const catCol = dataset.categoryColumns[1];
    if (!catCol) return null;
    const valueCol = dataset.numericColumns[0];
    return {
      catCol,
      data: computeBarData(dataset, catCol, valueCol),
      valueCol,
    };
  }, [dataset]);

  const displayCols = dataset.columns.slice(0, 8);
  const isMonetary = (col: string) => /price|revenue|sale|amount|cost|total/i.test(col);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} accent={ACCENT_COLORS[i] ?? "bg-white"} />
        ))}
      </div>

      {/* Time series */}
      {timeSeries && (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
          <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-4">
            {timeSeries.valueKey} over time
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={timeSeries.data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9a9a9a" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis
                tick={{ fontSize: 11, fill: "#9a9a9a" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => isMonetary(timeSeries.valueKey) ? `$${v}` : v}
                width={55}
              />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, fontSize: 12, boxShadow: "none" }}
                formatter={(v) => [
                  isMonetary(timeSeries.valueKey) ? `$${Number(v).toFixed(2)}` : Number(v).toLocaleString(),
                  timeSeries.valueKey,
                ]}
              />
              <Line type="monotone" dataKey={timeSeries.valueKey} stroke="#1a3a3a" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#1a3a3a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Bar charts */}
      <div className={`grid grid-cols-1 ${bar2Data ? "lg:grid-cols-2" : ""} gap-4`}>
        {barData && (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
            <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-4">
              {barData.catCol}{barData.valueCol ? ` by ${barData.valueCol}` : " (count)"}
            </p>
            <ResponsiveContainer width="100%" height={Math.max(180, barData.data.length * 28)}>
              <BarChart data={barData.data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "#9a9a9a" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => barData.isMonetary ? `$${v}` : v}
                />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#3a3a3a" }} tickLine={false} axisLine={false} width={130} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, fontSize: 12, boxShadow: "none" }}
                  formatter={(v) => [barData.isMonetary ? `$${Number(v).toFixed(2)}` : Number(v).toLocaleString(), barData.valueCol ?? "count"]}
                />
                <Bar dataKey="value" fill="#ffb084" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {bar2Data && (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
            <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-4">
              {bar2Data.catCol}{bar2Data.valueCol ? ` by ${bar2Data.valueCol}` : " (count)"}
            </p>
            <ResponsiveContainer width="100%" height={Math.max(180, bar2Data.data.length * 28)}>
              <BarChart data={bar2Data.data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9a9a9a" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#3a3a3a" }} tickLine={false} axisLine={false} width={130} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, fontSize: 12, boxShadow: "none" }}
                  formatter={(v) => [Number(v).toLocaleString(), bar2Data.valueCol ?? "count"]}
                />
                <Bar dataKey="value" fill="#b8a4ed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Data table */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#f5f0e0]">
          <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest">
            Data
            <span className="ml-2 font-normal normal-case text-[#9a9a9a]">{dataset.rows.length.toLocaleString()} rows</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f0e0]">
                {displayCols.map((col) => (
                  <th key={col.name} className="text-left text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest px-4 py-2.5 whitespace-nowrap">
                    {col.name}
                  </th>
                ))}
                {dataset.columns.length > 8 && (
                  <th className="text-left text-xs font-semibold text-[#9a9a9a] px-4 py-2.5">+{dataset.columns.length - 8} more</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0e0]">
              {dataset.rows.slice(0, 200).map((row, i) => (
                <tr key={i} className="hover:bg-[#faf5e8] transition-colors">
                  {displayCols.map((col) => (
                    <td key={col.name} className="px-4 py-2.5 text-sm text-[#3a3a3a] whitespace-nowrap max-w-[200px] truncate">
                      {row[col.name] == null ? <span className="text-[#c5c0b0]">—</span> : String(row[col.name])}
                    </td>
                  ))}
                  {dataset.columns.length > 8 && <td className="px-4 py-2.5" />}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dataset.rows.length > 200 && (
          <div className="px-5 py-3 border-t border-[#f5f0e0]">
            <p className="text-xs text-[#9a9a9a]">Showing first 200 rows of {dataset.rows.length.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
