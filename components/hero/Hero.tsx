"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ProximityText } from "@/components/motion/ProximityText";
import { Magnetic } from "@/components/motion/Magnetic";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { scrollToId, useLenis } from "@/components/providers/SmoothScroll";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { useClock } from "@/lib/useClock";

function RotatingWord({ words, play }: { words: string[]; play: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [play, words.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Every word sits in the same grid cell so the box keeps the widest width. */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 text-fg"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const rise = (play: boolean, delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: play ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.9, ease: EASE_EXPO, delay },
});

export function Hero() {
  const { personal } = PORTFOLIO_DATA;
  const play = useIntroDone();
  const lenis = useLenis();
  const time = useClock();
  const ref = useRef<HTMLElement>(null);

  // Soft accent spotlight that trails the pointer across the grid.
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(var(--accent-rgb) / 0.09), transparent 70%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-32 sm:px-8"
      >
        <motion.div {...rise(play, 0.1)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {personal.status}
          </span>
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.75rem,7.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <ProximityText
            text={personal.name}
            play={play}
            className="block whitespace-nowrap"
            minWeight={560}
            maxWeight={800}
            radius={260}
            delay={0.15}
          />
          <motion.span
            className="mt-2 block text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.1] tracking-[-0.035em] text-muted"
            {...rise(play, 0.35)}
          >
            {personal.role}.
          </motion.span>
        </h1>

        <motion.p className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted" {...rise(play, 0.45)}>
          {personal.lead}
        </motion.p>

        <motion.p className="mt-4 text-[15px] text-subtle" {...rise(play, 0.5)}>
          Op dit moment: <RotatingWord words={personal.rotatingWords} play={play} />
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap gap-3" {...rise(play, 0.6)}>
          <Magnetic strength={0.2}>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId(lenis, "work");
              }}
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[14px] font-medium text-accent-fg transition-[filter] duration-200 hover:brightness-110"
            >
              Bekijk mijn werk
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
                ↓
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={personal.cvFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 text-[14px] font-medium transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
            >
              Download CV
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.dl
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 border-t border-white/[0.06] text-[13px] sm:grid-cols-3"
        {...rise(play, 0.75)}
      >
        {[
          ["Studio", `${personal.company} · KVK ${personal.kvk}`],
          ["Product", "StudyElite.nl — live"],
          ["Locatie", `${personal.location}${time ? ` · ${time}` : ""}`],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`flex items-center justify-between gap-4 px-5 py-4 sm:block sm:px-8 sm:py-6 ${
              i > 0 ? "border-t border-white/[0.06] sm:border-l sm:border-t-0" : ""
            }`}
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">{k}</dt>
            <dd className="text-fg sm:mt-1.5 tabular-nums">{v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
