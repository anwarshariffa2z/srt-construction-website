"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getDictionary, Locale } from "@/i18n/dictionaries";

export function Header() {
  const pathname = usePathname();
  const currentLocale = (pathname.startsWith("/ta") ? "ta" : "en") as Locale;
  const dict = getDictionary(currentLocale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { name: dict.nav.portfolio, path: `/${currentLocale}/portfolio` },
    { name: dict.nav.about, path: `/${currentLocale}/about` },
    { name: dict.nav.services, path: `/${currentLocale}/services` },
    { name: dict.nav.materials, path: `/${currentLocale}/materials` },
    { name: dict.nav.faq, path: `/${currentLocale}/faq` },
    { name: dict.nav.blog, path: `/${currentLocale}/blog` },
    { name: dict.nav.contact, path: `/${currentLocale}/contact` },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[5vw] transition-all duration-300 py-6`}>
        <Link 
          href={`/${currentLocale}`} 
          className="transition-opacity hover:opacity-80 relative z-[101]" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image 
            src="/assets/srt_logo.png" 
            alt="SRT Constructions Logo" 
            width={90} 
            height={34} 
            className="object-contain"
          />
        </Link>
        
        {/* Desktop Nav */}
        <div className={`hidden md:flex gap-10 items-center relative z-[101] transition-colors duration-300 ${scrolled ? 'text-[var(--color-foreground)]' : 'text-white'}`}>
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path}
              href={link.path} 
              className={`text-sm tracking-[0.2em] uppercase transition-colors hover:text-[var(--color-bronze)] ${pathname === link.path ? 'text-[var(--color-bronze)]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden relative z-[101] w-8 h-8 flex flex-col justify-center items-center gap-[6px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span 
            className={`w-full h-[2px] block transition-colors duration-300 ${mobileMenuOpen ? 'bg-white' : (scrolled ? 'bg-[var(--color-foreground)]' : 'bg-white')}`}
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
          />
          <motion.span 
            className={`w-full h-[2px] block transition-colors duration-300 ${mobileMenuOpen ? 'bg-white' : (scrolled ? 'bg-[var(--color-foreground)]' : 'bg-white')}`}
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <motion.span 
            className={`w-full h-[2px] block transition-colors duration-300 ${mobileMenuOpen ? 'bg-white' : (scrolled ? 'bg-[var(--color-foreground)]' : 'bg-white')}`}
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
