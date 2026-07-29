import type { Metadata } from 'next';
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { getDictionary } from "@/i18n/dictionaries";
import { ProjectMap } from "@/components/ProjectMap";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SRT Constructions, our history, our engineering process, and the master craftsmen behind our premium builds.",
};

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[25vh] pb-[10vh]">
      
      {/* Intro Section */}
      <section className="px-[6vw] max-w-[1200px] mx-auto mb-[20vh]">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">{dict.about.eyebrow}</div>
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] text-[var(--color-foreground)] font-light leading-[1.05] mb-[4vh]">
            {dict.about.headline}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-foreground-soft)] max-w-[60ch] font-light">
            {dict.about.desc}
          </p>
        </Reveal>
      </section>

      {/* The One Team Philosophy */}
      <section className="bg-[var(--color-stone-dark)] text-white py-[15vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16">
          <Reveal>
            <h2 className="font-serif text-4xl mb-6">{dict.about.oneTeamHeadline}</h2>
            <p className="text-[1.1rem] text-white/70 leading-relaxed mb-6">
              {dict.about.oneTeamP1}
            </p>
            <p className="text-[1.1rem] text-white/70 leading-relaxed">
              {dict.about.oneTeamP2}
            </p>
          </Reveal>
          
          <div className="flex flex-col justify-center border-l border-white/20 pl-8 md:pl-16">
            <h3 className="text-[0.8rem] tracking-[0.3em] uppercase text-[#c9a468] mb-8">{dict.about.oneTeamEyebrow}</h3>
            <div className="space-y-8">
              {dict.about.team.map((member, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <h4 className="font-serif text-2xl mb-2">{member.role}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{member.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-[15vh] px-[6vw] max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">{dict.about.processEyebrow}</div>
          <h2 className="font-serif text-5xl text-[var(--color-foreground)] mb-16">{dict.about.processHeadline}</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {dict.about.process.map((proc, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col border-t border-[var(--color-stone)] pt-8">
                <div className="font-serif italic text-3xl text-[var(--color-bronze)] mb-4">{proc.step}.</div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">{proc.title}</h3>
                <p className="text-[var(--color-foreground-soft)] leading-relaxed">{proc.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive Project Map */}
      <section className="py-[10vh] px-[6vw] max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">Our Footprint</div>
          <h2 className="font-serif text-4xl text-[var(--color-foreground)] mb-4">Building Across Chennai</h2>
          <p className="text-[var(--color-foreground-soft)] mb-12 max-w-[60ch]">
            Explore our ongoing and completed projects across the city. We bring luxury and architectural excellence to Chennai's most premium neighborhoods.
          </p>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="relative z-0">
            <ProjectMap />
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <Testimonials dict={dict.home.testimonials} />

    </main>
  );
}
