import { pendingLabCases } from "@/lib/mockData";
import { FlaskConical, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function LabCasesCard() {
  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-amber-600" />
          <h2 className="text-sm font-bold text-foreground">Pending Lab Cases</h2>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-0 text-[10px]">
          {pendingLabCases.length} pending
        </Badge>
      </div>
      <div className="divide-y divide-border">
        {pendingLabCases.map(lab => {
          const daysUntilDue = Math.ceil(
            (new Date(lab.due).getTime() - new Date("2026-03-16").getTime()) / 86400000
          );
          const isUrgent = daysUntilDue <= 2;
          return (
            <div key={lab.id} className="px-4 py-3 flex items-start justify-between gap-3 hover:bg-accent/50 transition-colors">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{lab.patient}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{lab.item}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{lab.lab}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={cn("text-[11px] font-semibold", isUrgent ? "text-red-600" : "text-muted-foreground")}>
                  Due {lab.due.slice(5)}
                </p>
                <Badge className={cn("text-[10px] border-0 mt-1", lab.status === "sent" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700")}>
                  {lab.status === "sent" ? "Sent" : "In Progress"}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2 border-t border-border">
        <button className="text-[11px] text-primary font-medium hover:underline flex items-center gap-1">
          View all lab cases <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
