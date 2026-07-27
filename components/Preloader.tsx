"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we've already loaded this session to avoid annoying the user on every page load
    const hasLoaded = sessionStorage.getItem("srt-preloader-done");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("srt-preloader-done", "true");
        }, 400); // Brief pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-stone-dark)] text-[#c9a468]"
        >
          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="font-serif text-5xl md:text-7xl tracking-widest uppercase"
            >
              SRT
            </motion.h1>
          </div>
          
          <div className="w-[200px] h-[1px] bg-white/10 relative overflow-hidden mb-4">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#c9a468]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
          
          <div className="text-[0.65rem] tracking-[0.4em] uppercase font-light text-white/50">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
