"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { payments } from "@/data/payments";
import { formatMoney } from "@/lib/utils";
import { PAYMENT_TONE } from "@/components/booking/meta";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { customers } from "@/data/customers";
import { appointments } from "@/data/appointments";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");

  const filtered = useMemo(() => {
    let result = [...payments];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const c = customers.find((c) => c.id === p.customerId)!;
        return c.name.toLowerCase().includes(q);
      });
    }
    if (statusFilter) result = result.filter((p) => p.status === statusFilter);
    if (methodFilter) result = result.filter((p) => p.method === methodFilter);
    return result;
  }, [search, statusFilter, methodFilter]);

  const totalPaid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Payments" subtitle={`${filtered.length} records`} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-[11.5px] text-ink-3">Total Paid</p>
          <p className="mt-1 text-xl font-bold text-ok">{formatMoney(totalPaid)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11.5px] text-ink-3">Pending</p>
          <p className="mt-1 text-xl font-bold text-warn">{formatMoney(totalPending)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11.5px] text-ink-3">Total Records</p>
          <p className="mt-1 text-xl font-bold text-ink">{payments.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11.5px] text-ink-3">Avg Payment</p>
          <p className="mt-1 text-xl font-bold text-ink">{formatMoney(totalPaid / payments.filter((p) => p.status === "Paid").length || 0)}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="Search by customer…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          {["Paid", "Pending", "Refunded"].map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
          <option value="">All Methods</option>
          {["Card", "Cash", "Online"].map((m) => <option key={m} value={m}>{m}</option>)}
        </Select>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-edge">
                {["Payment ID", "Customer", "Appointment", "Amount", "Method", "Date", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
const c = customers.find((c) => c.id === p.customerId)!;
                const a = appointments.find((a) => a.id === p.appointmentId);
                return (
                  <tr key={p.id} className="border-b border-edge/50 hover:bg-surface-2/40">
                    <td className="px-4 py-3 text-ink-2 font-mono text-[12px]">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={c.name} color="#55a1ff" size="sm" />
                        <span className="text-ink">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{a?.serviceId ?? "—"}</td>
                    <td className="px-4 py-3 font-medium text-ink">{formatMoney(p.amount)}</td>
                    <td className="px-4 py-3 text-ink-2">{p.method}</td>
                    <td className="px-4 py-3 text-ink-2">{p.date}</td>
                    <td className="px-4 py-3"><span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", PAYMENT_TONE[p.status]?.cls)}>{p.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}