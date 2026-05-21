"use client";

import { useMemo, useState } from "react";
import {
  salesData,
  applyFilters,
  computeKPIs,
  getRevenueByDay,
  getProductStats,
  getPaymentStats,
  TimePeriod,
  PaymentMethod,
} from "@/lib/sales-data";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ProductChart } from "@/components/dashboard/product-chart";
import { PaymentDonut } from "@/components/dashboard/payment-donut";

const PERIODS: { value: TimePeriod; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "30d", label: "Last 30 days" },
  { value: "14d", label: "Last 14 days" },
];

const PAYMENT_FILTERS: { value: PaymentMethod | "all"; label: string }[] = [
  { value: "all", label: "All methods" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "eWallet", label: "eWallet" },
  { value: "Cash", label: "Cash" },
  { value: "Debit Card", label: "Debit Card" },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState<TimePeriod>("all");
  const [payment, setPayment] = useState<PaymentMethod | "all">("all");

  const filtered = useMemo(
    () => applyFilters(salesData, period, payment),
    [period, payment]
  );

  const kpis = useMemo(() => computeKPIs(filtered), [filtered]);
  const revenueByDay = useMemo(() => getRevenueByDay(filtered), [filtered]);
  const productStats = useMemo(() => getProductStats(filtered), [filtered]);
  const paymentStats = useMemo(() => getPaymentStats(filtered), [filtered]);

  return (
    <main className="flex-1 bg-[#fffaf0] py-10 px-5">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#0a0a0a] tracking-tight">Sales Dashboard</h1>
            <p className="text-sm text-[#9a9a9a] mt-0.5">Aug 15 – Oct 7, 2025</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Time period */}
            <div className="flex rounded-xl overflow-hidden border border-[#e5e5e5] bg-white">
              {PERIODS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setPeriod(value)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    period === value
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#6a6a6a] hover:bg-[#f5f0e0]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Payment method */}
            <div className="flex flex-wrap rounded-xl overflow-hidden border border-[#e5e5e5] bg-white">
              {PAYMENT_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setPayment(value)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    payment === value
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#6a6a6a] hover:bg-[#f5f0e0]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <KpiCard
            label="Total Revenue"
            value={`$${kpis.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            accent="bg-[#e8f5f1] border-[#a4d4c5]/60"
          />
          <KpiCard
            label="Total Orders"
            value={kpis.totalOrders.toString()}
            accent="bg-white"
          />
          <KpiCard
            label="Avg Order Value"
            value={`$${kpis.avgOrderValue.toFixed(2)}`}
            accent="bg-white"
          />
          <KpiCard
            label="Best Seller"
            value={kpis.bestSellingProduct}
            sub={`$${kpis.bestSellingRevenue.toFixed(0)} revenue`}
            accent="bg-[#fdf5dc] border-[#e8b94a]/40"
          />
        </div>

        {/* Revenue Chart — full width */}
        <RevenueChart data={revenueByDay} />

        {/* Products + Payment — side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProductChart data={productStats} />
          <PaymentDonut data={paymentStats} />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f5f0e0]">
            <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest">
              Orders
              <span className="ml-2 font-normal normal-case text-[#9a9a9a]">{filtered.length} line items</span>
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f0e0]">
                  {["Order ID", "Date", "Product", "Qty", "Unit Price", "Total", "Payment", "Location"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest px-4 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f0e0]">
                {filtered.map((row) => (
                  <tr key={row.orderId} className="hover:bg-[#faf5e8] transition-colors">
                    <td className="px-4 py-2.5 text-xs font-mono text-[#6a6a6a]">{row.orderId}</td>
                    <td className="px-4 py-2.5 text-xs text-[#6a6a6a] whitespace-nowrap">
                      {new Date(row.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-[#0a0a0a] font-medium">{row.product}</td>
                    <td className="px-4 py-2.5 text-sm text-[#3a3a3a]">{row.quantity}</td>
                    <td className="px-4 py-2.5 text-sm text-[#3a3a3a]">${row.unitPrice.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-sm font-semibold text-[#0a0a0a]">${row.totalPrice.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-xs text-[#6a6a6a]">{row.paymentMethod}</td>
                    <td className="px-4 py-2.5 text-xs text-[#9a9a9a]">{row.customerLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
