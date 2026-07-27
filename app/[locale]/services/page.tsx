import type { Metadata } from 'next';
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Our Services | Turnkey Construction & Architecture",
  description: "End-to-end capabilities from SRT Constructions. We handle Architecture, Civil Construction, MEP, and Turnkey Interiors in-house.",
};

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[25vh] pb-[10vh]">
      
      {/* Intro Section */}
      <section className="px-[6vw] max-w-[1200px] mx-auto mb-[20vh]">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">{dict.services.eyebrow}</div>
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] text-[var(--color-foreground)] font-light leading-[1.05] mb-[4vh]">
            {dict.services.headline}
          </h1>
        </Reveal>
      </section>

      {/* Services List */}
      <section className="px-[6vw] max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-[15vh]">
          {dict.services.items.map((service, i) => (
            <div key={service.id} className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
              
              <div className={`md:col-span-5 flex flex-col ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <Reveal>
                  <div className="font-serif italic text-4xl text-[var(--color-bronze)] mb-6">{service.id}.</div>
                  <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-foreground)] mb-6">{service.title}</h2>
                  <p className="text-lg text-[var(--color-foreground-soft)] leading-relaxed">
                    {service.desc}
                  </p>
                </Reveal>
              </div>

              <div className={`md:col-span-7 h-[50vh] md:h-[70vh] relative w-full ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <Reveal className="w-full h-full">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </Reveal>
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
