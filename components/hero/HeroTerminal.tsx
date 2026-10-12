"use client";

import { useEffect, useState } from "react";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { CheckCircle2, ExternalLink, Code2, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<"code" | "products">("code");
  const codeSnippet = [
    '<span class="text-[#00b4ff] font-bold">const</span> <span class="text-white">architect</span> = {',
    '  <span class="text-[#7dd3fc]">name</span>: <span class="text-[#4ade80]">"Bram Verhoeff"</span>,',
    '  <span class="text-[#7dd3fc]">title</span>: <span class="text-[#4ade80]">"Full-Stack Software Architect"</span>,',
    '  <span class="text-[#7dd3fc]">age</span>: <span class="text-[#fbbf24]">18</span>,',
    '  <span class="text-[#7dd3fc]">founderOf</span>: <span class="text-[#4ade80]">"Agevo Development (KVK 42160840)"</span>,',
    '  <span class="text-[#7dd3fc]">livePlatforms</span>: [',
    '    <span class="text-[#4ade80]">"Agevo Development // agevodev.nl"</span>,',
    '    <span class="text-[#4ade80]">"StudyElite // studyelite.nl"</span>',
    '  ],',
    '  <span class="text-[#7dd3fc]">stack</span>: [',
    '    <span class="text-[#4ade80]">"Next.js / React / TypeScript"</span>,',
    '    <span class="text-[#4ade80]">"PHP / Symfony / Node.js"</span>,',
    '    <span class="text-[#4ade80]">"Go High Level Automations"</span>',
    '  ],',
    '  <span class="text-[#7dd3fc]">status</span>: <span class="text-[#4ade80]">"Beschikbaar voor nieuwe projecten 🚀"</span>',
    '};',
  ];

  const [displayedLineCount, setDisplayedLineCount] = useState(codeSnippet.length);

  useEffect(() => {
    if (activeTab === "code") {
      const interval = setInterval(() => {
        setDisplayedLineCount((prev) => {
          if (prev < codeSnippet.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [activeTab, codeSnippet.length]);

  return (
    <div className="relative w-full max-w-[620px] mx-auto lg:mx-0">
      <TiltCard
        className="bg-[#0a0d10] border border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_35px_-8px_rgba(0,180,255,0.2)] overflow-hidden"
        maxTilt={7}
      >
        <BorderBeam size={170} />

        {/* macOS-style Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.04] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "code"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[#00b4ff]" />
              developer.ts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "products"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#4ade80]" />
              live-products.json
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white/45 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
            v2.6.0
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-6 min-h-[300px] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-[#f2ece2]">
          {activeTab === "code" ? (
            <div className="space-y-0.5">
              {codeSnippet.slice(0, displayedLineCount).map((line, idx) => (
                <div
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: line }}
                  className="whitespace-pre"
                />
              ))}
              {displayedLineCount < codeSnippet.length && (
                <span className="inline-block w-2 h-4 bg-[#00b4ff] ml-1 animate-pulse align-middle" />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 py-1">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <a
                  key={proj.id}
                  href={`#project-${proj.id}`}
                  className="group/item flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-[#00b4ff] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#00b4ff]/15 text-[#00b4ff]">
                      {proj.number.slice(0, 2)}
                    </span>
                    <div>
                      <strong className="text-white text-sm block group-hover/item:text-[#00b4ff] transition-colors">
                        {proj.title}
                      </strong>
                      <p className="text-white/50 text-xs mt-0.5">
                        {proj.tags.join(" · ")}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#00b4ff] transition-transform group-hover/item:translate-x-0.5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-black/40 border-t border-white/[0.08] text-xs text-white/50 font-sans">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>System online &amp; ready</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-white">2 Live Producten</span>
            <span>·</span>
            <span className="text-white">18 Jaar</span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
