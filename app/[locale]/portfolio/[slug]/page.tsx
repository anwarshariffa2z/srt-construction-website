/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjectBySlug, getAllProjectSlugs, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MagneticButton } from "@/components/MagneticButton";
import { ModelViewerWrapper } from "@/components/3d/ModelViewerWrapper";
import { DownloadBrochureButton } from "@/components/DownloadBrochureButton";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  if (slugs.length === 0) return [{ slug: "coming-soon" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | SRT Constructions Case Study`,
    description: project.excerpt,
  };
}

const portableTextComponents = {
  block: {
    h2: ({children}: any) => <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-foreground)] mb-6 mt-16 leading-tight">{children}</h2>,
    h3: ({children}: any) => <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4 mt-10">{children}</h3>,
    normal: ({children}: any) => <p className="text-lg md:text-[1.1rem] text-[var(--color-foreground-soft)] leading-relaxed mb-6">{children}</p>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-[var(--color-bronze)] pl-6 py-2 my-8 italic text-xl text-[var(--color-foreground-soft)] font-light">{children}</blockquote>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-foreground-soft)]">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[var(--color-foreground-soft)]">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li className="text-[1.05rem] leading-relaxed">{children}</li>,
    number: ({children}: any) => <li className="text-[1.05rem] leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({children}: any) => <strong className="text-[var(--color-foreground)] font-semibold">{children}</strong>,
    link: ({value, children}: any) => <a href={value?.href} className="text-[var(--color-bronze)] underline underline-offset-4 hover:text-[var(--color-bronze-deep)] transition-colors">{children}</a>,
  }
};

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) notFound();

  const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : "/assets/projects/srt_project_exterior_1_1785080126114.jpg";

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      
      {/* Immersive Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end pb-[10vh] px-[6vw]">
        <div className="absolute inset-0 z-0">
          {imageUrl && (
            <ParallaxImage 
              src={imageUrl}
              alt={project.title}
              priority
              className="w-full h-full"
              offset={100}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-stone-dark)] via-[var(--color-stone-dark)]/60 to-black/70 z-10 pointer-events-none" />
        </div>
        
        <div className="relative z-20 w-full max-w-[1200px] mx-auto">
          <Link href="/portfolio" className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-bronze)] hover:text-white transition-colors mb-8 inline-block">
            &larr; Back to Portfolio
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-[800px]">
              <span className="text-sm font-mono text-[var(--color-bronze)] mb-4 block">Case Study</span>
              <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] text-white font-light leading-[1.1] mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-white/70 max-w-2xl font-light">
                {project.excerpt}
              </p>
            </div>
            <div className="shrink-0">
              <DownloadBrochureButton project={{...project, image: imageUrl}} />
            </div>
          </div>
        </div>
      </section>

      {/* Project Metadata Grid */}
      <section className="px-[6vw] py-12 border-b border-[var(--color-stone)]/30 bg-[var(--color-stone-dark)] relative z-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40">Location</span>
            <span className="text-sm md:text-base text-white/90">{project.location}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40">Category</span>
            <span className="text-sm md:text-base text-white/90">{project.category}</span>
          </div>
          {project.timeline && (
            <div className="flex flex-col gap-2">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40">Timeline</span>
              <span className="text-sm md:text-base text-white/90">{project.timeline}</span>
            </div>
          )}
          {project.client && (
            <div className="flex flex-col gap-2">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40">Client</span>
              <span className="text-sm md:text-base text-white/90">{project.client}</span>
            </div>
          )}
        </div>
      </section>

      <section className="px-[6vw] py-[15vh] relative z-20">
        <div className="max-w-[1200px] mx-auto mb-[10vh]">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-foreground)] mb-6 text-center">Interactive 3D Blueprint</h2>
          <ModelViewerWrapper />
        </div>
        <article className="max-w-[800px] mx-auto prose-custom">
          {project.body && <PortableText value={project.body} components={portableTextComponents} />}
        </article>
      </section>

      {/* Next Project / CTA */}
      <section className="px-[6vw] py-[15vh] border-t border-[var(--color-stone)]/30 text-center bg-[var(--color-stone-dark)] relative z-20">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl text-white mb-6">Build Your Vision With Us</h2>
          <p className="text-white/60 mb-10 text-lg">
            Ready to bring an uncompromising level of engineering and design to your next project?
          </p>
          <Link href="/contact" className="inline-block">
            <MagneticButton>
              Start a Conversation
            </MagneticButton>
          </Link>
        </div>
      </section>

    </main>
  );
}
