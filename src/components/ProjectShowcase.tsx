"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Bluetooth,
  Globe,
  Layers,
  Zap,
  Brain,
  Smartphone,
  Shield,
  Server,
  ArrowRight,
} from "lucide-react";

// ─── Full project data ─────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "mainstreet",
    title: "Main Street Media",
    tagline: "Premium media streaming with live paywalls",
    category: "Media Platform",
    industry: "Entertainment",
    status: "Live on App Store & Google Play",
    color: "#0EA5E9",
    bg: "from-sky-950 via-blue-950 to-zinc-950",
    accent: "from-sky-500 to-blue-600",
    icon: Layers,
    techStack: ["Flutter", "Dart", "StoreKit", "FCM", "GoRouter", "Bloc", "Firebase"],
    shortDesc: "In-App Purchase subscriptions, push notifications, and deep linking.",
    details: "A premium entertainment app providing real-time streaming videos, creator portals, and automated offline media downloads for thousands of active subscribers.",
    architecture: "Feature-driven Clean Architecture with Bloc state routing and modular packages.",
    challenges: "Synchronizing subscription state dynamically with Apple StoreKit & Google Play billing services under varying network coverage.",
    achievements: "Implemented In-App Purchase flows for premium content subscriptions, streamlining the purchase journey and increasing revenue conversion.",
    metrics: [{ label: "Revenue Lift", value: "+25%" }, { label: "DAU Boost", value: "+35%" }, { label: "Rating", value: "4.8★" }],
    platforms: ["iOS", "Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.mainstreetmedia.android",
    appStore: "https://apps.apple.com/us/app/main-street-media/id6758084000",
  },
  {
    id: "medentum",
    title: "Medentum Diagnostick",
    tagline: "Real-time medical IoT with AI diagnostics",
    category: "Healthcare · IoT",
    industry: "Healthcare",
    status: "Production · Clinical Use",
    color: "#10A37F",
    bg: "from-emerald-950 via-teal-950 to-zinc-950",
    accent: "from-emerald-500 to-teal-600",
    icon: Bluetooth,
    techStack: ["Flutter", "BLE/GATT", "OpenAI API", "Riverpod", "Camera API", "Dart"],
    shortDesc: "BLE heart-rate monitoring and OpenAI-powered diagnostics.",
    details: "A medical companion application designed to connect securely to patient monitors, collect vital signs, and provide instant AI-powered insights using GPT-4.",
    architecture: "Layered Domain/Repository pattern with Riverpod provider hooks and reactive BLE streams.",
    challenges: "Handling raw byte packets from medical monitoring hardware without dropping values or freezing the active UI thread.",
    achievements: "Built a BLE integration layer for real-time heart-rate monitoring from paired IoT devices and integrated OpenAI APIs for diagnostics.",
    metrics: [{ label: "BLE Latency", value: "<50ms" }, { label: "Devices", value: "5+" }, { label: "Accuracy", value: "98%" }],
    platforms: ["iOS", "Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.medentum.diagnostick",
    appStore: "https://apps.apple.com/us/app/diagnostick/id6499124629",
  },
  {
    id: "zembora",
    title: "Zembora",
    tagline: "Full ride-sharing ecosystem with live routing",
    category: "Ride Sharing",
    industry: "Transport",
    status: "Active Development",
    color: "#8B5CF6",
    bg: "from-violet-950 via-purple-950 to-zinc-950",
    accent: "from-violet-500 to-purple-600",
    icon: Globe,
    techStack: ["Flutter", "Socket.IO", "Google Maps SDK", "Node.js", "Express", "MongoDB"],
    shortDesc: "Google Maps SDK for real-time location tracking and ETA mapping.",
    details: "A comprehensive ride-sharing ecosystem featuring live maps, automated fare splits, driver match scoring, and route navigation.",
    architecture: "Event-driven real-time synchronized architecture with Socket.IO and Node.js REST APIs.",
    challenges: "Synchronizing driver and rider states instantly across weak cell towers; resolving route matches using complex waypoints.",
    achievements: "Scaled Socket.IO server channels; engineered route prediction reducing average rider pick-up times by 18%.",
    metrics: [{ label: "Pickup Time", value: "-18%" }, { label: "Sync Latency", value: "<150ms" }, { label: "Protocols", value: "Socket.IO" }],
    platforms: ["iOS", "Android"],
    playStore: "",
    appStore: "",
  },
  {
    id: "orra",
    title: "Orra",
    tagline: "Premium dating with real-time swipe matching",
    category: "Dating App",
    industry: "Social",
    status: "Production · Completed",
    color: "#F43F5E",
    bg: "from-rose-950 via-pink-950 to-zinc-950",
    accent: "from-rose-500 to-pink-600",
    icon: Smartphone,
    techStack: ["Flutter", "Firebase Auth", "Socket.IO", "Cubit", "WebRTC", "Firestore"],
    shortDesc: "Real-time chat, swipe matching, and low-latency WebRTC video calls.",
    details: "A premium dating app designed for instantaneous matching, text messaging, media sharing, and high-fidelity video chat with gesture-driven UX.",
    architecture: "Reactive Cubit state machines with local persistence and optimistic UI updates.",
    challenges: "Preventing lag on gesture-driven swipe cards rendering dynamic image arrays; optimizing video call pipeline codecs.",
    achievements: "Created custom swiping stack view rendering at 60 FPS; implemented audio/video peer connections via WebRTC.",
    metrics: [{ label: "Swipe FPS", value: "60" }, { label: "Chat Latency", value: "<80ms" }, { label: "WebRTC", value: "P2P" }],
    platforms: ["iOS", "Android"],
    playStore: "",
    appStore: "",
  },
  {
    id: "sathee",
    title: "Sathee Education App",
    tagline: "100K+ learners · offline-first education",
    category: "Education Platform",
    industry: "Education",
    status: "100K+ Downloads",
    color: "#06B6D4",
    bg: "from-cyan-950 via-sky-950 to-zinc-950",
    accent: "from-cyan-500 to-sky-600",
    icon: Brain,
    techStack: ["Flutter", "Riverpod", "SQLite", "Firebase", "WebViews", "Dart"],
    shortDesc: "Adaptive content delivery, assessments, and offline synchronization.",
    details: "An outreach educational application delivering course content, automated assessments, mock exams, and video lessons to over 100,000 students.",
    architecture: "Domain-driven design with decoupled local SQLite caching and offline-first sync.",
    challenges: "Rendering large analytical charts and tables efficiently on older budget Android devices with low memory.",
    achievements: "Optimised app startup time and scroll performance through widget tree restructuring, lazy loading, and efficient state management, contributing to a 100,000+ download milestone.",
    metrics: [{ label: "Downloads", value: "100K+" }, { label: "Startup Time", value: "-35%" }, { label: "Rating", value: "4.7★" }],
    platforms: ["iOS", "Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.sathee_app",
    appStore: "https://apps.apple.com/us/app/sathee/id6470142920",
  },
  {
    id: "satheekendra",
    title: "Sathee Kendra",
    tagline: "Comprehensive school management platform",
    category: "School Management",
    industry: "EdTech",
    status: "Live on App Store & Google Play",
    color: "#3B82F6",
    bg: "from-blue-950 via-indigo-950 to-zinc-950",
    accent: "from-blue-500 to-indigo-600",
    icon: Server,
    techStack: ["Flutter", "Riverpod", "REST APIs", "FCM", "Dart"],
    shortDesc: "Role-based dashboards, content workflows, and smart quiz engines.",
    details: "A comprehensive school management platform with role-based dashboards for administrators, teachers, and students, supporting content and operational workflows.",
    architecture: "Decoupled Riverpod architecture with repositories and data-source abstraction layers.",
    challenges: "Managing highly complex permissions and states across multiple user roles concurrently.",
    achievements: "Built a smart quiz engine hosting 1,800+ quizzes with adaptive difficulty, result analytics, and leaderboards.",
    metrics: [{ label: "Quizzes", value: "1.8K+" }, { label: "Roles", value: "3 Active" }, { label: "Rating", value: "4.9★" }],
    platforms: ["iOS", "Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.satheekendra",
    appStore: "https://apps.apple.com/us/app/sathee-kendra/id6749477967",
  },
  {
    id: "prutor",
    title: "Prutor Games",
    tagline: "40+ educational games · live leaderboards",
    category: "Gamified Learning",
    industry: "Education · Gaming",
    status: "Live on Google Play",
    color: "#F59E0B",
    bg: "from-amber-950 via-orange-950 to-zinc-950",
    accent: "from-amber-500 to-orange-600",
    icon: Zap,
    techStack: ["Flutter", "Custom Canvas", "Supabase", "AudioPlayers", "Dart"],
    shortDesc: "Vocabulary games leveraging space repetition and scoreboards.",
    details: "An educational gaming portal created to teach programming, mathematics, and logic concepts via bite-sized interactive games with live leaderboards.",
    architecture: "Component-based micro-game engine framework with shared state and Supabase realtime sync.",
    challenges: "Standardizing inputs, states, and scores across 40 distinct game types to log leaderboard metrics in real-time.",
    achievements: "Developed 40+ interactive vocabulary games using Flutter and Supabase, leveraging spaced repetition to improve language retention.",
    metrics: [{ label: "Games Built", value: "40+" }, { label: "Leaderboard", value: "<100ms" }, { label: "Platform", value: "Android" }],
    platforms: ["Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.prutorgames.sathee_elevated",
    appStore: "",
  },
  {
    id: "smartgames",
    title: "Smart Games",
    tagline: "Cognitive educational gaming for youths",
    category: "Gamified Learning",
    industry: "Cognitive EdTech",
    status: "10K+ Downloads",
    color: "#10B981",
    bg: "from-emerald-950 via-green-950 to-zinc-950",
    accent: "from-emerald-500 to-green-600",
    icon: Brain,
    techStack: ["Flutter", "Dart", "Supabase", "AudioPlayers", "FCM"],
    shortDesc: "Cognitive challenges combined with educational content.",
    details: "Gamified learning experiences combining cognitive challenges with educational content, built to boost student retention.",
    architecture: "Modular block architecture with local SQLite persistence.",
    challenges: "Designing responsive layouts for highly interactive canvas elements across phone and tablet sizes.",
    achievements: "Engineered gamified learning experiences contributing to a 10,000+ download count and strong user feedback ratings.",
    metrics: [{ label: "Downloads", value: "10K+" }, { label: "Rating", value: "4.9★" }, { label: "Framework", value: "Flutter" }],
    platforms: ["iOS", "Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.prutor.smart_games",
    appStore: "https://apps.apple.com/us/app/smart-games/id6746445090",
  },
  {
    id: "trop",
    title: "Trop C'est Trop",
    tagline: "NGO social platform · global reach",
    category: "NGO Platform",
    industry: "Social Impact",
    status: "Live on App Store & Google Play",
    color: "#EF4444",
    bg: "from-red-950 via-rose-950 to-zinc-950",
    accent: "from-red-500 to-rose-600",
    icon: Shield,
    techStack: ["Flutter", "Firestore", "Firebase Cloud Functions", "FCM", "Dart"],
    shortDesc: "Community feed, media uploads, and in-app notifications.",
    details: "A social outreach utility app for a prominent NGO, letting members read feeds, join campaigns, and communicate in real-time across global chapters.",
    architecture: "Model-View-Controller (MVC) architecture with Firestore real-time listeners and Firebase Cloud Function triggers.",
    challenges: "Synchronizing media feeds containing images and videos on extremely low bandwidth cellular connections in developing regions.",
    achievements: "Independently managed the end-to-end development lifecycle from requirements gathering through App Store and Google Play submission and review.",
    metrics: [{ label: "Feed Latency", value: "Real-time" }, { label: "Push", value: "FCM" }, { label: "Reach", value: "Global" }],
    platforms: ["iOS", "Android"],
    playStore: "https://play.google.com/store/apps/details?id=com.trop.cest",
    appStore: "https://apps.apple.com/us/app/trop-cest-trop/id6757865489",
  },
];

// ─── CSS iPhone Mockup ─────────────────────────────────────────────────────────
function PhoneMockup({ project, tilt = false }: { project: typeof PROJECTS[0]; tilt?: boolean }) {
  return (
    <div
      className="relative select-none"
      style={{
        transform: tilt ? "perspective(900px) rotateY(-12deg) rotateX(4deg)" : "perspective(900px) rotateY(0deg)",
        transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Phone outer shell */}
      <div
        className="relative rounded-[44px] shadow-2xl"
        style={{
          width: 220,
          height: 450,
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #0d0d0d 100%)",
          boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px ${project.color}33`,
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 rounded-l-sm bg-zinc-700" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-8 rounded-l-sm bg-zinc-700" />
        <div className="absolute -left-[3px] top-48 w-[3px] h-8 rounded-l-sm bg-zinc-700" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-14 rounded-r-sm bg-zinc-700" />

        {/* Camera module back (subtle) */}
        <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1 p-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700" />
            ))}
          </div>
        </div>

        {/* Screen bezel */}
        <div
          className="absolute inset-[6px] rounded-[38px] overflow-hidden"
          style={{ background: "#050505" }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-between px-2">
            <div className="w-2 h-2 rounded-full bg-blue-500/80" />
            <div className="w-4 h-1 bg-zinc-700 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-zinc-800" />
          </div>

          {/* App screen content */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.bg} flex flex-col`}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-10 pb-1 shrink-0">
              <span className="text-[8px] text-white/60 font-mono">9:41</span>
              <div className="flex gap-0.5 items-center">
                <div className="flex gap-[2px]">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-0.5 rounded-sm bg-white/60" style={{ height: 4 + i * 2 }} />
                  ))}
                </div>
                <div className="w-3.5 h-2 rounded-sm border border-white/40 ml-1 relative">
                  <div className="absolute inset-[1px] bg-white/70 rounded-[1px] right-[3px]" />
                  <div className="absolute -right-[2px] top-[2px] w-0.5 h-[6px] bg-white/40 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="px-5 pt-2 pb-3">
              <div className="text-[8px] text-white/40 uppercase tracking-widest font-mono mb-0.5">{project.category}</div>
              <div className="text-[13px] font-extrabold text-white font-display leading-tight">{project.title}</div>
            </div>

            {/* Fake app content */}
            <div className="flex-1 px-4 space-y-2 overflow-hidden">
              {/* Hero card */}
              <div className="rounded-2xl p-3 border border-white/8"
                style={{ background: `${project.color}18` }}>
                <div className="text-[7px] text-white/40 font-mono uppercase tracking-widest mb-1">Featured</div>
                <div className="h-16 rounded-xl bg-gradient-to-br"
                  style={{ background: `linear-gradient(135deg, ${project.color}33, ${project.color}08)` }}>
                  <div className="h-full flex items-center justify-center">
                    <project.icon className="w-6 h-6 opacity-60" style={{ color: project.color }} />
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-1.5">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl p-2 border border-white/5 text-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="text-[9px] font-bold" style={{ color: project.color }}>{m.value}</div>
                    <div className="text-[6px] text-white/30 font-mono uppercase tracking-wider mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Content rows */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 rounded-xl border border-white/5 flex items-center px-2.5 gap-2"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="w-5 h-5 rounded-lg shrink-0"
                    style={{ background: `${project.color}22` }} />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 rounded-full bg-white/15" style={{ width: `${70 - i * 10}%` }} />
                    <div className="h-1 rounded-full bg-white/8" style={{ width: `${50 - i * 8}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom tab bar */}
            <div className="h-14 border-t border-white/5 flex items-center justify-around px-6 shrink-0 mt-2"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <div className="w-4 h-4 rounded"
                    style={{ background: i === 0 ? `${project.color}44` : "rgba(255,255,255,0.1)" }} />
                  <div className="w-6 h-0.5 rounded-full"
                    style={{ background: i === 0 ? project.color : "rgba(255,255,255,0.15)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glass reflection overlay */}
        <div className="absolute inset-[6px] rounded-[38px] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }} />
      </div>

      {/* Ambient glow below */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full blur-xl opacity-60"
        style={{ background: project.color }} />
    </div>
  );
}

// ─── Full-screen Case Study ────────────────────────────────────────────────────
function CaseStudy({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[300] overflow-y-auto"
      style={{ background: "#050505" }}
    >
      {/* Hero banner */}
      <div className={`relative w-full min-h-[45vh] bg-gradient-to-br ${project.bg} flex flex-col justify-end overflow-hidden`}>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />

        {/* Ambient light */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: project.color }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 glass-icon rounded-full flex items-center justify-center transition-all z-10 cursor-pointer"
        >
          <X className="w-4 h-4 text-white/80" />
        </button>

        {/* Badge + heading */}
        <div className="relative z-10 px-8 md:px-16 pb-10 pt-16 max-w-5xl">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border"
              style={{ color: project.color, borderColor: `${project.color}55`, background: `${project.color}18` }}>
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{project.status}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display text-white mb-3 leading-tight">{project.title}</h1>
          <p className="text-lg text-white/60 font-sans max-w-2xl">{project.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-12 space-y-12">

        {/* Top metrics */}
        <div className="grid grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass-card rounded-2xl p-5 text-center"
              style={{ background: `${project.color}0a` }}>
              <div className="text-3xl font-extrabold font-display mb-1" style={{ color: project.color }}>{m.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Overview */}
          <div className="glass-card rounded-2xl p-6">
            <div className="text-[9px] uppercase tracking-widest font-mono mb-3" style={{ color: project.color }}>Overview</div>
            <p className="text-sm text-white/75 leading-relaxed font-sans">{project.details}</p>
          </div>

          {/* Architecture */}
          <div className="glass-card rounded-2xl p-6">
            <div className="text-[9px] uppercase tracking-widest font-mono mb-3" style={{ color: project.color }}>Architecture</div>
            <p className="text-sm text-white/75 leading-relaxed font-sans">{project.architecture}</p>
          </div>

          {/* Engineering Challenge */}
          <div className="glass-card rounded-2xl p-6">
            <div className="text-[9px] uppercase tracking-widest font-mono text-amber-400 mb-3">Engineering Challenge</div>
            <p className="text-sm text-white/75 leading-relaxed font-sans">{project.challenges}</p>
          </div>

          {/* Key Achievement */}
          <div className="glass-card rounded-2xl p-6">
            <div className="text-[9px] uppercase tracking-widest font-mono text-emerald-400 mb-3">Key Achievements</div>
            <p className="text-sm text-white/75 leading-relaxed font-sans">{project.achievements}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <div className="text-[9px] uppercase tracking-widest font-mono text-white/30 mb-4">Technology Stack</div>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((t) => (
              <span key={t}
                className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border transition-all cursor-default hover:scale-105"
                style={{ borderColor: `${project.color}55`, color: project.color, background: `${project.color}12` }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Platforms and Store Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-widest font-mono text-white/25">Available on</span>
            {project.platforms.map((p) => (
              <span key={p} className="px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 text-white/50">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {project.playStore && (
              <a
                href={project.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 border border-white/10 hover:border-primary-accent hover:bg-primary-accent/10 text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <span>Google Play</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.appStore && (
              <a
                href={project.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-1.5 border border-white/10 hover:border-secondary-accent hover:bg-secondary-accent/10 text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <span>App Store</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Thumbnail card (side cards) ───────────────────────────────────────────────
function ThumbCard({
  project,
  onClick,
  direction,
}: {
  project: typeof PROJECTS[0];
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      className="cursor-pointer rounded-2xl border overflow-hidden h-full flex flex-col items-center justify-center gap-4 p-6 transition-all"
      style={{
        borderColor: `rgba(255, 255, 255, 0.08)`,
        background: `linear-gradient(135deg, rgba(8,8,12,0.9), ${project.color}0c)`,
        boxShadow: `0 0 30px ${project.color}11`,
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}>
        <project.icon className="w-5 h-5" style={{ color: project.color }} />
      </div>
      <div className="text-center">
        <div className="text-[8px] uppercase tracking-widest font-mono mb-1" style={{ color: project.color }}>{project.category}</div>
        <div className="text-sm font-bold font-display text-white leading-tight">{project.title}</div>
      </div>
      <div className="flex items-center gap-1 text-white/30 text-[9px] font-mono uppercase tracking-wider">
        {direction === "left" ? <ChevronLeft className="w-3 h-3" /> : null}
        <span>View</span>
        {direction === "right" ? <ChevronRight className="w-3 h-3" /> : null}
      </div>
    </motion.div>
  );
}

// ─── Main showcase ─────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [caseStudy, setCaseStudy] = useState<typeof PROJECTS[0] | null>(null);
  const [hoveredPhone, setHoveredPhone] = useState(false);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const total = PROJECTS.length;
  const prev = (activeIdx - 1 + total) % total;
  const next = (activeIdx + 1) % total;
  const active = PROJECTS[activeIdx];

  const go = useCallback((idx: number) => setActiveIdx((idx + total) % total), [total]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(activeIdx - 1);
      if (e.key === "ArrowRight") go(activeIdx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, go]);

  // Wheel
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 40) go(activeIdx + 1);
      if (e.deltaX < -40) go(activeIdx - 1);
    }
  }, [activeIdx, go]);

  // Drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 50) go(activeIdx + (delta > 0 ? 1 : -1));
  };

  return (
    <>
      {/* Background ambient lighting */}
      <div
        className="relative w-full"
        style={{ isolation: "isolate" }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >

        {/* Ambient glow transitioning per project */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: -1 }}
          >
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
              style={{ background: active.color }} />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-6"
              style={{ background: active.color }} />
          </motion.div>
        </AnimatePresence>

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />

        {/* Main three-panel layout */}
        <div className="flex items-stretch gap-4 min-h-[540px]">

          {/* LEFT — prev project thumbnail */}
          <div className="hidden lg:flex w-[17%] shrink-0">
            <ThumbCard project={PROJECTS[prev]} onClick={() => go(prev)} direction="left" />
          </div>

          {/* CENTER — featured project */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="h-full rounded-2xl border overflow-hidden flex flex-col lg:flex-row"
                style={{
                  borderColor: `${active.color}40`,
                  background: `linear-gradient(135deg, rgba(6,6,10,0.98), ${active.color}0e)`,
                  boxShadow: `0 0 60px ${active.color}18`,
                }}
              >
                {/* Left: info */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  {/* Category + status */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest border"
                        style={{ color: active.color, borderColor: `${active.color}44`, background: `${active.color}14` }}>
                        {active.category}
                      </span>
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
                        {active.status}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-3xl md:text-4xl font-extrabold font-display text-white leading-tight mb-2">{active.title}</h3>
                      <p className="text-sm text-white/50 font-sans">{active.tagline}</p>
                    </div>

                    {/* Metrics */}
                    <div className="flex gap-4 flex-wrap">
                      {active.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-xl font-extrabold font-display" style={{ color: active.color }}>{m.value}</div>
                          <div className="text-[8px] text-white/30 uppercase tracking-widest font-mono">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-white/60 leading-relaxed font-sans max-w-md">{active.shortDesc}</p>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {active.techStack.map((t) => (
                        <span key={t}
                          className="px-2.5 py-1 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest border transition-all hover:scale-105 cursor-default"
                          style={{ borderColor: `${active.color}44`, color: `${active.color}cc`, background: `${active.color}10` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-3 mt-6 items-center">
                    <button
                      onClick={() => setCaseStudy(active)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-widest flex items-center gap-2 transition-all hover:brightness-110 active:scale-95 cursor-pointer"
                      style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}cc)`, color: "#fff" }}
                    >
                      View Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    {active.playStore && (
                      <a
                        href={active.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-1 border border-white/10 hover:border-primary-accent/40 text-white/60 hover:text-white transition-all cursor-pointer"
                      >
                        Play Store
                      </a>
                    )}

                    {active.appStore && (
                      <a
                        href={active.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-1 border border-white/10 hover:border-secondary-accent/40 text-white/60 hover:text-white transition-all cursor-pointer"
                      >
                        App Store
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: phone mockup */}
                <div
                  className="flex items-center justify-center p-8 shrink-0"
                  onMouseEnter={() => setHoveredPhone(true)}
                  onMouseLeave={() => setHoveredPhone(false)}
                >
                  <PhoneMockup project={active} tilt={hoveredPhone} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — next project thumbnail */}
          <div className="hidden lg:flex w-[17%] shrink-0">
            <ThumbCard project={PROJECTS[next]} onClick={() => go(next)} direction="right" />
          </div>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => go(activeIdx - 1)}
            className="w-9 h-9 glass-icon rounded-full flex items-center justify-center transition-all text-white/50 hover:text-white cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go(i)}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: i === activeIdx ? 24 : 6,
                  height: 6,
                  background: i === activeIdx ? active.color : "rgba(255,255,255,0.2)",
                  boxShadow: i === activeIdx ? `0 0 8px ${active.color}` : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(activeIdx + 1)}
            className="w-9 h-9 glass-icon rounded-full flex items-center justify-center transition-all text-white/50 hover:text-white cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="flex justify-center mt-3">
          <span className="text-[8px] font-mono uppercase tracking-widest text-white/20">
            ← → Arrow keys · Drag · Scroll
          </span>
        </div>
      </div>

      {/* Full-screen case study */}
      <AnimatePresence>
        {caseStudy && <CaseStudy project={caseStudy} onClose={() => setCaseStudy(null)} />}
      </AnimatePresence>
    </>
  );
}
