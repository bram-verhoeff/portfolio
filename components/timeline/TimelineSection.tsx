"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FadeUp, SectionLabel, SectionTitle } from "@/components/motion/Reveal";
import { PORTFOLIO_DATA, type TimelineItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";

function Entry({ item, i, horizontal }: { item: TimelineItem; i: number; horizontal: boolean }) {
  const current = i === 0;
  return (
    <article
      className={cn(
        "relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl border bg-surface p-6 sm:p-7",
        horizontal ? "w-[min(78vw,400px)]" : "h-full w-full",
        current ? "border-accent/40" : "border-white/[0.08]",
      )}
    >
      {current && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden="true"
        />
      )}
      <div>
        <div className="flex items-center justify-between text-[12px]">
          <span className={cn("rounded-full border px-2.5 py-0.5", current ? "border-accent/40 text-accent" : "border-white/10 text-muted")}>
            {current ? "Nu" : item.role}
          </span>
          <span className="font-mono text-subtle">0{i + 1}</span>
        </div>
        <div className="mt-6 font-mono text-[13px] text-muted">{item.period}</div>
        <h3 className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.02em]">{item.title}</h3>
        {current && <div className="mt-1 text-[14px] text-muted">{item.role}</div>}
      </div>
      <div className="mt-8">
        <p className="text-[14px] leading-relaxed text-muted">{item.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.highlights.map((h) => (
            <li key={h} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-muted">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Pinned on large screens: vertical scroll drives a horizontal track. */
function HorizontalTimeline() {
  const { timeline } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <section ref={sectionRef} id="journey" className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 w-full max-w-6xl px-8">
          <SectionLabel index="03">De reis</SectionLabel>
          <SectionTitle first="Van eerste regel code" second="tot eigen studio." />
        </div>

        {/* Track starts aligned with the content column, then runs off-screen. */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-4 pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-[10vw]"
        >
          {timeline.map((item, i) => (
            <Entry key={item.period} item={item} i={i} horizontal />
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-8">
          <div className="h-px bg-white/[0.08]">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: smooth }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function VerticalTimeline() {
  const { timeline } = PORTFOLIO_DATA;
  return (
    <section id="journey" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <div className="mb-12">
        <SectionLabel index="03">De reis</SectionLabel>
        <SectionTitle first="Van eerste regel code" second="tot eigen studio." />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {timeline.map((item, i) => (
          <FadeUp key={item.period} delay={(i % 2) * 0.08} className="h-full">
            <Entry item={item} i={i} horizontal={false} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

export function TimelineSection() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return wide && !reduce ? <HorizontalTimeline /> : <VerticalTimeline />;
}
