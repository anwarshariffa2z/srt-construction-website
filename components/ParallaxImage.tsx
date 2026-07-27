"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  // Controls how intensely the image shifts up and down. 
  // Lower values = subtle. Higher values = aggressive.
  offset?: number; 
}

export function ParallaxImage({ src, alt, priority = false, className = "", offset = 50 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Shifts the image Y position based on scroll.
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          priority={priority}
          className="object-cover" 
        />
      </motion.div>
    </div>
  );
}
