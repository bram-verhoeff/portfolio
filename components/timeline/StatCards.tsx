"use client";

import { TiltCard } from "@/components/ui/TiltCard";
import { Rocket, Cake, Building, Zap } from "lucide-react";
import { StatItem } from "@/data/portfolio";
import { soundEngine } from "@/lib/sound";

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
            className="p-5 bg-gradient-to-b from-[#0f1420] to-[#080b11] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#00b4ff]/60 hover:shadow-[0_15px_35px_rgba(0,180,255,0.2)] transition-all duration-300"
            maxTilt={5}
          >
            <div
              onMouseEnter={() => soundEngine.playHover()}
              className="flex flex-col h-full justify-between"
            >
              <div className="w-9 h-9 rounded-xl bg-[#00b4ff]/15 flex items-center justify-center text-[#00b4ff] mb-3">
                <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
              </div>
              <div>
                <div className="font-display font-semibold text-2xl sm:text-3xl text-white leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 mt-1 font-medium">{stat.label}</div>
              </div>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
}
