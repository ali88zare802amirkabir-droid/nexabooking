"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { appointments } from "@/data/appointments";
import { STATUS_TONE, APPT_STATUS_FA } from "@/components/booking/meta";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_FA = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
const DAY_SHORT_FA = ["یک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه"];

export default function CalendarPage() {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [date, setDate] = useState(new Date(2026, 8, 28));
  const today = new Date(2026, 8, 28);

  const weekDates = useMemo(() => {
    const d = new Date(date);
    const day = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i);
      return dt;
    });
  }, [date]);

  const monthDays = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    while (days.length < 42) days.push(null);
    return days;
  }, [date]);

  const getApptsForDate = (d: Date) => {
    const key = d.toISOString().slice(0, 10);
    return appointments.filter((a) => a.date === key).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const prevWeek = () => { const nd = new Date(date); nd.setDate(nd.getDate() - 7); setDate(nd); };
  const nextWeek = () => { const nd = new Date(date); nd.setDate(nd.getDate() + 7); setDate(nd); };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="تقویم"
        subtitle={`${weekDates[0]?.toLocaleDateString("fa-IR", { month: "short", day: "numeric" })} — ${weekDates[6]?.toLocaleDateString("fa-IR", { month: "short", day: "numeric", year: "numeric" })}`}
        actions={
          <div className="flex items-center gap-2">
            {["day", "week", "month"].map((v) => (
              <Button key={v} variant={view === v ? "primary" : "outline"} size="sm" onClick={() => setView(v as typeof view)} className="capitalize">{v === "day" ? "روز" : v === "week" ? "هفته" : "ماه"}</Button>
            ))}
          </div>
        }
      />

      <div className="card overflow-hidden p-4">
        <div className="mb-4 flex items-center justify-between">
          <button type="button" onClick={view === "week" ? prevWeek : undefined} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2">
            <ChevronRight className="size-5" />
          </button>
          <h2 className="font-display text-lg font-bold text-ink">
            {view === "week" && weekDates[0]?.toLocaleDateString("fa-IR", { month: "short", day: "numeric" })}
            {view === "month" && date.toLocaleDateString("fa-IR", { month: "long", year: "numeric" })}
            {view === "day" && date.toLocaleDateString("fa-IR", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </h2>
          <button type="button" onClick={view === "week" ? nextWeek : undefined} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2">
            <ChevronLeft className="size-5" />
          </button>
        </div>

        {view === "week" && (
          <>
            <div className="grid grid-cols-7 gap-px bg-edge">
              {DAY_SHORT_FA.map((d) => (
                <div key={d} className="bg-bg-soft p-2 text-center text-[11px] font-semibold text-ink-3">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-edge">
              {weekDates.map((d) => {
                const isToday = d.getTime() === today.getTime();
                const dayAppts = getApptsForDate(d);
                return (
                  <div key={d.toISOString()} className={cn("min-h-[100px] bg-bg-soft p-2", isToday && "bg-accent-soft/30")}>
                    <p className={cn("text-[11px] font-medium", isToday ? "text-accent" : "text-ink-3")}>{d.getDate()}</p>
                    {dayAppts.slice(0, 3).map((a) => (
                      <Link key={a.id} href={`/appointments/${a.id}`} className={cn("mb-1 block truncate rounded-md px-1.5 py-0.5 text-[10.5px] font-medium", STATUS_TONE[a.status]?.cls)}>
                        {a.startTime} {a.customerId}
                      </Link>
                    ))}
                    {dayAppts.length > 3 && <p className="text-[10px] text-ink-3">+{dayAppts.length - 3} بیشتر</p>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "month" && (
          <div className="grid grid-cols-7 gap-px bg-edge">
            {DAY_SHORT_FA.map((d) => (
              <div key={d} className="bg-bg-soft p-2 text-center text-[11px] font-semibold text-ink-3">{d}</div>
            ))}
            {monthDays.map((d, i) => {
              if (!d) return <div key={`e-${i}`} className="bg-bg-soft" />;
              const isToday = d.getTime() === today.getTime();
              const dayAppts = getApptsForDate(d);
              return (
                <div key={d.toISOString()} className={cn("min-h-[60px] bg-bg-soft p-1", isToday && "bg-accent-soft/30")}>
                  <p className={cn("text-[10.5px] font-medium", isToday ? "text-accent" : "text-ink-3")}>{d.getDate()}</p>
                  {dayAppts.slice(0, 2).map((a) => (
                    <Link key={a.id} href={`/appointments/${a.id}`} className="block truncate text-[9px] text-ink-2 hover:text-ink">{a.startTime}</Link>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {view === "day" && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }, (_, i) => {
              const h = 9 + i;
              const time = `${h.toString().padStart(2, "0")}:00`;
              const dayAppts = appointments.filter((a) => a.date === date.toISOString().slice(0, 10) && a.startTime === time);
              return (
                <div key={time} className="flex gap-3">
                  <div className="w-16 text-right text-[11px] text-ink-3 pt-1">{time}</div>
                  <div className="flex-1 rounded-xl border border-dashed border-edge p-2">
                    {dayAppts.map((a) => (
                      <Link key={a.id} href={`/appointments/${a.id}`} className="block rounded-lg bg-surface-2 px-2 py-1.5 text-[12px] text-ink">
                        {a.customerId} — {a.serviceId}
                      </Link>
                    ))}
                    {dayAppts.length === 0 && <span className="text-[11px] text-ink-3/50">در دسترس</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}