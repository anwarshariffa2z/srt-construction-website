/* eslint-disable @typescript-eslint/no-explicit-any */
import PortfolioClient from "./PortfolioClient";
import { getAllProjects, urlFor } from "@/lib/sanity";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of luxury architecture, commercial construction, and bespoke interior design projects across India.",
};

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const projectsRaw = await getAllProjects();
  
  // Map mainImage to a string image property so client component can use it
  const projects = projectsRaw.map((p: any) => ({
    ...p,
    image: p.mainImage ? urlFor(p.mainImage).url() : "/assets/projects/srt_project_exterior_1_1785080126114.jpg"
  }));
  return <PortfolioClient initialProjects={projects} dict={dict} locale={locale} />;
}
