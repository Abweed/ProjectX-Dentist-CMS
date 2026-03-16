import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { AppointmentProvider } from "@/components/providers/AppointmentProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DentaFlow PMS — Practice Management",
  description: "Modern Dental Practice Management Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#779ECB]`}>
        <div className="flex h-screen w-screen p-4 lg:p-6 overflow-hidden">
          <div className="flex w-full h-full bg-white rounded-[2.5rem] shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-white rounded-r-[2.5rem] relative">
              <AppointmentProvider>
                {children}
              </AppointmentProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
