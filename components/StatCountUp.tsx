"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function StatCountUp({ 
  value, 
  suffix = "", 
  label 
}: { 
  value: number; 
  suffix?: string; 
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-[var(--color-bronze)] leading-none mb-4 tracking-tighter" ref={ref}>
        0{suffix}
      </div>
      <div className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-foreground-soft)] font-semibold">
        {label}
      </div>
    </div>
  );
}
