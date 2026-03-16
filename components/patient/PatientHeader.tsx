import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "info", label: "Patient Info" },
  { id: "dental", label: "Dental" },
  { id: "treatment", label: "Treatment Plan" },
  { id: "restorative", label: "Restorative Plan" },
  { id: "files", label: "Attached Files" },
  { id: "invoices", label: "Invoices" },
  { id: "history", label: "Treatment History" },
];

interface PatientHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PatientHeader({ activeTab, onTabChange }: PatientHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm font-medium text-slate-400">
        <Link href="/patients" className="hover:text-blue-600 transition-colors">Patients</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-blue-600">Amelie Mcleod</span>
      </div>

      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="https://i.pravatar.cc/150?u=amelie"
              alt="Amelie Mcleod"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ID: 485490</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Amelie Mcleod</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex items-center gap-x-12 px-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 mb-0.5">Age</span>
            <span className="text-[15px] font-bold text-slate-800">27 years</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 mb-0.5">Blood type</span>
            <span className="text-[15px] font-bold text-slate-800">O+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 mb-0.5">Insurance</span>
            <span className="text-[15px] font-bold text-slate-800">Centivo Health</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 mb-0.5">Last Visit</span>
            <span className="text-[15px] font-bold text-slate-800">09.06.2023</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-400 mb-0.5">Next Visit</span>
            <button className="text-[15px] font-bold text-blue-600 hover:text-blue-700 transition-colors">Set a Date</button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 overflow-x-auto custom-scrollbar pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "pb-4 text-[13px] font-bold transition-all relative shrink-0",
              activeTab === tab.id ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
