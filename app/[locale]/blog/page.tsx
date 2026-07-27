/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { getAllPosts } from "@/lib/sanity";
import { format } from "date-fns";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata = {
  title: "Blog | SRT Constructions",
  description: "Expert insights on construction, architecture, materials, and building in Chennai and Tamil Nadu.",
};

export default async function BlogListing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-[25vh] pb-[15vh] px-[6vw]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-[0.66rem] tracking-[0.34em] uppercase text-[var(--color-bronze)] mb-6 text-center">
          {dict.blog.eyebrow}
        </div>
        <h1 className="font-serif text-[clamp(3rem,6vw,5rem)] text-[var(--color-foreground)] font-light leading-[1.05] mb-6 text-center">
          {dict.blog.headline}
        </h1>
        <p className="text-center text-[var(--color-foreground-soft)] mb-20 max-w-[50ch] mx-auto">
          {dict.blog.desc}
        </p>

        {posts.length === 0 ? (
          <div className="text-center text-[var(--color-foreground-soft)] py-20">
            <p className="font-serif text-2xl mb-4">{dict.blog.comingSoon}</p>
            <p>{dict.blog.comingSoonDesc}</p>
          </div>
        ) : (
          <div className="flex flex-col border-t border-[var(--color-stone)]">
            {posts.map((post: any) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-[var(--color-stone)] hover:bg-[var(--color-stone)]/30 transition-colors px-4 -mx-4 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[0.65rem] tracking-widest uppercase text-[var(--color-bronze)]">
                      {post.publishedAt ? format(new Date(post.publishedAt), "dd MMM yyyy") : ""}
                    </span>
                    <span className="text-[var(--color-foreground-soft)] text-xs">•</span>
                    <span className="text-xs text-[var(--color-foreground-soft)]">{post.readingTime}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-foreground)] group-hover:text-[var(--color-bronze)] transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--color-foreground-soft)] max-w-[55ch] leading-relaxed">
                    {post.excerpt}
                  </p>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {post.categories.map((category: string) => (
                        <span key={category} className="text-[0.6rem] uppercase tracking-widest text-[var(--color-bronze-deep)] bg-[var(--color-stone)] px-3 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-[var(--color-foreground-soft)] group-hover:text-[var(--color-bronze)] transition-colors text-2xl ml-8">
                  →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
