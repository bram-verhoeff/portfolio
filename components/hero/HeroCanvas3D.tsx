"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function KineticGeometry() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireframeRef = useRef<THREE.LineSegments | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.25 + py * 0.4;
      meshRef.current.rotation.y = t * 0.35 + px * 0.4;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -t * 0.2 + py * 0.3;
      wireframeRef.current.rotation.y = -t * 0.3 + px * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group>
        {/* Inner Solid Crystal */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial
            color="#0a192f"
            emissive="#0077b6"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>

        {/* Outer Kinetic Cyan Wireframe Cage */}
        <lineSegments ref={wireframeRef}>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.85, 1)]} />
          <lineBasicMaterial color="#00b4ff" transparent opacity={0.65} linewidth={1.5} />
        </lineSegments>

        {/* Outer Halo Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00b4ff" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.2 + Math.random() * 2.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sc[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00b4ff"
        size={0.065}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroCanvas3D() {
  return (
    <div className="w-full h-[360px] sm:h-[420px] lg:h-[460px] relative">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -8, -4]} intensity={2.2} color="#00b4ff" />
        <pointLight position={[5, -5, 5]} intensity={1.8} color="#0077b6" />

        <KineticGeometry />
        <FloatingParticles count={100} />
      </Canvas>
    </div>
  );
}
