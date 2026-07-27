"use client";

import Script from "next/script";

export function JsonLd() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "SRT Constructions",
    "image": "https://srtconstructions.in/assets/srt_logo.png",
    "@id": "https://srtconstructions.in",
    "url": "https://srtconstructions.in",
    "telephone": "+918056880272",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No: 119/A Karunanidhi Beach Road, Palkalai Nagar, Palavakkam",
      "addressLocality": "Chennai",
      "postalCode": "600041",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9644,
      "longitude": 80.2589
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/srt-constructions",
      "https://www.instagram.com/srt_constructions"
    ],
    "priceRange": "₹₹₹",
    "description": "Premium luxury architecture, commercial construction, and bespoke interior design firm based in Chennai, Tamil Nadu."
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      strategy="afterInteractive"
    />
  );
}
