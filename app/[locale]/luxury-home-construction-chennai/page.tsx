import type { Metadata } from 'next';
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Luxury Home Construction in Chennai | Premium Turnkey Builders | SRT",
  description: "SRT Constructions is the premier luxury home builder in Chennai. Experience flawless turnkey construction, seamless Italian marble, and world-class architectural design.",
  alternates: {
    canonical: "https://srtconstructions.in/en/luxury-home-construction-chennai",
  }
};

// SEO JSON-LD Schema
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SRT Constructions - Luxury Home Builders",
  "image": "https://srtconstructions.in/assets/projects/srt_real_project_1_1785082142072.jpg",
  "@id": "https://srtconstructions.in",
  "url": "https://srtconstructions.in/en/luxury-home-construction-chennai",
  "telephone": "+918056880272",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ECR",
    "addressLocality": "Chennai",
    "postalCode": "600115",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.8719,
    "longitude": 80.2472
  },
  "priceRange": "$$$$"
};

export default function LuxuryHomeConstruction() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[25vh] pb-[10vh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Hero Section */}
      <section className="px-[6vw] max-w-[1200px] mx-auto mb-[20vh]">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">Chennai&apos;s Premier Builder</div>
          <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-[var(--color-foreground)] font-light leading-[1.05] mb-[4vh]">
            Luxury Home Construction in Chennai
          </h1>
          <p className="text-xl text-[var(--color-foreground-soft)] max-w-[60ch] leading-relaxed mb-10">
            For those who refuse to compromise. We specialize in building ultra-premium, architecturally distinct residences in Chennai&apos;s most exclusive neighborhoods—delivering seamless Italian marble finishes, smart-home automation, and flawless turnkey execution.
          </p>
          <Link href="/en/contact">
            <MagneticButton>Book a Consultation</MagneticButton>
          </Link>
        </Reveal>
      </section>

      {/* Why Choose Us */}
      <section className="px-[6vw] max-w-[1200px] mx-auto mb-[20vh]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[60vh] w-full">
            <Image 
              src="/assets/projects/srt_real_project_1_1785082142072.jpg" 
              alt="Luxury Italian Marble Living Room in Chennai"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Reveal>
              <h2 className="font-serif text-4xl text-[var(--color-foreground)] mb-6">Why discerning clients in Chennai choose us.</h2>
              <p className="text-lg text-[var(--color-foreground-soft)] leading-relaxed mb-6">
                Building a luxury home in Chennai requires more than just bricks and mortar. It requires an obsessively detailed approach to climate-resilient architecture, master-craftsmanship, and transparent project management.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-[var(--color-bronze)]">01.</span>
                  <div>
                    <strong className="block text-[var(--color-foreground)]">Zero-Compromise Material Sourcing</strong>
                    <span className="text-sm text-[var(--color-foreground-soft)]">From authentic Rajasthan Granite to Statuario marble, we source only the absolute best.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-[var(--color-bronze)]">02.</span>
                  <div>
                    <strong className="block text-[var(--color-foreground)]">In-House Master Craftsmen</strong>
                    <span className="text-sm text-[var(--color-foreground-soft)]">No unreliable sub-contractors. Our woodwork and stone-laying teams are elite artisans.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-[var(--color-bronze)]">03.</span>
                  <div>
                    <strong className="block text-[var(--color-foreground)]">Turnkey Delivery</strong>
                    <span className="text-sm text-[var(--color-foreground-soft)]">We handle everything from soil testing to the final smart-home integration.</span>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Localized FAQ */}
      <section className="px-[6vw] max-w-[1000px] mx-auto mb-[15vh]">
        <Reveal>
          <h2 className="font-serif text-4xl text-[var(--color-foreground)] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-[var(--color-stone)] pb-6">
              <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">What is the cost of luxury home construction in Chennai?</h3>
              <p className="text-[var(--color-foreground-soft)]">While basic construction in Chennai starts lower, true luxury construction featuring premium imported materials, central HVAC, and smart-home automation typically ranges from ₹2,500 to ₹4,500+ per sq.ft. You can use our <Link href="/studio" className="text-[var(--color-bronze)] underline">Design Studio</Link> to get an exact real-time estimate.</p>
            </div>
            <div className="border-b border-[var(--color-stone)] pb-6">
              <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Do you handle CMDA / DTCP approvals?</h3>
              <p className="text-[var(--color-foreground-soft)]">Yes. As a true turnkey builder, our architectural team handles all statutory approvals including CMDA and local corporation permits across Chennai, ensuring a stress-free experience for our NRI and HNI clients.</p>
            </div>
            <div className="border-b border-[var(--color-stone)] pb-6">
              <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-2">Which areas in Chennai do you serve?</h3>
              <p className="text-[var(--color-foreground-soft)]">We primarily undertake luxury residential projects in upscale neighborhoods including ECR, OMR, Adyar, Besant Nagar, Poes Garden, and Boat Club.</p>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
