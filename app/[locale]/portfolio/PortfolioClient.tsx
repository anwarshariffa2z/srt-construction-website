/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  client?: string;
  timeline?: string;
  value?: string;
  mainImage?: any;
  image?: string;
  excerpt: string;
  completionDate: string;
  body?: any;
}
export default function PortfolioClient({ initialProjects, dict }: { initialProjects: Project[], dict: any }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Group by category or just list them. We'll list them all for now.
  const projects = initialProjects;

  return (
    <main className="min-h-screen bg-[var(--color-stone-dark)] pt-[25vh] pb-[20vh] px-[6vw]">
      
      {/* Background Hover Image Reveal */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence>
          {hoveredProject !== null && (
            <motion.div
              key={hoveredProject}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={projects.find(p => p.slug === hoveredProject)?.image || ""}
                alt="Project background"
                fill
                priority
                className="object-cover saturate-50"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-stone-dark)] via-[var(--color-stone-dark)]/90 to-[var(--color-stone-dark)]/40" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <Reveal>
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6">{dict.portfolio.eyebrow}</div>
          <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] text-white font-light tracking-wide mb-24">
            {dict.portfolio.headline}
          </h1>
        </Reveal>

        {/* Interactive Accordion List */}
        <div className="flex flex-col border-t border-white/20">
          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.slug;

            return (
              <Reveal key={project.slug} delay={index * 0.05}>
                <div 
                  className="group flex flex-col py-8 border-b border-white/20 cursor-pointer transition-colors hover:border-[#c9a468]"
                  onMouseEnter={() => !isExpanded && setHoveredProject(project.slug)}
                  onMouseLeave={() => !isExpanded && setHoveredProject(null)}
                  onClick={() => {
                    setExpandedProject(isExpanded ? null : project.slug);
                    setHoveredProject(isExpanded ? null : project.slug);
                  }}
                >
                  
                  {/* Row Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-4">
                        <span className={`text-sm font-mono transition-colors duration-500 ${isExpanded ? 'text-[#c9a468]' : 'text-white/30 group-hover:text-[#c9a468]'}`}>
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <h2 className={`font-serif text-[clamp(1.5rem,3vw,3rem)] transition-colors duration-500 ${isExpanded ? 'text-[#c9a468]' : 'text-white group-hover:text-[#c9a468]'}`}>
                          {project.title}
                        </h2>
                      </div>
                      <div className={`text-[#c9a468] text-sm mt-2 ml-[2.2rem] font-light tracking-wide transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {project.category}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4 md:mt-0 ml-[2.2rem] md:ml-0">
                      <div className="text-[0.65rem] tracking-[0.25em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-500">
                        {project.location}
                      </div>
                      {/* Plus/Minus Icon */}
                      <div className="relative w-4 h-4 hidden md:block">
                        <motion.span 
                          className="absolute inset-0 top-1/2 h-px bg-white group-hover:bg-[#c9a468]" 
                          animate={{ rotate: isExpanded ? 180 : 0 }} 
                        />
                        <motion.span 
                          className="absolute inset-0 left-1/2 w-px bg-white group-hover:bg-[#c9a468]" 
                          animate={{ rotate: isExpanded ? 90 : 0, opacity: isExpanded ? 0 : 1 }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden ml-[2.2rem]"
                      >
                        <div className="pt-10 pb-4 flex flex-col md:flex-row gap-12">
                          {/* Details */}
                          <div className="w-full md:w-1/3 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-white/40 mb-4">{dict.portfolio.overview}</h4>
                                <p className="text-[1.05rem] text-white/80 leading-relaxed font-light mb-8">
                                {project.excerpt}
                                </p>
                            </div>
                            <Link 
                                href={`/portfolio/${project.slug}`}
                                className="inline-block px-6 py-3 border border-white/30 text-white text-[0.65rem] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors w-max"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {dict.portfolio.viewCaseStudy}
                            </Link>
                          </div>
                          {/* Image */}
                          <div className="w-full md:w-2/3">
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20 group">
                              <Image 
                                src={project.image || ""}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                              />
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

      </div>
    </main>
  );
}
