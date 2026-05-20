"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Volume2, VolumeX, Filter, History } from "lucide-react";
import clsx from "clsx";

type Severity = "critical" | "warning" | "info";

interface Alarm {
  id: number;
  severity: Severity;
  message: string;
  source: string;
  time: string;
  aiAnalysis: string;
  acknowledged: boolean;
  muted: boolean;
}

const initialAlarms: Alarm[] = [
  { id: 1, severity: "critical", message: "Pump 3A Vibration Critical", source: "Pump 3A", time: "10:24 AM", aiAnalysis: "98% probability of bearing failure in 2h. Recommend immediate shutdown for inspection.", acknowledged: false, muted: false },
  { id: 2, severity: "warning", message: "Tank 2 Level High", source: "Tank 2", time: "10:20 AM", aiAnalysis: "Adjust flow rate on valve V-102. Estimated normalization within 15 min.", acknowledged: false, muted: false },
  { id: 3, severity: "info", message: "Routine Maintenance: Filter 1 Due", source: "Filter Unit 1", time: "09:00 AM", aiAnalysis: "Low urgency. Schedule during next planned downtime window.", acknowledged: false, muted: false },
  { id: 4, severity: "warning", message: "Cooling Tower Fan F-02 Degraded", source: "Cooling Tower", time: "08:45 AM", aiAnalysis: "Health at 45%. AI confidence 94%. Schedule maintenance within 48h.", acknowledged: true, muted: false },
];

const history = [
  { id: 10, severity: "critical", message: "Compressor C-B Overpressure", source: "Compressor C-B", time: "Yesterday 14:10", aiAnalysis: "Resolved. Pressure valve adjusted." },
  { id: 11, severity: "warning", message: "Voltage Spike on Line 3", source: "Power Line 3", time: "Yesterday 09:30", aiAnalysis: "Resolved. Stabilized within 4 minutes." },
];

export default function AlarmsPage() {
  const [alarms, setAlarms] = useState(initialAlarms);
  const [filter, setFilter] = useState<"all" | Severity>("all");
  const [showHistory, setShowHistory] = useState(false);
  const [muted, setMuted] = useState(false);

  // Simulate a new incoming alarm every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const newAlarm: Alarm = {
        id: Date.now(),
        severity: "warning",
        message: "Sensor Node SN-07 Timeout",
        source: "Sensor Grid",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        aiAnalysis: "Network packet loss detected. Check sensor node connectivity.",
        acknowledged: false,
        muted: false,
      };
      setAlarms(prev => [newAlarm, ...prev]);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const acknowledge = (id: number) => setAlarms(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  const muteAlarm = (id: number) => setAlarms(prev => prev.map(a => a.id === id ? { ...a, muted: !a.muted } : a));
  const dismiss = (id: number) => setAlarms(prev => prev.filter(a => a.id !== id));

  const filtered = filter === "all" ? alarms : alarms.filter(a => a.severity === filter);
  const counts = { critical: alarms.filter(a => a.severity === "critical" && !a.acknowledged).length, warning: alarms.filter(a => a.severity === "warning" && !a.acknowledged).length, info: alarms.filter(a => a.severity === "info").length };

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Alarms & Notifications</h1>
          <p className="text-zinc-400 mt-1">AI-prioritized alarm management</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setMuted(!muted)} className={clsx("p-2 rounded-lg border transition-all", muted ? "bg-warning/20 border-warning/40 text-warning" : "bg-white/5 border-white/10 text-zinc-400 hover:text-white")}>
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button onClick={() => setShowHistory(!showHistory)} className={clsx("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all", showHistory ? "bg-accent/20 border-accent/40 text-accent" : "bg-white/5 border-white/10 text-zinc-400 hover:text-white")}>
            <History className="w-4 h-4" /> History
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical", count: counts.critical, color: "critical", icon: AlertCircle },
          { label: "Warning", count: counts.warning, color: "warning", icon: AlertTriangle },
          { label: "Info", count: counts.info, color: "info", icon: Info },
        ].map(({ label, count, color, icon: Icon }) => (
          <div key={label} className={`glass-panel rounded-2xl p-4 border border-${color}/20 bg-${color}/5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${color}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold text-${color}`}>{count}</div>
              <div className="text-xs text-zinc-400">{label} Active</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5 w-fit">
        <Filter className="w-4 h-4 text-zinc-500 ml-2" />
        {(["all", "critical", "warning", "info"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={clsx("px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all", filter === f ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white")}>
            {f}
          </button>
        ))}
      </div>

      {/* Alarm List */}
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {filtered.map(alarm => (
            <motion.div
              key={alarm.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                "glass-panel rounded-2xl p-5 border relative overflow-hidden transition-all",
                alarm.severity === "critical" && !alarm.acknowledged ? "border-critical/40 bg-critical/5" : "",
                alarm.severity === "warning" ? "border-warning/30 bg-warning/5" : "",
                alarm.severity === "info" ? "border-info/30 bg-info/5" : "",
                alarm.acknowledged ? "opacity-50 border-white/5 bg-white/2" : ""
              )}
            >
              {alarm.severity === "critical" && !alarm.acknowledged && !alarm.muted && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-critical animate-pulse" />
              )}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: alarm.severity === "critical" ? "#ef4444" : alarm.severity === "warning" ? "#f59e0b" : "#3b82f6" }} />

              <div className="flex items-start justify-between pl-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {alarm.severity === "critical" && <AlertCircle className={clsx("w-5 h-5 text-critical", !alarm.acknowledged && "animate-pulse")} />}
                    {alarm.severity === "warning" && <AlertTriangle className="w-5 h-5 text-warning" />}
                    {alarm.severity === "info" && <Info className="w-5 h-5 text-info" />}
                    <span className="font-semibold text-white">{alarm.message}</span>
                    {alarm.acknowledged && <span className="text-[10px] bg-safe/20 text-safe px-2 py-0.5 rounded-full font-bold">ACK</span>}
                    {alarm.muted && <span className="text-[10px] bg-warning/20 text-warning px-2 py-0.5 rounded-full font-bold">MUTED</span>}
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Source: {alarm.source} · {alarm.time}</p>
                  <p className="text-sm text-zinc-400 border-l-2 border-accent/40 pl-3 italic">
                    <span className="text-accent font-semibold not-italic">AI: </span>{alarm.aiAnalysis}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 ml-4 min-w-[160px]">
                  {!alarm.acknowledged && (
                    <button onClick={() => acknowledge(alarm.id)} className="text-xs bg-safe/10 hover:bg-safe/20 border border-safe/30 text-safe px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 w-full justify-center">
                      <CheckCircle2 className="w-3 h-3" /> Acknowledge
                    </button>
                  )}
                  <button onClick={() => muteAlarm(alarm.id)} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 w-full justify-center">
                    {alarm.muted ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    {alarm.muted ? "Unmute" : "Mute"}
                  </button>
                  <button onClick={() => dismiss(alarm.id)} className="text-xs bg-critical/5 hover:bg-critical/10 border border-critical/20 text-critical/70 hover:text-critical px-3 py-1.5 rounded-lg transition-all w-full justify-center">
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* History */}
      {showHistory && (
        <div className="flex flex-col gap-3 mt-2">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Alarm History</h3>
          {history.map(h => (
            <div key={h.id} className="glass-panel rounded-xl p-4 border border-white/5 opacity-60 flex items-center gap-4">
              <AlertTriangle className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-zinc-300">{h.message} <span className="text-zinc-600 text-xs">· {h.source}</span></p>
                <p className="text-xs text-zinc-500 mt-0.5">{h.time} · {h.aiAnalysis}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
