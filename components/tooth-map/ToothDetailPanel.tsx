"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import type { ToothCondition, ToothRecord } from "@/types";

type ConditionCfg = Record<ToothCondition, { label: string; dot: string; bg: string; border: string; text: string }>;

interface ToothDetailPanelProps {
  record: ToothRecord;
  toothName: string;
  conditionConfig: ConditionCfg;
  onSave: (updated: ToothRecord) => void;
  onClose: () => void;
}

const CONDITIONS: ToothCondition[] = ["healthy", "cavity", "crown", "filling", "missing", "root-canal", "implant"];

export function ToothDetailPanel({ record, toothName, conditionConfig, onSave, onClose }: ToothDetailPanelProps) {
  const [condition, setCondition] = useState<ToothCondition>(record.condition);
  const [notes, setNotes] = useState(record.notes ?? "");

  function handleSave() {
    onSave({
      toothNumber: record.toothNumber,
      condition,
      notes: notes.trim() || undefined,
      lastUpdated: new Date().toISOString().split("T")[0],
    });
  }

  const cfg = conditionConfig[condition];

  return (
    <div className={cn("rounded-xl border-2 p-4 transition-all", cfg.bg, cfg.border)}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", cfg.dot)} />
            <h3 className={cn("text-sm font-bold", cfg.text)}>
              Tooth #{record.toothNumber}
            </h3>
            <span className="text-xs text-muted-foreground">({toothName})</span>
          </div>
          {record.lastUpdated && (
            <p className="text-[10px] text-muted-foreground mt-0.5">Last updated: {record.lastUpdated}</p>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-black/5 text-muted-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Condition selector */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Condition</p>
        <div className="grid grid-cols-4 gap-1.5">
          {CONDITIONS.map(c => {
            const c_cfg = conditionConfig[c];
            const active = c === condition;
            return (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg border-2 text-[10px] font-semibold transition-all",
                  active
                    ? cn(c_cfg.bg, c_cfg.border, c_cfg.text, "scale-105 shadow-sm")
                    : "bg-white border-border text-muted-foreground hover:border-border/80"
                )}
              >
                <div className={cn("w-2.5 h-2.5 rounded-full", c_cfg.dot)} />
                {c_cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Clinical Notes</p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Class II cavity, mesial surface…"
          rows={2}
          className="w-full text-xs border border-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      <Button onClick={handleSave} size="sm" className="w-full gap-1.5 text-xs">
        <Save className="w-3.5 h-3.5" />
        Save Condition
      </Button>
    </div>
  );
}
