"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  showGlare?: boolean;
  spotlightBorder?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  showGlare = true,
  spotlightBorder = true,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const rx = ((py / rect.height) - 0.5) * -maxTilt;
    const ry = ((px / rect.width) - 0.5) * maxTilt;

    setCoords({ x: px, y: py });
    setRotate({ rx, ry });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-card transition-transform duration-300 ease-out will-change-transform group",
        className
      )}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.rx}deg) rotateY(${rotate.ry}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* Vulk Spotlight Border Hover */}
      {spotlightBorder && (
        <div
          className="vulk-spotlight-border"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(0, 180, 255, 0.55), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Specular Glare */}
      {showGlare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  );
}
