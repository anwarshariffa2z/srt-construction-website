"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const NAV_LINKS = [
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Materials", path: "/materials" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Consultation", path: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[5vw] py-6 mix-blend-difference text-white`}>
        <Link href="/" className="transition-opacity hover:opacity-80 relative z-[101]" onClick={() => setMobileMenuOpen(false)}>
          <Image 
            src="/assets/srt_logo.png" 
            alt="SRT Constructions Logo" 
            width={80} 
            height={30} 
            className="object-contain"
          />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 relative z-[101]">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path}
              href={link.path} 
              className={`text-sm tracking-[0.2em] uppercase transition-colors hover:text-[#c9a468] ${pathname === link.path ? 'text-[#c9a468]' : 'text-white/85'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden relative z-[101] w-8 h-8 flex flex-col justify-center items-center gap-[6px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span 
            className="w-full h-[2px] bg-white block"
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
          />
          <motion.span 
            className="w-full h-[2px] bg-white block"
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <motion.span 
            className="w-full h-[2px] bg-white block"
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-[#1a1712] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-4xl text-white hover:text-[#c9a468] transition-colors ${pathname === link.path ? 'text-[#c9a468]' : ''}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-center text-white/50 text-xs tracking-widest uppercase space-y-2"
            >
              <p>+91 8056880272</p>
              <p>tbasha.srtconstructions@gmail.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
