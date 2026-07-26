import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  publishDate: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
  coverImage?: string;
  author?: string;
}

export function getAllPublishedPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  const today = new Date();

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || 'Untitled',
        publishDate: data.publishDate || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        readingTime: readingTime(content).text,
        content,
        coverImage: data.coverImage || undefined,
        author: data.author || 'SRT Constructions',
      };
    })
    .filter(post => {
      // Only show posts where publishDate <= today
      if (!post.publishDate) return false;
      return new Date(post.publishDate) <= today;
    })
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    publishDate: data.publishDate || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    readingTime: readingTime(content).text,
    content,
    coverImage: data.coverImage || undefined,
    author: data.author || 'SRT Constructions',
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}
