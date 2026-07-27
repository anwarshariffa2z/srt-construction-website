import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";



export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | SRT Constructions Blog`,
    description: post.excerpt,
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-foreground)] mb-8 mt-16 leading-tight" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="font-serif text-3xl text-[var(--color-foreground)] mb-6 mt-14 leading-tight" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="font-serif text-2xl text-[var(--color-foreground)] mb-4 mt-10" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-[1.1rem] text-[var(--color-foreground-soft)] leading-relaxed mb-6" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-foreground-soft)]" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[var(--color-foreground-soft)]" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-[1.05rem] leading-relaxed" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-[var(--color-bronze)] pl-6 py-2 my-8 italic text-[var(--color-foreground-soft)] bg-[var(--color-stone)]/30 rounded-r-lg pr-4" {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => <div className="overflow-x-auto mb-8"><table className="w-full text-sm border-collapse" {...props} /></div>,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th className="text-left py-3 px-4 bg-[var(--color-stone)] text-[var(--color-foreground)] font-semibold border-b border-[var(--color-stone)]" {...props} />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td className="py-3 px-4 border-b border-[var(--color-stone)] text-[var(--color-foreground-soft)]" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="text-[var(--color-foreground)] font-semibold" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-[var(--color-bronze)] underline underline-offset-4 hover:text-[var(--color-bronze-deep)] transition-colors" {...props} />,
  hr: () => <hr className="border-[var(--color-stone)] my-12" />,
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.publishDate,
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
              {format(new Date(post.publishDate), "dd MMMM yyyy")}
            </span>
            <span className="text-[var(--color-foreground-soft)] text-xs">•</span>
            <span className="text-xs text-[var(--color-foreground-soft)]">{post.readingTime}</span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-foreground)] font-light leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--color-foreground-soft)] leading-relaxed">
            {post.excerpt}
          </p>
          {post.tags.length > 0 && (
            <div className="flex gap-2 mt-6">
              {post.tags.map(tag => (
                <span key={tag} className="text-[0.6rem] uppercase tracking-widest text-[var(--color-bronze-deep)] bg-[var(--color-stone)] px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <hr className="border-[var(--color-stone)] mt-10" />
        </header>

        {/* MDX Content */}
        <div className="prose-custom">
          <MDXRemote source={post.content} components={mdxComponents} />
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
