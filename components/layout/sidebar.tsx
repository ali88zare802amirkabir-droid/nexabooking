"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { NAV } from "@/components/layout/nav";
import { Avatar } from "@/components/ui/avatar";

export function BrandMark({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", !collapsed && "px-2.5")}>
      <span
        className="brand-gradient flex size-8 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_6px_16px_-6px_rgba(56,132,255,0.7)]"
        aria-hidden
      >
        <svg width="17" height="17" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="2" width="22" height="24" rx="5" fill="#35d3f2" opacity="0.15"/>
          <rect x="6" y="5" width="16" height="18" rx="3.5" stroke="#35d3f2" strokeWidth="1.5" fill="none"/>
          <line x1="6" y1="10" x2="22" y2="10" stroke="#35d3f2" strokeWidth="1.5"/>
          <circle cx="10" cy="7.5" r="1" fill="#35d3f2"/>
          <circle cx="15" cy="7.5" r="1" fill="#35d3f2"/>
          <circle cx="20" cy="7.5" r="1" fill="#35d3f2"/>
          <circle cx="18" cy="18" r="2.5" stroke="#55a1ff" strokeWidth="1.5" fill="none"/>
          <line x1="20" y1="18" x2="22" y2="20" stroke="#55a1ff" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="14" x2="11" y2="16" stroke="#55a1ff" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="16" x2="13" y2="17" stroke="#55a1ff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
      {!collapsed && (
        <span className="font-display truncate text-[15px] font-bold tracking-tight text-ink">
           Nexa<span className="text-accent">Booking</span>
        </span>
      )}
    </div>
  );
}

export function NavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Primary">
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            className={cn(
              "group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium transition-colors",
              collapsed && "justify-center px-0",
              active
                ? "bg-accent-soft text-accent"
                : "text-ink-2 hover:bg-surface-2 hover:text-ink"
            )}
          >
            <Icon className={cn("size-4 shrink-0", active ? "text-accent" : "text-ink-3")} />
            {!collapsed && (
              <>
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="ml-auto size-1 rounded-full bg-accent" aria-hidden />
                )}
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function WorkspaceChip({ collapsed }: { collapsed?: boolean }) {
  const { settings, appointmentData } = useApp();
  return (
    <div
      title={settings.businessName}
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-edge bg-surface-2/60 px-2.5 py-2",
        collapsed && "justify-center px-0"
      )}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-[11px] font-bold text-accent">
        {settings.businessName.slice(0, 2).toUpperCase()}
      </span>
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] font-semibold text-ink">
              {settings.businessName}
            </span>
            <span className="block text-[10.5px] text-ink-3">
              {appointmentData.length} نوبت · NexaBooking
            </span>
          </span>
          <ChevronLeft className="size-3.5 text-ink-3" />
        </>
      )}
    </div>
  );
}

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const { profile } = useApp();
  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-30 hidden flex-col border-r border-edge bg-bg-soft/80 lg:flex",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      <div className={cn("flex h-16 items-center", collapsed ? "justify-center px-0" : "px-4")}>
        <BrandMark collapsed={collapsed} />
      </div>
      <div className="flex-1 overflow-y-auto px-2.5 py-2 no-scrollbar">
        <NavLinks collapsed={collapsed} />
      </div>
      <div className="border-t border-edge p-2.5">
        <WorkspaceChip collapsed={collapsed} />
        <Link
          href="/settings"
          className={cn(
            "mt-2 flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-surface-2",
            collapsed && "justify-center px-0"
          )}
        >
          <Avatar name={profile.name || "علی"} color="#55a1ff" size="sm" />
          {!collapsed && (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold text-ink">
                {profile.name || "علی رضایی"}
              </span>
              <span className="block truncate text-[10.5px] text-ink-3">
                {profile.role || "مدیر"}
              </span>
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
}