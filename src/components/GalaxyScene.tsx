"use client";

import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  ContactShadows,
  Environment,
  Sparkles,
  Line,
  Sphere,
  Box,
} from "@react-three/drei";
import * as THREE from "three";

// ─── Tech data ─────────────────────────────────────────────────────────────────
const TECHS = [
  {
    id: "firebase",
    label: "Firebase",
    color: "#FFA611",
    position: [-2.4, 0.8, -0.5] as [number, number, number],
    details: "Auth · Firestore · Cloud Functions · Push Notifications",
    projects: ["Sathee", "Trop C'est Trop", "Main Street Media"],
    type: "crystal",
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#68A063",
    position: [2.6, -0.4, -1.0] as [number, number, number],
    details: "REST APIs · Microservices · Express · Socket Server",
    projects: ["Zembora"],
    type: "cube",
  },
  {
    id: "openai",
    label: "OpenAI",
    color: "#10A37F",
    position: [1.8, 1.5, 0.3] as [number, number, number],
    details: "AI disease analysis · GPT assistants · Real-time diagnostics",
    projects: ["Medentum Diagnostick", "Zembora"],
    type: "neural",
  },
  {
    id: "googlemaps",
    label: "Google Maps",
    color: "#4285F4",
    position: [-2.0, -1.5, 0.8] as [number, number, number],
    details: "Geofencing · Live routing · Address search · ETA overlays",
    projects: ["Zembora"],
    type: "globe",
  },
  {
    id: "ble",
    label: "BLE / IoT",
    color: "#007AFF",
    position: [-0.6, 2.1, -1.2] as [number, number, number],
    details: "GATT streaming · O₂ · Heart rate · Real-time hardware sensors",
    projects: ["Medentum Diagnostick"],
    type: "signal",
  },
  {
    id: "socketio",
    label: "Socket.IO",
    color: "#EEEEEE",
    position: [2.8, 0.9, 0.6] as [number, number, number],
    details: "Rider-driver sync · Multi-user chat · Low-latency channels",
    projects: ["Zembora", "Orra"],
    type: "satellite",
  },
  {
    id: "riverpod",
    label: "Riverpod",
    color: "#47A1E2",
    position: [-1.2, -2.2, -0.6] as [number, number, number],
    details: "Async state · Scoped providers · Education platform architecture",
    projects: ["Sathee", "Medentum Diagnostick"],
    type: "ripple",
  },
  {
    id: "bloc",
    label: "Bloc",
    color: "#02569B",
    position: [0.8, -2.0, 1.0] as [number, number, number],
    details: "Event-driven state · Enterprise routing · Business layer isolation",
    projects: ["Main Street Media"],
    type: "cubes",
  },
  {
    id: "supabase",
    label: "Supabase",
    color: "#3ECF8E",
    position: [1.2, 2.5, -0.8] as [number, number, number],
    details: "PostgreSQL · Realtime sync · Leaderboard APIs",
    projects: ["Prutor Games"],
    type: "tower",
  },
];

