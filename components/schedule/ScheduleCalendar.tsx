"use client";

import { useState } from "react";
import { todaysAppointments, mockPatients } from "@/lib/mockData";
import { PatientSnapshotSheet } from "@/components/patient/PatientSnapshotSheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Appointment, AppointmentStatus, AppointmentType, Chair } from "@/types";
import { AlertTriangle } from "lucide-react";

const CHAIRS: Chair[] = ["Chair 1", "Chair 2", "Hygienist"];

// Hours to display: 7am – 6pm
const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7..18
const SLOT_HEIGHT = 60; // px per hour
const START_HOUR = 7;

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  completed:    "border-l-green-500 bg-green-50 text-green-900",
  "in-chair":   "border-l-blue-500 bg-blue-50 text-blue-900",
  "checked-in": "border-l-amber-500 bg-amber-50 text-amber-900",
  confirmed:    "border-l-slate-300 bg-white text-slate-800",
  cancelled:    "border-l-red-400 bg-red-50 text-red-900 opacity-60",
  "no-show":    "border-l-gray-300 bg-gray-50 text-gray-600 opacity-60",
};

const TYPE_SHORT: Record<AppointmentType, string> = {
  cleaning: "Clean", exam: "Exam", filling: "Fill",
  crown: "Crown", "root-canal": "RCT", extraction: "Ext",
  consultation: "Consult", whitening: "White", orthodontics: "Ortho",
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

interface ApptBlockProps {
  appt: Appointment;
  onClick: () => void;
}

function ApptBlock({ appt, onClick }: ApptBlockProps) {
  const top = ((timeToMinutes(appt.time) - START_HOUR * 60) / 60) * SLOT_HEIGHT;
  const height = Math.max((appt.duration / 60) * SLOT_HEIGHT - 4, 24);
  const patient = mockPatients.find(p => p.id === appt.patientId);
  const hasHighAlert = patient?.medicalAlerts.some(a => a.severity === "high") ?? false;

  return (
    <button
      onClick={onClick}
      style={{ top: `${top}px`, height: `${height}px` }}
      className={cn(
        "absolute left-1 right-1 rounded-md border-l-4 px-2 py-1 text-left overflow-hidden",
        "hover:shadow-md hover:scale-[1.01] transition-all z-10",
        STATUS_COLORS[appt.status]
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="text-[11px] font-bold leading-tight truncate">
            {appt.patientName.split(" ")[0]} {appt.patientName.split(" ").slice(1).join(" ").charAt(0)}.
          </p>
          {height > 36 && (
            <p className="text-[10px] leading-tight opacity-75">{TYPE_SHORT[appt.type]} · {appt.time}</p>
          )}
        </div>
        {hasHighAlert && <AlertTriangle className="w-2.5 h-2.5 text-red-500 shrink-0 mt-0.5" />}
      </div>
    </button>
  );
}

export function ScheduleCalendar() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedPatient = mockPatients.find(p => p.id === selectedPatientId) ?? null;

  function openPatient(patientId: string) {
    setSelectedPatientId(patientId);
    setSheetOpen(true);
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-border overflow-hidden flex flex-col h-full">
        {/* Column headers */}
        <div className="grid border-b border-border" style={{ gridTemplateColumns: "52px repeat(3, 1fr)" }}>
          <div className="h-10 border-r border-border" />
          {CHAIRS.map(chair => (
            <div key={chair} className="h-10 flex items-center justify-center border-r last:border-0 border-border">
              <div className="flex items-center gap-1.5">
                <div className={cn("w-2 h-2 rounded-full", chair === "Chair 1" ? "bg-blue-500" : chair === "Chair 2" ? "bg-violet-500" : "bg-emerald-500")} />
                <span className="text-xs font-semibold text-foreground">{chair}</span>
                <Badge variant="secondary" className="text-[9px] h-4 px-1 border-0">
                  {todaysAppointments.filter(a => a.chair === chair).length}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid relative" style={{ gridTemplateColumns: "52px repeat(3, 1fr)" }}>
            {/* Time labels */}
            <div className="border-r border-border">
              {HOURS.map(h => (
                <div key={h} style={{ height: `${SLOT_HEIGHT}px` }} className="flex items-start justify-end pr-2 pt-1 border-b border-border/40">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {h > 12 ? `${h - 12}pm` : h === 12 ? "12pm" : `${h}am`}
                  </span>
                </div>
              ))}
            </div>

            {/* Chair columns */}
            {CHAIRS.map(chair => {
              const chairAppts = todaysAppointments.filter(a => a.chair === chair);
              return (
                <div key={chair} className="border-r last:border-0 border-border relative">
                  {/* Hour lines */}
                  {HOURS.map(h => (
                    <div key={h} style={{ height: `${SLOT_HEIGHT}px` }} className="border-b border-border/30" />
                  ))}
                  {/* Appointment blocks */}
                  <div className="absolute inset-0">
                    {chairAppts.map(appt => (
                      <ApptBlock key={appt.id} appt={appt} onClick={() => openPatient(appt.patientId)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
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
