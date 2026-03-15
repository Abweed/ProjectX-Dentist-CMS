export type ToothCondition = "healthy" | "cavity" | "crown" | "filling" | "missing" | "root-canal" | "implant";

export interface ToothRecord {
  toothNumber: number;
  condition: ToothCondition;
  notes?: string;
  lastUpdated?: string;
}

export interface MedicalAlert {
  type: "allergy" | "condition" | "medication" | "warning";
  label: string;
  severity: "high" | "medium" | "low";
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  age: number;
  phone: string;
  email: string;
  insurance: string;
  insuranceId: string;
  lastVisit: string;
  nextAppointment?: string;
  outstandingBalance: number;
  medicalAlerts: MedicalAlert[];
  teeth: ToothRecord[];
  notes: string;
  provider: string;
}

export type AppointmentStatus = "confirmed" | "checked-in" | "in-chair" | "completed" | "cancelled" | "no-show";
export type AppointmentType = "cleaning" | "exam" | "filling" | "crown" | "root-canal" | "extraction" | "consultation" | "whitening" | "orthodontics";
export type Chair = "Chair 1" | "Chair 2" | "Hygienist";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string; // "09:00"
  duration: number; // minutes
  type: AppointmentType;
  chair: Chair;
  status: AppointmentStatus;
  provider: string;
  notes?: string;
}

export interface DailyStats {
  date: string;
  totalAppointments: number;
  completedAppointments: number;
  dailyRevenue: number;
  pendingLabCases: number;
  newPatients: number;
  cancellations: number;
}
