import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, FileQuestion, RefreshCcw, FileCheck2 } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, ReviewCard, SectionHeading, StructuredData } from "@/components/site-ui";
import { reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent AI & Software Initiative Review Services",
  description:
    "Compare an Independent Initiative Review, Decision Case Reconstruction, and Independent Continuation Review for material AI and software decisions.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Independent AI & Software Initiative Review Services",
    description: "Independent review services for approval, reconstruction, and continuation decisions.",
    url: "/reviews"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Decision Integrity Practice services",
  itemListElement: reviews.map((review, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://www.marcpaul.tech${review.href}`,
    name: review.title
  }))
};

export default function ReviewsPage() {
  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow="Review services"
        title="I match the review to the state of the decision."
        lead="I review a proposal that is ready for a decision, rebuild a case that is not, or return to active work before the next commitment."
        breadcrumbs={[{ label: "Reviews" }]}
        actions={
          <>
            <Button href="/request-a-review" icon={<FileCheck2 size={17} />} isCta={true}>
              Request a review
            </Button>
            <Button href="/situations" variant="secondary" icon={<ArrowRight size={17} />}>
              Find your decision point
            </Button>
          </>
        }
      />

      <section className="section section-tight" aria-labelledby="review-comparison-title">
        <div className="shell">
          <h2 className="sr-only" id="review-comparison-title">Review service comparison</h2>
          <div className="review-grid">
            {reviews.map((review, index) => (
              <ReviewCard key={review.slug} review={review} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="choose-title">
        <div className="shell">
          <SectionHeading
            kicker="Choose by situation"
            title="The state of the case determines the service."
            id="choose-title"
            intro={<p>I do not use a continuation review to repair a proposal that never had a sound approval basis. The question in front of the decision owner determines the work.</p>}
          />
          <div className="choice-grid">
            <article>
              <FileQuestion size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">An approval is pending</p>
              <h3>Review the case as presented.</h3>
              <p>I use an Independent Initiative Review when leadership needs an opinion on a defined commitment while realistic alternatives still exist.</p>
              <Link className="text-link" href="/reviews/independent-initiative-review">
                Independent Initiative Review <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <Cpu size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">The proposal cannot support a decision</p>
              <h3>Rebuild the investment case.</h3>
              <p>I use Decision Case Reconstruction when the initiative may be viable, but its logic, evidence, economics, scope, or ownership need substantial work.</p>
              <Link className="text-link" href="/reviews/decision-case-reconstruction">
                Decision Case Reconstruction <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <RefreshCcw size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">The initiative is already active</p>
              <h3>Review the conditions before the next release.</h3>
              <p>I use an Independent Continuation Review at a funding gate, vendor renewal, production decision, or other defined review point.</p>
              <Link className="text-link" href="/reviews/independent-continuation-review">
                Independent Continuation Review <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="field-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Initial field of work</p>
            <h2 id="field-title">I stay within AI, software, and digital-product decisions I can examine well.</h2>
          </div>
          <div className="prose-block">
            <p>My strongest fit is a B2B software company, a technology business, an AI-enabled product, a workflow platform, a simulation or immersive-technology company, an education-technology business, or a bounded internal programme.</p>
            <p>I review decisions about AI features, internal AI systems, automation programmes, product pivots, platform investments, major rebuilds, pilot-to-production moves, and technical operating models.</p>
            <Link className="text-link" href="/reviews/ai-initiative-review">
              See the additional AI review areas <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="boundary-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Service boundary</p>
            <h2 id="boundary-title">I keep review separate from strategy and implementation work.</h2>
          </div>
          <div className="prose-block">
            <p>I review whether the combined investment case supports the commitment being requested. I do not operate the initiative, sell the implementation, audit the company, or certify the technology.</p>
            <p>My opinion remains independent of project approval and any later delivery appointment.</p>
            <Link className="text-link" href="/approach">
              Read the approach, limits, and independence standard <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
