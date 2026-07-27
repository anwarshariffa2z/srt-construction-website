import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | SRT Constructions",
  description: "Start a conversation. Let's discuss how our unified team can bring your vision to reality without compromise.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return <ContactClient dict={dict} />;
}
