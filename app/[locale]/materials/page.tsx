/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";

interface MaterialSpec {
  id: string;
  category: string;
  brands: string;
  description: string;
  rationale: string;
  whyNotCheaper: string;
  tableData: {
    brand: string;
    gradeType: string;
    keySpec: string;
    whyChoose: string;
  }[];
}

const materialsData: MaterialSpec[] = [
  {
    id: "01",
    category: "Cement & Aggregates",
    brands: "Ramco Supergrade, UltraTech, Dalmia DSP",
    description:
      "OPC 53 Grade — 53 MPa compressive strength at 28 days (IS 12269). PPC for masonry — low heat of hydration, higher long-term strength. Aggregates: 20mm nominal size, silt content < 3% (IS 383).",
    rationale:
      "Ramco cement, manufactured in Tamil Nadu, provides the fastest setting time and optimal hydration for coastal Chennai's humid environment. Fresher cement directly translates to better hydration and ultimately, stronger concrete structures.",
    whyNotCheaper:
      "Non-branded or older cement loses strength exponentially due to moisture absorption. Substandard aggregates with >3% silt weaken the cement-aggregate bond, causing structural spalling.",
    tableData: [
      {
        brand: "Ramco / UltraTech",
        gradeType: "OPC 53 Grade (IS 12269)",
        keySpec: "53 MPa @ 28 Days",
        whyChoose: "Primary structural strength for columns & footings",
      },
      {
        brand: "Dalmia DSP",
        gradeType: "PPC (IS 1489)",
        keySpec: "Low Heat Hydration",
        whyChoose: "Prevents thermal cracking in masonry & plastering",
      },
    ],
  },
  {
    id: "02",
    category: "Structural Steel (TMT Bars)",
    brands: "Tata Tiscon, JSW Neosteel, ARS 550D",
    description:
      "Fe500D — yield strength ≥ 500 MPa, elongation ≥ 16% (IS 1786:2008). The 'D' = ductile = superior earthquake resistance. CRS (Corrosion Resistant Steel) technology for coastal builds.",
    rationale:
      "We strictly specify primary steel from integrated steel plants ensuring 99.5% purity. The Fe500D grade provides the exact balance of tensile strength and ductility required by IS 1893 for seismic zone III (Chennai), allowing the structure to flex rather than snap during seismic events.",
    whyNotCheaper:
      "Secondary or re-rolled steel has inconsistent metallurgy, improper rib patterns, and higher carbon content, leading to brittle failures and poor concrete bonding.",
    tableData: [
      {
        brand: "Tata Tiscon",
        gradeType: "Fe500D (Primary)",
        keySpec: "Elongation ≥ 16%",
        whyChoose: "Maximum ductility for earthquake resistance",
      },
      {
        brand: "JSW Neosteel",
        gradeType: "CRS Fe500D",
        keySpec: "Corrosion Resistant",
        whyChoose: "Essential for Chennai's coastal, saline environment",
      },
    ],
  },
  {
    id: "03",
    category: "Concrete & Admixtures",
    brands: "M20 (general), M25 (columns), M30 (heavy structural)",
    description:
      "Water-cement ratio ≤ 0.45 for M25+ per IS 456. Slump: 75-100mm for beams/slabs, 100-150mm for columns. Admixtures: Sika ViscoCrete for superplasticization, Fosroc Conplast for water reduction.",
    rationale:
      "Strength isn't just about cement; it's about water reduction. By using advanced polycarboxylate ether (PCE) superplasticizers like Sika ViscoCrete, we maintain workability (slump) while strictly enforcing low water-cement ratios. Quality is verified via mandatory 7-day and 28-day cube testing (min. 3 cubes per 50 m³).",
    whyNotCheaper:
      "Adding water at the site for workability kills concrete strength. A 0.1 increase in w/c ratio can reduce strength by 20%.",
    tableData: [
      {
        brand: "Site-Mixed / RMC",
        gradeType: "M25 (IS 456)",
        keySpec: "w/c ratio ≤ 0.45",
        whyChoose: "Standard structural requirement for RCC members",
      },
      {
        brand: "Sika / Fosroc",
        gradeType: "PCE Superplasticizer",
        keySpec: "High Water Reduction",
        whyChoose: "Workability without compromising compressive strength",
      },
    ],
  },
  {
    id: "04",
    category: "Electrical & Wiring",
    brands: "Polycab FRLS, Finolex, Havells, Legrand",
    description:
      "FRLS (Flame Retardant Low Smoke) per IS 694. Copper purity: 99.97% electrolytic grade. Wire gauges: 1.5 sq mm (lighting), 2.5 sq mm (power sockets), 4.0 sq mm (ACs/geysers), 6.0 sq mm (main feeder).",
    rationale:
      "Electrical safety is non-negotiable. We exclusively use 99.97% pure electrolytic copper for minimal resistance and heat generation. FRLS insulation ensures that in the event of a fire, toxic smoke emission is minimized, aiding safe evacuation. Legrand switchgear provides precision circuit protection.",
    whyNotCheaper:
      "Commercial grade wires use recycled copper with higher impurities, leading to overheating, energy loss, and high fire risk.",
    tableData: [
      {
        brand: "Polycab / Finolex",
        gradeType: "FRLS (IS 694)",
        keySpec: "99.97% Pure Copper",
        whyChoose: "Low resistance, high thermal stability, fire safety",
      },
      {
        brand: "Legrand / Havells",
        gradeType: "MCB / RCCB (IS 12640)",
        keySpec: "30mA Trip Sensitivity",
        whyChoose: "Immediate protection against earth leakage and shocks",
      },
    ],
  },
  {
    id: "05",
    category: "Plumbing & Sanitation",
    brands: "Ashirvad FlowGuard CPVC, Supreme UPVC, Astral, Kohler, Jaquar",
    description:
      "CPVC for hot/cold supply (withstands 93°C, SDR-11 pressure rating per ASTM D2846). UPVC for drainage (IS 4985). SWR system for soil/waste/rainwater.",
    rationale:
      "Modern plumbing requires distinct systems: CPVC for pressurized, temperature-variant supply lines, and robust UPVC for gravity-fed drainage. Our SDR-11 rated CPVC handles high-pressure booster pumps and solar geyser outputs without thermal deformation.",
    whyNotCheaper:
      "Standard PVC pipes warp under hot water and fail under pressure. Cheap solvent cements lead to hidden in-wall leaks that destroy masonry.",
    tableData: [
      {
        brand: "Ashirvad / Astral",
        gradeType: "CPVC SDR-11",
        keySpec: "Withstands 93°C",
        whyChoose: "Hot water supply and high-pressure resilience",
      },
      {
        brand: "Supreme",
        gradeType: "UPVC (IS 4985)",
        keySpec: "High Impact Strength",
        whyChoose: "Durable drainage and waste management",
      },
    ],
  },
  {
    id: "06",
    category: "Waterproofing",
    brands: "Dr. Fixit (Pidilite), Fosroc, Sika, Asian Paints SmartCare",
    description:
      "Multi-layer system — crystalline coating on RCC surface, APP (Atactic Polypropylene) modified bitumen membrane, protective screed. Terrace: Dr. Fixit Roofseal with fiberglass mesh reinforcement. Bathroom: Cementitious coating on sunken slab + PVC waterproofing membrane.",
    rationale:
      "Chennai's 1400mm annual rainfall and coastal salt spray demand industrial-grade waterproofing. We employ a multi-barrier approach: crystalline admixtures that react with moisture to seal micro-cracks, topped with APP membranes for elastomeric protection, ensuring zero water ingress.",
    whyNotCheaper:
      "Basic tar-felt systems degrade rapidly under UV exposure. Paint-on 'waterproof' solutions lack the elastomeric properties to bridge structural micro-cracks.",
    tableData: [
      {
        brand: "Fosroc / Sika",
        gradeType: "Crystalline Admixture",
        keySpec: "Micro-crack sealing",
        whyChoose: "Integral RCC protection against capillary action",
      },
      {
        brand: "Dr. Fixit",
        gradeType: "APP Bitumen Membrane",
        keySpec: "Elastomeric Barrier",
        whyChoose: "Heavy-duty terrace waterproofing with mesh reinforcement",
      },
    ],
  },
  {
    id: "07",
    category: "Paints & Finishes",
    brands: "Asian Paints Royale, Jotun Shield, Nippon Paint, Birla White",
    description:
      "Exterior — Jotun Shield (7-year warranty, UV resistant, anti-algal). Interior — Asian Paints Royale Luxury Emulsion (washable, anti-bacterial, 15,000+ color options). Base: Double-coat Birla White wall putty for glass-smooth finish.",
    rationale:
      "A flawless finish starts at the substrate. We mandate a rigorous 5-step process: Primer, two coats of Birla White putty, meticulous sanding, a second primer coat, and two coats of premium emulsion. Jotun Shield exteriors provide vital UV and anti-algal protection for tropical climates.",
    whyNotCheaper:
      "Skipping putty coats or using chalk-based putties results in peeling and visible undulations. Cheap exterior paints chalk and fade within 12 months.",
    tableData: [
      {
        brand: "Jotun Shield",
        gradeType: "100% Acrylic Exterior",
        keySpec: "Anti-Algal, UV Resistant",
        whyChoose: "Withstands Chennai's harsh sun and monsoon",
      },
      {
        brand: "Asian Paints",
        gradeType: "Royale Luxury Emulsion",
        keySpec: "Teflon Surface Protector",
        whyChoose: "Highly washable, luxurious sheen for interiors",
      },
    ],
  },
  {
    id: "08",
    category: "Flooring & Tiles",
    brands: "Kajaria, Somany, RAK Ceramics, imported Italian marble",
    description:
      "Vitrified tiles — water absorption < 0.5% (IS 15622). PEI rating IV-V for high-traffic areas. Anti-skid: R10-R11 rating for bathrooms/exteriors. Natural stone: minimum 18mm thickness, mirror polish for luxury interiors.",
    rationale:
      "We select double-charged vitrified tiles with ultra-low porosity (<0.5%) to prevent staining and moisture absorption. For wet areas, R10-R11 anti-skid ratings are strictly enforced. Natural stone is procured at a minimum 18mm thickness to ensure structural integrity during floor levelling and polishing.",
    whyNotCheaper:
      "Ceramic or single-charged tiles have high water absorption and their glaze wears off quickly. Thin natural stone cracks under point loads.",
    tableData: [
      {
        brand: "Kajaria / RAK",
        gradeType: "Double Charged Vitrified",
        keySpec: "Water absorption < 0.5%",
        whyChoose: "Stain resistant, highly durable for living spaces",
      },
      {
        brand: "Various",
        gradeType: "Anti-Skid (R10/R11)",
        keySpec: "High Coefficient of Friction",
        whyChoose: "Mandatory safety specification for bathrooms and balconies",
      },
    ],
  },
];

