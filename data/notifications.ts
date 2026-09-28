export const notifications = [
  { id: "n-01", kind: "appointment", title: "Appointment confirmed", desc: "Daniel Moore — Haircut at 09:00", minsAgo: 15, read: false },
  { id: "n-02", kind: "payment", title: "Payment received", desc: "$35 from Daniel Moore (Card)", minsAgo: 45, read: false },
  { id: "n-03", kind: "customer", title: "New customer", desc: "Isabella Rossi signed up", minsAgo: 120, read: false },
  { id: "n-04", kind: "reminder", title: "Upcoming appointment", desc: "Sophie Turner — Facial at 11:00", minsAgo: 180, read: true },
  { id: "n-05", kind: "appointment", title: "Appointment cancelled", desc: "Hannah Weber — Massage cancelled", minsAgo: 360, read: true },
  { id: "n-06", kind: "staff", title: "Schedule updated", desc: "Amir Karimi is on leave today", minsAgo: 720, read: true },
  { id: "n-07", kind: "payment", title: "Refund processed", desc: "$60 refunded to Thomas Meyer", minsAgo: 1440, read: true },
  { id: "n-08", kind: "customer", title: "Customer note added", desc: "Note added to Daniel Moore's profile", minsAgo: 2880, read: true },
  { id: "n-09", kind: "appointment", title: "Appointment completed", desc: "Reza Ahmadi finished Kenji Tanaka's haircut", minsAgo: 4320, read: true },
  { id: "n-10", kind: "reminder", title: "Staff reminder", desc: "Fatemeh Yousefi has 3 appointments today", minsAgo: 5400, read: true },
];

export function unreadCount(): number {
  return notifications.filter((n) => !n.read).length;
}