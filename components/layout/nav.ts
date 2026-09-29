import { LayoutDashboard, CalendarDays, ListChecks, ContactRound, Scissors, Users, Clock, CreditCard, BarChart3, Settings } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  exact?: boolean;
}

export const NAV: NavItem[] = [
  { href: "/", label: "نمای کلی", icon: LayoutDashboard },
  { href: "/calendar", label: "تقویم", icon: CalendarDays },
  { href: "/appointments", label: "نوبت‌ها", icon: ListChecks },
  { href: "/customers", label: "مشتریان", icon: ContactRound },
  { href: "/services", label: "خدمات", icon: Scissors },
  { href: "/staff", label: "کارکنان", icon: Users },
  { href: "/availability", label: "ساعات کاری", icon: Clock },
  { href: "/payments", label: "پرداخت‌ها", icon: CreditCard },
  { href: "/reports", label: "گزارش‌ها", icon: BarChart3 },
  { href: "/settings", label: "تنظیمات", icon: Settings },
];