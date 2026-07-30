import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { archivePosts, currentPosts, featuredPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Investment & Software Decision Blog",
  description:
    "I write about AI investment reviews, pilot-to-production decisions, delayed software programmes, funding conditions and decision evidence.",
  keywords: [
    "AI investment blog",
    "AI pilot to production",
    "AI business case",
    "software investment decisions",
    "technology initiative review"
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI Investment & Software Decision Blog",
    description: "My decision notes for leaders funding, scaling or reconsidering AI and software initiatives.",
    url: "/blog"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Decision notes by Marc Paul",
  url: absoluteUrl("/blog"),
  description: metadata.description,
  author: { "@type": "Person", name: "Marc Paul", url: absoluteUrl("/about") },
  hasPart: currentPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt
  }))
};

export default function BlogPage() {
  const additionalCurrentPosts = currentPosts.filter((post) => !post.featured);

  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow="Decision notes"
        title="Notes I use to think through technology commitments."
        lead="I write about what a pilot proved, which costs sit outside the demo, and what evidence should govern the next release. Earlier essays remain in a dated archive."
        breadcrumbs={[{ label: "Blog" }]}
        actions={
          <>
            <Button href="#latest" icon={<ArrowRight size={17} />}>
              Read the latest articles
            </Button>
            <Button href="/reviews" variant="secondary" icon={<ArrowRight size={17} />}>
              View review services
            </Button>
          </>
        }
      />

      <section className="section section-tight" id="latest" aria-labelledby="featured-title">
        <div className="shell">
          <SectionHeading
            kicker="Featured"
            title="Current notes on funding and continuation."
            id="featured-title"
            intro={<p>I start with the approval paper, the evidence pack, and the commitment now requested.</p>}
          />
          <div className="blog-grid blog-grid-featured">
            {featuredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {additionalCurrentPosts.length ? (
        <section className="section section-contrast" aria-labelledby="notes-title">
          <div className="shell">
            <SectionHeading
              kicker="Notes"
              title="Questions I carry from the demo into the operating plan."
              id="notes-title"
            />
            <div className="blog-list">
              {additionalCurrentPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="archive-title">
        <div className="shell">
          <SectionHeading
            kicker="Archive / 2023–2025"
            title="My earlier writing, kept in its original context."
            id="archive-title"
            intro={<p>I have kept the old URLs and publication dates. Pieces about models, platforms, and policy reflect what I knew when I published them.</p>}
          />
          <div className="archive-list">
            {archivePosts.map((post) => (
              <article key={post.slug}>
                <div>
                  <span>{post.category}</span>
                  <time dateTime={post.publishedAt}>{post.displayDate}</time>
                </div>
                <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.dek}</p>
                <Link className="text-link" href={`/blog/${post.slug}`}>
                  Open archive entry <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title="Have an approval paper on the table?"
        text="Send the decision deadline, the initiative and the commitment under consideration. I will tell you whether an independent review fits the decision."
      />
    </main>
  );
}
