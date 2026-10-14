"use client";

import { Linkedin, Github, Mail, Globe, ArrowUp, Zap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { soundEngine } from "@/lib/sound";

export function Footer() {
  const { footer, socials } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 py-14 px-6 bg-[#05070c] text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              onClick={() => soundEngine.playClick()}
              className="font-display text-2xl font-bold italic tracking-tight text-white group inline-flex items-baseline gap-1"
            >
              Bram
              <span className="text-[#00b4ff] drop-shadow-[0_0_10px_#00b4ff]">
                .
              </span>
            </a>
            <p className="text-xs text-white/50 mt-1">{footer.role}</p>
          </div>

          {/* Ecosystem Cross-Links */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Projecten", href: "#projects" },
              { label: "Over mij", href: "#about" },
              { label: "Tech Stack", href: "#skills" },
              { label: "StudyElite.nl ↗", href: "https://studyelite.nl", external: true },
              { label: "Agevo Studio ↗", href: "https://agevodev.nl", external: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => soundEngine.playClick()}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/65 bg-white/[0.04] border border-white/10 hover:text-white hover:border-[#00b4ff] hover:bg-[#00b4ff]/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons + Scroll to Top */}
          <div className="flex items-center gap-2.5">
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
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00b4ff] hover:border-[#00b4ff] hover:shadow-[0_0_15px_#00b4ff] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                  aria-label={soc.label}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}

            <button
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Naar boven"
              aria-label="Scroll naar boven"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar with Engineered by Agevo Badge */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>{footer.copyright}</p>
          <a
            href="https://agevodev.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b4ff]/10 border border-[#00b4ff]/30 text-[#7dd3fc] hover:bg-[#00b4ff] hover:text-black font-bold transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Engineered by Agevo</span>
          </a>
        </div>
      </div>
    </footer>
  );
}