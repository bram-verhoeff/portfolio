"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { soundEngine } from "@/lib/sound";

const NAV_ITEMS = [
  { label: "Projecten", href: "#projects" },
  { label: "Over mij", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.isMuted());

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

  const handleSoundToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEngine.playClick();
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(94%,1160px)] z-50">
        <nav
          className={cn(
            "h-16 px-5 md:px-8 rounded-full flex items-center justify-between transition-all duration-300",
            "bg-[#070a10]/80 backdrop-blur-2xl border border-white/12 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(0,180,255,0.12)]",
            scrolled &&
              "bg-[#05070c]/95 border-[#00b4ff]/35 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(0,180,255,0.25)] -translate-y-1"
          )}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={() => soundEngine.playClick()}
            className="font-display text-2xl font-bold italic tracking-tight text-white group inline-flex items-baseline gap-1"
          >
            Bram
            <span className="text-[#00b4ff] drop-shadow-[0_0_10px_#00b4ff] group-hover:scale-125 transition-transform">
              .
            </span>
          </a>

          {/* Desktop Capsule Menu */}
          <ul className="hidden md:flex items-center gap-1 list-none bg-white/[0.04] p-1 rounded-full border border-white/10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={() => soundEngine.playClick()}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={cn(
                      "relative block px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 z-10",
                      isActive
                        ? "text-black font-bold"
                        : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#00b4ff] rounded-full shadow-[0_0_15px_rgba(0,180,255,0.5)] pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right Action: Sound Toggle + Contact CTA */}
          <div className="flex items-center gap-3">
            {/* Audio Synth Toggle with animated visualizer bars */}
            <button
              type="button"
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                !isMuted
                  ? "bg-[#00b4ff]/15 border-[#00b4ff]/40 text-[#00b4ff] shadow-[0_0_12px_rgba(0,180,255,0.25)]"
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white"
              }`}
              title={isMuted ? "Audio gedempt (klik om geluid aan te zetten)" : "Synthesizer audio actief"}
              aria-label="Toggle geluid"
            >
              {!isMuted ? (
                <div className="flex items-center gap-0.5 h-3.5 px-0.5">
                  <span className="w-0.5 h-3 bg-[#00b4ff] animate-pulse" />
                  <span className="w-0.5 h-2 bg-[#00b4ff] animate-pulse [animation-delay:0.15s]" />
                  <span className="w-0.5 h-3.5 bg-[#00b4ff] animate-pulse [animation-delay:0.3s]" />
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Contact Button */}
            <a
              href="#contact"
              onClick={() => soundEngine.playClick()}
              className="relative hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-[#0077b6] to-[#00b4ff] overflow-hidden border border-[#00b4ff]/40 shadow-[0_0_20px_rgba(0,180,255,0.35)] hover:shadow-[0_0_30px_rgba(0,180,255,0.6)] transition-all duration-200 group cursor-pointer"
            >
              <span className="relative z-10">Contact</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setMobileOpen(!mobileOpen);
              }}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[min(94%,1160px)] bg-[#070a10]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl p-4 flex flex-col gap-1 z-40 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  soundEngine.playClick();
                  setMobileOpen(false);
                }}
                className="px-4 py-3 rounded-xl font-semibold text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => {
                soundEngine.playClick();
                setMobileOpen(false);
              }}
              className="px-4 py-3 rounded-xl font-semibold text-black bg-[#00b4ff] shadow-[0_0_15px_#00b4ff] transition-colors text-center mt-2 font-bold"
            >
              Contact opnemen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
