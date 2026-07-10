"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Smartphone, Award, ShieldAlert } from "lucide-react";

export interface Project {
  title: string;
  category: string;
  shortDesc: string;
  techStack: string[];
  architecture: string;
  challenges: string;
  achievements: string;
  details: string;
  mockupBg: string; // Gradient color specifier
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-4xl glass-panel rounded-2xl overflow-hidden z-10 shadow-2xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[80vh] border border-white/10"
          >
            {/* Visual device/gradient column */}
            <div className={`w-full md:w-2/5 p-6 flex flex-col justify-between items-center text-center relative overflow-hidden bg-gradient-to-br ${project.mockupBg}`}>
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              
              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <h3 className="text-3xl font-bold font-display mt-3 text-white drop-shadow-md">
                  {project.title}
                </h3>
              </div>

              {/* Minimalistic Interactive Mockup */}
              <div className="w-[160px] h-[320px] rounded-[32px] border-4 border-white/40 bg-zinc-950 p-2 my-6 shadow-2xl relative flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-2 w-16 h-3.5 bg-white/20 rounded-full" />
                <div className="w-full h-full rounded-[24px] flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-900 to-zinc-800 p-4 border border-white/10 text-center">
                  <Smartphone className="w-8 h-8 text-primary-accent mb-2 animate-bounce" />
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Preview App</span>
                  <span className="text-xs text-white font-medium mt-1">{project.title}</span>
                </div>
              </div>

              <p className="text-xs text-white/80 font-sans italic relative z-10">
                Production-ready performance optimized
              </p>
            </div>

            {/* Content Details Column */}
            <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-zinc-950/80">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-20 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2">Overview</h4>
                  <p className="text-sm text-white/90 leading-relaxed font-sans">{project.details}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary-accent font-bold mb-2">Core Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary-accent/10 border border-primary-accent/20 mt-1">
                    <Cpu className="w-4 h-4 text-primary-accent" />
                  </div>
                  <div>
                    <h5 className="text-xs uppercase tracking-widest text-white/90 font-bold mb-1">Architecture & Design</h5>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">{project.architecture}</p>
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-1">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h5 className="text-xs uppercase tracking-widest text-white/90 font-bold mb-1">Engineering Challenges</h5>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">{project.challenges}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mt-1">
                    <Award className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-xs uppercase tracking-widest text-white/90 font-bold mb-1">Key Achievements</h5>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">{project.achievements}</p>
                  </div>
                </div>
              </div>

              {/* Bottom footer button */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-white/10 text-xs font-semibold hover:bg-white/20 transition-colors text-white"
                >
                  Close Showcase
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
