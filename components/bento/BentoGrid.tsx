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
        />

        <div className="font-display italic text-muted text-base">
          <strong className="text-ink text-2xl font-bold not-italic">02</strong>{" "}
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
          <BentoCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
