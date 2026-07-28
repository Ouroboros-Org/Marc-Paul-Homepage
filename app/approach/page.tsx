import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Eye, Scale, ShieldCheck } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { CtaPanel, PageHero, SectionHeading } from "@/components/site-ui";

export const metadata: Metadata = {
  title: "How Independent Initiative Reviews Are Conducted",
  description:
    "How an Independent Initiative Review examines evidence, handles disagreement, protects independence, and sets clear professional limits.",
  alternates: { canonical: "/approach" },
  openGraph: {
    title: "How Independent Initiative Reviews Are Conducted",
    description: "The working standards for evidence, judgment, disagreement, independence, and scope.",
    url: "/approach"
  }
};

const sequence = [
  {
    title: "Set out the decision",
    text: "Record the choice, its owner and deadline, the commitment requested, the intended result, and the consequences of acting or waiting."
  },
  {
    title: "Rebuild the proposal's logic",
    text: "Trace how the stated problem, proposed product, adoption, delivery, economics, and risks are meant to produce the result."
  },
  {
    title: "Examine the supporting evidence",
    text: "Identify the claims carrying the decision, then assess the evidence and the cost of finding out late that a claim was wrong."
  },
  {
    title: "Compare real alternatives",
    text: "Set full approval beside staged funding, a narrower scope, another test, buying, partnering, waiting, keeping the current process, or closing the work."
  },
  {
    title: "Give the opinion",
    text: "State the conclusion, any conditions, the owner of each next action, the evidence still required, and the next decision date."
  }
] as const;

export default function ApproachPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="How the review is conducted"
        title="How an Independent Initiative Review reaches an opinion."
        lead="The service examines one consequential decision and produces a traceable opinion. The decision owner can see the evidence used, the judgement applied, the limits of the work, and any unresolved disagreement."
        breadcrumbs={[{ label: "Approach" }]}
        actions={
          <>
            <CtaButton
              href="/reviews/independent-initiative-review"
              icon={<ArrowRight size={17} />}
            >
              See the main review
            </CtaButton>
            <CtaButton
              href="/request-a-review"
              variant="secondary"
              icon={<ArrowRight size={17} />}
            >
              Request a review
            </CtaButton>
          </>
        }
      />

      <section className="section section-tight" aria-labelledby="sequence-title">
        <div className="shell">
          <SectionHeading
            kicker="From brief to opinion"
            title="The decision sets the work."
            id="sequence-title"
            intro={<p>Scope depends on the evidence, stakeholder access, deadline, and exposure. The final record identifies what was reviewed and what remains unresolved.</p>}
          />
          <ol className="sequence-list">
            {sequence.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="evidence-title">
        <div className="shell principle-grid">
          <article>
            <Eye size={24} strokeWidth={1.5} aria-hidden="true" />
            <p className="card-label">Evidence</p>
            <h2 id="evidence-title">Each important claim needs support that fits it.</h2>
            <p>The review considers the source, method, recency, representativeness, observed behaviour, and whether another person could reconstruct the factual basis.</p>
          </article>
          <article>
            <Scale size={24} strokeWidth={1.5} aria-hidden="true" />
            <p className="card-label">Judgment</p>
            <h2>Material uncertainty stays visible.</h2>
            <p>Scores can organise issues, but they cannot turn assumptions into probabilities. The opinion records consequence, weak evidence, discovery delay, and difficulty of reversal.</p>
          </article>
          <article>
            <ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" />
            <p className="card-label">Disagreement</p>
            <h2>A material disagreement belongs in the record.</h2>
            <p>Participants can correct facts and submit better evidence. If an important difference remains, the decision owner sees it.</p>
          </article>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="independent-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Independence</p>
            <h2 id="independent-title">The fee does not depend on implementation.</h2>
          </div>
          <div className="prose-block">
            <p>The practice earns no implementation fee, software revenue, recruitment commission, vendor incentive, referral fee, partner success fee, or equity from an organisation under review.</p>
            <p>Any potential conflict is disclosed before work begins. The client appoints any outside specialist.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="conduct-title">
        <div className="shell boundaries-layout">
          <div>
            <p className="section-kicker">Professional conduct</p>
            <h2 id="conduct-title">Plain dealing, including when the evidence changes.</h2>
          </div>
          <ul className="check-list check-list-large">
            {[
              "Separate fact from advocacy",
              "Let management answer material findings",
              "Revise findings when better evidence appears",
              "Do not infer motives without evidence",
              "Keep the work proportionate to the decision",
              "State the conclusion and its limits"
            ].map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="information-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Information handling</p>
            <h2 id="information-title">Access is limited to what the decision requires.</h2>
          </div>
          <div className="prose-block">
            <p>Where practical, work stays in the client&apos;s controlled environment. Access is restricted to named reviewers, unnecessary personal information is excluded, and retention is agreed before transfer.</p>
            <p>Source code, personal data, and trade secrets are requested only when the agreed scope requires them. Client information is never published without written permission.</p>
            <Link className="text-link" href="/privacy">
              Read the website privacy notice <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="limits-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Limitations</p>
            <h2 id="limits-title">The opinion reflects the evidence available at the time.</h2>
          </div>
          <div className="prose-block">
            <p>The review cannot guarantee market success, product adoption, investment return, delivery performance, legal compliance, security, model accuracy, or future competitive conditions.</p>
            <p>The client remains responsible for the information supplied, the final decision, implementation, legal and regulatory duties, specialist advice, and subsequent monitoring.</p>
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
