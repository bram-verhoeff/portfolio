"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Download, Globe, Linkedin, Github, Sparkles, Box, Terminal as TerminalIcon } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { HeroStatusBadge } from "./HeroStatusBadge";
import { Typewriter } from "./Typewriter";
import { TextScramble } from "./TextScramble";
import { HeroTerminal } from "./HeroTerminal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroCanvas3D = dynamic(
  () => import("./HeroCanvas3D").then((mod) => mod.HeroCanvas3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00b4ff] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export function Hero() {
  const { personal, socials } = PORTFOLIO_DATA;
  const [activeShowpiece, setActiveShowpiece] = useState<"terminal" | "3d">("terminal");

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex items-center"
    >
      {/* Aurora radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#00b4ff]/25 to-transparent rounded-full blur-3xl opacity-75 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#0077b6]/20 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left Column: Monumental Content */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <HeroStatusBadge />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-mono font-bold text-[#0077b6]">
              <Sparkles className="w-3.5 h-3.5 text-[#00b4ff]" />
              <TextScramble text={personal.eyebrowMatrix} delay={400} />
            </div>
          </div>

          {/* Staggered Headline with Text Scramble decoder and flowing gradient */}
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.025em] leading-[1.06] text-ink"
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
            className="text-base sm:text-lg text-muted leading-relaxed max-w-xl"
          >
            {personal.heroStorytellingLead}
          </motion.p>

          {/* Magnetic CTA Buttons with moving border beam */}
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
              <Mail className="w-4 h-4 text-[#0077b6]" />
              <span>Start een project</span>
            </MagneticButton>

            <MagneticButton
              href={personal.cvFile}
              variant="secondary"
              download
            >
              <Download className="w-4 h-4 text-[#0077b6]" />
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
                  className="w-11 h-11 rounded-full border border-black/[0.14] bg-white/80 backdrop-blur-md flex items-center justify-center text-ink-soft hover:text-white hover:bg-ink hover:border-ink hover:-translate-y-1 hover:shadow-md transition-all duration-200"
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
          <div className="flex items-center gap-2 p-1 bg-black/[0.04] border border-black/[0.08] rounded-full mb-4">
            <button
              type="button"
              onClick={() => setActiveShowpiece("terminal")}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                activeShowpiece === "terminal"
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5 text-[#00b4ff]" />
              Code Terminal
            </button>
            <button
              type="button"
              onClick={() => setActiveShowpiece("3d")}
              className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                activeShowpiece === "3d"
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Box className="w-3.5 h-3.5 text-[#0077b6]" />
              3D Kinetic Mesh
            </button>
          </div>

          {activeShowpiece === "terminal" ? (
            <HeroTerminal />
          ) : (
            <div className="w-full max-w-[620px] rounded-card bg-[#0a0d10] border border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_35px_-8px_rgba(0,180,255,0.2)] p-4 relative overflow-hidden">
              <HeroCanvas3D />
              <div className="text-center text-xs text-white/50 font-mono pb-2">
                Drag / hover cursor to rotate 3D kinetic geometry
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
