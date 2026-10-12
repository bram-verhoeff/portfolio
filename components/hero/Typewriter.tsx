"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Typewriter() {
  const phrases = PORTFOLIO_DATA.personal.typewriterPhrases;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentPhrase.length) {
            setCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 75
    );

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <div className="font-semibold text-base sm:text-lg md:text-xl text-ink-soft min-h-[1.8em] flex items-center">
      <span>{phrases[phraseIndex].slice(0, charIndex)}</span>
      <span
        className="inline-block w-[2px] h-[1.1em] bg-[#0077b6] ml-1 animate-pulse"
        aria-hidden="true"
      />
    </div>
  );
}
