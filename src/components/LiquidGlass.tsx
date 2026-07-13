"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface GlassOrb {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  baseSize: number;
  hue: number;
  speed: number;
  phase: number;
  blur: number;
  opacity: number;
}

export default function LiquidGlass() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<GlassOrb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [orbCount, setOrbCount] = useState(6);
  const [svgFilterId] = useState(() => `liquid-glass-${Math.random().toString(36).slice(2, 8)}`);

  const initOrbs = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = w < 768 ? 4 : 6;
    setOrbCount(count);

    orbsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      targetX: Math.random() * w,
      targetY: Math.random() * h,
      size: 180 + Math.random() * 220,
      baseSize: 180 + Math.random() * 220,
      hue: 200 + Math.random() * 40,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      blur: 60 + Math.random() * 40,
      opacity: 0.035 + Math.random() * 0.025,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
    initOrbs();

    const handleResize = () => initOrbs();
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      orbsRef.current.forEach((orb) => {
        // Organic floating motion
        const floatX = Math.sin(t * orb.speed + orb.phase) * 120;
        const floatY = Math.cos(t * orb.speed * 0.7 + orb.phase) * 80;

        // Mouse repulsion (subtle push-away effect)
        const dx = orb.x - mx;
        const dy = orb.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulse = Math.max(0, 1 - dist / 400);
        const repulseX = dist > 0 ? (dx / dist) * repulse * 60 : 0;
        const repulseY = dist > 0 ? (dy / dist) * repulse * 60 : 0;

        // Scroll parallax — each orb at a different depth
        const scrollOffset = (scrollRef.current * (0.02 + orb.id * 0.008)) % h;

        orb.targetX = (w * (0.15 + (orb.id / orbsRef.current.length) * 0.7)) + floatX + repulseX;
        orb.targetY = (h * 0.3 + floatY + repulseY - scrollOffset + h) % (h + orb.size) - orb.size * 0.5;

        // Smooth spring interpolation — liquid feel
        orb.x += (orb.targetX - orb.x) * 0.02;
        orb.y += (orb.targetY - orb.y) * 0.02;

        // Breathing size oscillation
        orb.size = orb.baseSize + Math.sin(t * 0.5 + orb.phase) * 30;
      });

      // Direct DOM manipulation for 60fps performance
      const container = containerRef.current;
      if (container) {
        const elements = container.querySelectorAll<HTMLDivElement>("[data-orb]");
        elements.forEach((el, i) => {
          const orb = orbsRef.current[i];
          if (!orb) return;
          el.style.transform = `translate3d(${orb.x - orb.size / 2}px, ${orb.y - orb.size / 2}px, 0)`;
          el.style.width = `${orb.size}px`;
          el.style.height = `${orb.size}px`;
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initOrbs]);

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* SVG Filters for liquid distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={svgFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed="42"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015;0.025;0.015"
                dur="20s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Prismatic edge glow filter */}
          <filter id={`${svgFilterId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1.2 0 0 0 0.1   0 1.1 0 0 0.15   0 0 1.5 0 0.2   0 0 0 0.6 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid glass orbs — each is a floating refractive sphere */}
      {Array.from({ length: orbCount }, (_, i) => (
        <div
          key={i}
          data-orb
          className="absolute will-change-transform"
          style={{
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, 
              rgba(${79 + i * 8}, ${140 + i * 12}, 255, 0.06) 0%, 
              rgba(111, 231, 255, 0.03) 40%, 
              rgba(79, 140, 255, 0.01) 70%, 
              transparent 100%)`,
            backdropFilter: `blur(${60 + i * 8}px)`,
            WebkitBackdropFilter: `blur(${60 + i * 8}px)`,
            border: "1px solid rgba(255, 255, 255, 0.04)",
            boxShadow: `
              inset 0 0 60px rgba(111, 231, 255, 0.03),
              inset 0 0 120px rgba(79, 140, 255, 0.02),
              0 0 40px rgba(79, 140, 255, 0.04)
            `,
            filter: `url(#${svgFilterId})`,
            transition: "width 0.8s ease, height 0.8s ease",
          }}
        />
      ))}

      {/* Full viewport ambient refraction overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79, 140, 255, 0.02) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(111, 231, 255, 0.015) 0%, transparent 60%),
            radial-gradient(ellipse 70% 40% at 80% 60%, rgba(79, 140, 255, 0.01) 0%, transparent 50%)
          `,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
