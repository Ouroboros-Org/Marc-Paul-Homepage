import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  FileSearch,
  Landmark,
  ShieldCheck
} from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { CtaButton } from "@/components/cta-button";
import { InteractiveRubiksCube } from "@/components/interactive-rubiks-cube";
import {
  CtaPanel,
  ReviewCard,
  SectionHeading,
  StructuredData
} from "@/components/site-ui";
import { audience, deliverables, reviews, reviewOutcomes, situations } from "@/lib/site";
import { featuredPosts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

const faqs = [
  {
    question: "What does an Independent Initiative Review examine?",
    answer:
      "It examines one defined AI or software initiative and the decision attached to it. The service covers the intended result, evidence for demand, product and technology fit, delivery conditions, full cost, material exposure, alternatives, and conditions for further commitment."
  },
  {
    question: "Who normally commissions a review?",
    answer:
      "The sponsor is usually a CEO, CFO, founder, board member, investor, or senior executive responsible for the capital or customer exposure involved. The final decision must still have a named owner or formal decision-making body."
  },
  {
    question: "How long does a review take?",
    answer:
      "An Independent Initiative Review usually takes five to ten working days once the relevant material and stakeholder access are confirmed. The timing can change with the scope, evidence volume, interview schedule, and reporting requirements."
  },
  {
    question: "Does the review replace technical, legal, or financial diligence?",
    answer:
      "No. The review tests the combined investment case and may identify a need for specialist legal, security, financial, or technical work. Legal opinions, audits, source-code reviews, security certification, and investment advice remain outside its scope."
  },
  {
    question: "Can the opinion recommend stopping the initiative?",
    answer:
      "Yes. The reviewer must be free to reach an unfavourable conclusion. The opinion may support proceeding, proceeding under conditions, staging the commitment, reworking the case, pausing, or stopping under the case currently presented."
  }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.marcpaul.tech/#person",
      name: "Marc Paul",
      url: "https://www.marcpaul.tech/about",
      email: "mailto:info@marcpaul.tech",
      jobTitle: "Independent AI and Software Initiative Reviewer",
      description:
        "Marc Paul is based in Malta and independently reviews consequential AI and software initiatives for international clients.",
      address: { "@type": "PostalAddress", addressCountry: "MT" },
      sameAs: ["https://mt.linkedin.com/in/marc-paul"]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.marcpaul.tech/#practice",
      name: "Marc Paul / Decision Integrity Practice",
      url: "https://www.marcpaul.tech",
      founder: { "@id": "https://www.marcpaul.tech/#person" },
      areaServed: ["Malta", "Europe", "International"],
      serviceType: [
        "Independent Initiative Review",
        "Decision Case Reconstruction",
        "Independent Continuation Review"
      ],
      email: "info@marcpaul.tech"
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    }
  ]
};

