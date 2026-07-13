"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("sending");
    
    // Simulate API request
    setTimeout(async () => {
      setStatus("success");
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#4F8CFF", "#6FE7FF", "#ffffff"],
        });
      } catch (err) {
        console.error("Confetti error:", err);
      }
      setFormState({ name: "", email: "", message: "" });
      
      // Reset back to idle after a few seconds
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1.5">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          placeholder="e.g. John Doe"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary-accent/50 focus:bg-white/10 transition-all font-sans"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          placeholder="e.g. john@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary-accent/50 focus:bg-white/10 transition-all font-sans"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[11px] uppercase tracking-widest text-white/50 font-bold mb-1.5">
          Your Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          placeholder="Describe your project, timeline, and goals..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary-accent/50 focus:bg-white/10 transition-all font-sans resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className="w-full h-11 rounded-lg bg-primary-accent text-white hover:bg-primary-accent/90 transition-all flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "idle" && (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
        {status === "sending" && <span>Processing Transmission...</span>}
        {status === "success" && (
          <>
            <span>Sent Successfully!</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </>
        )}
      </button>
    </form>
  );
}
