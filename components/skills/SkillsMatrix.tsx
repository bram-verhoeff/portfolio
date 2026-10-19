"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionTitle } from "@/components/motion/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SkillsMatrix() {
  const { skills } = PORTFOLIO_DATA;
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <SectionLabel index="04">Expertise</SectionLabel>
          <SectionTitle first="Wat ik meebreng." second="Zes disciplines, één doel." />
        </div>
        <FadeUp delay={0.2} className="max-w-xs text-[15px] leading-relaxed text-muted">
          Software die schaalt en direct waarde oplevert. Elke vaardigheid draait in productie.
        </FadeUp>
      </div>

      <ul
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface"
        onPointerLeave={() => setHovered(null)}
      >
        {skills.map((skill, i) => {
          const isOpen = open === i;
          return (
            <motion.li
              key={skill.title}
              className="relative border-b border-white/[0.06] last:border-b-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: i * 0.04 }}
              onPointerEnter={() => setHovered(i)}
            >
              {hovered === i && (
                <motion.div
                  layoutId="skill-hover"
                  className="absolute inset-0 bg-white/[0.025]"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`skill-panel-${i}`}
                className="relative grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 px-5 py-5 text-left sm:grid-cols-[3rem_1fr_auto_auto] sm:px-7"
              >
                <span className="font-mono text-[12px] text-subtle">0{i + 1}</span>
                <span
                  className={cn(
                    "text-[clamp(1.05rem,1.8vw,1.35rem)] font-medium tracking-[-0.015em] transition-colors duration-300",
                    isOpen ? "text-fg" : "text-fg/80",
                  )}
                >
                  {skill.title}
                </span>
                <span className="hidden rounded-full border border-white/10 px-2.5 py-0.5 text-[12px] text-muted sm:inline">
                  {skill.badge}
                </span>
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-md border transition-colors duration-300",
                    isOpen ? "border-accent bg-accent text-accent-fg" : "border-white/10 text-muted",
                  )}
                  aria-hidden="true"
                >
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_EXPO }}
                  >
                    <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" />
                  </motion.svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`skill-panel-${i}`}
                    className="relative overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                  >
                    <div className="grid gap-6 px-5 pb-7 sm:grid-cols-[3rem_1fr_1fr] sm:gap-8 sm:px-7">
                      <span className="hidden sm:block" />
                      <p className="max-w-lg text-[15px] leading-relaxed text-muted">{skill.description}</p>
                      <div>
                        <ul className="flex flex-wrap gap-1.5">
                          {skill.technologies.map((tech, t) => (
                            <motion.li
                              key={tech}
                              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[12px] text-fg"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0.08 + t * 0.035 }}
                            >
                              {tech}
                            </motion.li>
                          ))}
                        </ul>
                        <p className="mt-4 flex gap-2 text-[13px] leading-relaxed text-muted">
                          <span className="text-accent">↳</span>
                          {skill.productionProof}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
