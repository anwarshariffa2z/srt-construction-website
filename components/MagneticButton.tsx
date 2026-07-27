"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull strength (higher divisor = less pull)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-[var(--color-bronze)] text-white text-[0.7rem] uppercase tracking-[0.3em] transition-colors hover:bg-[var(--color-bronze-deep)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
    </motion.button>
  );
}
