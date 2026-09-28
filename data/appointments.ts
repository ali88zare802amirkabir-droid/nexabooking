import type { Appointment } from "../lib/types";

function mk(
  id: string,
  cid: string,
  sid: string,
  staffId: string,
  date: string,
  time: string,
  duration: number,
  status: Appointment["status"],
  payStatus: Appointment["paymentStatus"],
  amount: number,
  notes: string,
): Appointment {
  return { id, customerId: cid, serviceId: sid, staffId, date, startTime: time, duration, status, notes, paymentStatus: payStatus, amount, monthOffset: 0, daysAgo: 0 };
}

// Sep 2026 dates used
const d = (offset: number): string => {
  const dt = new Date(2026, 8, 28 - offset);
  return dt.toISOString().slice(0, 10);
};

export const appointments: Appointment[] = [
  // Today (Sep 28, offset 0)
  mk("a-01", "c-01", "s-01", "s-02", d(0), "09:00", 30, "Confirmed", "Paid", 35, "Regular haircut, ask for premium products."),
  mk("a-02", "c-02", "s-02", "s-03", d(0), "10:30", 60, "Confirmed", "Paid", 55, "Follow-up facial."),
  mk("a-03", "c-03", "s-03", "s-02", d(0), "11:30", 20, "Pending", "Pending", 25, ""),
  mk("a-04", "c-04", "s-04", "s-03", d(0), "13:00", 60, "Confirmed", "Paid", 70, "Swedish massage, deep tissue."),
  mk("a-05", "c-05", "s-05", "s-05", d(0), "14:30", 60, "Confirmed", "Pending", 60, "First session."),
  mk("a-06", "c-06", "s-06", "s-02", d(0), "15:30", 45, "Cancelled", "Pending", 45, "Customer cancelled 2 hours ago."),
  mk("a-07", "c-07", "s-07", "s-05", d(0), "16:00", 60, "Pending", "Pending", 60, ""),

  // Sep 27 (offset 1)
  mk("a-08", "c-08", "s-08", "s-03", d(1), "09:30", 30, "Completed", "Paid", 30, "Manicure done, happy customer."),
  mk("a-09", "c-09", "s-09", "s-05", d(1), "11:00", 60, "Completed", "Paid", 60, "Personal training session."),
  mk("a-10", "c-10", "s-10", "s-03", d(1), "14:00", 40, "Completed", "Paid", 35, ""),
  mk("a-11", "c-11", "s-11", "s-02", d(1), "15:00", 90, "Completed", "Paid", 65, "Hair coloring, roots touch-up."),

  // Sep 26 (offset 2)
  mk("a-12", "c-12", "s-12", "s-04", d(2), "10:00", 45, "Completed", "Paid", 80, "Dental checkup, teeth cleaned."),
  mk("a-13", "c-13", "s-13", "s-03", d(2), "11:30", 30, "No-show", "Pending", 30, "Customer did not show up."),
  mk("a-14", "c-14", "s-14", "s-04", d(2), "13:00", 30, "Completed", "Paid", 30, "Manicure, gel polish."),
  mk("a-15", "c-15", "s-15", "s-02", d(2), "15:30", 45, "Cancelled", "Pending", 45, "Rescheduled."),

  // Sep 25 (offset 3)
  mk("a-16", "c-16", "s-16", "s-03", d(3), "09:00", 60, "Completed", "Paid", 55, "Classic facial, excellent result."),
  mk("a-17", "c-17", "s-17", "s-04", d(3), "11:00", 30, "Completed", "Paid", 35, "Haircut, beard trim combo."),
  mk("a-18", "c-18", "s-18", "s-05", d(3), "14:00", 60, "Confirmed", "Paid", 60, "Yoga class, private session."),
  mk("a-19", "c-19", "s-19", "s-03", d(3), "16:00", 40, "Completed", "Paid", 40, "Pedicure."),

  // Sep 24 (offset 4)
  mk("a-20", "c-20", "s-20", "s-02", d(4), "10:00", 30, "Completed", "Paid", 35, "Haircut."),
  mk("a-21", "c-21", "s-21", "s-05", d(4), "11:30", 60, "Confirmed", "Pending", 60, "New client, first session."),
  mk("a-22", "c-22", "s-22", "s-03", d(4), "13:00", 60, "Completed", "Paid", 55, "Facial, glow treatment."),
  mk("a-23", "c-23", "s-23", "s-04", d(4), "15:00", 30, "Completed", "Paid", 30, "Manicure."),

  // Sep 23 (offset 5)
  mk("a-24", "c-24", "s-24", "s-03", d(5), "09:30", 60, "Completed", "Paid", 70, "Massage, 60min deep tissue."),
  mk("a-25", "c-25", "s-25", "s-02", d(5), "11:00", 90, "No-show", "Pending", 65, "Customer no-show."),
  mk("a-26", "c-26", "s-26", "s-05", d(5), "14:00", 60, "Confirmed", "Paid", 60, "Personal training."),

  // Sep 22 (offset 6)
  mk("a-27", "c-27", "s-27", "s-03", d(6), "10:00", 45, "Completed", "Paid", 45, "Body scrub."),
  mk("a-28", "c-28", "s-28", "s-04", d(6), "13:00", 45, "Completed", "Paid", 30, "Haircut."),
  mk("a-29", "c-29", "s-29", "s-05", d(6), "15:30", 60, "Confirmed", "Pending", 60, "Yoga class."),

  // Sep 21 (offset 7)
  mk("a-30", "c-30", "s-30", "s-02", d(7), "09:00", 30, "Completed", "Paid", 35, "Haircut, senior discount."),
  mk("a-31", "c-01", "s-01", "s-03", d(7), "11:00", 60, "Completed", "Paid", 55, "Follow-up facial."),
  mk("a-32", "c-02", "s-02", "s-02", d(7), "14:00", 90, "Confirmed", "Paid", 65, "Hair coloring."),
  mk("a-33", "c-03", "s-03", "s-04", d(7), "16:00", 30, "Cancelled", "Pending", 25, "Rescheduled to tomorrow."),

  // Sep 20 (offset 8)
  mk("a-34", "c-04", "s-04", "s-03", d(8), "10:30", 60, "Completed", "Paid", 70, "Massage, deep relaxation."),
  mk("a-35", "c-05", "s-05", "s-05", d(8), "12:00", 60, "Completed", "Paid", 60, "Personal training."),
  mk("a-36", "c-06", "s-06", "s-02", d(8), "14:30", 30, "Completed", "Paid", 35, "Haircut."),

  // Sep 19 (offset 9)
  mk("a-37", "c-07", "s-07", "s-03", d(9), "09:00", 60, "Completed", "Paid", 55, "Facial."),
  mk("a-38", "c-08", "s-08", "s-04", d(9), "11:00", 45, "Completed", "Paid", 45, "Body scrub."),
  mk("a-39", "c-09", "s-09", "s-05", d(9), "13:30", 60, "Confirmed", "Pending", 60, "Personal training."),

  // Sep 18 (offset 10)
  mk("a-40", "c-10", "s-10", "s-03", d(10), "10:00", 40, "Completed", "Paid", 35, "Pedicure."),
  mk("a-41", "c-11", "s-11", "s-02", d(10), "14:00", 30, "Completed", "Paid", 35, "Haircut."),
  mk("a-42", "c-12", "s-12", "s-04", d(10), "16:00", 45, "Completed", "Paid", 80, "Dental checkup."),
];

export function getAppointment(id: string) {
  return appointments.find((a) => a.id === id) ?? appointments[0];
}