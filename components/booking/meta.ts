import type { ApptStatus, CustomerStatus, PaymentStatus, StaffStatus, ServiceStatus } from "@/lib/types";

export const STATUS_TONE: Record<ApptStatus, { cls: string; dot: string }> = {
  Confirmed: { cls: "bg-[#55a1ff]/10 text-[#55a1ff]", dot: "bg-[#55a1ff]" },
  Pending: { cls: "bg-[#fbbf24]/10 text-[#fbbf24]", dot: "bg-[#fbbf24]" },
  Completed: { cls: "bg-[#4ade80]/10 text-[#4ade80]", dot: "bg-[#4ade80]" },
  Cancelled: { cls: "bg-[#f87171]/10 text-[#f87171]", dot: "bg-[#f87171]" },
  "No-show": { cls: "bg-[#94a3b8]/10 text-[#94a3b8]", dot: "bg-[#94a3b8]" },
};

export const CUSTOMER_TONE: Record<string, { cls: string }> = {
  Active: { cls: "bg-[#4ade80]/10 text-[#4ade80]" },
  New: { cls: "bg-[#35d3f2]/10 text-[#35d3f2]" },
  Inactive: { cls: "bg-[#94a3b8]/10 text-[#94a3b8]" },
};

export const PAYMENT_TONE: Record<string, { cls: string }> = {
  Paid: { cls: "bg-[#4ade80]/10 text-[#4ade80]" },
  Pending: { cls: "bg-[#fbbf24]/10 text-[#fbbf24]" },
  Refunded: { cls: "bg-[#f87171]/10 text-[#f87171]" },
};

export const STAFF_TONE: Record<string, { cls: string }> = {
  Available: { cls: "bg-[#4ade80]/10 text-[#4ade80]" },
  Off: { cls: "bg-[#94a3b8]/10 text-[#94a3b8]" },
  "On Leave": { cls: "bg-[#fbbf24]/10 text-[#fbbf24]" },
};

export const SERVICE_TONE: Record<string, { cls: string }> = {
  Active: { cls: "bg-[#4ade80]/10 text-[#4ade80]" },
  Inactive: { cls: "bg-[#94a3b8]/10 text-[#94a3b8]" },
};

/** Persian display labels. Data enum keys stay English — always render via these maps. */
export const APPT_STATUS_FA: Record<ApptStatus, string> = {
  Confirmed: "تأییدشده",
  Pending: "در انتظار",
  Completed: "تکمیل‌شده",
  Cancelled: "لغوشده",
  "No-show": "عدم حضور",
};

export const CUSTOMER_STATUS_FA: Record<string, string> = {
  Active: "فعال",
  New: "جدید",
  Inactive: "غیرفعال",
  VIP: "ویژه",
};

export const PAYMENT_STATUS_FA: Record<string, string> = {
  Paid: "پرداخت‌شده",
  Pending: "در انتظار",
  Refunded: "مستردشده",
};

export const PAYMENT_METHOD_FA: Record<string, string> = {
  Card: "کارت",
  Cash: "نقدی",
  Transfer: "حواله",
};

export const STAFF_STATUS_FA: Record<string, string> = {
  Available: "در دسترس",
  Off: "تعطیل",
  "On Leave": "مرخصی",
};

export const SERVICE_STATUS_FA: Record<string, string> = {
  Active: "فعال",
  Inactive: "غیرفعال",
};

export const DAY_FA: Record<string, string> = {
  Monday: "دوشنبه",
  Tuesday: "سه‌شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنجشنبه",
  Friday: "جمعه",
  Saturday: "شنبه",
  Sunday: "یکشنبه",
};

export const CATEGORY_FA: Record<string, string> = {
  Hair: "مو",
  Beauty: "زیبایی",
  Medical: "پزشکی",
  Fitness: "تناسب اندام",
  Repair: "تعمیرات",
  Consulting: "مشاوره",
  Wellness: "تندرستی",
};