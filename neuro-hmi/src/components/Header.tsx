"use client";

import { Bell, Search, UserCircle, ShieldAlert, Edit3, Sparkles, Clock, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";

const roles = ["Lead Operator", "Maintenance", "Plant Manager"];

export function Header() {
  const [role, setRole] = useState(roles[0]);
  const [editMode, setEditMode] = useState(false);
  const [aiActive, setAiActive] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleEditMode = () => {
    const newMode = !editMode;
    setEditMode(newMode);
    window.dispatchEvent(new CustomEvent("toggleEditMode", { detail: newMode }));
  };
  
  const toggleAi = () => {
    const newMode = !aiActive;
    setAiActive(newMode);
    window.dispatchEvent(new CustomEvent("toggleAiCopilot", { detail: newMode }));
  };

  const startTour = () => {
    // We will build a simple tour logic or just alert for the prototype
    alert("Starting Interactive Demo Tour... (Mock functionality for hackathon)");
  };

  return (
    <header className="h-20 glass-panel border-b border-panel-border px-8 flex items-center justify-between sticky top-0 z-10 bg-black/80 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <div className="relative group hidden lg:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search tags, alarms..."
            className="bg-black/40 border border-white/10 rounded-full pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-zinc-500 text-white"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-info/10 border border-info/20 text-info text-sm">
          <ShieldAlert className="w-4 h-4" />
          <span>System Normal</span>
        </div>
        <div className="hidden xl:flex items-center gap-2 text-zinc-400 font-mono text-sm bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
          <Clock className="w-4 h-4" />
          {time}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Onboarding Tour Button */}
        <button
          onClick={startTour}
          className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-safe/10 text-safe border border-safe/30 hover:bg-safe/20 transition-all"
        >
          <PlayCircle className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Start Demo Tour</span>
        </button>

        {/* Low Code / AI Configuration Tools */}
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
          <button
            onClick={toggleEditMode}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              editMode ? "bg-accent/20 text-accent border border-accent/30" : "text-zinc-400 hover:text-white"
            )}
            title="Low-code layout editor"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden xl:inline">Layout Editor</span>
          </button>
          <button
            onClick={toggleAi}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              aiActive ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-zinc-400 hover:text-purple-400"
            )}
            title="AI Config Copilot"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden xl:inline">AI Copilot</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={clsx(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                role === r
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-critical animate-pulse" />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-white">Alex Chen</div>
              <div className="text-xs text-accent">{role}</div>
            </div>
            <UserCircle className="w-8 h-8 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
