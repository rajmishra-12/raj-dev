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
  Phone,
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
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactForm from "@/components/ContactForm";
import CustomCursor from "@/components/CustomCursor";
import SoundManager from "@/components/SoundManager";
import ConsoleLogs from "@/components/ConsoleLogs";
import SystemMetrics from "@/components/SystemMetrics";

export default function Home() {

  return (
    <div className="relative w-full z-10">
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
            <a href="#about" className="hover:text-white transition-all duration-300">About</a>
            <a href="#skills" className="hover:text-white transition-all duration-300">Galaxy</a>
            <a href="#timeline" className="hover:text-white transition-all duration-300">Experience</a>
            <a href="#projects" className="hover:text-white transition-all duration-300">Projects</a>
            <a href="#contact" className="hover:text-white transition-all duration-300">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <SoundManager />
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 glass-pill text-xs font-semibold text-white/90"
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
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-frost text-[10px] font-semibold text-primary-accent uppercase tracking-wider"
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
                <a href="#contact" className="px-4 py-2 rounded-xl glass-frost text-white font-semibold text-xs flex items-center gap-1">
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
            className="lg:col-span-5 w-full h-[400px] lg:h-auto min-h-[450px] flex items-center justify-center relative glass-card overflow-hidden"
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
      <section id="about" className="py-12 px-6 relative max-w-6xl mx-auto">
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

            {/* Education & Achievements Sub-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              {/* Education */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-primary-accent font-bold">Academic Base</h4>
                
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white leading-tight">B.Tech in Artificial Intelligence</span>
                    <span className="text-[9px] font-mono text-white/40">2021 – 2025</span>
                  </div>
                  <p className="text-[10px] text-white/50">DPG Institute of Technology & Management, Gurgaon</p>
                  <div className="text-[10px] text-secondary-accent font-mono">CGPA: 8.1 / 10.0</div>
                </div>

                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white leading-tight">Class XII (Non-Medical Science)</span>
                    <span className="text-[9px] font-mono text-white/40">2019 – 2021</span>
                  </div>
                  <p className="text-[10px] text-white/50">Government Co-Ed Senior Secondary School, Dwarka Sec-21, New Delhi</p>
                  <div className="text-[10px] text-secondary-accent font-mono">Score: 90%</div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-secondary-accent font-bold font-display">Key Achievements</h4>
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-3 text-[11px] text-white/70">
                  <div className="flex items-start gap-2">
                    <span className="text-secondary-accent mt-0.5">✦</span>
                    <p>Shipped 20+ production mobile apps across iOS, Android, and Web platforms.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary-accent mt-0.5">✦</span>
                    <p>Contributed to apps with a combined user install base exceeding 110K+ downloads.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary-accent mt-0.5">✦</span>
                    <p>Developed BLE integration for real-time biometric monitoring in live production apps.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary-accent mt-0.5">✦</span>
                    <p>Built OpenAI-powered features across multiple live client projects.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary-accent mt-0.5">✦</span>
                    <p>Established scalable Riverpod & Bloc architectures to optimize development velocity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Orbiting Galaxy Section */}
      <section id="skills" className="py-8 px-6 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">Interactive Visualization</span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gradient-primary mb-4">
              Galaxy of Technologies
            </h2>
            <p className="text-sm text-white/60 font-sans">
              Hover over any technology orbiting the Flutter core to see exactly where and how it was implemented in production.
            </p>
          </div>

          <div className="w-full bg-zinc-950/20 rounded-2xl border border-white/5" style={{ overflow: 'visible' }}>
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
                <div className="w-10 h-10 glass-icon flex items-center justify-center mb-4">
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
      <section id="projects" className="py-16 px-6 max-w-7xl mx-auto relative overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2 block">Case Studies</span>
          <h2 className="text-4xl font-bold font-display text-gradient-primary mb-4">
            Production Products
          </h2>
          <p className="text-sm text-white/60 font-sans">
            Every app represents a journey solving real user friction. Explore any project to see the architecture, challenges, and business impact.
          </p>
        </div>
        <ProjectShowcase />
      </section>

      {/* Interactive Metrics Counter Section */}
      <section className="py-20 px-6 bg-white/[0.01] border-y border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { count: "20+", label: "Apps Built" },
            { count: "110K+", label: "Downloads" },
            { count: "7+", label: "Industries" },
            { count: "1000+", label: "Git Commits" },
            { count: "Infinite ☕", label: "Cups of Coffee" }
          ].map((metric, i) => (
            <div key={i} className="p-4 glass-frost rounded-lg">
              <h4 className="text-3xl font-extrabold font-display text-gradient-secondary mb-1">{metric.count}</h4>
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto min-h-[80vh] flex flex-col justify-center relative z-10 glass-deep rounded-3xl my-12">
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
                href="mailto:rajrm121212@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl glass-frost transition-all duration-300 group"
              >
                <div className="w-10 h-10 glass-icon flex items-center justify-center text-primary-accent group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</span>
                  <span className="text-sm font-semibold text-white">rajrm121212@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+919315689629"
                className="flex items-center gap-4 p-4 rounded-xl glass-frost transition-all duration-300 group"
              >
                <div className="w-10 h-10 glass-icon flex items-center justify-center text-secondary-accent group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">Phone Number</span>
                  <span className="text-sm font-semibold text-white">+91-9315689629</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/rajmishra-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl glass-frost transition-all duration-300 group"
              >
                <div className="w-10 h-10 glass-icon flex items-center justify-center text-primary-accent group-hover:scale-105 transition-transform">
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
                className="flex items-center gap-4 p-4 rounded-xl glass-frost transition-all duration-300 group"
              >
                <div className="w-10 h-10 glass-icon flex items-center justify-center text-primary-accent group-hover:scale-105 transition-transform">
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

    </div>
  );
}
