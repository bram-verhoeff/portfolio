"use client";

import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Project } from "@/data/portfolio";
import { ExternalLink, Building, Bot } from "lucide-react";

interface BentoCardProps {
  project: Project;
  span?: string;
}

export function BentoCard({ project, span = "col-span-12 lg:col-span-6" }: BentoCardProps) {
  const StatIcon = project.id === "agevo" ? Building : Bot;

  return (
    <div id={`project-${project.id}`} className={span}>
      <TiltCard
        className="h-full bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-20px_rgba(10,10,10,0.12)] p-7 md:p-8 flex flex-col justify-between hover:border-[#00b4ff]/40 hover:shadow-[0_20px_45px_-10px_rgba(10,10,10,0.12),0_0_35px_rgba(0,180,255,0.14)]"
        maxTilt={6}
      >
        <BorderBeam size={170} />

        <div>
          {/* Header with Number and Live Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-display italic text-sm text-muted">
              {project.number}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-bold uppercase tracking-wider text-ink-soft">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              {project.badge}
            </span>
          </div>

          {/* Visual Showcase Box */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1c1f22] to-[#0a0b0d] p-10 mb-6 flex items-center justify-center border border-white/10 shadow-inner overflow-hidden group/visual">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
              aria-hidden="true"
            />
            <span className="text-6xl drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out group-hover/visual:scale-115 group-hover/visual:-translate-y-1">
              {project.emoji}
            </span>
          </div>

          {/* Project Meta */}
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2.5 tracking-tight">
            {project.title}
          </h3>
          <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold text-ink-soft bg-black/[0.04] border border-black/[0.08] hover:bg-[#00b4ff]/10 hover:border-[#00b4ff]/40 hover:text-[#0077b6] hover:-translate-y-0.5 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with Stat Chip and Link */}
        <div className="pt-5 border-t border-black/[0.08] flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077b6]">
            <StatIcon className="w-3.5 h-3.5" />
            {project.statChipText}
          </span>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-[#0077b6] group/link transition-colors"
          >
            <span>{project.linkText}</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </TiltCard>
    </div>
  );
}
