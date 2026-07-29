"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

interface ProjectData {
  projectId: string;
  completionPercentage: number;
  currentPhase: string;
  nextMilestone: string;
  totalValue: string;
  amountPaid: string;
  nextDue: string;
  images: string[];
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_TIMEOUT_MS = 15 * 60 * 1000;  // 15 minutes inactivity

/** SHA-256 hash a string using the browser's native Web Crypto API */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PortalPage() {
  const [projectId, setProjectId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [loginState, setLoginState] = useState<"idle" | "loading" | "success" | "error" | "locked">("idle");
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const sessionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Countdown timer for lockout display
  useEffect(() => {
    if (!lockoutUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, lockoutUntil - Date.now());
      setLockoutRemaining(Math.ceil(remaining / 1000));
      if (remaining === 0) {
        setLockoutUntil(null);
        setAttempts(0);
        setLoginState("idle");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Session timeout on inactivity
  const resetSessionTimer = useCallback(() => {
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
    sessionTimer.current = setTimeout(() => {
      handleLogout();
    }, SESSION_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (loginState !== "success") return;
    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetSessionTimer));
    resetSessionTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetSessionTimer));
      if (sessionTimer.current) clearTimeout(sessionTimer.current);
    };
  }, [loginState, resetSessionTimer]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check lockout
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setLoginState("locked");
      return;
    }

    setLoginState("loading");
    if (!db) { setLoginState("error"); return; }

    try {
      // Hash the access code before comparing — codes must be stored as SHA-256 hashes in Firestore
      const hashedCode = await sha256(accessCode.trim());

      const q = query(
        collection(db, "client_projects"),
        where("projectId", "==", projectId.trim().toUpperCase()),
        where("accessCodeHash", "==", hashedCode)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data() as ProjectData;
        setProjectData(data);
        setLoginState("success");
        setAttempts(0);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= MAX_ATTEMPTS) {
          const until = Date.now() + LOCKOUT_DURATION_MS;
          setLockoutUntil(until);
          setLoginState("locked");
        } else {
          setLoginState("error");
        }
      }
    } catch {
      if (process.env.NODE_ENV === "development") {
        console.error("Portal login error");
      }
      setLoginState("error");
    }
  };

  const handleLogout = () => {
    setLoginState("idle");
    setProjectData(null);
    setProjectId("");
    setAccessCode("");
    if (sessionTimer.current) clearTimeout(sessionTimer.current);
  };

  if (loginState === "success" && projectData) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] pt-[20vh] pb-[10vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="flex justify-between items-end mb-12 border-b border-[var(--color-stone)] pb-6">
              <div>
                <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-4">Project Dashboard</div>
                <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-foreground)] font-light leading-none">
                  {projectData.projectId.toUpperCase()}
                </h1>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-[0.65rem] text-white/30 uppercase tracking-widest">Auto-logout: 15 min inactivity</p>
                <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-[var(--color-foreground-soft)] hover:text-[var(--color-bronze)] transition-colors">
                  Secure Logout
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-[var(--color-stone-dark)] p-8 rounded-2xl border border-white/5 h-full flex flex-col">
                <h3 className="font-serif text-2xl text-white mb-6">Status Overview</h3>
                <div className="space-y-6 flex-1">
                  <div>
                    <div className="flex justify-between text-xs uppercase tracking-widest text-white/50 mb-2">
                      <span>Completion</span>
                      <span className="text-[var(--color-bronze)]">{projectData.completionPercentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${projectData.completionPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-[var(--color-bronze)]"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Current Phase</p>
                    <p className="text-white text-lg font-serif">{projectData.currentPhase}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Next Milestone</p>
                    <p className="text-white/80">{projectData.nextMilestone}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="md:col-span-2">
              <div className="bg-[var(--color-stone-dark)] p-8 rounded-2xl border border-white/5 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-2xl text-white">Recent Site Photos</h3>
                  <span className="text-xs text-[var(--color-bronze)] uppercase tracking-widest">Updated Live</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {projectData.images && projectData.images.length > 0 ? (
                    projectData.images.map((img, i) => (
                      <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
                        <Image src={img} alt={`Site photo ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-white/30 text-sm">
                      No recent photos uploaded.
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="md:col-span-3">
              <div className="bg-[var(--color-stone-dark)] p-8 rounded-2xl border border-white/5">
                <h3 className="font-serif text-2xl text-white mb-6">Financial Summary</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Total Project Value</p>
                    <p className="font-serif text-2xl text-white">{projectData.totalValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Amount Paid</p>
                    <p className="font-serif text-2xl text-green-400">{projectData.amountPaid}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Next Payment Due</p>
                    <p className="font-serif text-2xl text-[var(--color-bronze)]">{projectData.nextDue}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button className="px-6 py-3 border border-[var(--color-bronze)] text-[var(--color-bronze)] hover:bg-[var(--color-bronze)] hover:text-white transition-colors text-xs uppercase tracking-widest">
                      View Receipts
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
              <AnimatePresence mode="wait">
                {loginState === "locked" && (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm rounded-lg text-center"
                  >
                    Too many failed attempts. Try again in {Math.floor(lockoutRemaining / 60)}m {lockoutRemaining % 60}s.
                  </motion.div>
                )}
                {loginState === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center"
                  >
                    Invalid Project ID or Access Code. ({MAX_ATTEMPTS - attempts} attempts left)
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Project ID</label>
                <input
                  required
                  type="text"
                  value={projectId}
                  disabled={loginState === "locked"}
                  onChange={(e) => {
                    setProjectId(e.target.value);
                    if (loginState === "error") setLoginState("idle");
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-bronze)] transition-colors text-white text-lg placeholder-white/20 disabled:opacity-40"
                  placeholder="e.g. SRT-1024"
                />
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">Access Code</label>
                <input
                  required
                  type="password"
                  value={accessCode}
                  disabled={loginState === "locked"}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    if (loginState === "error") setLoginState("idle");
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[var(--color-bronze)] transition-colors text-white text-lg placeholder-white/20 disabled:opacity-40"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loginState === "loading" || loginState === "locked"}
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
