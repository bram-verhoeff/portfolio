"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCards } from "./StatCards";
import { PORTFOLIO_DATA } from "@/data/portfolio";

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
    <section id="about" className="py-24 bg-bg-soft/70 relative z-10 border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Avatar Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[340px] mx-auto lg:mx-0 sticky top-28"
          >
            <div className="relative aspect-[4/5] rounded-card bg-[#0a0d10] border border-white/10 shadow-[0_30px_60px_-20px_rgba(10,10,10,0.28)] flex items-center justify-center overflow-hidden group">
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
              />
              <span className="font-display italic text-8xl font-semibold text-[#00b4ff] drop-shadow-[0_0_25px_rgba(0,180,255,0.4)] transition-transform duration-500 group-hover:scale-105">
                BV
              </span>
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
            />

            <div className="space-y-4 text-muted text-base md:text-lg leading-relaxed mb-8">
              <p>{about.bioParagraph1}</p>
              <p>
                Oprichter van softwarebedrijf{" "}
                <strong className="text-ink">Agevo Development</strong> (KVK
                42160840) en het AI-studieplannerplatform{" "}
                <strong className="text-ink">StudyElite</strong>. Gedreven door
                innovatie, geavanceerde automations en het bouwen van tastbare,
                schaalbare applicaties voor ambitieuze bedrijven.
              </p>
            </div>

            {/* Scroll-Driven Timeline */}
            <div
              ref={timelineRef}
              className="relative pl-9 my-8"
              aria-label="Tijdlijn van opleidingen en stage"
            >
              {/* Timeline Track Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-black/[0.14] rounded-full">
                <div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#0077b6] to-[#00b4ff] rounded-full shadow-[0_0_10px_rgba(0,180,255,0.6)] transition-all duration-150 ease-out"
                  style={{ height: `${fillHeight}%` }}
                />
              </div>

              {/* Timeline Items */}
              <div className="space-y-7">
                {timeline.map((item, index) => {
                  const isNodeActive = index <= activeIndex;
                  return (
                    <div
                      key={item.period}
                      className="timeline-node relative transition-opacity duration-300"
                    >
                      {/* Node Bullet */}
                      <span
                        className={`absolute -left-[2.15rem] top-1 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          isNodeActive
                            ? "bg-[#0077b6] border-[#00b4ff] shadow-[0_0_0_4px_rgba(0,180,255,0.25),0_0_12px_rgba(0,180,255,0.6)]"
                            : "bg-white border-muted shadow-xs"
                        }`}
                      />

                      <div className="text-xs font-extrabold uppercase tracking-widest text-[#0077b6] mb-1">
                        {item.period}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-ink mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed">
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
