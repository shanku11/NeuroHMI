"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  Settings,
  LayoutDashboard,
  Zap,
  Cpu,
  LogOut,
  ChevronRight,
  ChevronLeft,
  FileText,
  HelpCircle,
  Lightbulb
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Live Monitoring", href: "/monitoring" },
  { icon: AlertTriangle, label: "Alarms", href: "/alarms", alertCount: 3 },
  { icon: Lightbulb, label: "AI Insights", href: "/ai-insights" },
  { icon: Cpu, label: "System Health", href: "/health" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "User Guide", href: "/guide" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen glass-panel flex flex-col justify-between border-r border-panel-border z-20 relative bg-black/80 backdrop-blur-md"
    >
      <div>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-semibold tracking-wide text-white glow-text"
              >
                NEURO<span className="text-accent font-light">HMI</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link key={idx} href={item.href} className="block">
                <button
                  className={clsx(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden whitespace-nowrap",
                    isActive
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={clsx("w-5 h-5 flex-shrink-0 z-10", isActive && "drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]")} />

                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium z-10"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {item.alertCount && (
                    <div className={clsx(
                      "absolute right-4 w-5 h-5 rounded-full bg-critical text-[10px] font-bold flex items-center justify-center text-white z-10",
                      collapsed ? "top-1 right-2" : "top-1/2 -translate-y-1/2"
                    )}>
                      {item.alertCount}
                    </div>
                  )}
                </button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 space-y-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors whitespace-nowrap"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
