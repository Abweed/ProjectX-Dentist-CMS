"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FlaskConical,
  Settings,
  Bell,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/lab", label: "Lab Cases", icon: FlaskConical, badge: 3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-white border-r border-border h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">DentaFlow</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Practice Suite</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className={cn("w-4 h-4", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {label}
              </span>
              {badge != null && (
                <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-amber-100 text-amber-700 border-0">
                  {badge}
                </Badge>
              )}
              {active && !badge && <ChevronRight className="w-3 h-3 text-primary/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-3 space-y-0.5 border-t border-border pt-3">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          Notifications
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        {/* Provider badge */}
        <div className="flex items-center gap-2.5 px-3 py-2 mt-2">
          <div className="w-7 h-7 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
            EC
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">Dr. Emily Chen</p>
            <p className="text-[10px] text-muted-foreground">General Dentist</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
