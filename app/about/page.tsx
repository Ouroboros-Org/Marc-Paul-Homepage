import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Layers3, Presentation, UsersRound } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { TedxVideo } from "@/components/tedx-video";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Marc Paul | Independent AI Initiative Reviewer",
  description:
    "Marc Paul's background in AI development, product delivery, technical production, immersive systems, and cross-functional leadership.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Marc Paul",
    description: "Marc Paul's experience in AI development, product delivery, and technical production.",
    url: "/about"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marc Paul",
  url: absoluteUrl("/about"),
  image: absoluteUrl("/images/marc-paul-hero.png"),
  jobTitle: "Independent AI and Software Initiative Reviewer",
  address: { "@type": "PostalAddress", addressCountry: "MT" },
  sameAs: ["https://mt.linkedin.com/in/marc-paul"],
  knowsAbout: [
    "AI development",
    "AI initiative review",
    "Software product delivery",
    "Technical production",
    "Immersive technology",
    "Technology investment decisions"
  ]
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <StructuredData data={jsonLd} />
      <PageHero
        eyebrow="About Marc Paul"
        title="Product and delivery experience applied to independent review."
        lead="Marc Paul conducts Independent Initiative Reviews of consequential AI and software decisions. His background in development, product delivery, technical production, and cross-functional leadership informs his judgement of the commercial case and the conditions needed to deliver the initiative."
        breadcrumbs={[{ label: "About" }]}
        actions={
          <>
            <CtaButton href="/request-a-review" icon={<ArrowRight size={17} />}>
              Request a review
            </CtaButton>
            <CtaButton
              href="https://mt.linkedin.com/in/marc-paul"
              external
              variant="secondary"
              icon={<ArrowUpRight size={17} />}
            >
              LinkedIn profile
            </CtaButton>
          </>
        }
      />

      <section className="section section-tight" aria-labelledby="bio-title">
        <div className="shell about-bio-grid">
          <div className="about-portrait">
            <Image
              src="/images/marc-paul-hero.png"
              alt="Marc Paul speaking on stage"
              fill
              sizes="(max-width: 880px) 100vw, 52vw"
              quality={88}
              priority
            />
          </div>
          <div className="prose-block">
            <p className="section-kicker">Relevant background</p>
            <h2 id="bio-title">The review connects the proposal to operating conditions.</h2>
            <p>Marc&apos;s work has covered product definition, technical scope, delivery sequence, team responsibility, and systems used by real customers and operators. His experience includes AI and backend development, product and production leadership, learning and progression systems, spatial computing, real-time experiences, and technical research.</p>
            <p>The practice follows that experience. Its initial field covers AI-enabled products, internal AI systems, workflow platforms, software investments, significant rebuilds, digital-product changes, and related technology initiatives. It does not claim sector independence or replace specialist disciplines.</p>
            <p>Marc is based in Malta and works internationally.</p>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="experience-title">
        <div className="shell">
          <SectionHeading
            kicker="Relevant experience"
            title="Experience brought to an initiative review."
            id="experience-title"
            intro={<p>Marc compares the commercial claim with what the product, technology, team, and operating environment can support.</p>}
          />
          <div className="experience-grid">
            <article>
              <Code2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>AI and technical development</h3>
              <p>Direct work with AI, backend systems, real-time workflows, and prototypes, including the move from a convincing technical result to a dependable product capability.</p>
            </article>
            <article>
              <Layers3 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Product and production delivery</h3>
              <p>Work across product definition, delivery planning, dependencies, technical trade-offs, and the coordination needed to move from proposal to operation.</p>
            </article>
            <article>
              <UsersRound size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Cross-functional leadership</h3>
              <p>Experience working across leadership, product, design, engineering, and production when ownership, constraints, and expected outcomes are unclear.</p>
            </article>
            <article>
              <Presentation size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Public work</h3>
              <p>Marc speaks and writes about AI, emerging technology, decision quality, immersive systems, and the evidence needed before a technical commitment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="practice-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">The practice</p>
            <h2 id="practice-title">A defined role with clear limits.</h2>
          </div>
          <div className="prose-block">
            <p>The Decision Integrity Practice does not build the system it recommends, earn implementation fees, sell software, or depend on approval for further work. That separation protects the opinion from the commercial outcome.</p>
            <p>The review may identify the need for specialist legal, security, financial, regulatory, or technical work. It does not claim to replace those disciplines.</p>
            <Link className="text-link" href="/approach">
              Read the independence and conduct standard <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="talk-title">
        <div className="shell talk-grid">
          <div>
            <p className="section-kicker">TEDxValletta</p>
            <h2 id="talk-title">Balancing ambition and skepticism in AI.</h2>
            <p>The talk considers how curiosity and skepticism can coexist in work on AI. For a live initiative, the practical question is what the available evidence can support before ambition becomes a commitment.</p>
          </div>
          <TedxVideo />
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
