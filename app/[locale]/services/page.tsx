import type { Metadata } from 'next';
import { CostEstimator } from "@/components/CostEstimator";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Turnkey construction, architectural design, structural engineering, and interior design.",
};
import Image from "next/image";

const SERVICES = [
  {
    id: "01",
    title: "Architecture",
    desc: "Rigorous proportion, timeless materiality, and functional master planning. Our principal architects don't just sketch concepts; they engineer living, breathing structures. We handle everything from initial zoning analysis and DTCP/CMDA approvals to advanced 3D visualization and Vastu compliance, ensuring the blueprint perfectly aligns with reality.",
    image: "/assets/projects/srt_real_project_1_1785082142072.jpg"
  },
  {
    id: "02",
    title: "Construction",
    desc: "Zero-tolerance structural execution. We operate our own fleet of heavy machinery and employ a massive in-house workforce. By cutting out sub-contractors, we maintain absolute control over the timeline and the structural integrity. We exclusively utilize premium grades of Ramco cement and Tata Tiscon TMT bars to guarantee generational durability.",
    image: "/assets/projects/srt_real_project_2_1785082154617.jpg"
  },
  {
    id: "03",
    title: "Interiors",
    desc: "Bespoke spatial finishes that harmonize perfectly with the exterior shell. Our interior division works simultaneously with the core construction team, allowing for flawless, concealed MEP integration. From custom-milled joinery and acoustic paneling to sourcing imported Italian marble, we deliver a true turnkey finish.",
    image: "/assets/projects/srt_project_interior_1_1785080139818.jpg"
  },
  {
    id: "04",
    title: "Contracting",
    desc: "Large-scale commercial and industrial resource management. When time is the ultimate currency, SRT Constructions delivers. We specialize in PEB (Pre-Engineered Buildings), heavy-load factory floors, and massive institutional projects, mobilizing hundreds of skilled laborers overnight to meet aggressive corporate deadlines.",
    image: "/assets/projects/srt_project_commercial_1_1785080152919.jpg"
  }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-[var(--color-stone-dark)] pt-[25vh] pb-[10vh] px-[6vw]">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6">Capabilities</div>
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] text-white font-light leading-[1.05] mb-[15vh]">
            End-to-End Execution.
          </h1>
        </Reveal>

        <div className="flex flex-col gap-[20vh]">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
              
              <div className="w-full md:w-1/2">
                <Reveal delay={0.2}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <Reveal delay={0.3}>
                  <div className="text-[#c9a468] text-sm font-mono mb-6">{service.id}</div>
                  <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] text-white mb-8">{service.title}</h2>
                  <p className="text-[1.1rem] text-white/70 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </Reveal>
              </div>

            </div>
          ))}
        </div>
      </div>
      
      <CostEstimator />
    </main>
  );
}
