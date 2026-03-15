import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { TodayAppointmentsList } from "@/components/dashboard/TodayAppointmentsList";
import { LabCasesCard } from "@/components/dashboard/LabCasesCard";
import { QuickPatientSearch } from "@/components/dashboard/QuickPatientSearch";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <div className="flex-1 p-5 space-y-5 max-w-[1400px] w-full mx-auto">
        <StatsRow />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <TodayAppointmentsList />
          </div>
          <div className="space-y-5">
            <QuickPatientSearch />
            <LabCasesCard />
          </div>
        </div>
      </div>
    </div>
  );
}
