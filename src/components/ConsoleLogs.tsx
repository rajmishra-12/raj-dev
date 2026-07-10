"use client";

import { useEffect, useState, useRef } from "react";

const logTemplates = [
  "INIT FlutterEngine --version 3.22.0 (stable)",
  "LOADING State Providers: [Riverpod, Bloc, Cubit]",
  "BOOTING Dart VM Thread Pool...",
  "CONNECTING BLE Hardware interface: GATT Protocol",
  "SCANNING Peripheral UUID: 0xFFE0...",
  "CONNECTED Device: Medentum-Diagnostick (00:1A:7D:DA:71:11)",
  "STREAMING Vital Signs: [Oxygen: 98%, Pulse: 72bpm]",
  "HANDSHAKE Socket.IO Server: Establishing handshake...",
  "SYNCHRONIZED Socket.IO Channel: real-time rider-driver sync",
  "PARSING OpenAI API request: GPT-4o Disease Analysis Engine",
  "IN-APP PURCHASE StoreKit v2: Verifying receipt token...",
  "REGISTERING Device Token: Firebase FCM Service",
  "DEEP LINKING Router: Navigating to page /checkout",
  "OPTIMIZING Frame Renders: UI Thread execution time 1.6ms",
  "SQLITE DB CACHE: Syncing 45 offline journals",
  "SUPABASE Sync Engine: Updating leaderboard statistics..."
];

export default function ConsoleLogs() {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with a few logs
    setLogs([
      `[${new Date().toLocaleTimeString()}] SETUP Dev Console...`,
      `[${new Date().toLocaleTimeString()}] SECURE Port: 3001 Connection active`
    ]);

    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const randomMsg = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLogs((prev) => [...prev, `[${time}] ${randomMsg}`].slice(-16)); // Keep last 16 logs
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-card p-4 rounded-xl border border-white/5 h-[320px] md:h-[400px] flex flex-col justify-between font-mono text-[10px] text-white/50 relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
        <span className="text-[9px] uppercase tracking-wider text-primary-accent font-bold">System Console Output</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-1.5 pr-2 hide-scrollbar">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`leading-relaxed whitespace-pre-wrap ${
              index === logs.length - 1 ? "text-primary-accent font-bold" : ""
            }`}
          >
            {log}
          </div>
        ))}
        <div className="w-1 h-3.5 bg-primary-accent/80 animate-pulse inline-block" />
      </div>

      <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[8px] uppercase tracking-wider">
        <span>Channel: FLT-STABLE</span>
        <span>SYS LOAD: 12.5%</span>
      </div>
    </div>
  );
}
