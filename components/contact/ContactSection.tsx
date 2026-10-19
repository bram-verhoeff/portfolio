"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { FadeUp, SectionLabel, SectionTitle } from "@/components/motion/Reveal";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

function Pills({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={cn(
              "relative rounded-md border px-3 py-1.5 text-[13px] transition-colors duration-200",
              active ? "border-accent text-accent-fg" : "border-white/10 text-muted hover:border-white/20 hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={`pill-${name}`}
                className="absolute inset-0 rounded-[5px] bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function Field({
  id,
  label,
  textarea,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  textarea?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const base =
    "w-full resize-none rounded-lg border border-white/10 bg-canvas px-3.5 py-2.5 text-[14px] text-fg placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:shadow-[0_0_0_3px_rgb(var(--accent-rgb)/0.15)] focus-visible:outline-none";
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={id} rows={5} required className={base} placeholder="Vertel over je project, wensen en planning…" />
      ) : (
        <input id={id} name={id} type={type} autoComplete={autoComplete} required className={base} />
      )}
    </div>
  );
}

export function ContactSection() {
  const { contact, personal, socials } = PORTFOLIO_DATA;
  const [type, setType] = useState(contact.projectTypes[0]);
  const [timeline, setTimeline] = useState(contact.timelines[0]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus({ kind: "error", text: "Vul je naam, e-mailadres en een kort bericht in." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", text: "Dat e-mailadres lijkt niet te kloppen." });
      return;
    }

    const subject = encodeURIComponent(`[${type}] Aanvraag via bramverhoeff.nl — ${name}`);
    const body = encodeURIComponent(
      `Naam: ${name}\nE-mail: ${email}\nType: ${type}\nTijdlijn: ${timeline}\n\nBericht:\n${message}`,
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setStatus({ kind: "ok", text: "Je bericht staat klaar in je mail-app. Ik reageer meestal binnen 24 uur." });
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionLabel index="05">Contact</SectionLabel>
          <SectionTitle first="Laten we iets" second="sterkers bouwen." />

          <FadeUp delay={0.1} className="mt-6 space-y-8">
            <p className="max-w-md text-[15px] leading-relaxed text-muted">{contact.description}</p>

            <a
              href={`mailto:${personal.email}`}
              data-cursor="Mail"
              className="group inline-flex items-center gap-2 text-[17px] font-medium"
            >
              <span className="border-b border-white/20 pb-0.5 transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                {personal.email}
              </span>
              <span className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </a>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.06] pt-6 text-[14px]">
              <div>
                <dt className="text-[13px] text-subtle">Studio</dt>
                <dd className="mt-1">
                  {personal.company} · KVK {personal.kvk}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-subtle">Locatie</dt>
                <dd className="mt-1">{personal.location}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-subtle">Reactietijd</dt>
                <dd className="mt-1">{personal.responseTime}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-subtle">Online</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4">
                  {socials.slice(0, 2).map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                      {s.name} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </FadeUp>
        </div>

        <FadeUp delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 rounded-2xl border border-white/[0.08] bg-surface p-5 sm:p-7"
          >
            <fieldset>
              <legend className="mb-2.5 text-[13px] text-muted">Waar gaat het over?</legend>
              <Pills name="type" options={contact.projectTypes} value={type} onChange={setType} />
            </fieldset>

            <fieldset>
              <legend className="mb-2.5 text-[13px] text-muted">Gewenste tijdlijn</legend>
              <Pills name="timeline" options={contact.timelines} value={timeline} onChange={setTimeline} />
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Naam" autoComplete="name" />
              <Field id="email" label="E-mailadres" type="email" autoComplete="email" />
            </div>
            <Field id="message" label="Bericht" textarea />

            <div className="flex flex-wrap items-center gap-5">
              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="group inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-[14px] font-medium text-accent-fg transition-[filter] duration-200 hover:brightness-110"
                >
                  Verstuur bericht
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </button>
              </Magnetic>

              <AnimatePresence mode="wait">
                {status && (
                  <motion.p
                    key={status.text}
                    role="status"
                    className={cn("max-w-xs text-[13px]", status.kind === "ok" ? "text-muted" : "text-red-400")}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.4, ease: EASE_EXPO }}
                  >
                    {status.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
