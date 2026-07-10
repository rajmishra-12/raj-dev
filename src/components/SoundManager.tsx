"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

class SynthEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  public isAmbientPlaying = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public playClick(freq = 600, duration = 0.08) {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("AudioContext failed to start", e);
    }
  }

  public startAmbientLoop() {
    try {
      this.init();
      if (!this.ctx || this.isAmbientPlaying) return;

      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A bass note

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);

      // Connect nodes
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Subtle frequency filter modulation (cosmic breathing)
      const modulator = () => {
        if (!this.isAmbientPlaying) return;
        const time = ctx.currentTime;
        filter.frequency.linearRampToValueAtTime(90 + Math.sin(time) * 30, time + 1.5);
        setTimeout(modulator, 1500);
      };

      osc.start();
      this.osc = osc;
      this.gain = gain;
      this.isAmbientPlaying = true;
      modulator();
    } catch (e) {
      console.warn("Ambient play failed", e);
    }
  }

  public stopAmbientLoop() {
    if (this.osc) {
      try {
        this.osc.stop();
        this.osc.disconnect();
      } catch (e) {}
      this.osc = null;
    }
    if (this.gain) {
      try {
        this.gain.disconnect();
      } catch (e) {}
      this.gain = null;
    }
    this.isAmbientPlaying = false;
  }
}

export const synth = new SynthEngine();

export default function SoundManager() {
  const [muted, setMuted] = useState(true);

  const handleToggle = () => {
    if (muted) {
      synth.startAmbientLoop();
      synth.playClick(800, 0.15);
      setMuted(false);
    } else {
      synth.stopAmbientLoop();
      setMuted(true);
    }
  };

  // Add global click listener for clicking sounds
  useEffect(() => {
    const handleGlobalClick = () => {
      if (!muted) {
        synth.playClick(500, 0.05);
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [muted]);

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full border border-white/10 hover:border-primary-accent/40 bg-white/5 text-white/70 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
      title={muted ? "Enable audio immersion" : "Mute audio immersion"}
    >
      {muted ? (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider">Audio Off</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-primary-accent animate-pulse" />
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider text-primary-accent">Audio On</span>
        </>
      )}
    </button>
  );
}
