"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCards } from "./StatCards";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Sparkles, Terminal, Award, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { soundEngine } from "@/lib/sound";

export function TimelineSection() {
  const { about, timeline } = PORTFOLIO_DATA;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const startDist = winH * 0.72;
      const currentDist = startDist - rect.top;
      const totalDist = rect.height;
      const fraction = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setFillHeight(fraction * 100);

      const items = timelineRef.current.querySelectorAll(".timeline-node");
      items.forEach((item, idx) => {
        const iRect = item.getBoundingClientRect();
        if (iRect.top < winH * 0.68) {
          setActiveIndex(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="py-24 bg-[#080b11] relative z-10 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[360px] mx-auto lg:mx-0 sticky top-28"
          >
            <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#101726] to-[#07090e] border border-white/12 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_35px_rgba(0,180,255,0.2)] flex flex-col items-center justify-between p-8 overflow-hidden group">
              {/* Radial background dots */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(0, 180, 255, 0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
              />

              <div className="w-full flex items-center justify-between text-xs font-mono text-white/50 relative z-10">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  AVAILABLE
                </span>
                <span>NL // 18 YRS</span>
              </div>

              {/* Glowing Monogram */}
              <div className="relative flex flex-col items-center justify-center my-auto">
                <div className="absolute w-36 h-36 bg-[#00b4ff]/25 rounded-full blur-2xl group-hover:scale-130 transition-transform duration-500" />
                <span className="font-display italic text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-[#7dd3fc] to-[#00b4ff] drop-shadow-[0_0_35px_rgba(0,180,255,0.6)] transition-transform duration-500 group-hover:scale-105 relative z-10">
                  BV
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#7dd3fc] mt-3 font-bold">
                  Bram Verhoeff
                </span>
              </div>

              {/* Bottom Telemetry Chip */}
              <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono relative z-10">
                <span>FOUNDER</span>
                <span className="text-white font-bold">Agevo Dev ⚡</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Scroll-Driven Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              label={about.label}
              title={about.title}
              className="mb-6"
              dark
            />

            <div className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed mb-10 font-sans">
              <p>{about.bioParagraph1}</p>
              <p>
                Oprichter van softwarebedrijf{" "}
                <strong className="text-white font-semibold">Agevo Development</strong> (KVK
                42160840) en het AI-studieplannerplatform{" "}
                <strong className="text-white font-semibold">StudyElite</strong>. Gedreven door
                innovatie, geavanceerde automations en het bouwen van tastbare,
                schaalbare applicaties voor ambitieuze bedrijven.
              </p>
            </div>

            {/* Scroll-Driven Timeline */}
            <div
              ref={timelineRef}
              className="relative pl-9 my-10"
              aria-label="Tijdlijn van opleidingen en stage"
            >
              {/* Timeline Track Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full">
                <div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#0077b6] via-[#00b4ff] to-[#38bdf8] rounded-full shadow-[0_0_12px_rgba(0,180,255,0.8)] transition-all duration-150 ease-out"
                  style={{ height: `${fillHeight}%` }}
                />
              </div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const isNodeActive = index <= activeIndex;
                  return (
                    <div
                      key={item.period}
                      className="timeline-node relative transition-opacity duration-300"
                    >
                      {/* Node Bullet */}
                      <span
                        className={`absolute -left-[2.15rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isNodeActive
                            ? "bg-[#00b4ff] border-white shadow-[0_0_0_4px_rgba(0,180,255,0.35),0_0_15px_rgba(0,180,255,0.8)]"
                            : "bg-[#0a0d10] border-white/20"
                        }`}
                      />

                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7dd3fc] mb-1">
                        {item.period}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-white mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stat Cards */}
            <StatCards stats={about.stats} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
