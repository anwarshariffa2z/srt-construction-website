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
  if (projectId === 'your-project-id') return [];
  const query = `*[_type == 'project'] | order(completionDate desc) { _id, title, "slug": slug.current, category, location, client, timeline, value, completionDate, excerpt, mainImage, body }`;
  try { return await client.fetch(query); } catch (e) { return []; }
}

export async function getProjectBySlug(slug: string) {
  if (projectId === 'your-project-id') return null;
  const query = `*[_type == 'project' && slug.current == $slug][0] { _id, title, "slug": slug.current, category, location, client, timeline, value, completionDate, excerpt, mainImage, body }`;
  try { return await client.fetch(query, { slug }); } catch (e) { return null; }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  if (projectId === 'your-project-id') return [];
  const query = `*[_type == 'project' && defined(slug.current)][].slug.current`;
  try { return await client.fetch(query); } catch (e) { return []; }
}
