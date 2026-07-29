"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export default function PortalPage() {
  const [projectId, setProjectId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [loginState, setLoginState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginState("loading");
    
    // Mock login delay
    setTimeout(() => {
      // We are mocking a successful login for the demo as requested
      if (projectId && accessCode) {
        setLoginState("success");
      } else {
        setLoginState("error");
      }
    }, 1500);
  };

  if (loginState === "success") {
    return (
      <main className="min-h-screen bg-[var(--color-background)] pt-[20vh] pb-[10vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="flex justify-between items-end mb-12 border-b border-[var(--color-stone)] pb-6">
              <div>
                <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-4">Project Dashboard</div>
                <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-foreground)] font-light leading-none">
                  {projectId.toUpperCase() || "SRT-2026-CH"}
                </h1>
              </div>
              <button onClick={() => setLoginState("idle")} className="text-xs uppercase tracking-widest text-[var(--color-foreground-soft)] hover:text-[var(--color-bronze)] transition-colors">
                Secure Logout
              </button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-[var(--color-stone-dark)] p-8 rounded-2xl border border-white/5 h-full">
                <h3 className="font-serif text-2xl text-white mb-6">Status Overview</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs uppercase tracking-widest text-white/50 mb-2">
                      <span>Completion</span>
                      <span className="text-[var(--color-bronze)]">45%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[var(--color-bronze)]"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Current Phase</p>
                    <p className="text-white text-lg font-serif">Structural Framing & RCC</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Next Milestone</p>
                    <p className="text-white/80">Plumbing & Electrical Routing (Expected Aug 15)</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="md:col-span-2">
              <div className="bg-[var(--color-stone-dark)] p-8 rounded-2xl border border-white/5 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-2xl text-white">Recent Site Photos</h3>
                  <span className="text-xs text-[var(--color-bronze)] uppercase tracking-widest">Updated Today</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-20 mix-blend-overlay z-10 pointer-events-none" />
                      <svg className="w-8 h-8 text-white/20 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.3} className="md:col-span-3">
              <div className="bg-[var(--color-stone-dark)] p-8 rounded-2xl border border-white/5">
                <h3 className="font-serif text-2xl text-white mb-6">Financial Summary</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Total Project Value</p>
                    <p className="font-serif text-2xl text-white">₹ 1.25 Cr</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Amount Paid</p>
                    <p className="font-serif text-2xl text-green-400">₹ 45.5 L</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Next Payment Due</p>
                    <p className="font-serif text-2xl text-[var(--color-bronze)]">₹ 15.0 L</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button className="px-6 py-3 border border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white transition-colors text-xs uppercase tracking-widest">
                      View Invoices
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center relative px-6">
      <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-[0.03] mix-blend-difference pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <Reveal>
          <div className="bg-[var(--color-stone-dark)] p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#c9a468]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c9a468]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl text-white mb-2">Client Portal</h1>
              <p className="text-white/50 text-sm">Secure access to your project dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginState === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
                  Invalid Project ID or Access Code.
                </div>
              )}

              <div>
                <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Project ID</label>
                <input 
                  required 
                  type="text" 
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-bronze)] transition-colors text-white text-lg placeholder-white/20" 
                  placeholder="e.g. SRT-1024" 
                />
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Access Code</label>
                <input 
                  required 
                  type="password" 
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-bronze)] transition-colors text-white text-lg placeholder-white/20" 
                  placeholder="••••••••" 
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loginState === "loading"}
                  className="w-full relative group overflow-hidden rounded-full bg-transparent border border-[var(--color-bronze)] px-8 py-4 text-white uppercase tracking-[0.2em] text-xs transition-colors hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loginState === "loading" ? "Authenticating..." : "Access Dashboard"}
                  </span>
                  <div className="absolute inset-0 bg-[#c9a468] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0" />
                </button>
              </div>
            </form>
            
            <p className="text-center text-white/30 text-xs mt-8">
              Lost your access code? Contact your project manager.
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
