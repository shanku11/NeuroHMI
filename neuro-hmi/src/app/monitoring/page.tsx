"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Thermometer, Zap, Cpu, Droplets, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const generateReading = (base: number, variance: number) =>
  parseFloat((base + (Math.random() - 0.5) * variance * 2).toFixed(2));

export default function MonitoringPage() {
  const [sensors, setSensors] = useState({
    temperature: 72.4,
    pressure: 3.8,
    voltage: 415.0,
    machineHealth: 88,
    energy: 4.2,
    production: 94,
  });
  const [history, setHistory] = useState<{ t: string; temp: number; pressure: number; voltage: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const newTemp = generateReading(72.4, 3);
      const newPressure = generateReading(3.8, 0.4);
      const newVoltage = generateReading(415, 5);

      setSensors({
        temperature: newTemp,
        pressure: newPressure,
        voltage: newVoltage,
        machineHealth: Math.min(100, Math.max(50, generateReading(88, 2))),
        energy: generateReading(4.2, 0.3),
        production: Math.min(100, Math.max(80, generateReading(94, 2))),
      });

      setHistory(prev => {
        const next = [...prev, { t: now, temp: newTemp, pressure: newPressure, voltage: newVoltage }];
        return next.slice(-20);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (val: number, warn: number, crit: number) =>
    val >= crit ? "text-critical" : val >= warn ? "text-warning" : "text-safe";

  const cards = [
    { label: "Temperature", value: `${sensors.temperature}°C`, icon: Thermometer, warn: 75, crit: 80, raw: sensors.temperature, max: 90 },
    { label: "Pressure", value: `${sensors.pressure} bar`, icon: Droplets, warn: 4.2, crit: 4.8, raw: sensors.pressure, max: 6 },
    { label: "Voltage", value: `${sensors.voltage} V`, icon: Zap, warn: 425, crit: 435, raw: sensors.voltage, max: 450 },
    { label: "Machine Health", value: `${sensors.machineHealth.toFixed(1)}%`, icon: Cpu, warn: 70, crit: 55, raw: 100 - sensors.machineHealth, max: 100 },
    { label: "Energy Usage", value: `${sensors.energy.toFixed(2)} MWh`, icon: BarChart3, warn: 4.5, crit: 5.2, raw: sensors.energy, max: 6 },
    { label: "Production", value: `${sensors.production.toFixed(1)}%`, icon: Activity, warn: 85, crit: 75, raw: 100 - sensors.production, max: 100 },
  ];

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75"/><span className="relative inline-flex rounded-full h-3 w-3 bg-safe"/></span>
          Live Monitoring
        </h1>
        <p className="text-zinc-400 mt-1">All sensor feeds updating every 2 seconds</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-4 flex flex-col gap-2 border border-white/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 uppercase tracking-wider">{card.label}</span>
              <card.icon className="w-4 h-4 text-accent" />
            </div>
            <div className={`text-2xl font-bold font-mono transition-all ${statusColor(card.raw, card.warn, card.crit)}`}>
              {card.value}
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  card.raw >= card.crit ? "bg-critical" : card.raw >= card.warn ? "bg-warning" : "bg-safe"
                }`}
                style={{ width: `${Math.min(100, (card.raw / card.max) * 100)}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Temperature Trend (Live)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={history}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
              <XAxis dataKey="t" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false}/>
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']}/>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#0ea5e9' }} isAnimationActive={false}/>
              <Area type="monotone" dataKey="temp" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#tempGrad)" isAnimationActive={false} name="Temp (°C)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Pressure & Voltage (Live)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
              <XAxis dataKey="t" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false}/>
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} isAnimationActive={false}/>
              <Line type="monotone" dataKey="pressure" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} name="Pressure (bar)"/>
              <Line type="monotone" dataKey="voltage" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} name="Voltage (V)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
