"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { services } from "@/data/services";
import { staff } from "@/data/staff";
import { formatMoney } from "@/lib/utils";
import { SERVICE_TONE, SERVICE_STATUS_FA, CATEGORY_FA } from "@/components/booking/meta";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const { addService, showToast } = useApp();

  const filtered = services.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || (CATEGORY_FA[s.category] ?? s.category).toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || s.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="خدمات"
        subtitle={`${filtered.length} خدمت`}
        actions={
          <Button size="sm" onClick={() => showToast({ title: "فرم در دسترس نیست", variant: "info" })}><Plus className="ms-1.5 size-4" /> افزودن خدمت</Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
          <TextInput placeholder="جستجوی خدمات…" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9" />
        </div>
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="">همه دسته‌بندی‌ها</option>
          {["Hair", "Beauty", "Medical", "Fitness", "Repair", "Consulting", "Wellness"].map((c) => <option key={c} value={c}>{CATEGORY_FA[c] ?? c}</option>)}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const st = staff.find((s2) => s2.id === s.staffId);
          return (
            <div key={s.id} className="card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-ink">{s.name}</h3>
                  <p className="text-[12px] text-ink-3">{CATEGORY_FA[s.category] ?? s.category}</p>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", SERVICE_TONE[s.status]?.cls)}>{SERVICE_STATUS_FA[s.status] ?? s.status}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[12.5px]">
                <span className="text-ink-2">{s.duration} دقیقه · {formatMoney(s.price)}</span>
                <span className="text-ink-3">{st?.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}