"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, AlertTriangle, Zap, Clock, CheckCircle2 } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const anomalyData = [
  { time: "08:00", score: 12 }, { time: "08:30", score: 15 }, { time: "09:00", score: 18 },
  { time: "09:30", score: 22 }, { time: "10:00", score: 45 }, { time: "10:15", score: 78 },
  { time: "10:24", score: 95 }, { time: "10:30", score: 88 }, { time: "10:45", score: 60 },
  { time: "11:00", score: 30 },
];

const healthRadar = [
  { metric: "Pump 3A", value: 38 }, { metric: "Cooling Fan", value: 45 },
  { metric: "Compressor", value: 88 }, { metric: "Conveyor", value: 92 },
  { metric: "Boiler", value: 76 }, { metric: "Filter", value: 95 },
];

const insights = [
  { id: 1, type: "critical", title: "Imminent Failure: Cooling Tower Fan F-02", confidence: 94, description: "Vibration analysis and thermal imaging indicate bearing degradation. Predicted failure within 48 hours. Immediate maintenance recommended.", action: "Schedule emergency inspection within 24h", timeframe: "48h" },
  { id: 2, type: "warning", title: "Energy Optimization Opportunity", confidence: 89, description: "Machine learning model detected 12% energy waste during off-peak production hours (02:00–06:00 AM). Adjusting schedule can save ~0.5 MWh/day.", action: "Reconfigure shift schedule in Settings", timeframe: "Ongoing" },
  { id: 3, type: "info", title: "Conveyor Motor M-101 Maintenance Due", confidence: 98, description: "Predictive model forecasts optimal maintenance window in 720 hours based on current wear patterns. Pre-ordering parts recommended.", action: "Add to maintenance calendar", timeframe: "30 days" },
  { id: 4, type: "info", title: "Production Throughput Anomaly Detected", confidence: 76, description: "Output dropped 3.2% between 09:00–10:00 AM compared to historical baseline. Possible bottleneck at conveyor junction J-4.", action: "Review conveyor junction J-4 telemetry", timeframe: "Investigate" },
];

export default function AIInsightsPage() {
  const [liveScore, setLiveScore] = useState(30);

  useEffect(() => {
    const i = setInterval(() => {
      setLiveScore(prev => {
        const next = prev + (Math.random() - 0.5) * 10;
        return Math.max(5, Math.min(100, parseFloat(next.toFixed(1))));
      });
    }, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <Lightbulb className="w-7 h-7 text-purple-400" />
          AI Insights & Predictions
        </h1>
        <p className="text-zinc-400 mt-1">Real-time anomaly detection and machine learning forecasts</p>
      </div>

      {/* Live Anomaly Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"/></span>
            Live Anomaly Score History
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={anomalyData}>
              <defs>
                <linearGradient id="anomalyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false}/>
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]}/>
              <Tooltip contentStyle={{ backgroundColor:'rgba(0,0,0,0.8)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px' }} itemStyle={{ color:'#a855f7' }} isAnimationActive={false}/>
              <Area type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#anomalyGrad)" isAnimationActive={false} name="Anomaly Score"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <h3 className="text-lg font-medium text-white mb-2">Current Anomaly Score</h3>
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <div className={`text-6xl font-bold font-mono transition-all ${liveScore > 70 ? "text-critical" : liveScore > 40 ? "text-warning" : "text-safe"}`}>
              {liveScore.toFixed(0)}
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${liveScore > 70 ? "bg-critical" : liveScore > 40 ? "bg-warning" : "bg-safe"}`} style={{ width: `${liveScore}%` }}/>
            </div>
            <p className="text-xs text-zinc-400 text-center">{liveScore > 70 ? "⚠️ Elevated anomaly — review critical insights" : liveScore > 40 ? "🟡 Moderate — monitor closely" : "✅ System normal"}</p>
          </div>
        </div>
      </div>

      {/* System Health Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Asset Health Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={healthRadar}>
              <PolarGrid stroke="rgba(255,255,255,0.1)"/>
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}/>
              <Radar name="Health" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendation Cards */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {insights.map((insight, idx) => (
            <motion.div key={insight.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              className={`glass-panel rounded-xl p-4 border relative overflow-hidden ${insight.type === "critical" ? "border-critical/30 bg-critical/5" : insight.type === "warning" ? "border-warning/30 bg-warning/5" : "border-info/20 bg-info/5"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className={`w-4 h-4 ${insight.type === "critical" ? "text-critical" : insight.type === "warning" ? "text-warning" : "text-info"}`}/>
                    <span className="font-semibold text-white text-sm">{insight.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${insight.type === "critical" ? "bg-critical/20 text-critical" : insight.type === "warning" ? "bg-warning/20 text-warning" : "bg-info/20 text-info"}`}>
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-2">{insight.description}</p>
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <CheckCircle2 className="w-3 h-3"/>
                    <span>Action: {insight.action}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 min-w-[60px]">
                  <Clock className="w-3 h-3 text-zinc-500"/>
                  <span className="text-[10px] text-zinc-500">{insight.timeframe}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
