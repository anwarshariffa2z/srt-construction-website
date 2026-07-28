import { Metadata } from "next";
import { DesignStudio } from "@/components/DesignStudio";

export const metadata: Metadata = {
  title: "Virtual Design Studio | SRT Constructions",
  description: "Configure your dream home finishes and get a real-time cost estimate.",
};

export default function StudioPage() {
  return <DesignStudio />;
}
