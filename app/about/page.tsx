import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CircleDollarSign, Code2, Layers3, UsersRound } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent Technology Investment Reviewer",
  description:
    "Independent AI and software investment review informed by experience across product, technology, delivery, operations, and cross-functional leadership.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Marc Paul",
    description: "The experience, professional boundaries, and independence behind Marc Paul's technology review practice.",
    url: "/about"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marc Paul",
  url: absoluteUrl("/about"),
  image: absoluteUrl("/images/marc-paul.png"),
  jobTitle: "Independent AI and Software Initiative Reviewer",
  address: { "@type": "PostalAddress", addressCountry: "MT" },
  sameAs: ["https://mt.linkedin.com/in/marc-paul"],
  knowsAbout: [
    "AI development",
    "AI initiative review",
    "AI production readiness",
    "Software product delivery",
    "Technology business case review",
    "Technology investment decisions"
  ]
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow="About the practice"
        title="Independent technology review across the full investment case."
        lead="I assess material AI and software initiatives for founders, boards, investors, and finance leaders. The work connects commercial logic with product, technical, delivery, and operating evidence."
        breadcrumbs={[{ label: "About" }]}
        actions={
          <>
            <Button href="/request-a-review" icon={<ArrowRight size={17} />} isCta={true}>
              Request a review
            </Button>
            <Button
              href="https://mt.linkedin.com/in/marc-paul"
              external
              variant="secondary"
              icon={<ArrowUpRight size={17} />}
              isCta={true}
            >
              LinkedIn profile
            </Button>
          </>
        }
      />

      <section className="section section-tight" aria-labelledby="bio-title">
        <div className="shell about-bio-grid">
          <div className="about-portrait">
            <Image
              src="/images/marc-paul.png"
              alt="Marc Paul"
              fill
              sizes="(max-width: 880px) 100vw, 52vw"
              quality={88}
              priority
            />
          </div>
          <div className="prose-block">
            <p className="section-kicker">Relevant background</p>
            <h2 id="bio-title">A cross-functional perspective on consequential technology decisions.</h2>
            <p>Technology investments rarely fail within a single discipline. A credible review has to connect the proposed business value with customer evidence, product fit, technical capability, delivery capacity, operating economics, and clear accountability.</p>
            <p>My background spans AI and software development, product and production delivery, technical operations, and cross-functional leadership. It allows me to examine how a proposal moves from a plausible concept to a funded and operated system, and where assumptions become material commitments.</p>
            <p>I am based in Malta and work with international clients. The practice stays focused on AI, software, and digital-product decisions. Legal, security, financial, regulatory, or specialist technical work is commissioned separately when required.</p>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="experience-title">
        <div className="shell">
          <SectionHeading
            kicker="Relevant experience"
            title="Experience that supports the review."
            id="experience-title"
            intro={<p>The value lies in assessing the initiative as one investment case rather than as separate commercial and technical narratives.</p>}
          />
          <div className="experience-grid">
            <article>
              <CircleDollarSign size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Commercial and investment logic</h3>
              <p>Assessment of the intended value, demand evidence, full cost, expected return, alternatives, and conditions attached to further commitment.</p>
            </article>
            <article>
              <Layers3 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Product and production delivery</h3>
              <p>Experience across product definition, delivery planning, dependencies, technical trade-offs, and the move from proposal to operation.</p>
            </article>
            <article>
              <Code2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>AI and software systems</h3>
              <p>Technical experience helps distinguish prototype or model performance from dependable product behaviour under production conditions.</p>
            </article>
            <article>
              <UsersRound size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Cross-functional accountability</h3>
              <p>Work across leadership, product, design, engineering, and production helps surface gaps between the approval case and delivery reality.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="practice-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">Professional independence</p>
            <h2 id="practice-title">Independence is part of the service.</h2>
          </div>
          <div className="prose-block">
            <p>I do not build the system I review, earn implementation fees, sell software, or depend on approval for further work. My commercial interest should not change with the conclusion.</p>
            <p>I may identify a need for legal, security, financial, regulatory, or specialist technical work. I do not present my review as a substitute for those disciplines.</p>
            <Link className="text-link" href="/approach">
              Read the independence and conduct standard <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
