"use client";

import { useEffect, useRef, useState } from "react";
import { SiFlutter } from "react-icons/si";

interface TechNode {
  name: string;
  type: "crystal" | "wireframe_cube" | "neural_sphere" | "grid_globe" | "network_mesh" | "signal_emitter" | "db_tower" | "ripple_sphere" | "connected_cubes";
  angle: number;
  radius: number;
  speed: number;
  yOrbitScale: number;
  color: string;
  details: string;
  projects: string[];
  // Calculated 3D coords
  x?: number;
  y?: number;
  z?: number;
}

interface DustParticle {
  angle: number;
  radius: number;
  speed: number;
  yOrbitScale: number;
  size: number;
  color: string;
}

export default function GalaxyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [cameraZoom, setCameraZoom] = useState(1);
  const [cameraPan, setCameraPan] = useState({ x: 0, y: 0 });

  const techNodes: TechNode[] = [
    {
      name: "Firebase",
      type: "crystal",
      angle: 0,
      radius: 130,
      speed: 0.005,
      yOrbitScale: 0.35,
      color: "#FFCA28",
      details: "Database services, real-time news streams, and secure auth verification for NGO social platform, Sathee, and retail apps.",
      projects: ["Sathee", "Trop C'est Trop"]
    },
    {
      name: "Node.js",
      type: "wireframe_cube",
      angle: Math.PI / 4,
      radius: 230,
      speed: 0.003,
      yOrbitScale: 0.38,
      color: "#339933",
      details: "REST APIs, secure socket connections, microservices, and file storage APIs built using Node.js and Express.",
      projects: ["Zembora"]
    },
    {
      name: "OpenAI",
      type: "neural_sphere",
      angle: Math.PI / 2,
      radius: 175,
      speed: 0.004,
      yOrbitScale: 0.42,
      color: "#10A37F",
      details: "Dynamic AI analysis models diagnosing medical values on the fly, and automated route advice systems.",
      projects: ["Medentum Diagnostick", "Zembora"]
    },
    {
      name: "Google Maps",
      type: "grid_globe",
      angle: Math.PI,
      radius: 200,
      speed: 0.0035,
      yOrbitScale: 0.4,
      color: "#4285F4",
      details: "Geofencing, route overlays, live location polling, and address search integrations.",
      projects: ["Zembora"]
    },
    {
      name: "BLE",
      type: "signal_emitter",
      angle: Math.PI * 1.25,
      radius: 150,
      speed: 0.0045,
      yOrbitScale: 0.3,
      color: "#2979FF",
      details: "Custom GATT streaming channels reading oxygen levels, heart rates, and temp data from hardware sensors.",
      projects: ["Medentum Diagnostick"]
    },
    {
      name: "Socket.IO",
      type: "network_mesh",
      angle: Math.PI * 1.5,
      radius: 215,
      speed: 0.003,
      yOrbitScale: 0.32,
      color: "#ffffff",
      details: "Instantly synchronized real-time rider-driver connections and low latency multi-user chatrooms.",
      projects: ["Zembora", "Orra"]
    },
    {
      name: "Riverpod",
      type: "ripple_sphere",
      angle: Math.PI * 0.4,
      radius: 110,
      speed: 0.006,
      yOrbitScale: 0.36,
      color: "#47A1E2",
      details: "Predictable, asynchronous model architecture separating views from networks in education platforms.",
      projects: ["Sathee"]
    },
    {
      name: "Bloc",
      type: "connected_cubes",
      angle: Math.PI * 0.8,
      radius: 185,
      speed: 0.004,
      yOrbitScale: 0.34,
      color: "#02569B",
      details: "Decoupled enterprise routing and strict state transitions separating business layers.",
      projects: ["Main Street Media"]
    },
    {
      name: "Supabase",
      type: "db_tower",
      angle: Math.PI * 1.75,
      radius: 195,
      speed: 0.0038,
      yOrbitScale: 0.37,
      color: "#3ECF8E",
      details: "PostgreSQL setups, dynamic user profiles, and sync engines mapping leaderboard metrics.",
      projects: ["Prutor Games"]
    }
  ];

  const nodesRef = useRef<TechNode[]>(techNodes);
  const dustRef = useRef<DustParticle[]>([]);

  // Initialize cosmic dust particles
  useEffect(() => {
    const particles: DustParticle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 260 + 80,
        speed: (Math.random() * 0.002) + 0.001,
        yOrbitScale: (Math.random() * 0.2) + 0.25,
        size: Math.random() * 1.2 + 0.4,
        color: Math.random() > 0.4 ? "rgba(79, 140, 255, 0.25)" : "rgba(255, 255, 255, 0.2)"
      });
    }
    dustRef.current = particles;
  }, []);

  const draw3DShape = (
    ctx: CanvasRenderingContext2D,
    node: TechNode,
    time: number,
    isHovered: boolean
  ) => {
    const x = node.x || 0;
    const y = node.y || 0;
    const color = node.color;
    const baseSize = isHovered ? 24 : 15;

    ctx.save();
    ctx.translate(x, y);

    const rot = time * 0.02;

    switch (node.type) {
      case "crystal": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const h = baseSize * 1.2;
        const w = baseSize * 0.8;
        
        const pt = { x: 0, y: -h };
        const pb = { x: 0, y: h };
        
        const base = [0, 1, 2, 3].map((i) => {
          const a = rot + (i * Math.PI) / 2;
          return { x: Math.cos(a) * w, y: Math.sin(a) * w * 0.4 };
        });

        base.forEach((p, idx) => {
          const next = base[(idx + 1) % 4];
          ctx.moveTo(pt.x, pt.y); ctx.lineTo(p.x, p.y);
          ctx.moveTo(pb.x, pb.y); ctx.lineTo(p.x, p.y);
          ctx.moveTo(p.x, p.y); ctx.lineTo(next.x, next.y);
        });
        ctx.stroke();
        break;
      }
      case "wireframe_cube": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        const s = baseSize * 0.8;
        const vertices = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ].map(([vx, vy, vz]) => {
          const x1 = vx * Math.cos(rot) - vz * Math.sin(rot);
          const z1 = vx * Math.sin(rot) + vz * Math.cos(rot);
          const y1 = vy * Math.cos(rot * 0.7) - z1 * Math.sin(rot * 0.7);
          return { x: x1 * s, y: y1 * s };
        });

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        ctx.beginPath();
        edges.forEach(([u, v]) => {
          ctx.moveTo(vertices[u].x, vertices[u].y);
          ctx.lineTo(vertices[v].x, vertices[v].y);
        });
        ctx.stroke();
        break;
      }
      case "neural_sphere": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = color;
        for (let i = 0; i < 5; i++) {
          const a = rot + (i * Math.PI * 2) / 5;
          const px = Math.cos(a) * baseSize * 0.5;
          const py = Math.sin(a) * baseSize * 0.5 * 0.5;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "grid_globe": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(0, 0, baseSize, baseSize * 0.35, rot, 0, Math.PI * 2);
        ctx.ellipse(0, 0, baseSize * 0.35, baseSize, rot * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case "network_mesh": {
        ctx.fillStyle = color;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 0.8;
        const pts = [
          { x: -baseSize * 0.5, y: -baseSize * 0.3 },
          { x: baseSize * 0.4, y: -baseSize * 0.5 },
          { x: baseSize * 0.6, y: baseSize * 0.4 },
          { x: -0.3 * baseSize, y: baseSize * 0.5 },
          { x: 0, y: 0 }
        ];
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.lineTo(pts[3].x, pts[3].y);
        ctx.lineTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[4].x, pts[4].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.stroke();

        pts.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }
      case "signal_emitter": {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        const pulse = (time * 0.05) % 1;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * pulse, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case "db_tower": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        const h = baseSize * 0.4;
        const w = baseSize * 0.8;

        [-h * 1.5, 0, h * 1.5].forEach((offsetY) => {
          ctx.beginPath();
          ctx.ellipse(0, offsetY, w, w * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.moveTo(-w, offsetY);
          ctx.lineTo(-w, offsetY + h);
          ctx.moveTo(w, offsetY);
          ctx.lineTo(w, offsetY + h);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(0, offsetY + h, w, w * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        });
        break;
      }
      case "ripple_sphere": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        const r1 = (time * 0.03) % 1;
        const r2 = ((time * 0.03) + 0.5) % 1;

        ctx.beginPath();
        ctx.arc(0, 0, baseSize * r1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, baseSize * r2, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case "connected_cubes": {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        
        ctx.strokeRect(-baseSize * 0.5, -baseSize * 0.5, baseSize, baseSize);
        ctx.save();
        ctx.rotate(rot);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.strokeRect(-baseSize * 0.3, -baseSize * 0.3, baseSize * 0.6, baseSize * 0.6);
        ctx.restore();
        break;
      }
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = 480;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: TechNode | null = null;

      for (const node of nodesRef.current) {
        if (node.x !== undefined && node.y !== undefined) {
          const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
          if (dist < 32) {
            found = node;
            break;
          }
        }
      }

      setHoveredNode(found);
    };

    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = false;

      for (const node of nodesRef.current) {
        if (node.x !== undefined && node.y !== undefined) {
          const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
          if (dist < 35) {
            setSelectedNode(node);
            setCameraZoom(1.8);
            setCameraPan({ x: width / 2 - node.x, y: height / 2 - node.y });
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setSelectedNode(null);
        setCameraZoom(1.0);
        setCameraPan({ x: 0, y: 0 });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2 + cameraPan.x, height / 2 + cameraPan.y);
      ctx.scale(cameraZoom, cameraZoom);
      ctx.translate(-width / 2, -height / 2);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw Orbiting Cosmic Dust
      dustRef.current.forEach((dust) => {
        dust.angle += dust.speed;
        const dx = centerX + Math.cos(dust.angle) * dust.radius;
        const dy = centerY + Math.sin(dust.angle) * dust.radius * dust.yOrbitScale;
        ctx.fillStyle = dust.color;
        ctx.beginPath();
        ctx.arc(dx, dy, dust.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Interactive Connections & Network Grid (Dense Web)
      ctx.strokeStyle = "rgba(79, 140, 255, 0.08)";
      ctx.lineWidth = 0.5;
      nodesRef.current.forEach((n1, idx1) => {
        nodesRef.current.forEach((n2, idx2) => {
          if (idx1 >= idx2) return;
          const dist = Math.hypot((n1.radius - n2.radius), (n1.angle - n2.angle) * 60);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(n1.x || centerX, n1.y || centerY);
            ctx.lineTo(n2.x || centerX, n2.y || centerY);
            ctx.stroke();
          }
        });
      });

      // Update positions and Z coordinates
      nodesRef.current.forEach((node) => {
        if (!selectedNode) {
          node.angle += node.speed;
        }
        node.x = centerX + Math.cos(node.angle) * node.radius;
        node.y = centerY + Math.sin(node.angle) * node.radius * node.yOrbitScale;
        node.z = Math.sin(node.angle);
      });

      const sortedNodes = [...nodesRef.current].sort((a, b) => (a.z || 0) - (b.z || 0));

      // Draw Tech Shapes
      sortedNodes.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;
        const isHovered = hoveredNode?.name === node.name || selectedNode?.name === node.name;
        
        if (isHovered) {
          ctx.strokeStyle = `rgba(79, 140, 255, ${selectedNode ? "0.45" : "0.25"})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }

        draw3DShape(ctx, node, time, isHovered);

        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.35)";
        ctx.font = `${isHovered ? "bold 12px" : "10px"} var(--font-mono), monospace`;
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + 24);
      });

      // Core Glowing Energy Core (Flutter logo)
      ctx.shadowColor = "#4F8CFF";
      ctx.shadowBlur = 30;
      ctx.fillStyle = "rgba(5, 5, 5, 0.9)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(79, 140, 255, 0.75)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("click", handleMouseClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode, selectedNode, cameraZoom, cameraPan]);

  return (
    <div ref={containerRef} className="w-full relative h-[480px] overflow-hidden select-none flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full cursor-pointer" />

      {!selectedNode && (
        <div className="absolute z-20 pointer-events-none flex flex-col items-center justify-center">
          <SiFlutter className="text-3xl text-primary-accent animate-pulse" />
          <span className="text-[9px] uppercase tracking-widest text-primary-accent/80 font-mono font-bold mt-1">ENERGY CORE</span>
        </div>
      )}

      {selectedNode && (
        <div className="absolute bottom-6 right-6 z-30 glass-card p-5 rounded-xl max-w-sm text-left border border-primary-accent/40 shadow-[0_0_20px_rgba(79,140,255,0.15)] animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: selectedNode.color }} />
              <h4 className="font-bold text-white uppercase tracking-wider font-mono">{selectedNode.name}</h4>
            </div>
            <button
              onClick={() => {
                setSelectedNode(null);
                setCameraZoom(1.0);
                setCameraPan({ x: 0, y: 0 });
              }}
              className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all text-white/70"
            >
              [Exit Target]
            </button>
          </div>
          <p className="text-xs text-white/80 leading-relaxed font-sans mb-4">{selectedNode.details}</p>

          <h5 className="text-[10px] uppercase tracking-widest text-secondary-accent font-bold mb-2">Linked Case Studies</h5>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.projects.map((proj, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-primary-accent/15 border border-primary-accent/30 text-white font-mono">
                {proj}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
