"use client";

import { useState, useEffect } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Activity } from "lucide-react";

const initialData = [
  { time: "10:00", value: 400 },
  { time: "10:05", value: 430 },
  { time: "10:10", value: 448 },
  { time: "10:15", value: 470 },
  { time: "10:20", value: 540 },
  { time: "10:25", value: 580 },
  { time: "10:30", value: 590 },
];

export function TelemetryWidget() {
  const [data, setData] = useState(initialData);

  // Simulate real-time data stream
  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        const newData = [...currentData];
        newData.shift(); // Remove oldest
        
        // Generate new random value based on last value
        const lastVal = newData[newData.length - 1].value;
        const randomChange = Math.floor(Math.random() * 40) - 15; // random between -15 and +25 (tending upwards slightly)
        let nextVal = lastVal + randomChange;
        if (nextVal > 700) nextVal = 700; // cap
        if (nextVal < 300) nextVal = 300; // floor

        // Generate next time string
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        newData.push({ time: timeStr, value: nextVal });
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-6 h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          Pump 3A Vibration
        </h3>
        <div className="flex gap-2">
          <span className="px-2 py-1 rounded bg-white/5 text-xs text-zinc-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse"></span>
            Live
          </span>
          <span className="px-2 py-1 rounded bg-critical/20 text-critical text-xs font-bold animate-pulse">Critical</span>
        </div>
      </div>
      
      <div className="flex-1 w-full h-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-critical)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-critical)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#ef4444' }}
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-critical)" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              isAnimationActive={false} // Disable recharts animation to prevent jitter during frequent updates
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
