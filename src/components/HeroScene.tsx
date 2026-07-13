"use client";

import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  useGLTF,
  ContactShadows,
  Environment,
  Sparkles,
  Line,
} from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/iphone17.glb");

// ─── Tech node data ────────────────────────────────────────────────────────────
const TECH_NODES = [
  {
    id: "flutter",
    label: "Flutter",
    color: "#54C5F8",
    position: [-1.6, 0.9, 0.1] as [number, number, number],
    tooltip: "Cross-platform UI · 60fps · Custom Shaders",
  },
  {
    id: "firebase",
    label: "Firebase",
    color: "#FFA611",
    position: [1.55, 0.75, 0.0] as [number, number, number],
    tooltip: "Auth · Push Notifications · Firestore",
  },
  {
    id: "openai",
    label: "OpenAI",
    color: "#10A37F",
    position: [-1.5, -0.55, 0.2] as [number, number, number],
    tooltip: "AI disease analysis · GPT Assistants",
  },
  {
    id: "ble",
    label: "BLE / IoT",
    color: "#007AFF",
    position: [1.45, -0.7, 0.1] as [number, number, number],
    tooltip: "Real-time GATT · Medical device comms",
  },
  {
    id: "maps",
    label: "Google Maps",
    color: "#34A853",
    position: [-0.2, -1.5, 0.2] as [number, number, number],
    tooltip: "Live navigation · ETA · Ride routing",
  },
  {
    id: "socket",
    label: "Socket.IO",
    color: "#9B59B6",
    position: [0.25, 1.55, 0.1] as [number, number, number],
    tooltip: "Ride tracking · Real-time chat",
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#68A063",
    position: [1.2, 1.25, -0.15] as [number, number, number],
    tooltip: "REST APIs · Microservices · Express",
  },
];

// ─── Animated glowing line between two 3D points ───────────────────────────────
function GlowLine({
  from,
  to,
  color,
  active,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  active: boolean;
}) {
  const opacityRef = useRef(0.25);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    opacityRef.current = active
      ? 0.75
      : 0.15 + Math.abs(Math.sin(t * 1.8)) * 0.3 * 0.35;
  });

  return (
    <Line
      points={[from, to]}
      color={active ? color : "#4F8CFF"}
      lineWidth={active ? 1.5 : 0.8}
      transparent
      opacity={active ? 0.75 : 0.28}
    />
  );
}

// ─── Single interactive tech chip ─────────────────────────────────────────────
function TechChip({
  node,
  activeNode,
  onHover,
}: {
  node: (typeof TECH_NODES)[0];
  activeNode: string | null;
  onHover: (id: string | null) => void;
}) {
  const chipRef = useRef<THREE.Group>(null);
  const isActive = activeNode === node.id;

  useFrame(({ clock }) => {
    if (chipRef.current) {
      const t = clock.getElapsedTime();
      chipRef.current.position.y =
        node.position[1] + Math.sin(t * 0.9 + node.position[0] * 2.1) * 0.07;
      chipRef.current.position.x =
        node.position[0] + Math.cos(t * 0.65 + node.position[1] * 1.8) * 0.05;
    }
  });

  const phoneOrigin = new THREE.Vector3(0, 0, 0);

  return (
    <>
      <GlowLine
        from={new THREE.Vector3(...node.position)}
        to={phoneOrigin}
        color={node.color}
        active={isActive}
      />

      <group
        ref={chipRef}
        position={node.position}
        onPointerEnter={() => onHover(node.id)}
        onPointerLeave={() => onHover(null)}
      >
        <Html
          transform={false}
          occlude={false}
          distanceFactor={6}
          zIndexRange={[10, 20]}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="group relative cursor-pointer select-none"
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
          >
            {/* Chip pill */}
            <div
              style={{
                borderColor: isActive ? node.color : "rgba(255,255,255,0.12)",
                boxShadow: isActive
                  ? `0 0 18px ${node.color}55, 0 0 6px ${node.color}33`
                  : "none",
                transform: isActive ? "scale(1.08)" : "scale(1)",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              className="px-2.5 py-1 rounded-full border bg-zinc-950/80 backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: node.color }}
              />
              <span
                className="text-[9px] font-mono font-bold uppercase tracking-widest"
                style={{ color: isActive ? node.color : "rgba(255,255,255,0.75)" }}
              >
                {node.label}
              </span>
            </div>

            {/* Tooltip */}
            {isActive && (
              <div
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[8px] font-sans font-medium text-white/90 whitespace-nowrap pointer-events-none z-50 border border-white/10 backdrop-blur-md"
                style={{
                  background: `linear-gradient(135deg, ${node.color}22, rgba(5,5,5,0.92))`,
                  boxShadow: `0 4px 20px ${node.color}33`,
                }}
              >
                {node.tooltip}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: `4px solid ${node.color}55`,
                  }}
                />
              </div>
            )}
          </div>
        </Html>
      </group>
    </>
  );
}