// ─── Flutter Energy Core ───────────────────────────────────────────────────────
function FlutterCore({ hovered }: { hovered: boolean }) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const arcGroupRef = useRef<THREE.Group>(null);

  const arcCount = 8;
  const arcPoints = useMemo(() => {
    return Array.from({ length: arcCount }, (_, i) => {
      const pts: THREE.Vector3[] = [];
      const offset = (i / arcCount) * Math.PI * 2;
      for (let j = 0; j <= 40; j++) {
        const t = j / 40;
        const angle = offset + t * Math.PI * 2;
        const r = 0.42 + Math.sin(t * Math.PI * 3 + offset) * 0.08;
        pts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.35, 0));
      }
      return pts;
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = hovered ? 1.25 : 1.0;

    if (ringA.current) { ringA.current.rotation.z = t * 0.6; ringA.current.scale.setScalar(scale); }
    if (ringB.current) { ringB.current.rotation.z = -t * 0.45; ringB.current.rotation.x = t * 0.2; ringB.current.scale.setScalar(scale); }
    if (ringC.current) { ringC.current.rotation.x = t * 0.55; ringC.current.rotation.y = t * 0.3; ringC.current.scale.setScalar(scale); }
    if (coreRef.current) {
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.8 + Math.sin(t * 2.2) * 0.4 + (hovered ? 0.8 : 0);
      coreRef.current.scale.setScalar(scale * (1 + Math.sin(t * 1.8) * 0.04));
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * (1.6 + Math.sin(t * 1.5) * 0.12));
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(t * 2) * 0.02 + (hovered ? 0.06 : 0);
    }
    if (arcGroupRef.current) arcGroupRef.current.rotation.y = t * 0.3;
  });

  return (
    <group>
      {/* Outer volumetric glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#4F8CFF" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Core plasma sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.28, 48, 48]} />
        <meshStandardMaterial
          color="#1a5fff"
          emissive="#4F8CFF"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Rotating rings */}
      {[ringA, ringB, ringC].map((ref, i) => (
        <mesh key={i} ref={ref}>
          <torusGeometry args={[0.44 + i * 0.07, 0.008 - i * 0.001, 12, 80]} />
          <meshStandardMaterial
            color="#4F8CFF"
            emissive="#6FE7FF"
            emissiveIntensity={0.9}
            transparent
            opacity={0.85 - i * 0.15}
          />
        </mesh>
      ))}

      {/* Electric arc lines */}
      <group ref={arcGroupRef}>
        {arcPoints.map((pts, i) => (
          <Line
            key={i}
            points={pts}
            color="#6FE7FF"
            lineWidth={0.6}
            transparent
            opacity={0.3 + (i % 3) * 0.1}
          />
        ))}
      </group>

      {/* Label */}
      <Html center position={[0, -0.58, 0]} zIndexRange={[0, 10]} style={{ pointerEvents: "none" }}>
        <div className="text-center select-none">
          <div className="text-[8px] font-mono font-black uppercase tracking-[0.25em] text-[#4F8CFF] drop-shadow-[0_0_8px_rgba(79,140,255,0.8)]">
            Flutter Core
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─── Firebase: glowing blue crystal ───────────────────────────────────────────
function CrystalObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.5;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={active ? 1.4 : 0.5}
          roughness={0.05} metalness={0.9}
          transparent opacity={0.88}
        />
      </mesh>
      {/* Inner smaller crystal */}
      <mesh rotation={[0.5, 0, 0.5]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.2} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ─── Node.js: transparent green cube with circuitry ───────────────────────────
function CubeObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.y = t * 0.3;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={active ? 1.0 : 0.3}
          roughness={0.1} metalness={0.7} transparent opacity={0.35} wireframe={false}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[0.34, 0.34, 0.34]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.18} wireframe />
      </mesh>
      {/* Inner circuit sphere */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// ─── OpenAI: neural sphere ─────────────────────────────────────────────────────
function NeuralObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const neuronCount = 12;
  const neurons = useMemo(() =>
    Array.from({ length: neuronCount }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / neuronCount);
      const theta = Math.sqrt(neuronCount * Math.PI) * phi;
      return new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * 0.22,
        Math.sin(theta) * Math.sin(phi) * 0.22,
        Math.cos(phi) * 0.22
      );
    }), []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.35;
  });

  return (
    <group ref={ref}>
      {/* Shell */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.6 : 0.15} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Neurons */}
      {neurons.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
      ))}
      {/* Connections */}
      {neurons.slice(0, 8).map((a, i) => {
        const b = neurons[(i + 3) % neuronCount];
        return <Line key={i} points={[a, b]} color={color} lineWidth={0.5} transparent opacity={0.4} />;
      })}
    </group>
  );
}

