"use client";

import { useState } from "react";
import { todaysAppointments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { PatientSnapshotSheet } from "@/components/patient/PatientSnapshotSheet";
import { mockPatients } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { Appointment, AppointmentStatus, AppointmentType } from "@/types";
import { AlertTriangle, Clock, ChevronRight } from "lucide-react";

const statusConfig: Record<AppointmentStatus, { label: string; className: string; badgeClass: string }> = {
  completed:   { label: "Completed",   className: "appt-completed",  badgeClass: "bg-green-100 text-green-700 border-0" },
  "in-chair":  { label: "In Chair",    className: "appt-in-chair",   badgeClass: "bg-blue-100 text-blue-700 border-0" },
  "checked-in":{ label: "Checked In",  className: "appt-checked-in", badgeClass: "bg-amber-100 text-amber-700 border-0" },
  confirmed:   { label: "Confirmed",   className: "appt-confirmed",  badgeClass: "bg-slate-100 text-slate-600 border-0" },
  cancelled:   { label: "Cancelled",   className: "appt-cancelled",  badgeClass: "bg-red-100 text-red-600 border-0" },
  "no-show":   { label: "No Show",     className: "appt-no-show",    badgeClass: "bg-gray-100 text-gray-500 border-0" },
};

const typeLabels: Record<AppointmentType, string> = {
  cleaning:      "Cleaning",
  exam:          "Exam",
  filling:       "Filling",
  crown:         "Crown",
  "root-canal":  "Root Canal",
  extraction:    "Extraction",
  consultation:  "Consult",
  whitening:     "Whitening",
  orthodontics:  "Ortho",
};

function AppointmentRow({ appt, onSelect }: { appt: Appointment; onSelect: () => void }) {
  const config = statusConfig[appt.status];
  const patient = mockPatients.find(p => p.id === appt.patientId);
  const hasAlerts = (patient?.medicalAlerts ?? []).length > 0;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left px-4 py-3 rounded-lg border border-border/50 hover:shadow-sm transition-all group",
        config.className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Time */}
        <div className="w-14 shrink-0">
          <p className="text-xs font-bold text-foreground">{appt.time}</p>
          <p className="text-[10px] text-muted-foreground">{appt.duration}m</p>
        </div>

        {/* Patient info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-foreground truncate">{appt.patientName}</p>
            {hasAlerts && (
              <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-[11px] text-muted-foreground">{typeLabels[appt.type]}</span>
            <span className="text-muted-foreground/40 text-[10px]">·</span>
            <span className="text-[11px] text-muted-foreground">{appt.chair}</span>
            <span className="text-muted-foreground/40 text-[10px]">·</span>
            <span className="text-[11px] text-muted-foreground truncate">{appt.provider}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 shrink-0">
          <Badge className={cn("text-[10px] h-5 font-medium", config.badgeClass)}>
            {config.label}
          </Badge>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
        </div>
      </div>

      {/* Notes warning */}
      {appt.notes && appt.status !== "completed" && (
        <p className="mt-1.5 ml-[68px] text-[11px] text-amber-700 bg-amber-50 rounded px-2 py-0.5 flex items-center gap-1 w-fit">
          <Clock className="w-2.5 h-2.5 shrink-0" />
          {appt.notes.length > 60 ? appt.notes.slice(0, 60) + "…" : appt.notes}
        </p>
      )}
    </button>
  );
}

export function TodayAppointmentsList() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId) ?? null;

  function openPatient(patientId: string) {
    setSelectedPatientId(patientId);
    setSheetOpen(true);
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-border flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h2 className="text-sm font-bold text-foreground">Today&apos;s Appointments</h2>
            <p className="text-[11px] text-muted-foreground">{todaysAppointments.length} scheduled · Click a row to open patient chart</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-medium text-blue-600">Live</span>
          </div>
        </div>
        <div className="p-3 space-y-2 overflow-y-auto">
          {todaysAppointments.map(appt => (
            <AppointmentRow
              key={appt.id}
              appt={appt}
              onSelect={() => openPatient(appt.patientId)}
            />
          ))}
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
