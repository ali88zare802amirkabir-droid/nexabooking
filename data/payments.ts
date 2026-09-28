import { appointments } from "./appointments";
export const payments = [
  { id: "pay-01", appointmentId: "a-01", customerId: "c-01", amount: 35, method: "Card", date: "2026-09-20", status: "Paid" },
  { id: "pay-02", appointmentId: "a-02", customerId: "c-02", amount: 70, method: "Online", date: "2026-09-19", status: "Paid" },
  { id: "pay-03", appointmentId: "a-03", customerId: "c-03", amount: 25, method: "Cash", date: "2026-09-18", status: "Paid" },
  { id: "pay-04", appointmentId: "a-04", customerId: "c-04", amount: 65, method: "Card", date: "2026-09-17", status: "Paid" },
  { id: "pay-05", appointmentId: "a-05", customerId: "c-05", amount: 55, method: "Online", date: "2026-09-16", status: "Paid" },
  { id: "pay-06", appointmentId: "a-06", customerId: "c-06", amount: 30, method: "Cash", date: "2026-09-15", status: "Pending" },
  { id: "pay-07", appointmentId: "a-07", customerId: "c-07", amount: 80, method: "Card", date: "2026-09-14", status: "Paid" },
  { id: "pay-08", appointmentId: "a-08", customerId: "c-08", amount: 60, method: "Online", date: "2026-09-13", status: "Paid" },
  { id: "pay-09", appointmentId: "a-09", customerId: "c-09", amount: 90, method: "Card", date: "2026-09-12", status: "Paid" },
  { id: "pay-10", appointmentId: "a-10", customerId: "c-10", amount: 45, method: "Cash", date: "2026-09-11", status: "Paid" },
  { id: "pay-11", appointmentId: "a-11", customerId: "c-11", amount: 120, method: "Card", date: "2026-09-10", status: "Paid" },
  { id: "pay-12", appointmentId: "a-12", customerId: "c-12", amount: 25, method: "Online", date: "2026-09-09", status: "Pending" },
  { id: "pay-13", appointmentId: "a-13", customerId: "c-13", amount: 50, method: "Card", date: "2026-09-08", status: "Paid" },
  { id: "pay-14", appointmentId: "a-14", customerId: "c-14", amount: 35, method: "Cash", date: "2026-09-07", status: "Paid" },
  { id: "pay-15", appointmentId: "a-15", customerId: "c-15", amount: 60, method: "Online", date: "2026-09-06", status: "Refunded" },
  { id: "pay-16", appointmentId: "a-16", customerId: "c-16", amount: 70, method: "Card", date: "2026-09-05", status: "Paid" },
  { id: "pay-17", appointmentId: "a-17", customerId: "c-17", amount: 40, method: "Cash", date: "2026-09-04", status: "Paid" },
  { id: "pay-18", appointmentId: "a-18", customerId: "c-18", amount: 80, method: "Online", date: "2026-09-03", status: "Paid" },
  { id: "pay-19", appointmentId: "a-19", customerId: "c-19", amount: 30, method: "Card", date: "2026-09-02", status: "Paid" },
  { id: "pay-20", appointmentId: "a-20", customerId: "c-20", amount: 90, method: "Online", date: "2026-09-01", status: "Paid" },
  { id: "pay-21", appointmentId: "a-21", customerId: "c-21", amount: 25, method: "Cash", date: "2026-08-30", status: "Pending" },
  { id: "pay-22", appointmentId: "a-22", customerId: "c-22", amount: 55, method: "Card", date: "2026-08-29", status: "Paid" },
  { id: "pay-23", appointmentId: "a-23", customerId: "c-23", amount: 45, method: "Online", date: "2026-08-28", status: "Paid" },
  { id: "pay-24", appointmentId: "a-24", customerId: "c-24", amount: 120, method: "Card", date: "2026-08-27", status: "Paid" },
  { id: "pay-25", appointmentId: "a-25", customerId: "c-25", amount: 35, method: "Cash", date: "2026-08-26", status: "Paid" },
];

export function getPaymentByApptId(apptId: string) {
  return payments.find((p) => p.appointmentId === apptId);
}