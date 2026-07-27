"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const { messages, sendMessage, status, error } = useChat({
    messages: [
      {
        id: 'initial-1',
        role: 'assistant',
        parts: [{ type: 'text', text: "Hello. I am the AI Sales Engineer for SRT Constructions. How can I assist you with your project today? You can ask me about our material specifications, pricing, approvals, or construction methodology." }],
      }
    ]
  });
  
  const isLoading = status === 'submitted' || status === 'streaming';

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim()) return;
    sendMessage({ text: localInput });
    setLocalInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--color-background)] border border-[var(--color-stone)] shadow-2xl rounded-lg w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--color-stone-dark)] text-white p-4 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-serif text-xl">SRT AI Engineer</h3>
                <p className="text-xs text-white/70 uppercase tracking-widest mt-1">24/7 Support</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-background)]">
              {messages.map(m => {
                const text = m.parts?.filter((p: { type: string }) => p.type === 'text').map((p: { type: string; text: string }) => p.text).join('') || '';
                const role = m.role as string;
                return (
                <div key={m.id} className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-md text-sm leading-relaxed ${
                      role === 'user' 
                        ? 'bg-[var(--color-bronze)] text-white' 
                        : 'bg-[var(--color-stone)]/30 text-[var(--color-foreground)] border border-[var(--color-stone)]'
                    }`}
                  >
                    {role === 'assistant' ? (
                      <div className="prose-custom prose-sm max-w-none">
                         <ReactMarkdown
                            components={{
                              p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: (props) => <ul className="list-disc pl-4 mb-2" {...props} />,
                              ol: (props) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                              li: (props) => <li className="mb-1" {...props} />,
                              strong: (props) => <strong className="font-semibold text-[var(--color-bronze-deep)]" {...props} />,
                            }}
                         >
                           {text}
                         </ReactMarkdown>
                      </div>
                    ) : (
                      text
                    )}
                  </div>
                </div>
              )})}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--color-stone)]/30 border border-[var(--color-stone)] p-3 rounded-md flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-[var(--color-bronze)]" />
                    <span className="text-sm text-[var(--color-foreground-soft)]">Engineer is typing...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center my-4">
                  <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-md flex items-start gap-2 text-sm max-w-[90%]">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Connection Error</p>
                      <p className="text-xs">
                        {error.message.includes("API Key Missing") 
                          ? "The AI is currently offline. The site administrator needs to configure the Gemini API key."
                          : "Failed to connect to the AI service. Please try again later."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-[var(--color-stone)] bg-white shrink-0">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={localInput}
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-[var(--color-stone)]/20 border border-[var(--color-stone)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-bronze)] transition-colors text-[var(--color-foreground)]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || localInput.trim().length === 0}
                  className="bg-[var(--color-stone-dark)] hover:bg-[var(--color-bronze)] text-white p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px]"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[var(--color-stone-dark)] text-white p-4 rounded-full shadow-xl hover:bg-[var(--color-bronze)] transition-colors flex items-center justify-center relative group"
        aria-label="Toggle chat"
      >
        <MessageSquare size={24} />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-[var(--color-stone-dark)] text-white text-xs px-3 py-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          Ask our AI Engineer
        </span>
      </motion.button>
    </div>
  );
}
