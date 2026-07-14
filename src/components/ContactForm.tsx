"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, X } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("sending");
    
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "8a3476c4-fc3b-4645-89bb-927d1307de59";
      
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("message", formState.message);
      formData.append("subject", `New Message from ${formState.name} on Portfolio`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
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
      } else {
        console.error("API response not OK:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Form transmission failed:", err);
      setStatus("error");
    } finally {
      // Reset back to idle after a few seconds
      setTimeout(() => setStatus("idle"), 4000);
    }
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
          placeholder="e.g. John"
          className="w-full glass-frost rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary-accent/40 focus:border-primary-accent transition-all font-sans"
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
          className="w-full glass-frost rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary-accent/40 focus:border-primary-accent transition-all font-sans"
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
          className="w-full glass-frost rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary-accent/40 focus:border-primary-accent transition-all font-sans resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
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
        {status === "error" && (
          <>
            <span>Failed to Send. Try Again?</span>
            <X className="w-4 h-4 text-rose-400" />
          </>
        )}
      </button>
    </form>
  );
}
