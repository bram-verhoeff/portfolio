"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 36 : 72;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 0.45;
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * -0.45;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 3D Point Particle
    class Particle3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseRadius: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 1200;
        this.y = (Math.random() - 0.5) * 900;
        this.z = (Math.random() - 0.5) * 800;
        this.vx = (Math.random() - 0.5) * 0.42;
        this.vy = (Math.random() - 0.5) * 0.42;
        this.vz = (Math.random() - 0.5) * 0.35;
        this.baseRadius = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.x < -650) this.x = 650;
        if (this.x > 650) this.x = -650;
        if (this.y < -500) this.y = 500;
        if (this.y > 500) this.y = -500;
        if (this.z < -450) this.z = 450;
        if (this.z > 450) this.z = -450;
      }

      project(rX: number, rY: number) {
        // Rotate around Y
        const cosY = Math.cos(rY);
        const sinY = Math.sin(rY);
        const x1 = this.x * cosY + this.z * sinY;
        const z1 = -this.x * sinY + this.z * cosY;

        // Rotate around X
        const cosX = Math.cos(rX);
        const sinX = Math.sin(rX);
        const y2 = this.y * cosX - z1 * sinX;
        const z2 = this.y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 700;
        const scale = fov / (fov + z2 + 500);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;
        const radius = Math.max(0.6, this.baseRadius * scale);
        const alpha = Math.min(Math.max((z2 + 450) / 900, 0.12), 0.85);

        return { x: projX, y: projY, scale, alpha, radius };
      }
    }

    const particles: Particle3D[] = Array.from(
      { length: particleCount },
      () => new Particle3D()
    );

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth rotation dampening
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const projected = particles.map((p) => {
        p.update();
        return p.project(rotX, rotY);
      });

      // Draw filaments and connecting mesh
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${p1.alpha * 0.6})`;
        ctx.fill();

        // Connect to mouse if near
        const dMouse = Math.hypot(p1.x - mouseX, p1.y - mouseY);
        if (dMouse < 170) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 180, 255, ${0.35 * (1 - dMouse / 170)})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Connect to neighboring nodes
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 125) * 0.18 * ((p1.alpha + p2.alpha) / 2);
            ctx.strokeStyle = `rgba(0, 180, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 w-full h-full"
      aria-hidden="true"
    />
  );
}
