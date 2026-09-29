import { useState, useCallback, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import type { ApptStatus, CustomerStatus, PaymentStatus, StaffStatus, ServiceStatus, AppSettings, ToastMessage, NotificationItem, Appointment, Customer, Service, Staff, Payment } from "./types";
import { staff } from "../data/staff";
import { services } from "../data/services";
import { customers } from "../data/customers";
import { appointments } from "../data/appointments";
import { payments } from "../data/payments";
import { notifications } from "../data/notifications";
import { formatMoney } from "./utils";

export type View = "overview" | "calendar" | "appointments" | "customers" | "services" | "staff" | "availability" | "payments" | "reports" | "settings";

interface Store {
  view: View;
  setView: (v: View) => void;
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
  toast: ToastMessage | null;
  toasts: ToastMessage[];
  showToast: (t: ToastMessage) => void;
  dismissToast: (id: string) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (v: boolean) => void;
  profile: { name: string; role: string };
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  staffData: Staff[];
  employees: Staff[];
  serviceData: Service[];
  customerData: Customer[];
  customers: Customer[];
  appointmentData: Appointment[];
  paymentData: Payment[];
  products: Service[];
  invoices: Payment[];
  projects: unknown[];
  money: (n: number) => string;
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
  addAppointment: (a: Appointment) => void;
  updateAppointmentStatus: (id: string, status: ApptStatus) => void;
  cancelAppointment: (id: string) => void;
  markCompleted: (id: string) => void;
  addCustomer: (c: Customer) => void;
  addService: (s: Service) => void;
  addStaff: (s: Staff) => void;
  appointments: Appointment[];
  services: Service[];
}

const defaultSettings: AppSettings = {
  businessName: "NexaBooking",
  businessEmail: "hello@nexabooking.com",
  businessPhone: "+1 (555) 020-0000",
  businessAddress: "123 Wellness Ave, Suite 100",
  timezone: "America/New_York",
  currency: "USD",
  density: false,
  reduceMotion: false,
  defaultDuration: 60,
  cancellationWindow: 24,
  bufferTime: 15,
  notifAppointments: true,
  notifPayments: true,
  notifStaff: true,
};

export const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const router = useRouter();

  const [staffData, setStaffData] = useState<Staff[]>(staff as Staff[]);
  const [serviceData, setServiceData] = useState<Service[]>(services as Service[]);
  const [customerData, setCustomerData] = useState<Customer[]>(customers as Customer[]);
  const [appointmentData, setAppointmentData] = useState<Appointment[]>(appointments as Appointment[]);
  const [paymentData, setPaymentData] = useState<Payment[]>(payments as Payment[]);
  const [notificationData, setNotificationData] = useState<NotificationItem[]>(notifications as NotificationItem[]);

  const showToast = useCallback((t: ToastMessage) => {
    setToasts((prev) => [...prev, { ...t, id: t.id ?? Math.random().toString(36).slice(2, 8) }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addAppointment = useCallback((a: Appointment) => {
    setAppointmentData((prev) => [a, ...prev]);
  }, []);

  const updateAppointmentStatus = useCallback((id: string, status: ApptStatus) => {
    setAppointmentData((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setAppointmentData((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" as ApptStatus } : a)));
    showToast({ title: "نوبت لغو شد", variant: "info" });
  }, [showToast]);

  const markCompleted = useCallback((id: string) => {
    setAppointmentData((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Completed" as ApptStatus } : a)));
    showToast({ title: "تکمیل شد", variant: "success" });
  }, [showToast]);

  const markNotificationRead = useCallback((id: string) => {
    setNotificationData((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotificationData((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addCustomer = useCallback((c: Customer) => {
    setCustomerData((prev) => [c, ...prev]);
  }, []);

  const addService = useCallback((s: Service) => {
    setServiceData((prev) => [...prev, s]);
  }, []);

  const addStaff = useCallback((s: Staff) => {
    setStaffData((prev) => [...prev, s]);
  }, []);

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  }, []);

  const value: Store = {
    view, setView,
    sidebarOpen, sidebarCollapsed: sidebarOpen, toggleSidebar: () => setSidebarOpen((o) => !o),
    mobileNavOpen, setMobileNavOpen,
    toast: toasts[0] ?? null, toasts, showToast, dismissToast,
    searchOpen, setSearchOpen, notificationsOpen, setNotificationsOpen,
    profile: { name: "علی رضایی", role: "مدیر" },
    notifications: notificationData,
    markNotificationRead, markAllNotificationsRead,
    staffData, employees: staffData,
    serviceData, customerData, customers: customerData,
    appointmentData, paymentData,
    products: serviceData,
    invoices: paymentData,
    projects: [],
    money: formatMoney,
    settings, updateSettings,
    addAppointment, updateAppointmentStatus, cancelAppointment, markCompleted,
    addCustomer, addService, addStaff,
    appointments: appointmentData,
    services: serviceData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const AppStoreProvider = StoreProvider;

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useApp() {
  return useStore();
}