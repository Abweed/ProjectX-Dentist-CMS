"use client";

import { useState } from "react";
import { mockPatients } from "@/lib/mockData";
import { PatientSnapshotSheet } from "@/components/patient/PatientSnapshotSheet";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Patient } from "@/types";

export default function PatientsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toLowerCase().includes(query.toLowerCase()) ||
    p.insurance.toLowerCase().includes(query.toLowerCase())
  );

  function openPatient(p: Patient) {
    setSelected(p);
    setSheetOpen(true);
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-border sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-bold text-foreground">Patients</h1>
            <p className="text-xs text-muted-foreground">{mockPatients.length} records</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </header>

        <div className="p-5">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_auto_auto] gap-4 px-4 py-2 border-b border-border bg-muted/30">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Patient</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Insurance</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Last Visit</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Balance</span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Alerts</span>
            </div>

            {filtered.map(p => {
              const highAlerts = p.medicalAlerts.filter(a => a.severity === "high");
              return (
                <button
                  key={p.id}
                  onClick={() => openPatient(p)}
                  className="w-full grid grid-cols-[2fr_1fr_1fr_auto_auto] gap-4 items-center px-4 py-3 border-b last:border-0 border-border hover:bg-accent/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.id} · Age {p.age}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-foreground truncate">{p.insurance}</p>
                    <p className="text-[10px] text-muted-foreground">{p.insuranceId}</p>
                  </div>

                  <p className="text-xs text-muted-foreground">{p.lastVisit}</p>

                  <p className={cn("text-xs font-semibold", p.outstandingBalance > 0 ? "text-red-600" : "text-green-600")}>
                    {p.outstandingBalance > 0 ? `$${p.outstandingBalance.toFixed(0)}` : "Paid"}
                  </p>

                  <div className="flex items-center gap-1">
                    {highAlerts.length > 0 && (
                      <Badge className="bg-red-100 text-red-700 border-0 text-[10px] gap-0.5 h-5">
                        <AlertTriangle className="w-2.5 h-2.5" /> {highAlerts.length}
                      </Badge>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                  </div>
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-sm text-muted-foreground">No patients match &quot;{query}&quot;</div>
            )}
          </div>
        </div>
      </div>

      <PatientSnapshotSheet
        patient={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
