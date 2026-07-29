"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { Reveal } from './Reveal';
import Image from 'next/image';

// Material Database
const CATEGORIES = [
  {
    id: 'flooring',
    title: 'Flooring & Surfaces',
    options: [
      { id: 'f-vitrified', name: 'Premium Vitrified Tiles', priceAdd: 0, image: '/assets/studio/studio_flooring_vitrified_1785255360117.jpg', description: 'Standard high-gloss 4x2 vitrified tiles.' },
      { id: 'f-granite', name: 'Rajasthan Granite', priceAdd: 120, image: '/assets/studio/studio_flooring_granite_1785255373460.jpg', description: 'Durable, premium granite for high-traffic areas.' },
      { id: 'f-marble', name: 'Italian Marble (Statuario)', priceAdd: 350, image: '/assets/studio/studio_flooring_marble_1785255384834.jpg', description: 'Ultra-luxury imported marble with seamless joints.' },
    ]
  },
  {
    id: 'woodwork',
    title: 'Doors & Woodwork',
    options: [
      { id: 'w-sal', name: 'Sal Wood Frames + Flush Doors', priceAdd: 0, image: '/assets/studio/studio_woodwork_sal_1785255404737.jpg', description: 'Standard durable doors with laminate finish.' },
      { id: 'w-teak', name: 'First Quality Teak Wood', priceAdd: 200, image: '/assets/studio/studio_woodwork_teak_1785255415780.jpg', description: 'Hand-carved premium teak for main and internal doors.' },
    ]
  },
  {
    id: 'kitchen',
    title: 'Modular Kitchen',
    options: [
      { id: 'k-basic', name: 'Basic Plywood + Laminate', priceAdd: 0, image: '/assets/studio/studio_kitchen_basic_1785255427658.jpg', description: 'Standard modular kitchen setup.' },
      { id: 'k-acrylic', name: 'BWP Plywood + High Gloss Acrylic', priceAdd: 150, image: '/assets/studio/studio_kitchen_acrylic_1785255446195.jpg', description: 'Premium waterproof kitchen with Hafele fittings.' },
    ]
  },
  {
    id: 'automation',
    title: 'Smart Home Automation',
    options: [
      { id: 'a-none', name: 'Standard Switches (Legrand)', priceAdd: 0, image: '/assets/studio/studio_automation_none_1785255458105.jpg', description: 'High-quality modular switches.' },
      { id: 'a-smart', name: 'Full Smart Home (Control4 / Fibaro)', priceAdd: 250, image: '/assets/studio/studio_automation_smart_1785255470647.jpg', description: 'App-controlled lighting, curtains, and AC.' },
    ]
  }
];

