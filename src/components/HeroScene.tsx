"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

// Preload the model path
useGLTF.preload("/models/iphone17.glb");

function PhoneModel() {
  let gltf: any;
  try {
    gltf = useGLTF("/models/iphone17.glb");
  } catch (error) {
    console.error("Critical error loading iphone17.glb:", error);
    throw error;
  }

  const groupRef = useRef<THREE.Group>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hasScreenMesh, setHasScreenMesh] = useState(false);
  const [centerOffset, setCenterOffset] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Load screen texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "/screens/app-preview.png",
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        setTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.warn("Failed to load /screens/app-preview.png", err);
      }
    );
  }, []);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.0006;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.0006;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute model dimensions, auto-center, force visibility, and apply texture
  useEffect(() => {
    if (!gltf || !gltf.scene || !texture) return;

    // Reset any persistent cached mutations on the shared model object
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.set(0, 0, 0);
    gltf.scene.scale.set(1, 1, 1);

    // 1. Force visibility on all components in the hierarchy
    gltf.scene.traverse((child: any) => {
      child.visible = true;
      if (child.parent) child.parent.visible = true;
    });

    // 2. Force matrix world updates BEFORE computing bounding box
    gltf.scene.updateMatrixWorld(true);

    // 3. Center the geometry pivot origin to [0, 0, 0] based on actual mesh world coordinates
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    setCenterOffset(center);

    console.log("Calculated fresh center offset:", center.x, center.y, center.z);

    // 4. Map screen texture to display meshes safely
    let detected = false;
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        const isScreen = name.includes("screen") || name.includes("display") || name.includes("retina") || name.includes("amoled") || name.includes("lcd");
        const isExcluded = name.includes("chassis") || name.includes("body") || name.includes("back") || name.includes("camera") || name.includes("lens") || name.includes("button") || name.includes("logo") || name.includes("glass_back");

        if (isScreen && !isExcluded) {
          child.material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
          });
          detected = true;
        }
      }
    });

    setHasScreenMesh(detected);
  }, [gltf, texture]);

  // Frame loop for idle and mouse parallax animations
  useFrame((state) => {
    if (groupRef.current) {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const baseRadX = -10 * (Math.PI / 180);
      const baseRadY = 20 * (Math.PI / 180);
      const baseRadZ = -5 * (Math.PI / 180);

      groupRef.current.rotation.x = baseRadX - mouseRef.current.y * 1.0;
      groupRef.current.rotation.y = baseRadY + Math.sin(state.clock.getElapsedTime() * 0.15) * 0.08 + mouseRef.current.x * 1.0;
      groupRef.current.rotation.z = baseRadZ;
    }

    if (phoneRef.current) {
      // Gentle idle float bounce
      phoneRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Scale the entire group so model & fallback planes stay proportional */}
      <group ref={phoneRef} scale={4.7}>
        
        {/* Centering Group: translates both the phone and fallback plane by -centerOffset */}
        <group position={[-centerOffset.x, -centerOffset.y, -centerOffset.z]}>
          
          {/* Phone body model - rotated by Math.PI so the front screen faces the camera */}
          <group rotation={[0, Math.PI, 0]}>
            <primitive object={gltf.scene} />
          </group>

          {/* Fallback Screen: nested inside the centered group to stay glued to the phone body */}
          {texture && !hasScreenMesh && (
            <mesh position={[0, 0, 0.008]}>
              <planeGeometry args={[0.242, 0.485]} />
              <meshBasicMaterial map={texture} transparent opacity={0.99} side={THREE.DoubleSide} />
            </mesh>
          )}

        </group>

      </group>
    </group>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" />;
  }

  return (
    <div className="w-full h-full relative z-10">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} shadows>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={3.0}
          color="#4F8CFF"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 0, 3.5]} intensity={2.0} color="#6FE7FF" />

        <Suspense fallback={
          <Html center>
            <div className="text-xs uppercase tracking-widest text-primary-accent font-mono animate-pulse">
              LOADING IPHONE 17 PRO MAX...
            </div>
          </Html>
        }>
          <PhoneModel />
        </Suspense>

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.7}
          scale={8}
          blur={2.0}
          far={4.5}
        />
      </Canvas>
    </div>
  );
}
