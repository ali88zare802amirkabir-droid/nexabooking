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
import { STATUS_TONE, APPT_STATUS_FA } from "@/components/booking/meta";
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
    { month: "دوشنبه", value: 1200 },
    { month: "سه‌شنبه", value: 1850 },
    { month: "چهارشنبه", value: 980 },
    { month: "پنج‌شنبه", value: 2400 },
    { month: "جمعه", value: 2100 },
    { month: "شنبه", value: 1600 },
    { month: "یکشنبه", value: 400 },
  ];

  const openForm = (type: typeof formType) => { setFormType(type); setFormOpen(true); };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="نمای کلی"
        subtitle={`خوش اومدی — امروز ${metrics.todayAppointments} نوبت، درآمد ${formatMoney(metrics.revenueToday)}`}
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => openForm("appointment")}>
              <Plus className="ms-1.5 size-4" /> نوبت جدید
            </Button>
            <Button variant="ghost" size="sm" onClick={() => openForm("customer")}>
              <UserPlus className="ms-1.5 size-4" /> مشتری جدید
            </Button>
          </div>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
{[
            { label: "نوبت‌های امروز", value: metrics.todayAppointments.toString(), sub: "همه وضعیت‌ها", icon: CalendarDays, tone: "accent" as const },
            { label: "آینده", value: metrics.upcomingAppointments.toString(), sub: "۳۰ روز آینده", icon: CalendarDays, tone: "cyan" as const },
            { label: "تکمیل‌شده", value: metrics.completedToday.toString(), sub: `نرخ ${completionRate()}%`, icon: CheckCircle2, tone: "ok" as const },
            { label: "عدم حضور", value: metrics.noShowsToday.toString(), sub: `نرخ ${noShowRate()}%`, icon: XCircle, tone: "danger" as const },
            { label: "درآمد", value: formatMoney(metrics.revenueToday), sub: `هفته ${formatMoney(revenueThisWeek())}`, icon: DollarSign, tone: "warn" as const },
            { label: "مشتری جدید", value: metrics.newCustomers.toString(), sub: `مجموع ${metrics.totalCustomers}`, icon: UserPlus, tone: "accent" as const },
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
            <h2 className="font-display text-base font-bold text-ink">برنامه‌ی امروز</h2>
            <Link href="/appointments" className="text-[12px] text-accent hover:underline">مشاهده همه ←</Link>
          </div>
          {sched.length === 0 ? (
            <EmptyState icon={<CalendarDays className="size-5" />} title="امروز نوبتی نیست" />
          ) : (
            <div className="flex flex-col gap-2">
              {sched.map((a) => (
                <Link key={a.id} href={`/appointments/${a.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2/60">
                  <span className="text-[12.5px] font-mono font-medium text-ink-2 min-w-[48px]">{a.startTime}</span>
                  <Avatar name={a.customerId} color="#55a1ff" size="sm" />
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-ink truncate">{a.customerId}</span>
                  <span className="hidden text-[11.5px] text-ink-3 sm:inline">{a.serviceId}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", STATUS_TONE[a.status]?.cls)}>{APPT_STATUS_FA[a.status] ?? a.status}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">روند درآمد</h2>
          <SimpleTrendChart data={revenueData} color="#55a1ff" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">آمار نوبت‌ها</h2>
          <CountBarChart
            data={[
              { label: "تأییدشده", value: stats.confirmed, color: "#55a1ff" },
              { label: "تکمیل‌شده", value: stats.completed, color: "#4ade80" },
              { label: "در انتظار", value: stats.pending, color: "#fbbf24" },
              { label: "لغوشده", value: stats.cancelled, color: "#f87171" },
              { label: "عدم حضور", value: stats.noShow, color: "#94a3b8" },
            ]}
          />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">آینده</h2>
          {upcom.length === 0 ? (
            <EmptyState icon={<CalendarDays className="size-5" />} title="نوبت آتی وجود ندارد" />
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
          <h2 className="mb-4 font-display text-base font-bold text-ink">خدمات پرطرفدار</h2>
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
          <h2 className="mb-4 font-display text-base font-bold text-ink">عملکرد کارکنان</h2>
          <div className="flex flex-col gap-2">
            {perf.map((s) => (
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

      <div className="card p-5">
        <h2 className="mb-4 font-display text-base font-bold text-ink">اقدامات سریع</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => openForm("appointment")}><Plus className="ms-1.5 size-4" /> نوبت جدید</Button>
          <Button variant="outline" onClick={() => openForm("customer")}><UserPlus className="ms-1.5 size-4" /> مشتری جدید</Button>
          <Button variant="outline" onClick={() => openForm("service")}><Scissors className="ms-1.5 size-4" /> خدمت جدید</Button>
          <Button variant="outline" onClick={() => openForm("staff")}><Users className="ms-1.5 size-4" /> کارمند جدید</Button>
        </div>
      </div>

      {formOpen && (
        <Modal open={formOpen} onClose={() => setFormOpen(false)} title="افزودن جدید">
          {formType === "appointment" && <AppointmentForm onClose={() => setFormOpen(false)} />}
          {formType === "customer" && <CustomerForm onClose={() => setFormOpen(false)} />}
          {formType === "service" && <ServiceForm onClose={() => setFormOpen(false)} />}
          {formType === "staff" && <StaffForm onClose={() => setFormOpen(false)} />}
        </Modal>
      )}
    </div>
  );
}