"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function TimeLapseScrubber() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Empty site (Always visible at the bottom)
  // 2. Foundation (Fades in from 0% to 25%, stays visible)
  const foundationOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  
  // 3. Bare shell (Fades in from 30% to 55%, stays visible)
  const bareShellOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  
  // 4. Finished Hero (Fades in from 60% to 85%, stays visible)
  const finishedOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // Text Animations
  const titleY = useTransform(scrollYProgress, [0, 0.85], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 0, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Empty Site */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/assets/timelapse/timelapse_emptysite_edit_1785073370760.jpg" 
            alt="Empty Site"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Layer 2: Foundation */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: foundationOpacity }}
        >
          <Image 
            src="/assets/timelapse/timelapse_foundation_edit_1785073357693.jpg" 
            alt="Foundation Phase"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Layer 3: Bare Shell */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: bareShellOpacity }}
        >
          <Image 
            src="/assets/timelapse/timelapse_bareshell_1785073339503.jpg" 
            alt="Bare Shell Construction"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Layer 4: Finished Villa */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: finishedOpacity }}
        >
          <Image 
            src="/assets/hero.jpg" 
            alt="Finished Villa Serai"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Dark Scrim overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />

        {/* Overlay Text */}
        <motion.div 
          style={{ y: titleY, opacity: textOpacity }}
          className="relative z-10 flex flex-col items-center text-center text-white px-6 mt-16"
        >
          <h1 className="font-serif font-light text-[clamp(2.5rem,8vw,7rem)] tracking-[0.25em] leading-[1.05] text-shadow-hero">
            SRT CONSTRUCTIONS
          </h1>
          <p className="mt-6 text-[clamp(0.72rem,1.2vw,0.92rem)] tracking-[0.3em] uppercase text-white/90">
            Designed, engineered, and built by one team.
          </p>
          <div className="w-16 h-px bg-[var(--color-bronze)] mt-9 opacity-90" />
        </motion.div>

        {/* Scroll Hint */}
        <div className="absolute bottom-[4.5vh] left-1/2 -translate-x-1/2 flex flex-col items-center text-white/75 text-[0.62rem] tracking-[0.3em] uppercase">
          <span>Scroll</span>
          <div className="w-px h-11 bg-gradient-to-b from-white/80 to-transparent mt-3 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
