/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  if (slugs.length === 0) return [{ slug: "coming-soon" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | SRT Constructions Blog`,
    description: post.excerpt,
  };
}

const portableTextComponents = {
  block: {
    h1: ({children}: any) => <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-foreground)] mb-8 mt-16 leading-tight">{children}</h1>,
    h2: ({children}: any) => <h2 className="font-serif text-3xl text-[var(--color-foreground)] mb-6 mt-14 leading-tight">{children}</h2>,
    h3: ({children}: any) => <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4 mt-10">{children}</h3>,
    normal: ({children}: any) => <p className="text-[1.1rem] text-[var(--color-foreground-soft)] leading-relaxed mb-6">{children}</p>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-[var(--color-bronze)] pl-6 py-2 my-8 italic text-[var(--color-foreground-soft)] bg-[var(--color-stone)]/30 rounded-r-lg pr-4">{children}</blockquote>,
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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SRT Constructions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://srtconstructions.in/logo.png"
      }
    },
    "description": post.excerpt
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[22vh] pb-[15vh] px-[6vw]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[750px] mx-auto">
        {/* Back link */}
        <Link href="/blog" className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-bronze)] hover:text-[var(--color-bronze-deep)] transition-colors mb-12 inline-block">
          ← Back to Journal
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[0.65rem] tracking-widest uppercase text-[var(--color-bronze)]">
              {post.publishedAt ? format(new Date(post.publishedAt), "dd MMMM yyyy") : ""}
            </span>
            <span className="text-[var(--color-foreground-soft)] text-xs">•</span>
            <span className="text-xs text-[var(--color-foreground-soft)]">5 min read</span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-foreground)] font-light leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--color-foreground-soft)] leading-relaxed">
            {post.excerpt}
          </p>
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mt-6">
              {post.categories.map((category: string) => (
                <span key={category} className="text-[0.6rem] uppercase tracking-widest text-[var(--color-bronze-deep)] bg-[var(--color-stone)] px-3 py-1 rounded-full">
                  {category}
                </span>
              ))}
            </div>
          )}
          <hr className="border-[var(--color-stone)] mt-10" />
        </header>

        {/* Portable Text Content */}
        <div className="prose-custom">
          {post.body && <PortableText value={post.body} components={portableTextComponents} />}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-12 border-t border-[var(--color-stone)] text-center">
          <p className="font-serif text-2xl text-[var(--color-foreground)] mb-4">Have Questions?</p>
          <p className="text-[var(--color-foreground-soft)] mb-8">Our architects and engineers are ready to discuss your project.</p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 bg-[var(--color-bronze)] text-white uppercase tracking-[0.2em] text-xs hover:bg-[var(--color-bronze-deep)] transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </article>
    </main>
  );
}
