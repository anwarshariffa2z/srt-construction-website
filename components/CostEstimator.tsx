"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const FINISH_LEVELS = [
  { id: "premium", name: "Premium", pricePerSqFt: 2500, desc: "High-grade materials, premium branded fittings, standard automation." },
  { id: "luxury", name: "Luxury", pricePerSqFt: 3500, desc: "Imported marble, bespoke woodwork, advanced smart home integration." },
  { id: "ultra", name: "Ultra-Luxury", pricePerSqFt: 5000, desc: "Architectural masterpieces, imported everything, zero compromise." },
];

export function CostEstimator() {
  const [sqFt, setSqFt] = useState<number>(2000);
  const [finish, setFinish] = useState(FINISH_LEVELS[1]);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '' });
  const [saveState, setSaveState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  const handleSaveDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveState("submitting");
    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      if (!db) throw new Error("Firebase DB not initialized");

      await addDoc(collection(db, "design_leads"), {
        ...leadForm,
        designConfig: {
          sqft: sqFt,
          finishLevel: finish.name,
          totalCost: estimatedCost,
          source: "Cost Estimator Quick Tool"
        },
        createdAt: serverTimestamp(),
      });
      setSaveState("success");
    } catch (error) {
      console.error(error);
      setSaveState("error");
    }
  };

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
            
            <div className="mb-10">
              <span className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Estimated Timeline</span>
              <div className="font-serif text-2xl text-white">
                {estimatedTimeline}
              </div>
            </div>

            <div onClick={() => setShowSaveModal(true)} className="inline-block mt-4 w-fit">
              <MagneticButton>
                Save Estimate
              </MagneticButton>
            </div>

            <p className="text-white/30 text-[0.65rem] mt-8 leading-relaxed max-w-[40ch]">
              *This is a rough estimate for reference only. True costs depend on site conditions, exact material choices, and structural complexities.
            </p>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white max-w-md w-full p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowSaveModal(false)}
                className="absolute top-4 right-4 text-[var(--color-foreground-soft)] hover:text-black transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {saveState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[var(--color-bronze)]/10 text-[var(--color-bronze)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Estimate Saved!</h3>
                  <p className="text-[var(--color-foreground-soft)] text-sm mb-6">Your quick estimate has been saved. Our team will reach out shortly.</p>
                  <button 
                    onClick={() => { setShowSaveModal(false); setSaveState('idle'); }}
                    className="px-6 py-3 border border-[var(--color-stone)] text-[var(--color-foreground-soft)] hover:border-black hover:text-black transition-colors text-xs uppercase tracking-widest w-full"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveDesign}>
                  <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Save Your Estimate</h3>
                  <p className="text-[var(--color-foreground-soft)] text-sm mb-8">Enter your details to receive a comprehensive breakdown.</p>
                  
                  {saveState === 'error' && (
                    <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm border border-red-100">
                      Failed to save estimate. Please try again.
                    </div>
                  )}

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-2">Name</label>
                      <input required type="text" value={leadForm.name} onChange={e => setLeadForm(p => ({...p, name: e.target.value}))} className="w-full border-b border-[var(--color-stone)] py-2 outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-2">Phone</label>
                      <input required type="tel" value={leadForm.phone} onChange={e => setLeadForm(p => ({...p, phone: e.target.value}))} className="w-full border-b border-[var(--color-stone)] py-2 outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-2">Email (Optional)</label>
                      <input type="email" value={leadForm.email} onChange={e => setLeadForm(p => ({...p, email: e.target.value}))} className="w-full border-b border-[var(--color-stone)] py-2 outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]" placeholder="john@example.com" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={saveState === 'submitting'}
                    className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-[var(--color-bronze)] transition-colors disabled:opacity-50"
                  >
                    {saveState === 'submitting' ? 'Saving...' : 'Save Estimate'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

