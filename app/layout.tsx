import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/layout/app-shell";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "نکسابوکینگ — مدیریت نوبت‌دهی",
    template: "%s · نکسابوکینگ",
  },
  description:
    "نکسابوکینگ یک نمونه‌ی نمایشی فارسی برای مدیریت نوبت و رزرو است — تقویم، نوبت‌ها، مشتریان، خدمات، کارکنان، پرداخت‌ها و گزارش‌ها.",
  openGraph: {
    title: "نکسابوکینگ — مدیریت نوبت‌دهی",
    description:
      "نمونه‌ی رابط کاربری فارسی محصول رزرو نوبت: تقویم، نوبت‌ها، مشتریان، خدمات، کارکنان، پرداخت‌ها و گزارش‌ها.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b12",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={vazir.variable}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("nexabooking-theme");document.documentElement.classList.toggle("light",t==="light")}catch(e){}`,
          }}
        />
        <div className="app-bg" aria-hidden />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}