export const notifications = [
  { id: "n-01", kind: "appointment", title: "نوبت تأیید شد", desc: "دانیل مور — کوتاهی مو ساعت ۰۹:۰۰", minsAgo: 15, read: false },
  { id: "n-02", kind: "payment", title: "پرداخت دریافت شد", desc: "۳۵ دلار از دانیل مور (کارت)", minsAgo: 45, read: false },
  { id: "n-03", kind: "customer", title: "مشتری جدید", desc: "ایزابل روسی ثبت‌نام کرد", minsAgo: 120, read: false },
  { id: "n-04", kind: "reminder", title: "نوبت آتی", desc: "سوفی ترنر — پوست در ساعت ۱۱:۰۰", minsAgo: 180, read: true },
  { id: "n-05", kind: "appointment", title: "نوبت لغو شد", desc: "هانا وبر — ماساژ لغو شد", minsAgo: 360, read: true },
  { id: "n-06", kind: "staff", title: "برنامه بروزرسانی شد", desc: "امیر کریمی امروز مرخصی است", minsAgo: 720, read: true },
  { id: "n-07", kind: "payment", title: "مسترد پردازش شد", desc: "۶۰ دلار به توماس مییر مسترد شد", minsAgo: 1440, read: true },
  { id: "n-08", kind: "customer", title: "یادداشت مشتری افزوده شد", desc: "یادداشت به پروفایل دانیل مور افزوده شد", minsAgo: 2880, read: true },
  { id: "n-09", kind: "appointment", title: "نوبت تکمیل شد", desc: "رضا احمدی کوتاهی مو کنجی تاناکا را انجام داد", minsAgo: 4320, read: true },
  { id: "n-10", kind: "reminder", title: "یادآوری کارمند", desc: "فاطمه یوسفی ۳ نوبت امروز دارد", minsAgo: 5400, read: true },
];

export function unreadCount(): number {
  return notifications.filter((n) => !n.read).length;
}