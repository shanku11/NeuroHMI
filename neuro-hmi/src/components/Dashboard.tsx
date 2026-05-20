"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlarmList } from "./AlarmList";
import { TelemetryWidget } from "./TelemetryWidget";
import { PredictiveMaintenanceWidget } from "./PredictiveMaintenanceWidget";
import { Move } from "lucide-react";
import clsx from "clsx";

export function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const [dailyTarget, setDailyTarget] = useState(8450);
  const [energyConsumption, setEnergyConsumption] = useState(4.20);
  const [overallEfficiency, setOverallEfficiency] = useState(94.2);

  // Layout mode listener
  useEffect(() => {
    const handleEditToggle = (e: CustomEvent) => setEditMode(e.detail);
    window.addEventListener("toggleEditMode", handleEditToggle as EventListener);
    return () => window.removeEventListener("toggleEditMode", handleEditToggle as EventListener);
  }, []);

  // Simulate real-time KPI updates
  useEffect(() => {
    const kpiInterval = setInterval(() => {
      setDailyTarget(prev => {
        // Occasionally increment production target if not at max
        if (prev < 10000 && Math.random() > 0.4) {
          return prev + Math.floor(Math.random() * 5);
        }
        return prev;
      });

      setEnergyConsumption(prev => {
        // Fluctuate energy slightly
        const change = (Math.random() * 0.04) - 0.02;
        return Number((prev + change).toFixed(2));
      });

      setOverallEfficiency(prev => {
        const change = (Math.random() * 0.2) - 0.1;
        let newEff = prev + change;
        if (newEff > 99.9) newEff = 99.9;
        if (newEff < 80) newEff = 80;
        return Number(newEff.toFixed(1));
      });
    }, 2500);

    return () => clearInterval(kpiInterval);
  }, []);

  const WidgetWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div 
      drag={editMode}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileDrag={{ scale: 1.05, zIndex: 50, boxShadow: "0 10px 40px rgba(14,165,233,0.3)" }}
      className={clsx(
        "relative h-full w-full transition-all duration-300",
        editMode && "ring-2 ring-accent/50 ring-dashed rounded-2xl bg-accent/5 cursor-grab active:cursor-grabbing",
        !editMode && "transform-none", // Reset transform when exiting edit mode
        className
      )}
    >
      {editMode && (
        <div className="absolute top-2 right-2 z-10 p-2 bg-black/80 rounded-lg backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center gap-2 pointer-events-none">
          <Move className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold">Drag to Move</span>
        </div>
      )}
      <div className={clsx("h-full w-full", editMode && "pointer-events-none opacity-80")}>
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="p-8 h-full flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Plant Overview</h1>
          <p className="text-zinc-400 mt-1">
            {editMode ? "Layout Editor Mode: Drag widgets to reorganize" : "Real-time status and AI insights"}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
              Overall Efficiency
            </span>
            <span className="text-2xl font-bold text-safe glow-text transition-all">{overallEfficiency}%</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Active Alerts</span>
            <span className="text-2xl font-bold text-critical glow-text">3</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          {/* Main Visual or Telemetry */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0"
          >
            <WidgetWrapper>
              <TelemetryWidget />
            </WidgetWrapper>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <WidgetWrapper>
                <PredictiveMaintenanceWidget />
              </WidgetWrapper>
            </motion.div>
            
            {/* KPI Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <WidgetWrapper>
                <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-full">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-safe"></span>
                    </span>
                    Live Production KPIs
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">Daily Target</span>
                        <span className="text-white transition-all font-mono">{dailyTarget.toLocaleString()} / 10,000 units</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent transition-all duration-1000" 
                          style={{ width: `${(dailyTarget / 10000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">Energy Consumption</span>
                        <span className="text-warning transition-all font-mono">{energyConsumption.toFixed(2)} MWh</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-warning transition-all duration-1000" 
                          style={{ width: `${(energyConsumption / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </WidgetWrapper>
            </motion.div>
          </div>
          
          {/* Importance & Utility Message for Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <WidgetWrapper>
              <div className="glass-panel rounded-2xl p-6 bg-accent/5 border-accent/20">
                <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Why Next-Gen HMI Matters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-accent font-semibold mb-1">Reduce Alarm Fatigue</div>
                    <div className="text-zinc-400 text-xs">AI prioritizes alerts, reducing noise by up to 60%.</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-accent font-semibold mb-1">Predictive Safety</div>
                    <div className="text-zinc-400 text-xs">Catch machine anomalies before catastrophic failure.</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-accent font-semibold mb-1">Instant Context</div>
                    <div className="text-zinc-400 text-xs">Role-based UI shows only what matters to you right now.</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-accent font-semibold mb-1">Zero-Code Config</div>
                    <div className="text-zinc-400 text-xs">Use AI prompts or drag-and-drop to build screens in seconds.</div>
                  </div>
                </div>
              </div>
            </WidgetWrapper>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="h-full"
        >
          <WidgetWrapper>
            <AlarmList />
          </WidgetWrapper>
        </motion.div>
      </div>
    </div>
  );
}
