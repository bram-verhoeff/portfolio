"use client";

import { Linkedin, Github, Mail, Globe } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Footer() {
  const { footer, socials } = PORTFOLIO_DATA;

  return (
    <footer className="border-t border-black/[0.08] py-14 px-6 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="font-display text-2xl font-bold italic tracking-tight text-ink group inline-flex items-baseline gap-0.5"
            >
              Bram
              <span className="text-[#0077b6] group-hover:text-[#00b4ff] transition-colors">
                .
              </span>
            </a>
            <p className="text-xs text-muted mt-1">{footer.role}</p>
          </div>

          {/* Navigation Pill Links */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Projecten", href: "#projects" },
              { label: "Over mij", href: "#about" },
              { label: "Skills", href: "#skills" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-muted bg-white border border-black/[0.08] hover:text-ink hover:border-[#00b4ff] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,180,255,0.15)] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
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
                  className="w-10 h-10 rounded-full border border-black/[0.1] bg-white flex items-center justify-center text-ink-soft hover:text-white hover:bg-ink hover:border-ink hover:-translate-y-1 transition-all duration-200"
                  aria-label={soc.label}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-10 pt-8 border-t border-black/[0.06]">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
