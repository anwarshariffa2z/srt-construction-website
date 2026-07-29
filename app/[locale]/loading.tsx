"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-12 h-12 border-2 border-[var(--color-bronze)]/30 border-t-[var(--color-bronze)] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-foreground-soft)]">
          Loading
        </p>
      </div>
    </div>
  );
}
