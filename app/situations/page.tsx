import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileCheck2 } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading } from "@/components/site-ui";
import { situations } from "@/lib/site";

export const metadata: Metadata = {
  title: "When an AI or Software Initiative Needs Independent Review",
  description:
    "Independent review at five decision points: approval, production, programme drift, renewed funding, and restructuring or closure.",
  alternates: { canonical: "/situations" },
  openGraph: {
    title: "When an AI or Software Initiative Needs Independent Review",
    description: "Choose the right review before the next material commitment is made.",
    url: "/situations"
  }
};

export default function SituationsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="When to commission a review"
        title="Bring me the decision while realistic alternatives remain."
        lead="I review a defined AI or software decision with a named owner, a deadline, evidence to examine, and consequences worth an outside view. I can also record unresolved disagreement before approval."
        breadcrumbs={[{ label: "Situations" }]}
        actions={
          <>
            <Button href="/request-a-review" icon={<FileCheck2 size={17} />} isCta={true}>
              Send the decision
            </Button>
            <Button href="/reviews" variant="secondary" icon={<ArrowRight size={17} />}>
              Compare the reviews
            </Button>
          </>
        }
      />

      <section className="section section-tight" aria-labelledby="moments-title">
        <div className="shell">
          <SectionHeading
            kicker="Five common decision points"
            title="Start with the decision now due."
            id="moments-title"
            intro={<p>I start with the commitment being considered, the evidence available, and the consequences of getting the decision wrong.</p>}
          />
          <div className="situation-detail-list">
            {situations.map((situation) => (
              <article key={situation.id} id={situation.id}>
                <div className="situation-detail-number">{situation.number}</div>
                <div className="situation-detail-copy">
                  <p className="card-label">{situation.title}</p>
                  <h2>{situation.summary}</h2>
                  <div>
                    <p className="mini-title">Signals that an independent view may help</p>
                    <ul>
                      {situation.signals.map((signal) => (
                        <li key={signal}><Check size={16} aria-hidden="true" />{signal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="situation-detail-action">
                  <span>Service fit</span>
                  <strong>{situation.review}</strong>
                  <Link className="text-link" href={situation.href}>
                    See this service <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="not-yet-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">When this is too early</p>
            <h2 id="not-yet-title">I do not review an idea before there is a decision to make.</h2>
          </div>
          <div className="prose-block">
            <p>An undeveloped idea with no material commitment at stake is too early. I do not provide general coaching, innovation workshops, implementation help, or confirmation of a preferred answer.</p>
            <p>The work becomes relevant when there is a defined decision, a responsible owner, a deadline, evidence to examine, and consequences that warrant an outside view.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="brief-title">
        <div className="shell brief-panel">
          <div>
            <p className="section-kicker">The initial brief</p>
            <h2 id="brief-title">I need the choice in one sentence.</h2>
          </div>
          <blockquote>
            Should the company fund the proposed move of its customer-support AI pilot into production across three markets?
          </blockquote>
          <p>“Review our AI strategy” is too broad. I need the decision, initiative, deadline, commitment, owner, evidence, sponsor, and reporting context.</p>
          <Button href="/request-a-review" icon={<ArrowRight size={17} />}>
            Start the request
          </Button>
        </div>
      </section>

      <CtaPanel
        title="Define the commitment before it is approved."
        text="Send the choice, deadline, evidence available, and consequences involved. I will tell you whether an independent review fits the decision."
      />
    </main>
  );
}
