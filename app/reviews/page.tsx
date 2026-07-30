import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, FileQuestion, RefreshCcw, FileCheck2 } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, ReviewCard, SectionHeading, StructuredData } from "@/components/site-ui";
import { reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent AI & Software Review Services",
  description:
    "Compare an Independent Initiative Review, Decision Case Reconstruction, and Independent Continuation Review for material AI and software decisions.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Independent AI & Software Review Services",
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
        title="Independent review services for material technology commitments."
        lead="Choose an independent assessment for a proposal that is ready for decision, reconstruction for a case that is not, or a continuation review before the next release to active work."
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
            title="Choose the service by decision stage."
            id="choose-title"
            intro={<p>The service is selected according to the decision now due and the condition of the underlying case.</p>}
          />
          <div className="choice-grid">
            <article>
              <FileQuestion size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">An approval is pending</p>
              <h3>Assess the case before approval.</h3>
              <p>An Independent Initiative Review provides leadership with an outside opinion on a defined commitment while realistic alternatives still exist.</p>
              <Link className="text-link" href="/reviews/independent-initiative-review">
                Independent Initiative Review <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <Cpu size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">The proposal cannot support a decision</p>
              <h3>Rebuild the investment case.</h3>
              <p>Decision Case Reconstruction is appropriate when the initiative may be viable but its logic, evidence, economics, scope, or ownership need substantial work.</p>
              <Link className="text-link" href="/reviews/decision-case-reconstruction">
                Decision Case Reconstruction <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <RefreshCcw size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">The initiative is already active</p>
              <h3>Reassess the case before the next release.</h3>
              <p>An Independent Continuation Review supports a funding gate, vendor renewal, production decision, or other defined review point.</p>
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
            <p className="section-kicker">Client and initiative fit</p>
            <h2 id="field-title">Focused on growth-stage AI, software, and digital-product decisions.</h2>
          </div>
          <div className="prose-block">
            <p>The strongest fit is a Series A or Series B technology company, B2B software business, AI-enabled product company, or investor assessing a defined portfolio-company initiative.</p>
            <p>Typical decisions concern AI features, internal AI systems, automation programmes, product pivots, platform investments, major rebuilds, pilot-to-production moves, and technical operating models.</p>
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
            <h2 id="boundary-title">Independent review remains separate from implementation.</h2>
          </div>
          <div className="prose-block">
            <p>The work assesses whether the combined investment case supports the commitment being requested. It does not include operating the initiative, selling the implementation, auditing the company, or certifying the technology.</p>
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
