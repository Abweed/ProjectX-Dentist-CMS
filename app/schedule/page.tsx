import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";

export default function SchedulePage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-border sticky top-0 z-20">
        <div>
          <h1 className="text-lg font-bold text-foreground">Schedule</h1>
          <p className="text-xs text-muted-foreground">Monday, March 16, 2026</p>
        </div>
      </header>
      <div className="flex-1 p-5 overflow-hidden">
        <ScheduleCalendar />
      </div>
    </div>
  );
}
