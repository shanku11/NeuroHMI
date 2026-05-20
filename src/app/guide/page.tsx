"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronRight, LayoutDashboard, Activity, AlertTriangle, Lightbulb, Cpu, FileText, Settings, Edit3, Sparkles } from "lucide-react";

const sections = [
  { icon: LayoutDashboard, color: "text-accent", title: "Dashboard Overview", summary: "Your mission control — real-time KPIs and widget layout.",
    steps: ["The top bar shows live clock, system status and your active role.", "Overall Efficiency and Active Alerts KPIs update every 2.5 seconds.", "The telemetry chart streams Pump 3A vibration data live — red spikes are critical.", "The 'Why Next-Gen HMI Matters' card explains the platform value to stakeholders."] },
  { icon: Activity, color: "text-safe", title: "Live Monitoring", summary: "6 sensor feeds updating every 2 seconds with live charts.",
    steps: ["6 sensor cards (Temperature, Pressure, Voltage, Health, Energy, Production) update every 2s.", "Color coding: Green = Normal · Yellow = Warning · Red = Critical.", "Two live charts track Temperature and Pressure/Voltage trends over rolling time windows.", "No manual refresh needed — data is continuously pushed from the simulation engine."] },
  { icon: AlertTriangle, color: "text-warning", title: "Alarms & Notifications", summary: "AI-prioritized interactive alarm panel with full controls.",
    steps: ["Critical alarms show a pulsing red bar at top — demands immediate attention.", "Hover over any alarm to reveal Acknowledge, Mute, and Dismiss buttons.", "The blue 'AI:' text gives the AI engine's diagnosis and recommended action.", "Use the Filter bar to show only Critical / Warning / Info alarms.", "Click 'History' to review previously resolved alarms.", "New alarms arrive automatically — the count badge on the sidebar updates in real-time."] },
  { icon: Lightbulb, color: "text-purple-400", title: "AI Insights", summary: "Live anomaly detection, health radar, and prediction cards.",
    steps: ["The Live Anomaly Score updates every 2s — above 70 is critical, 40–70 is elevated.", "The anomaly area chart shows when anomalies peaked during the current session.", "The Asset Health Radar gives a 6-axis visual of all machine conditions simultaneously.", "Each AI Recommendation card shows a confidence score (e.g. 94%) and a specific action to take."] },
  { icon: Cpu, color: "text-info", title: "System Health", summary: "Infrastructure monitoring for all connected nodes.",
    steps: ["Each card is a connected device: PLC, SCADA, sensor gateways, switches, etc.", "CPU, Memory and Ping bars update every 2.5 seconds with smooth transitions.", "A yellow border means the device is under stress — monitor closely.", "A red border is critical — requires immediate intervention.", "Uptime counters show how long each device has been continuously running."] },
  { icon: FileText, color: "text-safe", title: "Reports", summary: "Download the comprehensive 5-page AI analysis report.",
    steps: ["Click 'Download AI Report' to generate and save the report to your device.", "The report covers: Executive Summary, Predictive Maintenance, Telemetry Analysis, Security Audit, and AI Recommendations.", "Open the downloaded .md file in any Markdown viewer or VS Code to see the full formatted report."] },
  { icon: Settings, color: "text-accent", title: "Settings", summary: "Personalize your HMI — all changes apply instantly.",
    steps: ["Switch Dark / Light theme — takes effect immediately without page reload.", "Toggle notification types individually (Critical, Warning, Info, Email, Sound).", "Use the threshold sliders to set exactly when each sensor triggers an alarm.", "Change the real-time refresh interval (1s, 2s, 5s, 10s) to balance performance.", "User Access Permissions section shows what each role (Operator, Maintenance, Manager) can do.", "Click 'Save Changes' button in the top right to persist your configuration."] },
  { icon: Edit3, color: "text-accent", title: "Layout Editor (Low-Code)", summary: "Drag widgets to rearrange the dashboard — no code needed.",
    steps: ["Click the pencil icon 'Layout Editor' button in the top header.", "All widgets gain dashed blue borders and a 'Drag to Move' handle badge.", "Click and drag any widget to reposition it anywhere on the screen.", "Click 'Layout Editor' again to exit and lock the new layout."] },
  { icon: Sparkles, color: "text-purple-400", title: "AI Copilot", summary: "Auto-generate HMI screens using natural language prompts.",
    steps: ["Click the sparkles icon 'AI Copilot' button in the header.", "A slide-in panel appears on the right side of the screen.", "Type a prompt like: 'Create a Cooling System overview screen' and press Enter.", "The AI simulates generating a screen from metadata templates with a loading indicator.", "This demonstrates the auto-generated HMI and low-code configuration capability for the hackathon demo."] },
];

export default function GuidePage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="p-8 flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-2">
        <HelpCircle className="w-7 h-7 text-accent" />
        <div>
          <h1 className="text-2xl font-bold text-white">User Guide</h1>
          <p className="text-zinc-400 mt-0.5">Step-by-step instructions for every feature in NeuroHMI</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((section, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
            className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
              onClick={() => setOpen(open === idx ? null : idx)}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <section.icon className={`w-5 h-5 ${section.color}`} />
                </div>
                <div>
                  <div className="font-semibold text-white">{section.title}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{section.summary}</div>
                </div>
              </div>
              {open === idx ? <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-400 flex-shrink-0" />}
            </button>

            <AnimatePresence>
              {open === idx && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-white/5">
                  <div className="p-5 pl-16 flex flex-col gap-3">
                    {section.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 bg-white/5 ${section.color}`}>
                          {sIdx + 1}
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
