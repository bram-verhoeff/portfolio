"use client";

import { useEffect, useRef } from "react";

export function SpotlightGlow() {
  const primaryRef = useRef<HTMLDivElement | null>(null);
  const secondaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (primaryRef.current) {
        primaryRef.current.style.background = `radial-gradient(850px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 180, 255, 0.14), transparent 70%)`;
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.background = `radial-gradient(350px circle at ${e.clientX}px ${e.clientY}px, rgba(56, 189, 248, 0.11), transparent 60%)`;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* Dot-matrix subtle cyber background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0, 180, 255, 0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Cyber perspective horizontal scan lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 180, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "100% 48px",
        }}
        aria-hidden="true"
      />

      {/* Deep Aurora Ambient Light Cones */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00b4ff]/15 via-[#0077b6]/10 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#8b5cf6]/12 via-[#38bdf8]/10 to-transparent blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#00b4ff]/15 via-[#0077b6]/08 to-transparent blur-[130px] animate-aura" />
      </div>

      {/* Zero-rerender Cursor Spotlight Layers */}
      <div
        ref={primaryRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        ref={secondaryRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
}