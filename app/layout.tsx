import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NexaBooking — Appointment Management",
    template: "%s · NexaBooking",
  },
  description:
    "NexaBooking is a polished appointment and booking management UI demo — a portfolio prototype covering calendar, appointments, customers, services, staff, payments and reporting.",
  openGraph: {
    title: "NexaBooking — Appointment Management",
    description:
      "A polished booking product UI demo: calendar, appointments, customers, services, staff, payments and reporting.",
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
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("nexaerp-theme");document.documentElement.classList.toggle("light",t==="light")}catch(e){}`,
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