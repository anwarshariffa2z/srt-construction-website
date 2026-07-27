"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const currentLocale = pathname.startsWith("/ta") ? "ta" : "en";
  const nextLocale = currentLocale === "en" ? "ta" : "en";
  const label = currentLocale === "en" ? "தமிழ்" : "English";

  const toggleLanguage = () => {
    // Replace the current locale in the path with the next locale
    const newPath = pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    router.push(newPath || `/${nextLocale}`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-colors duration-300 z-50 relative bg-white/50 backdrop-blur-md"
    >
      {label}
    </motion.button>
  );
};
