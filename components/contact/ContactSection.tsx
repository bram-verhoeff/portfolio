"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import confetti from "canvas-confetti";

export function ContactSection() {
  const { contact, contactInfo } = PORTFOLIO_DATA;

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    femail: "",
    ftype: "",
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

    if (!form.fname || !form.lname || !form.femail || !form.fmsg) {
      setToastMessage("Vul alle verplichte velden in");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (!form.femail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setToastMessage("Voer een geldig email adres in");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (form.fmsg.length < 10) {
      setToastMessage("Bericht moet minimaal 10 karakters bevatten");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("fname", form.fname);
      formData.append("lname", form.lname);
      formData.append("femail", form.femail);
      formData.append("ftype", form.ftype);
      formData.append("fmsg", form.fmsg);

      const response = await fetch("/contact.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setToastMessage("Bericht succesvol verzonden! Ik neem snel contact op.");
        setForm({ fname: "", lname: "", femail: "", ftype: "", fmsg: "" });

        // Trigger Canvas Confetti celebration
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.65 },
            colors: ["#00b4ff", "#0077b6", "#10b981", "#ffffff"],
          });
        } catch {
          // Fallback if canvas is unavailable
        }

        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error(data.message || "Verzenden mislukt");
      }
    } catch (err: any) {
      setStatus("error");
      setToastMessage(err.message || "Er is een fout opgetreden. Probeer het opnieuw.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0d10] text-[#f2ece2] relative z-10 overflow-hidden">
      {/* Pulsing Gradient Aura */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,180,255,0.18),transparent_70%)] blur-[50px] animate-aura -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Info */}
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

            <div className="space-y-3.5 mt-8">
              {contactInfo.map((item, idx) => {
                const IconComponent =
                  idx === 0 ? Mail : idx === 1 ? Mail : idx === 2 ? MapPin : Clock;

                return (
                  <div
                    key={item.label}
                    className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4 hover:border-[#00b4ff] hover:translate-x-1 hover:shadow-[0_8px_24px_-6px_rgba(0,180,255,0.25)] transition-all duration-200"
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
                        <div className="text-sm font-semibold text-white">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-9 rounded-card bg-white/[0.04] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fname" className="block text-xs font-semibold text-white/70">
                    Voornaam
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={form.fname}
                    onChange={handleChange}
                    placeholder="Jan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 focus:bg-white/[0.08] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lname" className="block text-xs font-semibold text-white/70">
                    Achternaam
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={form.lname}
                    onChange={handleChange}
                    placeholder="de Vries"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 focus:bg-white/[0.08] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="femail" className="block text-xs font-semibold text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  id="femail"
                  name="femail"
                  value={form.femail}
                  onChange={handleChange}
                  placeholder="jan@voorbeeld.nl"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 focus:bg-white/[0.08] transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="ftype" className="block text-xs font-semibold text-white/70">
                  Type project
                </label>
                <select
                  id="ftype"
                  name="ftype"
                  value={form.ftype}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 focus:bg-[#0a0d10] transition-all"
                >
                  <option value="" disabled className="bg-[#0a0d10]">
                    Selecteer een type...
                  </option>
                  {contact.projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#0a0d10]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="fmsg" className="block text-xs font-semibold text-white/70">
                  Bericht
                </label>
                <textarea
                  id="fmsg"
                  name="fmsg"
                  value={form.fmsg}
                  onChange={handleChange}
                  placeholder="Vertel me over je project, wensen en timeline..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00b4ff] focus:ring-2 focus:ring-[#00b4ff]/25 focus:bg-white/[0.08] transition-all resize-none"
                  required
                />
              </div>

              {/* Toast Notification Alert */}
              {status !== "idle" && status !== "loading" && (
                <div
                  className={`p-3.5 rounded-xl text-sm flex items-center gap-2.5 ${
                    status === "success"
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
                className="relative w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#0077b6] to-[#00b4ff] hover:from-[#0088cc] hover:to-[#38bdf8] shadow-[0_10px_30px_rgba(0,180,255,0.4)] disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden group cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verzenden...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    <span>Verstuur bericht</span>
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
