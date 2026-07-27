"use client";

import dynamic from 'next/dynamic';

// Dynamically import the ChatWidget and strictly disable SSR 
// so the Vercel AI SDK isn't bundled into the Cloudflare Worker server runtime.
const ChatWidget = dynamic(
  () => import('./ChatWidget').then((mod) => mod.ChatWidget),
  { ssr: false }
);

export function ChatWidgetWrapper() {
  return <ChatWidget />;
}
