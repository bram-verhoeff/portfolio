"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/** Reads --accent-rgb ("59 130 246") as "59,130,246" so Framer Motion can interpolate rgba(). */
function useAccentRgb() {
  const [rgb, setRgb] = useState("59,130,246");
  useEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
    if (raw) setRgb(raw.split(/\s+/).join(","));
  }, []);
  return rgb;
}

const TASKS = [
  { title: "Hoofdstuk 4 samenvatten", tag: "Biologie", width: "72%" },
  { title: "Oefentoets formules", tag: "Wiskunde B", width: "54%" },
  { title: "Woordjes unit 7", tag: "Engels", width: "38%" },
  { title: "Bronnen essay", tag: "Geschiedenis", width: "64%" },
];

/** StudyElite: a syllabus being broken into tasks that tick themselves off. */
export function PlannerVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const loop = inView && !reduce;
  const ACCENT = useAccentRgb();

  return (
    <div ref={ref} className="relative flex h-full flex-col gap-3 rounded-xl border border-white/[0.08] bg-canvas p-4 sm:p-5">
      <div className="flex items-center justify-between font-mono text-[11px] text-subtle">
        <span>vandaag · 4 taken</span>
        <span className="flex items-center gap-1.5 text-accent">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={loop ? { opacity: [1, 0.2, 1] } : {}}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          ai planner
        </span>
      </div>

      <motion.div
        className="flex items-center gap-3 rounded-lg border border-dashed border-white/10 px-3 py-2.5 text-[13px] text-muted"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE_EXPO }}
      >
        <span className="font-mono text-[11px] text-subtle">PDF</span>
        <span className="min-w-0 truncate">syllabus_periode_2.pdf</span>
        <span className="ml-auto whitespace-nowrap font-mono text-[11px] text-accent">→ 12 taken</span>
      </motion.div>

      <ul className="flex flex-col gap-2">
        {TASKS.map((task, i) => (
          <motion.li
            key={task.title}
            className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.15 + i * 0.08 }}
          >
            <motion.span
              className="grid h-4 w-4 shrink-0 place-items-center rounded border border-white/20"
              animate={
                loop
                  ? {
                      backgroundColor: [`rgba(${ACCENT},0)`, `rgba(${ACCENT},1)`, `rgba(${ACCENT},1)`, `rgba(${ACCENT},0)`],
                      borderColor: ["rgba(255,255,255,0.2)", `rgba(${ACCENT},1)`, `rgba(${ACCENT},1)`, "rgba(255,255,255,0.2)"],
                    }
                  : {}
              }
              transition={{ duration: 6, times: [0, 0.08, 0.85, 1], repeat: Infinity, delay: 1 + i * 0.9 }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1.5 5.2 4 7.5l4.5-5" stroke="#0A0A0B" strokeWidth="1.8" />
              </svg>
            </motion.span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] text-fg">{task.title}</div>
              <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-white/40"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: task.width } : {}}
                  transition={{ duration: 1.6, ease: EASE_EXPO, delay: 0.4 + i * 0.1 }}
                />
              </div>
            </div>
            <span className="hidden font-mono text-[10px] text-subtle sm:block">{task.tag}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const NODES = [
  { x: 40, y: 60, label: "Lead" },
  { x: 160, y: 140, label: "AI-callbot" },
  { x: 290, y: 60, label: "CRM" },
  { x: 400, y: 150, label: "Deal" },
];
const FLOW_PATH = "M40 60 C 100 60, 100 140, 160 140 S 230 60, 290 60 S 360 150, 400 150";

/** Agevo: an automation pipeline with a signal running through it. */
export function FlowVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-canvas p-4 sm:p-5">
      <div className="flex items-center justify-between font-mono text-[11px] text-subtle">
        <span>workflow.automation</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          live · 24/7
        </span>
      </div>

      <svg viewBox="0 0 440 200" className="w-full" aria-hidden="true">
        <path d={FLOW_PATH} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 5" />
        <motion.path
          d={FLOW_PATH}
          fill="none"
          stroke="rgba(237,237,239,0.55)"
          strokeWidth="1.25"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.2, ease: EASE_EXPO }}
        />
        {inView && !reduce && (
          <circle r="4.5" fill="rgb(var(--accent-rgb))">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={FLOW_PATH} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.65 0 0.35 1" />
          </circle>
        )}
        {NODES.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.3 + i * 0.25 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r="8" fill="#17171A" stroke="rgba(237,237,239,0.6)" strokeWidth="1.25" />
            <text
              x={n.x}
              y={n.y + (n.y > 100 ? 28 : -18)}
              textAnchor="middle"
              className="fill-muted font-mono text-[11px]"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-muted">
        {["webhook", "llm", "pipeline"].map((s, i) => (
          <motion.span
            key={s}
            className="rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.2 + i * 0.1 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
