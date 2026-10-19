"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

export function Preloader({ onDone }: { onDone: () => void }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const release = () => {
      document.documentElement.style.overflow = "";
    };

    if (reduce) {
      const t = setTimeout(() => {
        release();
        onDone();
      }, 200);
      return () => {
        clearTimeout(t);
        release();
      };
    }

    const controls = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counterRef.current) counterRef.current.textContent = `${Math.round(v)}%`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        release();
        setTimeout(onDone, 150);
      },
    });

    return () => {
      controls.stop();
      release();
    };
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-canvas"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_EXPO }}
      aria-hidden="true"
    >
      <motion.div
        className="w-56"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      >
        <div className="flex items-baseline justify-between text-[13px]">
          <span className="font-medium text-fg">Bram Verhoeff</span>
          <span ref={counterRef} className="font-mono text-[11px] tabular-nums text-muted">
            0%
          </span>
        </div>
        <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
