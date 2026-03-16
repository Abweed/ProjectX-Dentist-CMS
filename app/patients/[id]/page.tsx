"use client";

import { useState } from "react";
import { TopBar } from "@/components/patient/TopBar";
import { PatientHeader } from "@/components/patient/PatientHeader";
import { DentalTabContent } from "@/components/patient/DentalTabContent";
import { ChartComponent } from "@/components/patient/ChartComponent";
import { RecordRightSidebar } from "@/components/patient/RecordRightSidebar";

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState("dental");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dental":
        return (
          <div className="flex gap-6 relative">
            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-[500px]">
                <DentalTabContent />
              </div>
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-[300px]">
                <ChartComponent />
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="w-[380px] shrink-0 bg-transparent min-h-[800px]">
               <RecordRightSidebar />
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 min-h-[500px] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 capitalize">
              {activeTab === 'info' ? 'Patient Info' : activeTab.replace('-', ' ')}
            </h2>
            <p className="text-slate-500 max-w-md">
              This section is currently part of the mockup. Detailed capabilities for this tab will be available here soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <TopBar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto w-full p-8 pb-12 space-y-6">
          <PatientHeader activeTab={activeTab} onTabChange={setActiveTab} />
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
