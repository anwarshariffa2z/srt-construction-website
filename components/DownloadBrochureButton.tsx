/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PdfBrochure } from "./PdfBrochure";

// Dynamically import PDFDownloadLink so it strictly runs on the client-side
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface DownloadBrochureButtonProps {
  project: any;
}

export function DownloadBrochureButton({ project }: DownloadBrochureButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder button during SSR and initial hydration
    return (
      <button className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase border border-white/20 px-6 py-3 hover:bg-[var(--color-bronze)] hover:border-[var(--color-bronze)] hover:text-black transition-colors opacity-50 cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Preparing Brochure...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<PdfBrochure project={project} />}
      fileName={`SRT_Construction_${project.title.replace(/\s+/g, "_")}_Brochure.pdf`}
      className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase border border-[var(--color-bronze)] text-[var(--color-bronze)] px-6 py-3 hover:bg-[var(--color-bronze)] hover:text-black transition-colors"
    >
      {/* @ts-expect-error Types for react-pdf renderer can be complex */}
      {({ blob, url, loading, error }) => (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          {loading ? "Generating PDF..." : "Download Brochure"}
        </>
      )}
    </PDFDownloadLink>
  );
}
