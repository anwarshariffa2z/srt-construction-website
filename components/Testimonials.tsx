"use client";

import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "SRT Constructions delivered our factory in Oragadam 3 weeks ahead of a very aggressive schedule. Their in-house machinery and complete lack of sub-contractor delays is why we'll use them again.",
    author: "Rakesh Menon",
    title: "Operations Director, TechForge Industries"
  },
  {
    quote: "Finding a firm that actually understands luxury finishes in Chennai is rare. They managed the entire lifecycle of our ECR villa—from structural design to the final Italian marble polishing. True professionals.",
    author: "Dr. Ananya S.",
    title: "Residential Client"
  },
  {
    quote: "The sheer scale at which they operate is impressive. We handed them a complex commercial blueprint, and their structural engineers over-delivered on safety while maintaining the architect's aesthetic vision.",
    author: "Vikram Raj",
    title: "Principal Architect, VR Design Studio"
  }
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[var(--color-stone-dark)] text-white py-[15vh] px-[6vw] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6 text-center">Client Testimonials</div>
          <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-center mb-16">
            Word of Mouth.
          </h2>
        </Reveal>

        <div className="relative min-h-[300px] md:min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-full max-w-[800px] text-center"
            >
              <p className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-snug mb-8 font-light italic">
                &quot;{TESTIMONIALS[active].quote}&quot;
              </p>
              <div>
                <div className="text-sm uppercase tracking-widest text-white/90 mb-1">
                  {TESTIMONIALS[active].author}
                </div>
                <div className="text-xs text-[#c9a468]">
                  {TESTIMONIALS[active].title}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 transition-all duration-300 ${active === i ? 'w-12 bg-[#c9a468]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
