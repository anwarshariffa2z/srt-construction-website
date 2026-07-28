"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export default function PortalClient({ dict }: { dict: any }) {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [portalData, setPortalData] = useState<any>(null);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      setFetchingData(true);
      const query = `*[_type == "clientPortal" && clientEmail == $email][0]{
        ...,
        project->{title, location, category, image, mainImage},
        "logs": dailyLogs[]{..., photos[]{asset->{url}}},
        "docs": invoices[]{..., file{asset->{url}}}
      }`;
      client.fetch(query, { email: user.email })
        .then((data) => setPortalData(data))
        .catch((err) => console.error("Failed to fetch portal data", err))
        .finally(() => setFetchingData(false));
    } else {
      setPortalData(null);
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-bronze)] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] pt-[20vh] pb-[10vh] px-[6vw] flex flex-col items-center">
        <Reveal>
          <div className="max-w-[400px] w-full bg-[var(--color-stone-dark)] p-10 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-bronze-dark)] to-[var(--color-bronze)]" />
            <h1 className="font-serif text-3xl text-white mb-2">Client Portal</h1>
            <p className="text-white/50 text-sm mb-8">Secure access to your project dashboard.</p>
            
            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 mb-6">{error}</div>}
            
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-white/70">Email Address</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[var(--color-bronze)] transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-white/70">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[var(--color-bronze)] transition-colors"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loggingIn}
                className="mt-4 bg-[var(--color-bronze)] text-black py-4 text-[0.7rem] tracking-[0.2em] uppercase hover:bg-[var(--color-bronze-deep)] transition-colors disabled:opacity-50"
              >
                {loggingIn ? 'Authenticating...' : 'Secure Login'}
              </button>
            </form>
          </div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[20vh] pb-[10vh] px-[6vw]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-bronze)] mb-4">Welcome Back</div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-white font-light leading-[1.1]">
              {portalData?.project?.title || "Your Project Dashboard"}
            </h1>
            <p className="text-white/60 mt-4 text-lg">Logged in as: {user.email}</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50 border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Sign Out
          </button>
        </div>

        {fetchingData ? (
          <div className="w-full py-20 flex justify-center">
            <div className="w-6 h-6 border-2 border-[var(--color-bronze)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !portalData ? (
          <div className="text-center py-20 border border-white/10 bg-[var(--color-stone-dark)]">
            <h3 className="text-xl text-white mb-2">No Project Assigned</h3>
            <p className="text-white/50">There is currently no portal data assigned to this email address.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Daily Logs */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">Daily Site Logs</h2>
              {portalData.logs?.length > 0 ? (
                <div className="flex flex-col gap-10">
                  {portalData.logs.map((log: any, idx: number) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-32 flex-shrink-0">
                        <div className="text-[0.7rem] tracking-[0.1em] text-[var(--color-bronze)]">{new Date(log.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="text-white/80 leading-relaxed">{log.description}</p>
                        {log.photos?.length > 0 && (
                          <div className="grid grid-cols-2 gap-4">
                            {log.photos.map((photo: any, pIdx: number) => (
                              <div key={pIdx} className="relative aspect-video bg-white/5">
                                <Image src={photo.asset?.url} alt="Site Photo" fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/40 italic">No logs have been posted yet.</p>
              )}
            </div>

            {/* Right Column: Invoices & Cameras */}
            <div className="flex flex-col gap-12">
              
              {/* CCTV Feed */}
              {portalData.cctvUrl && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">Live Camera</h2>
                  <div className="aspect-video w-full bg-black relative border border-white/20">
                    <iframe 
                      src={portalData.cctvUrl}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Invoices */}
              <div className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-white border-b border-white/10 pb-4">Invoices & Documents</h2>
                {portalData.docs?.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {portalData.docs.map((doc: any, idx: number) => (
                      <a 
                        key={idx} 
                        href={doc.file?.asset?.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-[var(--color-stone-dark)] border border-white/10 hover:border-[var(--color-bronze)] transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-white">{doc.title}</span>
                          <span className="text-[0.65rem] text-white/50">{new Date(doc.date).toLocaleDateString()}</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 group-hover:text-[var(--color-bronze)] transition-colors">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40 italic">No documents available.</p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}
