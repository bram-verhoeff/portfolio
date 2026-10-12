"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Mail,
  Download,
  Globe,
  Linkedin,
  Github,
  Sparkles,
  Box,
  Terminal as TerminalIcon,
  Bot,
  Zap,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { HeroStatusBadge } from "./HeroStatusBadge";
import { Typewriter } from "./Typewriter";
import { TextScramble } from "./TextScramble";
import { HeroTerminal } from "./HeroTerminal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { soundEngine } from "@/lib/sound";

const HeroCanvas3D = dynamic(
  () => import("./HeroCanvas3D").then((mod) => mod.HeroCanvas3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00b4ff] border-t-transparent animate-spin shadow-[0_0_15px_#00b4ff]" />
      </div>
    ),
  }
);

export function Hero() {
  const { personal, socials } = PORTFOLIO_DATA;
  const [activeShowpiece, setActiveShowpiece] = useState<"terminal" | "3d">("terminal");
  const [nlTime, setNlTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setNlTime(
        now.toLocaleTimeString("nl-NL", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex items-center"
    >
      {/* Aurora radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-gradient-to-br from-[#00b4ff]/20 via-[#0077b6]/15 to-transparent rounded-full blur-[120px] opacity-80 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#38bdf8]/15 via-[#8b5cf6]/10 to-transparent rounded-full blur-[110px] opacity-65" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left Column: Monumental Content */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <HeroStatusBadge />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-[#7dd3fc]">
              <Sparkles className="w-3.5 h-3.5 text-[#00b4ff]" />
              <TextScramble text={personal.eyebrowMatrix} delay={400} />
            </div>
            {nlTime && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b4ff]" />
                <span>AMS {nlTime}</span>
              </div>
            )}
          </div>

          {/* Staggered Headline with glowing gradient */}
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.025em] leading-[1.06] text-white"
            >
              <span>{personal.heroHeadlinePart1}</span>
              <br />
              <span className="hero-gradient-text">{personal.heroHeadlineHighlight}</span>
            </motion.h1>
          </div>

          <Typewriter />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl font-sans"
          >
            {personal.heroStorytellingLead}
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <MagneticButton href="#projects" variant="primary">
              <ArrowDown className="w-4 h-4" />
              <span>Bekijk live platforms</span>
            </MagneticButton>

            <MagneticButton href="#contact" variant="secondary">
              <Mail className="w-4 h-4 text-[#00b4ff]" />
              <span>Start een project</span>
            </MagneticButton>

            <MagneticButton
              href={personal.cvFile}
              variant="secondary"
              download
            >
              <Download className="w-4 h-4 text-[#7dd3fc]" />
              <span>Download CV</span>
            </MagneticButton>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.48 }}
            className="flex items-center gap-3 pt-3"
          >
            {socials.map((soc) => {
              const IconComponent =
                soc.name === "LinkedIn"
                  ? Linkedin
                  : soc.name === "GitHub"
                  ? Github
                  : soc.name === "Email"
                  ? Mail
                  : Globe;

              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-11 h-11 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00b4ff] hover:border-[#00b4ff] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,180,255,0.4)] transition-all duration-200 cursor-pointer"
                  title={soc.label}
                  aria-label={soc.label}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Showpiece & Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          {/* Mode Switcher pill */}
          <div className="flex items-center gap-2 p-1 bg-white/[0.05] border border-white/10 rounded-full mb-4">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActiveShowpiece("terminal");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeShowpiece === "terminal"
                  ? "bg-[#00b4ff] text-black shadow-[0_0_15px_#00b4ff] font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              Code Terminal
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActiveShowpiece("3d");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeShowpiece === "3d"
                  ? "bg-[#00b4ff] text-black shadow-[0_0_15px_#00b4ff] font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              3D Quantum Core
            </button>
          </div>

          {activeShowpiece === "terminal" ? (
            <HeroTerminal />
          ) : (
            <div className="w-full max-w-[620px] rounded-2xl bg-[#080b10] border border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_35px_-8px_rgba(0,180,255,0.22)] p-4 relative overflow-hidden">
              <HeroCanvas3D />
              <div className="text-center text-xs text-white/50 font-mono pb-2">
                Beweeg of sleep cursor om 3D quantum mesh te manipuleren ✦
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
