"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const faqData: FAQCategory[] = [
  {
    title: "Section A: Trust & Transparency",
    items: [
      {
        question: "How do I know you won't inflate costs mid-project?",
        answer: "You receive an itemized Bill of Quantities (BOQ) with fixed pricing before construction begins. Costs only change if you formally request a design or material variation via a written change order. There are zero hidden fees."
      },
      {
        question: "Do you provide a detailed written contract with fixed pricing?",
        answer: "Yes. Every project requires a legally binding construction agreement that locks in the finalized price, specifies exact material brands, and enforces penalty clauses for any unreasonable delays."
      },
      {
        question: "How do I verify you're using the materials you promised?",
        answer: "We provide mill test certificates for steel, original invoices for branded cement and plumbing materials, and mandate joint site inspections at every major milestone to verify material usage."
      },
      {
        question: "Are you RERA registered?",
        answer: "Yes, SRT Constructions is fully registered with the Tamil Nadu Real Estate Regulatory Authority (TNRERA). Your investment is legally protected by statutory government guidelines."
      },
      {
        question: "What happens if the project gets delayed?",
        answer: "Our construction contracts contain strict penalty clauses. If an unexcused delay exceeds the agreed timeline, SRT Constructions compensates the client according to the pre-defined penalty structure."
      },
      {
        question: "Do you sub-contract work to third parties?",
        answer: "No. SRT Constructions utilizes a 100% in-house workforce and proprietary machinery to maintain absolute control over structural quality, site safety, and project timelines."
      }
    ]
  },
  {
    title: "Section B: Process & Timelines",
    items: [
      {
        question: "How long does a 2000-3000 sq ft residential project take?",
        answer: "A standard 2,000 to 3,000 sq ft premium residential project in Chennai requires exactly 12 to 16 months for end-to-end completion, including approvals, structural work, and turnkey interiors."
      },
      {
        question: "Do you handle DTCP and CMDA approvals?",
        answer: "Yes. Our legal team manages the entire building permit lifecycle, securing approvals from CMDA, DTCP, and local panchayat/corporation authorities before excavation begins."
      },
      {
        question: "What are the payment milestones?",
        answer: "Payments are strictly tied to physical progress. The standard 6-stage milestone structure covers: Foundation, Plinth Level, Roof Slab Casting, Masonry & Plastering, MEP & Finishes, and Final Handover."
      },
      {
        question: "Do you provide weekly site updates?",
        answer: "Yes. Clients receive weekly progress reports via WhatsApp containing site photos, video walkthroughs, and stage-wise quality inspection updates."
      },
      {
        question: "Can I visit the construction site anytime?",
        answer: "Yes. We maintain a strict open-door policy. Clients can visit the site at any time to inspect construction quality and consult directly with the assigned site engineer."
      }
    ]
  },
  {
    title: "Section C: Technical & Quality",
    items: [
      {
        question: "What grade of cement and steel do you use?",
        answer: "We exclusively use OPC 53 Grade cement (Ramco/UltraTech) for structural concrete and PPC for masonry. For reinforcement, we mandate Fe500D or Fe550D primary TMT bars (Tata Tiscon/JSW)."
      },
      {
        question: "Do you perform soil testing before foundation work?",
        answer: "Yes. A Standard Penetration Test (SPT) and geotechnical soil investigation are mandatory first steps to calculate bearing capacity and design the specific structural foundation."
      },
      {
        question: "Is a structural engineer involved in every project?",
        answer: "Yes. An in-house, licensed structural engineer calculates loads, reviews soil data, and signs off on all structural drawings (per IS 456 and IS 1893 codes) before execution."
      },
      {
        question: "How do you handle waterproofing in Chennai's coastal climate?",
        answer: "We deploy a multi-layer waterproofing system: crystalline coatings injected into RCC surfaces, APP modified bitumen membranes for terrace slabs, and Dr. Fixit cementitious coatings for all bathroom sunken slabs."
      },
      {
        question: "Do you provide 3D visualization before construction?",
        answer: "Yes. Our architectural team delivers photorealistic 3D exterior renders and detailed interior walkthrough animations so clients can approve the final aesthetic before breaking ground."
      },
      {
        question: "Do you follow Vastu guidelines?",
        answer: "Yes. When requested, our architects strictly integrate authentic Vastu Shastra principles into the initial floor plan, ensuring compliance without compromising modern structural engineering or spatial flow."
      }
    ]
  },
  {
    title: "Section D: Post-Construction & Warranty",
    items: [
      {
        question: "What warranty do you provide after handover?",
        answer: "SRT Constructions provides a mandatory 5-year structural warranty per RERA guidelines, backed by a comprehensive 1-year warranty on all Mechanical, Electrical, and Plumbing (MEP) installations."
      },
      {
        question: "What if I discover defects after moving in?",
        answer: "During the Defect Liability Period (DLP), our dedicated maintenance team will promptly repair any covered structural, plumbing, or electrical issues at zero additional cost."
      },
      {
        question: "Do you handle interior work or do I need a separate firm?",
        answer: "Yes. We offer complete in-house turnkey interior design and execution services, eliminating coordination delays between the structural builder and interior contractors."
      },
      {
        question: "Do you take on renovation or remodeling projects?",
        answer: "Yes. We accept high-end residential and commercial remodeling projects, applying the same IS-code structural engineering standards and premium material specifications as our new builds."
      },
      {
        question: "Can you help me get a home loan?",
        answer: "Yes. Our administrative team supplies all technical documentation required by banks for home loan approval, including CMDA/DTCP sanctioned plans, detailed engineer estimates, and stage-wise completion certificates."
      }
    ]
  }
];

const AccordionItem = ({ 
  item, 
  isOpen, 
  onToggle 
}: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void 
}) => {
  return (
    <div className="border-b border-[var(--color-stone)]">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-serif text-xl text-[var(--color-foreground)] pr-8">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--color-bronze)]">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: 24 },
              collapsed: { opacity: 0, height: 0, marginBottom: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-[var(--color-foreground-soft)] leading-relaxed max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(section => 
      section.items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    )
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-[15vh] px-[6vw] max-w-[1200px] mx-auto">
        
        <Reveal>
          <div className="mb-20">
            <h5 className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-4">
              Knowledge Base
            </h5>
            <h1 className="font-serif text-5xl md:text-7xl text-[var(--color-foreground)] mb-6">
              Frequently Asked Questions.
            </h1>
            <p className="text-[var(--color-foreground-soft)] text-lg max-w-2xl">
              Addressing your concerns with complete transparency. We believe an informed client is our best partner in creating exceptional spaces.
            </p>
          </div>
        </Reveal>

        <div className="space-y-24">
          {faqData.map((section, sIndex) => (
            <Reveal key={sIndex}>
              <div className="pt-8">
                <h2 className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-8 pb-4 border-b border-[var(--color-stone)]">
                  {section.title}
                </h2>
                
                <div className="flex flex-col">
                  {section.items.map((item, iIndex) => (
                    <AccordionItem
                      key={iIndex}
                      item={item}
                      isOpen={openIndex === `${sIndex}-${iIndex}`}
                      onToggle={() => toggleAccordion(sIndex, iIndex)}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </section>
    </main>
  );
}
