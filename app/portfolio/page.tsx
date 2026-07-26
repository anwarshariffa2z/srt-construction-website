"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const PROJECTS = [
  // HERO PROJECTS (AI rendered realistic photos)
  { 
    id: 1, 
    title: "Palavakkam Residence", 
    category: "Luxury Architecture", 
    location: "Chennai, Tamil Nadu", 
    image: "/assets/projects/srt_real_project_1_1785082142072.jpg",
    details: "A stunning architectural marvel focusing on natural light and structural integrity. The client requested a blend of modern minimalism and traditional Vastu compliance. We utilized Tata Tiscon steel for the core framework and finished the exterior with weather-resistant Jotun paints to withstand the coastal Chennai climate."
  },
  { 
    id: 2, 
    title: "Eco-Industrial Complex", 
    category: "Commercial Contracting", 
    location: "Sriperumbudur", 
    image: "/assets/projects/srt_real_project_2_1785082154617.jpg",
    details: "A massive industrial contracting project built on an aggressive 14-month timeline. We mobilized significant resources, deploying our own heavy machinery to deliver a state-of-the-art facility. The foundation required deep soil stabilization, and we used high-grade UltraTech cement for the heavy load-bearing structural engineering."
  },
  { 
    id: 3, 
    title: "The Horizon Hub", 
    category: "Architecture & Construction", 
    location: "Mumbai CBD", 
    image: "/assets/projects/srt_project_commercial_1_1785080152919.jpg",
    details: "A multi-story commercial hub blending glass and steel into a timeless aesthetic. The challenge here was executing deep basement excavation in a high-density urban zone. Our architecture and construction divisions worked seamlessly to eliminate standard industry friction, resulting in a flawless, zero-accident execution."
  },
  { 
    id: 4, 
    title: "Aura Penthouse", 
    category: "Luxury Interiors", 
    location: "Pune, Maharashtra", 
    image: "/assets/projects/srt_project_interior_1_1785080139818.jpg",
    details: "An interior fit-out project where every material was meticulously sourced and installed. We focused on bespoke joinery using premium Greenply, accented with custom lighting fixtures from Legrand. The spatial finishes are in perfect harmony with the exterior shell, creating a sanctuary above the city."
  },

  // ORIGINAL EXTRACTED PROJECTS
  { 
    id: 5, 
    title: "Gated Community Villas", 
    category: "Turnkey Architecture", 
    location: "OMR, Chennai", 
    image: "/assets/projects/all/image4.jpeg",
    details: "A sprawling residential project comprising multiple luxury villas. We handled everything from DTCP approvals to the final coat of Asian Paints Royale. The project features concealed Polycab wiring and heavy-duty Ashirvad plumbing, ensuring decades of maintenance-free living for the residents."
  },
  { 
    id: 6, 
    title: "Tech Park Block C", 
    category: "Commercial Civil Execution", 
    location: "Guindy", 
    image: "/assets/projects/all/image11.jpeg",
    details: "Appointed as the primary civil contractor, we executed the complete concrete superstructure for this IT block. Utilizing Ramco Supergrade cement and advanced slip-form shuttering techniques, we achieved a floor cycle time that beat the client's aggressive deadlines."
  },
  { 
    id: 7, 
    title: "Khandala Retreat", 
    category: "Bespoke Architecture", 
    location: "Khandala", 
    image: "/assets/projects/all/image17.jpeg",
    details: "A weekend retreat built on sloped terrain. The structural engineering required extensive retaining walls and micro-piling. We seamlessly integrated the built form with the natural topography, using locally sourced laterite stone and heavy-gauge ARS 550D steel for seismic resilience."
  },
  { 
    id: 8, 
    title: "Corporate HQ Interiors", 
    category: "Commercial Interiors", 
    location: "T-Nagar, Chennai", 
    image: "/assets/projects/all/image22.jpeg",
    details: "A 20,000 sq ft office fit-out requiring sophisticated MEP integration. We installed specialized HVAC ducting alongside exposed concrete ceilings for an industrial-chic aesthetic, pairing it with high-end Kajaria ceramics and acoustic paneling for a productive workspace."
  },
  { 
    id: 9, 
    title: "Healthcare Facility", 
    category: "Institutional Contracting", 
    location: "Vellore", 
    image: "/assets/projects/all/image36.png",
    details: "Building a hospital requires absolute precision in MEP and sanitation. We strictly utilized V-Guard and Supreme CPVC pipes for critical medical gas and water lines. The sterile environment was finished with specialized anti-bacterial epoxy flooring and hygienic wall cladding."
  },
  { 
    id: 10, 
    title: "Luxury Duplex", 
    category: "Residential Architecture", 
    location: "ECR, Chennai", 
    image: "/assets/projects/all/image45.png",
    details: "A sea-facing duplex that demanded robust weatherproofing. We employed advanced waterproofing compounds mixed with Dalmia DSP cement to protect against salt-laden coastal winds, while large floor-to-ceiling UPVC windows maximize the ocean views."
  },
  { 
    id: 11, 
    title: "Logistics Warehouse", 
    category: "Industrial Construction", 
    location: "Oragadam", 
    image: "/assets/projects/all/image48.png",
    details: "A massive 1 Lakh sq ft warehouse featuring pre-engineered building (PEB) steel structures. Our scope included laying ultra-flat FM2 grade concrete floors capable of withstanding heavy forklift traffic, completed 3 weeks ahead of schedule."
  },
  { 
    id: 12, 
    title: "Boutique Retail Outlet", 
    category: "Turnkey Interiors", 
    location: "Anna Nagar", 
    image: "/assets/projects/all/image50.png",
    details: "A high-end retail execution requiring fast-track interior work. We managed rapid procurement of bespoke lighting, false ceilings, and premium imported marble flooring, coordinating multiple vendor schedules to ensure the store launched exactly on opening day."
  }
];

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

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
                src={PROJECTS.find(p => p.id === hoveredProject)?.image || ""}
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
          <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[#c9a468] mb-6">Portfolio</div>
          <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] text-white font-light tracking-wide mb-24">
            Selected Works
          </h1>
        </Reveal>

        {/* Interactive Accordion List */}
        <div className="flex flex-col border-t border-white/20">
          {PROJECTS.map((project, index) => {
            const isExpanded = expandedProject === project.id;

            return (
              <Reveal key={project.id} delay={index * 0.05}>
                <div 
                  className="group flex flex-col py-8 border-b border-white/20 cursor-pointer transition-colors hover:border-[#c9a468]"
                  onMouseEnter={() => !isExpanded && setHoveredProject(project.id)}
                  onMouseLeave={() => !isExpanded && setHoveredProject(null)}
                  onClick={() => {
                    setExpandedProject(isExpanded ? null : project.id);
                    setHoveredProject(isExpanded ? null : project.id);
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
                          <div className="w-full md:w-1/3">
                            <h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-white/40 mb-4">Project Story</h4>
                            <p className="text-[1.05rem] text-white/80 leading-relaxed font-light">
                              {project.details}
                            </p>
                          </div>
                          {/* Image */}
                          <div className="w-full md:w-2/3">
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20">
                              <Image 
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
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
