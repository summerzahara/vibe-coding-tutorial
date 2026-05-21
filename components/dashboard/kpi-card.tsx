interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}

export function KpiCard({ label, value, sub, accent = "bg-[#f5f0e0]" }: KpiCardProps) {
  return (
    <div className={`rounded-2xl border border-[#e5e5e5] p-5 ${accent}`}>
      <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-2">{label}</p>
      <p className="text-2xl font-semibold text-[#0a0a0a] tracking-tight">{value}</p>
      {sub && <p className="text-xs text-[#9a9a9a] mt-1">{sub}</p>}
    </div>
  );
}
