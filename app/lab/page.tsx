import { pendingLabCases } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LabPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-border sticky top-0 z-20">
        <div>
          <h1 className="text-lg font-bold text-foreground">Lab Cases</h1>
          <p className="text-xs text-muted-foreground">{pendingLabCases.length} pending cases</p>
        </div>
      </header>

      <div className="p-5">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-2 border-b border-border bg-muted/30">
            {["Patient", "Lab Item", "Laboratory", "Due Date", "Status"].map(h => (
              <span key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{h}</span>
            ))}
          </div>
          {pendingLabCases.map(lab => {
            const daysUntilDue = Math.ceil(
              (new Date(lab.due).getTime() - new Date("2026-03-16").getTime()) / 86400000
            );
            const urgent = daysUntilDue <= 2;
            return (
              <div key={lab.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 items-center px-4 py-3 border-b last:border-0 border-border">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{lab.patient}</p>
                    <p className="text-[10px] text-muted-foreground">{lab.id}</p>
                  </div>
                </div>
                <p className="text-xs text-foreground">{lab.item}</p>
                <p className="text-xs text-muted-foreground">{lab.lab}</p>
                <p className={cn("text-xs font-semibold", urgent ? "text-red-600" : "text-foreground")}>
                  {lab.due} {urgent && <span className="text-[10px] text-red-500 font-normal">({daysUntilDue}d)</span>}
                </p>
                <Badge className={cn("text-[10px] border-0 w-fit", lab.status === "sent" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700")}>
                  {lab.status === "sent" ? "Sent to Lab" : "In Progress"}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
