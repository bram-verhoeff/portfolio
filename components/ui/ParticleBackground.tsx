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
    let scrollSpeed = 0;
    let lastScrollY = 0;

    // Shockwave ripples on click
    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    const shockwaves: Shockwave[] = [];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 95;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.55;
      targetRotX = (e.clientY / window.innerHeight - 0.5) * -0.55;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollSpeed = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.8,
      });
    };
    window.addEventListener("click", handleClick, { passive: true });

    // 3D Point Particle
    class Particle3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseRadius: number;
      hue: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 1400;
        this.y = (Math.random() - 0.5) * 1100;
        this.z = (Math.random() - 0.5) * 900;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 0.4;
        this.baseRadius = Math.random() * 1.8 + 0.8;
        this.hue = Math.random() > 0.4 ? 195 : 220; // Cyan or Azure
      }

      update(warpMultiplier: number) {
        this.x += this.vx * warpMultiplier;
        this.y += this.vy * warpMultiplier;
        this.z += this.vz * warpMultiplier;

        if (this.x < -750) this.x = 750;
        if (this.x > 750) this.x = -750;
        if (this.y < -600) this.y = 600;
        if (this.y > 600) this.y = -600;
        if (this.z < -500) this.z = 500;
        if (this.z > 500) this.z = -500;
      }

      project(rX: number, rY: number) {
        const cosY = Math.cos(rY);
        const sinY = Math.sin(rY);
        const x1 = this.x * cosY + this.z * sinY;
        const z1 = -this.x * sinY + this.z * cosY;

        const cosX = Math.cos(rX);
        const sinX = Math.sin(rX);
        const y2 = this.y * cosX - z1 * sinX;
        const z2 = this.y * sinX + z1 * cosX;

        const fov = 750;
        const scale = fov / (fov + z2 + 550);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;
        const radius = Math.max(0.6, this.baseRadius * scale);
        const alpha = Math.min(Math.max((z2 + 500) / 1000, 0.15), 0.95);

        return { x: projX, y: projY, scale, alpha, radius, hue: this.hue };
      }
    }

    const particles: Particle3D[] = Array.from(
      { length: particleCount },
      () => new Particle3D()
    );

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll speed
      scrollSpeed *= 0.92;
      const warp = 1 + Math.min(scrollSpeed * 0.08, 3.5);

      // Smooth rotation dampening
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const projected = particles.map((p) => {
        p.update(warp);
        return p.project(rotX, rotY);
      });

      // Render shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 8;
        sw.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 180, 255, ${sw.alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Draw filament lasers and connecting mesh
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];

        // Draw glowing particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p1.hue}, 100%, 65%, ${p1.alpha * 0.8})`;
        ctx.shadowColor = "#00b4ff";
        ctx.shadowBlur = p1.radius > 1.2 ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Interactive Laser connection to Mouse
        const dMouse = Math.hypot(p1.x - mouseX, p1.y - mouseY);
        if (dMouse < 180) {
          const intensity = 1 - dMouse / 180;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 220, 255, ${0.45 * intensity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Connect to neighboring nodes
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 135) * 0.22 * ((p1.alpha + p2.alpha) / 2);
            ctx.strokeStyle = `rgba(0, 180, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 w-full h-full"
      aria-hidden="true"
    />
  );
}
