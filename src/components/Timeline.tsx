"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";

interface TimelineEvent {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  description: string;
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      role: "Flutter Developer",
      company: "EitBiz Technologies",
      period: "June 2025 – Present",
      description: "Driving the development of premium mobile applications leveraging IoT/BLE integrations and AI processing capabilities.",
      highlights: [
        "Architected production Flutter apps with high-fidelity performance optimization.",
        "Integrated Bluetooth Low Energy (BLE) protocol to interface with medical devices.",
        "Designed OpenAI API middleware for instant AI-based disease diagnosis.",
        "Implemented real-time bi-directional messaging channels using Socket.IO.",
        "Engineered deep linking schemes and localized push notifications.",
        "Integrated secure multi-gateway payment flows (Stripe, Apple & Google IAP)."
      ]
    },
    {
      role: "Flutter Developer",
      company: "Prutor.ai (IIT Kanpur Outreach)",
      period: "September 2024 – May 2025",
      description: "Contributed to building high-scale outreach learning applications focused on gamification, accessibility, and offline learning modes.",
      highlights: [
        "Structured modular state management using the Riverpod pattern.",
        "Scaled applications reaching 100K+ active downloads across classrooms.",
        "Developed interactive dashboards, leaderboard statistics, and visual quiz feeds.",
        "Optimized layout build routines to support low-end tablet/mobile devices."
      ]
    }
  ];

  return (
    <div className="w-full relative py-8">
      {/* Horizontal timeline track line */}
      <div className="absolute top-[40px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary-accent/10 via-primary-accent/30 to-secondary-accent/10 hidden md:block" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-card p-6 md:p-8 rounded-xl relative flex flex-col justify-between"
          >
            {/* Orb Node (Desktop only) */}
            <div className="absolute top-[-26px] left-[20px] w-6 h-6 rounded-full bg-bg-main border-2 border-primary-accent flex items-center justify-center hidden md:flex">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary-accent animate-ping" />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-accent/10 border border-primary-accent/20 text-primary-accent w-fit flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {event.company}
                </span>
                <span className="text-xs text-white/50 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.period}
                </span>
              </div>

              <h4 className="text-2xl font-bold font-display text-white mb-2">{event.role}</h4>
              <p className="text-sm text-white/70 mb-6 font-sans leading-relaxed">{event.description}</p>

              <h5 className="text-xs uppercase tracking-widest text-secondary-accent font-bold mb-3">Key Contributions</h5>
              <ul className="space-y-2.5">
                {event.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80 font-sans">
                    <CheckCircle className="w-4 h-4 text-primary-accent shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
