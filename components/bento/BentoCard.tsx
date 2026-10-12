"use client";

import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Project } from "@/data/portfolio";
import { ExternalLink, Building, Bot, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/sound";

interface BentoCardProps {
  project: Project;
  span?: string;
}

export function BentoCard({ project, span = "col-span-12 lg:col-span-6" }: BentoCardProps) {
  const StatIcon = project.id === "agevo" ? Building : Bot;

  return (
    <div id={`project-${project.id}`} className={span}>
      <TiltCard
        className="h-full bg-gradient-to-b from-[#0e131d] to-[#080b11] border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(0,180,255,0.12)] p-7 md:p-8 flex flex-col justify-between hover:border-[#00b4ff]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_45px_rgba(0,180,255,0.3)] transition-all duration-300"
        maxTilt={6}
      >
        <BorderBeam size={190} />

        <div>
          {/* Header with Number and Status */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-display italic text-sm text-[#7dd3fc]">
              {project.number}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-wider text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              {project.badge}
            </span>
          </div>

          {/* Visual Showcase Box */}
          {project.id === "agevo" ? (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#121c2e] via-[#0c1422] to-[#070a10] p-6 mb-6 flex flex-col sm:flex-row items-center justify-between border border-[#00b4ff]/30 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(0,180,255,0.18)] overflow-hidden group/visual gap-4">
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-5xl drop-shadow-[0_10px_25px_rgba(0,180,255,0.5)] group-hover/visual:scale-110 transition-transform">
                  {project.emoji}
                </span>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00b4ff]/15 border border-[#00b4ff]/40 text-[#38bdf8] font-mono text-xs font-bold mb-1">
                    <Building className="w-3.5 h-3.5" /> Officiële Bedrijfssite
                  </div>
                  <div className="text-white font-bold text-base">Agevo Development</div>
                  <div className="text-white/50 text-xs">KVK Onderneming · agevodev.nl</div>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-[#38bdf8] flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                KVK: 42160840
              </div>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#00b4ff]/20 rounded-full blur-3xl pointer-events-none" />
            </div>
          ) : project.isFlagship ? (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#121c2e] via-[#0c1422] to-[#070a10] p-6 mb-6 flex flex-col sm:flex-row items-center justify-between border border-[#00b4ff]/30 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(0,180,255,0.18)] overflow-hidden group/visual gap-4">
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-5xl drop-shadow-[0_10px_25px_rgba(0,180,255,0.5)] group-hover/visual:scale-110 transition-transform">
                  {project.emoji}
                </span>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00b4ff]/15 border border-[#00b4ff]/40 text-[#38bdf8] font-mono text-xs font-bold mb-1">
                    <Bot className="w-3.5 h-3.5" /> Live Preview Mockup
                  </div>
                  <div className="text-white font-bold text-base">StudyElite Neural Planner</div>
                  <div className="text-white/50 text-xs">AI-gestuurd studieplatform · studyelite.nl</div>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-[#38bdf8] flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                Latency: 142ms · 99.8% Uptime
              </div>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#00b4ff]/20 rounded-full blur-3xl pointer-events-none" />
            </div>
          ) : (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#121824] to-[#080b10] p-8 mb-6 flex items-center justify-center border border-white/10 shadow-inner overflow-hidden group/visual">
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0, 180, 255, 0.25) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
                aria-hidden="true"
              />
              <div className="absolute w-20 h-20 bg-[#00b4ff]/25 rounded-full blur-2xl group-hover/visual:scale-150 transition-transform duration-500" />
              <span className="text-5xl drop-shadow-[0_10px_25px_rgba(0,180,255,0.4)] transition-transform duration-300 ease-out group-hover/visual:scale-120 group-hover/visual:-translate-y-1 relative z-10">
                {project.emoji}
              </span>
            </div>
          )}

          {/* Project Meta */}
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2.5 tracking-tight flex items-center gap-2">
            <span>{project.title}</span>
            <Sparkles className="w-4 h-4 text-[#00b4ff]" />
          </h3>
          <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-3 py-1 rounded-full text-xs font-semibold text-[#7dd3fc] bg-white/[0.04] border border-white/10 hover:bg-[#00b4ff]/20 hover:border-[#00b4ff]/60 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38bdf8]">
            <StatIcon className="w-3.5 h-3.5" />
            {project.statChipText}
          </span>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#00b4ff] group/link transition-colors cursor-pointer"
          >
            <span>{project.linkText}</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </TiltCard>
    </div>
  );
}
