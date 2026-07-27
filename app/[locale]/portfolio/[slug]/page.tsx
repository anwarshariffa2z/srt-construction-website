import { getProjectBySlug, getAllProjectSlugs } from "@/lib/portfolio";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MagneticButton } from "@/components/MagneticButton";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | SRT Constructions Case Study`,
    description: project.excerpt,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-foreground)] mb-6 mt-16 leading-tight" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4 mt-10" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-lg md:text-[1.1rem] text-[var(--color-foreground-soft)] leading-relaxed mb-6" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-foreground-soft)]" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[var(--color-foreground-soft)]" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-[1.05rem] leading-relaxed" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-[var(--color-bronze)] pl-6 py-2 my-8 italic text-xl text-[var(--color-foreground-soft)] font-light" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="text-[var(--color-foreground)] font-semibold" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-[var(--color-bronze)] underline underline-offset-4 hover:text-[var(--color-bronze-deep)] transition-colors" {...props} />,
  hr: () => <hr className="border-[var(--color-stone)]/30 my-12" />,
};

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      
      {/* Immersive Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end pb-[10vh] px-[6vw]">
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src={project.image}
            alt={project.title}
            priority
            className="w-full h-full"
            offset={100}
          />
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
        <article className="max-w-[800px] mx-auto prose-custom">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ReactMarkdown components={mdxComponents as any}>{project.content}</ReactMarkdown>
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
