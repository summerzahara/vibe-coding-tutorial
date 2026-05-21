"use client";

import { useState } from "react";
import { ProductStat } from "@/lib/sales-data";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  data: ProductStat[];
}

type Mode = "revenue" | "units";

export function ProductChart({ data }: Props) {
  const [mode, setMode] = useState<Mode>("revenue");

  const sorted = [...data].sort((a, b) =>
    mode === "revenue" ? b.revenue - a.revenue : b.units - a.units
  );

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest">Products</p>
        <div className="flex rounded-xl overflow-hidden border border-[#e5e5e5]">
          {(["revenue", "units"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 text-xs font-medium transition-colors capitalize ${
                mode === m
                  ? "bg-[#0a0a0a] text-white"
                  : "bg-white text-[#6a6a6a] hover:bg-[#f5f0e0]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#9a9a9a" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => mode === "revenue" ? `$${v}` : `${v}`}
          />
          <YAxis
            type="category"
            dataKey="product"
            tick={{ fontSize: 11, fill: "#3a3a3a" }}
            tickLine={false}
            axisLine={false}
            width={130}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              fontSize: 12,
              boxShadow: "none",
            }}
            formatter={(v) =>
              mode === "revenue"
                ? [`$${Number(v).toFixed(2)}`, "Revenue"]
                : [`${Number(v)}`, "Units sold"]
            }
          />
          <Bar
            dataKey={mode}
            fill="#ffb084"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
