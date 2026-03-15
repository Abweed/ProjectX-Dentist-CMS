"use client";

import { CalendarDays, RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardHeader() {
  const today = new Date("2026-03-16");
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-border sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-bold text-foreground">Good morning, Dr. Chen</h1>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
          <CalendarDays className="w-3 h-3" />
          {dateStr}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs gap-1.5">
          <RefreshCw className="w-3 h-3" />
          Refresh
        </Button>
        <Link href="/schedule">
          <Button size="sm" className="text-xs gap-1.5 bg-primary hover:bg-primary/90">
            <PlusCircle className="w-3 h-3" />
            New Appointment
          </Button>
        </Link>
      </div>
    </header>
  );
}
