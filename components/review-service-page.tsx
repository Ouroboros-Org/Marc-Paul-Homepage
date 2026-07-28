import Link from "next/link";
import { ArrowRight, Check, CircleOff, FileText, KeyRound } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { absoluteUrl } from "@/lib/site";

export type ServicePageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  status: string;
  duration: string;
  fee: string;
  decision: string;
  introduction: readonly string[];
  decisionExamples: readonly string[];
  reviewAreas: readonly { title: string; description: string }[];
  outputs: readonly { title: string; description: string }[];
  prerequisites: readonly string[];
  notIncluded: readonly string[];
  related: readonly { label: string; href: string; description: string }[];
  ctaTitle: string;
  ctaText: string;
};

export function ReviewServicePage({ content }: { content: ServicePageContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    description: content.lead,
    url: absoluteUrl(`/reviews/${content.slug}`),
    provider: {
      "@type": "ProfessionalService",
      name: "Marc Paul, Decision Integrity Practice",
      url: absoluteUrl("/")
    },
    areaServed: ["Europe", "International"],
    serviceType: content.title
  };

  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        breadcrumbs={[{ label: "Reviews", href: "/reviews" }, { label: content.title }]}
        actions={
          <>
            <CtaButton href="/request-a-review" icon={<ArrowRight size={17} />}>
              Request this service
            </CtaButton>
            <CtaButton href="/situations" variant="secondary" icon={<ArrowRight size={17} />}>
              Check when it fits
            </CtaButton>
          </>
        }
        aside={
          <dl className="service-summary">
            <div>
              <dt>Scope</dt>
              <dd>{content.status}</dd>
            </div>
            <div>
              <dt>Timing</dt>
              <dd>{content.duration}</dd>
            </div>
            <div>
              <dt>Fee range</dt>
              <dd>{content.fee}</dd>
            </div>
          </dl>
        }
      />

      <section className="section section-tight" aria-labelledby="decision-title">
        <div className="shell service-decision-grid">
          <div className="service-decision-statement">
            <p className="section-kicker">The decision</p>
            <h2 id="decision-title">{content.decision}</h2>
          </div>
          <div className="prose-block">
            {content.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="examples-title">
        <div className="shell">
          <SectionHeading
            kicker="Decisions covered"
            title="Decisions this service can address."
            id="examples-title"
          />
          <ul className="decision-example-grid">
            {content.decisionExamples.map((example, index) => (
              <li key={example}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{example}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="areas-title">
        <div className="shell">
          <SectionHeading
            kicker="Scope of review"
            title="What the service examines."
            id="areas-title"
            intro={<p>The work stays tied to the defined commitment. Its depth depends on the available evidence and the exposure involved.</p>}
          />
          <div className="review-area-grid">
            {content.reviewAreas.map((area, index) => (
              <article key={area.title}>
                <span className="item-index">R-{String(index + 1).padStart(2, "0")}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="outputs-title">
        <div className="shell">
          <SectionHeading
            kicker="Deliverables"
            title="What the decision owner receives."
            id="outputs-title"
          />
          <div className="output-list">
            {content.outputs.map((output, index) => (
              <article key={output.title}>
                <FileText size={20} strokeWidth={1.5} aria-hidden="true" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{output.title}</h3>
                  <p>{output.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="access-title">
        <div className="shell requirements-grid">
          <div>
            <p className="section-kicker">Access and limits</p>
            <h2 id="access-title">What the service needs, and what it excludes.</h2>
          </div>
          <div className="requirements-column">
            <h3><KeyRound size={19} aria-hidden="true" /> What is required</h3>
            <ul>
              {content.prerequisites.map((item) => (
                <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="requirements-column is-muted">
            <h3><CircleOff size={19} aria-hidden="true" /> Not included</h3>
            <ul>
              {content.notIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="related-title">
        <div className="shell">
          <SectionHeading kicker="Related services" title="The state of the case determines the service." id="related-title" />
          <div className="related-grid">
            {content.related.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>{item.label}</span>
                <p>{item.description}</p>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel title={content.ctaTitle} text={content.ctaText} />
    </main>
  );
}
