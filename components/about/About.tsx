"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FadeUp, SectionLabel, SectionTitle } from "@/components/motion/Reveal";
import { ScrollText } from "@/components/motion/ScrollText";
import { PORTFOLIO_DATA, type StatItem } from "@/data/portfolio";

function Stat({ stat, i }: { stat: StatItem; i: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || stat.value === null || reduce) return;
    const value = stat.value;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${stat.prefix ?? ""}${Math.round(v)}${stat.suffix ?? ""}`;
      },
    });
    return () => controls.stop();
  }, [inView, stat, i, reduce]);

  return (
    <FadeUp delay={i * 0.06} className="bg-canvas p-6">
      <span ref={ref} className="block text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
        {stat.display}
      </span>
      <span className="mt-2 block text-[13px] text-muted">{stat.label}</span>
    </FadeUp>
  );
}

const FACTS = [
  ["Basis", "Den Haag, NL"],
  ["Studie", "HBO-ICT, De Haagse Hogeschool"],
  ["Diploma", "MBO 4 Software Developer"],
  ["Studio", "Agevo Development"],
  ["Product", "StudyElite.nl"],
];

export function About() {
  const { about } = PORTFOLIO_DATA;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionLabel index="02">Over mij</SectionLabel>
      <SectionTitle first="Gebouwd op code," second="gedreven door resultaat." />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <ScrollText text={about.manifesto} className="text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.5] tracking-[-0.015em]" />

        <motion.div ref={cardRef} style={{ y }} className="self-start">
          <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-fg font-mono text-[13px] font-semibold text-canvas">BV</span>
              <div>
                <div className="text-[15px] font-medium">Bram Verhoeff</div>
                <div className="text-[13px] text-muted">Full-stack developer &amp; founder</div>
              </div>
            </div>
            <dl className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06] text-[13px]">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-subtle">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
        {about.stats.map((stat, i) => (
          <Stat key={stat.label} stat={stat} i={i} />
        ))}
      </div>
    </section>
  );
}
