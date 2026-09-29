"use client";

import { staff } from "@/data/staff";
import { appointments } from "@/data/appointments";
import { formatMoney } from "@/lib/utils";
import { STAFF_TONE, STAFF_STATUS_FA, APPT_STATUS_FA, DAY_FA, CATEGORY_FA } from "@/components/booking/meta";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function StaffDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = staff.find((s) => s.id === id)!;

  const upcoming = appointments
    .filter((a) => a.staffId === s.id && a.date >= "2026-09-28" && a.status !== "Cancelled" && a.status !== "No-show")
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
  const completed = appointments.filter((a) => a.staffId === s.id && a.status === "Completed").length;
  const revenue = appointments.filter((a) => a.staffId === s.id && a.status === "Completed").reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/staff" className="text-[12px] text-accent hover:underline">← Back to Staff</Link>

      <PageHeader title={s.name} subtitle={s.role}>
        <div className="flex items-center gap-3">
          <Avatar name={s.name} color={s.avatarColor} size="xl" />
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", STAFF_TONE[s.status]?.cls)}>{STAFF_STATUS_FA[s.status] ?? s.status}</span>
        </div>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "بخش", value: CATEGORY_FA[s.department] ?? s.department },
          { label: "امروز", value: `${s.appointmentsToday} نوبت` },
          { label: "تکمیل‌شده", value: completed.toString() },
          { label: "درآمد", value: formatMoney(revenue) },
        ].map((k) => (
          <div key={k.label} className="card p-4">
            <p className="text-[11.5px] text-ink-3">{k.label}</p>
            <p className="mt-1 text-xl font-bold text-ink">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="mb-4 font-display text-base font-bold text-ink">ساعات کاری</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(s.workingHours).map(([day, hours]) => (
            <div key={day} className={cn("rounded-xl border border-edge p-3", hours.off && "opacity-60")}>
              <p className="font-medium text-ink">{DAY_FA[day] ?? day}</p>
              {hours.off ? (
                <p className="text-[12px] text-ink-3">تعطیل</p>
              ) : (
                <p className="text-[12px] text-ink-2">{hours.start} — {hours.end}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 font-display text-base font-bold text-ink">نوبت‌های آتی</h2>
        {upcoming.length === 0 ? (
          <p className="py-4 text-center text-[12.5px] text-ink-3">نوبت آتی وجود ندارد.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {upcoming.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-surface-2/40">
                <span className="text-[12px] font-mono text-ink-2">{a.date.slice(5)} {a.startTime}</span>
                <span className="flex-1 text-[13px] text-ink">{a.customerId}</span>
                <span className="text-[11.5px] text-ink-3">{a.serviceId}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}