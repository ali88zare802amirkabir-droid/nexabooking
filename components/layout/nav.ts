import { LayoutDashboard, CalendarDays, ListChecks, ContactRound, Scissors, Users, Clock, CreditCard, BarChart3, Settings } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: any;
  exact?: boolean;
}

export const NAV: NavItem[] = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/appointments", label: "Appointments", icon: ListChecks },
  { href: "/customers", label: "Customers", icon: ContactRound },
  { href: "/services", label: "Services", icon: Scissors },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];