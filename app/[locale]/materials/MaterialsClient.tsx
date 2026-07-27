/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";

export default function MaterialsClient({ dict }: { dict: any }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const materialsData = dict.materials.items;
  const MethodologySteps = dict.materials.methodology;

  return (
    <div className="bg-[#1a1712] text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-[20vh] pb-[10vh] px-[6vw] max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">
            {dict.materials.eyebrow}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#e5ddcd] whitespace-pre-line">
            {dict.materials.headline}
          </h1>
          <p className="text-[#a39a8a] text-lg md:text-xl max-w-2xl font-light">
            {dict.materials.desc}
          </p>
        </Reveal>
      </section>

      {/* Engineering Methodology */}
      <section className="py-[10vh] px-[6vw] bg-[#221f18]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e5ddcd] mb-12">
              {dict.materials.methodologyEyebrow}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MethodologySteps.map((step: any, idx: number) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="border-t border-[var(--color-bronze)] pt-6">
                  <div className="text-[var(--color-bronze)] font-serif text-2xl mb-4">
                    {step.step}.
                  </div>
                  <h3 className="text-xl font-medium text-[#e5ddcd] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#a39a8a] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Material Specifications Accordion */}
      <section className="py-[15vh] px-[6vw] max-w-[1000px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-8">
            {dict.materials.specEyebrow}
          </div>
        </Reveal>

        <div className="border-t border-white/10">
          {materialsData.map((item: any) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <Reveal key={item.id} delay={0.1}>
                <div className="border-b border-white/10">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full py-8 flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="text-[var(--color-bronze)] font-serif text-xl md:text-2xl">
                        {item.id}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#e5ddcd] group-hover:text-white transition-colors duration-300">
                        {item.category}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pl-14 md:pl-20 pr-4">
                          <div className="mb-6">
                            <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-white/50 mb-2">{dict.materials.approvedBrands}</h4>
                            <p className="text-[#e5ddcd]">{item.brands}</p>
                          </div>

                          <div className="mb-8">
                            <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-white/50 mb-2">{dict.materials.techSpecs}</h4>
                            <p className="text-[#a39a8a] text-sm leading-relaxed">{item.description}</p>
                          </div>

                          {/* Comparison Table */}
                          <div className="overflow-x-auto mb-8">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">{dict.materials.brandTitle}</th>
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">{dict.materials.gradeTitle}</th>
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">{dict.materials.specTitle}</th>
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">{dict.materials.whyTitle}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.tableData.map((row: any, rIdx: number) => (
                                  <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 text-sm text-[#e5ddcd]">{row.brand}</td>
                                    <td className="py-4 px-4 text-sm text-[#a39a8a]">{row.gradeType}</td>
                                    <td className="py-4 px-4 text-sm text-[#a39a8a]">{row.keySpec}</td>
                                    <td className="py-4 px-4 text-sm text-[#a39a8a]">{row.whyChoose}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8 mb-4">
                            <div>
                              <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-[var(--color-bronze)] mb-3">{dict.materials.engRationale}</h4>
                              <p className="text-[#a39a8a] text-sm leading-relaxed">{item.rationale}</p>
                            </div>
                            <div className="bg-red-950/20 border border-red-900/30 p-5 rounded-sm">
                              <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-red-400 mb-3">{dict.materials.whyNotCheaper}</h4>
                              <p className="text-[#a39a8a] text-sm leading-relaxed">{item.whyNotCheaper}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
