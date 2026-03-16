"use client";

import { CalendarDays, RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAppointments } from "@/components/providers/AppointmentProvider";
import { useState } from "react";

export function DashboardHeader() {
  const router = useRouter();
  const { addAppointment } = useAppointments();
  const [open, setOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("2026-03-16");
  const [time, setTime] = useState("09:00");
  
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button size="sm" className="text-xs gap-1.5 bg-primary hover:bg-primary/90" />
          }>
            <PlusCircle className="w-3 h-3" />
            New Appointment
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
              <DialogDescription>
                Schedule a new appointment for a patient.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Patient
                </Label>
                <Input 
                  id="name" 
                  placeholder="Search patient..." 
                  className="col-span-3"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input 
                  id="date" 
                  type="date" 
                  className="col-span-3" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input 
                  id="time" 
                  type="time" 
                  className="col-span-3" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                if (!patientName) return;
                
                addAppointment({
                  patientId: "P-999", // Mock new patient ID
                  patientName,
                  time,
                  duration: 60,
                  type: "consultation",
                  chair: "Chair 1",
                  status: "confirmed",
                  provider: "Dr. Emily Chen",
                });
                
                setOpen(false);
                setPatientName("");
                router.push('/schedule');
              }}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
