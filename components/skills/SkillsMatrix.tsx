"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { soundEngine } from "@/lib/sound";
import { Sparkles, Cpu } from "lucide-react";

export function SkillsMatrix() {
  const { skills } = PORTFOLIO_DATA;

  // Authentic proficiency ratings for Bram's actual skills
  const proficiencyMap: Record<string, number> = {
    "Frontend Development": 96,
    "Backend Development": 94,
    "Database Development": 90,
    "UI/UX Design": 88,
    "Go High Level Automations": 98,
    Ondernemerschap: 95,
  };

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <SectionHeader
          label="Skills"
          title="Wat ik kan"
          description="Van frontend tot backend, van design tot deployment — ik heb de tools in huis om high-impact software te engineeren."
          dark
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((skill) => {
          const level = proficiencyMap[skill.title] || 90;

          return (
            <TiltCard
              key={skill.title}
              className="p-7 bg-gradient-to-b from-[#0e131d] to-[#080b11] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(0,180,255,0.08)] flex flex-col justify-between hover:border-[#00b4ff]/60 hover:shadow-[0_20px_45px_rgba(0,180,255,0.22)] transition-all duration-300 relative overflow-hidden"
              maxTilt={5}
            >
              <BorderBeam size={150} />

              <div onMouseEnter={() => soundEngine.playHover()}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                    {skill.icon}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#7dd3fc] bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/10">
                    {level}% Mastery
                  </span>
                </div>

                <h3 className="font-semibold text-lg sm:text-xl text-white mb-2 tracking-tight">
                  {skill.title}
                </h3>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {skill.description}
                </p>
              </div>

              {/* Glowing Proficiency Bar */}
              <div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#0077b6] to-[#00b4ff] rounded-full shadow-[0_0_10px_#00b4ff]"
                  />
                </div>
              </div>
            </TiltCard>
          );
        })}
      </motion.div>
    </section>
  );
}
