"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Splits text into words that rise out of a mask, staggered. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  play,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** When set, drives the animation directly instead of waiting for the viewport. */
  play?: boolean;
}) {
  const words = text.split(" ");
  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-10% 0px" } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <motion.span className={cn("inline", className)} {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-flex overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1, ease: EASE_EXPO, delay: delay + i * stagger } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

/** Fades and lifts any block into view once. */
export function FadeUp({ className, delay = 0, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, ease: EASE_EXPO, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Small mono section label: "01 — Werk" */
export function SectionLabel({ index, children, className }: { index: string; children: string; className?: string }) {
  return (
    <FadeUp className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted", className)}>
      <span className="text-accent">{index}</span>
      <motion.span
        className="h-px w-8 origin-left bg-white/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.2 }}
      />
      <span>{children}</span>
    </FadeUp>
  );
}

/** Section heading: first line bright, second line muted — no serif, no theatrics. */
export function SectionTitle({ first, second, className }: { first: string; second?: string; className?: string }) {
  return (
    <h2 className={cn("mt-5 text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]", className)}>
      <SplitWords text={first} />
      {second && (
        <>
          <br />
          <SplitWords text={second} className="text-muted" delay={0.1} />
        </>
      )}
    </h2>
  );
}
