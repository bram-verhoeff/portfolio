"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function TechMarquee() {
  const items = PORTFOLIO_DATA.techMarquee;
  const loopItems = [...items, ...items];

  return (
    <section className="py-7 border-y border-black/[0.08] overflow-hidden relative z-10 bg-white/50 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee gap-8">
        {loopItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-black/[0.08] shadow-xs text-sm font-semibold text-ink-soft whitespace-nowrap hover:border-[#00b4ff] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(0,180,255,0.18)] transition-all duration-200"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
