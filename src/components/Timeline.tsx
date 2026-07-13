"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, ExternalLink, ChevronDown, ChevronUp, ChevronRight,
  Smartphone, Zap, Brain, Bluetooth, Globe, Server, Layers, X
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    id: "eitbiz",
    company: "EitBiz Technologies",
    role: "Flutter Developer",
    period: "June 2025 – Present",
    duration: "Present",
    location: "New Delhi, India",
    color: "#4F8CFF",
    icon: Zap,
    description:
      "Design and develop production-grade Flutter applications for Android and iOS across healthcare, social media, ride-sharing, and media verticals. Lead performance profiling, memory optimization, and UI/UX redesigns.",
    metrics: [
      { label: "BLE Devices", value: 5, suffix: "+" },
      { label: "AI Integrations", value: 3, suffix: "" },
      { label: "Swipe rendering", value: 60, suffix: " FPS" },
      { label: "Avg Rating", value: 4.8, suffix: "★" },
    ],
    chips: ["Flutter", "BLE/GATT", "OpenAI", "Socket.IO", "Riverpod", "Bloc/Cubit", "Firebase", "WebRTC", "In-App Purchases"],
    projects: [
      {
        id: "medentum",
        name: "Medentum Diagnostick",
        category: "Healthcare · IoT",
        desc: "BLE heart-rate monitoring from paired medical devices with instant GPT-4 health insights and live camera documentations.",
        achievement: "BLE Integration + OpenAI Diagnostics",
        stack: ["Flutter", "BLE/GATT", "OpenAI API", "Riverpod", "Camera API"],
        color: "#10A37F",
        gradient: "from-emerald-600 to-teal-900",
        icon: Bluetooth,
        challenges: "Handling raw byte packets from medical monitoring hardware without dropping values or freezing the active UI thread.",
        architecture: "Layered Domain/Repository pattern with Riverpod provider hooks.",
        playStore: "https://play.google.com/store/apps/details?id=com.medentum.diagnostick",
        appStore: "https://apps.apple.com/us/app/diagnostick/id6499124629",
      },
      {
        id: "zembora",
        name: "Zembora",
        category: "Ride Sharing",
        desc: "Full ride-sharing ecosystem featuring Google Maps tracking, dynamic routes geofencing, and real-time Socket.IO routing.",
        achievement: "18% reduction in pickup time",
        stack: ["Flutter", "Socket.IO", "Google Maps SDK", "Node.js", "Express"],
        color: "#7C3AED",
        gradient: "from-purple-700 to-indigo-950",
        icon: Globe,
        challenges: "Synchronizing driver and rider states instantly across weak cell towers; route matches using waypoints.",
        architecture: "Event-driven real-time synchronized architecture with Socket.IO.",
        playStore: "",
        appStore: "",
      },
      {
        id: "orra",
        name: "Orra",
        category: "Dating App",
        desc: "Dating app featuring swipe matching, Socket.IO chat rooms, message delivery receipts, and WebRTC video call pipelines.",
        achievement: "Custom swipe stack at 60 FPS",
        stack: ["Flutter", "Firebase Auth", "Socket.IO", "Cubit", "WebRTC"],
        color: "#E11D48",
        gradient: "from-pink-600 to-rose-950",
        icon: Smartphone,
        challenges: "Preventing lag on gesture-driven cards rendering dynamic image arrays; optimizing video call codecs.",
        architecture: "Reactive Cubit state machines with local persistence.",
        playStore: "",
        appStore: "",
      },
      {
        id: "mainstreet",
        name: "Main Street Media",
        category: "Media Platform",
        desc: "Premium entertainment app with in-app purchases, push notifications, deep linking, and premium content streaming.",
        achievement: "+25% paywall conversion rate",
        stack: ["Flutter", "StoreKit", "FCM", "GoRouter", "Bloc", "Firebase"],
        color: "#0EA5E9",
        gradient: "from-blue-600 to-indigo-900",
        icon: Layers,
        challenges: "Synchronizing subscription state dynamically under varying network coverage.",
        architecture: "Feature-driven Clean Architecture with Bloc state routing.",
        playStore: "https://play.google.com/store/apps/details?id=com.mainstreetmedia.android",
        appStore: "https://apps.apple.com/us/app/main-street-media/id6758084000",
      },
    ],
  },
  {
    id: "prutor",
    company: "Prutor.ai · IIT Kanpur",
    role: "Flutter Developer (Full-Time)",
    period: "September 2024 – May 2025",
    duration: "9 months",
    location: "Noida",
    color: "#6FE7FF",
    icon: Brain,
    description:
      "Designed and developed scalable educational and gamified learning platforms serving thousands of students preparing for competitive examinations. Collaborated with researchers to translate pedagogical requirements into features.",
    metrics: [
      { label: "Downloads", value: 100, suffix: "K+" },
      { label: "Games Built", value: 40, suffix: "+" },
      { label: "Frame Time", value: 42, suffix: "% faster" },
      { label: "Quizzes quiz-engine", value: 1.8, suffix: "K+" },
    ],
    chips: ["Flutter", "Riverpod", "Supabase", "SQLite", "Firebase", "WebViews", "AudioPlayers", "Custom Canvas"],
    projects: [
      {
        id: "sathee",
        name: "Sathee Education App",
        category: "Education Platform",
        desc: "Outreach education app delivering course content, assessments, mock exams, and video lessons to 100K+ students.",
        achievement: "100K+ downloads · 42% faster renders",
        stack: ["Flutter", "Riverpod", "SQLite", "Firebase", "WebViews"],
        color: "#06B6D4",
        gradient: "from-cyan-600 to-sky-900",
        icon: Brain,
        challenges: "Rendering analytical charts efficiently on older budget Android devices.",
        architecture: "Domain-driven design with decoupled local database caching.",
        playStore: "https://play.google.com/store/apps/details?id=com.sathee_app",
        appStore: "https://apps.apple.com/us/app/sathee/id6470142920",
      },
      {
        id: "satheekendra",
        name: "Sathee Kendra",
        category: "School Management",
        desc: "School management utility with role-based dashboards, quiz engines, adaptive difficulty, and result analytics.",
        achievement: "1.8K+ Quizzes & Riverpod Architecture",
        stack: ["Flutter", "Riverpod", "REST APIs", "FCM", "Dart"],
        color: "#3B82F6",
        gradient: "from-blue-600 to-indigo-900",
        icon: Server,
        challenges: "Managing highly complex permissions and states across multiple user roles concurrently.",
        architecture: "Decoupled Riverpod architecture with repositories.",
        playStore: "https://play.google.com/store/apps/details?id=com.satheekendra",
        appStore: "https://apps.apple.com/us/app/sathee-kendra/id6749477967",
      },
      {
        id: "prutor-games",
        name: "Prutor Games",
        category: "Gamified Learning",
        desc: "Gamified learning portal hosting 40+ interactive vocabulary games using space repetition and live scoreboards.",
        achievement: "Live scoreboard under 100ms",
        stack: ["Flutter", "Custom Canvas", "Supabase", "AudioPlayers"],
        color: "#F59E0B",
        gradient: "from-amber-600 to-orange-900",
        icon: Zap,
        challenges: "Standardizing inputs, states, and scores across 40 distinct games.",
        architecture: "Component-based micro-game engine framework.",
        playStore: "https://play.google.com/store/apps/details?id=com.prutorgames.sathee_elevated",
        appStore: "",
      },
      {
        id: "smartgames",
        name: "Smart Games",
        category: "Gamified Learning",
        desc: "Cognitive educational games combining cognitive challenges with bite-sized educational content.",
        achievement: "10K+ Downloads & Gamified Cognition",
        stack: ["Flutter", "Dart", "Supabase", "AudioPlayers", "FCM"],
        color: "#10B981",
        gradient: "from-emerald-600 to-green-900",
        icon: Brain,
        challenges: "Designing responsive layouts for highly interactive canvas elements across mobile & tablets.",
        architecture: "Modular block architecture with local SQLite persistence.",
        playStore: "https://play.google.com/store/apps/details?id=com.prutor.smart_games",
        appStore: "https://apps.apple.com/us/app/smart-games/id6746445090",
      },
    ],
  },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const isDecimal = value % 1 !== 0;
    const steps = 50;
    const interval = 30;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        const currentVal = (value / steps) * step;
        setDisplay(isDecimal ? parseFloat(currentVal.toFixed(1)) : Math.round(currentVal));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [active, value]);

  return <span>{display}{suffix}</span>;
}

