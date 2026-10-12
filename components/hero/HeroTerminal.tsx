"use client";

import { useEffect, useState, useRef } from "react";
import { TiltCard } from "@/components/ui/TiltCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import {
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  Terminal as TerminalIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { soundEngine } from "@/lib/sound";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンBRAMVERHOEFFAGEVOSTUDYELITE";
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 13, 16, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00b4ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.85 ? "#ffffff" : "#00b4ff";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={320}
      className="w-full h-[300px] rounded-lg bg-[#0a0d10]"
    />
  );
}

export function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<"code" | "ai" | "matrix" | "products">("code");
  const [cliInput, setCliInput] = useState("");
  const [cliOutput, setCliOutput] = useState<string[]>([]);

  const codeSnippet = [
    '<span class="text-[#00b4ff] font-bold">const</span> <span class="text-white">architect</span> = {',
    '  <span class="text-[#7dd3fc]">name</span>: <span class="text-[#4ade80]">"Bram Verhoeff"</span>,',
    '  <span class="text-[#7dd3fc]">role</span>: <span class="text-[#4ade80]">"Full-Stack Architect & Founder"</span>,',
    '  <span class="text-[#7dd3fc]">age</span>: <span class="text-[#fbbf24]">18</span>,',
    '  <span class="text-[#7dd3fc]">founderOf</span>: [',
    '    <span class="text-[#4ade80]">"Agevo Development (KVK 42160840)"</span>,',
    '    <span class="text-[#4ade80]">"StudyElite (AI Study SaaS)"</span>',
    '  ],',
    '  <span class="text-[#7dd3fc]">coreStack</span>: [',
    '    <span class="text-[#4ade80]">"Next.js 15 / React 19 / TypeScript"</span>,',
    '    <span class="text-[#4ade80]">"PHP / Symfony / Node.js / Python"</span>,',
    '    <span class="text-[#4ade80]">"OpenAI / Custom Go High Level Workflows"</span>',
    '  ],',
    '  <span class="text-[#7dd3fc]">status</span>: <span class="text-[#4ade80]">"Beschikbaar voor nieuwe projecten 🚀"</span>',
    '};',
  ];

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;
    soundEngine.playClick();

    if (cmd === "clear") {
      setCliOutput([]);
      setCliInput("");
      return;
    }

    if (cmd === "matrix") {
      setActiveTab("matrix");
      setCliOutput((prev) => [...prev, `> ${cmd}`, "Initiating Matrix cyber rain..."]);
      setCliInput("");
      return;
    }

    if (cmd === "contact" || cmd === "hire") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setCliOutput((prev) => [...prev, `> ${cmd}`, "Navigating to contact section..."]);
      setCliInput("");
      return;
    }

    if (cmd === "skills") {
      setCliOutput((prev) => [
        ...prev,
        `> ${cmd}`,
        "Stack: Next.js 15, React 19, PHP, Symfony, Node.js, Go High Level, OpenAI API, MySQL, Docker",
      ]);
      setCliInput("");
      return;
    }

    if (cmd === "projects") {
      setActiveTab("products");
      setCliOutput((prev) => [
        ...prev,
        `> ${cmd}`,
        "1. Agevo Development (agevodev.nl) | 2. StudyElite (studyelite.nl)",
      ]);
      setCliInput("");
      return;
    }

    if (cmd === "help") {
      setCliOutput((prev) => [
        ...prev,
        `> ${cmd}`,
        "Available commands: skills, projects, matrix, contact, hire, clear",
      ]);
      setCliInput("");
      return;
    }

    setCliOutput((prev) => [
      ...prev,
      `> ${cmd}`,
      `Unknown command: '${cmd}'. Type 'help' for available commands.`,
    ]);
    setCliInput("");
  };

  return (
    <div className="relative w-full max-w-[620px] mx-auto lg:mx-0">
      <TiltCard
        className="bg-[#080b10] border border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_35px_-8px_rgba(0,180,255,0.22)] overflow-hidden"
        maxTilt={7}
      >
        <BorderBeam size={190} />

        {/* macOS-style Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.04] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("code");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "code"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[#00b4ff]" />
              developer.ts
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("products");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "products"
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#4ade80]" />
              products.json
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("matrix");
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "matrix"
                  ? "bg-[#00b4ff]/20 text-[#00b4ff] border border-[#00b4ff]/40"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5 text-[#00b4ff]" />
              matrix.exe
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white/45 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
            v3.2
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-6 min-h-[300px] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-[#f2ece2]">
          {activeTab === "code" && (
            <div className="space-y-0.5">
              {codeSnippet.map((line, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: line }} className="whitespace-pre" />
              ))}
              <span className="inline-block w-2 h-4 bg-[#00b4ff] ml-1 animate-pulse align-middle" />
            </div>
          )}

          {activeTab === "matrix" && <MatrixRain />}

          {activeTab === "products" && (
            <div className="flex flex-col gap-3 py-1">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <a
                  key={proj.id}
                  href={`#project-${proj.id}`}
                  className="group/item flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-[#00b4ff] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#00b4ff]/15 text-[#00b4ff]">
                      {proj.number.slice(0, 2)}
                    </span>
                    <div>
                      <strong className="text-white text-sm block group-hover/item:text-[#00b4ff] transition-colors">
                        {proj.title}
                      </strong>
                      <p className="text-white/50 text-xs mt-0.5">{proj.tags.join(" · ")}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#00b4ff] transition-transform group-hover/item:translate-x-0.5" />
                </a>
              ))}
            </div>
          )}

          {/* Interactive CLI History */}
          {cliOutput.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-1 text-white/80">
              {cliOutput.map((out, idx) => (
                <div
                  key={idx}
                  className={out.startsWith(">") ? "text-[#00b4ff] font-bold" : "text-white/60"}
                >
                  {out}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive CLI Input Line */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 px-5 py-2.5 bg-black/60 border-t border-white/[0.08] text-xs font-mono"
        >
          <span className="text-[#00b4ff] font-bold">bram@terminal:~$</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            onKeyDown={() => soundEngine.playKeystroke()}
            placeholder="Type 'help', 'skills', 'matrix', 'contact'..."
            className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none"
          />
        </form>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-black/40 border-t border-white/[0.08] text-xs text-white/50 font-sans">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Agevo Dev Engine Online</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-white">2 Live Platforms</span>
            <span>·</span>
            <span className="text-white">18 Jaar</span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