// ─── Live App Screen overlay ───────────────────────────────────────────────────
function AppScreen() {
  const [chartData, setChartData] = useState([42, 67, 53, 78, 61, 85, 70, 92]);
  const [notification, setNotification] = useState<string | null>(null);
  const [notifVisible, setNotifVisible] = useState(false);
  const notifQueue = useRef([
    "🔵  BLE Device Connected",
    "🤖  AI Scan Complete: Healthy",
    "📍  Route Synced · ETA 4 min",
    "🔥  3 new matches found",
    "📊  100K downloads reached!",
  ]);
  const notifIdx = useRef(0);

  // Animate chart
  useEffect(() => {
    const id = setInterval(() => {
      setChartData((prev) =>
        prev.map((v) => Math.max(15, Math.min(98, v + (Math.random() * 18 - 9))))
      );
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Notifications
  useEffect(() => {
    const fire = () => {
      const msg = notifQueue.current[notifIdx.current % notifQueue.current.length];
      notifIdx.current++;
      setNotification(msg);
      setNotifVisible(true);
      setTimeout(() => setNotifVisible(false), 3200);
    };
    fire();
    const id = setInterval(fire, 7500);
    return () => clearInterval(id);
  }, []);

  const maxVal = Math.max(...chartData);
  const pts = chartData
    .map((v, i) => `${(i / (chartData.length - 1)) * 100},${45 - (v / maxVal) * 38}`)
    .join(" ");
  const fillPts = `0,45 ${pts} 100,45`;

  return (
    <div className="w-[168px] h-[340px] rounded-[28px] bg-zinc-950 overflow-hidden relative border border-white/8 flex flex-col select-none shadow-[0_0_40px_rgba(79,140,255,0.18)]">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1 shrink-0">
        <span className="text-[7px] text-white/50 font-mono">9:41</span>
        <div className="w-14 h-3.5 bg-black rounded-full" />
        <div className="flex gap-0.5 items-center">
          <div className="w-2.5 h-1.5 rounded-sm border border-white/30 relative">
            <div className="absolute inset-[1px] right-[1px] bg-green-400 rounded-sm" style={{ right: "3px" }} />
            <div className="absolute right-[-2px] top-[2px] w-0.5 h-1 bg-white/30 rounded-r-sm" />
          </div>
        </div>
      </div>

      {/* Slide-down Notification */}
      <div
        className="absolute top-8 left-2 right-2 z-50 transition-all duration-500"
        style={{
          transform: notifVisible ? "translateY(0) scale(1)" : "translateY(-40px) scale(0.95)",
          opacity: notifVisible ? 1 : 0,
        }}
      >
        <div className="bg-zinc-800/95 border border-white/10 rounded-xl px-2.5 py-1.5 backdrop-blur-lg shadow-xl">
          <div className="text-[7px] text-white/40 uppercase tracking-widest font-mono mb-0.5">Notification</div>
          <div className="text-[8px] text-white/90 font-medium leading-tight">{notification}</div>
        </div>
      </div>

      {/* App content */}
      <div className="flex-1 px-3 pt-2 pb-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[7px] text-white/40 font-mono uppercase tracking-widest">Dashboard</div>
            <div className="text-[11px] font-extrabold text-white font-display leading-tight">App Telemetry</div>
          </div>
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#4F8CFF] to-[#6FE7FF] flex items-center justify-center text-[6px] font-bold text-black">RM</div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Downloads", value: "110K+", color: "#4F8CFF" },
            { label: "Avg Rating", value: "4.8★", color: "#6FE7FF" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl p-2 border border-white/5" style={{ background: `${m.color}11` }}>
              <div className="text-[6px] text-white/40 uppercase tracking-widest font-mono">{m.label}</div>
              <div className="text-[11px] font-extrabold font-display" style={{ color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Live Chart */}
        <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/5 p-2 relative overflow-hidden">
          <div className="text-[6px] text-white/40 uppercase tracking-widest font-mono mb-1">Live Sessions</div>
          <svg viewBox="0 0 100 50" className="w-full h-16" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={fillPts}
              fill="url(#cg)"
              style={{ transition: "points 1.8s cubic-bezier(0.4,0,0.2,1)" }}
            />
            <polyline
              points={pts}
              fill="none"
              stroke="#4F8CFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "points 1.8s cubic-bezier(0.4,0,0.2,1)" }}
            />
            {/* Last point dot */}
            <circle
              cx={100}
              cy={45 - (chartData[chartData.length - 1] / maxVal) * 38}
              r="2"
              fill="#6FE7FF"
            >
              <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Active integrations */}
        <div className="space-y-1">
          {[
            { label: "BLE Device", status: "Connected", dot: "#54C5F8" },
            { label: "OpenAI", status: "Ready", dot: "#10A37F" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: item.dot }} />
                <span className="text-[7px] font-mono text-white/50">{item.label}</span>
              </div>
              <span className="text-[6px] font-mono uppercase tracking-widest" style={{ color: item.dot }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main phone model (centered GLB + screen overlay) ─────────────────────────
function PhoneModel({
  activeNode,
}: {
  activeNode: string | null;
}) {
  const gltf = useGLTF("/models/iphone17.glb") as any;
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [centerOffset, setCenterOffset] = useState(new THREE.Vector3());

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = ((e.clientX / window.innerWidth) - 0.5) * 0.6;
      mouseRef.current.ty = ((e.clientY / window.innerHeight) - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Center the model
  useEffect(() => {
    if (!gltf?.scene) return;
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.set(0, 0, 0);
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    setCenterOffset(center);

    // Make screen mesh transparent so Html overlay shows
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        const n = child.name.toLowerCase();
        const isScreen =
          n.includes("screen") || n.includes("display") || n.includes("glass_front") || n.includes("lcd");
        if (isScreen) {
          child.material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 });
        }
      }
    });
  }, [gltf]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = mouseRef.current;
    m.x += (m.tx - m.x) * 0.055;
    m.y += (m.ty - m.y) * 0.055;

    if (outerRef.current) {
      outerRef.current.rotation.x = -0.15 + m.y * -0.8;
      outerRef.current.rotation.y = 0.35 + Math.sin(t * 0.12) * 0.05 + m.x * 0.8;
      outerRef.current.rotation.z = -0.07;
    }
    if (innerRef.current) {
      innerRef.current.position.y = Math.sin(t * 0.55) * 0.06;
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef} scale={4.8}>
        <group position={[-centerOffset.x, -centerOffset.y, -centerOffset.z]}>
          <group rotation={[0, Math.PI, 0]}>
            <primitive object={gltf.scene} />
          </group>
        </group>

        {/* App Screen overlay — sits just in front of the display area */}
        <Html
          transform
          position={[0, 0.002, 0.0095]}
          distanceFactor={0.63}
          occlude={false}
          zIndexRange={[0, 5]}
          style={{ pointerEvents: "none" }}
        >
          <AppScreen />
        </Html>
      </group>
    </group>
  );
}

// ─── Ambient floating particles ────────────────────────────────────────────────
function AmbientParticles() {
  const count = 90;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#4F8CFF" size={0.012} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

// ─── Orbit camera animation ────────────────────────────────────────────────────
function CameraOrbit() {
  const { camera } = useThree();
  const baseZ = 3.6;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.06) * 0.4;
    camera.position.y = Math.cos(t * 0.05) * 0.18;
    camera.position.z = baseZ + Math.sin(t * 0.09) * 0.12;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Root export ───────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-full h-full bg-transparent" />;

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <CameraOrbit />

        {/* Lighting */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 8, 5]} intensity={2.8} color="#4F8CFF" castShadow />
        <directionalLight position={[-4, -4, -2]} intensity={1.2} color="#6FE7FF" />
        <pointLight position={[0, 0, 3]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-2, 2, 1]} intensity={1.0} color="#4F8CFF" />
        <pointLight position={[2, -2, 1]} intensity={0.8} color="#6FE7FF" />

        <Environment preset="city" />

        <Suspense
          fallback={
            <Html center>
              <div className="text-[10px] uppercase tracking-widest text-[#4F8CFF] font-mono animate-pulse px-4 py-2 rounded-full border border-[#4F8CFF]/30 bg-black/60 backdrop-blur">
                Loading Showcase…
              </div>
            </Html>
          }
        >
          {/* Ambient particles */}
          <AmbientParticles />

          {/* Sparkles from Drei */}
          <Sparkles
            count={40}
            scale={3.5}
            size={1.2}
            speed={0.3}
            opacity={0.45}
            color="#6FE7FF"
          />

          {/* Phone */}
          <PhoneModel activeNode={activeNode} />

          {/* Tech Nodes */}
          {TECH_NODES.map((node) => (
            <TechChip
              key={node.id}
              node={node}
              activeNode={activeNode}
              onHover={setActiveNode}
            />
          ))}
        </Suspense>

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.55}
          scale={9}
          blur={2.5}
          far={5}
          color="#4F8CFF"
        />
      </Canvas>
    </div>
  );
}
