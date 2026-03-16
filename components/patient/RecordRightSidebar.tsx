import { MoreVertical, Plus, ChevronDown } from "lucide-react";
import Image from "next/image";

export function RecordRightSidebar() {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6">
      
      {/* Selected Action Card */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 tracking-tight text-lg">Selected</h3>
          <button className="text-slate-400 hover:text-slate-700">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="w-12 h-16 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
            {/* Tooth SVG Icon Placeholder */}
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8 2 6 6 6 12C6 18 10 24 10 30C10 34 11 38 12 38C13 38 14 34 14 30C14 24 18 18 18 12C18 6 16 2 12 2Z" 
                    fill="#f3e8ff" stroke="#a855f7" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h4 className="text-blue-600 font-bold text-[15px] mb-1">Mandible 25</h4>
            <p className="text-slate-500 text-sm mb-1">
              Issue <span className="text-slate-800 font-semibold ml-1">Implantation</span>
            </p>
            <p className="text-slate-400 text-xs">
              Last manipulation <span className="text-slate-800 font-semibold ml-1">06.17.2023</span>
            </p>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-700 leading-relaxed mb-6">
          Implantation surgery was performed as planned without complications. The patient received recommendations
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-[13px]">
            <span className="text-slate-400 w-32 shrink-0">Doctor</span>
            <span className="text-slate-800 font-semibold">Jeeves Wooster</span>
          </div>
          <div className="flex items-center text-[13px]">
            <span className="text-slate-400 w-32 shrink-0">Surgical Kit</span>
            <span className="text-slate-800 font-semibold">Nobel Replace Tapered</span>
          </div>
          <div className="flex items-center text-[13px]">
            <span className="text-slate-400 w-32 shrink-0">Implant Manufacturer</span>
            <span className="text-slate-800 font-semibold">Nobel Replace Select</span>
          </div>
          <div className="flex items-center text-[13px]">
            <span className="text-slate-400 w-32 shrink-0">Implant Model</span>
            <span className="text-slate-800 font-semibold">Nobel Replace Tapered</span>
          </div>
          <div className="flex items-center text-[13px]">
            <span className="text-slate-400 w-32 shrink-0">Implant Sizes Needed</span>
            <span className="text-slate-800 font-bold">1 x 3.5mm x 10mm, 3 x 4.3mm x 11.5mm</span>
          </div>
        </div>

        <button className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-6 hover:text-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Information
        </button>

        <div className="flex justify-center border-t border-slate-100 pt-4">
           <button className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:text-blue-700">
             More <ChevronDown className="w-3 h-3" />
           </button>
        </div>
      </div>

      {/* History Items */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5 relative flex gap-4 items-center">
         <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
               <h4 className="font-bold text-slate-800 text-[15px]">Maxilla 1</h4>
               <button className="text-slate-400 hover:text-slate-700">
                  <MoreVertical className="w-4 h-4" />
               </button>
            </div>
            <p className="text-slate-500 text-sm mb-1">
              Issue <span className="text-slate-800 font-semibold ml-1">Removal</span>
            </p>
            <p className="text-slate-400 text-xs">
              Last manipulation <span className="text-slate-800 font-semibold ml-1">09.06.2023</span>
            </p>
         </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5 relative flex gap-4 items-center">
         <div className="w-10 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
            {/* Tooth SVG Icon Placeholder */}
            <svg width="20" height="24" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8 2 4 6 4 12C4 18 10 24 10 28C10 32 14 32 14 28C14 24 20 18 20 12C20 6 16 2 12 2Z" 
                    fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
              <circle cx="16" cy="18" r="3" fill="#22c55e"/>
            </svg>
         </div>
         <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
               <h4 className="font-bold text-slate-800 text-[15px]">Maxilla 3</h4>
               <button className="text-slate-400 hover:text-slate-700">
                  <MoreVertical className="w-4 h-4" />
               </button>
            </div>
            <p className="text-slate-500 text-sm mb-1">
              Issue <span className="text-slate-800 font-semibold ml-1">Caries</span>
            </p>
            <p className="text-slate-400 text-xs">
              Last manipulation <span className="text-slate-800 font-semibold ml-1">03.12.2022</span>
            </p>
         </div>
      </div>

    </div>
  );
}
