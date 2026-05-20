"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Wifi, HardDrive, Activity, CheckCircle2, AlertTriangle } from "lucide-react";

const initialSystems = [
  { id: 1, name: "PLC Controller Unit", status: "online", cpu: 34, memory: 58, uptime: "14d 6h", lastPing: 12 },
  { id: 2, name: "SCADA Server Node", status: "online", cpu: 61, memory: 72, uptime: "14d 6h", lastPing: 8 },
  { id: 3, name: "Sensor Gateway SG-01", status: "online", cpu: 22, memory: 41, uptime: "7d 2h", lastPing: 5 },
  { id: 4, name: "HMI Display Terminal", status: "online", cpu: 48, memory: 65, uptime: "14d 6h", lastPing: 3 },
  { id: 5, name: "Network Switch NW-Core", status: "warning", cpu: 78, memory: 83, uptime: "3d 14h", lastPing: 45 },
  { id: 6, name: "Backup Power System", status: "online", cpu: 5, memory: 12, uptime: "30d 0h", lastPing: 2 },
];

export default function HealthPage() {
  const [systems, setSystems] = useState(initialSystems);
  const [networkLatency, setNetworkLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkLatency(prev => Math.max(2, Math.min(150, prev + (Math.random() - 0.5) * 8)));
      setSystems(prev => prev.map(s => ({
        ...s,
        cpu: Math.max(2, Math.min(95, s.cpu + (Math.random() - 0.5) * 6)),
        memory: Math.max(10, Math.min(95, s.memory + (Math.random() - 0.5) * 3)),
        lastPing: Math.max(1, Math.min(200, s.lastPing + (Math.random() - 0.5) * 10)),
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getStatus = (val: number, warn: number, crit: number) =>
    val >= crit ? "critical" : val >= warn ? "warning" : "online";

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Health</h1>
        <p className="text-zinc-400 mt-1">Real-time infrastructure monitoring</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Systems Online", value: `${systems.filter(s => s.status === "online").length}/${systems.length}`, icon: Server, color: "text-safe" },
          { label: "Network Latency", value: `${networkLatency.toFixed(0)}ms`, icon: Wifi, color: networkLatency > 80 ? "text-warning" : "text-safe" },
          { label: "Avg CPU Load", value: `${(systems.reduce((a, s) => a + s.cpu, 0) / systems.length).toFixed(1)}%`, icon: Cpu, color: "text-accent" },
          { label: "Avg Memory", value: `${(systems.reduce((a, s) => a + s.memory, 0) / systems.length).toFixed(1)}%`, icon: HardDrive, color: "text-purple-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* System Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {systems.map((sys, idx) => {
          const cpuStatus = getStatus(sys.cpu, 70, 88);
          const memStatus = getStatus(sys.memory, 75, 90);
          const pingStatus = getStatus(sys.lastPing, 60, 100);
          const overallStatus = [cpuStatus, memStatus, pingStatus].includes("critical") ? "critical" : [cpuStatus, memStatus, pingStatus].includes("warning") ? "warning" : "online";

          return (
            <motion.div key={sys.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className={`glass-panel rounded-2xl p-5 border transition-all ${overallStatus === "critical" ? "border-critical/40" : overallStatus === "warning" ? "border-warning/40" : "border-white/5"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white text-sm">{sys.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Uptime: {sys.uptime}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold ${overallStatus === "critical" ? "bg-critical/20 text-critical" : overallStatus === "warning" ? "bg-warning/20 text-warning" : "bg-safe/20 text-safe"}`}>
                  {overallStatus === "online" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {overallStatus.toUpperCase()}
                </div>
              </div>

              {[
                { label: "CPU", val: sys.cpu, warn: 70, crit: 88 },
                { label: "Memory", val: sys.memory, warn: 75, crit: 90 },
                { label: "Ping (ms)", val: sys.lastPing, warn: 60, crit: 100, max: 200 },
              ].map(({ label, val, warn, crit, max = 100 }) => {
                const s = getStatus(val, warn, crit);
                return (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-500">{label}</span>
                      <span className={`font-mono font-bold ${s === "critical" ? "text-critical" : s === "warning" ? "text-warning" : "text-white"}`}>{val.toFixed(1)}{label !== "Ping (ms)" ? "%" : "ms"}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${s === "critical" ? "bg-critical" : s === "warning" ? "bg-warning" : "bg-safe"}`} style={{ width: `${Math.min(100, (val / max) * 100)}%` }}/>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
