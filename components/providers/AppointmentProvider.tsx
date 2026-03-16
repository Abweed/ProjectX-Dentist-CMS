"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { todaysAppointments as initialAppointments } from "@/lib/mockData";
import type { Appointment } from "@/types";

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const addAppointment = (appointmentData: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `A-00${appointments.length + 1}`, // Simple mock ID generation
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
}
