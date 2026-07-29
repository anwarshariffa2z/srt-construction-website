/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TestimonialsProps {
  dict?: any;
}

export function Testimonials({ dict }: TestimonialsProps) {
  const [active, setActive] = useState(0);

  const fallback = {
    eyebrow: "Client Testimonials",
    headline: "Word of Mouth.",
    items: [
      {
        quote: "SRT Constructions delivered our factory in Oragadam 3 weeks ahead of a very aggressive schedule. Their in-house machinery and complete lack of sub-contractor delays is why we'll use them again.",
        author: "Rakesh Menon",
        title: "Operations Director, TechForge Industries",
        img: "/assets/testimonial_thumb_1.jpg"
      },
      {
        quote: "Finding a firm that actually understands luxury finishes in Chennai is rare. They managed the entire lifecycle of our ECR villa—from structural design to the final Italian marble polishing. True professionals.",
        author: "Dr. Ananya S.",
        title: "Residential Client",
        img: "/assets/testimonial_thumb_2.jpg"
      },
      {
        quote: "The sheer scale at which they operate is impressive. We handed them a complex commercial blueprint, and their structural engineers over-delivered on safety while maintaining the architect's aesthetic vision.",
        author: "Vikram Raj",
        title: "Principal Architect, VR Design Studio",
        img: "/assets/testimonial_thumb_3.jpg"
      }
    ]
  };

  const d = dict || fallback;
  // Ensure we fallback to the local images if dict is missing them
  const items = d.items.map((item: any, idx: number) => ({
    ...item,
    img: item.img || fallback.items[idx]?.img || fallback.items[0].img
  }));

  return (
    <section className="bg-[var(--color-stone-dark)] text-white py-[15vh] px-[6vw] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6 text-center">{d.eyebrow}</div>
          <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-center mb-16">
            {d.headline}
          </h2>
        </Reveal>

        <div className="relative min-h-[500px] md:min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-full h-full"
            >
              <div className="grid md:grid-cols-2 gap-12 h-full items-center">
                {/* Left Side: Video Thumbnail */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
                  <Image 
                    src={items[active].img} 
                    alt={items[active].author} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark overlay for contrast */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quote & Google Review Info */}
                <div className="flex flex-col justify-center h-full py-4">
                  {/* 5 Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-[#FABB05]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="font-serif text-[clamp(1.2rem,2vw,1.8rem)] leading-snug mb-8 font-light italic text-white/90">
                    &quot;{items[active].quote}&quot;
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-xl border border-white/20">
                      {items[active].author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-white/90 mb-1 font-bold">
                        {items[active].author}
                      </div>
                      <div className="text-xs text-[#c9a468]">
                        {items[active].title}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width={24} height={24} className="opacity-80 grayscale contrast-125" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-16 relative z-10">
          {items.map((_: any, i: number) => (
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