// ─── Google Maps: mini holographic globe ──────────────────────────────────────
function GlobeObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.6;
  });

  const latLines = useMemo(() => {
    return [-0.5, 0, 0.5].map((lat) => {
      const r = Math.cos(lat * Math.PI * 0.9) * 0.22;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, lat * 0.22, Math.sin(a) * r));
      }
      return pts;
    });
  }, []);

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.5 : 0.15} transparent opacity={0.18} wireframe />
      </mesh>
      {latLines.map((pts, i) => (
        <Line key={i} points={pts} color={color} lineWidth={0.8} transparent opacity={0.55} />
      ))}
      {/* Location pin beam */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.18, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.0} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.0} />
      </mesh>
    </group>
  );
}

// ─── BLE: Signal transmitter with wave pulses ──────────────────────────────────
function SignalObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rings.current.forEach((ring, i) => {
      if (ring) {
        const phase = (t * 0.9 + i * 0.5) % 1;
        ring.scale.setScalar(0.3 + phase * 1.8);
        (ring.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.5;
      }
    });
  });

  return (
    <group ref={ref}>
      {/* Core emitter */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.1, 0.22, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1.5 : 0.6} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Expanding pulse rings */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) rings.current[i] = el; }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.15, 0.008, 8, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Socket.IO: pulsing satellite ─────────────────────────────────────────────
function SatelliteObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.z = Math.sin(t * 0.5) * 0.15;
    }
  });
  return (
    <group ref={ref}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.12, 0.12, 0.24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.9 : 0.3} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Solar panels */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.28, 0, 0]}>
          <boxGeometry args={[0.24, 0.12, 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.7} metalness={0.6} />
        </mesh>
      ))}
      {/* Antenna */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.22, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// ─── Riverpod: water ripple sphere ────────────────────────────────────────────
function RippleObject({ color, active }: { color: string; active: boolean }) {
  const rings = useRef<THREE.Mesh[]>([]);
  const core = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rings.current.forEach((ring, i) => {
      if (ring) {
        const phase = (t * 0.6 + i * 0.33) % 1;
        ring.scale.setScalar(0.5 + phase * 2.2);
        (ring.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * (active ? 0.6 : 0.35);
      }
    });
    if (core.current) {
      (core.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(t * 2) * 0.2 + (active ? 0.4 : 0);
    }
  });
  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.85} roughness={0.05} metalness={0.3} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { if (el) rings.current[i] = el; }}>
          <ringGeometry args={[0.14, 0.165, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Bloc: interconnected floating glass cubes ────────────────────────────────
function BlocObject({ color, active }: { color: string; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const offsets: [number, number, number][] = [
    [0.2, 0.2, 0], [-0.2, 0.2, 0], [0, -0.2, 0.2], [0, 0.2, -0.2]
  ];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = t * 0.45;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.6;
      innerRef.current.rotation.z = t * 0.3;
    }
  });
  return (
    <group ref={groupRef}>
      {offsets.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color={color} emissive={color}
            emissiveIntensity={active ? 0.9 : 0.3}
            transparent opacity={0.65 - i * 0.05}
            roughness={0.05} metalness={0.7}
          />
        </mesh>
      ))}
      <mesh ref={innerRef}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} transparent opacity={0.9} />
      </mesh>
      {offsets.map((pos, i) => (
        <Line
          key={i}
          points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(...pos)]}
          color={color}
          lineWidth={0.6}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}

