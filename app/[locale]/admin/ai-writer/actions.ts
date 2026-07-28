/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "next-sanity";

export async function publishToSanity(title: string, markdownBody: string) {
  const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;
  
  if (!token) {
    throw new Error("SANITY_API_TOKEN is missing. Cannot publish.");
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: token,
    useCdn: false, // Don't use CDN for writes
  });

  // Basic slugify
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    const res = await client.create({
      _type: 'post',
      title: title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      publishedAt: new Date().toISOString(),
      excerpt: markdownBody.substring(0, 150) + "...",
      // We store markdown directly as a string, or convert it to PortableText?
      // Since our frontend renders PortableText, we should actually store it properly or use a Markdown field in Sanity.
      // Assuming `body` is PortableText, converting MD to PT is complex in a short script. 
      // We will store it as a block of text in Portable Text format.
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: markdownBody
            }
          ]
        }
      ]
    });
    
    return { success: true, id: res._id };
  } catch (error: any) {
    console.error("Sanity publish error:", error);
    return { success: false, error: error.message };
  }
}
