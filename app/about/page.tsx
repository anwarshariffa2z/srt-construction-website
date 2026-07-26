import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";

const PROCESS = [
  { step: "01", title: "Conceptualization & Approvals", desc: "Every project begins with rigorous master planning. Our principal architects draft detailed 3D models and structural blueprints while our legal team secures all necessary CMDA, DTCP, and local body approvals in Tamil Nadu." },
  { step: "02", title: "Structural Engineering", desc: "Before a single brick is laid, our in-house structural engineers map out load-bearing calculations, seismic resistance, and soil stability protocols, ensuring the foundation is over-engineered for absolute safety." },
  { step: "03", title: "Civil Execution", desc: "This is where our contracting muscle flexes. We mobilize our own fleet of heavy machinery and skilled labor. Using premium raw materials (Ramco, Tata Tiscon), we execute the core shell with zero tolerance for error." },
  { step: "04", title: "MEP & Turnkey Interiors", desc: "The nervous system of the building is installed alongside the masonry. Flawless plumbing, HVAC, and electricals are followed by bespoke interior joinery, resulting in a turnkey handover ready for occupation." }
];

const TEAM = [
  { role: "Principal Architects", desc: "The visionaries who balance aesthetic ambition with functional reality. They ensure every square foot serves a purpose." },
  { role: "Structural Engineers", desc: "The mathematical backbone. They guarantee that the architect's floating cantilever roof will withstand the test of time." },
  { role: "Site Supervisors & PMCs", desc: "The boots on the ground. They enforce daily quality control, manage raw material supply chains, and ensure aggressive timelines are met." },
  { role: "Master Craftsmen", desc: "The artisans. From bespoke carpentry to flawless marble laying, their hands provide the final luxury finish." }
];

export default function About() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[25vh] pb-[10vh]">
      
      {/* Intro Section */}
      <section className="px-[6vw] max-w-[1200px] mx-auto mb-[20vh]">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">About SRT Constructions</div>
          <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] text-[var(--color-foreground)] font-light leading-[1.05] mb-[4vh]">
            Where strength meets reliability.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-foreground-soft)] max-w-[60ch] font-light">
            We are a premier construction firm based in Chennai, specializing in Industrial, Commercial, Residential, and Interior projects. We do not outsource our responsibility.
          </p>
        </Reveal>
      </section>

      {/* The One Team Philosophy */}
      <section className="bg-[var(--color-stone-dark)] text-white py-[15vh] px-[6vw]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16">
          <Reveal>
            <h2 className="font-serif text-4xl mb-6">The One Team Philosophy.</h2>
            <p className="text-[1.1rem] text-white/70 leading-relaxed mb-6">
              In traditional construction, the architect hands a vision to an engineer, who hands a compromised version to a builder, who cuts corners to meet a budget. 
            </p>
            <p className="text-[1.1rem] text-white/70 leading-relaxed">
              At SRT Constructions, there are no hand-offs. We take absolute accountability for every square inch of our projects, from the initial sketch to the final execution. If something isn&apos;t perfect, we only have ourselves to blame.
            </p>
          </Reveal>
          
          <div className="flex flex-col justify-center border-l border-white/20 pl-8 md:pl-16">
            <h3 className="text-[0.8rem] tracking-[0.3em] uppercase text-[#c9a468] mb-8">Our Core Team</h3>
            <div className="space-y-8">
              {TEAM.map((member, i) => (
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
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">Execution</div>
          <h2 className="font-serif text-5xl text-[var(--color-foreground)] mb-16">Our Turnkey Process.</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {PROCESS.map((proc, i) => (
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

      {/* Testimonials */}
      <Testimonials />

    </main>
  );
}
