"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { CUSTOMER_STATUS_FA, APPT_STATUS_FA, CATEGORY_FA } from "@/components/booking/meta";
import type { LucideIcon } from "lucide-react";

interface ResultRow {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  color: string;
  keyword: string;
}

export function CommandSearch() {
  const {
    searchOpen,
    setSearchOpen,
    customers,
    appointments,
    services,
    staffData,
    notifications,
    setMobileNavOpen,
  } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo<ResultRow[]>(() => {
    const q = query.trim().toLowerCase();
    const rows: ResultRow[] = [];
    const push = (r: ResultRow) => {
      if (!q || r.keyword.includes(q)) rows.push(r);
    };
    for (const c of customers) {
      push({
        id: c.id,
        group: "مشتریان",
        title: c.name,
        subtitle: `${c.email} · ${CUSTOMER_STATUS_FA[c.status] ?? c.status}`,
        href: `/customers/${c.id}`,
        icon: Search,
        color: c.avatarColor,
        keyword: `${c.name} ${c.email} ${c.status}`.toLowerCase(),
      });
    }
    for (const a of appointments) {
      push({
        id: a.id,
        group: "نوبت‌ها",
        title: `${a.customerId} — ${a.serviceId}`,
        subtitle: `${a.date} ${a.startTime} · ${APPT_STATUS_FA[a.status] ?? a.status}`,
        href: `/appointments`,
        icon: Search,
        color: "#55a1ff",
        keyword: `${a.customerId} ${a.serviceId} ${a.date} ${a.status}`.toLowerCase(),
      });
    }
    for (const s of services) {
      push({
        id: s.id,
        group: "خدمات",
        title: s.name,
        subtitle: `${CATEGORY_FA[s.category] ?? s.category} · ${s.price}$`,
        href: "/services",
        icon: Search,
        color: "#f472b6",
        keyword: `${s.name} ${s.category} ${s.staffId}`.toLowerCase(),
      });
    }
    for (const st of staffData) {
      push({
        id: st.id,
        group: "کارکنان",
        title: st.name,
        subtitle: `${st.role} · ${st.department}`,
        href: "/staff",
        icon: Search,
        color: st.avatarColor,
        keyword: `${st.name} ${st.role} ${st.department}`.toLowerCase(),
      });
    }
    return rows;
  }, [query, customers, appointments, services, staffData]);

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => {
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      } else if (e.key === "/" && !typing && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const el = listRef.current?.querySelector(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, searchOpen]);

  if (!searchOpen) return null;

  const go = (row: ResultRow) => {
    setSearchOpen(false);
    setMobileNavOpen(false);
    router.push(row.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  const groups = [...new Set(results.map((r) => r.group))];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] sm:p-6">
      <div className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setSearchOpen(false)} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="جستجوی سراسری"
        className="card animate-rise relative w-full max-w-xl overflow-hidden"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <Search className="size-4 text-ink-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="جستجوی مشتریان، نوبت‌ها، خدمات، کارکنان…"
            className="h-13 flex-1 bg-transparent py-3.5 text-[13.5px] text-ink placeholder:text-ink-3 focus:outline-none"
            aria-label="جستجو"
          />
          <kbd className="hidden rounded-md border border-edge bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-ink-3 sm:block">
            ESC
          </kbd>
        </div>

        {results.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-medium text-ink">نتیجه‌ای یافت نشد برای «{query}»</p>
            <p className="mt-1 text-[12px] text-ink-3">نام، کد یا ایمیل را امتحان کنید.</p>
          </div>
        ) : (
          <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
            {groups.map((group) => (
              <div key={group} className="mb-1">
                <p className="px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
                  {group}
                </p>
                {results
                  .filter((r) => r.group === group)
                  .map((r) => {
                    const idx = results.indexOf(r);
                    const activeRow = idx === active;
                    return (
                      <button
                        key={`${r.group}-${r.id}`}
                        data-index={idx}
                        type="button"
                        onClick={() => go(r)}
                        onMouseEnter={() => setActive(idx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-right transition-colors",
                          activeRow ? "bg-surface-2" : "hover:bg-surface-2/60"
                        )}
                      >
                        <Avatar name={r.title} color={r.color} size="sm" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium text-ink">
                            {r.title}
                          </span>
                          <span className="block truncate text-[11.5px] text-ink-3">
                            {r.subtitle}
                          </span>
                        </span>
                        {activeRow && <ArrowLeft className="size-3.5 text-accent" />}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 border-t border-edge bg-surface-2/40 px-4 py-2.5 text-[10.5px] text-ink-3">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-edge bg-surface-2 px-1">↑</kbd>
            <kbd className="rounded border border-edge bg-surface-2 px-1">↓</kbd> پیمایش
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-edge bg-surface-2 px-1">↵</kbd> باز کردن
          </span>
          <span className="ms-auto hidden sm:block">
            {notifications.find((n) => !n.read) ? "موارد خوانده‌نشده در زنگوله مشخص‌اند." : ""}
          </span>
        </div>
      </div>
    </div>
  );
}