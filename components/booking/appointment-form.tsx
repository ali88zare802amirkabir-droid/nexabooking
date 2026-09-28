"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { useApp } from "@/lib/store";
import { uid } from "@/lib/utils";
import { staff } from "@/data/staff";
import { services } from "@/data/services";
import { customers } from "@/data/customers";
import { appointments } from "@/data/appointments";
import type { Appointment, Customer, Service, Staff } from "@/lib/types";

export function AppointmentForm({ onClose }: { onClose: () => void }) {
  const { addAppointment, showToast, customerData, serviceData, staffData } = useApp();
  const [customerId, setCustomerId] = useState(customers[0]?.id ?? "");
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [staffId, setStaffId] = useState(staff[0]?.id ?? "");
  const [date, setDate] = useState("2026-09-28");
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const svc = services.find((s) => s.id === serviceId);
  const dur = svc?.duration ?? duration;

  const submit = () => {
    if (!customerId || !serviceId || !staffId) {
      showToast({ title: "Fill all required fields", variant: "danger" });
      return;
    }
    const newAppt: Appointment = {
      id: `a-${uid()}`, customerId, serviceId, staffId, date, startTime,
      duration: dur, status: "Confirmed", notes,
      paymentStatus: paymentStatus as Appointment["paymentStatus"],
      amount: svc?.price ?? 0, monthOffset: 0, daysAgo: 0,
    };
    addAppointment(newAppt);
    showToast({ title: "Appointment created", variant: "success" });
    onClose();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Customer
          <Select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
            {customerData.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Service
          <Select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            {serviceData.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.price}$)</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Staff
          <Select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
            {staffData.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-edge bg-surface px-2 py-1.5 text-[12.5px] text-ink focus:outline-none focus:border-accent" />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Time
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="rounded-lg border border-edge bg-surface px-2 py-1.5 text-[12.5px] text-ink focus:outline-none focus:border-accent" />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Duration (min)
          <TextInput type="number" min={10} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Payment
          <Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="Pending">Pending</option><option value="Paid">Paid</option><option value="Refunded">Refunded</option>
          </Select>
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-lg border border-edge bg-surface px-2 py-1.5 text-[12.5px] text-ink focus:outline-none focus:border-accent" rows={3} />
      </label>
      <div className="mt-1 flex justify-end"><Button onClick={submit} size="sm">Create Appointment</Button></div>
    </div>
  );
}

export function CustomerForm({ onClose }: { onClose: () => void }) {
  const { addCustomer, showToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim()) { showToast({ title: "Name and email required", variant: "danger" }); return; }
    addCustomer({ id: `c-${uid()}`, name: name.trim(), email: email.trim(), phone: phone.trim(), avatarColor: "#55a1ff", status: "New", sinceDaysAgo: 0, totalAppointments: 0, totalSpent: 0 });
    showToast({ title: "Customer added", variant: "success" });
    onClose();
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Name
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></label>
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Email
        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" /></label>
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Phone
        <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" /></label>
      <div className="mt-1 flex justify-end"><Button onClick={submit} size="sm">Add Customer</Button></div>
    </div>
  );
}

export function ServiceForm({ onClose }: { onClose: () => void }) {
  const { addService, showToast } = useApp();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Hair");
  const [price, setPrice] = useState(50);
  const [duration, setDuration] = useState(60);
  const [staffId, setStaffId] = useState(staff[0]?.id ?? "");

  const submit = () => {
    if (!name.trim()) { showToast({ title: "Service name required", variant: "danger" }); return; }
    addService({ id: `s-${uid()}`, name: name.trim(), category, duration, price, staffId, status: "Active" });
    showToast({ title: "Service added", variant: "success" });
    onClose();
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Service Name
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Haircut" /></label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Category
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["Hair", "Beauty", "Medical", "Fitness", "Repair", "Consulting", "Wellness"].map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Price ($)
          <TextInput type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Duration (min)
          <TextInput type="number" min={5} value={duration} onChange={(e) => setDuration(Number(e.target.value))} /></label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Staff
          <Select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
            {staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </label>
      </div>
      <div className="mt-1 flex justify-end"><Button onClick={submit} size="sm">Add Service</Button></div>
    </div>
  );
}

export function StaffForm({ onClose }: { onClose: () => void }) {
  const { addStaff, showToast } = useApp();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Hair");
  const [staffId, setStaffId] = useState(staff[0]?.id ?? "");

  const submit = () => {
    if (!name.trim() || !role.trim()) { showToast({ title: "Name and role required", variant: "danger" }); return; }
    addStaff({ id: `s-${uid()}`, name: name.trim(), role: role.trim(), department, status: "Available", avatarColor: "#55a1ff", phone: "", email: "", services: [], appointmentsToday: 0, workingHours: { Monday: { off: true, start: "", end: "" }, Tuesday: { off: true, start: "", end: "" }, Wednesday: { off: true, start: "", end: "" }, Thursday: { off: true, start: "", end: "" }, Friday: { off: true, start: "", end: "" }, Saturday: { off: true, start: "", end: "" }, Sunday: { off: true, start: "", end: "" } } });
    showToast({ title: "Staff member added", variant: "success" });
    onClose();
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Name
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></label>
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Role
        <TextInput value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Barber" /></label>
      <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">Department
        <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
          {["Hair", "Beauty", "Medical", "Fitness", "Repair", "Consulting", "Wellness"].map((d) => <option key={d} value={d}>{d}</option>)}
        </Select>
      </label>
      <div className="mt-1 flex justify-end"><Button onClick={submit} size="sm">Add Staff</Button></div>
    </div>
  );
}