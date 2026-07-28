import type { Metadata } from "next";
import { ArrowRight, FileCheck2, Globe2, LockKeyhole } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { CtaPanel, PageHero, SectionHeading } from "@/components/site-ui";

export const metadata: Metadata = {
  title: "Initiative Review Cases and Sample Decision Records",
  description:
    "Illustrative initiative reviews, public-source decision reconstructions, and clearly labelled anonymised work from the Decision Integrity Practice.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Initiative Review Cases and Sample Decision Records",
    description: "Every published case states the evidence on which it is based.",
    url: "/cases"
  }
};

export default function CasesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Cases and decision records"
        title="Every published case states what kind of evidence it contains."
        lead="The library distinguishes constructed samples, public-source reconstructions, and client work published with permission. Each case carries its own evidence label."
        breadcrumbs={[{ label: "Cases" }]}
        actions={
          <CtaButton href="/cases/sample-ai-pilot" icon={<ArrowRight size={17} />}>
            Read the sample review
          </CtaButton>
        }
      />

      <section className="section section-tight" aria-labelledby="sample-title">
        <div className="shell">
          <SectionHeading
            kicker="Illustrative review"
            title="A customer-support AI pilot reaches its production decision."
            id="sample-title"
            intro={<p>This constructed case is not client work. It shows the scope and output of an Independent Initiative Review using a fictional company, invented figures, and fictional circumstances.</p>}
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
              <CtaButton href="/cases/sample-ai-pilot" icon={<ArrowRight size={17} />}>
                Read the sample case
              </CtaButton>
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
          <SectionHeading kicker="Publishing standard" title="The case label tells you what the evidence can support." id="labels-title" />
          <div className="case-type-grid">
            <article>
              <FileCheck2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Illustrative sample</h3>
              <p>A constructed scenario that shows the review format. It makes no claim about completed client work or a client outcome.</p>
            </article>
            <article>
              <Globe2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Public-source reconstruction</h3>
              <p>An analysis based on named public sources. It distinguishes published fact, reported claim, interpretation, inference, and unanswered questions.</p>
            </article>
            <article>
              <LockKeyhole size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Anonymised client work</h3>
              <p>Published only with written permission. The account includes enough context to be useful while protecting confidential information and limiting outcome claims.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="claims-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Claims about client work</p>
            <h2 id="claims-title">Published claims stop where the evidence stops.</h2>
          </div>
          <div className="prose-block">
            <p>Client outcomes are published only with supporting evidence and permission. Finding a concern does not prove that the review prevented a failure, changed a board decision, or saved a stated amount.</p>
            <p>Each published case should stand on its own as a useful decision record.</p>
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
