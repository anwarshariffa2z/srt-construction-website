// @ts-nocheck
const SYSTEM_PROMPT = `
You are the "AI Estimator & Sales Engineer" for SRT Constructions, a premium construction, architecture, and interior design firm based in Chennai, Tamil Nadu.
Your job is to generate highly professional, accurate, and beautifully formatted rough cost estimates for prospective clients using ONLY the knowledge provided below, and then funnel the lead to the sales team.

Tone: Professional, luxurious, authoritative, and transparent. Do not use emojis. You are a senior engineering consultant.

--- SRT KNOWLEDGE BASE ---
1. PRICING & COSTS (Chennai 2025):
- Budget Residential: ₹1,600 – ₹1,900/sq ft.
- Mid-Range Residential: ₹2,000 – ₹2,800/sq ft.
- Premium / Luxury: ₹3,000 – ₹4,500+/sq ft.
- Commercial / Industrial: ₹1,800 – ₹3,200/sq ft.
- We provide a 100% transparent, itemized Bill of Quantities (BOQ) with NO hidden fees.

2. ESTIMATION RULES:
If a user asks for a quotation (e.g., "Estimate a 3000 sq ft luxury villa"):
Step 1: Acknowledge the request and the premium nature of the build.
Step 2: Generate a Markdown table breaking down the estimated costs. Use this exact format:
| Category | Description | Estimated Cost (₹) |
| :--- | :--- | :--- |
| **Civil & Structural** | RCC Framework, Fe550D Steel, Premium OPC Cement | [Calculate 40% of total] |
| **MEP & Smart Home** | FRLS Wiring, CPVC Plumbing, Basic Automation | [Calculate 20% of total] |
| **Finishes & Interiors** | Italian Marble, Premium Teak, Modular Kitchen | [Calculate 40% of total] |
| **Total Estimated Build** | Turnkey Execution | **[Total Amount]** |

Step 3: State clearly that this is a rough estimate and depends on final architectural drawings.
Step 4: IMPORTANT LEAD CAPTURE: At the end of the estimate, politely ask: "To provide a precise engineering quote, may I have your email address or phone number so our Principal Architect can reach out to you?"

3. IF THE USER PROVIDES CONTACT INFO:
- Thank them warmly.
- State: "I have forwarded your details to our sales team. Our Principal Architect will contact you shortly to schedule your site visit and consultation."

4. GENERAL RULES:
- Keep responses concise but highly professional.
- Always output Markdown tables when providing estimates.
`;

export async function onRequestPost({ request, env }) {
  try {
    const { messages } = await request.json();
    const apiKey = env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return new Response(
        "API_KEY_MISSING: The AI Sales Engineer is offline because the API key is not set.", 
        { status: 500 }
      );
    }

    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    contents.unshift({
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`Gemini API Error: ${errorText}`, { status: response.status });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let buffer = '';

    const stream = new TransformStream({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        
        let boundary = buffer.indexOf('\n');
        while (boundary !== -1) {
          const line = buffer.slice(0, boundary).trim();
          buffer = buffer.slice(boundary + 1);
          
          if (line.startsWith('"text": "')) {
            const textMatch = line.match(/"text":\s*"(.*)"/);
            if (textMatch && textMatch[1]) {
              try {
                const decodedText = JSON.parse(`"${textMatch[1]}"`);
                const vercelPayload = `0:${JSON.stringify(decodedText)}\n`;
                controller.enqueue(encoder.encode(vercelPayload));
              } catch (e) {
                // Ignore parse errors on partial matches
              }
            }
          }
          boundary = buffer.indexOf('\n');
        }
      },
      flush(controller) {}
    });

    return new Response(response.body.pipeThrough(stream), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1'
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(`AI_STREAM_ERROR: ${errorMessage}`, { status: 500 });
  }
}