const MethodologySteps = [
  {
    step: "01",
    title: "Geotechnical Investigation",
    desc: "Standard Penetration Test (SPT) per IS 2131, soil bearing capacity assessment",
  },
  {
    step: "02",
    title: "Structural Design",
    desc: "IS 456:2000 for RCC, IS 1893 for seismic design, minimum factor of safety 1.5",
  },
  {
    step: "03",
    title: "Quality Assurance",
    desc: "Cube testing at 7/28 days per IS 516, slump cone test per IS 1199, rebar tensile testing",
  },
  {
    step: "04",
    title: "Execution Protocol",
    desc: "Cover block placement at 25-40mm clear cover, vibrator compaction, wet curing for minimum 14 days",
  },
];

export default function MaterialsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-[#1a1712] text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-[20vh] pb-[10vh] px-[6vw] max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6">
            Technical Excellence
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#e5ddcd]">
            Materials &<br />
            Engineering Specifications
          </h1>
          <p className="text-[#a39a8a] text-lg md:text-xl max-w-2xl font-light">
            Uncompromising quality mandated by IS codes and rigorous engineering protocols. We don&apos;t just build; we engineer longevity.
          </p>
        </Reveal>
      </section>

      {/* Engineering Methodology */}
      <section className="py-[10vh] px-[6vw] bg-[#221f18]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e5ddcd] mb-12">
              Our Engineering Methodology
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MethodologySteps.map((step, idx) => (
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
            Material Specifications
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
                            <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-white/50 mb-2">Approved Brands</h4>
                            <p className="text-[#e5ddcd]">{item.brands}</p>
                          </div>

                          <div className="mb-8">
                            <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-white/50 mb-2">Technical Specs</h4>
                            <p className="text-[#a39a8a] text-sm leading-relaxed">{item.description}</p>
                          </div>

                          {/* Comparison Table */}
                          <div className="overflow-x-auto mb-8">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">Brand</th>
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">Grade/Type</th>
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">Key Specification</th>
                                  <th className="py-3 px-4 text-[0.66rem] tracking-[0.2em] uppercase text-white/50 font-normal">Why We Choose It</th>
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
                              <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-[var(--color-bronze)] mb-3">Engineering Rationale</h4>
                              <p className="text-[#a39a8a] text-sm leading-relaxed">{item.rationale}</p>
                            </div>
                            <div className="bg-red-950/20 border border-red-900/30 p-5 rounded-sm">
                              <h4 className="text-[0.66rem] tracking-[0.2em] uppercase text-red-400 mb-3">Why Not Cheaper Alternatives?</h4>
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
