export const dictionaries = {
  en: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      materials: "Materials",
      about: "About",
      blog: "Blog",
      contact: "Get in Touch",
      faq: "FAQ",
    },
    hero: {
      headline: "Building Legacies in Concrete & Steel",
      subheadline: "Premium commercial and luxury residential construction designed, engineered, and built by one team.",
      cta: "Schedule a Consultation",
    },
    footer: {
      rights: "All rights reserved.",
      address: "Chennai, Tamil Nadu",
    },
  },
  ta: {
    nav: {
      services: "சேவைகள்",
      portfolio: "திட்டங்கள்",
      materials: "பொருட்கள்",
      about: "எங்களை பற்றி",
      blog: "வலைப்பதிவு",
      contact: "தொடர்பு கொள்ள",
      faq: "கேள்விகள்",
    },
    hero: {
      headline: "கான்கிரீட் மற்றும் ஸ்டீல் மூலம் பாரம்பரியங்களை உருவாக்குகிறோம்",
      subheadline: "உயர்தர வணிக மற்றும் சொகுசு குடியிருப்பு கட்டுமானம் வடிவமைக்கப்பட்டு, பொறியியல் ரீதியாக சிறந்து, ஒரு குழுவால் கட்டப்படுகிறது.",
      cta: "ஆலோசனைக்கு அழைக்கவும்",
    },
    footer: {
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      address: "சென்னை, தமிழ்நாடு",
    },
  },
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: string) => {
  return dictionaries[locale as Locale] ?? dictionaries.en;
};
