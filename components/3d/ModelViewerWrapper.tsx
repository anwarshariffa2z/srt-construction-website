"use client";

import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] md:h-[70vh] bg-[var(--color-stone)] animate-pulse flex items-center justify-center border border-[var(--color-stone)]">
      <span className="text-[var(--color-bronze)] text-sm tracking-widest uppercase">Loading 3D Engine...</span>
    </div>
  ),
});

export function ModelViewerWrapper() {
  return <ModelViewer />;
}
