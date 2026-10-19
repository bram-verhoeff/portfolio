"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { scrollToId, useLenis } from "@/components/providers/SmoothScroll";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { id: "work", label: "Werk" },
  { id: "about", label: "Over" },
  { id: "journey", label: "Reis" },
  { id: "skills", label: "Expertise" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const introDone = useIntroDone();
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 16);
  });

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the menu start closing before Lenis takes over the scroll.
    setTimeout(() => scrollToId(lenis, id), open ? 300 : 0);
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[65] border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-white/[0.06] bg-canvas/75 backdrop-blur-xl" : "border-transparent",
        )}
        initial={{ y: "-100%" }}
        animate={{ y: introDone && (!hidden || open) ? "0%" : "-100%" }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8" aria-label="Hoofdnavigatie">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="flex items-center gap-2.5 text-[14px] font-medium tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-fg font-mono text-[11px] font-semibold text-canvas">BV</span>
            Bram Verhoeff
          </a>

          <ul className="hidden items-center gap-1 text-[13px] text-muted md:flex">
            {NAV_LINKS.slice(0, -1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.id);
                  }}
                  className="rounded-md px-3 py-1.5 transition-colors duration-200 hover:bg-white/[0.05] hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="hidden h-8 items-center rounded-md bg-fg px-3.5 text-[13px] font-medium text-canvas transition-colors duration-200 hover:bg-accent md:inline-flex"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-9 w-9 place-items-center rounded-md border border-white/10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
            >
              <span className="relative block h-2.5 w-4">
                <motion.span
                  className="absolute left-0 top-0 h-px w-full bg-fg"
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full bg-fg"
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[64] flex flex-col justify-between bg-canvas px-5 pb-[max(env(safe-area-inset-bottom),2rem)] pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted">
              {PORTFOLIO_DATA.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
