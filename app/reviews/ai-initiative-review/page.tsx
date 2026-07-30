import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CircleDollarSign, Database, ShieldAlert, UserRoundCheck, FileCheck2 } from "lucide-react";
import { Button } from "@/components/button";
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
    text: "I ask whether the problem warrants AI and whether the proposed system can perform the task under ordinary operating conditions."
  },
  {
    icon: Database,
    title: "Evaluation and data",
    text: "I check whether the evaluation represents actual use, then examine data suitability, permission, access, quality, and upkeep."
  },
  {
    icon: UserRoundCheck,
    title: "Human work",
    text: "I account for review, correction, escalation, support, and service work that remains after deployment, including work omitted from the proposal."
  },
  {
    icon: CircleDollarSign,
    title: "Production economics",
    text: "I calculate model, infrastructure, integration, support, monitoring, and oversight costs at the proposed volume and service level."
  },
  {
    icon: ShieldAlert,
    title: "Reliability and containment",
    text: "I identify which failures matter, how the organisation will detect and correct them, and how far a poor output can travel."
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
        title="I review the AI investment before funding or scale."
        lead="I test whether the evidence supports a defined AI funding, production, expansion, or continuation decision. I include the operating work and dependencies that a model demo may leave out."
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
            <h2 id="demo-title">A demo answers a narrow question.</h2>
          </div>
          <div className="prose-block">
            <p>A convincing demonstration may reveal little about model instability, edge cases, correction work, integration and inference cost, monitoring, legal restrictions, user trust, or responsibility for a wrong output.</p>
            <p>I test the proposed task under its operating conditions and record what the evidence can support before the organisation commits.</p>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="ai-areas-title">
        <div className="shell">
          <SectionHeading
            kicker="AI-specific review areas"
            title="The work around the model belongs in the case."
            id="ai-areas-title"
            intro={<p>I also cover demand, product fit, delivery, economics, exposure, alternatives, and approval conditions.</p>}
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
            <h2 id="dependencies-title">I want to know who can change, suspend, or stop the system.</h2>
          </div>
          <div className="prose-block">
            <p>I treat an agent with tool access much like an external contractor. It needs a clear job, bounded permissions, relevant context, a task record, and someone who checks completion. A flexible system still needs a safe operating space.</p>
            <p>I also look for named responsibility for performance, incidents, overrides, monitoring, vendor changes, and retirement. Legal, security, privacy, or compliance review may be required; I check whether those questions have owners and evidence, but I do not provide a legal opinion or assurance certification.</p>
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
        title="Ask me to review the case before approving AI production scope and cost."
        text="Send me the decision, current evidence, proposed deployment, and approval date."
      />
    </main>
  );
}
