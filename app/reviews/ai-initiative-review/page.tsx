import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CircleDollarSign, Database, ShieldAlert, UserRoundCheck, FileCheck2 } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent AI Initiative & Production Readiness Review",
  description:
    "Independent review of an AI business case, production-readiness decision, automation programme, or AI product investment before funding, deployment, or scale.",
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
    text: "Whether the problem warrants AI and the proposed system can perform the task under ordinary operating conditions."
  },
  {
    icon: Database,
    title: "Evaluation and data",
    text: "Whether the evaluation represents actual use, together with data suitability, permission, access, quality, and upkeep."
  },
  {
    icon: UserRoundCheck,
    title: "Human work",
    text: "Review, correction, escalation, support, and service work that remains after deployment, including work omitted from the proposal."
  },
  {
    icon: CircleDollarSign,
    title: "Production economics",
    text: "Model, infrastructure, integration, support, monitoring, and oversight costs at the proposed volume and service level."
  },
  {
    icon: ShieldAlert,
    title: "Reliability and containment",
    text: "Which failures matter, how they will be detected and corrected, and how far an unreliable output can travel."
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
        eyebrow="AI investment and production-readiness review"
        title="Independent AI review before funding, production, or scale."
        lead="I assess whether the commercial, product, technical, data, operating, and governance evidence supports a defined AI commitment."
        breadcrumbs={[
          { label: "Reviews", href: "/reviews" },
          { label: "AI initiatives" }
        ]}
        actions={
          <>
            <Button href="/request-a-review" icon={<FileCheck2 size={17} />} isCta={true}>
              Request an AI review
            </Button>
            <Button
              href="/reviews/independent-initiative-review"
              variant="secondary"
              icon={<ArrowRight size={17} />}
            >
              See the main engagement
            </Button>
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
            <h2 id="demo-title">A successful pilot does not establish production readiness.</h2>
          </div>
          <div className="prose-block">
            <p>Production introduces reliability requirements, edge cases, correction work, integration and inference cost, monitoring, data restrictions, customer impact, and accountability that a limited demonstration may not test.</p>
            <p>The review assesses the proposed task under its intended operating conditions and sets out what the available evidence supports before the organisation commits.</p>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="ai-areas-title">
        <div className="shell">
          <SectionHeading
            kicker="AI-specific review areas"
            title="The operating model belongs in the investment case."
            id="ai-areas-title"
            intro={<p>The wider review also covers demand, product fit, delivery, economics, exposure, alternatives, and approval conditions.</p>}
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
            <h2 id="dependencies-title">Control, accountability, and exit conditions must be explicit.</h2>
          </div>
          <div className="prose-block">
            <p>For AI agents with tool access, role definition, bounded permissions, relevant context, auditability, and accountable oversight are operating requirements. Flexibility does not remove the need for a controlled working boundary.</p>
            <p>The review also requires named responsibility for performance, incidents, overrides, monitoring, vendor changes, and retirement. Legal, security, privacy, or compliance review may be required; I assess whether those questions have owners and evidence but do not provide legal opinions or assurance certification.</p>
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
        title="Review the AI case before approving production scope and cost."
        text="Send the decision, current evidence, proposed deployment, and approval date for an initial fit assessment."
      />
    </main>
  );
}
