export const availability: Record<string, { off: boolean; start: string; end: string; break?: string }> = {
  Monday: { off: false, start: "09:00", end: "17:00", break: "13:00-14:00" },
  Tuesday: { off: false, start: "09:00", end: "17:00", break: "13:00-14:00" },
  Wednesday: { off: true, start: "", end: "" },
  Thursday: { off: false, start: "09:00", end: "17:00", break: "13:00-14:00" },
  Friday: { off: false, start: "09:00", end: "16:00", break: "12:00-13:00" },
  Saturday: { off: false, start: "10:00", end: "15:00", break: "" },
  Sunday: { off: true, start: "", end: "" },
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];