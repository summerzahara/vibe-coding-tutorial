"use client";

import { Swot } from "@/lib/types";
import { ShieldCheckIcon, AlertTriangleIcon, TrendingUpIcon, ZapIcon, LightbulbIcon } from "lucide-react";

interface Props {
  data: Partial<Swot>;
  isLoading: boolean;
}

const quadrants = [
  {
    key: "strengths" as const,
    label: "Strengths",
    icon: <ShieldCheckIcon className="w-4 h-4" />,
    bg:       "bg-[#e8f5f1]",
    border:   "border-[#a4d4c5]/60",
    iconBg:   "bg-[#a4d4c5]/40 text-[#2a8a70]",
    dot:      "bg-[#a4d4c5]",
    badge:    "bg-[#a4d4c5]/30 text-[#2a8a70]",
    heading:  "text-[#0a0a0a]",
  },
  {
    key: "weaknesses" as const,
    label: "Weaknesses",
    icon: <AlertTriangleIcon className="w-4 h-4" />,
    bg:       "bg-[#fff0ee]",
    border:   "border-[#ff6b5a]/30",
    iconBg:   "bg-[#ff6b5a]/20 text-[#cc3322]",
    dot:      "bg-[#ff6b5a]",
    badge:    "bg-[#ff6b5a]/20 text-[#cc3322]",
    heading:  "text-[#0a0a0a]",
  },
  {
    key: "opportunities" as const,
    label: "Opportunities",
    icon: <TrendingUpIcon className="w-4 h-4" />,
    bg:       "bg-[#fff6ee]",
    border:   "border-[#ffb084]/50",
    iconBg:   "bg-[#ffb084]/30 text-[#c06020]",
    dot:      "bg-[#ffb084]",
    badge:    "bg-[#ffb084]/30 text-[#c06020]",
    heading:  "text-[#0a0a0a]",
  },
  {
    key: "threats" as const,
    label: "Threats",
    icon: <ZapIcon className="w-4 h-4" />,
    bg:       "bg-[#fdf5dc]",
    border:   "border-[#e8b94a]/50",
    iconBg:   "bg-[#e8b94a]/30 text-[#a07a10]",
    dot:      "bg-[#e8b94a]",
    badge:    "bg-[#e8b94a]/30 text-[#a07a10]",
    heading:  "text-[#0a0a0a]",
  },
];

export function SwotResult({ data, isLoading }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quadrants.map((q) => {
          const items = data[q.key] ?? [];
          return (
            <div key={q.key} className={`rounded-2xl border p-5 ${q.bg} ${q.border}`}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${q.iconBg}`}>
                  {q.icon}
                </div>
                <h3 className={`font-semibold text-sm ${q.heading}`}>{q.label}</h3>
                {items.length > 0 && (
                  <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${q.badge}`}>
                    {items.length}
                  </span>
                )}
              </div>
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${q.dot}`} />
                    {item}
                  </li>
                ))}
                {isLoading && items.length === 0 && (
                  <>
                    <li className="h-4 bg-white/50 rounded-lg animate-pulse w-3/4" />
                    <li className="h-4 bg-white/50 rounded-lg animate-pulse w-1/2" />
                  </>
                )}
              </ul>
            </div>
          );
        })}
      </div>

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
