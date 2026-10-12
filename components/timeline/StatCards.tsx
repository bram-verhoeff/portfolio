"use client";

import { TiltCard } from "@/components/ui/TiltCard";
import { Rocket, Cake, Building, Zap } from "lucide-react";
import { StatItem } from "@/data/portfolio";

interface StatCardsProps {
  stats: StatItem[];
}

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mt-8">
      {stats.map((stat, i) => {
        const IconComponent =
          i === 0 ? Rocket : i === 1 ? Cake : i === 2 ? Building : Zap;

        return (
          <TiltCard
            key={stat.label}
            className="p-5 bg-white border border-black/[0.08] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-20px_rgba(10,10,10,0.1)] hover:border-[#00b4ff] hover:shadow-[0_12px_28px_-8px_rgba(0,180,255,0.2)] transition-all duration-300"
            maxTilt={5}
          >
            <IconComponent className="w-5 h-5 text-[#0077b6] mb-2.5 transition-transform group-hover:scale-110" />
            <div className="font-display font-semibold text-2xl sm:text-3xl text-ink leading-tight">
              {stat.value}
            </div>
            <div className="text-xs text-muted mt-1 font-medium">{stat.label}</div>
          </TiltCard>
        );
      })}
    </div>
  );
}