export function DesignStudio() {
  const [sqft, setSqft] = useState(2500);
  const [selections, setSelections] = useState<Record<string, string>>({
    flooring: 'f-vitrified',
    woodwork: 'w-sal',
    kitchen: 'k-basic',
    automation: 'a-none',
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '' });
  const [saveState, setSaveState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [activeCategory, setActiveCategory] = useState('flooring');

  const basePricePerSqft = 2200; // Base luxury construction
  
  const calculateTotalSqftPrice = () => {
    let total = basePricePerSqft;
    Object.entries(selections).forEach(([catId, optId]) => {
      const category = CATEGORIES.find(c => c.id === catId);
      const option = category?.options.find(o => o.id === optId);
      if (option) total += option.priceAdd;
    });
    return total;
  };

  const currentPricePerSqft = calculateTotalSqftPrice();
  const totalCost = currentPricePerSqft * sqft;

  const handleSelect = (catId: string, optId: string) => {
    setSelections(prev => ({ ...prev, [catId]: optId }));
  };

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
          sqft,
          totalCost,
          currentPricePerSqft,
          selections,
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--color-background)]">
      
      {/* Left Panel: Visualizer (Mock) */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 pt-[15vh] lg:pt-[15vh] relative flex items-center justify-center border-r border-[var(--color-stone)] bg-[var(--color-stone-dark)] lg:sticky lg:top-0 lg:h-screen">
        <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="relative w-full max-w-lg aspect-square bg-black shadow-2xl overflow-hidden border border-white/10 group">
          {/* Dynamic Image Overlay based on active category selection */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selections[activeCategory]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[var(--color-stone)] flex items-center justify-center text-white/20 text-center overflow-hidden"
            >
              {/* High-res render of the selected material */}
              <div className="flex flex-col items-center w-full h-full relative">
                {CATEGORIES.find(c => c.id === activeCategory)?.options.find(o => o.id === selections[activeCategory])?.image && (
                  <Image 
                    src={CATEGORIES.find(c => c.id === activeCategory)?.options.find(o => o.id === selections[activeCategory])?.image as string} 
                    alt="Material Preview" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-80 mix-blend-luminosity"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40 w-full">
                  <p className="font-serif text-2xl text-white mb-2 shadow-sm drop-shadow-md">
                    {CATEGORIES.find(c => c.id === activeCategory)?.options.find(o => o.id === selections[activeCategory])?.name}
                  </p>
                  <p className="text-sm text-white/80 uppercase tracking-widest drop-shadow-sm">High-Resolution Visualizer</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel: Controls & Pricing */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 pt-[10vh] lg:pt-[15vh] pb-[150px] flex flex-col relative bg-[var(--color-background)] min-h-screen">
        <Reveal>
          <h1 className="font-serif text-4xl text-[var(--color-foreground)] mb-2">Design Studio</h1>
          <p className="text-[var(--color-foreground-soft)] text-sm mb-10">Configure your dream project and get real-time cost estimates.</p>
        </Reveal>

        <div className="mb-10">
          <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-4">Project Size (Sq. Ft.)</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="1000" 
              max="10000" 
              step="100" 
              value={sqft} 
              onChange={(e) => setSqft(Number(e.target.value))}
              className="flex-1 accent-[var(--color-bronze)]"
            />
            <span className="font-serif text-2xl text-[var(--color-bronze)] w-24 text-right">{sqft}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 text-[0.7rem] tracking-wider uppercase transition-colors border ${
                activeCategory === cat.id 
                  ? 'border-[var(--color-bronze)] text-[var(--color-bronze)] bg-[var(--color-bronze)]/10' 
                  : 'border-[var(--color-stone)] text-[var(--color-foreground-soft)] hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="flex-1 mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {CATEGORIES.find(c => c.id === activeCategory)?.options.map(opt => (
                <div 
                  key={opt.id}
                  onClick={() => handleSelect(activeCategory, opt.id)}
                  className={`p-5 border cursor-pointer transition-all flex justify-between items-center ${
                    selections[activeCategory] === opt.id 
                      ? 'border-[var(--color-bronze)] bg-white shadow-sm' 
                      : 'border-[var(--color-stone)] hover:border-[var(--color-foreground-soft)] bg-transparent'
                  }`}
                >
                  <div>
                    <h3 className={`font-serif text-lg ${selections[activeCategory] === opt.id ? 'text-[var(--color-bronze)]' : 'text-[var(--color-foreground)]'}`}>{opt.name}</h3>
                    <p className="text-sm text-[var(--color-foreground-soft)] mt-1">{opt.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-foreground-soft)] block">Impact</span>
                    <span className="text-sm text-[var(--color-foreground)] font-mono">{opt.priceAdd === 0 ? 'Included' : `+₹${opt.priceAdd}/sqft`}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Total Bar */}
        <div className="fixed bottom-0 right-0 w-full lg:w-1/2 p-6 lg:px-12 bg-white/90 backdrop-blur-md border-t border-[var(--color-stone)] flex items-center justify-between z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          <div>
            <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-1">Estimated Base Build</div>
            <div className="font-serif text-3xl text-[var(--color-foreground)]">₹{(totalCost / 100000).toFixed(2)} Lakhs</div>
            <div className="text-xs text-[var(--color-bronze)] mt-1">@ ₹{currentPricePerSqft} / sqft</div>
          </div>
          <div onClick={() => setShowSaveModal(true)}>
            <MagneticButton>
              Save Design
            </MagneticButton>
          </div>
        </div>

        {/* Save Modal */}
        <AnimatePresence>
          {showSaveModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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
                    <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Design Saved!</h3>
                    <p className="text-[var(--color-foreground-soft)] text-sm mb-6">Your dream project configuration has been saved. Our design team will contact you shortly.</p>
                    <button 
                      onClick={() => { setShowSaveModal(false); setSaveState('idle'); }}
                      className="px-6 py-3 border border-[var(--color-stone)] text-[var(--color-foreground-soft)] hover:border-black hover:text-black transition-colors text-xs uppercase tracking-widest w-full"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveDesign}>
                    <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Save Your Configuration</h3>
                    <p className="text-[var(--color-foreground-soft)] text-sm mb-8">Enter your details to receive a comprehensive breakdown of your ₹{(totalCost / 100000).toFixed(2)} Lakhs estimate.</p>
                    
                    {saveState === 'error' && (
                      <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm border border-red-100">
                        Failed to save configuration. Please try again.
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
                      {saveState === 'submitting' ? 'Saving...' : 'Save Design Configuration'}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
