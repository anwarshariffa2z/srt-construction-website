import type { Metadata } from 'next';
import { SketchStudio } from "@/components/SketchStudio";

export const metadata: Metadata = {
  title: "2D Concept Sketch Maker | SRT Constructions",
  description: "Draw your floor plan or requirements visually using our 2D Concept Sketch Maker. Submit your concept directly to our architectural team.",
};

export default function SketchPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[15vh]">
      <SketchStudio />
    </main>
  );
}
