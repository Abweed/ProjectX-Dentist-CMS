"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartPulse,
  LayoutGrid,
  CalendarDays,
  User,
  MessageSquare,
  Clock,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const topNavItems = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/patients/123", label: "Patients", icon: User }, // Hardcoded for demo
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/history", label: "History", icon: Clock },
  { href: "/documents", label: "Documents", icon: FileText },
];

const bottomNavItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  // Assume we want /patients/123 to be active for the demo
  const isPatientsActive = pathname.startsWith("/patients");

  return (
    <aside className="w-[84px] shrink-0 flex flex-col items-center py-8 bg-white h-full relative z-10 border-r border-slate-100">
      {/* Logo */}
      <div className="mb-10 w-full px-2">
        <Link href="/">
          <div className="flex flex-col items-center justify-center w-full py-2">
            <span className="font-black text-blue-600 text-xl leading-tight text-center tracking-tighter">SMS</span>
            <span className="font-bold text-slate-800 text-[9px] uppercase tracking-wider mt-0.5">Dental</span>
          </div>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col items-center gap-2 w-full px-2">
        {topNavItems.map(({ href, label, icon: Icon }) => {
          let active = pathname === href;
          if (label === "Patients" && isPatientsActive) active = true;

          return (
            <Link
              key={label}
              href={href}
              title={label}
              className={cn(
                "relative flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all group",
                active ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              )}
            >
              {active && (
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-md" />
              )}
              <Icon className="w-5 h-5 mb-1" strokeWidth={active ? 2.5 : 2} fill={active ? "currentColor" : "none"} />
              <span className="text-[10px] font-medium leading-tight text-center">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="flex flex-col items-center gap-2 w-full mt-auto pt-6 px-2">
        {bottomNavItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            title={label}
            className="flex flex-col items-center justify-center w-full py-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all group"
          >
            <Icon className="w-5 h-5 mb-1" strokeWidth={2} />
            <span className="text-[10px] font-medium leading-tight text-center">{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
