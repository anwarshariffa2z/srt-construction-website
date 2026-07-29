// @ts-nocheck
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
  "Eco-Friendly and Sustainable Construction Practices",
  "Modern Elevation Designs for Independent Houses",
  "Importance of Soil Testing Before Construction in Coastal Areas"
];

export const onRequestPost: PagesFunction<{ 
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  NEXT_PUBLIC_SANITY_DATASET: string;
  SANITY_API_TOKEN: string;
  CRON_SECRET: string;
}> = async (context) => {
  try {
    const { request, env } = context;
    
    // Simple authentication
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Select random topic
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

    const google = createGoogleGenerativeAI({
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { text } = await generateText({
      model: google('gemini-1.5-pro'), 
      system: `You are an expert SEO copywriter and construction consultant for SRT Constructions, Chennai.
Write a comprehensive, engaging 800+ word blog post on the given topic. 
Use Markdown format. 
Include an engaging introduction, multiple H2 and H3 sections, bullet points, and a strong call-to-action (CTA) to contact SRT Constructions. 
Focus on the Chennai/Indian context (e.g. climate, local preferences, Indian rupees if estimating).`,
      prompt: `Write a blog post about: ${topic}`,
    });

    // Save to Sanity
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
      excerpt: text.substring(0, 150) + "...",
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', marks: [], text: text }]
        }
      ]
    });

    return new Response(JSON.stringify({ success: true, postId: result._id, topic }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Auto-blog error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
