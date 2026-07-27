import { TimeLapseScrubber } from "@/components/TimeLapseScrubber";
import { Reveal } from "@/components/Reveal";
import { CraftPillars } from "@/components/CraftPillars";
import { StatCountUp } from "@/components/StatCountUp";
import { MagneticButton } from "@/components/MagneticButton";
import { Testimonials } from "@/components/Testimonials";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero Time-Lapse Scrub */}
      <div id="hero">
        <TimeLapseScrubber />
      </div>

      {/* Stats Section */}
      <section className="bg-[var(--color-stone-dark)] text-white py-[12vh]">
        <div className="max-w-[1000px] mx-auto px-[6vw] grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          <StatCountUp value={15} suffix="+" label={dict.home.stats.years} />
          <StatCountUp value={1.2} suffix="M+" label={dict.home.stats.sqft} />
          <StatCountUp value={40} suffix="+" label={dict.home.stats.awards} />
          <StatCountUp value={100} suffix="+" label={dict.home.stats.projects} />
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="max-w-[1200px] mx-auto px-[6vw] pt-[18vh] pb-[16vh]">
        <Reveal>
          <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-foreground)] leading-[1.1] mb-12">
            {dict.home.story.headline} <br/>
            <span className="text-[var(--color-foreground-soft)]">{dict.home.story.subheadline}</span>
          </h2>
          <p className="text-[1.1rem] md:text-[1.3rem] text-[var(--color-foreground-soft)] max-w-[55ch] leading-relaxed mb-8">
            {dict.home.story.desc}
          </p>
        </Reveal>
      </section>

      {/* The 4 Pillars Sticky Scroll */}
      <CraftPillars dict={dict.home.expertise} />

      {/* Services Overview */}
      <section className="bg-[var(--color-background)] py-[15vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">{dict.home.expertise.eyebrow}</div>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-foreground)] mb-12">
              {dict.home.expertise.headline}
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-left border-t border-[var(--color-stone)] pt-12">
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">{dict.home.expertise.arch}</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">{dict.home.expertise.archDesc}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">{dict.home.expertise.const}</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">{dict.home.expertise.constDesc}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">{dict.home.expertise.int}</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">{dict.home.expertise.intDesc}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">{dict.home.expertise.cont}</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">{dict.home.expertise.contDesc}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Materials & Trust Teaser */}
      <section className="bg-[var(--color-stone-dark)] text-white py-[15vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6">{dict.home.materials.eyebrow}</div>
            <h2 className="font-serif font-light text-[clamp(2.5rem,4vw,4rem)] mb-8">
              {dict.home.materials.headline}
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              {dict.home.materials.desc}
            </p>
            <div className="flex gap-4">
              <span className="text-sm font-semibold tracking-wide text-white/90 bg-[#c9a468]/20 px-4 py-2 rounded-full">Ramco</span>
              <span className="text-sm font-semibold tracking-wide text-white/90 bg-[#c9a468]/20 px-4 py-2 rounded-full">Tata Tiscon</span>
              <span className="text-sm font-semibold tracking-wide text-white/90 bg-[#c9a468]/20 px-4 py-2 rounded-full">Ashirvad</span>
              <span className="text-sm font-semibold tracking-wide text-white/90 bg-[#c9a468]/20 px-4 py-2 rounded-full">Legrand</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="border-l border-white/20 pl-8 md:pl-16 flex flex-col gap-8">
              <div>
                <h3 className="font-serif text-2xl mb-2">{dict.home.materials.noSub}</h3>
                <p className="text-sm text-white/60">{dict.home.materials.noSubDesc}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">{dict.home.materials.oneTeam}</h3>
                <p className="text-sm text-white/60">{dict.home.materials.oneTeamDesc}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials dict={dict.home.testimonials} />

      {/* Footer / Consultation CTA */}
      <footer id="contact" className="bg-[var(--color-stone)] py-[16vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <Reveal>
            <h2 className="font-serif font-light text-[clamp(2.4rem,5.6vw,5rem)] text-[var(--color-foreground)]">
              {dict.home.contact.headline}
            </h2>
            <p className="mt-6 mb-12 text-[var(--color-foreground-soft)] max-w-[40ch] mx-auto">
              {dict.home.contact.desc}
            </p>
            <Link href={`/${locale}/contact`} className="inline-block">
              <MagneticButton>
                {dict.home.contact.cta}
              </MagneticButton>
            </Link>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
