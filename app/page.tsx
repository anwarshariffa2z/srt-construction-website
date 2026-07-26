import { TimeLapseScrubber } from "@/components/TimeLapseScrubber";
import { Reveal } from "@/components/Reveal";
import { CraftPillars } from "@/components/CraftPillars";
import { StatCountUp } from "@/components/StatCountUp";
import { MagneticButton } from "@/components/MagneticButton";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero Time-Lapse Scrub */}
      <div id="hero">
        <TimeLapseScrubber />
      </div>

      {/* Stats Section */}
      <section className="bg-[var(--color-stone-dark)] text-white py-[12vh]">
        <div className="max-w-[1000px] mx-auto px-[6vw] grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          <StatCountUp value={15} suffix="+" label="Years of Excellence" />
          <StatCountUp value={1.2} suffix="M+" label="Sq Ft Delivered" />
          <StatCountUp value={40} suffix="+" label="Awards Won" />
          <StatCountUp value={0} suffix="" label="Translation Losses" />
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="max-w-[1200px] mx-auto px-[6vw] pt-[18vh] pb-[16vh]">
        <Reveal>
          <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-foreground)] leading-[1.1] mb-12">
            Architecture, Construction, Interiors, and Contracting. <br/>
            <span className="text-[var(--color-foreground-soft)]">One Unified Vision.</span>
          </h2>
          <p className="text-[1.1rem] md:text-[1.3rem] text-[var(--color-foreground-soft)] max-w-[55ch] leading-relaxed mb-8">
            SRT Constructions removes the friction between design intent and physical execution. From the first sketch of a luxury residence to the massive resource mobilization of an industrial contracting project, we control the entire lifecycle.
          </p>
        </Reveal>
      </section>

      {/* The 4 Pillars Sticky Scroll */}
      <CraftPillars />

      {/* Services Overview */}
      <section className="bg-[var(--color-background)] py-[15vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">Our Expertise</div>
            <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-foreground)] mb-12">
              End-to-End Execution
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-left border-t border-[var(--color-stone)] pt-12">
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">Architecture</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">Rigorous proportion, timeless materiality, and functional master planning. From DTCP approvals to 3D visualization.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">Construction</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">Zero-tolerance structural execution utilizing heavy machinery and premium raw materials like Ramco and Tata Tiscon.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">Interiors</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">Bespoke spatial finishes that harmonize perfectly with the exterior shell, utilizing custom-milled joinery.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4">Contracting</h3>
                <p className="text-[var(--color-foreground-soft)] text-sm leading-relaxed mb-6">Large-scale commercial and industrial resource management. Aggressive timelines met with massive in-house manpower.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Materials & Trust Teaser */}
      <section className="bg-[var(--color-stone-dark)] text-white py-[15vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6">Uncompromising Quality</div>
            <h2 className="font-serif font-light text-[clamp(2.5rem,4vw,4rem)] mb-8">
              Built with India&apos;s Finest.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              A structure is only as strong as its weakest component. We bypass generic suppliers and source directly from the most trusted manufacturing giants in Tamil Nadu and across India. 
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
                <h3 className="font-serif text-2xl mb-2">Zero Sub-Contracting</h3>
                <p className="text-sm text-white/60">We manage our own fleet of machinery and our own master craftsmen. Absolute accountability.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">The One Team Philosophy</h3>
                <p className="text-sm text-white/60">Architects, engineers, and builders working in perfect unison from day one.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Footer / Consultation CTA */}
      <footer id="contact" className="bg-[var(--color-stone)] py-[16vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <Reveal>
            <h2 className="font-serif font-light text-[clamp(2.4rem,5.6vw,5rem)] text-[var(--color-foreground)]">
              Ready to <em className="italic text-[var(--color-bronze-deep)]">Break Ground?</em>
            </h2>
            <p className="mt-6 mb-12 text-[var(--color-foreground-soft)] max-w-[40ch] mx-auto">
              Skip the middlemen. Let our architects, engineers, builders, and contractors look at your project as one unified team.
            </p>
            <MagneticButton>
              Start a Conversation
            </MagneticButton>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
