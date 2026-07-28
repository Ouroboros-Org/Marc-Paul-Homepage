import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, FileQuestion, RefreshCcw } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { CtaPanel, PageHero, ReviewCard, SectionHeading, StructuredData } from "@/components/site-ui";
import { reviews } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent AI & Software Initiative Review Services",
  description:
    "Compare an Independent Initiative Review, Decision Case Reconstruction, and Independent Continuation Review for consequential AI and software decisions.",
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
        title="Independent review services for a defined AI or software decision."
        lead="The service depends on the state of the case. An Independent Initiative Review examines a proposal at a decision point. If the case is incomplete, use Decision Case Reconstruction; if active work has reached another commitment, use Independent Continuation Review."
        breadcrumbs={[{ label: "Reviews" }]}
        actions={
          <>
            <CtaButton href="/request-a-review" icon={<ArrowRight size={17} />}>
              Request a review
            </CtaButton>
            <CtaButton href="/situations" variant="secondary" icon={<ArrowRight size={17} />}>
              Find your decision point
            </CtaButton>
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
            intro={<p>An initiative review forms an opinion on the case presented. Reconstruction rebuilds a case that cannot yet support approval. A continuation review returns to an active initiative at a defined decision point.</p>}
          />
          <div className="choice-grid">
            <article>
              <FileQuestion size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">An approval is pending</p>
              <h3>Review the case as presented.</h3>
              <p>The Independent Initiative Review applies when leadership needs an opinion on a defined commitment while credible alternatives still exist.</p>
              <Link className="text-link" href="/reviews/independent-initiative-review">
                Independent Initiative Review <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <Cpu size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">The proposal cannot support a decision</p>
              <h3>Rebuild the investment case.</h3>
              <p>Decision Case Reconstruction applies when the initiative may be viable, but its logic, evidence, economics, scope, or ownership need substantial work.</p>
              <Link className="text-link" href="/reviews/decision-case-reconstruction">
                Decision Case Reconstruction <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <RefreshCcw size={24} strokeWidth={1.5} aria-hidden="true" />
              <p className="card-label">The initiative is already active</p>
              <h3>Review the conditions before the next release.</h3>
              <p>The Independent Continuation Review applies at a funding gate, vendor renewal, production decision, or other defined review point.</p>
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
            <h2 id="field-title">Bounded AI, software, and digital-product decisions.</h2>
          </div>
          <div className="prose-block">
            <p>The strongest fit is a B2B software company, venture-backed technology business, AI-enabled product, workflow platform, simulation or immersive-technology company, education-technology business, or a bounded internal transformation programme.</p>
            <p>Typical decisions include an AI feature, internal AI system, automation programme, product pivot, platform investment, significant rebuild, pilot-to-scale move, technical operating model, or technology-enabled market expansion.</p>
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
            <h2 id="boundary-title">Independent review, separate from strategy and implementation.</h2>
          </div>
          <div className="prose-block">
            <p>The practice reviews whether the combined investment case supports the commitment being requested. Operating the initiative, selling the implementation, auditing the company, and certifying the technology are outside its scope.</p>
            <p>The opinion remains independent of project approval and of any later delivery appointment.</p>
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
