"use client";

import { DailyRevenue } from "@/lib/sales-data";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  data: DailyRevenue[];
}

export function RevenueChart({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
      <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-4">Revenue Over Time</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#9a9a9a" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9a9a9a" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}`}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              fontSize: 12,
              boxShadow: "none",
            }}
            formatter={(v) => [`$${Number(v).toFixed(2)}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1a3a3a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#1a3a3a" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
