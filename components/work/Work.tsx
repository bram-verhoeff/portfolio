"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeUp, SectionLabel, SectionTitle } from "@/components/motion/Reveal";
import { PORTFOLIO_DATA, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { FlowVisual, PlannerVisual } from "./ProjectVisuals";

function ProjectCard({
  project,
  i,
  total,
  progress,
  stacked,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / total, 1], [0, i === total - 1 ? 0 : 0.6]);

  return (
    <div
      className={cn(stacked && "sticky top-0 flex h-screen items-center")}
      style={stacked ? { paddingTop: 40 + i * 24 } : undefined}
    >
      <motion.article
        style={stacked ? { scale } : undefined}
        className="relative w-full origin-top overflow-hidden rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8"
      >
        {/* Accent hairline along the top edge */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden="true"
        />
        {stacked && (
          <motion.div className="pointer-events-none absolute inset-0 z-10 bg-canvas" style={{ opacity: dim }} aria-hidden="true" />
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="flex flex-col">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
              <span>
                {project.index} / 0{total}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-muted">{project.kind}</span>
            </div>

            <h3 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">
              {project.title}
            </h3>
            <p className="mt-1 text-[16px] text-muted">{project.subtitle}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{project.description}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-muted">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="min-h-8 flex-1" />

            <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06] text-[13px]">
              {project.architecture.map((row) => (
                <li key={row.layer} className="grid grid-cols-[7.5rem_1fr] gap-4 py-2.5">
                  <span className="font-mono text-[11px] uppercase leading-5 tracking-[0.1em] text-subtle">{row.layer}</span>
                  <span>
                    <span className="font-medium text-fg">{row.tech}</span>
                    <span className="block text-muted">{row.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Bezoek"
              className="block min-h-[300px] transition-transform duration-700 ease-expo hover:scale-[0.99] lg:min-h-[320px] lg:flex-1"
              aria-label={`Open ${project.linkText}`}
            >
              {project.tone === "accent" ? <FlowVisual /> : <PlannerVisual />}
            </a>

            <dl className="grid grid-cols-3 gap-4 py-1">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-subtle">{m.label}</dt>
                  <dd className="mt-1 text-[17px] font-medium tracking-tight">{m.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 text-[14px] font-medium transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-accent-fg"
            >
              Open {project.linkText}
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const { projects } = PORTFOLIO_DATA;
  const stackRef = useRef<HTMLDivElement>(null);
  const stacked = useMediaQuery("(min-width: 1024px) and (min-height: 820px)");
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <SectionLabel index="01">Geselecteerd werk</SectionLabel>
          <SectionTitle first="Werk dat live draait." second="Van idee tot productie." />
        </div>
        <FadeUp delay={0.2} className="max-w-xs text-[15px] leading-relaxed text-muted">
          Twee producten die ik zelf heb gebouwd en die vandaag echte gebruikers en klanten bedienen.
        </FadeUp>
      </div>

      <div ref={stackRef} className={cn(!stacked && "space-y-5")}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            i={i}
            total={projects.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>
    </section>
  );
}
