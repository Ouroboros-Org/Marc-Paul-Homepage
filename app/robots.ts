import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Public practice site: allow indexing and AI retrieval/training so the
 * Independent Initiative Review offer can be found and cited accurately.
 * llms.txt at /llms.txt is the curated map for LLM agents (Answer.AI format).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      // Search engines
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "DuckDuckBot", "Slurp", "Yandex"],
        allow: "/"
      },
      // Apple search / Siri / Spotlight
      {
        userAgent: "Applebot",
        allow: "/"
      },
      // OpenAI: training, ChatGPT search index, live user fetch
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"],
        allow: "/"
      },
      // Anthropic: training, Claude search index, live user fetch
      {
        userAgent: ["ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai"],
        allow: "/"
      },
      // Google Gemini training / grounding control token (does not affect Google Search)
      {
        userAgent: "Google-Extended",
        allow: "/"
      },
      // Apple Intelligence training control token (does not affect Applebot search)
      {
        userAgent: "Applebot-Extended",
        allow: "/"
      },
      // Perplexity search index and live user fetch
      {
        userAgent: ["PerplexityBot", "Perplexity-User"],
        allow: "/"
      },
      // Other AI / answer crawlers
      {
        userAgent: [
          "Amazonbot",
          "CCBot",
          "Bytespider",
          "meta-externalagent",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "cohere-ai",
          "Diffbot",
          "YouBot"
        ],
        allow: "/"
      }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl
  };
}
