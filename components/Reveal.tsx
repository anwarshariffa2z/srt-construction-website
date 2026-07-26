"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.1, 
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier matching the prototype
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
