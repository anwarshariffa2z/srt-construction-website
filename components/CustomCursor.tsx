"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor follow
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor on links or buttons
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" ||
        target.closest("a") || 
        target.closest("button")
      ) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Hide default cursor globally on non-touch devices */
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[var(--color-bronze)] rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center origin-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHoveringLink ? 3.5 : 1,
          backgroundColor: isHoveringLink ? "rgba(255,255,255,1)" : "var(--color-bronze)",
          opacity: isHoveringLink ? 0.9 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isHoveringLink && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black text-[3px] font-bold tracking-widest uppercase"
          >
            Click
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
