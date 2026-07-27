import FAQClient from "./FAQClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | SRT Constructions",
  description: "Frequently asked questions about our construction process, timelines, materials, and transparent pricing in Chennai.",
};

export default function FAQPage() {
  return <FAQClient />;
}
