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

  const revenueData = [
    { month: "دوشنبه", value: 1200 },
    { month: "سه‌شنبه", value: 1850 },
    { month: "چهارشنبه", value: 980 },
    { month: "پنج‌شنبه", value: 2400 },
    { month: "جمعه", value: 2100 },
    { month: "شنبه", value: 1600 },
    { month: "یکشنبه", value: 400 },
  ];

  const apptsByDay = [
    { label: "دوشنبه", value: 14, color: "#55a1ff" },
    { label: "سه‌شنبه", value: 22, color: "#55a1ff" },
    { label: "چهارشنبه", value: 11, color: "#55a1ff" },
    { label: "پنج‌شنبه", value: 28, color: "#55a1ff" },
    { label: "جمعه", value: 25, color: "#55a1ff" },
    { label: "شنبه", value: 19, color: "#55a1ff" },
    { label: "یکشنبه", value: 4, color: "#94a3b8" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="گزارش‌ها" subtitle={`درآمد این ماه: ${formatMoney(revenueThisMonth())}`} />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "مجموع نوبت‌ها", value: metrics.totalAppointments.toString() },
          { label: "تکمیل", value: `${completionRate()}%` },
          { label: "لغو", value: `${cancellationRate()}%` },
          { label: "میانگین رزرو", value: formatMoney(averageBookingValue()) },
        ].map((k) => (
          <div key={k.label} className="card p-4">
            <p className="text-[11.5px] text-ink-3">{k.label}</p>
            <p className="mt-1 text-xl font-bold text-ink">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">روند درآمد (این هفته)</h2>
          <SimpleTrendChart data={revenueData} color="#55a1ff" />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">نوبت‌ها بر اساس روز</h2>
          <CountBarChart data={apptsByDay} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">خدمات پرطرفدار</h2>
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
          <h2 className="mb-4 font-display text-base font-bold text-ink">عملکرد کارکنان</h2>
          <div className="flex flex-col gap-2">
            {staffPerformance().map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{s.name}</span>
                <span className="text-ink-2">{s.completed} انجام · {formatMoney(s.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">رشد مشتریان</h2>
          <div className="flex flex-col gap-2">
            {growth.map((g) => (
              <div key={g.label} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{g.label}</span>
                <span className="font-semibold text-ink-2">{g.count} جدید</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}