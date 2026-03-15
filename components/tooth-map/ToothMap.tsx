"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ToothCondition, ToothRecord } from "@/types";
import { ToothDetailPanel } from "./ToothDetailPanel";

// Universal Numbering System (1-32)
// Upper arch:  1-16 left to right (patient view: 1=upper-right-wisdom → 16=upper-left-wisdom)
// Lower arch: 17-32 right to left (17=lower-left-wisdom → 32=lower-right-wisdom)
const UPPER_TEETH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const LOWER_TEETH = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];

// Human-friendly labels
const TOOTH_NAMES: Record<number, string> = {
  1: "UR3M", 2: "UR2M", 3: "UR1M", 4: "UR2PM", 5: "UR1PM",
  6: "URC", 7: "URL2", 8: "URL1", 9: "ULL1", 10: "ULL2",
  11: "ULC", 12: "UL1PM", 13: "UL2PM", 14: "UL1M", 15: "UL2M", 16: "UL3M",
  17: "LL3M", 18: "LL2M", 19: "LL1M", 20: "LL2PM", 21: "LL1PM",
  22: "LLC", 23: "LLL2", 24: "LLL1", 25: "LRL1", 26: "LRL2",
  27: "LRC", 28: "LR1PM", 29: "LR2PM", 30: "LR1M", 31: "LR2M", 32: "LR3M",
};

const CONDITION_CONFIG: Record<ToothCondition, { label: string; dot: string; bg: string; border: string; text: string }> = {
  healthy:    { label: "Healthy",     dot: "bg-sky-400",    bg: "bg-sky-50",    border: "border-sky-200",   text: "text-sky-700" },
  cavity:     { label: "Cavity",      dot: "bg-red-400",    bg: "bg-red-50",    border: "border-red-200",   text: "text-red-700" },
  crown:      { label: "Crown",       dot: "bg-violet-400", bg: "bg-violet-50", border: "border-violet-200",text: "text-violet-700" },
  filling:    { label: "Filling",     dot: "bg-yellow-400", bg: "bg-yellow-50", border: "border-yellow-200",text: "text-yellow-700" },
  missing:    { label: "Missing",     dot: "bg-gray-300",   bg: "bg-gray-50",   border: "border-gray-200",  text: "text-gray-500" },
  "root-canal": { label: "Root Canal",dot: "bg-orange-400", bg: "bg-orange-50", border: "border-orange-200",text: "text-orange-700" },
  implant:    { label: "Implant",     dot: "bg-emerald-400",bg: "bg-emerald-50",border: "border-emerald-200",text: "text-emerald-700" },
};

interface ToothCellProps {
  number: number;
  record?: ToothRecord;
  selected: boolean;
  onClick: () => void;
}

function ToothCell({ number, record, selected, onClick }: ToothCellProps) {
  const condition: ToothCondition = record?.condition ?? "healthy";
  const cfg = CONDITION_CONFIG[condition];

  return (
    <button
      onClick={onClick}
      title={`Tooth #${number} — ${cfg.label}${record?.notes ? ` (${record.notes})` : ""}`}
      className={cn(
        "tooth-cell flex flex-col items-center justify-center w-full aspect-[3/4] rounded-md border-2 text-center select-none",
        cfg.bg, cfg.border,
        selected && "ring-2 ring-primary ring-offset-1 scale-110 z-10",
        condition === "missing" && "opacity-50"
      )}
    >
      {/* Condition dot */}
      <div className={cn("w-2 h-2 rounded-full mb-0.5", cfg.dot)} />
      {/* Tooth number */}
      <span className={cn("text-[9px] font-bold leading-none", cfg.text)}>{number}</span>
    </button>
  );
}

export interface ToothMapProps {
  initialTeeth?: ToothRecord[];
  readOnly?: boolean;
}

export function ToothMap({ initialTeeth = [], readOnly = false }: ToothMapProps) {
  const [teeth, setTeeth] = useState<Map<number, ToothRecord>>(() => {
    const m = new Map<number, ToothRecord>();
    initialTeeth.forEach(t => m.set(t.toothNumber, t));
    return m;
  });
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  function handleToothClick(num: number) {
    setSelectedTooth(prev => (prev === num ? null : num));
  }

  function handleSave(updated: ToothRecord) {
    setTeeth(prev => {
      const next = new Map(prev);
      next.set(updated.toothNumber, updated);
      return next;
    });
    setSelectedTooth(null);
  }

  const selectedRecord = selectedTooth != null ? (teeth.get(selectedTooth) ?? { toothNumber: selectedTooth, condition: "healthy" as ToothCondition }) : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(CONDITION_CONFIG).map(([key, val]) => (
          <span key={key} className={cn("inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border", val.bg, val.border, val.text)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", val.dot)} />
            {val.label}
          </span>
        ))}
      </div>

      {/* Chart container */}
      <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-xl border border-border p-4">
        {/* Arch label */}
        <p className="text-[10px] font-semibold text-muted-foreground text-center mb-2 uppercase tracking-widest">Upper Arch</p>

        {/* Upper teeth */}
        <div className="grid grid-cols-16 gap-1" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
          {UPPER_TEETH.map(n => (
            <ToothCell
              key={n}
              number={n}
              record={teeth.get(n)}
              selected={selectedTooth === n}
              onClick={() => handleToothClick(n)}
            />
          ))}
        </div>

        {/* Midline divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 border-t-2 border-dashed border-border/60" />
          <span className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-widest">Midline</span>
          <div className="flex-1 border-t-2 border-dashed border-border/60" />
        </div>

        {/* Lower teeth */}
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
          {LOWER_TEETH.map(n => (
            <ToothCell
              key={n}
              number={n}
              record={teeth.get(n)}
              selected={selectedTooth === n}
              onClick={() => handleToothClick(n)}
            />
          ))}
        </div>

        <p className="text-[10px] font-semibold text-muted-foreground text-center mt-2 uppercase tracking-widest">Lower Arch</p>
      </div>

      {/* Detail Panel */}
      {selectedTooth != null && selectedRecord && !readOnly && (
        <ToothDetailPanel
          record={selectedRecord}
          toothName={TOOTH_NAMES[selectedTooth] ?? `#${selectedTooth}`}
          conditionConfig={CONDITION_CONFIG}
          onSave={handleSave}
          onClose={() => setSelectedTooth(null)}
        />
      )}
    </div>
  );
}
