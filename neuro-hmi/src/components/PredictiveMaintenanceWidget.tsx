"use client";

import { useState, useEffect } from "react";
import { Wrench, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const initialTasks = [
  { id: 1, name: "Conveyor Belt Motor M-101", health: 92, timeToFailHours: 720, confidence: 98 },
  { id: 2, name: "Cooling Tower Fan F-02", health: 45, timeToFailHours: 48, confidence: 94, warning: true },
  { id: 3, name: "Main Compressor C-A", health: 88, timeToFailHours: 500, confidence: 89 },
];

export function PredictiveMaintenanceWidget() {
  const [tasks, setTasks] = useState(initialTasks);

  // Simulate real-time predictive analysis updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => 
        currentTasks.map(task => {
          // Slight random fluctuation in health (+- 1%)
          let newHealth = task.health + (Math.random() > 0.5 ? 1 : -1);
          if (newHealth > 100) newHealth = 100;
          if (newHealth < 0) newHealth = 0;

          // Confidence might fluctuate slightly
          let newConfidence = task.confidence + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0);
          if (newConfidence > 99) newConfidence = 99;

          // If it's the failing one, make it tick down occasionally
          let newTime = task.timeToFailHours;
          if (task.warning && Math.random() > 0.7) {
             newTime = newTime - 1;
          }

          return {
            ...task,
            health: newHealth,
            confidence: newConfidence,
            timeToFailHours: newTime
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-accent" />
          Live AI Predictive Analysis
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 rounded-lg bg-black/40 border border-white/5 relative overflow-hidden transition-all duration-500">
            {task.warning && <div className="absolute top-0 left-0 bottom-0 w-1 bg-warning animate-pulse" />}
            <div className="flex justify-between items-center mb-2 pl-2">
              <span className="font-medium text-sm text-white/90">{task.name}</span>
              <div className="flex flex-col items-end">
                <span className={clsx("text-xs font-bold px-2 py-0.5 rounded mb-1 transition-colors duration-300", task.warning ? "bg-warning/20 text-warning animate-pulse" : "bg-safe/20 text-safe")}>
                  {task.timeToFailHours}h until failure
                </span>
                <span className="text-[10px] text-zinc-500 transition-all">AI Confidence: {task.confidence}%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pl-2">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${task.health}%` }}
                  transition={{ duration: 1 }}
                  className={clsx(
                    "h-full rounded-full transition-colors duration-500",
                    task.health > 80 ? "bg-safe" : task.health > 50 ? "bg-warning" : "bg-critical"
                  )}
                />
              </div>
              <span className="text-xs text-zinc-400 font-mono w-8">{task.health}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
        <CheckCircle2 className="w-4 h-4 text-safe" />
        All other systems nominal
      </div>
    </div>
  );
}
