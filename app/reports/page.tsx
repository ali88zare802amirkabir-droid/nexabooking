"use client";

import { PageHeader } from "@/components/layout/page-header";
import { CountBarChart } from "@/components/charts/bars";
import { SimpleTrendChart } from "@/components/charts/trend";
import { metrics, appointmentStats, revenueThisMonth, completionRate, cancellationRate, noShowRate, averageBookingValue, customerGrowth, servicePopularity, staffPerformance } from "@/lib/metrics";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const stats = appointmentStats();
  const growth = customerGrowth();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Reports" subtitle={`Revenue this month: ${formatMoney(revenueThisMonth())}`} />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Apps", value: metrics.totalAppointments.toString() },
          { label: "Completion", value: `${completionRate()}%` },
          { label: "Cancellation", value: `${cancellationRate()}%` },
          { label: "Avg Booking", value: formatMoney(averageBookingValue()) },
        ].map((k) => (
          <div key={k.label} className="card p-4">
            <p className="text-[11.5px] text-ink-3">{k.label}</p>
            <p className="mt-1 text-xl font-bold text-ink">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Revenue Trend (This Week)</h2>
          <SimpleTrendChart
            data={[
              { month: "Mon", value: 1200 },
              { month: "Tue", value: 1850 },
              { month: "Wed", value: 980 },
              { month: "Thu", value: 2400 },
              { month: "Fri", value: 2100 },
              { month: "Sat", value: 1600 },
              { month: "Sun", value: 400 },
            ]}
            color="#55a1ff"
          />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Appointments by Day</h2>
          <CountBarChart
            data={[
              { label: "Mon", value: 14, color: "#55a1ff" },
              { label: "Tue", value: 22, color: "#55a1ff" },
              { label: "Wed", value: 11, color: "#55a1ff" },
              { label: "Thu", value: 28, color: "#55a1ff" },
              { label: "Fri", value: 25, color: "#55a1ff" },
              { label: "Sat", value: 19, color: "#55a1ff" },
              { label: "Sun", value: 4, color: "#94a3b8" },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Popular Services</h2>
          <div className="flex flex-col gap-2">
            {servicePopularity().map(([name, count]) => (
              <div key={name} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{name}</span>
                <span className="font-semibold text-ink-2">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Staff Performance</h2>
          <div className="flex flex-col gap-2">
            {staffPerformance().map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{s.name}</span>
                <span className="text-ink-2">{s.completed} done · {formatMoney(s.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Customer Growth</h2>
          <div className="flex flex-col gap-2">
            {growth.map((g) => (
              <div key={g.label} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{g.label}</span>
                <span className="font-semibold text-ink-2">{g.count} new</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}