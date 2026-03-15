"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToothMap } from "@/components/tooth-map/ToothMap";
import type { Patient, MedicalAlert } from "@/types";
import { AlertTriangle, Phone, Mail, CreditCard, Calendar, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

function AlertBadge({ alert }: { alert: MedicalAlert }) {
  const config = {
    high:   "bg-red-100 text-red-700 border border-red-200",
    medium: "bg-amber-100 text-amber-700 border border-amber-200",
    low:    "bg-slate-100 text-slate-600 border border-slate-200",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full", config[alert.severity])}>
      {alert.severity === "high" && <AlertTriangle className="w-2.5 h-2.5" />}
      {alert.label}
    </span>
  );
}

interface PatientSnapshotSheetProps {
  patient: Patient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientSnapshotSheet({ patient, open, onOpenChange }: PatientSnapshotSheetProps) {
  if (!patient) return null;

  const highAlerts = patient.medicalAlerts.filter(a => a.severity === "high");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl p-0 overflow-y-auto flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary text-lg font-bold flex items-center justify-center">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <SheetTitle className="text-lg font-bold text-foreground">{patient.name}</SheetTitle>
                <p className="text-xs text-muted-foreground">
                  {patient.id} · DOB {patient.dob} · Age {patient.age}
                </p>
                <p className="text-xs text-muted-foreground">{patient.provider}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              {patient.outstandingBalance > 0 ? (
                <div>
                  <p className="text-[10px] text-muted-foreground">Outstanding</p>
                  <p className="text-lg font-bold text-red-600">${patient.outstandingBalance.toFixed(2)}</p>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] text-muted-foreground">Balance</p>
                  <p className="text-lg font-bold text-green-600">$0.00</p>
                </div>
              )}
            </div>
          </div>

          {/* High-severity alerts banner */}
          {highAlerts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 flex flex-wrap gap-1.5">
                {patient.medicalAlerts.map((alert, i) => (
                  <AlertBadge key={i} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Low/medium only alerts */}
          {highAlerts.length === 0 && patient.medicalAlerts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {patient.medicalAlerts.map((alert, i) => (
                <AlertBadge key={i} alert={alert} />
              ))}
            </div>
          )}
        </SheetHeader>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="flex-1 flex flex-col">
          <TabsList className="mx-5 mt-3 grid grid-cols-3 w-auto">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="chart" className="text-xs">Tooth Chart</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 px-5 pb-5 mt-3 space-y-4">
            {/* Contact */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Contact</h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Insurance */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Insurance</h3>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium">{patient.insurance}</span>
                <span className="text-muted-foreground">· {patient.insuranceId}</span>
              </div>
            </section>

            <Separator />

            {/* Visits */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Visits</h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Last visit:</span>
                  <span className="font-medium">{patient.lastVisit}</span>
                </div>
                {patient.nextAppointment && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span className="text-muted-foreground">Next:</span>
                    <span className="font-medium text-primary">{patient.nextAppointment}</span>
                    <Badge className="bg-primary/10 text-primary border-0 text-[10px]">Today</Badge>
                  </div>
                )}
              </div>
            </section>

            <Separator />

            {/* Tooth summary */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Dental Summary</h3>
              <div className="flex flex-wrap gap-1.5">
                {patient.teeth.map(t => (
                  <span key={t.toothNumber} className={`text-[11px] px-2 py-0.5 rounded font-medium border tooth-${t.condition}`}>
                    #{t.toothNumber} {t.condition}
                  </span>
                ))}
                {patient.teeth.length === 0 && (
                  <span className="text-xs text-muted-foreground">No active conditions on record</span>
                )}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="chart" className="flex-1 px-5 pb-5 mt-3">
            <ToothMap initialTeeth={patient.teeth} />
          </TabsContent>

          <TabsContent value="notes" className="flex-1 px-5 pb-5 mt-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Clinical Notes</h3>
            <div className="bg-accent/50 rounded-lg p-3 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {patient.notes || "No clinical notes on file."}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
