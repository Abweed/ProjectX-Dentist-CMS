"use client";

import { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { mockPatients } from "@/lib/mockData";
import { PatientSnapshotSheet } from "@/components/patient/PatientSnapshotSheet";
import type { Patient } from "@/types";

export function QuickPatientSearch() {
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = query.trim().length > 1
    ? mockPatients.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <div className="bg-white rounded-xl border border-border">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">Quick Patient Lookup</h2>
        </div>
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or ID…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {results.length > 0 && (
            <div className="mt-2 space-y-1">
              {results.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPatient(p); setSheetOpen(true); setQuery(""); }}
                  className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="text-xs font-semibold text-foreground">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.id} · {p.insurance}</p>
                  </div>
                  {p.medicalAlerts.some(a => a.severity === "high") && (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}

          {query.trim().length > 1 && results.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-3">No patients found</p>
          )}
        </div>
      </div>

      <PatientSnapshotSheet
        patient={selectedPatient}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
