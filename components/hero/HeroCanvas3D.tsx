"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function QuantumCyberCore() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const cageRef = useRef<THREE.LineSegments | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const ring3Ref = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    // Smooth inertia physics
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.35 + py * 0.6;
      meshRef.current.rotation.y = t * 0.45 + px * 0.6;
      const s = 1 + Math.sin(t * 2) * 0.04;
      meshRef.current.scale.set(s, s, s);
    }

    if (cageRef.current) {
      cageRef.current.rotation.x = -t * 0.25 - py * 0.4;
      cageRef.current.rotation.y = t * 0.3 - px * 0.4;
      cageRef.current.rotation.z = t * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5 + py * 0.3;
      ring1Ref.current.rotation.y = t * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.4 + px * 0.3;
      ring2Ref.current.rotation.z = t * 0.3;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.6;
      ring3Ref.current.rotation.x = -t * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.4}>
      <group>
        {/* Core Quantum Crystal */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshPhysicalMaterial
            color="#051937"
            emissive="#00b4ff"
            emissiveIntensity={0.65}
            roughness={0.08}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
          />
        </mesh>

        {/* Outer Kinetic Cyan Wireframe Cage */}
        <lineSegments ref={cageRef}>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.85, 1)]} />
          <lineBasicMaterial color="#00e5ff" transparent opacity={0.8} linewidth={2} />
        </lineSegments>

        {/* Gyroscopic Orbital Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.025, 16, 120]} />
          <meshBasicMaterial color="#00b4ff" transparent opacity={0.7} />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.55, 0.02, 16, 120]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>

        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[2.85, 0.015, 16, 120]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function CosmicVortexParticles({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color("#00b4ff"),
      new THREE.Color("#38bdf8"),
      new THREE.Color("#818cf8"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 3.0;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.07;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.035;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroCanvas3D() {
  return (
    <div className="w-full h-[360px] sm:h-[420px] lg:h-[460px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[8, 12, 6]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-10, -6, -4]} intensity={3.5} color="#00b4ff" />
        <pointLight position={[6, -6, 6]} intensity={2.8} color="#38bdf8" />
        <pointLight position={[0, 8, 4]} intensity={2.0} color="#8b5cf6" />

        <QuantumCyberCore />
        <CosmicVortexParticles count={240} />
      </Canvas>
    </div>
  );
}
