"use client";

import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sparkles,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

// ─── Tech data ─────────────────────────────────────────────────────────────────
export const TECHS = [
  {
    id: "firebase",
    label: "Firebase",
    color: "#FFA611",
    orbit: { radius: 2.8, speed: 0.22, tilt: 0.15, phase: 0 },
    details: "Auth · Firestore · Cloud Functions · Push Notifications",
    projects: ["Sathee", "Trop C'est Trop", "Main Street Media"],
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#68A063",
    orbit: { radius: 3.4, speed: 0.17, tilt: -0.25, phase: Math.PI * 0.7 },
    details: "REST APIs · Microservices · Express · Socket Server",
    projects: ["Zembora"],
  },
  {
    id: "openai",
    label: "OpenAI",
    color: "#10A37F",
    orbit: { radius: 2.4, speed: 0.28, tilt: 0.4, phase: Math.PI * 1.4 },
    details: "AI disease analysis · GPT assistants · Real-time diagnostics",
    projects: ["Medentum Diagnostick", "Zembora"],
  },
  {
    id: "googlemaps",
    label: "Google Maps",
    color: "#4285F4",
    orbit: { radius: 3.1, speed: 0.19, tilt: -0.1, phase: Math.PI * 0.35 },
    details: "Geofencing · Live routing · Address search · ETA overlays",
    projects: ["Zembora"],
  },
  {
    id: "ble",
    label: "BLE / IoT",
    color: "#007AFF",
    orbit: { radius: 2.6, speed: 0.24, tilt: 0.55, phase: Math.PI * 1.0 },
    details: "GATT streaming · O₂ · Heart rate · Real-time hardware sensors",
    projects: ["Medentum Diagnostick"],
  },
  {
    id: "socketio",
    label: "Socket.IO",
    color: "#EEEEEE",
    orbit: { radius: 3.6, speed: 0.15, tilt: 0.05, phase: Math.PI * 1.7 },
    details: "Rider-driver sync · Multi-user chat · Low-latency channels",
    projects: ["Zembora", "Orra"],
  },
  {
    id: "riverpod",
    label: "Riverpod",
    color: "#47A1E2",
    orbit: { radius: 2.2, speed: 0.3, tilt: -0.35, phase: Math.PI * 0.5 },
    details: "Async state · Scoped providers · Education platform architecture",
    projects: ["Sathee", "Medentum Diagnostick"],
  },
  {
    id: "bloc",
    label: "Bloc",
    color: "#02569B",
    orbit: { radius: 3.0, speed: 0.2, tilt: 0.3, phase: Math.PI * 1.2 },
    details: "Event-driven state · Enterprise routing · Business layer isolation",
    projects: ["Main Street Media"],
  },
  {
    id: "supabase",
    label: "Supabase",
    color: "#3ECF8E",
    orbit: { radius: 2.9, speed: 0.21, tilt: -0.5, phase: Math.PI * 0.15 },
    details: "PostgreSQL · Realtime sync · Leaderboard APIs",
    projects: ["Prutor Games"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  CUSTOM SHADER MATERIALS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Nebula background shader ─────────────────────────────────────────────────
const nebulaVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const nebulaFragmentShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv - vec2(0.5);
  float dist = length(uv);
  
  // High-performance smooth radial color blends
  float glow1 = smoothstep(0.75, 0.0, dist);
  float glow2 = pow(smoothstep(0.48, 0.0, dist), 2.5);
  
  vec3 bgVoid = vec3(0.015, 0.02, 0.045);
  vec3 deepBlue = vec3(0.04, 0.09, 0.22);
  vec3 cyanGlow = vec3(0.08, 0.28, 0.42);
  
  // Mix layers
  vec3 color = mix(bgVoid, deepBlue, glow1);
  color = mix(color, cyanGlow, glow2 * 0.35);
  
  // Dynamic slow pulse
  float pulse = 0.95 + sin(uTime * 0.4) * 0.05;
  color *= pulse;
  
  // Soft vignette edge fade
  float edgeFade = smoothstep(0.75, 0.4, dist);
  
  gl_FragColor = vec4(color * edgeFade, 0.8);
}
`;

// ─── Core glow shader ─────────────────────────────────────────────────────────
const coreVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const coreFragmentShader = `
uniform float uTime;
uniform float uHovered;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  float t = uTime;
  
  // Fresnel rim glow
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
  
  // Pulsing core
  float pulse = 0.7 + sin(t * 2.0) * 0.15 + sin(t * 3.7) * 0.08;
  pulse += uHovered * 0.3;
  
  // Energy bands rolling across surface
  float bands = sin(vPosition.y * 12.0 + t * 3.0) * 0.5 + 0.5;
  bands *= sin(vPosition.x * 8.0 - t * 2.0) * 0.5 + 0.5;
  
  vec3 coreColor = vec3(0.25, 0.55, 1.0);
  vec3 glowColor = vec3(0.4, 0.85, 1.0);
  vec3 hotColor = vec3(0.7, 0.9, 1.0);
  
  vec3 color = mix(coreColor, glowColor, fresnel);
  color = mix(color, hotColor, bands * 0.3 * pulse);
  color += glowColor * fresnel * 1.5 * pulse;
  
  float alpha = 0.85 + fresnel * 0.15;
  
  gl_FragColor = vec4(color * pulse, alpha);
}
`;

// ─── Energy beam shader ─────────────────────────────────────────────────────
const beamVertexShader = `
uniform float uTime;
uniform float uActive;
uniform vec3 uEndPosition;
attribute float aOffset;
varying float vAlpha;
varying float vOffset;

void main() {
  vOffset = aOffset;
  float t = aOffset;
  
  // Bezier curve computed entirely on the GPU!
  vec3 start = vec3(0.0);
  vec3 end = uEndPosition;
  vec3 mid = end * 0.5 + vec3(0.0, 0.22, 0.0);
  
  float oneMinusT = 1.0 - t;
  vec3 curvePosition = oneMinusT * oneMinusT * start + 2.0 * oneMinusT * t * mid + t * t * end;
  
  // Pulse travelling along the beam
  float travel = fract(uTime * 0.8 - t * 0.5);
  float pulse = smoothstep(0.0, 0.1, travel) * smoothstep(0.5, 0.1, travel);
  
  vAlpha = mix(0.03, 0.15, pulse) + uActive * mix(0.1, 0.6, pulse);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(curvePosition, 1.0);
}
`;

const beamFragmentShader = `
uniform vec3 uColor;
uniform float uActive;
varying float vAlpha;
varying float vOffset;

void main() {
  vec3 color = uColor;
  float a = vAlpha;
  gl_FragColor = vec4(color, a);
}
`;

// ─── Node glow halo shader ─────────────────────────────────────────────────
const haloVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const haloFragmentShader = `
uniform vec3 uColor;
uniform float uTime;
uniform float uActive;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  float dist = distance(vUv, center);
  
  // Soft radial falloff
  float glow = smoothstep(0.5, 0.0, dist);
  glow = pow(glow, 2.0);
  
  // Pulsing
  float pulse = 0.6 + sin(uTime * 3.0) * 0.2;
  
  float alpha = glow * mix(0.04, 0.25 * pulse, uActive);
  
  gl_FragColor = vec4(uColor, alpha);
}
`;

// ═══════════════════════════════════════════════════════════════════════════════
//  DEEP SPACE PARTICLE FIELD
// ═══════════════════════════════════════════════════════════════════════════════
function DeepSpaceField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 14;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sz[i] = 0.3 + Math.random() * 1.8;

      const temp = Math.random();
      if (temp < 0.3) {
        col[i * 3] = 0.6; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 1.0;
      } else if (temp < 0.6) {
        col[i * 3] = 0.4; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 1.0;
      } else if (temp < 0.85) {
        col[i * 3] = 0.9; col[i * 3 + 1] = 0.95; col[i * 3 + 2] = 1.0;
      } else {
        col[i * 3] = 0.5; col[i * 3 + 1] = 0.6; col[i * 3 + 2] = 1.0;
      }
    }
    return { positions: pos, sizes: sz, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.003) * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.03}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  NEBULA BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════
function NebulaBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry args={[30, 22]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FLUTTER ENERGY CORE — Shader-powered plasma sphere
// ═══════════════════════════════════════════════════════════════════════════════
function FlutterCore({ hovered }: { hovered: boolean }) {
  const coreMatRef = useRef<THREE.ShaderMaterial>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const hover = hovered ? 1.0 : 0.0;

    if (coreMatRef.current) {
      coreMatRef.current.uniforms.uTime.value = t;
      coreMatRef.current.uniforms.uHovered.value +=
        (hover - coreMatRef.current.uniforms.uHovered.value) * 0.06;
    }

    const baseScale = hovered ? 1.15 : 1.0;
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.5;
      ringA.current.rotation.x = t * 0.15;
      ringA.current.scale.setScalar(baseScale);
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.35;
      ringB.current.rotation.x = Math.PI / 3 + t * 0.1;
      ringB.current.scale.setScalar(baseScale);
    }
    if (ringC.current) {
      ringC.current.rotation.y = t * 0.4;
      ringC.current.rotation.x = Math.PI / 4;
      ringC.current.scale.setScalar(baseScale);
    }

    if (outerGlowRef.current) {
      const pulse = 1.8 + Math.sin(t * 1.5) * 0.15;
      outerGlowRef.current.scale.setScalar(pulse * baseScale);
      (outerGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 2) * 0.015 + (hovered ? 0.04 : 0);
    }
    if (innerGlowRef.current) {
      const ipulse = 1.2 + Math.sin(t * 2.5) * 0.1;
      innerGlowRef.current.scale.setScalar(ipulse * baseScale);
      (innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 3) * 0.03 + (hovered ? 0.06 : 0);
    }
  });

  return (
    <group>
      {/* Outer atmospheric glow */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#4F8CFF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow shell */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#6FE7FF"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Shader-powered core */}
      <mesh>
        <sphereGeometry args={[0.3, 64, 64]} />
        <shaderMaterial
          ref={coreMatRef}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uHovered: { value: 0 },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital rings with emission */}
      {[
        { ref: ringA, radius: 0.55, tube: 0.006, opacity: 0.6 },
        { ref: ringB, radius: 0.65, tube: 0.004, opacity: 0.4 },
        { ref: ringC, radius: 0.75, tube: 0.003, opacity: 0.25 },
      ].map(({ ref, radius, tube, opacity }, i) => (
        <mesh key={i} ref={ref}>
          <torusGeometry args={[radius, tube, 16, 100]} />
          <meshBasicMaterial
            color="#6FE7FF"
            transparent
            opacity={opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* "Flutter Core" label — SDF GPU-rendered text */}
      <Text
        position={[0, -0.95, 0]}
        fontSize={0.09}
        color="#4F8CFF"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.25}
      >
        FLUTTER CORE
      </Text>
      <Text
        position={[0, -1.08, 0]}
        fontSize={0.065}
        color="rgba(255,255,255,0.22)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        ECOSYSTEM HUB
      </Text>
    </group>
  );
}

// ─── Custom 3D Shape Components for Nodes ──────────────────────────────────────

function CrystalNode({ color, active }: { color: string; active: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.6;
      outerRef.current.rotation.x = Math.sin(t * 0.3) * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.9;
      innerRef.current.scale.setScalar(0.4 + Math.sin(t * 4.0) * 0.05);
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.0 : 0.3}
          transparent
          opacity={0.65}
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function CubeNode({ color, active }: { color: string; active: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = t * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[0.24, 0.24, 0.24]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.1}
          transmission={0.9}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={active ? 0.8 : 0.25} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 2.5 : 0.8} />
      </mesh>
    </group>
  );
}

function NeuralNode({ color, active }: { color: string; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  const numPoints = 8;
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < numPoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.15;
      pts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4;
    }
    if (shellRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.5) * 0.05;
      shellRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={shellRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          transmission={0.9}
          roughness={0.1}
          depthWrite={false}
        />
      </mesh>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}

      {nodes.map((pos, i) => {
        const next = nodes[(i + 3) % numPoints];
        const lineGeo = new THREE.BufferGeometry().setFromPoints([pos, next]);
        return (
          <primitive key={i} object={new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({
              color,
              transparent: true,
              opacity: active ? 0.7 : 0.25,
              blending: THREE.AdditiveBlending
            })
          )} />
        );
      })}
    </group>
  );
}

function GlobeNode({ color, active }: { color: string; active: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const pinRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.45;
    }
    if (pinRef.current) {
      pinRef.current.position.y = 0.15 + Math.abs(Math.sin(t * 4)) * 0.04;
    }
  });

  return (
    <group>
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={active ? 0.6 : 0.25} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.145, 16, 16]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.2}
            roughness={0.5}
            transmission={0.8}
          />
        </mesh>
      </group>

      <mesh ref={pinRef} position={[0, 0.17, 0]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 3.0 : 1.0} />
      </mesh>
    </group>
  );
}

function SignalNode({ color, active }: { color: string; active: boolean }) {
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beaconRef.current) {
      beaconRef.current.rotation.y = t * 1.5;
    }
    ringRefs.current.forEach((ring, idx) => {
      if (ring) {
        const progress = ((t * 0.8) + idx * 0.33) % 1;
        ring.scale.setScalar(0.2 + progress * 1.4);
        (ring.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * (active ? 0.6 : 0.25);
      }
    });
  });

  return (
    <group>
      <mesh ref={beaconRef}>
        <cylinderGeometry args={[0.02, 0.04, 0.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 3.0 : 1.0} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el; }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.18, 0.004, 8, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function SatelliteNode({ color, active }: { color: string; active: boolean }) {
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = t * 0.3;
      satelliteRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={satelliteRef}>
      <mesh>
        <boxGeometry args={[0.08, 0.08, 0.14]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.12, 0, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.12, 0, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.01]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.04, 0.01, 0.05, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function RippleNode({ color, active }: { color: string; active: boolean }) {
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringARef.current) {
      ringARef.current.rotation.x = t * 0.3;
      ringARef.current.rotation.y = t * 0.5;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.x = -t * 0.4;
      ringBRef.current.rotation.z = t * 0.6;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 2.5 : 1.0} />
      </mesh>
      <mesh ref={ringARef}>
        <torusGeometry args={[0.14, 0.005, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.75 : 0.3} />
      </mesh>
      <mesh ref={ringBRef}>
        <torusGeometry args={[0.2, 0.003, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.45 : 0.15} />
      </mesh>
    </group>
  );
}

function BlocNode({ color, active }: { color: string; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.6;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -t * 0.4;
      coreRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 2.0 : 0.8} />
      </mesh>

      <group ref={groupRef}>
        <mesh position={[0.15, 0.08, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color={color} roughness={0.1} />
        </mesh>
        <mesh position={[-0.15, -0.08, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshStandardMaterial color={color} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.1, 0.12]}>
          <boxGeometry args={[0.035, 0.035, 0.035]} />
          <meshStandardMaterial color={color} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.1, -0.12]}>
          <boxGeometry args={[0.035, 0.035, 0.035]} />
          <meshStandardMaterial color={color} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

function TowerNode({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={ref}>
      {[-0.1, 0, 0.1].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.03, 16]} />
            <meshPhysicalMaterial
              color={color}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh scale={[1.05, 1.05, 1.05]}>
            <cylinderGeometry args={[0.131, 0.131, 0.005, 16]} />
            <meshBasicMaterial color={color} transparent opacity={active ? 0.8 : 0.3} />
          </mesh>
        </group>
      ))}

      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.22, 8]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

function NodeShape({ id, color, active }: { id: string; color: string; active: boolean }) {
  switch (id) {
    case "firebase":
      return <CrystalNode color={color} active={active} />;
    case "nodejs":
      return <CubeNode color={color} active={active} />;
    case "openai":
      return <NeuralNode color={color} active={active} />;
    case "googlemaps":
      return <GlobeNode color={color} active={active} />;
    case "ble":
      return <SignalNode color={color} active={active} />;
    case "socketio":
      return <SatelliteNode color={color} active={active} />;
    case "riverpod":
      return <RippleNode color={color} active={active} />;
    case "bloc":
      return <BlocNode color={color} active={active} />;
    case "supabase":
      return <TowerNode color={color} active={active} />;
    default:
      return (
        <mesh>
          <icosahedronGeometry args={[0.18, 1]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HOLOGRAPHIC TECH NODE
// ═══════════════════════════════════════════════════════════════════════════════
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
  const haloRef = useRef<THREE.ShaderMaterial>(null);
  const scaleAnim = useRef(1);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const { radius, speed, tilt, phase } = tech.orbit;

    const angle = t * speed + phase;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius * 0.4;
    const y = Math.sin(angle) * Math.sin(tilt) * radius * 0.35
      + Math.sin(t * 0.5 + phase) * 0.15;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);

      const targetScale = isActive ? 1.4 : 1.0;
      scaleAnim.current += (targetScale - scaleAnim.current) * 0.08;
      groupRef.current.scale.setScalar(scaleAnim.current);
    }

    if (haloRef.current) {
      haloRef.current.uniforms.uTime.value = t;
      const activeTarget = isActive ? 1.0 : 0.0;
      haloRef.current.uniforms.uActive.value +=
        (activeTarget - haloRef.current.uniforms.uActive.value) * 0.08;
    }
  });

  const techColor = useMemo(() => new THREE.Color(tech.color), [tech.color]);

  return (
    <group ref={groupRef}>
      {/* Halo glow plane */}
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 1.2]} />
        <shaderMaterial
          ref={haloRef}
          vertexShader={haloVertexShader}
          fragmentShader={haloFragmentShader}
          uniforms={{
            uColor: { value: techColor },
            uTime: { value: 0 },
            uActive: { value: 0 },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Interactive hit area */}
      <mesh
        onPointerEnter={(e) => { e.stopPropagation(); onHover(tech.id); }}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Dynamic custom 3D shape based on the tech stack node */}
      <NodeShape id={tech.id} color={tech.color} active={isActive} />

      {/* Node Text Label (SDF WebGL rendering, 100% smooth, 0% DOM lag) */}
      <Text
        position={[0, -0.45, 0]}
        fontSize={0.085}
        color={isActive ? tech.color : "rgba(255,255,255,0.45)"}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        {tech.label.toUpperCase()}
      </Text>

      {/* Micro particles around active node */}
      {isActive && (
        <Sparkles
          count={20}
          scale={0.8}
          size={1.5}
          speed={0.8}
          opacity={0.5}
          color={tech.color}
        />
      )}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ORBITAL RING MARKERS — subtle orbital path indicators
// ═══════════════════════════════════════════════════════════════════════════════
function OrbitalRings({ activeId }: { activeId: string | null }) {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return TECHS.map((t) => {
      const r = t.orbit.radius;
      const pts: THREE.Vector3[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r * 0.4;
        const y = Math.sin(angle) * Math.sin(t.orbit.tilt) * r * 0.35;
        pts.push(new THREE.Vector3(x, y, z));
      }
      return { id: t.id, color: t.color, pts };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.02;
    }
  });

  const lineObjects = useMemo(() => {
    return rings.map((ring) => {
      const geo = new THREE.BufferGeometry().setFromPoints(ring.pts);
      const mat = new THREE.LineBasicMaterial({
        color: ring.color,
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return { id: ring.id, line: new THREE.Line(geo, mat) };
    });
  }, [rings]);

  useFrame(() => {
    lineObjects.forEach(({ id, line }) => {
      const mat = line.material as THREE.LineBasicMaterial;
      const targetOpacity = activeId === id ? 0.35 : 0.03;
      mat.opacity += (targetOpacity - mat.opacity) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {lineObjects.map(({ line, id }) => (
        <primitive key={id} object={line} />
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FLOATING DUST PARTICLES — near the core
// ═══════════════════════════════════════════════════════════════════════════════
function CoreDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 2.0;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.6;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#6FE7FF"
        size={0.01}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CONSTELLATION ORBIT STREAM — cosmic dust trails orbiting
// ═══════════════════════════════════════════════════════════════════════════════
function ConstellationStream() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 72; // 8 particles per orbit path

  const { positions, sizes, speeds, orbits } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const spd = new Float32Array(count);
    const orb = TECHS.map((t, idx) => ({
      radius: t.orbit.radius,
      tilt: t.orbit.tilt,
      speed: t.orbit.speed,
      phaseOffset: (idx * Math.PI * 2) / TECHS.length,
    }));

    for (let i = 0; i < count; i++) {
      sz[i] = 1.0 + Math.random() * 1.5;
      spd[i] = 0.5 + Math.random() * 0.8;
    }
    return { positions: pos, sizes: sz, speeds: spd, orbits: orb };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const arr = pointsRef.current?.geometry.attributes.position.array as Float32Array;
    if (!arr) return;

    for (let i = 0; i < count; i++) {
      const orbitIdx = i % TECHS.length;
      const orb = orbits[orbitIdx];
      
      const particleIdxInOrbit = Math.floor(i / TECHS.length);
      const phase = orb.phaseOffset + t * orb.speed * speeds[i] + (particleIdxInOrbit * Math.PI * 2) / 8;
      
      const x = Math.cos(phase) * orb.radius;
      const z = Math.sin(phase) * orb.radius * 0.4;
      const y = Math.sin(phase) * Math.sin(orb.tilt) * orb.radius * 0.35;

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    pointsRef.current!.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#6FE7FF"
        size={0.025}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HOLOGRAM GRID — holographic concentric base grid
// ═══════════════════════════════════════════════════════════════════════════════
function HologramGrid() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <ringGeometry args={[0.8, 4.0, 64, 1]} />
      <meshBasicMaterial
        color="#4F8CFF"
        wireframe
        transparent
        opacity={0.015}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CINEMATIC CAMERA CONTROLLER
// ═══════════════════════════════════════════════════════════════════════════════
function CameraController({ activeTech }: { activeTech: string | null }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.5, 7));
  const mouseRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = ((e.clientX / window.innerWidth) - 0.5) * 0.6;
      mouseRef.current.ty = ((e.clientY / window.innerHeight) - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = mouseRef.current;
    m.x += (m.tx - m.x) * 0.03;
    m.y += (m.ty - m.y) * 0.03;

    if (activeTech) {
      const tech = TECHS.find((tc) => tc.id === activeTech);
      if (tech) {
        const { radius, speed, tilt, phase } = tech.orbit;
        const angle = t * speed + phase;
        const tx = Math.cos(angle) * radius * 0.25;
        const ty = Math.sin(angle) * Math.sin(tilt) * radius * 0.15;

        targetPos.current.set(
          tx + m.x * 0.4,
          0.3 + ty + m.y * -0.3,
          5.8
        );
      }
    } else {
      targetPos.current.set(
        Math.sin(t * 0.06) * 0.3 + m.x * 0.7,
        0.3 + Math.cos(t * 0.04) * 0.15 + m.y * -0.4,
        7.0 + Math.sin(t * 0.08) * 0.15
      );
    }

    camera.position.lerp(targetPos.current, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STATUS BAR — bottom HUD
// ═══════════════════════════════════════════════════════════════════════════════
function StatusBar({ activeId }: { activeId: string | null }) {
  const activeTech = activeId ? TECHS.find((t) => t.id === activeId) : null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-between px-5 pointer-events-none z-20">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: activeTech ? activeTech.color : "#4F8CFF",
              boxShadow: `0 0 6px ${activeTech ? activeTech.color : "#4F8CFF"}`,
            }}
          />
          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">
            {activeTech ? `Locked: ${activeTech.label}` : "Scanning Ecosystem"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[7px] font-mono uppercase tracking-[0.15em] text-white/20">
          {TECHS.length} Nodes • Orbital View
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function GalaxyScene({
  activeId: externalActiveId,
  onActiveChange,
}: {
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
}) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeId = externalActiveId !== undefined ? externalActiveId : internalActiveId;
  const setActiveId = (id: string | null) => {
    if (externalActiveId !== undefined) {
      onActiveChange?.(id);
    } else {
      setInternalActiveId(id);
    }
  };

  if (!mounted)
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border border-[#4F8CFF]/30 rounded-full animate-spin" style={{
            borderTopColor: "#4F8CFF",
          }} />
          <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#4F8CFF]/60">
            Initializing Galaxy…
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full h-[600px] relative select-none" style={{ overflow: "visible" }}>
      {/* Top scanline effect */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.15), rgba(111,231,255,0.1), transparent)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 52 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", overflow: "visible" }}
      >
        <CameraController activeTech={activeId} />

        {/* Minimal lighting — we use shaders + emissives */}
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 0, 2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[5, 3, 3]} intensity={0.5} color="#4F8CFF" />
        <pointLight position={[-4, -2, 2]} intensity={0.3} color="#6FE7FF" />

        <Suspense fallback={null}>
          {/* Deep space */}
          <NebulaBackground />
          <DeepSpaceField />
          <CoreDust />
          <ConstellationStream />
          <HologramGrid />

          {/* Ambient sparkles */}
          <Sparkles count={40} scale={10} size={1.2} speed={0.15} opacity={0.2} color="#6FE7FF" />

          {/* Orbital path indicators */}
          <OrbitalRings activeId={activeId} />

          {/* Energy beams from core to each tech */}
          {TECHS.map((tech) => (
            <EnergyBeamDynamic
              key={tech.id}
              techOrbit={tech.orbit}
              color={tech.color}
              active={activeId === tech.id}
            />
          ))}

          {/* Flutter Core */}
          <FlutterCore hovered={activeId === null} />

          {/* Tech nodes in orbit */}
          {TECHS.map((tech) => (
            <TechNode
              key={tech.id}
              tech={tech}
              isActive={activeId === tech.id}
              onHover={setActiveId}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Status bar HUD */}
      <StatusBar activeId={activeId} />

      {/* Bottom scanline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.1), rgba(111,231,255,0.08), transparent)",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DYNAMIC ENERGY BEAM — follows orbiting node position
// ═══════════════════════════════════════════════════════════════════════════════
function EnergyBeamDynamic({
  techOrbit,
  color,
  active,
}: {
  techOrbit: { radius: number; speed: number; tilt: number; phase: number };
  color: string;
  active: boolean;
}) {
  const segCount = 48;
  const col = useMemo(() => new THREE.Color(color), [color]);

  const { lineObj } = useMemo(() => {
    const offs = new Float32Array(segCount);
    for (let i = 0; i < segCount; i++) {
      offs[i] = i / (segCount - 1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segCount * 3), 3));
    geo.setAttribute("aOffset", new THREE.BufferAttribute(offs, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: beamVertexShader,
      fragmentShader: beamFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: col },
        uActive: { value: 0 },
        uEndPosition: { value: new THREE.Vector3(0, 0, 0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { lineObj: new THREE.Line(geo, mat) };
  }, [col]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const { radius, speed, tilt, phase } = techOrbit;
    const angle = t * speed + phase;

    const endX = Math.cos(angle) * radius;
    const endZ = Math.sin(angle) * radius * 0.4;
    const endY = Math.sin(angle) * Math.sin(tilt) * radius * 0.35
      + Math.sin(t * 0.5 + phase) * 0.15;

    const mat = lineObj.material as THREE.ShaderMaterial;
    mat.uniforms.uEndPosition.value.set(endX, endY, endZ);
    mat.uniforms.uTime.value = t;
    const target = active ? 1.0 : 0.0;
    mat.uniforms.uActive.value += (target - mat.uniforms.uActive.value) * 0.08;
  });

  return <primitive object={lineObj} />;
}
