"use client";

import { Comparison } from "@/lib/types";
import { LightbulbIcon, TrophyIcon } from "lucide-react";

interface Props {
  data: Partial<Comparison>;
  isLoading: boolean;
}

export function ComparisonResult({ data, isLoading }: Props) {
  const options = data.options ?? [];
  const criteria = data.criteria ?? [];

  return (
    <div className="space-y-4">

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f0e0] border-b border-[#e5e5e5]">
                <th className="text-left text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest px-5 py-3 w-40">
                  Criteria
                </th>
                {options.map((opt) => (
                  <th key={opt} className="text-left text-sm font-semibold text-[#0a0a0a] px-5 py-3">
                    {opt}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0e0]">
              {criteria.map((row, i) => (
                <tr key={i} className="hover:bg-[#faf5e8] transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-[#0a0a0a] whitespace-nowrap">
                    {row.name}
                  </td>
                  {options.map((opt) => {
                    const isWinner = row.winner === opt;
                    return (
                      <td key={opt} className="px-5 py-3.5 text-sm text-[#3a3a3a]">
                        <span className={`inline-flex items-center gap-1.5 ${isWinner ? "font-medium text-[#1a3a3a]" : ""}`}>
                          {isWinner && <TrophyIcon className="w-3.5 h-3.5 text-[#e8b94a] flex-shrink-0" />}
                          {row.values?.[opt] ?? "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {isLoading && criteria.length === 0 && (
                <tr>
                  <td colSpan={Math.max(options.length + 1, 3)} className="px-5 py-6">
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 bg-[#f5f0e0] rounded-lg animate-pulse" style={{ width: `${60 + i * 10}%` }} />
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Score summary */}
      {criteria.length > 0 && options.length > 0 && (() => {
        const scores: Record<string, number> = {};
        options.forEach((o) => (scores[o] = 0));
        criteria.forEach((c) => { if (c.winner) scores[c.winner] = (scores[c.winner] ?? 0) + 1; });
        const sorted = options.slice().sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0));
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sorted.map((opt, i) => (
              <div
                key={opt}
                className={`rounded-2xl p-3.5 text-center border ${
                  i === 0 ? "bg-[#fdf5dc] border-[#e8b94a]/40" : "bg-white border-[#e5e5e5]"
                }`}
              >
                {i === 0 && <TrophyIcon className="w-4 h-4 text-[#e8b94a] mx-auto mb-1.5" />}
                <p className="text-xs text-[#9a9a9a] mb-0.5">{i === 0 ? "Leading" : `#${i + 1}`}</p>
                <p className="font-semibold text-sm text-[#0a0a0a] truncate">{opt}</p>
                <p className="text-xs text-[#6a6a6a] mt-0.5">{scores[opt] ?? 0} wins</p>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Recommendation */}
      {data.recommendation && (
        <div className="bg-[#fdf5dc] rounded-2xl border border-[#e8b94a]/40 p-5">
          <div className="flex items-center gap-2.5 mb-2">
            <LightbulbIcon className="w-4 h-4 text-[#e8b94a]" />
            <h3 className="font-semibold text-sm text-[#0a0a0a]">Recommendation</h3>
          </div>
          <p className="text-sm text-[#3a3a3a] leading-relaxed">{data.recommendation}</p>
        </div>
      )}
    </div>
  );
}
