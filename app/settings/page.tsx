"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Select, TextInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { settings, updateSettings } = useApp();
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" subtitle="Manage your booking platform" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business Profile */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Business Profile</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Business Name
              <TextInput value={settings.businessName} onChange={(e) => updateSettings({ businessName: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Email
              <TextInput type="email" value={settings.businessEmail} onChange={(e) => updateSettings({ businessEmail: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Phone
              <TextInput value={settings.businessPhone} onChange={(e) => updateSettings({ businessPhone: e.target.value })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Address
              <TextInput value={settings.businessAddress} onChange={(e) => updateSettings({ businessAddress: e.target.value })} />
            </label>
            <Select value={settings.timezone} onChange={(e) => updateSettings({ timezone: e.target.value })}>
              {["America/New_York", "America/Chicago", "America/Los_Angeles", "Europe/London"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Appearance</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Dark / Light Theme</p>
                <p className="text-[11.5px] text-ink-3">Toggle between themes</p>
              </div>
              <button type="button" onClick={() => { document.documentElement.classList.toggle("light"); localStorage.setItem("nexabooking-theme", document.documentElement.classList.contains("light") ? "light" : ""); }} className="h-8 w-12 rounded-full bg-accent relative transition-colors" aria-label="Toggle theme">
                <span className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Compact Density</p>
                <p className="text-[11.5px] text-ink-3">Reduce spacing</p>
              </div>
              <button type="button" onClick={() => updateSettings({ density: !settings.density })} className={cn("h-8 w-12 rounded-full transition-colors", settings.density ? "bg-accent" : "bg-surface-2")} aria-label="Toggle density">
                <span className={cn("h-6 w-6 rounded-full bg-white shadow transition-transform", settings.density ? "translate-x-4" : "translate-x-1")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Reduce Motion</p>
                <p className="text-[11.5px] text-ink-3">Minimize animations</p>
              </div>
              <button type="button" onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })} className={cn("h-8 w-12 rounded-full transition-colors", settings.reduceMotion ? "bg-accent" : "bg-surface-2")} aria-label="Toggle motion">
                <span className={cn("h-6 w-6 rounded-full bg-white shadow transition-transform", settings.reduceMotion ? "translate-x-4" : "translate-x-1")} />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Notifications</h2>
          <div className="flex flex-col gap-4">
            {[
              { key: "notifAppointments", label: "Appointment Reminders", desc: "Get notified before appointments" },
              { key: "notifPayments", label: "Payment Notifications", desc: "When payments are received" },
              { key: "notifStaff", label: "Staff Notifications", desc: "Schedule changes and updates" },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-ink">{n.label}</p>
                  <p className="text-[11.5px] text-ink-3">{n.desc}</p>
                </div>
                <button type="button" onClick={() => updateSettings({ [n.key]: !settings[n.key as keyof typeof settings] })} className={cn("h-8 w-12 rounded-full transition-colors", settings[n.key as keyof typeof settings] ? "bg-accent" : "bg-surface-2")} aria-label={n.label}>
                  <span className={cn("h-6 w-6 rounded-full bg-white shadow transition-transform", settings[n.key as keyof typeof settings] ? "translate-x-4" : "translate-x-1")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Settings */}
        <div className="card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">Booking Settings</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Default Duration (min)
              <TextInput type="number" value={settings.defaultDuration} onChange={(e) => updateSettings({ defaultDuration: Number(e.target.value) })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Cancellation Window (hours)
              <TextInput type="number" value={settings.cancellationWindow} onChange={(e) => updateSettings({ cancellationWindow: Number(e.target.value) })} />
            </label>
            <label className="flex flex-col gap-1.5 text-[12px] font-medium text-ink-2">
              Buffer Time (min)
              <TextInput type="number" value={settings.bufferTime} onChange={(e) => updateSettings({ bufferTime: Number(e.target.value) })} />
            </label>
          </div>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-4 right-4 rounded-xl bg-ok/90 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Settings saved!
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <Button onClick={save}>Save Settings</Button>
      </div>
    </div>
  );
}