"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { appointments } from "@/data/appointments";
import { customers } from "@/data/customers";
import { services } from "@/data/services";
import { staff } from "@/data/staff";
import { formatMoney } from "@/lib/utils";
import { STATUS_TONE, APPT_STATUS_FA } from "@/components/booking/meta";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ApptStatus } from "@/lib/types";

const STATUSES: ApptStatus[] = ["Confirmed", "Pending", "Completed", "Cancelled", "No-show"];

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "time" | "customer">("date");

  const filtered = useMemo(() => {
    let result = [...appointments];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) => {
        const c = customers.find((c) => c.id === a.customerId);
        const s = services.find((s) => s.id === a.serviceId);
        const st = staff.find((s) => s.id === a.staffId);
        return `${c?.name ?? ""} ${s?.name ?? ""} ${st?.name ?? ""}`.toLowerCase().includes(q);
      });
    }
    if (statusFilter) result = result.filter((a) => a.status === statusFilter);
    if (staffFilter) result = result.filter((a) => a.staffId === staffFilter);
    if (serviceFilter) result = result.filter((a) => a.serviceId === serviceFilter);
    result.sort((a, b) => {
      if (sortBy === "date") return a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime);
      if (sortBy === "time") return a.startTime.localeCompare(b.startTime);
      return a.customerId.localeCompare(b.customerId);
    });
    return result;
  }, [search, statusFilter, staffFilter, serviceFilter, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="نوبت‌ها"
        subtitle={`${filtered.length} نوبت`}
        actions={
          <Button size="sm"><Plus className="ms-1.5 size-4" /> جدید</Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="جستجوی مشتریان، خدمات…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">همه وضعیت‌ها</option>
          {STATUSES.map((s) => <option key={s} value={s}>{APPT_STATUS_FA[s] ?? s}</option>)}
        </Select>
        <Select value={staffFilter} onChange={(e) => setStaffFilter(e.target.value)}>
          <option value="">همه کارکنان</option>
          {staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
        <Select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
          <option value="">همه خدمات</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-edge">
                {["مشتری", "خدمت", "کارمند", "تاریخ", "ساعت", "وضعیت", "پرداخت", "عملیات"].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const c = customers.find((c) => c.id === a.customerId);
                const s = services.find((s) => s.id === a.serviceId);
                const st = staff.find((s) => s.id === a.staffId);
                const pay = { status: "Paid", amount: a.amount };
                return (
                  <tr key={a.id} className="border-b border-edge/50 hover:bg-surface-2/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={c?.name ?? "?"} color="#55a1ff" size="sm" />
                        <span className="font-medium text-ink">{c?.name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{s?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-ink-2">{st?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-ink-2">{a.date}</td>
                    <td className="px-4 py-3 text-ink-2 font-mono">{a.startTime}</td>
                    <td className="px-4 py-3"><span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", STATUS_TONE[a.status]?.cls)}>{APPT_STATUS_FA[a.status] ?? a.status}</span></td>
                    <td className="px-4 py-3 text-ink-2">{formatMoney(pay.amount)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/appointments/${a.id}`} className="text-accent hover:underline text-[12px]">مشاهده</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-10 text-center text-[12.5px] text-ink-3">نوبتی یافت نشد.</div>
        )}
      </div>
    </div>
  );
}

// Fix the sortBy type — remove the bug
