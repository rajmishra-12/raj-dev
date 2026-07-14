"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TECHS } from "./GalaxyScene";
import { Cpu, Terminal, Compass, Layers, ShieldCheck, Activity } from "lucide-react";

interface SkillHUDProps {
  activeId: string | null;
}

const STATS_MAP: Record<
  string,
  {
    usage: number;
    status: string;
    load: string;
    latency: string;
    description: string;
  }
> = {
  firebase: {
    usage: 92,
    status: "STABLE",
    load: "OPTIMAL",
    latency: "24ms",
    description: "Architected real-time Cloud Firestore synchronization models, custom OAuth flows via Firebase Auth, and background scheduling via Node.js Cloud Functions. Implemented scalable FCM push systems for high-engagement notifications.",
  },
  nodejs: {
    usage: 85,
    status: "ACTIVE",
    load: "NORMAL",
    latency: "15ms",
    description: "Designed RESTful microservices and Express middlewares. Optimized MongoDB query execution planners and structured clean MVC backend architectures supporting high-concurrency connections.",
  },
  openai: {
    usage: 88,
    status: "READY",
    load: "DYNAMIC",
    latency: "340ms",
    description: "Integrated GPT models for real-time diagnostic systems and virtual health assistants. Configured secure backend prompt engineering filters and chat memory handlers to power smart decision interfaces.",
  },
  googlemaps: {
    usage: 80,
    status: "ONLINE",
    load: "STANDBY",
    latency: "45ms",
    description: "Implemented live vehicle telemetry tracking, complex geofencing zones, address auto-completion structures, and dynamic routing engines with customized overlay decorators on Android/iOS.",
  },
  ble: {
    usage: 78,
    status: "LINKED",
    load: "POLLING",
    latency: "8ms",
    description: "Established low-energy GATT channel bindings to process live Bluetooth data packets from hardware oximeters and biosensors. Designed robust recovery logic for connection drops.",
  },
  socketio: {
    usage: 82,
    status: "ACTIVE",
    load: "BALANCED",
    latency: "12ms",
    description: "Engineered real-time location streaming and chat channels using Socket.IO. Designed fallback websocket transport structures and packet delivery confirmations for high-reliability message channels.",
  },
  riverpod: {
    usage: 95,
    status: "PRODUCTION",
    load: "CORESTATE",
    latency: "0.2ms",
    description: "Configured highly modular Flutter application states using Riverpod. Managed complex async family mappings, manual state invalidation routines, and scoped local state caching.",
  },
  bloc: {
    usage: 90,
    status: "PRODUCTION",
    load: "ISOLATED",
    latency: "0.4ms",
    description: "Designed event-driven enterprise app architectures using Bloc & Cubit. Enforced complete decoupling of UI from presentation rules to enable rigorous unit testing patterns.",
  },
  supabase: {
    usage: 75,
    status: "ONLINE",
    load: "LISTENERS",
    latency: "18ms",
    description: "Utilized Supabase PostgreSQL schemas, realtime database triggers, storage buckets, and secure row-level security (RLS) rules to handle multi-tenant isolation architectures.",
  },
};

