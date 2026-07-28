import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileCheck2 } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/button";
import { Breadcrumbs, StructuredData } from "@/components/site-ui";
import {
  allPostSlugs,
  currentPosts,
  getPostBySlug,
  posts,
  type ArticleContentBlock
} from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords],
    authors: [{ name: "Marc Paul", url: "/about" }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [absoluteUrl("/about")]
    }
  };
}

function ArticleBlock({ block }: { block: ArticleContentBlock }) {
  switch (block.type) {
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return <Heading id={block.id}>{block.text}</Heading>;
    }
    case "paragraph":
      return <p>{block.text}</p>;
    case "list": {
      const List = block.style === "ordered" ? "ol" : "ul";
      return <List>{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
    }
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "note":
      return (
        <aside className={`article-note article-note-${block.tone}`}>
          {block.label ? <strong>{block.label}</strong> : null}
          <p>{block.text}</p>
        </aside>
      );
    case "link":
      return (
        <p className="article-source-link">
          {block.external ? (
            <a href={block.href} target="_blank" rel="noreferrer">
              {block.text} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <Link href={block.href}>{block.text} <ArrowRight size={15} aria-hidden="true" /></Link>
          )}
        </p>
      );
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPool = post.legacy ? currentPosts : posts.filter((candidate) => !candidate.legacy);
  const related = relatedPool.filter((candidate) => candidate.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Person", name: "Marc Paul", url: absoluteUrl("/about") },
    publisher: {
      "@type": "Person",
      name: "Marc Paul",
      url: absoluteUrl("/about")
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en"
  };

  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <article className="article-page">
        <header className="article-header">
          <div className="shell article-header-shell">
            <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
            <div className="article-meta">
              <span>{post.category}</span>
              <time dateTime={post.publishedAt}>{post.displayDate}</time>
              <span>{post.readTime}</span>
              {post.updatedAt ? <span>Updated {post.updatedAt}</span> : null}
            </div>
            <h1>{post.title}</h1>
            <p className="article-dek">{post.dek}</p>
          </div>
        </header>

        <div className="shell article-layout">
          <aside className="article-rail">
            <Link href="/blog"><ArrowLeft size={15} aria-hidden="true" /> All articles</Link>
            <div>
              <span>Written by</span>
              <Link href="/about">Marc Paul</Link>
            </div>
            <div>
              <span>Related service</span>
              <Link href={post.legacy ? "/about" : "/reviews/independent-initiative-review"}>
                {post.legacy ? "About the author" : "Independent Initiative Review"}
              </Link>
            </div>
          </aside>
          <div className="article-body">
            {post.content.map((block, index) => (
              <ArticleBlock key={`${block.type}-${index}`} block={block} />
            ))}
          </div>
        </div>

        {!post.legacy ? (
          <footer className="shell article-cta">
            <div>
              <p className="section-kicker">A live decision</p>
              <h2>Review the case before the next commitment.</h2>
              <p>Send the initiative, the decision due and the deadline. I will reply with a direct view on whether an independent review fits.</p>
            </div>
            <Button href="/request-a-review" icon={<FileCheck2 size={17} />} isCta={true}>
              Request a review
            </Button>
          </footer>
        ) : null}
      </article>

      {related.length ? (
        <section className="section section-contrast" aria-labelledby="related-articles-title">
          <div className="shell">
            <header className="section-heading section-heading-stack">
              <div>
                <p className="section-kicker">Related decision notes</p>
                <h2 id="related-articles-title">Continue with a different case.</h2>
              </div>
            </header>
            <div className="blog-grid">
              {related.map((item) => <BlogCard key={item.slug} post={item} />)}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
