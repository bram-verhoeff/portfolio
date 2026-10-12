"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BentoCard } from "./BentoCard";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function BentoGrid() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <SectionHeader
          label="Projecten"
          title="Wat ik heb gebouwd"
          description="Een selectie van projecten waar ik trots op ben."
          className="mb-0"
          dark
        />

        <div className="font-display italic text-[#7dd3fc] text-base">
          <strong className="text-white text-2xl font-bold not-italic">04</strong>{" "}
          / live producten
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="grid grid-cols-12 gap-6 lg:gap-8"
      >
        {projects.map((project) => (
          <BentoCard key={project.id} project={project} span={project.span} />
        ))}

        {/* Live Stat Widget Bento Card */}
        <div id="project-stats" className="col-span-12 lg:col-span-4">
          <div className="h-full bg-gradient-to-br from-[#0e1422] to-[#070a12] border border-white/12 rounded-3xl p-7 md:p-8 flex flex-col justify-between hover:border-[#00b4ff]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(0,180,255,0.25)] transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#7dd3fc] uppercase tracking-wider">
                  STATISTIEKEN // TRACK RECORD
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  Real-time
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Bram in Cijfers
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Live metrics van onderneming Agevo Development en live SaaS-producten.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00b4ff]/40 transition-colors">
                  <div className="font-display text-3xl font-bold text-white mb-1">4</div>
                  <div className="text-xs text-white/50 font-medium">Live Producten</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00b4ff]/40 transition-colors">
                  <div className="font-display text-3xl font-bold text-white mb-1">18</div>
                  <div className="text-xs text-white/50 font-medium">Jaar oud</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00b4ff]/40 transition-colors">
                  <div className="font-display text-3xl font-bold text-white mb-1">24u</div>
                  <div className="text-xs text-white/50 font-medium">Reactietijd</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00b4ff]/40 transition-colors">
                  <div className="font-display text-xl font-bold text-[#38bdf8] mb-1">KVK</div>
                  <div className="text-xs text-white/50 font-medium">42160840 (Agevo)</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-[#38bdf8]">
                Agevo Development ⚡
              </span>
              <a
                href="https://agevodev.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white hover:text-[#00b4ff] transition-colors"
              >
                agevodev.nl →
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
