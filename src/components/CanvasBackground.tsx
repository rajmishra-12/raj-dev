"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, rawX: 0, rawY: 0 });
  const scrollRef = useRef({ y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize stars
    const stars: Particle[] = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      const z = Math.random() * 2 + 0.5;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: (3 - z) * 0.7 + 0.1,
        color: z < 1.0 ? "rgba(111, 231, 255, 0.5)" : "rgba(255, 255, 255, 0.35)",
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
      });
    }

    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.008) {
        shootingStars.push({
          x: Math.random() * width * 0.6,
          y: Math.random() * height * 0.3,
          length: Math.random() * 60 + 30,
          speed: Math.random() * 6 + 4,
          opacity: 1,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.rawX = e.clientX - rect.left;
      mouseRef.current.rawY = e.clientY - rect.top;
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
    };

    const handleScroll = () => {
      scrollRef.current.y = window.scrollY * 0.15;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const render = () => {
      // Interpolate offsets
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing space nebula backdrops
      const nebula1 = ctx.createRadialGradient(
        width * 0.25 + mouseRef.current.x * 0.15,
        height * 0.35 + mouseRef.current.y * 0.15,
        50,
        width * 0.25,
        height * 0.35,
        width * 0.5
      );
      nebula1.addColorStop(0, "rgba(79, 140, 255, 0.04)");
      nebula1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.75 - mouseRef.current.x * 0.15,
        height * 0.65 - mouseRef.current.y * 0.15,
        50,
        width * 0.75,
        height * 0.65,
        width * 0.5
      );
      nebula2.addColorStop(0, "rgba(111, 231, 255, 0.025)");
      nebula2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Interactive Coordinate Grid Overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 0.5;
      const gridSpacing = 60;
      
      // Draw grid vertical lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Draw grid horizontal lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw grid cursor hover lighting circle
      const gridGlow = ctx.createRadialGradient(
        mouseRef.current.rawX,
        mouseRef.current.rawY,
        5,
        mouseRef.current.rawX,
        mouseRef.current.rawY,
        180
      );
      gridGlow.addColorStop(0, "rgba(79, 140, 255, 0.05)");
      gridGlow.addColorStop(0.5, "rgba(111, 231, 255, 0.01)");
      gridGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = gridGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Stars Parallax
      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        const scrollOffset = scrollRef.current.y / star.z;
        const mouseX = mouseRef.current.x / star.z;
        const mouseY = mouseRef.current.y / star.z;

        let posX = (star.x + mouseX) % width;
        let posY = (star.y - scrollOffset + mouseY) % height;

        if (posX < 0) posX += width;
        if (posY < 0) posY += height;

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Render shooting stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ctx.strokeStyle = `rgba(111, 231, 255, ${ss.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x + ss.length, ss.y + ss.length * 0.5);
        ctx.stroke();

        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        ss.opacity -= 0.018;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
