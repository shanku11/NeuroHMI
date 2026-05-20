"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Sun, Moon, Bell, Sliders, Globe, Shield, Cpu, Save } from "lucide-react";
import clsx from "clsx";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notifications, setNotifications] = useState({ critical: true, warning: true, info: false, email: true, sound: false });
  const [thresholds, setThresholds] = useState({ temperature: 80, pressure: 4.5, voltage: 430, vibration: 600 });
  const [refreshInterval, setRefreshInterval] = useState(2);
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={clsx("w-11 h-6 rounded-full relative transition-all duration-300", checked ? "bg-accent" : "bg-white/10")}>
      <div className={clsx("w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-300", checked ? "left-6" : "left-1")} />
    </button>
  );

  const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="glass-panel rounded-2xl p-6 border border-white/5">
      <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-5">
        <Icon className="w-5 h-5 text-accent" />{title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Settings className="w-7 h-7 text-accent" />Settings</h1>
          <p className="text-zinc-400 mt-1">All changes apply instantly across the dashboard</p>
        </div>
        <motion.button onClick={handleSave} whileTap={{ scale: 0.95 }}
          className={clsx("px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all", saved ? "bg-safe text-black" : "bg-accent text-black hover:bg-accent-hover")}>
          <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Changes"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme */}
        <SectionCard title="Appearance" icon={Sun}>
          <div className="flex gap-3">
            {(["dark", "light"] as const).map(t => (
              <button key={t} onClick={() => setTheme(t)} className={clsx("flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition-all capitalize",
                theme === t ? "bg-accent/10 border-accent/40 text-accent" : "border-white/10 text-zinc-400 hover:text-white")}>
                {t === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}{t} Mode
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Language */}
        <SectionCard title="Language & Region" icon={Globe}>
          <div className="flex gap-3">
            {["English", "Deutsch", "日本語"].map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} className={clsx("flex-1 py-3 rounded-xl border text-sm font-medium transition-all",
                language === lang ? "bg-accent/10 border-accent/40 text-accent" : "border-white/10 text-zinc-400 hover:text-white")}>
                {lang}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="Notification Settings" icon={Bell}>
          <div className="space-y-4">
            {[
              { key: "critical", label: "Critical Alarm Alerts" },
              { key: "warning", label: "Warning Alerts" },
              { key: "info", label: "Informational Messages" },
              { key: "email", label: "Email Notifications" },
              { key: "sound", label: "Sound Alerts" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-1">
                <span className="text-sm text-zinc-300">{label}</span>
                <Toggle checked={notifications[key as keyof typeof notifications]}
                  onChange={() => setNotifications(p => ({ ...p, [key]: !p[key as keyof typeof notifications] }))} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Alert Thresholds */}
        <SectionCard title="Alert Thresholds" icon={Sliders}>
          <div className="space-y-5">
            {[
              { key: "temperature", label: "Temperature Warning (°C)", min: 60, max: 120, step: 1 },
              { key: "pressure", label: "Pressure Warning (bar)", min: 2, max: 8, step: 0.1 },
              { key: "voltage", label: "Voltage Warning (V)", min: 380, max: 460, step: 1 },
              { key: "vibration", label: "Vibration Warning (mm/s²)", min: 300, max: 900, step: 10 },
            ].map(({ key, label, min, max, step }) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">{label}</span>
                  <span className="text-white font-mono font-bold">{thresholds[key as keyof typeof thresholds]}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={thresholds[key as keyof typeof thresholds]}
                  onChange={e => setThresholds(p => ({ ...p, [key]: parseFloat(e.target.value) }))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                  style={{ background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((thresholds[key as keyof typeof thresholds] - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((thresholds[key as keyof typeof thresholds] - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)` }}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Refresh Interval */}
        <SectionCard title="Real-Time Refresh Interval" icon={Cpu}>
          <div className="flex gap-3">
            {[1, 2, 5, 10].map(sec => (
              <button key={sec} onClick={() => setRefreshInterval(sec)} className={clsx("flex-1 py-3 rounded-xl border text-sm font-mono font-bold transition-all",
                refreshInterval === sec ? "bg-accent/10 border-accent/40 text-accent" : "border-white/10 text-zinc-400 hover:text-white")}>
                {sec}s
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3">Current: updating every {refreshInterval} second{refreshInterval > 1 ? "s" : ""}</p>
        </SectionCard>

        {/* Access Control */}
        <SectionCard title="User Access Permissions" icon={Shield}>
          <div className="space-y-3">
            {[
              { role: "Lead Operator", perms: ["View", "Acknowledge", "Edit Layout"] },
              { role: "Maintenance", perms: ["View", "Acknowledge", "Maintenance Tools"] },
              { role: "Plant Manager", perms: ["View", "All Reports", "Settings"] },
            ].map(({ role, perms }) => (
              <div key={role} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-white font-medium">{role}</span>
                <div className="flex gap-1 flex-wrap justify-end">
                  {perms.map(p => <span key={p} className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
