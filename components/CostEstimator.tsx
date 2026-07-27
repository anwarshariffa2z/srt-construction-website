"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const FINISH_LEVELS = [
  { id: "premium", name: "Premium", pricePerSqFt: 2500, desc: "High-grade materials, premium branded fittings, standard automation." },
  { id: "luxury", name: "Luxury", pricePerSqFt: 3500, desc: "Imported marble, bespoke woodwork, advanced smart home integration." },
  { id: "ultra", name: "Ultra-Luxury", pricePerSqFt: 5000, desc: "Architectural masterpieces, imported everything, zero compromise." },
];

export function CostEstimator() {
  const [sqFt, setSqFt] = useState<number>(2000);
  const [finish, setFinish] = useState(FINISH_LEVELS[1]);

  const estimatedCost = sqFt * finish.pricePerSqFt;
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const estimatedTimeline = 
    sqFt < 3000 ? "10 - 12 Months" : 
    sqFt < 6000 ? "14 - 18 Months" : 
    "18 - 24 Months";

  return (
    <section className="bg-[var(--color-background)] py-[15vh] px-[6vw]">
      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6 text-center">Interactive Tool</div>
          <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-foreground)] mb-12 text-center">
            Project Estimator
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-24 bg-[var(--color-stone-dark)] text-white p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col gap-10">
            <div>
              <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-4">Total Build Area (Sq.Ft)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1000" 
                  max="15000" 
                  step="500" 
                  value={sqFt} 
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#c9a468]"
                />
                <span className="font-serif text-2xl min-w-[4ch]">{sqFt}</span>
              </div>
            </div>

            <div>
              <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-4">Finish Level</label>
              <div className="flex flex-col gap-3">
                {FINISH_LEVELS.map(level => (
                  <button 
                    key={level.id}
                    onClick={() => setFinish(level)}
                    className={`text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
                      finish.id === level.id 
                        ? "border-[#c9a468] bg-[#c9a468]/10" 
                        : "border-white/10 hover:border-white/30 bg-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <strong className="font-serif text-xl">{level.name}</strong>
                      <span className="text-[#c9a468] text-sm">₹{level.pricePerSqFt}/sq.ft</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-12 lg:pl-24">
            <div className="mb-10">
              <span className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Estimated Turnkey Cost</span>
              <motion.div 
                key={estimatedCost}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#c9a468] drop-shadow-lg"
              >
                {formatINR(estimatedCost)}
              </motion.div>
            </div>
            
            <div>
              <span className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Estimated Timeline</span>
              <div className="font-serif text-2xl text-white">
                {estimatedTimeline}
              </div>
            </div>

            <p className="text-white/30 text-[0.65rem] mt-12 leading-relaxed max-w-[40ch]">
              *This is a rough estimate for reference only. True costs depend on site conditions, exact material choices, and structural complexities.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
