"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  triggerOnHover?: boolean;
}

const GLYPHS = "01#@$%&!*+~<>-_/[]{}=X";

export function TextScramble({
  text,
  className,
  delay = 200,
  triggerOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }

      iteration++;
    }, 28);
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, scramble]);

  return (
    <span
      className={className}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      style={{ cursor: triggerOnHover ? "default" : "inherit" }}
    >
      {displayText}
    </span>
  );
}
