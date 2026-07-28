import { Metadata } from "next";
import PortalClient from "./PortalClient";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Client Portal | SRT Constructions",
  description: "Secure private portal for SRT Constructions clients.",
};

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return <PortalClient dict={dict} />;
}
