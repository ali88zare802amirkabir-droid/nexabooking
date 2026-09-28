"use client";

import { useMemo } from "react";
import { ArrowLeft, CalendarDays, DollarSign, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useApp } from "@/lib/store";
import { customers } from "@/data/customers";
import { appointments } from "@/data/appointments";
import { payments } from "@/data/payments";
import { formatMoney } from "@/lib/utils";
import { getCustomerStats, getCustomerAppointments } from "@/lib/metrics";
import { CUSTOMER_TONE } from "@/components/booking/meta";
import { Avatar } from "@/components/ui/avatar";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = customers.find((c) => c.id === id)!;
  if (!c) notFound();

  const stats = getCustomerStats(c.id);
  const history = getCustomerAppointments(c.id).filter((a) => a.date < "2026-09-28");
  const upcoming = getCustomerAppointments(c.id).filter((a) => a.date >= "2026-09-28");
  const custPayments = payments.filter((p) => p.customerId === c.id);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/customers" className="text-[12px] text-accent hover:underline">← Back to Customers</Link>

      <PageHeader title={c.name} subtitle={c.email}>
        <div className="flex items-center gap-3">
          <Avatar name={c.name} color={c.avatarColor} size="xl" />
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", CUSTOMER_TONE[c.status]?.cls)}>{c.status}</span>
        </div>
      </PageHeader>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Visits", value: stats.totalVisits.toString(), icon: CalendarDays },
          { label: "Cancelled", value: stats.cancelled.toString(), icon: CalendarDays },
          { label: "No-Shows", value: stats.noShow.toString(), icon: CalendarDays },
          { label: "Lifetime Value", value: formatMoney(stats.lifetimeValue), icon: DollarSign },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-[11.5px] text-ink-3">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Appointment History</h2>
          {history.length === 0 ? (
            <p className="py-4 text-center text-[12.5px] text-ink-3">No past appointments.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {history.slice(0, 8).map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-surface-2/40">
                  <span className="text-[12px] font-mono text-ink-2">{a.date.slice(5)}</span>
                  <span className="flex-1 text-[13px] text-ink">{a.serviceId}</span>
                  <span className="text-[11.5px] text-ink-3">{a.startTime}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="py-4 text-center text-[12.5px] text-ink-3">No upcoming appointments.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {upcoming.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-surface-2/40">
                  <span className="text-[12px] font-mono text-ink-2">{a.date.slice(5)} {a.startTime}</span>
                  <span className="flex-1 text-[13px] text-ink">{a.serviceId}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", "bg-[#55a1ff]/10 text-[#55a1ff]")}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Payment History</h2>
        {custPayments.length === 0 ? (
          <p className="py-4 text-center text-[12.5px] text-ink-3">No payment records.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {custPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-surface-2/40">
                <span className="text-[13px] text-ink">{p.method}</span>
                <span className="text-[13px] text-ink-2">{formatMoney(p.amount)}</span>
                <span className="text-[11.5px] text-ink-3">{p.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}