export default function Home() {
  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />

      <section className="home-hero" aria-labelledby="home-title">
        <div className="shell home-hero-shell">
          <div className="home-hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />Independent Initiative Review for AI and software</p>
            <h1 id="home-title">
              Get an independent opinion <br /><em>before you commit.</em>
            </h1>
            <p className="home-hero-lede">
              Marc Paul reviews one defined initiative before approval, funding, production, scale, or continuation. In 5–10 working days, you receive a written opinion to proceed, add conditions, stage the commitment, rework the case, pause, or stop.
            </p>
            <div className="hero-actions">
              <CtaButton
                href="/request-a-review"
                icon={<ArrowRight size={17} />}
              >
                Request an Initiative Review
              </CtaButton>
              <CtaButton
                href="/reviews/independent-initiative-review"
                variant="secondary"
                icon={<ArrowRight size={17} />}
              >
                See scope and deliverables
              </CtaButton>
            </div>
            <p className="hero-audience">For CEOs, CFOs, founders, boards, and investors responsible for the decision.</p>
          </div>
          <InteractiveRubiksCube />
        </div>
      </section>

      <section className="decision-moments" aria-label="When to commission a review">
        <div className="shell decision-moment-list">
          <span>Before approval</span>
          <i aria-hidden="true" />
          <span>Before production</span>
          <i aria-hidden="true" />
          <span>Before renewed funding</span>
          <i aria-hidden="true" />
          <span>After drift</span>
          <i aria-hidden="true" />
          <span>Before closure</span>
        </div>
      </section>

      <section className="section" aria-labelledby="primary-review-title">
        <div className="shell">
          <SectionHeading
            kicker="01 / Main engagement"
            title="An Independent Initiative Review before the next commitment."
            id="primary-review-title"
            intro={
              <>
                <p>
                  Commission the service when one defined approval, funding, production, scale, continuation, restructuring, or closure decision is due.
                </p>
                <p>
                  You receive a written opinion, any conditions attached to it, and a record of the evidence, alternatives, exposure, and unresolved points.
                </p>
              </>
            }
          />
          <div className="primary-review-panel">
            <div className="primary-review-copy">
              <p className="card-label">Independent Initiative Review</p>
              <h3>One decision sets the scope.</h3>
              <p>
                The engagement covers one initiative and the commitment being requested. Company-wide health checks sit outside its scope.
              </p>
              <ul className="check-list">
                <li>What must be true for the initiative to work</li>
                <li>Which conditions are supported, inferred, or disputed</li>
                <li>What the organisation is committing before uncertainty falls</li>
                <li>Which alternatives deserve serious consideration</li>
                <li>What must govern the next release of money, scope, or time</li>
              </ul>
              <CtaButton
                href="/reviews/independent-initiative-review"
                icon={<ArrowRight size={17} />}
              >
                Read about the Initiative Review
              </CtaButton>
            </div>
            <div className="outcome-panel">
              <p className="card-label">Possible opinions</p>
              <ol>
                {reviewOutcomes.map((outcome, index) => (
                  <li key={outcome}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {outcome}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="services-title">
        <div className="shell">
          <SectionHeading
            kicker="02 / Engagements"
            title="Choose the service by the state of the case."
            id="services-title"
            intro={<p>The Independent Initiative Review gives an opinion on the case presented. Decision Case Reconstruction rebuilds an incomplete case. Independent Continuation Review reassesses an active initiative before the next release.</p>}
          />
          <div className="review-grid">
            {reviews.map((review, index) => (
              <ReviewCard key={review.slug} review={review} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="package-title">
        <div className="shell">
          <SectionHeading
            kicker="03 / What you receive"
            title="A written opinion and the records behind it."
            id="package-title"
            intro={<p>The decision owner receives a concise account of the conclusion, conditions, evidence, disagreement, responsibilities, and next review point.</p>}
          />
          <div className="deliverable-grid">
            {deliverables.map((item, index) => (
              <article key={item.title} className="deliverable-card">
                <span className="item-index">D-{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="situations-title">
        <div className="shell">
          <SectionHeading
            kicker="04 / When a review is useful"
            title="Commission the review while credible alternatives remain."
            id="situations-title"
            intro={<p>The useful review point is before more money, scope, time, or customer exposure makes a change of course expensive.</p>}
          />
          <div className="situation-list">
            {situations.map((situation) => (
              <article key={situation.id} className="situation-row">
                <span>{situation.number}</span>
                <div>
                  <h3>{situation.title}</h3>
                  <p>{situation.summary}</p>
                </div>
                <Link href={`/situations#${situation.id}`} aria-label={`Read about ${situation.title}`}>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ai-review-title">
        <div className="shell ai-review-grid">
          <div>
            <p className="section-kicker">05 / AI initiatives</p>
            <h2 id="ai-review-title">A working demo does not settle the production case.</h2>
            <p className="large-copy">
              A pilot may omit the correction work, model instability, evaluation bias, inference cost, data restrictions, and monitoring required in production. The review also examines vendor dependency and who takes responsibility when outputs are wrong.
            </p>
            <CtaButton href="/reviews/ai-initiative-review" icon={<ArrowRight size={17} />}>
              Review an AI initiative
            </CtaButton>
          </div>
          <div className="ai-review-record" aria-label="AI initiative review areas">
            {[
              ["A-01", "Problem and capability fit"],
              ["A-02", "Evaluation and data"],
              ["A-03", "Human work and economics"],
              ["A-04", "Reliability and containment"],
              ["A-05", "Dependency and ownership"]
            ].map(([code, label]) => (
              <div key={code}>
                <span>{code}</span>
                <p>{label}</p>
                <FileSearch size={18} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="buyers-title">
        <div className="shell">
          <SectionHeading
            kicker="06 / Who commissions the work"
            title="For those who own or oversee the commitment."
            id="buyers-title"
          />
          <div className="audience-grid">
            {audience.map((item, index) => {
              const Icon = [Building2, Landmark, CircleDollarSign][index];
              return (
                <article key={item.title}>
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="independence-title">
        <div className="shell independence-grid">
          <div className="independence-mark" aria-hidden="true">
            <ShieldCheck size={42} strokeWidth={1.35} />
            <span>Independent from the implementation outcome</span>
          </div>
          <div>
            <p className="section-kicker">07 / Independence</p>
            <h2 id="independence-title">The opinion is independent of approval.</h2>
            <p className="large-copy">
              The practice does not sell software, take implementation fees, accept vendor incentives, recruitment commissions, referral fees, success fees, or equity in an organisation under review.
            </p>
            <p>
              Management remains responsible for the final decision. Specialist legal, security, financial, or technical work may still be required. Those disciplines remain outside the review scope.
            </p>
            <Link className="text-link" href="/approach">
              Read the independence and scope standard <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section about-preview" aria-labelledby="experience-title">
        <div className="shell about-preview-grid">
          <div className="about-preview-image">
            <Image
              src="/images/marc-paul-hero.png"
              alt="Marc Paul speaking on stage"
              fill
              sizes="(max-width: 880px) 100vw, 48vw"
              quality={86}
            />
          </div>
          <div>
            <p className="section-kicker">08 / Relevant experience</p>
            <h2 id="experience-title">Product and delivery experience applied to the decision.</h2>
            <p>
              Marc&apos;s background includes AI development, product delivery, technical production, immersive systems, and cross-functional leadership. In a review, he compares the commercial case with the work required to build, operate, and support the proposed system.
            </p>
            <p>
              The practice is limited to AI, software, and digital-product initiatives connected to that experience.
            </p>
            <CtaButton href="/about" variant="secondary" icon={<ArrowRight size={17} />}>
              About Marc and the practice
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="blog-title">
        <div className="shell">
          <SectionHeading
            kicker="09 / Decision notes"
            title="Notes on technology decisions."
            id="blog-title"
            intro={<p>Articles on AI investment, pilot-to-production decisions, software programmes, and the evidence needed before scale.</p>}
          />
          <div className="blog-grid blog-grid-featured">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
          <div className="section-link-row">
            <CtaButton href="/blog" variant="secondary" icon={<ArrowRight size={17} />}>
              Browse all articles
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="faq-title">
        <div className="shell faq-layout">
          <div>
            <p className="section-kicker">10 / Questions</p>
            <h2 id="faq-title">Questions about commissioning a review.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
