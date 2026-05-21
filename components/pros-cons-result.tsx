"use client";

import { ProsCons } from "@/lib/types";
import { CheckIcon, XIcon, LightbulbIcon } from "lucide-react";

interface Props {
  data: Partial<ProsCons>;
  isLoading: boolean;
}

export function ProsConsResult({ data, isLoading }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Pros */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-xl bg-[#e8f5f1] flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-3.5 h-3.5 text-[#2a8a70]" />
            </div>
            <h3 className="font-semibold text-sm text-[#0a0a0a]">Pros</h3>
            {data.pros && data.pros.length > 0 && (
              <span className="ml-auto text-xs font-semibold text-[#2a8a70] bg-[#e8f5f1] px-2 py-0.5 rounded-full">
                {data.pros.length}
              </span>
            )}
          </div>
          <ul className="space-y-2.5">
            {data.pros?.map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#a4d4c5] flex-shrink-0" />
                {pro}
              </li>
            ))}
            {isLoading && (!data.pros || data.pros.length === 0) && (
              <li className="h-4 bg-[#f5f0e0] rounded-lg animate-pulse w-3/4" />
            )}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-xl bg-[#fff0ee] flex items-center justify-center flex-shrink-0">
              <XIcon className="w-3.5 h-3.5 text-[#cc3322]" />
            </div>
            <h3 className="font-semibold text-sm text-[#0a0a0a]">Cons</h3>
            {data.cons && data.cons.length > 0 && (
              <span className="ml-auto text-xs font-semibold text-[#cc3322] bg-[#fff0ee] px-2 py-0.5 rounded-full">
                {data.cons.length}
              </span>
            )}
          </div>
          <ul className="space-y-2.5">
            {data.cons?.map((con, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6b5a] flex-shrink-0" />
                {con}
              </li>
            ))}
            {isLoading && (!data.cons || data.cons.length === 0) && (
              <li className="h-4 bg-[#f5f0e0] rounded-lg animate-pulse w-3/4" />
            )}
          </ul>
        </div>
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
