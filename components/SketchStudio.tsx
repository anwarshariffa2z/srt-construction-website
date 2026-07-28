"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Excalidraw to prevent SSR window is not defined errors
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

export function SketchStudio() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", projectSize: "" });

  const handleSubmitClick = () => {
    setShowModal(true);
  };

  const submitConcept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!excalidrawAPI) return;

    setFormState('submitting');
    try {
      // Get all drawn elements
      const elements = excalidrawAPI.getSceneElements();
      if (!elements || elements.length === 0) {
        alert("Please draw something before submitting.");
        setFormState('idle');
        return;
      }

      // Dynamically import exportToBlob
      const { exportToBlob } = await import("@excalidraw/excalidraw");
      
      const blob = await exportToBlob({
        elements,
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
        mimeType: "image/jpeg",
        exportBackground: true,
      });

      // Convert Blob to Base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result;

        // Save to Firebase
        const { db } = await import("@/lib/firebase");
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
        if (!db) throw new Error("Firebase DB not initialized");

        await addDoc(collection(db, "concept_sketches"), {
          ...formData,
          sketchImage: base64data, // base64 jpeg
          createdAt: serverTimestamp(),
        });

        setFormState('success');
      };
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  return (
    <div className="w-full flex flex-col h-[85vh] relative bg-[var(--color-background)]">
      
      {/* Header */}
      <div className="px-[6vw] py-8 flex justify-between items-center border-b border-[var(--color-stone)] bg-white z-10">
        <div>
          <h1 className="font-serif text-3xl text-[var(--color-foreground)] mb-1">Concept Sketch Maker</h1>
          <p className="text-[var(--color-foreground-soft)] text-sm">Draw your floor plan or requirements. Use rectangles for rooms and text for labels.</p>
        </div>
        <button 
          onClick={handleSubmitClick}
          className="px-6 py-3 bg-[var(--color-bronze)] text-white text-xs uppercase tracking-widest hover:bg-[#a68652] transition-colors shadow-lg"
        >
          Submit Concept
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full relative">
        <Excalidraw 
          excalidrawAPI={(api) => setExcalidrawAPI(api)} 
          UIOptions={{ canvasActions: { loadScene: false, export: false, saveAsImage: false } }}
        />
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {showModal && (
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
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[var(--color-foreground-soft)] hover:text-black transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {formState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[var(--color-bronze)]/10 text-[var(--color-bronze)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Concept Received!</h3>
                  <p className="text-[var(--color-foreground-soft)] text-sm mb-6">Our architects will review your sketch and contact you shortly to take it further.</p>
                  <button 
                    onClick={() => { setShowModal(false); setFormState('idle'); }}
                    className="px-6 py-3 border border-[var(--color-stone)] text-[var(--color-foreground-soft)] hover:border-black hover:text-black transition-colors text-xs uppercase tracking-widest w-full"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={submitConcept}>
                  <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Submit Your Sketch</h3>
                  <p className="text-[var(--color-foreground-soft)] text-sm mb-8">Send this concept to our architectural team.</p>
                  
                  {formState === 'error' && (
                    <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm border border-red-100">
                      Failed to send sketch. Please try again.
                    </div>
                  )}

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-2">Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} className="w-full border-b border-[var(--color-stone)] py-2 outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-2">Phone</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} className="w-full border-b border-[var(--color-stone)] py-2 outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-foreground-soft)] mb-2">Estimated Plot Size</label>
                      <input required type="text" value={formData.projectSize} onChange={e => setFormData(p => ({...p, projectSize: e.target.value}))} className="w-full border-b border-[var(--color-stone)] py-2 outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]" placeholder="e.g. 2400 sq.ft or 40x60" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-[var(--color-bronze)] transition-colors disabled:opacity-50"
                  >
                    {formState === 'submitting' ? 'Uploading...' : 'Send to Architects'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
