import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Eye, Scale, ShieldCheck, FileCheck2 } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading } from "@/components/site-ui";

export const metadata: Metadata = {
  title: "Technology Review Process and Standards",
  description:
    "The evidence, decision analysis, independence, information handling, and professional standards used in an independent AI or software initiative review.",
  alternates: { canonical: "/approach" },
  openGraph: {
    title: "Technology Review Process and Standards",
    description: "How evidence, alternatives, uncertainty, disagreement, independence, and scope are handled in an initiative review.",
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
    text: "Trace how the stated problem, proposed product, adoption, delivery, economics, and risks are expected to produce the result."
  },
  {
    title: "Examine the supporting evidence",
    text: "Identify the claims carrying the decision, assess the supporting evidence, and consider the cost of discovering a weak assumption too late."
  },
  {
    title: "Compare real alternatives",
    text: "Compare full approval with staged funding, narrower scope, another test, buying, partnering, waiting, the current process, or closure."
  },
  {
    title: "Give the opinion",
    text: "State the recommendation, any conditions, the owner of each next action, the evidence still required, and the next decision date."
  }
] as const;

export default function ApproachPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Review process and standards"
        title="A transparent review process for material technology decisions."
        lead="Each engagement is scoped around one decision. The final record distinguishes evidence from professional judgement, states what remains outside scope, and preserves material disagreement."
        breadcrumbs={[{ label: "Approach" }]}
        actions={
          <>
            <Button
              href="/reviews/independent-initiative-review"
              icon={<ArrowRight size={17} />}
            >
              See the main review
            </Button>
            <Button
              href="/request-a-review"
              icon={<FileCheck2 size={17} />}
              isCta={true}
            >
              Request a review
            </Button>
          </>
        }
      />

      <section className="section section-tight" aria-labelledby="sequence-title">
        <div className="shell">
          <SectionHeading
            kicker="From brief to opinion"
            title="The decision defines the review."
            id="sequence-title"
            intro={<p>Scope depends on the evidence, stakeholder access, deadline, and exposure. The final record states what was reviewed and what remains unresolved.</p>}
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
            <p>Evidence is assessed for source, method, recency, representativeness, observed behaviour, and whether another person could reconstruct the factual basis.</p>
          </article>
          <article>
            <Scale size={24} strokeWidth={1.5} aria-hidden="true" />
            <p className="card-label">Judgment</p>
            <h2>Material uncertainty stays visible.</h2>
            <p>Scores can organise issues, but they cannot turn assumptions into probabilities. The record covers consequence, evidence quality, discovery delay, and difficulty of reversal.</p>
          </article>
          <article>
            <ShieldCheck size={24} strokeWidth={1.5} aria-hidden="true" />
            <p className="card-label">Disagreement</p>
            <h2>A material disagreement belongs in the record.</h2>
            <p>Participants can correct facts and submit better evidence. Any important difference that remains is kept visible to the decision owner.</p>
          </article>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="independent-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Independence</p>
            <h2 id="independent-title">No commercial interest in implementation or approval.</h2>
          </div>
          <div className="prose-block">
            <p>I earn no implementation fee, software revenue, recruitment commission, vendor incentive, referral fee, success fee, or equity from an organisation I review.</p>
            <p>I disclose a potential conflict before work begins. The client appoints any outside specialist.</p>
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
            <h2 id="information-title">Information access is limited to the agreed scope.</h2>
          </div>
          <div className="prose-block">
            <p>Where practical, I work in the client&apos;s controlled environment. I exclude unnecessary personal information and agree retention before any transfer.</p>
            <p>I request source code, personal data, or trade secrets only when the agreed scope requires them. I do not publish client information without written permission.</p>
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
            <p>I cannot guarantee market success, product adoption, investment return, delivery performance, legal compliance, security, model accuracy, or future competitive conditions.</p>
            <p>The client remains responsible for the information supplied, the final decision, implementation, legal and regulatory duties, specialist advice, and subsequent monitoring.</p>
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
