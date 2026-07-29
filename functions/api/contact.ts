// @ts-nocheck
export async function onRequestPost({ request, env }) {
  try {
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY is missing." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Name, email, and message are required." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const emailPromises = [];

    // 1. Admin Alert Email
    emailPromises.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'SRT Website <onboarding@resend.dev>',
          to: ['tbasha.srtconstructions@gmail.com'],
          subject: `New Lead: ${projectType || 'Consultation Request'} from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        })
      })
    );

    // 2. Client Welcome Email
    emailPromises.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'SRT Constructions <onboarding@resend.dev>',
          to: [email],
          subject: 'We have received your message - SRT Constructions',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1712; color: #ffffff; padding: 40px 20px; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #c9a468; margin: 0; font-family: 'Times New Roman', serif; font-weight: normal;">SRT Constructions</h1>
                <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Building Legacies</p>
              </div>
              
              <h2 style="font-family: 'Times New Roman', serif; font-weight: normal; font-size: 24px;">Hello ${name},</h2>
              <p style="color: #ccc; line-height: 1.6;">Thank you for reaching out to us. We have received your message regarding your <strong>${projectType || 'upcoming project'}</strong>.</p>
              
              <p style="color: #ccc; line-height: 1.6;">Our team is reviewing your inquiry, and one of our construction experts will get back to you within 24 hours to discuss the next steps.</p>
              
              <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-left: 4px solid #c9a468; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary</p>
                <p style="margin: 0; font-style: italic; color: #aaa;">"${message}"</p>
              </div>
              
              <p style="color: #ccc; margin-top: 40px; line-height: 1.6;">
                Warm Regards,<br/>
                <strong style="color: #c9a468;">The SRT Constructions Team</strong>
              </p>
            </div>
          `,
        })
      })
    );

    const responses = await Promise.all(emailPromises);

    // If the primary admin email fails, throw an error. If client email fails, we can just log it.
    // For simplicity, we check if the first one (admin) failed.
    const adminResponse = responses[0];
    const data = await adminResponse.json();

    if (!adminResponse.ok) {
      return new Response(JSON.stringify({ error: data }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
