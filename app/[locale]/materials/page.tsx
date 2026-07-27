import type { Metadata } from 'next';
import { getDictionary } from "@/i18n/dictionaries";
import MaterialsClient from "./MaterialsClient";

export const metadata: Metadata = {
  title: "Materials & Specs | SRT Constructions",
  description: "Uncompromising quality mandated by IS codes and rigorous engineering protocols. We don't just build; we engineer longevity.",
};

export default async function MaterialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <main>
      <MaterialsClient dict={dict} />
    </main>
  );
}

