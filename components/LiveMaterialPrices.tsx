"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface MaterialPrice {
  material: string;
  brand: string;
  grade: string;
  priceINR: number;
  unit: string;
}

const FALLBACK_PRICES: MaterialPrice[] = [
  { material: 'TMT Steel', brand: 'Tata Tiscon', grade: 'Fe 550D', priceINR: 76500, unit: 'tonne' },
  { material: 'TMT Steel', brand: 'JSW Neo', grade: 'Fe 550D', priceINR: 73200, unit: 'tonne' },
  { material: 'TMT Steel', brand: 'ARS', grade: 'Fe 500D', priceINR: 69800, unit: 'tonne' },
  { material: 'Cement', brand: 'Ramco Super Grade', grade: 'PPC', priceINR: 385, unit: 'bag' },
  { material: 'Cement', brand: 'UltraTech', grade: 'OPC 53', priceINR: 410, unit: 'bag' },
  { material: 'Cement', brand: 'Coromandel', grade: 'OPC 43', priceINR: 370, unit: 'bag' },
];

export function LiveMaterialPrices() {
  const [prices, setPrices] = useState<MaterialPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch from our own Cloudflare Function — no third-party proxy exposure
        const res = await fetch('/api/material-prices');
        if (!res.ok) throw new Error('API fetch failed');

        const data = await res.json() as { success: boolean; prices: MaterialPrice[]; fetchedAt: string };

        if (data.success && Array.isArray(data.prices) && data.prices.length > 0) {
          setPrices(data.prices);
          setFetchedAt(data.fetchedAt);
          setIsLive(true);
        } else {
          throw new Error('No prices returned');
        }
      } catch {
        // Silently fall back to hardcoded rates
        setPrices(FALLBACK_PRICES);
        setFetchedAt(new Date().toISOString());
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh every 5 hours (matches server cache TTL)
    const interval = setInterval(fetchPrices, 5 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[var(--color-stone-dark)] p-8 rounded-xl border border-[var(--color-stone)] animate-pulse flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-t-[var(--color-bronze)] border-white/20 rounded-full animate-spin mb-4" />
        <p className="text-white/60 text-sm tracking-widest uppercase">Fetching Live Market Rates...</p>
      </div>
    );
  }

  const steelPrices = prices.filter(p => p.material === 'TMT Steel');
  const cementPrices = prices.filter(p => p.material === 'Cement');

  return (
    <div className="w-full bg-[var(--color-stone-dark)] rounded-xl border border-[var(--color-stone)] overflow-hidden">
      <div className="bg-[#1a1712] p-6 border-b border-[var(--color-stone)] flex justify-between items-center">
        <div>
          <h3 className="font-serif text-2xl text-white mb-1">Chennai Market Rates</h3>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-bronze)] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            {isLive ? 'Live Feed' : 'Market Reference Rates'}
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-white/50 text-xs">
            Updated: {fetchedAt ? new Date(fetchedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—'}
          </p>
          <p className="text-white/50 text-xs">Based on Chennai regional indexes</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-stone)]">
        {/* Steel Section */}
        <div className="p-6">
          <h4 className="text-white/80 uppercase tracking-widest text-sm mb-6 pb-2 border-b border-white/10">TMT Steel (per tonne)</h4>
          <div className="space-y-4">
            {steelPrices.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-medium">{item.brand}</p>
                  <p className="text-white/40 text-xs">{item.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-[var(--color-bronze)] font-mono text-lg">
                    ₹{item.priceINR.toLocaleString('en-IN')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cement Section */}
        <div className="p-6">
          <h4 className="text-white/80 uppercase tracking-widest text-sm mb-6 pb-2 border-b border-white/10">Cement (per 50kg bag)</h4>
          <div className="space-y-4">
            {cementPrices.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-medium">{item.brand}</p>
                  <p className="text-white/40 text-xs">{item.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-[var(--color-bronze)] font-mono text-lg">
                    ₹{item.priceINR.toLocaleString('en-IN')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
