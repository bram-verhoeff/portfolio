"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { soundEngine } from "@/lib/sound";

export function TechMarquee() {
  const items = PORTFOLIO_DATA.techMarquee;
  const loopItems = [...items, ...items];

  return (
    <section className="py-7 border-y border-white/10 overflow-hidden relative z-10 bg-[#06090e]/60 backdrop-blur-md [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee gap-8">
        {loopItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 shadow-xs text-sm font-semibold text-white/80 whitespace-nowrap hover:border-[#00b4ff] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,180,255,0.35)] transition-all duration-200 cursor-default"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: item.color, color: item.color }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
