"use client";

import { useRef, useState } from "react";
import { UploadCloudIcon, FileSpreadsheetIcon, XIcon, LoaderIcon } from "lucide-react";
import { parseFile, ParsedDataset } from "@/lib/parse-upload";

interface Props {
  onData: (dataset: ParsedDataset | null) => void;
  dataset: ParsedDataset | null;
}

export function UploadZone({ onData, dataset }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async (file: File) => {
    const ok = /\.(csv|xlsx|xls|ods)$/i.test(file.name);
    if (!ok) { setError("Please upload a .csv, .xlsx, or .xls file."); return; }
    setLoading(true);
    setError(null);
    try {
      const dataset = await parseFile(file);
      if (dataset.rows.length === 0) throw new Error("No data rows found in file.");
      onData(dataset);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse file.");
      onData(null);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handle(file);
  };

  if (dataset) {
    return (
      <div className="flex items-center gap-3 bg-[#e8f5f1] border border-[#a4d4c5]/60 rounded-2xl px-5 py-3">
        <FileSpreadsheetIcon className="w-4 h-4 text-[#2a8a70] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#0a0a0a] truncate">{dataset.fileName}</p>
          <p className="text-xs text-[#6a6a6a]">
            {dataset.rows.length.toLocaleString()} rows · {dataset.columns.length} columns
          </p>
        </div>
        <button
          onClick={() => { onData(null); if (inputRef.current) inputRef.current.value = ""; }}
          className="p-1.5 rounded-lg text-[#6a6a6a] hover:bg-[#a4d4c5]/30 transition-colors flex-shrink-0"
          title="Remove file"
        >
          <XIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 cursor-pointer transition-colors ${
          dragging
            ? "border-[#0a0a0a] bg-[#f5f0e0]"
            : "border-[#e5e5e5] bg-white hover:border-[#c5c0b0] hover:bg-[#faf5e8]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls,.ods"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); }}
        />
        {loading ? (
          <LoaderIcon className="w-6 h-6 text-[#9a9a9a] animate-spin" />
        ) : (
          <UploadCloudIcon className="w-6 h-6 text-[#9a9a9a]" />
        )}
        <div className="text-center">
          <p className="text-sm font-medium text-[#0a0a0a]">
            {loading ? "Parsing…" : "Upload your spreadsheet"}
          </p>
          <p className="text-xs text-[#9a9a9a] mt-0.5">CSV, Excel (.xlsx / .xls) — drag & drop or click</p>
        </div>
      </div>
      {error && <p className="text-xs text-[#cc3322] mt-2 pl-1">{error}</p>}
    </div>
  );
}
