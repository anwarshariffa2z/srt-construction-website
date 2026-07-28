import { Inter, Cormorant_Garamond } from "next/font/google";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatWidgetWrapper } from "@/components/ChatWidgetWrapper";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-screen relative bg-[var(--color-background)]">
        <SmoothScroll>
          <CustomCursor />
          <GrainOverlay />
          <Header />
          <AuthProvider>
            {children}
          </AuthProvider>
          <Footer locale="en" />
          <WhatsAppButton />
          <ChatWidgetWrapper />
        </SmoothScroll>
      </body>
    </html>
  );
}
