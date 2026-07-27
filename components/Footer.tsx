import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/dictionaries";

export function Footer({ locale }: { locale: string }) {
  const dict = getDictionary(locale as Locale);

  return (
    <footer className="bg-[#1a1712] text-white/80 py-16 px-[6vw] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Image 
            src="/assets/srt_logo.png" 
            alt="SRT Constructions" 
            width={100} 
            height={40} 
            className="object-contain"
          />
          <p className="text-sm text-white/60 leading-relaxed max-w-[30ch]">
            Architecture, Construction, Interiors, and Contracting. One Unified Vision. Built for Tamil Nadu.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-serif text-xl text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href={`/${locale}`} className="hover:text-[#c9a468] transition-colors">Home</Link></li>
            <li><Link href={`/${locale}/portfolio`} className="hover:text-[#c9a468] transition-colors">{dict.nav.portfolio}</Link></li>
            <li><Link href={`/${locale}/services`} className="hover:text-[#c9a468] transition-colors">{dict.nav.services}</Link></li>
            <li><Link href={`/${locale}/materials`} className="hover:text-[#c9a468] transition-colors">{dict.nav.materials}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-[#c9a468] transition-colors">{dict.nav.about}</Link></li>
            <li><Link href={`/${locale}/faq`} className="hover:text-[#c9a468] transition-colors">{dict.nav.faq}</Link></li>
            <li><Link href={`/${locale}/blog`} className="hover:text-[#c9a468] transition-colors">{dict.nav.blog}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-xl text-white mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <span className="block text-white/40 uppercase tracking-widest text-[0.65rem] mb-1">Phone</span>
              <a href="tel:+918056880272" className="hover:text-[#c9a468] transition-colors">+91 8056880272</a>
            </li>
            <li>
              <span className="block text-white/40 uppercase tracking-widest text-[0.65rem] mb-1">Email</span>
              <a href="mailto:tbasha.srtconstructions@gmail.com" className="hover:text-[#c9a468] transition-colors">tbasha.srtconstructions@gmail.com</a>
            </li>
            <li>
              <span className="block text-white/40 uppercase tracking-widest text-[0.65rem] mb-1">Address</span>
              <p>No: 119/A Karunanidhi Beach Road, <br/>Palkalai Nagar, Palavakkam <br/>Chennai - 600041</p>
            </li>
          </ul>
        </div>

        {/* Social / Legal */}
        <div>
          <h4 className="font-serif text-xl text-white mb-6">Legal & Social</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#c9a468] transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[#c9a468] transition-colors">Instagram</a></li>
            <li className="pt-4 mt-4 border-t border-white/10 text-xs text-white/40">
              RERA Reg: TN/##/Building/####/2026
            </li>
            <li className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} SRT Constructions. <br/>{dict.footer.rights}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
