import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SRT Constructions | Build Beyond",
  description: "Commercial, Industrial, and Luxury Residential Construction designed, engineered, and built by one team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://srtconstructions.in/#website",
        "url": "https://srtconstructions.in/",
        "name": "SRT Constructions",
        "description": "Commercial, Industrial, and Luxury Residential Construction designed, engineered, and built by one team in Chennai.",
        "publisher": {
          "@id": "https://srtconstructions.in/#organization"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://srtconstructions.in/#organization",
        "name": "SRT Constructions",
        "url": "https://srtconstructions.in/",
        "logo": "https://srtconstructions.in/logo.png",
        "image": "https://srtconstructions.in/logo.png",
        "description": "A premier construction and architecture firm based in Chennai, Tamil Nadu, specializing in residential, commercial, and industrial turnkey projects.",
        "telephone": "+91-9876543210", 
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "OMR, Rajiv Gandhi Salai",
          "addressLocality": "Chennai",
          "addressRegion": "TN",
          "postalCode": "600097",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 12.9171,
          "longitude": 80.2300
        },
        "areaServed": "Chennai Metropolitan Area",
        "sameAs": [
          "https://www.linkedin.com/company/srt-constructions",
          "https://www.facebook.com/srtconstructions"
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen relative bg-[var(--color-background)]">
        <CustomCursor />
        <GrainOverlay />
        <Header />
        
        {children}
        
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
