"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./ProjectMapData"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl bg-[var(--color-stone-dark)] border border-white/10 flex items-center justify-center relative z-10">
      <div className="text-[var(--color-bronze)] text-xs uppercase tracking-[0.2em] animate-pulse">Initializing Map Engine...</div>
    </div>
  )
});

export function ProjectMap() {
  return <Map />;
}
