"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Preloader } from "@/components/motion/Preloader";

const IntroContext = createContext(false);

/** True once the preloader has lifted; hero entrance animations wait for it. */
export const useIntroDone = () => useContext(IntroContext);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={done}>
        <AnimatePresence>{!done && <Preloader key="preloader" onDone={finish} />}</AnimatePresence>
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}