// ─── Chips ─────────────────────────────────────────────────────────────────────
function TechChip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest border transition-all hover:scale-105"
      style={{
        borderColor: `${color}35`,
        color,
        background: `${color}0c`,
      }}
    >
      {label}
    </span>
  );
}

// ─── Project details modal ─────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof EXPERIENCES)[0]["projects"][0] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-6"
          style={{ backdropFilter: "blur(16px)", background: "rgba(0,0,0,0.8)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="w-full max-w-xl rounded-2xl border p-6 relative"
            style={{
              background: `linear-gradient(135deg, #0a0a0a, ${project.color}14)`,
              borderColor: `${project.color}40`,
              boxShadow: `0 0 60px ${project.color}22`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-white/70" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}>
                <project.icon className="w-5 h-5" style={{ color: project.color }} />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest font-mono mb-0.5"
                  style={{ color: project.color }}>{project.category}</div>
                <h3 className="text-lg font-bold font-display text-white">{project.name}</h3>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-sans mb-5">{project.desc}</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl p-3 border border-white/5 bg-white/[0.03]">
                <div className="text-[8px] uppercase tracking-widest text-white/30 font-mono mb-1">Architecture</div>
                <p className="text-[11px] text-white/80 leading-relaxed">{project.architecture}</p>
              </div>
              <div className="rounded-xl p-3 border border-white/5 bg-white/[0.03]">
                <div className="text-[8px] uppercase tracking-widest text-white/30 font-mono mb-1">Key Challenge</div>
                <p className="text-[11px] text-white/80 leading-relaxed">{project.challenges}</p>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[8px] uppercase tracking-widest text-white/30 font-mono mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono"
                    style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.color }} />
                <span className="text-[10px] font-mono" style={{ color: project.color }}>{project.achievement}</span>
              </div>
              <div className="flex items-center gap-2">
                {project.playStore && (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest border border-white/10 hover:border-primary-accent hover:bg-primary-accent/10 text-white transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Play Store
                  </a>
                )}
                {project.appStore && (
                  <a
                    href={project.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest border border-white/10 hover:border-secondary-accent hover:bg-secondary-accent/10 text-white transition-all flex items-center gap-1 cursor-pointer"
                  >
                    App Store
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof EXPERIENCES)[0]["projects"][0];
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      className="cursor-pointer rounded-xl border p-4 flex flex-col gap-3 transition-all duration-300 relative overflow-hidden"
      style={{
        borderColor: hovered ? `${project.color}55` : "rgba(255,255,255,0.06)",
        background: hovered
          ? `linear-gradient(135deg, rgba(10,10,10,0.95), ${project.color}14)`
          : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? `0 8px 32px ${project.color}22` : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Color accent strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: hovered ? 1 : 0 }} />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${project.color}18`, border: `1px solid ${project.color}33` }}>
            <project.icon className="w-4 h-4" style={{ color: project.color }} />
          </div>
          <div>
            <div className="text-[8px] uppercase tracking-widest font-mono mb-0.5"
              style={{ color: project.color }}>{project.category}</div>
            <h4 className="text-xs font-bold font-display text-white leading-tight">{project.name}</h4>
          </div>
        </div>
        <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-0.5">
          <span>Explore</span>
          <ChevronRight className="w-2.5 h-2.5" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Experience Block ────────────────────────────────────────────────────────
function ExperienceBlock({
  exp,
  index,
  isLast,
  onOpenProject,
}: {
  exp: (typeof EXPERIENCES)[0];
  index: number;
  isLast: boolean;
  onOpenProject: (p: (typeof EXPERIENCES)[0]["projects"][0]) => void;
}) {
  const ref = useRef(null);
  const inView = true; // Simpler view rendering
  const [expanded, setExpanded] = useState(index === 0); // Expand first card by default

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      {/* Left side content */}
      <div className={`${isLeft ? "pr-8" : ""} flex justify-end md:text-right`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[440px]"
          >
            <CompanyCard exp={exp} expanded={expanded} onToggle={() => setExpanded(!expanded)} onOpenProject={onOpenProject} inView={inView} />
          </motion.div>
        )}
      </div>

      {/* Center timeline connector */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:flex flex-col items-center z-10">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 border-2 relative"
          style={{
            background: `radial-gradient(circle, ${exp.color}33, #050505)`,
            borderColor: exp.color,
            boxShadow: `0 0 20px ${exp.color}55, 0 0 40px ${exp.color}22`,
          }}
        >
          <exp.icon className="w-5 h-5" style={{ color: exp.color }} />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: exp.color }} />
        </motion.div>

        {/* Spine line down */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="w-0.5 flex-1 min-h-[80px] origin-top mt-2"
            style={{ background: `linear-gradient(180deg, ${exp.color}80, ${exp.color}10)` }}
          />
        )}
      </div>

      {/* Right side content */}
      <div className={`${!isLeft ? "pl-8" : ""} flex justify-start`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[440px]"
          >
            <CompanyCard exp={exp} expanded={expanded} onToggle={() => setExpanded(!expanded)} onOpenProject={onOpenProject} inView={inView} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Company card ─────────────────────────────────────────────────────────────
function CompanyCard({
  exp,
  expanded,
  onToggle,
  onOpenProject,
  inView,
}: {
  exp: (typeof EXPERIENCES)[0];
  expanded: boolean;
  onToggle: () => void;
  onOpenProject: (p: (typeof EXPERIENCES)[0]["projects"][0]) => void;
  inView: boolean;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-500"
      style={{
        borderColor: expanded ? `${exp.color}50` : "rgba(255,255,255,0.06)",
        background: expanded
          ? `linear-gradient(135deg, rgba(8,8,12,0.98), ${exp.color}0c)`
          : "rgba(255,255,255,0.02)",
        boxShadow: expanded ? `0 0 40px ${exp.color}18` : "none",
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4 group cursor-pointer"
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}33` }}>
          <exp.icon className="w-5 h-5" style={{ color: exp.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: `${exp.color}20`, color: exp.color }}>
              {exp.duration}
            </span>
            <span className="text-[9px] text-white/35 font-mono flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> {exp.location}
            </span>
          </div>
          <h3 className="text-base font-bold font-display text-white leading-tight">{exp.company}</h3>
          <p className="text-[11px] font-mono mt-0.5" style={{ color: `${exp.color}bb` }}>{exp.role}</p>
          <p className="text-[9px] text-white/35 font-mono flex items-center gap-1 mt-1">
            <Calendar className="w-2.5 h-2.5" /> {exp.period}
          </p>
        </div>
        <div className="mt-1 shrink-0 text-white/30 group-hover:text-white/60 transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 space-y-5">
              {/* Description */}
              <p className="text-[12px] text-white/65 leading-relaxed font-sans border-t border-white/5 pt-4">
                {exp.description}
              </p>

              {/* Animated metrics */}
              <div className="grid grid-cols-2 gap-2">
                {exp.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl p-3 border border-white/5 text-center"
                    style={{ background: `${exp.color}0a` }}
                  >
                    <div className="text-xl font-extrabold font-display" style={{ color: exp.color }}>
                      <Counter value={m.value} suffix={m.suffix} active={inView && expanded} />
                    </div>
                    <div className="text-[8px] uppercase tracking-widest text-white/35 font-mono mt-0.5">{m.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tech chips */}
              <div>
                <div className="text-[8px] uppercase tracking-widest text-white/25 font-mono mb-2">Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.chips.map((c) => <TechChip key={c} label={c} color={exp.color} />)}
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="text-[8px] uppercase tracking-widest text-white/25 font-mono mb-3">Project Highlights</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {exp.projects.map((p) => (
                    <ProjectCard key={p.id} project={p} onOpen={() => onOpenProject(p)} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scrolling energy line ────────────────────────────────────────────────────
function EnergyLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none overflow-hidden">
      {/* Base line */}
      <div className="absolute inset-0 bg-white/5" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY, originY: 0, background: "linear-gradient(180deg, #4F8CFF, #6FE7FF80, #4F8CFF20)" }}
        className="absolute inset-0"
      />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Timeline() {
  const [openProject, setOpenProject] = useState<(typeof EXPERIENCES)[0]["projects"][0] | null>(null);

  return (
    <>
      <div className="relative w-full">
        {/* Central glowing energy spine */}
        <EnergyLine />

        {/* Top cap */}
        <div className="flex justify-center mb-2">
          <div className="w-3 h-3 rounded-full bg-[#4F8CFF] shadow-[0_0_12px_#4F8CFF]" />
        </div>

        {/* Experience blocks */}
        <div className="flex flex-col gap-10">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceBlock
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
              onOpenProject={setOpenProject}
            />
          ))}
        </div>

        {/* Bottom cap */}
        <div className="flex justify-center mt-6">
          <div className="w-3 h-3 rounded-full border-2 border-[#4F8CFF80] shadow-[0_0_8px_#4F8CFF44]" />
        </div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  );
}
