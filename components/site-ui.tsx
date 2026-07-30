import Link from "next/link";
import {
  ArrowRight,
  MessageSquareText,
  FileCheck2
} from "lucide-react";
import { Button } from "@/components/button";

type Breadcrumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: readonly Breadcrumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`}>
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  actions,
  aside
}: {
  eyebrow: string;
  title: string;
  lead: string;
  breadcrumbs?: readonly Breadcrumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="shell">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className={`page-hero-grid${aside ? " has-aside" : ""}`}>
          <div className="page-hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
            <h1 id="page-title">{title}</h1>
            <p className="page-lede">{lead}</p>
            {actions ? <div className="hero-actions">{actions}</div> : null}
          </div>
          {aside ? <div className="page-hero-aside">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  id,
  align = "split"
}: {
  kicker: string;
  title: string;
  intro?: React.ReactNode;
  id?: string;
  align?: "split" | "stack";
}) {
  return (
    <header className={`section-heading section-heading-${align}`}>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {intro ? <div className="section-intro-copy">{intro}</div> : null}
    </header>
  );
}

export function ReviewCard({
  review,
  featured = false
}: {
  review: {
    label: string;
    title: string;
    description: string;
    decision: string;
    duration: string;
    href: string;
  };
  featured?: boolean;
}) {
  return (
    <article className={`review-card${featured ? " is-featured" : ""}`}>
      <div className="card-topline">
        <p className="card-label">{review.label}</p>
        {featured ? <span className="card-state">Primary service</span> : null}
      </div>
      <h3>{review.title}</h3>
      <p>{review.description}</p>
      <div className="review-question">
        <span>Decision</span>
        <p>{review.decision}</p>
      </div>
      <dl className="review-facts">
        <div>
          <dt>Timing</dt>
          <dd>{review.duration}</dd>
        </div>
      </dl>
      <Link className="text-link" href={review.href}>
        See the service <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CtaPanel({
  title = "Request an independent review before the next commitment.",
  text = "Send the initiative, decision, deadline, and evidence available for an initial assessment of service fit, required access, and scope."
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section cta-section" aria-labelledby="cta-title">
      <div className="shell">
        <div className="cta-panel">
          <div>
            <p className="section-kicker">Request a review</p>
            <h2 id="cta-title">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <Button
              href="/request-a-review"
              icon={<FileCheck2 size={17} />}
              isCta={true}
            >
              Request an initiative review
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              icon={<MessageSquareText size={17} />}
              isCta={true}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StructuredData({ data }: { data: Record<string, unknown> | readonly unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
