// @ts-nocheck
export async function onRequestPost({ request, env }) {
  try {
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY is missing." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await request.json();
    const { name, email, phone, sqFt, finish, estimatedCost } = body;

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: "Name and phone are required." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Helper to format currency
    const formatINR = (amount) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const costString = formatINR(estimatedCost);

    const emailPromises = [];

    // 1. Alert Email to Admin
    emailPromises.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'SRT Estimator <onboarding@resend.dev>',
          to: ['tbasha.srtconstructions@gmail.com'],
          subject: `🔥 New Design Lead: ${name} (${sqFt} sq.ft, ${finish})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #c9a468; margin-bottom: 20px;">New Estimate Lead Captured</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'Not Provided'}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Area:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${sqFt} Sq.Ft</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Finish Level:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${finish}</td></tr>
                <tr><td style="padding: 10px;"><strong>Estimated Cost:</strong></td><td style="padding: 10px; font-weight: bold; color: #c9a468;">${costString}</td></tr>
              </table>
              <p style="margin-top: 20px; font-size: 12px; color: #888;">This lead was captured from the Interactive Cost Estimator on srtconstructions.in.</p>
            </div>
          `,
        })
      })
    );

    // 2. Welcome Email to Client (If email provided)
    if (email) {
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
            subject: 'Your SRT Constructions Estimate',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1712; color: #ffffff; padding: 40px 20px; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #c9a468; margin: 0; font-family: 'Times New Roman', serif; font-weight: normal;">SRT Constructions</h1>
                  <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Building Legacies</p>
                </div>
                
                <h2 style="font-family: 'Times New Roman', serif; font-weight: normal; font-size: 24px;">Hello ${name},</h2>
                <p style="color: #ccc; line-height: 1.6;">Thank you for using our Interactive Project Estimator. We are excited about the possibility of bringing your vision to life.</p>
                
                <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-left: 4px solid #c9a468; margin: 30px 0;">
                  <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Estimate Summary</p>
                  <p style="margin: 5px 0;"><strong>Total Area:</strong> ${sqFt} Sq.Ft</p>
                  <p style="margin: 5px 0;"><strong>Selected Finish:</strong> ${finish}</p>
                  <p style="margin: 15px 0 0 0; font-size: 24px; color: #c9a468; font-family: 'Times New Roman', serif;">${costString}</p>
                  <p style="margin: 5px 0 0 0; font-size: 11px; color: #666;">*Note: This is an initial estimate and may vary based on exact site conditions.</p>
                </div>

                <p style="color: #ccc; line-height: 1.6;">One of our senior architects will be in touch shortly on <strong>${phone}</strong> to discuss your exact requirements and arrange a free site visit or office consultation.</p>
                
                <p style="color: #ccc; margin-top: 40px; line-height: 1.6;">
                  Warm Regards,<br/>
                  <strong style="color: #c9a468;">The SRT Constructions Team</strong>
                </p>
              </div>
            `,
          })
        })
      );
    }

    const responses = await Promise.all(emailPromises);

    for (const res of responses) {
      if (!res.ok) {
        const errData = await res.json();
        console.error("Resend API Error:", errData);
        // Continue even if one fails, but log it
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
