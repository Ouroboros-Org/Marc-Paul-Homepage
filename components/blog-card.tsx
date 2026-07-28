import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/posts";

export function BlogCard({ post, index }: { post: Article; index?: number }) {
  return (
    <article className="blog-card">
      <div className="blog-card-meta">
        {typeof index === "number" ? (
          <span className="blog-index">{String(index + 1).padStart(2, "0")}</span>
        ) : null}
        <span>{post.category}</span>
        <time dateTime={post.publishedAt}>{post.displayDate}</time>
        <span>{post.readTime}</span>
      </div>
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.dek}</p>
      <Link className="text-link" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
        Read the article <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
