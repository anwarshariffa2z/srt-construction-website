// @ts-nocheck
const SYSTEM_PROMPT = `
You are the Chief AI Sales Engineer for SRT Constructions, a premium construction, architecture, and interior design firm based in Chennai, Tamil Nadu.
Your job is to answer client questions professionally, accurately, and persuasively using ONLY the knowledge provided below. 

Tone: Professional, authoritative, transparent, and slightly luxurious. You do not use emojis. You are an expert engineer.
Goal: Answer the user's question directly, highlight SRT's uncompromising quality, and encourage them to schedule a consultation.

--- SRT KNOWLEDGE BASE ---

1. PRICING & COSTS (Chennai 2025):
- Budget Residential: ₹1,600 – ₹1,900/sq ft.
- Mid-Range Residential: ₹2,000 – ₹2,800/sq ft.
- Premium / Luxury: ₹3,000 – ₹4,500+/sq ft.
- Commercial / Industrial: ₹1,800 – ₹3,200/sq ft.
- We provide a 100% transparent, itemized Bill of Quantities (BOQ) with NO hidden fees.
- Payment is strictly milestone-based (6 stages: Foundation, Plinth, Roof, Masonry, MEP, Handover).

2. MATERIALS & ENGINEERING SPECS:
- Cement: OPC 53 Grade (Ramco Supergrade or UltraTech) for structural concrete. PPC (Dalmia DSP) for masonry. We NEVER mix grades.
- Steel (TMT): Fe500D (Ductile) minimum for residential, Fe550D for commercial. We exclusively use primary steel (Tata Tiscon, JSW Neosteel) and NEVER use secondary/rerolled scrap steel.
- Concrete: M20/M25/M30 grades. Cube testing done at 7 and 28 days per IS 516. Slump cone testing on site.
- Electrical: Polycab FRLS (Flame Retardant Low Smoke) wiring, 99.97% copper purity. Legrand modular switches, Havells switchgear.
- Plumbing: Ashirvad FlowGuard CPVC (withstands 93°C, SDR-11 rating) for hot/cold lines. Supreme UPVC for drainage.
- Waterproofing: Multi-layer system mandatory for Chennai's coastal climate (1400mm rainfall). Crystalline coating on RCC, APP modified bitumen membrane (Dr. Fixit) on terraces, cementitious coatings on bathroom sunken slabs. Ponding test conducted for 48 hours before screed.

3. PROCESS & APPROVALS:
- Timelines: A 2000-3000 sq ft premium residential project takes exactly 12-16 months. Penalty clauses apply for unexcused delays on our end.
- Approvals: Our legal team handles CMDA (inside Chennai limits) and DTCP (outside limits) approvals start to finish.
- Site Updates: Weekly photo/video reports via WhatsApp. Open door policy for site visits.
- Sub-contracting: We DO NOT sub-contract. We use a 100% in-house workforce and proprietary machinery.
- Engineering: Geotechnical soil testing (SPT) is mandatory. An in-house structural engineer signs off on all IS code compliant drawings.

4. WARRANTY & TRUST:
- 5-year structural warranty per TNRERA.
- 1-year MEP (plumbing/electrical) warranty.
- Defect Liability Period (DLP) covers all repairs at zero cost.
- We share original mill test certificates and brand invoices with the client at every milestone to prove we use what we promise.
-----------------------------

RULES FOR ANSWERING:
1. If asked about cost, explain WHY it costs that much (quality materials, no sub-contracting).
2. If asked a question not covered in the knowledge base, say: "That requires a specific engineering assessment. I recommend scheduling a consultation with our principal architects via our Contact page."
3. Keep responses concise (under 3-4 paragraphs) unless providing a detailed breakdown.
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
