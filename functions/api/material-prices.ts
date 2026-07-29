// Server-side Cloudflare Function — proxies the material price request securely
// so we don't expose user IPs to third-party proxies.
export const onRequestGet = async () => {
  try {
    const targetUrl = 'https://www.livechennai.com/steel_price_in_chennai.asp';
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SRTBot/1.0)',
        'Accept': 'text/html',
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream fetch failed: ${response.status}`);
    }

    const html = await response.text();

    // Parse the prices from the HTML server-side
    const prices: {
      material: string;
      brand: string;
      grade: string;
      priceINR: number;
      unit: string;
    }[] = [];

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
        });
      }
    }

    if (prices.length === 0) {
      throw new Error('No prices parsed from HTML');
    }

    return new Response(JSON.stringify({ success: true, prices, fetchedAt: new Date().toISOString() }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=18000',
        'Access-Control-Allow-Origin': 'https://srtconstructions.in',
      },
    });
  } catch {
    // Return fallback structure — never leak server errors to the client
    return new Response(JSON.stringify({
      success: false,
      prices: [],
      fetchedAt: new Date().toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
