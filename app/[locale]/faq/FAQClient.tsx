/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function FAQClient({ dict }: { dict: any }) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  const faqData: FAQCategory[] = dict.faq.categories;

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
              {dict.faq.eyebrow}
            </h5>
            <h1 className="font-serif text-5xl md:text-7xl text-[var(--color-foreground)] mb-6">
              {dict.faq.headline}
            </h1>
            <p className="text-[var(--color-foreground-soft)] text-lg max-w-2xl">
              {dict.faq.desc}
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
