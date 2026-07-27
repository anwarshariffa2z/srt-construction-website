import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PORTFOLIO_DIR = path.join(process.cwd(), 'content', 'portfolio');

export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  client?: string;
  timeline?: string;
  value?: string;
  image: string;
  excerpt: string;
  completionDate: string;
  content: string;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PORTFOLIO_DIR)) return [];
  
  const files = fs.readdirSync(PORTFOLIO_DIR).filter(f => f.endsWith('.mdx'));

  const projects = files
    .map((filename) => {
      const filePath = path.join(PORTFOLIO_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || 'Untitled',
        category: data.category || 'Architecture',
        location: data.location || 'Chennai',
        client: data.client || undefined,
        timeline: data.timeline || undefined,
        value: data.value || undefined,
        image: data.image || '',
        excerpt: data.excerpt || '',
        completionDate: data.completionDate || '',
        content,
      };
    })
    // Sort by completionDate descending (newest first)
    .sort((a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime());

  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PORTFOLIO_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    category: data.category || 'Architecture',
    location: data.location || 'Chennai',
    client: data.client || undefined,
    timeline: data.timeline || undefined,
    value: data.value || undefined,
    image: data.image || '',
    excerpt: data.excerpt || '',
    completionDate: data.completionDate || '',
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PORTFOLIO_DIR)) return [];
  return fs.readdirSync(PORTFOLIO_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}
