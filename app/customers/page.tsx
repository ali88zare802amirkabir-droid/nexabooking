"use client";

import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { customers } from "@/data/customers";
import { formatMoney } from "@/lib/utils";
import { CUSTOMER_TONE, CUSTOMER_STATUS_FA } from "@/components/booking/meta";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { CustomerStatus } from "@/lib/types";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "visits" | "spent">("name");
  const { addCustomer, showToast } = useApp();

  const filtered = useMemo(() => {
    let result = [...customers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(q));
    }
    if (statusFilter) result = result.filter((c) => c.status === statusFilter);
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "visits") return b.totalAppointments - a.totalAppointments;
      return b.totalSpent - a.totalSpent;
    });
    return result;
  }, [search, statusFilter, sortBy]);

  const addDummy = () => {
    addCustomer({
      id: `c-${Math.random().toString(36).slice(2, 8)}`,
      name: "مشتری جدید",
      email: "new@mail.com",
      phone: "+۹۸ (۰۲۱) ۰۰۰-۰۰۰۰",
      avatarColor: "#55a1ff",
      status: "New",
      sinceDaysAgo: 0,
      totalAppointments: 0,
      totalSpent: 0,
    });
    showToast({ title: "مشتری افزوده شد", variant: "success" });
  };

return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="مشتریان"
        subtitle={`${filtered.length} مشتری`}
        actions={
          <Button size="sm" onClick={addDummy}><Plus className="ms-1.5 size-4" /> افزودن مشتری</Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="جستجوی مشتریان…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">همه وضعیت‌ها</option>
          {["Active", "New", "Inactive", "VIP"].map((s) => <option key={s} value={s}>{CUSTOMER_STATUS_FA[s] ?? s}</option>)}
        </Select>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="name">مرتب‌سازی: نام</option>
          <option value="visits">مرتب‌سازی: بازدیدها</option>
          <option value="spent">مرتب‌سازی: هزینه</option>
        </Select>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-edge">
                {["مشتری", "تماس", "بازدیدها", "آخرین بازدید", "نوبت بعد", "هزینه", "وضعیت"].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <Link key={c.id} href={`/customers/${c.id}`} className="flex items-center gap-4 border-b border-edge/50 px-4 py-3 hover:bg-surface-2/40">
                  <Avatar name={c.name} color={c.avatarColor} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-[11.5px] text-ink-3">{c.email}</p>
                  </div>
                  <span className="text-ink-2">{c.totalAppointments}</span>
                  <span className="hidden text-ink-2 sm:inline">{c.sinceDaysAgo} روز پیش</span>
                  <span className="hidden text-ink-2 sm:inline">—</span>
                  <span className="font-medium text-ink-2">{formatMoney(c.totalSpent)}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", CUSTOMER_TONE[c.status]?.cls)}>{CUSTOMER_STATUS_FA[c.status] ?? c.status}</span>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-10 text-center text-[12.5px] text-ink-3">مشتری یافت نشد.</div>
        )}
      </div>
    </div>
  );
}