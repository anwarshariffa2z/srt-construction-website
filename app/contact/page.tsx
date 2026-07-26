"use client";

import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[var(--color-stone-dark)] pt-[25vh] pb-[10vh] px-[6vw] text-white">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16">
        
        <div>
          <Reveal>
            <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">Consultation</div>
            <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] font-light leading-[1.05] mb-8">
              Start a Conversation.
            </h1>
            <p className="text-white/70 max-w-[36ch] mb-12">
              Let's discuss how our unified team can bring your vision to reality without compromise.
            </p>

            <div className="space-y-6 text-sm text-white/80">
              <div>
                <strong className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/40 mb-1">Email</strong>
                <a href="mailto:tbasha.srtconstructions@gmail.com" className="hover:text-[var(--color-bronze)] transition-colors">tbasha.srtconstructions@gmail.com</a>
              </div>
              <div>
                <strong className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/40 mb-1">Phone</strong>
                <a href="tel:+918056880272" className="hover:text-[var(--color-bronze)] transition-colors">+91 8056880272</a>
              </div>
              <div>
                <strong className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/40 mb-1">Address</strong>
                <p>No: 119/A Karunanidhi Beach Road, <br/> Palkalai Nagar, Palavakkam <br/> Chennai - 600041</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[400px]">
          <Reveal delay={0.3}>
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/5 rounded-2xl p-8 border border-[#c9a468]/30"
                >
                  <div className="w-16 h-16 rounded-full bg-[#c9a468]/20 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#c9a468]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl mb-4 text-white">Inquiry Received</h3>
                  <p className="text-white/60 mb-8">
                    Thank you for reaching out. A member of our architectural team will contact you within 24 hours to discuss your project.
                  </p>
                  <button 
                    onClick={() => setFormState("idle")}
                    className="text-[0.7rem] uppercase tracking-widest text-[#c9a468] hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="border-b border-white/20 pb-2">
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mb-2">Name</label>
                    <input required type="text" className="w-full bg-transparent outline-none text-xl placeholder-white/20 text-white" placeholder="John Doe" />
                  </div>
                  
                  <div className="border-b border-white/20 pb-2">
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mb-2">Email</label>
                    <input required type="email" className="w-full bg-transparent outline-none text-xl placeholder-white/20 text-white" placeholder="john@example.com" />
                  </div>

                  <div className="border-b border-white/20 pb-2">
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mb-2">Project Type</label>
                    <select className="w-full bg-transparent outline-none text-xl text-white/80 appearance-none">
                      <option className="bg-[#2a251d]">Commercial & Industrial</option>
                      <option className="bg-[#2a251d]">Luxury Residential</option>
                      <option className="bg-[#2a251d]">Turnkey MEP</option>
                    </select>
                  </div>

                  <div className="border-b border-white/20 pb-2">
                    <label className="block text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mb-2">Message</label>
                    <textarea required rows={3} className="w-full bg-transparent outline-none text-xl placeholder-white/20 text-white resize-none" placeholder="Tell us about your project..." />
                  </div>

                  <div className="pt-6 flex items-center gap-6">
                    <button 
                      type="submit"
                      disabled={formState === "submitting"}
                      className="group relative px-8 py-4 bg-transparent text-white uppercase tracking-[0.2em] text-xs transition-colors hover:text-black overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">{formState === "submitting" ? "Sending..." : "Submit Inquiry"}</span>
                      <div className="absolute inset-0 bg-[#c9a468] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0" />
                      <div className="absolute inset-0 border border-white/30 group-hover:border-transparent transition-colors z-0" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

      </div>
    </main>
  );
}
