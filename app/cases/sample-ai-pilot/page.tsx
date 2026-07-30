import type { Metadata } from "next";
import { ArrowRight, Check, CircleAlert, FileText } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Illustrative AI Pilot-to-Production Initiative Review",
  description:
    "A fictional Independent Initiative Review of a customer-support AI pilot, covering evidence, production economics, alternatives, conditions, and the final opinion.",
  alternates: { canonical: "/cases/sample-ai-pilot" },
  openGraph: {
    title: "Illustrative AI Pilot-to-Production Initiative Review",
    description: "A constructed decision record using a fictional company, figures, and circumstances.",
    url: "/cases/sample-ai-pilot"
  }
};

const assumptions = [
  {
    claim: "Support agents will use the AI-assisted workflow for routine requests.",
    evidence: "Invited pilot agents used it frequently each week. Ordinary production onboarding has not been tested.",
    confidence: "Partially supported",
    exposure: "Usage may fall when dedicated pilot support ends."
  },
  {
    claim: "The system will reduce handling cost at production volume.",
    evidence: "The estimate includes model and infrastructure costs. It excludes correction and escalation work.",
    confidence: "Weakly supported",
    exposure: "The expected saving may disappear once all human work is counted."
  },
  {
    claim: "Answer quality will remain acceptable across the intended request types.",
    evidence: "The system performed well on a curated test set that excluded complex billing and cancellation cases.",
    confidence: "Partially supported",
    exposure: "Poor answers could reach customers in high-consequence cases."
  },
  {
    claim: "The current team can operate and monitor the production service.",
    evidence: "The proposal names no incident owner, review rota, or monitoring budget.",
    confidence: "Unsupported",
    exposure: "Failures may go unnoticed or add unplanned work for support leads."
  }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Illustrative AI Pilot-to-Production Initiative Review",
  url: absoluteUrl("/cases/sample-ai-pilot"),
  author: { "@type": "Person", name: "Marc Paul", url: absoluteUrl("/about") },
  about: ["AI pilot to production", "AI investment decision", "Independent Initiative Review"],
  isBasedOn: "Constructed example; no client engagement"
};

