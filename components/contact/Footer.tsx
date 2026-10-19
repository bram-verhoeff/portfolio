"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { NAV_LINKS } from "@/components/navigation/Navbar";
import { scrollToId, useLenis } from "@/components/providers/SmoothScroll";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useClock } from "@/lib/useClock";

function RisingLetter({ char, i, total, progress }: { char: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = (i / total) * 0.35;
  const y = useTransform(progress, [start, start + 0.65], ["100%", "0%"]);
  return (
    <span className="inline-block overflow-hidden">
      <motion.span className="inline-block" style={{ y }}>
        {char === " " ? " " : char}
      </motion.span>
    </span>
  );
}

export function Footer() {
  const { personal, socials } = PORTFOLIO_DATA;
  const lenis = useLenis();
  const time = useClock();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const word = personal.name;

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-fg font-mono text-[11px] font-semibold text-canvas">BV</span>
          <p className="max-w-[15rem] text-[14px] leading-relaxed text-muted">Software die schaalt en direct waarde oplevert.</p>
        </div>

        <div>
          <h3 className="text-[13px] text-subtle">Navigatie</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(lenis, l.id);
                  }}
                  className="transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] text-subtle">Online</h3>
          <ul className="mt-3 space-y-2 text-[14px] text-muted">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <h3 className="text-[13px] text-subtle">Lokale tijd</h3>
            <p className="mt-3 text-[14px] tabular-nums text-muted">
              {personal.location}
              {time && ` · ${time}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToId(lenis, "top")}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 px-3 text-[13px] text-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            Terug naar boven ↑
          </button>
        </div>
      </div>

      {/* Faint wordmark that rises letter by letter as the page bottoms out */}
      <div
        aria-hidden="true"
        className="mt-16 flex select-none justify-center whitespace-nowrap px-5 text-[11.5vw] font-semibold leading-[0.85] tracking-[-0.05em] text-white/[0.06]"
      >
        {word.split("").map((char, i) => (
          <RisingLetter key={i} char={char} i={i} total={word.length} progress={scrollYProgress} />
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-white/[0.06] px-5 py-5 text-[12px] text-subtle sm:flex-row sm:justify-between sm:px-8">
        <span>© 2026 {personal.name}</span>
        <span>
          {personal.company} · KVK {personal.kvk}
        </span>
      </div>
    </footer>
  );
}
