/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { publishToSanity } from "./actions";
import { MagneticButton } from "@/components/MagneticButton";

export default function AiWriterClient() {
  const [topic, setTopic] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<string | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat", // Reusing our chat endpoint
    initialMessages: [
      {
        id: "sys",
        role: "system",
        content: "You are an expert SEO copywriter for a high-end construction company. When given a topic, write a comprehensive 800-word blog post in Markdown format. Use professional tone, include H2 and H3 tags, bullet points, and strong SEO keywords for the Indian construction market."
      }
    ]
  });

  const handlePublish = async () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'assistant') return;

    setPublishing(true);
    setPublishResult(null);
    try {
      const res = await publishToSanity(topic || "AI Generated Blog Post", lastMessage.content);
      if (res.success) {
        setPublishResult(`Success! Post published to Sanity (ID: ${res.id})`);
      } else {
        setPublishResult(`Error: ${res.error}`);
      }
    } catch (e: any) {
      setPublishResult(`Error: ${e.message}`);
    }
    setPublishing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-[15vh] px-[6vw] pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-[var(--color-bronze)] mb-2">AI Auto-Blogging Engine</h1>
        <p className="text-white/60 mb-10">Generate highly optimized, long-form content in seconds and publish directly to Sanity CMS.</p>

        <form onSubmit={(e) => {
          setTopic(input);
          handleSubmit(e);
        }} className="mb-10 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a topic (e.g. 'Cost of building a house in ECR')"
            className="flex-1 bg-[var(--color-stone-dark)] border border-white/20 text-white p-4 rounded-none focus:outline-none focus:border-[var(--color-bronze)]"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input}
            className="bg-[var(--color-bronze)] text-black px-8 font-semibold tracking-wider uppercase text-sm disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate Post"}
          </button>
        </form>

        {messages.filter(m => m.role === 'assistant').length > 0 && (
          <div className="bg-[var(--color-stone-dark)] border border-white/10 p-8">
            <h2 className="font-serif text-2xl text-white mb-6 border-b border-white/10 pb-4">Draft Output</h2>
            
            <div className="prose prose-invert prose-bronze max-w-none whitespace-pre-wrap font-light text-white/80">
              {messages.filter(m => m.role === 'assistant').pop()?.content}
            </div>

            {!isLoading && (
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  {publishResult && (
                    <p className={`text-sm ${publishResult.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                      {publishResult}
                    </p>
                  )}
                </div>
                <div onClick={handlePublish}>
                  <MagneticButton>
                    {publishing ? "Publishing..." : "Publish to Sanity"}
                  </MagneticButton>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
