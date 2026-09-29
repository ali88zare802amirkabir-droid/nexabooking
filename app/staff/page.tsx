"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { staff } from "@/data/staff";
import { appointments } from "@/data/appointments";
import { formatMoney } from "@/lib/utils";
import { STAFF_TONE, STAFF_STATUS_FA, CATEGORY_FA } from "@/components/booking/meta";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  const filtered = staff.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = !deptFilter || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="کارکنان"
        subtitle={`${filtered.length} عضو`}
        actions={
          <Button size="sm"><Plus className="ms-1.5 size-4" /> افزودن کارمند</Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="جستجوی کارکنان…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="">همه بخش‌ها</option>
          {["Hair", "Beauty", "Medical", "Fitness", "Repair", "Consulting", "Wellness"].map((d) => <option key={d} value={d}>{CATEGORY_FA[d] ?? d}</option>)}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const todays = appointments.filter((a) => a.staffId === s.id && a.date === "2026-09-28" && a.status !== "Cancelled").length;
          return (
            <Link key={s.id} href={`/staff/${s.id}`} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Avatar name={s.name} color={s.avatarColor} size="md" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink">{s.name}</h3>
                  <p className="text-[12px] text-ink-3">{s.role}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", STAFF_TONE[s.status]?.cls)}>{STAFF_STATUS_FA[s.status] ?? s.status}</span>
                <span className="text-[12px] text-ink-2">{todays} امروز</span>
              </div>
              <div className="mt-2 text-[11.5px] text-ink-3">{CATEGORY_FA[s.department] ?? s.department} · {s.services.length} خدمت</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}