// ─── Supabase: data tower ─────────────────────────────────────────────────────
function TowerObject({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const streaks = useRef<{ y: number; speed: number }[]>(
    Array.from({ length: 5 }, (_, i) => ({ y: i * 0.12 - 0.3, speed: 0.4 + i * 0.08 }))
  );
  const streakMeshes = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = t * 0.3;
    streaks.current.forEach((s, i) => {
      s.y = (s.y + s.speed * 0.004) % 0.65 - 0.3;
      if (streakMeshes.current[i]) {
        streakMeshes.current[i].position.y = s.y;
      }
    });
  });

  return (
    <group ref={ref}>
      {/* Disk layers */}
      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.18 - i * 0.02, 0.18 - i * 0.02, 0.06, 24]} />
          <meshStandardMaterial
            color={color} emissive={color}
            emissiveIntensity={active ? 0.8 : 0.25}
            metalness={0.85} roughness={0.1}
            transparent opacity={0.85}
          />
        </mesh>
      ))}
      {/* Data streaks */}
      {streaks.current.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) streakMeshes.current[i] = el; }}
          position={[0, 0, 0]}
        >
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Tech object selector ─────────────────────────────────────────────────────
function TechObject({ type, color, active }: { type: string; color: string; active: boolean }) {
  switch (type) {
    case "crystal": return <CrystalObject color={color} active={active} />;
    case "cube":    return <CubeObject color={color} active={active} />;
    case "neural":  return <NeuralObject color={color} active={active} />;
    case "globe":   return <GlobeObject color={color} active={active} />;
    case "signal":  return <SignalObject color={color} active={active} />;
    case "satellite": return <SatelliteObject color={color} active={active} />;
    case "ripple":  return <RippleObject color={color} active={active} />;
    case "cubes":   return <BlocObject color={color} active={active} />;
    case "tower":   return <TowerObject color={color} active={active} />;
    default:        return <Sphere args={[0.15]}><meshStandardMaterial color={color} /></Sphere>;
  }
}

// ─── Energy flow line from core to tech ───────────────────────────────────────
function EnergyFlow({ from, to, color, active }: {
  from: THREE.Vector3; to: THREE.Vector3; color: string; active: boolean;
}) {
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.opacity = active
        ? 0.55 + Math.sin(t * 4) * 0.2
        : 0.06 + Math.sin(t * 1.5 + from.x) * 0.03;
    }
  });
  return (
    <Line
      ref={ref}
      points={[from, to]}
      color={active ? color : "#4F8CFF"}
      lineWidth={active ? 1.4 : 0.4}
      transparent
      opacity={active ? 0.6 : 0.07}
      dashed={!active}
      dashScale={active ? 1 : 8}
    />
  );
}

