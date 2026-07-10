"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Cpu,
  Layers,
  Wrench,
  Globe,
  Mail,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CanvasBackground from "@/components/CanvasBackground";
import SmoothScroll from "@/components/SmoothScroll";
import HeroScene from "@/components/HeroScene";
import GalaxyScene from "@/components/GalaxyScene";
import Timeline from "@/components/Timeline";
import ProjectModal, { Project } from "@/components/ProjectModal";
import ContactForm from "@/components/ContactForm";
import CustomCursor from "@/components/CustomCursor";
import SoundManager from "@/components/SoundManager";
import ConsoleLogs from "@/components/ConsoleLogs";
import SystemMetrics from "@/components/SystemMetrics";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Main Street Media",
      category: "Media Platform",
      shortDesc: "In-App Purchases, Push Notifications, Deep Linking, and Premium Content",
      techStack: ["Flutter", "Dart", "StoreKit", "FCM", "GoRouter", "Bloc"],
      architecture: "Feature-driven Clean Architecture with Bloc state routing.",
      challenges: "Synchronizing subscription state dynamically with Apple StoreKit & Google Play billing services under varying network coverage.",
      achievements: "Built real-time dynamic paywalls causing a 25% conversion increase; integrated push notifications which boosted daily activity by 35%.",
      details: "A premium entertainment app providing real-time streaming videos, exclusive creator portals, and automated offline media downloads.",
      mockupBg: "from-blue-600 to-indigo-900"
    },
    {
      title: "Medentum Diagnostick",
      category: "Healthcare IoT",
      shortDesc: "BLE Medical Devices, OpenAI Disease Analysis, and Camera Integration",
      techStack: ["Flutter", "BLE/GATT", "OpenAI API", "Riverpod", "Camera API"],
      architecture: "Layered Domain/Repository pattern with Riverpod provider hooks.",
      challenges: "Handling raw byte packets from medical monitoring hardware without dropping values or freezing the active UI thread.",
      achievements: "Achieved seamless live GATT data streaming; built local scanning flows with instant AI diagnostics powered by GPT models.",
      details: "A medical companion application designed to connect securely to patient monitors, collect vital signs, and provide instant insights.",
      mockupBg: "from-emerald-600 to-teal-900"
    },
    {
      title: "Zembora",
      category: "Ride Sharing",
      shortDesc: "Google Maps, Socket.IO, and AI Trip Assistance",
      techStack: ["Flutter", "Socket.IO", "Google Maps SDK", "Node.js", "Express"],
      architecture: "Event-driven real-time synchronized architecture.",
      challenges: "Synchronizing driver and rider states instantly across weak cell towers; resolving accurate route matches using complex waypoints.",
      achievements: "Scaled Socket.IO server channels; engineered route prediction reducing average rider pick-up times by 18%.",
      details: "A comprehensive ride-sharing ecosystem featuring live maps, automated fare splits, driver match scoring, and route navigation.",
      mockupBg: "from-purple-700 to-indigo-950"
    },
    {
      title: "Orra",
      category: "Dating App",
      shortDesc: "Real-time Chat, Swipe Matching, and Media Sharing",
      techStack: ["Flutter", "Firebase Auth", "Socket.IO", "Cubit", "WebRTC"],
      architecture: "Reactive Cubit state machines with local persistence.",
      challenges: "Preventing lag on gesture-driven cards rendering dynamic image arrays; optimizing video call pipeline codecs.",
      achievements: "Created custom swiping stack view rendering at 60 FPS; implemented audio/video peer connections via WebRTC.",
      details: "A premium dating app designed for instantaneous matching, text messaging, media sharing, and high-fidelity video chat.",
      mockupBg: "from-pink-600 to-rose-950"
    },
    {
      title: "Sathee",
      category: "Education Platform",
      shortDesc: "100K+ Downloads and Performance Optimization",
      techStack: ["Flutter", "Riverpod", "SQLite", "Firebase", "WebViews"],
      architecture: "Domain-driven design with decoupled local database caching.",
      challenges: "Rendering large analytical charts and tables efficiently on older budget Android devices with low memory.",
      achievements: "Scaled the application past 100,000 organic downloads; improved overall frame render time by 42%.",
      details: "An outreach educational application delivering course content, automated assessments, mock exams, and video lessons.",
      mockupBg: "from-cyan-600 to-sky-900"
    },
    {
      title: "Prutor Games",
      category: "Gamified Learning",
      shortDesc: "40+ Educational Games built with Supabase",
      techStack: ["Flutter", "Custom Canvas", "Supabase", "AudioPlayers"],
      architecture: "Component-based micro-game engine framework.",
      challenges: "Standardizing inputs, states, and scores across 40 distinct games to log leaderboard metrics in real-time.",
      achievements: "Delivered 40+ interactive games within a single responsive app wrapper; achieved live scoreboard updates under 100ms.",
      details: "An educational gaming portal created to teach programming, mathematics, and logic concepts via bite-sized interactive games.",
      mockupBg: "from-amber-600 to-orange-900"
    },
    {
      title: "Trop C'est Trop",
      category: "NGO Platform",
      shortDesc: "Community Feed, Notifications, and Firebase Integration",
      techStack: ["Flutter", "Firestore", "Firebase Cloud Functions", "FCM"],
      architecture: "Model-View-Controller (MVC) architecture with event publishers.",
      challenges: "Synchronizing media feeds containing images and videos on extremely low bandwidth cellular connections.",
      achievements: "Created progressive image loader and media optimizer; enabled real-time global notification feed for critical NGO updates.",
      details: "A social outreach utility app for a prominent NGO, letting members read feeds, join campaigns, and communicate in real-time.",
      mockupBg: "from-red-600 to-zinc-900"
    }
  ];

  return (
    <div className="relative min-h-screen z-10">
      <CustomCursor />
      <CanvasBackground />
      <SmoothScroll />

      {/* Header Glass Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-accent to-secondary-accent flex items-center justify-center font-bold font-display text-black text-sm">
              RM
            </div>
            <span className="font-display font-semibold tracking-wide text-sm">rajmishra.dev</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-white/60">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Galaxy</a>
            <a href="#timeline" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <SoundManager />
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 rounded-full border border-white/10 hover:border-primary-accent/40 text-xs font-semibold hover:bg-white/5 transition-all text-white/90"
            >
              Let&apos;s Connect
            </motion.a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center py-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
          
          {/* Left Column: Intro + Terminal */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-accent/10 border border-primary-accent/25 text-[10px] font-semibold text-primary-accent uppercase tracking-wider"
              >
                <Sparkles className="w-3 h-3" />
                <span>Available for Enterprise Roles</span>
              </motion.div>
              
              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-extrabold font-display leading-none tracking-tight text-gradient-primary"
                >
                  Raj Mishra
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-xl font-medium font-display text-gradient-secondary"
                >
                  Flutter Architect & Engineer
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-white/70 leading-relaxed font-sans"
              >
                Building high-scale mobile products powered by AI, BLE/IoT integration, and real-time state synchronizations.
              </motion.p>

              <motion.div className="flex flex-wrap gap-2.5 pt-1">
                <a href="#projects" className="px-4 py-2 rounded bg-primary-accent hover:bg-primary-accent/90 text-white font-semibold text-xs transition-all flex items-center gap-1">
                  <span>Showcase</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <a href="#contact" className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all">
                  <span>Connect</span>
                </a>
              </motion.div>
            </div>

            {/* Console Log Ticker */}
            <ConsoleLogs />
          </div>

          {/* Middle Column: Large 3D Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 w-full h-[400px] lg:h-auto min-h-[450px] flex items-center justify-center relative bg-white/[0.01] rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-mono text-[8px] uppercase tracking-wider text-white/30 z-20">
              3D VIEWPORT // EXPLODE ON SCROLL
            </div>
            <HeroScene />
          </motion.div>

          {/* Right Column: Gauges + Checklist */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <SystemMetrics />
            
            {/* Core Commitments glass card */}
            <div className="glass-card p-4 rounded-xl border border-white/5 font-mono text-[9px] text-white/40 space-y-2.5">
              <span className="text-[8px] uppercase tracking-wider text-white/30 font-bold block border-b border-white/5 pb-1">Architecture Promises</span>
              <div className="space-y-1.5 text-white/80">
                <div className="flex justify-between">
                  <span>Clean Architecture</span>
                  <span className="text-primary-accent">[VERIFIED]</span>
                </div>
                <div className="flex justify-between">
                  <span>Render Target Rate</span>
                  <span className="text-secondary-accent">[60 FPS]</span>
                </div>
                <div className="flex justify-between">
                  <span>State Management</span>
                  <span className="text-white/60">[BLOC/RIVERPOD]</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage Metric</span>
                  <span className="text-white/60">[85%+]</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/[0.01] border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "20+", label: "Apps Built" },
            { value: "110K+", label: "App Downloads" },
            { value: "2+ Years", label: "Experience" },
            { value: "7+", label: "Industries Served" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold font-display text-gradient-secondary mb-1">{stat.value}</h3>
              <p className="text-xs uppercase tracking-widest text-white/50 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Storytelling About Section */}
      <section id="about" className="py-24 px-6 relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 sticky top-24">
            <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">The Journey</span>
            <h2 className="text-4xl font-bold font-display text-gradient-primary leading-tight mb-4">
              Crafting Mobile Excellence
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Raj Mishra is a dedicated developer passionate about creating premium native mobile products, merging beautiful design principles with high-performance Flutter runtimes.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {[
              {
                title: "How it Started",
                desc: "I started building mobile apps out of curiosity for device hardware interfaces, immediately falling in love with Flutter's reactive model and rapid UI engine. Over time, I scaled my skills to support large corporate codebases."
              },
              {
                title: "Diverse Domains",
                desc: "Throughout my career, I've worked across healthcare (BLE/IoT systems), education (gamification tools), ride-sharing (Uber clones), dating apps (live communication), AI interfaces, and social platforms."
              },
              {
                title: "The Architecture Obsession",
                desc: "My philosophy is that great software is maintainable software. I implement Strict Clean Architecture, Bloc/Riverpod patterns, and emphasize automated unit/widget testing to prevent regression cycles."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card p-6 rounded-xl border border-white/5"
              >
                <h4 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
                  <span className="text-primary-accent text-sm">0{i+1}.</span>
                  {card.title}
                </h4>
                <p className="text-sm text-white/75 leading-relaxed font-sans">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Orbiting Galaxy Section */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">Interactive Visualization</span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient-primary mb-4">
              Galaxy of Technologies
            </h2>
            <p className="text-sm text-white/60 font-sans">
              Hover over any technology orbiting the Flutter core to see exactly where and how it was implemented in production.
            </p>
          </div>

          <div className="w-full bg-zinc-950/20 rounded-2xl border border-white/5 overflow-hidden">
            <GalaxyScene />
          </div>
        </div>
      </section>

      {/* Skills Grid Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Mobile Core",
              icon: Smartphone,
              items: ["Flutter", "Dart", "Android (Java/Kotlin)", "iOS (Swift)"]
            },
            {
              title: "State Management",
              icon: Layers,
              items: ["Riverpod", "Bloc", "Cubit", "GetX"]
            },
            {
              title: "Backend & Cloud",
              icon: Globe,
              items: ["Firebase Suite", "Supabase", "Node.js", "MongoDB"]
            },
            {
              title: "APIs & Core Tools",
              icon: Wrench,
              items: ["REST / GraphQL", "Socket.IO / WebSockets", "BLE / GATT", "Git / GitHub / CI-CD"]
            }
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary-accent/10 border border-primary-accent/25 flex items-center justify-center mb-4">
                  <cat.icon className="w-5 h-5 text-primary-accent" />
                </div>
                <h4 className="text-lg font-bold font-display text-white mb-4">{cat.title}</h4>
                <ul className="space-y-2">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="text-xs text-white/60 font-sans flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-secondary-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="timeline" className="py-20 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">Professional Timeline</span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient-primary">
              Where Value Meets Code
            </h2>
          </div>

          <Timeline />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">Case Studies</span>
          <h2 className="text-4xl font-bold font-display text-gradient-primary mb-4">
            Production Products
          </h2>
          <p className="text-sm text-white/60 font-sans">
            Every app represents a journey solving real user friction with custom state design, layout optimizations, and reliable pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-xl p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Simulated visual thumbnail preview */}
                <div className={`w-full h-40 rounded-lg bg-gradient-to-br ${project.mockupBg} mb-4 relative overflow-hidden flex items-center justify-center border border-white/5`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  <Smartphone className="w-10 h-10 text-white/70 group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-primary-accent font-bold">{project.category}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-primary-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-xs text-white/60 leading-relaxed font-sans mb-4">
                  {project.shortDesc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-auto">
                {project.techStack.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Metrics Counter Section */}
      <section className="py-20 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { count: "20+", label: "Apps Built" },
            { count: "110K+", label: "Downloads" },
            { count: "7+", label: "Industries" },
            { count: "1000+", label: "Git Commits" },
            { count: "Infinite ☕", label: "Cups of Coffee" }
          ].map((metric, i) => (
            <div key={i} className="p-4 glass-card rounded-lg">
              <h4 className="text-3xl font-extrabold font-display text-gradient-secondary mb-1">{metric.count}</h4>
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">Transmission</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-gradient-primary mb-4">
                Let&apos;s Create Something Epic
              </h2>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                Whether you are looking to hire a full-time Flutter engineer, architect a high-scale IoT product, or build a scalable mobile backend, I would love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:rajmishra.dev@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-accent/40 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-accent/10 flex items-center justify-center text-primary-accent group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</span>
                  <span className="text-sm font-semibold text-white">rajmishra.dev@gmail.com</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/rajmishra-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-accent/40 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-accent/10 flex items-center justify-center text-primary-accent group-hover:scale-105 transition-transform">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">LinkedIn Connect</span>
                  <span className="text-sm font-semibold text-white">linkedin.com/in/rajmishra-dev</span>
                </div>
              </a>

              <a
                href="https://github.com/rajmishra-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-accent/40 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-accent/10 flex items-center justify-center text-primary-accent group-hover:scale-105 transition-transform">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">GitHub Codebase</span>
                  <span className="text-sm font-semibold text-white">github.com/rajmishra-dev</span>
                </div>
              </a>
            </div>

            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              Raj Mishra &copy; 2026. Made with Next.js, Framer & Passion.
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-center border border-white/10">
            <h3 className="text-xl font-bold font-display text-white mb-6">Send a Secure Message</h3>
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Cinematic Modal details display */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
