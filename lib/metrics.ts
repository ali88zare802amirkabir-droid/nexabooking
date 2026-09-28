import { appointments } from "../data/appointments";
import { customers } from "../data/customers";
import { services } from "../data/services";
import { staff } from "../data/staff";
import { payments } from "../data/payments";
import { notifications } from "../data/notifications";
import type { ApptStatus } from "../lib/types";

const today = "2026-09-28";
const thisWeek = ["2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25", "2026-09-26", "2026-09-27", "2026-09-28"];
const thisMonth = (d: Date) => d.getUTCFullYear() === 2026 && d.getUTCMonth() === 8;

export const metrics = {
  todayAppointments: appointments.filter((a) => a.date === today).length,
  upcomingAppointments: appointments.filter((a) => a.date >= today && a.status !== "Cancelled" && a.status !== "No-show").length,
  completedToday: appointments.filter((a) => a.date === today && a.status === "Completed").length,
  noShowsToday: appointments.filter((a) => a.date === today && a.status === "No-show").length,
  revenueToday: appointments.filter((a) => a.date === today && (a.status === "Completed" || a.status === "Confirmed")).reduce((s, a) => s + a.amount, 0),
  newCustomers: customers.filter((c) => c.sinceDaysAgo < 30).length,
  totalAppointments: appointments.length,
  totalCustomers: customers.length,
  totalServices: services.length,
  totalStaff: staff.length,
  totalRevenueAll: payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0),
};

export function revenueThisWeek(): number {
  return payments.filter((p) => thisWeek.includes(p.date) && p.status === "Paid").reduce((s, p) => s + p.amount, 0);
}

export function revenueThisMonth(): number {
  return payments.filter((p) => new Date(p.date).getTime() >= new Date(2026, 8, 1).getTime() && p.status === "Paid").reduce((s, p) => s + p.amount, 0);
}

export function appointmentStats() {
  const all = appointments;
  return {
    total: all.length,
    confirmed: all.filter((a) => a.status === "Confirmed").length,
    pending: all.filter((a) => a.status === "Pending").length,
    completed: all.filter((a) => a.status === "Completed").length,
    cancelled: all.filter((a) => a.status === "Cancelled").length,
    noShow: all.filter((a) => a.status === "No-show").length,
  };
}

export function completionRate(): number {
  const s = appointmentStats();
  return s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
}

export function cancellationRate(): number {
  const s = appointmentStats();
  return s.total > 0 ? Math.round((s.cancelled / s.total) * 100) : 0;
}

export function noShowRate(): number {
  const s = appointmentStats();
  return s.total > 0 ? Math.round((s.noShow / s.total) * 100) : 0;
}

export function averageBookingValue(): number {
  const paid = payments.filter((p) => p.status === "Paid");
  return paid.length > 0 ? Math.round(paid.reduce((s, p) => s + p.amount, 0) / paid.length) : 0;
}

export function upcomingAppointments(count = 5) {
  return appointments
    .filter((a) => a.date >= today && a.status !== "Cancelled" && a.status !== "No-show")
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
    .slice(0, count);
}

export function todaysSchedule() {
  return appointments
    .filter((a) => a.date === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function servicePopularity() {
  const map = new Map<string, number>();
  appointments.forEach((a) => {
    const svc = services.find((s) => s.id === a.serviceId);
    if (svc) map.set(svc.name, (map.get(svc.name) ?? 0) + 1);
  });
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
}

export function staffPerformance() {
  return staff.map((s) => {
    const apts = appointments.filter((a) => a.staffId === s.id);
    const completed = apts.filter((a) => a.status === "Completed").length;
    const revenue = payments.filter((p) => p.appointmentId && apts.some((a) => a.id === p.appointmentId) && p.status === "Paid").reduce((sum, p) => {
      const a = apts.find((x) => x.id === p.appointmentId);
      return a ? sum + a.amount : sum;
    }, 0);
    return { name: s.name, completed, revenue };
  }).sort((a, b) => b.completed - a.completed);
}

export function customerGrowth() {
  const byMonth = new Map<number, number>();
  customers.forEach((c) => {
    const m = 8 - Math.floor(c.sinceDaysAgo / 30);
    if (m >= 6) byMonth.set(m, (byMonth.get(m) ?? 0) + 1);
  });
  return [6, 7, 8].map((m) => ({ label: ["Jul", "Aug", "Sep"][m - 6], count: byMonth.get(m) ?? 0 }));
}

export function revenueTrend() {
  return [
    { label: "Mon", revenue: 1200, appointments: 14 },
    { label: "Tue", revenue: 1850, appointments: 22 },
    { label: "Wed", revenue: 980, appointments: 11 },
    { label: "Thu", revenue: 2400, appointments: 28 },
    { label: "Fri", revenue: 2100, appointments: 25 },
    { label: "Sat", revenue: 1600, appointments: 19 },
    { label: "Sun", revenue: 400, appointments: 4 },
  ];
}

export function getCustomerStats(id: string) {
  const apts = appointments.filter((a) => a.customerId === id);
  const paid = payments.filter((p) => p.customerId === id && p.status === "Paid");
  return {
    totalVisits: apts.length,
    cancelled: apts.filter((a) => a.status === "Cancelled").length,
    noShow: apts.filter((a) => a.status === "No-show").length,
    lifetimeValue: paid.reduce((s, p) => s + p.amount, 0),
  };
}

export function getCustomerAppointments(id: string) {
  return appointments.filter((a) => a.customerId === id).sort((a, b) => b.date.localeCompare(a.date));
}

export function getCustomerUpcoming(id: string) {
  return appointments
    .filter((a) => a.customerId === id && a.date >= today && a.status !== "Cancelled" && a.status !== "No-show")
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
}

export function getServiceAppointments(serviceId: string) {
  return appointments.filter((a) => a.serviceId === serviceId);
}

export function getStaffAppointments(staffId: string) {
  return appointments.filter((a) => a.staffId === staffId);
}

export function getStaffUpcoming(staffId: string) {
  return appointments
    .filter((a) => a.staffId === staffId && a.date >= today && a.status !== "Cancelled" && a.status !== "No-show")
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
}