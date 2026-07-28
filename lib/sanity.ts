/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getAllPosts() {
  if (projectId === 'your-project-id') return [];
  const query = `*[_type == 'post'] | order(publishedAt desc) { _id, title, "slug": slug.current, excerpt, publishedAt, "author": author->name, mainImage, "categories": categories[]->title, body }`;
  try { return await client.fetch(query); } catch (e) { return []; }
}

export async function getPostBySlug(slug: string) {
  if (projectId === 'your-project-id') return null;
  const query = `*[_type == 'post' && slug.current == $slug][0] { _id, title, "slug": slug.current, excerpt, publishedAt, "author": author->name, mainImage, "categories": categories[]->title, body }`;
  try { return await client.fetch(query, { slug }); } catch (e) { return null; }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (projectId === 'your-project-id') return [];
  const query = `*[_type == 'post' && defined(slug.current)][].slug.current`;
  try { return await client.fetch(query); } catch (e) { return []; }
}

export async function getAllProjects() {
  if (projectId === 'your-project-id') {
    return [
      {
        _id: '1',
        title: 'Modern Luxury Villa in ECR',
        slug: 'modern-luxury-villa-ecr',
        category: 'Residential',
        location: 'East Coast Road, Chennai',
        client: 'Private Owner',
        timeline: '14 Months',
        value: '₹3.5 Cr',
        completionDate: '2023-12-01',
        excerpt: 'A stunning 5,000 sq ft contemporary villa featuring cantilevered slabs, double-height living spaces, and an infinity pool overlooking the Bay of Bengal.',
        image: '/assets/projects/srt_project_exterior_1_1785080126114.jpg',
      },
      {
        _id: '2',
        title: 'Tech Park Commercial Hub',
        slug: 'tech-park-commercial-hub',
        category: 'Commercial',
        location: 'OMR, Chennai',
        client: 'Global Tech Corp',
        timeline: '24 Months',
        value: '₹45 Cr',
        completionDate: '2024-05-15',
        excerpt: 'A state-of-the-art 200,000 sq ft commercial IT park built with advanced steel structures and energy-efficient smart glass facades.',
        image: '/assets/projects/srt_project_commercial_1_1785080152919.jpg',
      },
      {
        _id: '3',
        title: 'Bespoke Modern Interior',
        slug: 'bespoke-modern-interior',
        category: 'Interior',
        location: 'Anna Nagar, Chennai',
        client: 'Residential',
        timeline: '6 Months',
        value: '₹1.2 Cr',
        completionDate: '2023-08-20',
        excerpt: 'Complete turnkey interior execution featuring Italian marble flooring, automated lighting, and custom teakwood accents throughout.',
        image: '/assets/projects/srt_project_interior_1_1785080139818.jpg',
      }
    ];
  }
  const query = `*[_type == 'project'] | order(completionDate desc) { _id, title, "slug": slug.current, category, location, client, timeline, value, completionDate, excerpt, mainImage, body }`;
  try { return await client.fetch(query); } catch (e) { return []; }
}

export async function getProjectBySlug(slug: string) {
  if (projectId === 'your-project-id') {
    const fallbacks = await getAllProjects();
    return fallbacks.find((p: any) => p.slug === slug) || null;
  }
  const query = `*[_type == 'project' && slug.current == $slug][0] { _id, title, "slug": slug.current, category, location, client, timeline, value, completionDate, excerpt, mainImage, body }`;
  try { return await client.fetch(query, { slug }); } catch (e) { return null; }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (projectId === 'your-project-id') {
    const fallbacks = await getAllProjects();
    return fallbacks.map((p: any) => p.slug);
  }
  const query = `*[_type == 'project' && defined(slug.current)][].slug.current`;
  try { return await client.fetch(query); } catch (e) { return []; }
}
