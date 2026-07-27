import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for extremely fast, cached edge reads
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// Fallback logic for when Sanity is not yet initialized
export async function fetchSanityPosts() {
  if (projectId === 'your-project-id') {
    return []; // Return empty if not configured to prevent crashes
  }
  
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      mainImage,
      categories[]->{title},
      readingTime
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    return [];
  }
}
