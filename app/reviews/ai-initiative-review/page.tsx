import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CircleDollarSign, Database, ShieldAlert, UserRoundCheck } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent AI Initiative Review for Funding and Scale Decisions",
  description:
    "Independent review of an AI business case, pilot-to-production decision, automation programme, or AI product investment before material commitment.",
  keywords: [
    "AI initiative review",
    "AI investment review",
    "AI business case review",
    "AI pilot to production",
    "AI project due diligence",
    "AI production readiness"
  ],
  alternates: { canonical: "/reviews/ai-initiative-review" },
  openGraph: {
    title: "Independent AI Initiative Review",
    description: "Examine the full operating case before an AI initiative receives funding, enters production, or scales.",
    url: "/reviews/ai-initiative-review"
  }
};

const areas = [
  {
    icon: Bot,
    title: "Problem and capability",
    text: "Does the problem warrant AI, and can the proposed system perform the task under ordinary operating conditions?"
  },
  {
    icon: Database,
    title: "Evaluation and data",
    text: "Do evaluations represent actual use? The review also covers data suitability, permission, access, quality, and upkeep."
  },
  {
    icon: UserRoundCheck,
    title: "Human work",
    text: "The review, correction, escalation, support, and service work that remain after deployment, including work omitted from the proposal."
  },
  {
    icon: CircleDollarSign,
    title: "Production economics",
    text: "Model, infrastructure, integration, support, monitoring, and oversight costs at the proposed volume and service level."
  },
  {
    icon: ShieldAlert,
    title: "Reliability and containment",
    text: "Which failures matter, how the organisation will detect and correct them, and how far a poor output can travel."
  }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Independent Initiative Review for AI initiatives",
  description: metadata.description,
  url: absoluteUrl("/reviews/ai-initiative-review"),
  provider: {
    "@type": "ProfessionalService",
    name: "Marc Paul, Decision Integrity Practice",
    url: absoluteUrl("/")
  },
  serviceType: "Independent Initiative Review"
};

export default function AiInitiativeReviewPage() {
  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow="Independent Initiative Review / AI application"
        title="Review the AI investment before funding or scale."
        lead="The Independent Initiative Review tests whether the evidence supports a defined AI funding, production, expansion, or continuation decision. It covers the operating work and dependencies that a model demo may leave out."
        breadcrumbs={[
          { label: "Reviews", href: "/reviews" },
          { label: "AI initiatives" }
        ]}
        actions={
          <>
            <CtaButton href="/request-a-review" icon={<ArrowRight size={17} />}>
              Request an AI review
            </CtaButton>
            <CtaButton
              href="/reviews/independent-initiative-review"
              variant="secondary"
              icon={<ArrowRight size={17} />}
            >
              See the main engagement
            </CtaButton>
          </>
        }
        aside={
          <div className="ai-aside">
            <p className="card-label">Common decision</p>
            <p>Should the organisation move this AI pilot into production at the proposed scope and cost?</p>
            <dl>
              <div><dt>Format</dt><dd>Independent Initiative Review</dd></div>
              <div><dt>Possible opinion</dt><dd>Proceed, add conditions, stage, rework, pause, or stop</dd></div>
            </dl>
          </div>
        }
      />

      <section className="section section-tight" aria-labelledby="demo-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">From pilot to production</p>
            <h2 id="demo-title">Pilot evidence has a narrow boundary.</h2>
          </div>
          <div className="prose-block">
            <p>A convincing demonstration may reveal little about model instability, edge cases, correction work, integration and inference cost, monitoring, legal restrictions, user trust, or responsibility for a wrong output.</p>
            <p>The review tests the proposed task under its operating conditions and records what the evidence can support before the organisation commits.</p>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="ai-areas-title">
        <div className="shell">
          <SectionHeading
            kicker="AI-specific review areas"
            title="The work required to run the model belongs in the case."
            id="ai-areas-title"
            intro={<p>The wider engagement still covers demand, product fit, delivery, economics, exposure, alternatives, and approval conditions.</p>}
          />
          <div className="ai-area-grid">
            {areas.map((area, index) => {
              const Icon = area.icon;
              return (
                <article key={area.title}>
                  <div><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><span>A-{String(index + 1).padStart(2, "0")}</span></div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="dependencies-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Dependencies and accountability</p>
            <h2 id="dependencies-title">Model and vendor change need named owners.</h2>
          </div>
          <div className="prose-block">
            <p>An AI initiative needs named responsibility for performance, incidents, overrides, monitoring, vendor changes, and retirement. The case must also address material dependencies outside the organisation&apos;s control.</p>
            <p>Legal, security, privacy, and compliance review may be required. This service checks whether those matters have owners and evidence. It does not provide a legal opinion or AI assurance certification.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="decisions-title">
        <div className="shell">
          <SectionHeading kicker="Suitable decisions" title="Use the review at a defined approval point." id="decisions-title" />
          <div className="decision-example-grid">
            {[
              "Approve or decline an AI product investment",
              "Move an AI pilot into production",
              "Expand an internal automation programme",
              "Increase headcount or infrastructure commitment",
              "Sign or renew a material AI vendor contract",
              "Continue, narrow, pause, or close an AI programme"
            ].map((decision, index) => (
              <div key={decision}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{decision}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="read-title">
        <div className="shell related-copy-panel">
          <div>
            <p className="section-kicker">Related reading</p>
            <h2 id="read-title">What changes when an AI pilot enters production?</h2>
          </div>
          <div>
            <p>A decision note on evidence boundaries, operating cost, failure handling, ownership, and staged funding.</p>
            <Link className="text-link" href="/blog/ai-pilot-to-production-decision">
              Read the pilot-to-production guide <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Request an Independent Initiative Review before approving AI production scope and cost."
        text="Send the decision, current evidence, proposed deployment, and approval date."
      />
    </main>
  );
}
