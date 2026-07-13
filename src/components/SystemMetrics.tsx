"use client";

import { useEffect, useState } from "react";
import { Cpu, Activity, Database, CheckSquare } from "lucide-react";

export default function SystemMetrics() {
  const [cpu, setCpu] = useState(12.4);
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(54.2);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro-fluctuations in resources
      setCpu(parseFloat((10 + Math.random() * 8).toFixed(1)));
      setFps(Math.random() > 0.95 ? 59 : 60);
      setMemory(parseFloat((52.0 + Math.random() * 3).toFixed(1)));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-4 rounded-xl border border-white/5 h-[320px] md:h-[400px] flex flex-col justify-between font-mono text-[10px] text-white/50 relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <span className="text-[9px] uppercase tracking-wider text-secondary-accent font-bold">Telemetry Engine Metrics</span>
        <Activity className="w-3.5 h-3.5 text-secondary-accent animate-pulse" />
      </div>

      <div className="flex-1 space-y-4 pt-2">
        {/* FPS & Latency Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-frost rounded-lg p-2 text-center">
            <span className="block text-[8px] uppercase tracking-wider text-white/40">Render Loop</span>
            <span className="text-sm font-bold text-white font-mono">{fps} FPS</span>
          </div>
          <div className="glass-frost rounded-lg p-2 text-center">
            <span className="block text-[8px] uppercase tracking-wider text-white/40">UI Thread</span>
            <span className="text-sm font-bold text-primary-accent font-mono">1.6 ms</span>
          </div>
        </div>

        {/* CPU Meter */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[9px]">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-secondary-accent" /> CPU LOAD</span>
            <span className="text-white">{cpu}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-secondary-accent rounded-full transition-all duration-1000" style={{ width: `${(cpu/30)*100}%` }} />
          </div>
        </div>

        {/* RAM Caching */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[9px]">
            <span className="flex items-center gap-1"><Database className="w-3 h-3 text-primary-accent" /> MEMORY</span>
            <span className="text-white">{memory} MB</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary-accent rounded-full transition-all duration-1000" style={{ width: `${(memory/100)*100}%` }} />
          </div>
        </div>

        {/* Subsystems Active */}
        <div className="space-y-2 border-t border-white/5 pt-3">
          <span className="block text-[8px] uppercase tracking-wider text-white/40">Active Subsystems</span>
          <div className="grid grid-cols-2 gap-2 text-[9px] text-white/80">
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3 h-3 text-emerald-400" />
              <span>GATT BLE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3 h-3 text-emerald-400" />
              <span>Socket.IO</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3 h-3 text-emerald-400" />
              <span>OpenAI SDK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3 h-3 text-emerald-400" />
              <span>Riverpod</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[8px] uppercase tracking-wider">
        <span>STATUS: EXCELLENT</span>
        <span>LATENCY: 42ms</span>
      </div>
    </div>
  );
}
