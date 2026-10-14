"use client";

import { useState } from "react";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Project } from "@/data/portfolio";
import {
  ExternalLink,
  Building,
  Bot,
  Sparkles,
  Layers,
  Eye,
  Cpu,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { soundEngine } from "@/lib/sound";

interface BentoCardProps {
  project: Project;
  span?: string;
}

export function BentoCard({ project, span = "col-span-12 lg:col-span-6" }: BentoCardProps) {
  const [viewMode, setViewMode] = useState<"preview" | "architecture">("preview");
  const StatIcon = project.id === "agevo" ? Building : project.id === "studyelite" ? Bot : Layers;

  return (
    <div id={`project-${project.id}`} className={span}>
      <TiltCard
        className="h-full bg-gradient-to-b from-[#0e131d] to-[#080b11] border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(0,180,255,0.10)] p-6 sm:p-8 flex flex-col justify-between hover:border-[#00b4ff]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_45px_rgba(0,180,255,0.28)] transition-all duration-300"
        maxTilt={4}
      >
        {project.isFlagship && <BorderBeam size={220} />}

        <div>
          {/* Top Bar: Number, Mode Switcher & Live Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#7dd3fc] font-semibold">
              {project.number}
            </span>

            <div className="flex items-center gap-2">
              {/* Interactive View Switcher (Preview vs Architecture) */}
              <div className="inline-flex items-center p-0.5 rounded-full bg-black/50 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setViewMode("preview");
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${viewMode === "preview"
                      ? "bg-[#00b4ff] text-black font-bold shadow-[0_0_10px_rgba(0,180,255,0.5)]"
                      : "text-white/55 hover:text-white"
                    }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setViewMode("architecture");
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${viewMode === "architecture"
                      ? "bg-[#00b4ff] text-black font-bold shadow-[0_0_10px_rgba(0,180,255,0.5)]"
                      : "text-white/55 hover:text-white"
                    }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Architectuur</span>
                </button>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-bold uppercase tracking-wider text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                {project.badge}
              </span>
            </div>
          </div>

          {/* Dynamic Showcase Box: Either Visual Overview OR System Architecture */}
          {viewMode === "preview" ? (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#121c2e] via-[#0c1422] to-[#070a10] p-5 sm:p-6 mb-6 border border-[#00b4ff]/25 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(0,180,255,0.14)] overflow-hidden group/visual">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#00b4ff]/10 border border-[#00b4ff]/30 flex items-center justify-center text-3xl shrink-0 group-hover/visual:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,180,255,0.2)]">
                    {project.emoji}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00b4ff]/15 border border-[#00b4ff]/35 text-[#38bdf8] font-mono text-[11px] font-bold mb-1">
                      <StatIcon className="w-3 h-3" />
                      <span>{project.statChipText}</span>
                    </div>
                    <div className="text-white font-bold text-base sm:text-lg leading-snug">
                      {project.subtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Telemetry / Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-white/10 relative z-10">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/[0.07]"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                      {m.label}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[#7dd3fc] mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#00b4ff]/15 rounded-full blur-3xl pointer-events-none" />
            </div>
          ) : (
            <div className="relative rounded-2xl bg-[#070a10] p-5 sm:p-6 mb-6 border border-[#00b4ff]/40 shadow-inner overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-[#00b4ff] font-bold mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>System Blueprint — {project.title}</span>
              </div>
              <div className="space-y-2.5">
                {project.architecture.map((item) => (
                  <div
                    key={item.layer}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <div>
                      <span className="text-[11px] font-mono text-[#7dd3fc] font-bold uppercase">
                        {item.layer}:
                      </span>{" "}
                      <span className="text-xs font-bold text-white">{item.tech}</span>
                      <p className="text-xs text-white/55 mt-0.5">{item.detail}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Title & Description */}
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight flex items-center gap-2">
            <span>{project.title}</span>
            {project.isFlagship && <Sparkles className="w-4 h-4 text-[#00b4ff]" />}
          </h3>
          <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((tag) => (
              <span
                key={tag}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-3 py-1 rounded-full text-xs font-semibold text-[#7dd3fc] bg-white/[0.04] border border-white/10 hover:bg-[#00b4ff]/20 hover:border-[#00b4ff]/60 hover:text-white transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setViewMode(viewMode === "preview" ? "architecture" : "preview");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white/55 hover:text-[#38bdf8] transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[#00b4ff]" />
            <span>
              {viewMode === "preview" ? "Bekijk technische opbouw →" : "← Terug naar overview"}
            </span>
          </button>

          <a
            href={project.url}
            target={project.url.startsWith("http") ? "_blank" : undefined}
            rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00b4ff]/15 border border-[#00b4ff]/40 text-xs sm:text-sm font-bold text-white hover:bg-[#00b4ff] hover:text-black group/link transition-all duration-200 cursor-pointer"
          >
            <span>{project.linkText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </TiltCard>
    </div>
  );
}