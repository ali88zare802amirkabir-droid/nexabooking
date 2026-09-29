export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Deterministic number-driven money formatter (no Date involved). */
export function formatMoney(value: number, currency = "$"): string {
  const abs = Math.abs(value);
  const compact = (n: number, digits: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    });
  if (abs >= 1_000_000) {
    const v = value / 1_000_000;
    return `${currency}${compact(parseFloat(v.toFixed(1)), 1).replace(/\.0$/, "")}M`;
  }
  if (abs >= 1_000) {
    const digits = abs >= 100_000 ? 0 : 1;
    const v = value / 1_000;
    return `${currency}${compact(parseFloat(v.toFixed(digits)), digits).replace(/\.0$/, "")}K`;
  }
  return `${currency}${Math.round(value).toLocaleString("en-US")}`;
}

/** deterministic relative label from raw minutes (Persian) */
export function relMins(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  if (m < 1) return "همین حالا";
  if (m < 60) return `${m} دقیقه پیش`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ساعت پیش`;
  return `${Math.floor(h / 24)} روز پیش`;
}

/** deterministic label from "days ago" (Persian) */
export function relAgoDays(days: number): string {
  if (days <= 0) return "امروز";
  if (days === 1) return "دیروز";
  return `${days} روز پیش`;
}

/** deterministic label for "days from now" (Persian) */
export function relInDays(days: number): string {
  if (days <= 0) return `${Math.abs(days)} روز تأخیر`;
  if (days === 0) return "امروز";
  if (days === 1) return "فردا";
  return `${days} روز آینده`;
}

/** deterministic tenure label from "days ago" (Persian) */
export function tenureLabel(days: number): string {
  if (days <= 0) return "از امروز";
  if (days < 30) return `${days} روز`;
  if (days < 365) return `${Math.floor(days / 30)} ماه`;
  const y = Math.floor(days / 365);
  const m = Math.floor((days % 365) / 30);
  return m > 0 ? `${y} سال و ${m} ماه` : `${y} سال`;
}

export function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "صبح بخیر";
  if (hour < 17) return "ظهر بخیر";
  return "عصر بخیر";
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}