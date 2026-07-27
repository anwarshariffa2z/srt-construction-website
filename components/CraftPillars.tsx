/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface CraftPillarsProps {
  dict?: any;
}

export function CraftPillars({ dict }: CraftPillarsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background slight zoom/parallax effect
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]);

  // Opacities for the 4 pillars
  const p1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const p2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const p3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const p4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);

  // Y-translations for the 4 pillars
  const p1Y = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], ["20px", "0px", "0px", "-20px"]);
  const p2Y = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], ["20px", "0px", "0px", "-20px"]);
  const p3Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], ["20px", "0px", "0px", "-20px"]);
  const p4Y = useTransform(scrollYProgress, [0.75, 0.85], ["20px", "0px"]);

  // Progress bars opacities
  const dot1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.25]);
  const dot2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5], [0.25, 1, 0.25]);
  const dot3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.75], [0.25, 1, 0.25]);
  const dot4Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0.25, 1]);

  const fallback = {
    eyebrow: "Core Competencies",
    cont: "Commercial & Industrial",
    contDesc: "From million-square-foot logistics parks to highly specialized factory environments. We deliver scale without sacrificing precision.",
    arch: "Luxury Residential",
    archDesc: "Bespoke homes crafted for those who demand the impossible. Our residential division treats concrete and steel like fine cabinetry.",
    int: "Turnkey MEP & PMC",
    intDesc: "Complete project management and invisible mechanical engineering. We take ownership from the first permit to the final coat of paint.",
    const: "Contracting",
    constDesc: "Master builders capable of mobilizing massive resources. We execute large-scale projects on aggressive timelines with relentless quality control."
  };

  const d = dict || fallback;

  return (
    <section id="craft" ref={containerRef} className="relative h-[450vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#141009]">
        
        {/* Background Image */}
        <motion.div 
          className="absolute -inset-[6%]"
          style={{ scale: bgScale, y: bgY }}
        >
          <Image 
            src="/assets/hero.jpg"
            alt="Craft Background"
            fill
            className="object-cover brightness-[0.48] saturate-[0.9]"
          />
        </motion.div>

        {/* Veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120d06]/90 via-[#120d06]/60 to-[#120d06]/20" />

        {/* Top Eyebrow */}
        <div className="absolute top-[16vh] left-[8vw] z-10 text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468]">
          {d.eyebrow}
        </div>

        {/* Pillar 1 */}
        <motion.div 
          style={{ opacity: p1Opacity, y: p1Y }}
          className="absolute left-[8vw] right-[8vw] top-1/2 -mt-[5%] max-w-[700px] text-white"
        >
          <div className="font-serif italic text-base text-[#c9a468] tracking-[0.2em]">I.</div>
          <h3 className="font-serif font-normal text-[clamp(2rem,5vw,4.4rem)] leading-[1.05] my-[0.7rem] text-shadow-pillar">
            {d.cont}
          </h3>
          <p className="text-white/80 max-w-[46ch] text-base">
            {d.contDesc}
          </p>
        </motion.div>

        {/* Pillar 2 */}
        <motion.div 
          style={{ opacity: p2Opacity, y: p2Y }}
          className="absolute left-[8vw] right-[8vw] top-1/2 -mt-[5%] max-w-[700px] text-white"
        >
          <div className="font-serif italic text-base text-[#c9a468] tracking-[0.2em]">II.</div>
          <h3 className="font-serif font-normal text-[clamp(2rem,5vw,4.4rem)] leading-[1.05] my-[0.7rem] text-shadow-pillar">
            {d.arch}
          </h3>
          <p className="text-white/80 max-w-[46ch] text-base">
            {d.archDesc}
          </p>
        </motion.div>

        {/* Pillar 3 */}
        <motion.div 
          style={{ opacity: p3Opacity, y: p3Y }}
          className="absolute left-[8vw] right-[8vw] top-1/2 -mt-[5%] max-w-[700px] text-white"
        >
          <div className="font-serif italic text-base text-[#c9a468] tracking-[0.2em]">III.</div>
          <h3 className="font-serif font-normal text-[clamp(2rem,5vw,4.4rem)] leading-[1.05] my-[0.7rem] text-shadow-pillar">
            {d.int}
          </h3>
          <p className="text-white/80 max-w-[46ch] text-base">
            {d.intDesc}
          </p>
        </motion.div>

        {/* Pillar 4 */}
        <motion.div 
          style={{ opacity: p4Opacity, y: p4Y }}
          className="absolute left-[8vw] right-[8vw] top-1/2 -mt-[5%] max-w-[700px] text-white"
        >
          <div className="font-serif italic text-base text-[#c9a468] tracking-[0.2em]">IV.</div>
          <h3 className="font-serif font-normal text-[clamp(2rem,5vw,4.4rem)] leading-[1.05] my-[0.7rem] text-shadow-pillar">
            {d.const}
          </h3>
          <p className="text-white/80 max-w-[46ch] text-base">
            {d.constDesc}
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 flex flex-col gap-[14px]">
          <motion.span style={{ opacity: dot1Opacity }} className="w-px h-8 bg-[#c9a468]" />
          <motion.span style={{ opacity: dot2Opacity }} className="w-px h-8 bg-[#c9a468]" />
          <motion.span style={{ opacity: dot3Opacity }} className="w-px h-8 bg-[#c9a468]" />
          <motion.span style={{ opacity: dot4Opacity }} className="w-px h-8 bg-[#c9a468]" />
        </div>
        
      </div>
    </section>
  );
}
