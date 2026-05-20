"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

const initialAlarms = [
  { id: 1, severity: "critical", message: "Pump 3A Vibration Critical", time: "10:24 AM", aiAnalysis: "98% probability of bearing failure in 2h" },
  { id: 2, severity: "warning", message: "Tank 2 Level High", time: "10:20 AM", aiAnalysis: "Adjust flow rate valve V-102" },
  { id: 3, severity: "info", message: "Routine Maintenance: Filter 1", time: "09:00 AM" },
];

export function AlarmList() {
  const [alarms, setAlarms] = useState(initialAlarms);

  const handleAcknowledge = (id: number) => {
    setAlarms(current => current.filter(alarm => alarm.id !== id));
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent" />
          Active Alarms ({alarms.length})
        </h3>
        <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
          AI Filtered
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        <AnimatePresence>
          {alarms.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2"
            >
              <CheckCircle2 className="w-8 h-8 text-safe opacity-50" />
              <p>No active alarms</p>
            </motion.div>
          ) : (
            alarms.map((alarm, idx) => (
              <motion.div
                key={alarm.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  "p-4 rounded-xl border relative overflow-hidden group transition-colors",
                  alarm.severity === "critical"
                    ? "bg-critical/10 border-critical/30 hover:border-critical/50"
                    : alarm.severity === "warning"
                    ? "bg-warning/10 border-warning/30 hover:border-warning/50"
                    : "bg-info/10 border-info/30 hover:border-info/50"
                )}
              >
                <div
                  className={clsx(
                    "absolute left-0 top-0 bottom-0 w-1",
                    alarm.severity === "critical" ? "bg-critical" : alarm.severity === "warning" ? "bg-warning" : "bg-info"
                  )}
                />
                <div className="flex items-start justify-between pl-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {alarm.severity === "critical" ? (
                        <AlertCircle className="w-4 h-4 text-critical animate-pulse" />
                      ) : alarm.severity === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      ) : (
                        <Info className="w-4 h-4 text-info" />
                      )}
                      <span className="font-semibold text-white/90">{alarm.message}</span>
                    </div>
                    {alarm.aiAnalysis && (
                      <p className="text-sm mt-2 text-zinc-400 border-l-2 border-accent/50 pl-2 ml-1 italic">
                        AI Insight: {alarm.aiAnalysis}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3 min-w-[80px]">
                    <span className="text-xs text-zinc-500 font-mono">{alarm.time}</span>
                    <button 
                      onClick={() => handleAcknowledge(alarm.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white whitespace-nowrap"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
