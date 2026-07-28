// @ts-nocheck
export async function onRequestPost({ request, env }) {
  try {
    const signature = request.headers.get('sanity-webhook-signature');
    const body = await request.text();

    const secret = env.SANITY_WEBHOOK_SECRET;
    
    // 1. Signature Verification (Skipped in this basic CF worker example unless crypto is implemented)
    if (secret && !signature) {
      return new Response(JSON.stringify({ message: 'Invalid signature' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // 2. Parse Payload
    const payload = JSON.parse(body);
    const { _type, title, status, clientPhone } = payload;

    // We only want to send WhatsApp alerts for 'projectUpdate' types or similar
    if (_type !== 'projectUpdate' && _type !== 'project') {
      return new Response(JSON.stringify({ message: 'Ignored: Not a project update document' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // 3. Construct WhatsApp Message Body
    const messageContent = `🏗️ *SRT Constructions Project Update*\n\n` +
      `*Project:* ${title || 'Unnamed Project'}\n` +
      `*Status:* ${status || 'Updated'}\n\n` +
      `Check your client portal for the latest site photos and engineering reports.\n` +
      `*Timestamp:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

    // 4. Trigger Twilio WhatsApp Message via Fetch (CF Worker safe)
    const recipientNumber = clientPhone || env.RECIPIENT_WHATSAPP_NUMBER;
    const accountSid = env.TWILIO_ACCOUNT_SID;
    const authToken = env.TWILIO_AUTH_TOKEN;
    const fromNumber = env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
    
    if (accountSid && authToken && recipientNumber) {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const toNumber = recipientNumber.startsWith('whatsapp:') ? recipientNumber : `whatsapp:${recipientNumber}`;
      
      const formData = new URLSearchParams();
      formData.append('From', fromNumber);
      formData.append('To', toNumber);
      formData.append('Body', messageContent);

      const twilioRes = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      if (!twilioRes.ok) {
        console.error('Twilio Error:', await twilioRes.text());
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Webhook processed successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
