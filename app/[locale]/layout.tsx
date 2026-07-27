import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";
import { Preloader } from "@/components/Preloader";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatWidgetWrapper } from "@/components/ChatWidgetWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import "../globals.css";

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
  metadataBase: new URL('https://srtconstructions.in'),
  title: {
    default: "SRT Constructions | Premium Builders in Chennai",
    template: "%s | SRT Constructions",
  },
  description: "Commercial, Industrial, and Luxury Residential Construction designed, engineered, and built by one team in Chennai, Tamil Nadu.",
  openGraph: {
    title: "SRT Constructions | Premium Builders in Chennai",
    description: "Commercial, Industrial, and Luxury Residential Construction designed, engineered, and built by one team in Chennai, Tamil Nadu.",
    url: 'https://srtconstructions.in',
    siteName: 'SRT Constructions',
    images: [
      {
        url: '/assets/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'SRT Constructions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRT Constructions | Premium Builders',
    description: 'Commercial, Industrial, and Luxury Residential Construction designed, engineered, and built by one team.',
    images: ['/assets/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ta' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
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
    <html lang={locale} className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen relative bg-[var(--color-background)]">
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <GrainOverlay />
          <Header />
          
          {children}
          
          <Footer locale={locale} />
          <WhatsAppButton />
          <ChatWidgetWrapper />
        </SmoothScroll>

        <JsonLd />
        {/* Cloudflare Web Analytics (Placeholder Token) */}
        <Script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_CLOUDFLARE_ANALYTICS_TOKEN_HERE"}' strategy="afterInteractive" />
      </body>
    </html>
  );
}
