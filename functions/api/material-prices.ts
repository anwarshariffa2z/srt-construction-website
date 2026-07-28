// @ts-nocheck
export async function onRequestGet({ env }) {
  const FALLBACK_PRICES = [
    { material: 'TMT Steel', brand: 'Tata Tiscon', grade: 'Fe 550D', priceINR: 76500, unit: 'tonne', updatedAt: new Date().toISOString() },
    { material: 'TMT Steel', brand: 'JSW Neo', grade: 'Fe 550D', priceINR: 73200, unit: 'tonne', updatedAt: new Date().toISOString() },
    { material: 'TMT Steel', brand: 'ARS', grade: 'Fe 500D', priceINR: 69800, unit: 'tonne', updatedAt: new Date().toISOString() },
    { material: 'Cement', brand: 'Ramco Super Grade', grade: 'PPC', priceINR: 385, unit: 'bag', updatedAt: new Date().toISOString() },
    { material: 'Cement', brand: 'UltraTech', grade: 'OPC 53', priceINR: 410, unit: 'bag', updatedAt: new Date().toISOString() },
    { material: 'Cement', brand: 'Coromandel', grade: 'OPC 43', priceINR: 370, unit: 'bag', updatedAt: new Date().toISOString() },
  ];

  try {
    const response = await fetch('https://www.livechennai.com/steel_price_in_chennai.asp', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ success: true, data: FALLBACK_PRICES, source: 'fallback (network error)' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const html = await response.text();
    const prices = [];

    // Simple regex extraction to avoid cheerio/node-compat issues in Cloudflare workers
    // Matches typical <tr><td>Brand</td><td>Grade</td><td>Rs. 75,000</td></tr>
    const rowRegex = /<tr[^>]*>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>/gi;
    let match;

    while ((match = rowRegex.exec(html)) !== null) {
      const brand = match[1].replace(/<[^>]*>?/gm, '').trim();
      const grade = match[2].replace(/<[^>]*>?/gm, '').trim();
      const priceText = match[3].replace(/<[^>]*>?/gm, '').trim();

      const priceINR = parseFloat(priceText.replace(/[^0-9.]/g, ''));

      if (brand && !isNaN(priceINR) && priceINR > 0 && brand.toLowerCase() !== 'brand') {
        prices.push({
          material: brand.toLowerCase().includes('cement') ? 'Cement' : 'TMT Steel',
          brand,
          grade: grade || 'Standard',
          priceINR,
          unit: brand.toLowerCase().includes('cement') || priceINR < 1000 ? 'bag' : 'tonne',
          updatedAt: new Date().toISOString(),
        });
      }
    }

    if (prices.length > 0) {
      return new Response(JSON.stringify({ success: true, data: prices, source: 'live' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, data: FALLBACK_PRICES, source: 'fallback (parsing failed)' }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ success: true, data: FALLBACK_PRICES, source: 'fallback (exception)' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
