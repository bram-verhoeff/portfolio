"use client";

import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function TechMarquee() {
  const items = PORTFOLIO_DATA.techMarquee;

  return (
    <section aria-label="Technologieën" className="border-y border-white/[0.06] py-6">
      <h2 className="sr-only">Tech stack: {items.join(", ")}</h2>
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <VelocityMarquee baseVelocity={-1.2} className="text-[15px] font-medium text-muted">
          {items.map((name) => (
            <span key={name} className="flex items-center gap-10 pr-10">
              {name}
              <span className="h-1 w-1 rounded-full bg-subtle" aria-hidden="true" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
