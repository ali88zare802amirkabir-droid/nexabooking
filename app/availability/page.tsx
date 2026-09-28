"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { availability, DAYS } from "@/data/availability";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AvailabilityPage() {
  const [avail, setAvail] = useState(availability);

  const toggleDay = (day: string) => {
    setAvail((prev) => ({
      ...prev,
      [day]: { ...prev[day], off: !prev[day].off },
    }));
  };

  const updateTime = (day: string, field: "start" | "end", value: string) => {
    setAvail((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Availability" subtitle="Weekly schedule — click to toggle days" />

      <div className="card p-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {DAYS.map((day) => {
            const d = avail[day];
            return (
              <div key={day} className={cn("rounded-xl border border-edge p-4", d.off && "opacity-60")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ink">{day}</h3>
                  <button type="button" onClick={() => toggleDay(day)} className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", d.off ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400")}>
                    {d.off ? "Off" : "Active"}
                  </button>
                </div>
                {!d.off && (
                  <div className="mt-3 flex items-center gap-2">
                    <input type="time" value={d.start} onChange={(e) => updateTime(day, "start", e.target.value)} className="rounded-lg border border-edge bg-surface px-2 py-1 text-[12px] text-ink focus:outline-none" />
                    <span className="text-ink-3">—</span>
                    <input type="time" value={d.end} onChange={(e) => updateTime(day, "end", e.target.value)} className="rounded-lg border border-edge bg-surface px-2 py-1 text-[12px] text-ink focus:outline-none" />
                  </div>
                )}
                {d.off && <p className="mt-2 text-[12px] text-ink-3">Closed</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}