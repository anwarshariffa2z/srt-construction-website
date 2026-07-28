import { Metadata } from "next";
import AiWriterClient from "./AiWriterClient";

export const metadata: Metadata = {
  title: "AI Auto-Blogging Engine | SRT Admin",
  description: "Secure admin panel for AI content generation.",
};

export default function AiWriterPage() {
  return <AiWriterClient />;
}
