"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SkillsMatrix() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeader
          label="Skills"
          title="Wat ik kan"
          description="Van frontend tot backend, van design tot deployment — ik heb de tools in huis."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
      >
        {skills.map((skill) => (
          <TiltCard
            key={skill.title}
            className="p-6 md:p-7 bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-20px_rgba(10,10,10,0.1)] flex items-start gap-5 hover:border-[#00b4ff] hover:shadow-[0_12px_28px_-8px_rgba(0,180,255,0.2)] transition-all duration-300"
            maxTilt={4}
          >
            <span className="text-3xl sm:text-4xl shrink-0 animate-float-icon transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6">
              {skill.icon}
            </span>
            <div>
              <h3 className="font-semibold text-lg text-ink mb-1.5">
                {skill.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          </TiltCard>
        ))}
      </motion.div>
    </section>
  );
}
