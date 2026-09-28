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