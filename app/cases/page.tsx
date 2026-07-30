import type { Metadata } from "next";
import { ArrowRight, FileCheck2, Globe2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading } from "@/components/site-ui";

export const metadata: Metadata = {
  title: "Initiative Review Cases and Sample Decision Records",
  description:
    "I publish illustrative reviews, public-source decision reconstructions, and clearly labelled anonymised work.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Initiative Review Cases and Sample Decision Records",
    description: "I state the evidence behind every published case.",
    url: "/cases"
  }
};

export default function CasesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Cases and decision records"
        title="I label every case by the evidence behind it."
        lead="I separate constructed samples, public-source reconstructions, and client work published with permission. The label tells you how far the account can be trusted."
        breadcrumbs={[{ label: "Cases" }]}
        actions={
          <Button href="/cases/sample-ai-pilot" icon={<ArrowRight size={17} />}>
            Read the sample review
          </Button>
        }
      />

      <section className="section section-tight" aria-labelledby="sample-title">
        <div className="shell">
          <SectionHeading
            kicker="Illustrative review"
            title="A customer-support AI pilot reaches its production decision."
            id="sample-title"
            intro={<p>I constructed this case to show the scope and output of an Independent Initiative Review. The company, figures, and circumstances are fictional.</p>}
          />
          <article className="case-feature">
            <div className="case-feature-state">
              <span>Illustrative sample</span>
              <span>AI / Pilot to production</span>
            </div>
            <div>
              <p className="card-label">Decision</p>
              <h3>Should the company release production funding for an AI support workflow after its pilot?</h3>
              <p>The sample sets out the investment case, decisive assumptions, evidence gaps, alternatives, approval conditions, opinion, and final decision record.</p>
              <Button href="/cases/sample-ai-pilot" icon={<ArrowRight size={17} />}>
                Read the sample case
              </Button>
            </div>
            <dl>
              <div><dt>Opinion</dt><dd>Release funding in stages</dd></div>
              <div><dt>Main evidence gap</dt><dd>Correction work was not counted</dd></div>
              <div><dt>Key condition</dt><dd>Measure production economics before scaling</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="labels-title">
        <div className="shell">
          <SectionHeading kicker="Publishing standard" title="I make the source of each case explicit." id="labels-title" />
          <div className="case-type-grid">
            <article>
              <FileCheck2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Illustrative sample</h3>
              <p>I use a constructed scenario to show the review format. It makes no claim about completed client work or a client outcome.</p>
            </article>
            <article>
              <Globe2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Public-source reconstruction</h3>
              <p>I base the analysis on named public sources and separate published fact, reported claim, interpretation, inference, and unanswered questions.</p>
            </article>
            <article>
              <LockKeyhole size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Anonymised client work</h3>
              <p>I publish client work only with written permission and enough context to be useful without exposing confidential information.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="claims-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Claims about client work</p>
            <h2 id="claims-title">I stop the claim where the evidence stops.</h2>
          </div>
          <div className="prose-block">
            <p>I publish a client outcome only with supporting evidence and permission. Finding a concern does not prove that my review prevented a failure, changed a board decision, or saved a stated amount.</p>
            <p>I want each published case to stand on its own as a useful decision record.</p>
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
