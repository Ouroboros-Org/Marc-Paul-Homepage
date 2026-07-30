import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const pageRoutes = [
  { path: "/", priority: 1, frequency: "monthly" as const },
  { path: "/reviews", priority: 0.9, frequency: "monthly" as const },
  { path: "/reviews/independent-initiative-review", priority: 0.95, frequency: "monthly" as const },
  { path: "/reviews/decision-case-reconstruction", priority: 0.8, frequency: "monthly" as const },
  { path: "/reviews/independent-continuation-review", priority: 0.8, frequency: "monthly" as const },
  { path: "/reviews/ai-initiative-review", priority: 0.9, frequency: "monthly" as const },
  { path: "/situations", priority: 0.85, frequency: "monthly" as const },
  { path: "/approach", priority: 0.65, frequency: "monthly" as const },
  { path: "/cases", priority: 0.7, frequency: "monthly" as const },
  { path: "/cases/sample-ai-pilot", priority: 0.8, frequency: "monthly" as const },
  { path: "/about", priority: 0.65, frequency: "monthly" as const },
  { path: "/blog", priority: 0.85, frequency: "weekly" as const },
  { path: "/contact", priority: 0.7, frequency: "monthly" as const },
  { path: "/request-a-review", priority: 0.8, frequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, frequency: "yearly" as const }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries: MetadataRoute.Sitemap = pageRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: "2026-07-30",
    changeFrequency: route.frequency,
    priority: route.priority
  }));

  const articleEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: post.legacy ? "yearly" : "monthly",
    priority: post.featured ? 0.8 : post.legacy ? 0.45 : 0.65
  }));

  return [...pageEntries, ...articleEntries];
}
