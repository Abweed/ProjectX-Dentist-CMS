"use client";

import { Printer, Download, MoreVertical, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToothMap } from "./ToothMap";

const categories = [
  { id: "all", label: "All" },
  { id: "dental", label: "Dental", active: true },
  { id: "perio", label: "Perio" },
  { id: "endo", label: "Endo" },
  { id: "aesthetics", label: "Aesthetics" },
];

export function DentalTabContent() {
  return (
    <div className="flex flex-col h-full space-y-8">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex p-1 bg-slate-100/80 rounded-2xl gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={cn(
                "px-5 py-2 text-[13px] font-bold rounded-xl transition-all",
                cat.active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-x-2 w-full mt-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm ml-auto mr-12">
            <Filter className="w-4 h-4" />
            Filter
            </button>
            <div className="flex items-center gap-2 mr-2 border-l pl-4 border-slate-200">
                <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
                <Printer className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
                <Download className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
                <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>

      <div className="-mt-14 w-full flex justify-end">
          
      </div>

      {/* Main Tooth Graphic */}
      <div className="flex-1 w-full flex items-center justify-center -mt-6">
        <ToothMap />
      </div>

      {/* Legend below the tooth map */}
      <div className="flex items-center justify-center gap-6 pt-4 text-[13px] font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Caries
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span> Surgery
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Implantation
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Gingivitis
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Periodontitis
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 pt-1 text-[13px] font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Removal
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-900"></span> Periostitis
        </div>
      </div>

    </div>
  );
}
