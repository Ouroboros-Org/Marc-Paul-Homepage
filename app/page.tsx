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
import { Button } from "@/components/button";
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
  title: "Independent AI & Software Investment Reviews",
  description:
    "Independent technology investment reviews for founders, boards, investors, and finance leaders before funding, production, scale, or continuation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Independent AI & Software Investment Reviews",
    description:
      "A decision-ready assessment of the commercial, product, technical, delivery, and operating case behind a material technology commitment.",
    url: "/"
  }
};

const faqs = [
  {
    question: "What does an Independent Initiative Review examine?",
    answer:
      "The review examines one defined AI or software initiative and the decision attached to it: intended value, demand evidence, product and technology fit, delivery conditions, full cost, exposure, alternatives, and conditions for further commitment."
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
      "Yes. Independence requires the freedom to reach an unfavourable conclusion. The opinion may support proceeding, adding conditions, staging the commitment, reworking the case, pausing, or stopping under the case currently presented."
  }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.marcpaul.tech/#website",
      name: "Marc Paul — Decision Integrity Practice",
      alternateName: "Marc Paul Advisory",
      url: "https://www.marcpaul.tech"
    },
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
      description:
        "Independent AI and software investment reviews before funding, production, scale, or continuation.",
      founder: { "@id": "https://www.marcpaul.tech/#person" },
      areaServed: ["Malta", "Europe", "International"],
      serviceType: [
        "Independent Initiative Review",
        "Decision Case Reconstruction",
        "Independent Continuation Review"
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Independent technology review services",
        itemListElement: reviews.map((review) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: review.title,
            url: `https://www.marcpaul.tech${review.href}`
          }
        }))
      },
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
            <p className="eyebrow"><span aria-hidden="true" />Independent AI and software investment review</p>
            <h1 id="home-title">
              Independent assessment <br />
              <em>before funding, production, or scale.</em>
            </h1>
            <p className="home-hero-lede">
              I provide founders, boards, investors, and finance leaders with an independent assessment.
              The review connects the commercial case with product, technical, delivery, and operating evidence.
            </p>
            <div className="hero-actions">
              <Button
                href="/request-a-review"
                icon={<ArrowRight size={17} />}
                isCta={true}
              >
                Request an Initiative Review
              </Button>
              <Button
                className="button button-secondary"
                href="/reviews/independent-initiative-review"
                variant="secondary"
                icon={<ArrowRight size={17} />}
              >
                See scope and deliverables
              </Button>
            </div>
            <p className="hero-audience">For growth-stage technology companies and investors responsible for a material commitment.</p>
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
            title="Independent review of one material decision."
            id="primary-review-title"
            intro={
              <>
                <p>
                  The engagement is scoped around the approval, funding, production, continuation, restructuring, or closure decision that is actually due.
                </p>
                <p>
                  You receive a written opinion, conditions for the next commitment, and a record of the evidence, alternatives, exposure, and unresolved points.
                </p>
              </>
            }
          />
          <div className="primary-review-panel">
            <div className="primary-review-copy">
              <p className="card-label">Independent Initiative Review</p>
              <h3>A focused review for a defined commitment.</h3>
              <p>
                The review examines one initiative and the commitment being requested. It is not a company-wide strategy review or general health check.
              </p>
              <ul className="check-list">
                <li>What must be true for the initiative to work</li>
                <li>Which conditions are supported, inferred, or disputed</li>
                <li>What the organisation is committing before uncertainty falls</li>
                <li>Which alternatives deserve serious consideration</li>
                <li>What must govern the next release of money, scope, or time</li>
              </ul>
              <Button
                href="/reviews/independent-initiative-review"
                icon={<ArrowRight size={17} />}
              >
                Read about the Initiative Review
              </Button>
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
            title="Three services for different decision stages."
            id="services-title"
            intro={<p>Review a case that is ready for decision, reconstruct one that is not, or reassess an active initiative before the next release.</p>}
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
            title="A decision-ready opinion with a clear evidence record."
            id="package-title"
            intro={<p>The decision package records the recommendation, conditions, evidence, disagreement, responsibilities, and next review point.</p>}
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
            intro={<p>The useful moment is before more money, scope, time, or customer exposure makes a change of course expensive.</p>}
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
            <h2 id="ai-review-title">Independent AI production-readiness review.</h2>
            <p className="large-copy">
              A successful pilot does not establish production readiness. The review extends the evidence to reliability, data and integration constraints, human oversight, operating cost, monitoring, compliance dependencies, and accountability at the proposed scale.
            </p>
            <Button href="/reviews/ai-initiative-review" icon={<ArrowRight size={17} />}>
              Review an AI initiative
            </Button>
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
            title="For decision-makers with capital and accountability at stake."
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
            <h2 id="independence-title">Independent of implementation and approval.</h2>
            <p className="large-copy">
              I do not sell the software, take the implementation work, or accept vendor incentives, referral fees, success fees, or equity in an organisation under review.
            </p>
            <p>
              Management remains responsible for the final decision. I may recommend legal, security, financial, or specialist technical work, but I do not replace it.
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
              src="/images/marc-paul.png"
              alt="Marc Paul"
              fill
              sizes="(max-width: 880px) 100vw, 48vw"
              quality={86}
            />
          </div>
          <div>
            <p className="section-kicker">08 / Review perspective</p>
            <h2 id="experience-title">Commercial, product, and technical evidence in one review.</h2>
            <p>
              Technology initiatives often look convincing within one function and remain weak across the full investment case. The review connects market demand and expected value with product fit, technical feasibility, delivery capacity, operating cost, and accountability.
            </p>
            <p>
              My background across AI development, software and product delivery, technical production, and cross-functional leadership supports that combined assessment. Specialist legal, security, financial, or regulatory work is commissioned separately where required.
            </p>
            <Button href="/about" variant="secondary" icon={<ArrowRight size={17} />}>
              About the practice
            </Button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="blog-title">
        <div className="shell">
          <SectionHeading
            kicker="09 / Decision notes"
            title="Analysis for AI and software investment decisions."
            id="blog-title"
            intro={<p>Decision notes on AI investment, pilot-to-production reviews, software programmes, and the evidence required before scale.</p>}
          />
          <div className="blog-grid blog-grid-featured">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
          <div className="section-link-row">
            <Button href="/blog" variant="secondary" icon={<ArrowRight size={17} />}>
              Browse all articles
            </Button>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="faq-title">
        <div className="shell faq-layout">
          <div>
            <p className="section-kicker">10 / Questions</p>
            <h2 id="faq-title">Questions about the review.</h2>
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
