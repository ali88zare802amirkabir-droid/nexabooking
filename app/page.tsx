"use client";

import { Plus, UserPlus, Scissors, Users, CalendarDays, CheckCircle2, XCircle, DollarSign } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { metrics, todaysSchedule, upcomingAppointments, appointmentStats, revenueThisWeek, completionRate, noShowRate, servicePopularity, staffPerformance, customerGrowth } from "@/lib/metrics";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";
import { STATUS_TONE } from "@/components/booking/meta";
import { Button } from "@/components/ui/button";
import { SimpleTrendChart } from "@/components/charts/trend";
import { CountBarChart } from "@/components/charts/bars";
import { AppointmentForm, CustomerForm, ServiceForm, StaffForm } from "@/components/booking/appointment-form";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export default function OverviewPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState<"appointment" | "customer" | "service" | "staff">("appointment");
  const sched = todaysSchedule();
  const upcom = upcomingAppointments(5);
  const popServices = servicePopularity();
  const perf = staffPerformance();
  const growth = customerGrowth();
  const stats = appointmentStats();

  const revenueData = [
    { month: "Mon", value: 1200 },
    { month: "Tue", value: 1850 },
    { month: "Wed", value: 980 },
    { month: "Thu", value: 2400 },
    { month: "Fri", value: 2100 },
    { month: "Sat", value: 1600 },
    { month: "Sun", value: 400 },
  ];

  const openForm = (type: typeof formType) => { setFormType(type); setFormOpen(true); };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        subtitle={`Welcome back — ${metrics.todayAppointments} appointments today, ${formatMoney(metrics.revenueToday)} revenue`}
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => openForm("appointment")}>
              <Plus className="mr-1.5 size-4" /> New Appointment
            </Button>
            <Button variant="ghost" size="sm" onClick={() => openForm("customer")}>
              <UserPlus className="mr-1.5 size-4" /> Add Customer
            </Button>
          </div>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Today's Apps", value: metrics.todayAppointments.toString(), sub: "All statuses", icon: CalendarDays, tone: "accent" as const },
          { label: "Upcoming", value: metrics.upcomingAppointments.toString(), sub: "Next 30 days", icon: CalendarDays, tone: "cyan" as const },
          { label: "Completed", value: metrics.completedToday.toString(), sub: `${completionRate()}% rate`, icon: CheckCircle2, tone: "ok" as const },
          { label: "No Shows", value: metrics.noShowsToday.toString(), sub: `${noShowRate()}% rate`, icon: XCircle, tone: "danger" as const },
          { label: "Revenue", value: formatMoney(metrics.revenueToday), sub: `Wk ${formatMoney(revenueThisWeek())}`, icon: DollarSign, tone: "warn" as const },
          { label: "New Cstm", value: metrics.newCustomers.toString(), sub: `Total ${metrics.totalCustomers}`, icon: UserPlus, tone: "accent" as const },
        ].map((k) => (
          <div key={k.label} className="card p-4">
            <div className="flex items-center gap-2.5">
              <span className={`flex size-9 items-center justify-center rounded-xl bg-surface-2 ${k.tone === "ok" ? "text-ok" : k.tone === "danger" ? "text-danger" : k.tone === "warn" ? "text-warn" : k.tone === "cyan" ? "text-cyan" : "text-accent"}`}>
                <k.icon className="size-4.5" />
              </span>
            </div>
            <div className="mt-3">
              <p className="text-[11.5px] text-ink-3">{k.label}</p>
              <p className="mt-1 text-2xl font-bold text-ink tracking-tight">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-ink-3">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Today's Schedule</h2>
            <Link href="/appointments" className="text-[12px] text-accent hover:underline">View all →</Link>
          </div>
          {sched.length === 0 ? (
            <EmptyState icon={<CalendarDays className="size-5" />} title="No appointments today" />
          ) : (
            <div className="flex flex-col gap-2">
              {sched.map((a) => (
                <Link key={a.id} href={`/appointments/${a.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                  <span className="text-[12.5px] font-mono font-medium text-ink-2 min-w-[48px]">{a.startTime}</span>
                  <Avatar name={a.customerId} color="#55a1ff" size="sm" />
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-ink truncate">{a.customerId}</span>
                  <span className="hidden text-[11.5px] text-ink-3 sm:inline">{a.serviceId}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", STATUS_TONE[a.status]?.cls)}>{a.status}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Revenue Trend</h2>
          <SimpleTrendChart data={revenueData} color="#55a1ff" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Appointment Stats</h2>
          <CountBarChart
            data={[
              { label: "Confirmed", value: stats.confirmed, color: "#55a1ff" },
              { label: "Completed", value: stats.completed, color: "#4ade80" },
              { label: "Pending", value: stats.pending, color: "#fbbf24" },
              { label: "Cancelled", value: stats.cancelled, color: "#f87171" },
              { label: "No-show", value: stats.noShow, color: "#94a3b8" },
            ]}
          />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Upcoming</h2>
          {upcom.length === 0 ? (
            <EmptyState icon={<CalendarDays className="size-5" />} title="No upcoming appointments" />
          ) : (
            <div className="flex flex-col gap-2">
              {upcom.map((a) => (
                <Link key={a.id} href={`/appointments/${a.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                  <span className="text-[12.5px] font-mono font-medium text-ink-2 min-w-[48px]">{a.date.slice(5)} {a.startTime}</span>
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-ink truncate">{a.customerId}</span>
                  <span className="hidden text-[11.5px] text-ink-3 sm:inline">{a.serviceId}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Popular Services</h2>
          <div className="flex flex-col gap-2">
            {popServices.map(([name, count]) => (
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
            {perf.map((s) => (
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

      <div className="card p-5">
        <h2 className="mb-4 font-display text-base font-bold text-ink">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => openForm("appointment")}><Plus className="mr-1.5 size-4" /> New Appointment</Button>
          <Button variant="outline" onClick={() => openForm("customer")}><UserPlus className="mr-1.5 size-4" /> Add Customer</Button>
          <Button variant="outline" onClick={() => openForm("service")}><Scissors className="mr-1.5 size-4" /> Add Service</Button>
          <Button variant="outline" onClick={() => openForm("staff")}><Users className="mr-1.5 size-4" /> Add Staff</Button>
        </div>
      </div>

      {formOpen && (
        <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Add New">
          {formType === "appointment" && <AppointmentForm onClose={() => setFormOpen(false)} />}
          {formType === "customer" && <CustomerForm onClose={() => setFormOpen(false)} />}
          {formType === "service" && <ServiceForm onClose={() => setFormOpen(false)} />}
          {formType === "staff" && <StaffForm onClose={() => setFormOpen(false)} />}
        </Modal>
      )}
    </div>
  );
}