"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { soundEngine } from "@/lib/sound";
import confetti from "canvas-confetti";

const TIMELINE_OPTIONS = [
  "Zo snel mogelijk (< 4 weken)",
  "Over 1 tot 3 maanden",
  "Flexibel / Oriënterend",
];

export function ContactSection() {
  const { contact, contactInfo } = PORTFOLIO_DATA;

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    femail: "",
    ftype: contact.projectTypes[0],
    timeline: TIMELINE_OPTIONS[0],
    fmsg: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();

    if (!form.fname || !form.femail || !form.fmsg) {
      setToastMessage("Vul je naam, e-mailadres en een kort bericht in.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (!form.femail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setToastMessage("Voer een geldig e-mailadres in.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("loading");

    try {
      // Probeer eerst een eventuele endpoint, met automatische mailto-fallback voor 100% garantie op Vercel
      const subject = encodeURIComponent(
        `[${form.ftype}] Aanvraag via bramverhoeff.nl — ${form.fname} ${form.lname}`.trim()
      );
      const body = encodeURIComponent(
        `Naam: ${form.fname} ${form.lname}\nE-mail: ${form.femail}\nType traject: ${form.ftype}\nGewenste tijdlijn: ${form.timeline}\n\nBericht:\n${form.fmsg}`
      );

      window.location.href = `mailto:bramverhoeff@hotmail.com?subject=${subject}&body=${body}`;

      setStatus("success");
      setToastMessage(
        "Je aanvraag staat klaar in je mail-app! Ik reageer doorgaans binnen 24 uur."
      );

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.65 },
          colors: ["#00b4ff", "#0077b6", "#10b981", "#ffffff"],
        });
      } catch {
        // Fallback als canvas niet beschikbaar is
      }

      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setToastMessage(
        "Er ging iets mis. Mail direct naar bramverhoeff@hotmail.com."
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#0a0d10] text-[#f2ece2] relative z-10 overflow-hidden"
    >
      {/* Pulsing Gradient Aura */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,180,255,0.16),transparent_70%)] blur-[50px] animate-aura -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Info + Agevo B2B Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeader
              label={contact.label}
              title={contact.title}
              description={contact.description}
              dark
            />

            {/* Direct Agevo Studio Banner */}
            <a
              href="https://agevodev.nl"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="block p-5 rounded-2xl bg-gradient-to-r from-[#00b4ff]/15 via-[#0077b6]/10 to-transparent border border-[#00b4ff]/40 hover:border-[#00b4ff] mb-6 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00b4ff] text-black flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#7dd3fc] font-bold">
                      Zakelijk Project of Offerte?
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white">
                      Bekijk mijn studio Agevo Development →
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#00b4ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            <div className="space-y-3.5">
              {contactInfo.map((item, idx) => {
                const IconComponent =
                  idx === 0 ? Mail : idx === 1 ? Building : idx === 2 ? MapPin : Clock;

                return (
                  <div
                    key={item.label}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4 hover:border-[#00b4ff] hover:translate-x-1 transition-all duration-200"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#00b4ff]/15 text-[#00b4ff] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">{item.label}</div>
                      {item.url ? (
                        <a
                          href={item.url}
                          target={item.url.startsWith("http") ? "_blank" : undefined}
                          rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold text-white hover:text-[#00b4ff] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-semibold text-white">{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Interactive Project Estimator & Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-9 rounded-3xl bg-white/[0.04] border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.45)] space-y-6"
            >
              {/* Step 1: Interactive Project Type Pills */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#7dd3fc] font-bold">
                  1. Waar gaat het over?
                </label>
                <div className="flex flex-wrap gap-2">
                  {contact.projectTypes.map((type) => {
                    const active = form.ftype === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setForm({ ...form, ftype: type });
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${active
                            ? "bg-[#00b4ff] text-black border-[#00b4ff] font-bold shadow-[0_0_15px_rgba(0,180,255,0.4)]"
                            : "bg-white/[0.04] text-white/75 border-white/10 hover:border-white/30 hover:text-white"
                          }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Timeline Pills */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#7dd3fc] font-bold">
                  2. Gewenste Tijdlijn
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TIMELINE_OPTIONS.map((tl) => {
                    const active = form.timeline === tl;
                    return (
                      <button
                        key={tl}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setForm({ ...form, timeline: tl });
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${active
                            ? "bg-[#00b4ff]/20 text-[#38bdf8] border-[#00b4ff]"
                            : "bg-white/[0.03] text-white/65 border-white/10 hover:border-white/25"
                          }`}
                      >
                        {tl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label htmlFor="fname" className="block text-xs font-semibold text-white/70">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={form.fname}
                    onChange={handleChange}
                    placeholder="Jan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="lname" className="block text-xs font-semibold text-white/70">
                    Achternaam / Bedrijf
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={form.lname}
                    onChange={handleChange}
                    placeholder="de Vries B.V."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="femail" className="block text-xs font-semibold text-white/70">
                  E-mailadres *
                </label>
                <input
                  type="email"
                  id="femail"
                  name="femail"
                  value={form.femail}
                  onChange={handleChange}
                  placeholder="jan@bedrijf.nl"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="fmsg" className="block text-xs font-semibold text-white/70">
                  Projectomschrijving of vraag *
                </label>
                <textarea
                  id="fmsg"
                  name="fmsg"
                  value={form.fmsg}
                  onChange={handleChange}
                  placeholder="Vertel kort wat je wilt bouwen of automatiseren..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 transition-all resize-none"
                  required
                />
              </div>

              {status !== "idle" && status !== "loading" && (
                <div
                  className={`p-3.5 rounded-xl text-sm flex items-center gap-2.5 ${status === "success"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{toastMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="relative w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide text-black bg-[#00b4ff] hover:bg-[#38bdf8] shadow-[0_10px_30px_rgba(0,180,255,0.4)] disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Voorbereiden...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Start aanvraag ({form.ftype})</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}