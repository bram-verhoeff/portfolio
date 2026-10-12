"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
}

export function BorderBeam({
  className,
  size = 140,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10",
        className
      )}
      style={{
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "1.5px",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full animate-border-beam"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background:
            "radial-gradient(circle, #00b4ff 0%, rgba(0, 180, 255, 0.6) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
