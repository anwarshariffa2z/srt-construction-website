import FAQClient from "./FAQClient";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "FAQ | SRT Constructions",
  description: "Frequently asked questions about our construction process, timelines, materials, and transparent pricing in Chennai.",
};

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <FAQClient dict={dict} />;
}
