/* eslint-disable @typescript-eslint/no-explicit-any */
import PortfolioClient from "./PortfolioClient";
import { getAllProjects, urlFor } from "@/lib/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of luxury architecture, commercial construction, and bespoke interior design projects across India.",
};

export default async function PortfolioPage() {
  const projectsRaw = await getAllProjects();
  // Map mainImage to a string image property so client component can use it
  const projects = projectsRaw.map((p: any) => ({
    ...p,
    image: p.mainImage ? urlFor(p.mainImage).url() : (p.image || "")
  }));
  return <PortfolioClient initialProjects={projects} />;
}
