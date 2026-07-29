// @ts-nocheck
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const onRequestPost: PagesFunction<{ GOOGLE_GENERATIVE_AI_API_KEY: string }> = async (context) => {
  try {
    const { request, env } = context;
    const { messages } = await request.json() as any;

    if (!env.GOOGLE_GENERATIVE_AI_API_KEY) {
       return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 500 });
    }

    const google = createGoogleGenerativeAI({
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: `You are an expert AI consultant for SRT Constructions, a premium construction company based in Chennai, India.
Your goal is to answer client questions regarding construction, materials, processes, and SRT's services.
Key facts about SRT Constructions:
- We specialize in luxury residential and high-end commercial construction.
- We use only top-tier materials: UltraTech/Ramco Cement, Tata Tiscon TMT, Asian Paints Royale, Jaquar/Kohler plumbing.
- We offer a transparent, stage-wise billing process via our custom Client Portal.
- Keep answers helpful, concise, and professional. 
- Do not give exact binding quotes, instead suggest they use the "Cost Estimator" or "Contact Us" page.
- Do not make up facts about the company. If you don't know, suggest they contact the team.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
