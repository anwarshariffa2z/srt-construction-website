import PortfolioClient from "./PortfolioClient";
import { getAllProjects } from "@/lib/portfolio";
import { Metadata } from "next";

export const revalidate = 86400; // Cache for 24 hours on the Edge

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of luxury architecture, commercial construction, and bespoke interior design projects across India.",
};

export default function PortfolioPage() {
  const projects = getAllProjects();
  return <PortfolioClient initialProjects={projects} />;
}