export default function SkillHUD({ activeId }: SkillHUDProps) {
  const activeTech = activeId ? TECHS.find((t) => t.id === activeId) : null;
  const stats = activeId ? STATS_MAP[activeId] : null;

  return (
    <div className="w-full relative h-[600px] flex flex-col justify-between">
      {/* Background cyber grid panel */}
      <div 
        className="absolute inset-0 -z-10 rounded-3xl backdrop-blur-2xl transition-all duration-700"
        style={{
          background: activeTech 
            ? `linear-gradient(145deg, rgba(8,8,14,0.92), ${activeTech.color}07)`
            : "linear-gradient(145deg, rgba(5,5,8,0.95), rgba(255,255,255,0.01))",
          border: `1px solid ${activeTech ? `${activeTech.color}35` : "rgba(255,255,255,0.06)"}`,
          boxShadow: activeTech
            ? `0 0 40px ${activeTech.color}12, inset 0 0 20px ${activeTech.color}05`
            : "0 10px 40px -10px rgba(0,0,0,0.6)",
        }}
      />

      <AnimatePresence mode="wait">
        {activeTech && stats ? (
          <motion.div
            key={activeTech.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 flex flex-col h-full justify-between"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-2.5 h-2.5 rounded-full animate-pulse" 
                    style={{ 
                      background: activeTech.color,
                      boxShadow: `0 0 10px ${activeTech.color}`
                    }}
                  />
                  <div>
                    <h3 className="text-sm font-mono font-black uppercase tracking-[0.25em] text-white">
                      {activeTech.label}
                    </h3>
                    <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.15em]">
                      Ecosystem Telemetry
                    </span>
                  </div>
                </div>
                
                <div 
                  className="px-2.5 py-0.5 rounded-full border text-[8px] font-mono font-bold tracking-widest"
                  style={{
                    borderColor: `${activeTech.color}40`,
                    color: activeTech.color,
                    background: `${activeTech.color}08`
                  }}
                >
                  {stats.status}
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-5 font-mono text-[9px]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-white/30 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-white/40" />
                    <span className="uppercase tracking-wider">Core Load</span>
                  </div>
                  <div className="text-white/80 font-bold">{stats.load}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-white/30 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-white/40" />
                    <span className="uppercase tracking-wider">Sync Delay</span>
                  </div>
                  <div className="text-white/80 font-bold">{stats.latency}</div>
                </div>
              </div>

              {/* Progress Slider (Usage) */}
              <div className="mb-5">
                <div className="flex justify-between items-center text-[9px] font-mono mb-2">
                  <span className="text-white/40 uppercase tracking-wider">Expertise Index</span>
                  <span style={{ color: activeTech.color }} className="font-bold">{stats.usage}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.usage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: activeTech.color }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[7px] font-mono uppercase tracking-[0.25em] text-white/30 block">
                  Integration Logs
                </span>
                <p className="text-[10px] text-white/70 leading-relaxed font-sans font-light">
                  {stats.description}
                </p>
              </div>
            </div>

            {/* Target Apps */}
            <div className="border-t border-white/5 pt-4">
              <span className="text-[7px] font-mono uppercase tracking-[0.25em] text-white/30 block mb-2">
                Deployed Production Apps
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTech.projects.map((proj) => (
                  <span 
                    key={proj}
                    className="text-[8px] font-mono px-3 py-1 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: `${activeTech.color}25`,
                      color: activeTech.color,
                      background: `${activeTech.color}05`
                    }}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 flex flex-col h-full justify-between font-mono"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <Terminal className="w-4 h-4 text-primary-accent" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white/80">
                    Ecosystem Core
                  </h3>
                  <span className="text-[7px] text-white/30 uppercase tracking-[0.15em]">
                    System Idle Status
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-[10px] leading-relaxed text-white/50 font-sans font-light">
                <p>
                  Hover any node in the orbiting 3D telemetry display to synchronize parameters, project logs, and implementation statistics.
                </p>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-[9px] space-y-2">
                  <div className="flex justify-between items-center text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-primary-accent" />
                      <span>Ecosystem Core</span>
                    </span>
                    <span className="text-primary-accent">[STANDBY]</span>
                  </div>
                  <div className="h-px bg-white/5 w-full" />
                  <div className="space-y-1 text-white/40">
                    <div className="flex justify-between">
                      <span>Refraction Engine</span>
                      <span>WebGL 2.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Telemetry Pathing</span>
                      <span>Active (60FPS)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Link</span>
                      <span>Operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom HUD info */}
            <div className="border-t border-white/5 pt-4 text-white/30 text-[8px] tracking-widest uppercase flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Clean Architecture</span>
              </span>
              <span>v2.10</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
