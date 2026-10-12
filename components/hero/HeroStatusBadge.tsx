"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function HeroStatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.12] shadow-xs text-xs md:text-sm font-semibold text-ink-soft overflow-hidden hover:border-[#00b4ff] hover:shadow-[0_6px_22px_rgba(0,180,255,0.25)] transition-all duration-300"
    >
      {/* Shimmer sweep line */}
      <span
        className="pointer-events-none absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-[#00b4ff]/30 to-transparent skew-x-[-20deg] animate-shimmer"
        aria-hidden="true"
      />

      {/* Radar Dot with ping ring */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        <span className="radar-dot relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>

      <span>{PORTFOLIO_DATA.personal.status}</span>
    </motion.div>
  );
}
