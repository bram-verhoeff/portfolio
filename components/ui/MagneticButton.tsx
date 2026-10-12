"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  download?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 140, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.28);
    y.set(middleY * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-[0.95rem] transition-all duration-300 overflow-hidden cursor-pointer no-underline group/btn",
    variant === "primary" &&
      "bg-ink text-white shadow-[0_4px_15px_-2px_rgba(10,10,10,0.18),0_0_20px_-5px_rgba(0,180,255,0.4)] hover:bg-[#0077b6] hover:shadow-[0_12px_32px_-5px_rgba(0,119,182,0.6),0_0_30px_rgba(0,180,255,0.55)] border border-white/15",
    variant === "secondary" &&
      "bg-white/90 backdrop-blur-md border border-[rgba(10,10,10,0.18)] text-ink shadow-[0_2px_10px_rgba(10,10,10,0.04)] hover:bg-white hover:border-[#00b4ff] hover:text-[#0077b6] hover:shadow-[0_6px_20px_rgba(0,180,255,0.25)]",
    className
  );

  const content = (
    <>
      {/* Moving border-beam perimeter light for primary button */}
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden p-[1.5px] z-10"
          style={{
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          aria-hidden="true"
        >
          <span
            className="absolute w-24 h-24 rounded-full animate-border-beam"
            style={{
              background:
                "radial-gradient(circle, #00b4ff 0%, rgba(0, 180, 255, 0.7) 45%, transparent 70%)",
            }}
          />
        </span>
      )}

      {/* Glare streak sweep */}
      <span
        className="pointer-events-none absolute -top-1/2 -left-[60%] w-[45%] h-[200%] bg-gradient-to-r from-transparent via-white/35 to-transparent rotate-[25deg] transition-[left] duration-700 ease-out group-hover/btn:left-[140%]"
        aria-hidden="true"
      />

      <span className="relative z-20 flex items-center gap-2.5">{children}</span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          download={download}
          className={baseStyles}
          onClick={onClick}
        >
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={baseStyles}>
          {content}
        </button>
      )}
    </motion.div>
  );
}
