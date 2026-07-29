// @ts-ignore -- PagesFunction type is available at runtime in Cloudflare environment
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createClient } from '@sanity/client';

const TOPICS = [
  "Cost of Building a Luxury Home in Chennai (2026 Guide)",
  "Top 5 Premium Flooring Materials for Modern Villas",
  "Why TMT Steel Quality Matters in Coastal Areas like Chennai",
  "Smart Home Automation Trends in South India",
  "Vitrified Tiles vs. Italian Marble: A Complete Comparison",
  "The Ultimate Guide to Kitchen Interiors in Chennai",
  "How to Choose the Right Construction Contractor in Tamil Nadu",
  "Eco-Friendly and Sustainable Construction Practices in India",
  "Modern Elevation Designs for Independent Houses",
  "Importance of Soil Testing Before Construction in Coastal Areas",
  "Waterproofing Techniques for Terrace and Basements in Chennai",
  "Best Cement Brands in Tamil Nadu: A Detailed Comparison",
];

/** Convert markdown text into a basic Sanity Portable Text block array */
function markdownToPortableText(markdown: string) {
  const lines = markdown.split('\n');
  const blocks = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h2',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text: line.replace(/^## /, '') }],
        markDefs: [],
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h3',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text: line.replace(/^### /, '') }],
        markDefs: [],
      });
    } else if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h1',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text: line.replace(/^# /, '') }],
        markDefs: [],
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text: line.replace(/^[-*] /, '') }],
        markDefs: [],
      });
    } else {
      // Strip remaining markdown formatting (bold, italic)
      const cleanText = line
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1');
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'normal',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text: cleanText }],
        markDefs: [],
      });
    }
  }

  return blocks;
}

export const onRequestPost = async (context: {
  request: Request;
  env: {
    GOOGLE_GENERATIVE_AI_API_KEY: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    SANITY_API_TOKEN: string;
    CRON_SECRET: string;
  };
}) => {
  try {
    const { request, env } = context;

    // Authenticate the cron trigger
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${env.CRON_SECRET}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    if (!env.GOOGLE_GENERATIVE_AI_API_KEY || !env.SANITY_API_TOKEN) {
      return new Response(JSON.stringify({ error: 'Missing required environment variables' }), { status: 503 });
    }

    // Select a random topic
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

    const google = createGoogleGenerativeAI({
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { text } = await generateText({
      model: google('gemini-1.5-pro'),
      system: `You are an expert SEO copywriter and construction consultant for SRT Constructions, Chennai.
Write a comprehensive, engaging 800+ word blog post on the given topic.
Use Markdown format with # for the title, ## for main sections, ### for sub-sections, and - for bullet points.
Include an engaging introduction, multiple H2 and H3 sections, bullet points, and a strong call-to-action (CTA) to contact SRT Constructions.
Focus on the Chennai/Indian context (e.g. climate, local preferences, Indian rupees if estimating).`,
      prompt: `Write a blog post about: ${topic}`,
    });

    // Convert to proper Sanity Portable Text
    const portableTextBody = markdownToPortableText(text);

    // Create clean excerpt from first paragraph
    const firstParagraph = text.split('\n').find(line => line.trim() && !line.startsWith('#')) || '';
    const excerpt = firstParagraph.replace(/\*\*(.*?)\*\*/g, '$1').substring(0, 200) + '...';

    const sanityClient = createClient({
      projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
      dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      token: env.SANITY_API_TOKEN,
      useCdn: false,
    });

    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const result = await sanityClient.create({
      _type: 'post',
      title: topic,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      excerpt,
      body: portableTextBody,
    });

    return new Response(JSON.stringify({ success: true, postId: result._id, topic }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    if (process.env.NODE_ENV === 'development') {
      console.error('Auto-blog error:', error);
    }
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
