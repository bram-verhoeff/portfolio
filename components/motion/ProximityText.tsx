"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Display word whose letters thicken as the pointer comes near — driven by the
 * variable weight axis of Geist. Letters also rise in once `play` turns true.
 */
export function ProximityText({
  text,
  play,
  className,
  minWeight = 300,
  maxWeight = 900,
  radius = 340,
  delay = 0,
}: {
  text: string;
  play: boolean;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  radius?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const weights = useRef<number[]>(text.split("").map(() => minWeight));
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const active = useRef(false);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    active.current = true;
    const move = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const leave = () => {
      pointer.current = null;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      active.current = false;
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduce]);

  useAnimationFrame(() => {
    if (!active.current) return;
    const p = pointer.current;
    charRefs.current.forEach((el, i) => {
      if (!el) return;
      let target = minWeight;
      if (p) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(p.x - (r.left + r.width / 2), p.y - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        target = minWeight + (maxWeight - minWeight) * t * t * (3 - 2 * t);
      }
      const current = weights.current[i];
      const next = current + (target - current) * 0.14;
      if (Math.abs(next - current) < 0.5) return;
      weights.current[i] = next;
      el.style.fontVariationSettings = `"wght" ${next.toFixed(0)}`;
    });
  });

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: play ? "0%" : "110%" }}
            transition={{ duration: 1.3, ease: EASE_EXPO, delay: delay + i * 0.06 }}
          >
            <span
              ref={(el) => {
                charRefs.current[i] = el;
              }}
              className="inline-block"
              style={{ fontVariationSettings: `"wght" ${minWeight}` }}
            >
              {char === " " ? " " : char}
            </span>
          </motion.span>
        </span>
      ))}
    </span>
  );
}
