"use client";

import { PaymentStat } from "@/lib/sales-data";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = ["#1a3a3a", "#ffb084", "#b8a4ed", "#a4d4c5"];

interface Props {
  data: PaymentStat[];
}

export function PaymentDonut({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
      <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-4">Payment Methods</p>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                fontSize: 12,
                boxShadow: "none",
              }}
              formatter={(v, _name, entry) => {
                const n = Number(v);
                return [`${n} orders (${((n / total) * 100).toFixed(0)}%)`, entry.payload.name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <ul className="space-y-2.5 flex-1">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#0a0a0a] truncate">{d.name}</p>
                <p className="text-xs text-[#9a9a9a]">{d.value} orders · ${d.revenue.toFixed(0)}</p>
              </div>
              <span className="text-xs font-semibold text-[#3a3a3a]">
                {((d.value / total) * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