// ─── Single tech node (object + label + hover card) ───────────────────────────
function TechNode({
  tech,
  isActive,
  onHover,
}: {
  tech: (typeof TECHS)[0];
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const scaleTarget = useRef(1);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    scaleTarget.current += (( isActive ? 1.35 : 1.0) - scaleTarget.current) * 0.08;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleTarget.current);
      groupRef.current.position.y =
        tech.position[1] + Math.sin(t * 0.7 + tech.position[0]) * 0.08;
    }
  });

  return (
    <group
      ref={groupRef}
      position={tech.position}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(tech.id); }}
      onPointerLeave={() => onHover(null)}
    >
      <TechObject type={tech.type} color={tech.color} active={isActive} />

      {/* Glow sphere on hover */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshBasicMaterial color={tech.color} transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Label */}
      <Html
        center
        position={[0, -0.42, 0]}
        zIndexRange={[0, 15]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className="text-center select-none whitespace-nowrap px-2 py-0.5 rounded-full transition-all duration-300"
          style={{
            background: isActive ? `${tech.color}22` : "transparent",
            border: isActive ? `1px solid ${tech.color}55` : "1px solid transparent",
          }}
        >
          <span
            className="text-[8px] font-mono font-bold uppercase tracking-[0.2em]"
            style={{ color: isActive ? tech.color : "rgba(255,255,255,0.55)" }}
          >
            {tech.label}
          </span>
        </div>
      </Html>

      {/* Hover info card */}
      {isActive && (
        <Html
          position={[0, 0.65, 0]}
          zIndexRange={[20, 50]}
          distanceFactor={5}
          style={{ pointerEvents: "none", width: "200px" }}
        >
          <div
            className="rounded-xl p-3 border backdrop-blur-xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, rgba(5,5,5,0.92), ${tech.color}18)`,
              borderColor: `${tech.color}44`,
              boxShadow: `0 0 24px ${tech.color}33`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: tech.color }} />
              <span className="text-[9px] font-mono font-black uppercase tracking-widest" style={{ color: tech.color }}>
                {tech.label}
              </span>
            </div>
            <p className="text-[8px] text-white/70 leading-relaxed font-sans mb-2">{tech.details}</p>
            <div className="border-t border-white/10 pt-1.5">
              <div className="text-[7px] uppercase tracking-widest text-white/30 font-mono mb-1">Used In</div>
              <div className="flex flex-wrap gap-1">
                {tech.projects.map((p) => (
                  <span key={p} className="text-[7px] px-1.5 py-0.5 rounded font-mono"
                    style={{ background: `${tech.color}20`, color: tech.color, border: `1px solid ${tech.color}40` }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ─── Ambient star field ────────────────────────────────────────────────────────
function StarField() {
  const count = 250;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 5;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.008;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#aaccff" size={0.018} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// ─── Nebula fog planes ─────────────────────────────────────────────────────────
function NebulaLayer() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.02;
      ref.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <planeGeometry args={[18, 18]} />
      <meshBasicMaterial color="#1a3a6e" transparent opacity={0.04} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── Cinematic camera controller ──────────────────────────────────────────────
function CameraController({ activeTech }: { activeTech: string | null }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const mouseRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = ((e.clientX / window.innerWidth) - 0.5) * 0.7;
      mouseRef.current.ty = ((e.clientY / window.innerHeight) - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = mouseRef.current;
    m.x += (m.tx - m.x) * 0.04;
    m.y += (m.ty - m.y) * 0.04;

    if (activeTech) {
      const tech = TECHS.find((t) => t.id === activeTech);
      if (tech) {
        targetPos.current.set(
          tech.position[0] * 0.35 + m.x * 0.5,
          tech.position[1] * 0.25 + m.y * -0.5,
          5.2
        );
      }
    } else {
      targetPos.current.set(
        Math.sin(t * 0.08) * 0.5 + m.x * 0.8,
        Math.cos(t * 0.06) * 0.2 + m.y * -0.5,
        6.8 + Math.sin(t * 0.12) * 0.2
      );
    }

    camera.position.lerp(targetPos.current, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function GalaxyScene() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const origin = new THREE.Vector3(0, 0, 0);

  if (!mounted) return (
    <div className="w-full h-[680px] flex items-center justify-center">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#4F8CFF] animate-pulse">
        Initializing Universe…
      </div>
    </div>
  );

  return (
    <div className="w-full h-[680px] relative select-none" style={{ overflow: 'visible' }}>
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 58 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", overflow: "visible" }}
      >
        <CameraController activeTech={activeId} />

        {/* Lighting rig */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 4]} intensity={2.2} color="#4F8CFF" castShadow />
        <directionalLight position={[-5, -4, -3]} intensity={1.0} color="#6FE7FF" />
        <pointLight position={[0, 0, 2]} intensity={2.0} color="#ffffff" />
        <pointLight position={[3, 3, 1]} intensity={0.8} color="#4F8CFF" />
        <pointLight position={[-3, -3, 1]} intensity={0.6} color="#6FE7FF" />
        <Environment preset="night" />

        <Suspense fallback={null}>
          {/* Background */}
          <StarField />
          <NebulaLayer />

          <Sparkles count={60} scale={8} size={1.5} speed={0.2} opacity={0.3} color="#6FE7FF" />

          {/* Energy lines from core to each tech */}
          {TECHS.map((tech) => (
            <EnergyFlow
              key={tech.id}
              from={origin}
              to={new THREE.Vector3(...tech.position)}
              color={tech.color}
              active={activeId === tech.id}
            />
          ))}

          {/* Flutter Core */}
          <FlutterCore hovered={activeId === null} />

          {/* Tech objects */}
          {TECHS.map((tech) => (
            <TechNode
              key={tech.id}
              tech={tech}
              isActive={activeId === tech.id}
              onHover={setActiveId}
            />
          ))}
        </Suspense>

        <ContactShadows
          position={[0, -3.2, 0]}
          opacity={0.25}
          scale={12}
          blur={3}
          far={6}
          color="#4F8CFF"
        />
      </Canvas>

      {/* Hint overlay */}
      {!activeId && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase tracking-[0.25em] text-white/25 pointer-events-none">
          Hover any object to explore
        </div>
      )}
    </div>
  );
}
