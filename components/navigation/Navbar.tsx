"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Projecten", href: "#projects" },
  { label: "Over mij", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "projects", "about", "skills", "contact"];
      let current = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            current = sectionId;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(92%,1160px)] z-50">
        <nav
          className={cn(
            "h-16 px-6 md:px-8 rounded-full flex items-center justify-between transition-all duration-300",
            "bg-white/80 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_30px_-10px_rgba(10,10,10,0.06),0_1px_0_rgba(255,255,255,0.9)_inset]",
            scrolled &&
              "bg-white/92 border-black/[0.14] shadow-[0_16px_40px_-10px_rgba(10,10,10,0.12)] -translate-y-1"
          )}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            className="font-display text-2xl font-bold italic tracking-tight text-ink group inline-flex items-baseline gap-0.5"
          >
            Bram
            <span className="text-[#0077b6] group-hover:text-[#00b4ff] transition-colors">
              .
            </span>
          </a>

          {/* Desktop Capsule Menu */}
          <ul className="hidden md:flex items-center gap-1.5 list-none bg-black/[0.04] p-1 rounded-full border border-black/[0.06]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={cn(
                      "relative block px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 z-10",
                      isActive
                        ? "text-[#0077b6]"
                        : "text-ink-soft hover:text-ink hover:bg-black/[0.04]"
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(10,10,10,0.08),0_0_14px_rgba(0,180,255,0.2)] pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right Action / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="relative hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase text-white bg-ink overflow-hidden border border-white/10 transition-all duration-200 hover:bg-[#0077b6] hover:shadow-[0_6px_20px_rgba(0,180,255,0.35)] group"
            >
              <span className="relative z-10">Contact</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5" />
              <span
                className="pointer-events-none absolute -top-1/2 -left-[60%] w-[40%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-[25deg] transition-[left] duration-700 ease-out group-hover:left-[140%]"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-ink hover:bg-black/[0.05] transition-colors"
              aria-label="Menu openen of sluiten"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[min(92%,1160px)] bg-white/95 backdrop-blur-2xl border border-black/[0.1] rounded-2xl shadow-xl p-4 flex flex-col gap-1 z-40 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl font-semibold text-ink hover:bg-bg-soft hover:text-[#0077b6] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl font-semibold text-[#0077b6] bg-[#00b4ff]/10 hover:bg-[#00b4ff]/20 transition-colors"
            >
              Contact opnemen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
