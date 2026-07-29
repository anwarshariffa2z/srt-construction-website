"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only log in development — never expose stack traces to production users
    if (process.env.NODE_ENV === "development") {
      console.error("Page error:", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-bronze)] mb-6">
          Something went wrong
        </div>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] text-[var(--color-foreground)] font-light leading-none mb-8">
          Error
        </h1>
        <p className="text-[var(--color-foreground-soft)] mb-12 text-sm leading-relaxed">
          An unexpected error occurred. Our team has been notified.
          Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 border border-[var(--color-bronze)] text-[var(--color-bronze)] text-xs uppercase tracking-widest hover:bg-[var(--color-bronze)] hover:text-black transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/en"
            className="px-6 py-3 bg-[var(--color-bronze)] text-black text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
