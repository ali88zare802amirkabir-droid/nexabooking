export type ApptStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled" | "No-show";
export type CustomerStatus = "Active" | "New" | "Inactive";
export type PaymentStatus = "Paid" | "Pending" | "Refunded";
export type PaymentMethod = "Card" | "Cash" | "Online";
export type StaffStatus = "Available" | "Off" | "On Leave";
export type ServiceStatus = "Active" | "Inactive";

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  status: StaffStatus;
  avatarColor: string;
  phone: string;
  email: string;
  services: string[];
  appointmentsToday: number;
  workingHours: Record<string, { start: string; end: string; off: boolean; break?: string }>;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number; // minutes
  price: number;
  staffId: string;
  status: ServiceStatus;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarColor: string;
  status: CustomerStatus;
  sinceDaysAgo: number;
  totalAppointments: number;
  totalSpent: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  serviceId: string;
  staffId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  duration: number; // minutes
  status: ApptStatus;
  notes: string;
  paymentStatus: PaymentStatus;
  amount: number;
  monthOffset: number;
  daysAgo: number;
}

export interface Payment {
  id: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  method: PaymentMethod;
  date: string; // YYYY-MM-DD
  daysAgo: number;
  status: PaymentStatus;
}

export type NotificationKind =
  | "appointment"
  | "payment"
  | "customer"
  | "staff"
  | "reminder";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  desc: string;
  minsAgo: number;
  read: boolean;
}

export interface AvailabilityDay {
  day: string;
  off: boolean;
  start: string;
  end: string;
  breakTime?: string;
}

export interface AppSettings {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  timezone: string;
  currency: string;
  density: boolean;
  reduceMotion: boolean;
  defaultDuration: number;
  cancellationWindow: number;
  bufferTime: number;
  notifAppointments: boolean;
  notifPayments: boolean;
  notifStaff: boolean;
}

export interface Profile {
  name: string;
  email: string;
  role: string;
}

export interface ToastMessage {
  id?: string;
  title: string;
  desc?: string;
  variant: "success" | "info" | "danger";
}