export default function SampleAiPilotPage() {
  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow="Constructed example / Not client work"
        title="Should the company move its customer-support AI pilot into production?"
        lead="I built this sample to show how I would review a pilot seeking production funding. The company, figures, evidence, and circumstances are fictional."
        breadcrumbs={[
          { label: "Cases", href: "/cases" },
          { label: "Illustrative AI Pilot" }
        ]}
        actions={
          <>
            <Button href="#opinion" icon={<ArrowRight size={17} />}>
              Go to the opinion
            </Button>
            <Button
              href="/reviews/independent-initiative-review"
              variant="secondary"
              icon={<ArrowRight size={17} />}
            >
              See the review service
            </Button>
          </>
        }
        aside={
          <dl className="service-summary">
            <div><dt>Case type</dt><dd>Illustrative sample</dd></div>
            <div><dt>Decision</dt><dd>Pilot to production</dd></div>
            <div><dt>Opinion</dt><dd>Release funding in stages</dd></div>
          </dl>
        }
      />

      <section className="sample-notice" aria-label="Status of this case">
        <div className="shell">
          <CircleAlert size={19} aria-hidden="true" />
          <p><strong>This case is entirely fictional.</strong> I use it to show the form of the work. It does not describe a client, a real company, or a completed engagement.</p>
        </div>
      </section>

      <section className="section section-tight" aria-labelledby="context-title">
        <div className="shell case-context-grid">
          <div>
            <p className="section-kicker">01 / Context</p>
            <h2 id="context-title">I start with the commitment behind the positive pilot.</h2>
          </div>
          <div className="prose-block">
            <p>A fictional B2B software company tested an AI assistant that drafts replies to routine support requests. Twenty invited agents used it for eight weeks. Average first-response time fell, the agents responded positively, and the executive sponsor now wants production funding.</p>
            <p>The proposal connects the assistant to live customer data, extends it to 160 agents in three markets, signs a two-year vendor contract, and reduces planned support hiring. The CFO owns the decision; the CEO sponsors it.</p>
          </div>
          <dl className="case-facts">
            <div><dt>Commitment requested</dt><dd>$1.2m production budget and a two-year vendor contract</dd></div>
            <div><dt>Intended result</dt><dd>Lower handling cost without reducing customer satisfaction</dd></div>
            <div><dt>Decision due</dt><dd>Before the next annual planning cycle</dd></div>
            <div><dt>Alternatives</dt><dd>Full rollout, staged rollout, a narrower test, non-AI workflow improvements, or delay</dd></div>
          </dl>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="case-title">
        <div className="shell">
          <SectionHeading
            kicker="02 / Investment case"
            title="I separate the claims carrying the investment case."
            id="case-title"
            intro={<p>The expected return depends on usage, correction work, production cost, integration, customer acceptance, and accountable operation. The pilot does not settle all of them.</p>}
          />
          <ol className="investment-chain">
            {[
              "Routine support work is substantial enough to justify the investment.",
              "The assistant produces usable drafts across ordinary production cases.",
              "Agents use it without creating unmeasured review and correction work.",
              "The proposed use of customer data meets contractual and privacy requirements.",
              "The team can integrate, monitor, support, and contain the service.",
              "Total production cost stays below the handling cost it removes.",
              "The company can tell whether the benefit lasts after rollout."
            ].map((item, index) => (
              <li key={item}><span>{index + 1}</span><p>{item}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="assumptions-title">
        <div className="shell">
          <SectionHeading
            kicker="03 / Load-bearing assumptions"
            title="Four claims carry most of this production case."
            id="assumptions-title"
          />
          <div className="assumption-table" role="table" aria-label="Record of material assumptions">
            <div className="assumption-header" role="row">
              <span role="columnheader">Assumption</span>
              <span role="columnheader">Evidence</span>
              <span role="columnheader">Confidence</span>
              <span role="columnheader">Exposure</span>
            </div>
            {assumptions.map((item) => (
              <div className="assumption-row" role="row" key={item.claim}>
                <p role="cell">{item.claim}</p>
                <p role="cell">{item.evidence}</p>
                <p role="cell"><span className="confidence-state">{item.confidence}</span></p>
                <p role="cell">{item.exposure}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="exposure-title">
        <div className="shell exposure-grid">
          <div>
            <p className="section-kicker">04 / Exposure</p>
            <h2 id="exposure-title">I do not accept the cost case while correction work remains uncounted.</h2>
          </div>
          <div className="prose-block">
            <p>The financial model removes planned hires but leaves out the pilot team&apos;s correction work. Its production saving has therefore not been observed under ordinary operating conditions.</p>
            <p>After a full rollout, support teams could absorb extra work while headline response time still improves. That would delay discovery. The proposed two-year vendor term would also make a change of course more expensive.</p>
          </div>
          <ul className="exposure-list">
            <li><span>Consequence</span><strong>Material</strong><p>The saving and staffing plan may be wrong.</p></li>
            <li><span>Evidence gap</span><strong>High</strong><p>The pilot did not record manual work.</p></li>
            <li><span>Time to discover</span><strong>Medium to high</strong><p>Extra work can disappear into normal support activity.</p></li>
            <li><span>Difficulty of reversal</span><strong>High</strong><p>The vendor contract and rollout would be costly to unwind.</p></li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="alternatives-title">
        <div className="shell">
          <SectionHeading kicker="05 / Alternatives" title="I compare full rollout with options that preserve room to change course." id="alternatives-title" />
          <div className="alternative-grid">
            {[
              ["Full approval", "Release the full budget and sign the proposed vendor contract.", "Evidence does not support it"],
              ["Staged production", "Deploy in one market for two defined request categories, with explicit measurement.", "Supportable with conditions"],
              ["Narrower test", "Extend the pilot to measure correction work and performance on high-consequence cases.", "Credible fallback"],
              ["Non-AI improvement", "Improve routing and knowledge retrieval without automated draft generation.", "Retain as an option"]
            ].map(([title, text, state], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3><p>{text}</p><strong>{state}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="conditions-title">
        <div className="shell">
          <SectionHeading kicker="06 / Conditions" title="I attach a staged release to evidence from ordinary operations." id="conditions-title" />
          <div className="conditions-register">
            {[
              ["C-01", "Use", "At least 80% of eligible agents use the workflow each week for six consecutive weeks without dedicated pilot support."],
              ["C-02", "Human work", "Median correction and review time remains below four minutes per completed case, including escalations."],
              ["C-03", "Economics", "Measured model, infrastructure, support, and oversight cost remains below 60% of avoided handling cost."],
              ["C-04", "Containment", "Billing, cancellation, and account-access cases stay outside automated drafting until a representative evaluation is approved."],
              ["C-05", "Ownership", "Before launch, named owners accept responsibility for performance, incidents, vendor changes, overrides, and retirement."],
              ["C-06", "Next decision", "After eight production weeks, the CFO reviews the evidence before rollout in a second market or any longer vendor term."]
            ].map(([code, title, text]) => (
              <article key={code}>
                <span>{code}</span><div><h3>{title}</h3><p>{text}</p></div><Check size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="opinion" aria-labelledby="opinion-title">
        <div className="shell opinion-panel">
          <div className="opinion-state"><span>Opinion</span><strong>Release funding in stages</strong></div>
          <div>
            <h2 id="opinion-title">I would approve a bounded production step and withhold full-rollout funding.</h2>
            <p>The pilot shows useful drafts for selected agents handling routine cases. The evidence is insufficient on production economics, operating capacity, and customer exposure at the proposed scale.</p>
            <p>I would approve deployment in one market for the reviewed request categories. I would withhold the two-year vendor contract and retain planned support capacity until conditions C-01 through C-05 are met. The CFO should make the continuation decision after eight production weeks.</p>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="record-title">
        <div className="shell decision-record">
          <div>
            <FileText size={26} strokeWidth={1.5} aria-hidden="true" />
            <p className="section-kicker">07 / Decision record</p>
            <h2 id="record-title">I would give the decision owner this record.</h2>
          </div>
          <dl>
            <div><dt>Material reviewed</dt><dd>Pilot evidence, production proposal, cost model, vendor terms, evaluation summary, and stakeholder accounts.</dd></div>
            <div><dt>Outside scope</dt><dd>Source code, security testing, legal opinion, and independent verification of the pilot data supplied.</dd></div>
            <div><dt>Strongest evidence</dt><dd>The assistant produced useful drafts for routine cases represented in the pilot.</dd></div>
            <div><dt>Main weakness</dt><dd>The business case excluded the human work needed to produce the reported result.</dd></div>
            <div><dt>Decision owner</dt><dd>CFO.</dd></div>
            <div><dt>Next decision</dt><dd>After eight production weeks and before a second-market rollout or long-term vendor commitment.</dd></div>
          </dl>
        </div>
      </section>

      <CtaPanel
        title="Planning a real pilot-to-production decision?"
        text="Send the pilot evidence, proposed production commitment, decision owner, and deadline. I will assess whether the case is ready for independent review."
      />
    </main>
  );
}
