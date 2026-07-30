import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Layers3, Presentation, UsersRound } from "lucide-react";
import { Button } from "@/components/button";
import { CtaPanel, PageHero, SectionHeading, StructuredData } from "@/components/site-ui";
import { TedxVideo } from "@/components/tedx-video";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Marc Paul | Independent AI Initiative Reviewer",
  description:
    "I bring experience in AI development, product delivery, technical production, immersive systems, and cross-functional leadership to independent review.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Marc Paul",
    description: "How my experience in AI development, product delivery, and technical production informs my review work.",
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
        eyebrow="About me"
        title="I review technology decisions from the point where a proposal meets delivery."
        lead="I conduct independent reviews of AI and software initiatives. I compare the commercial case with the product, technical, and operating conditions needed to make it work."
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
            <h2 id="bio-title">I learned early that a convincing prototype can still hide the hardest part.</h2>
            <p>For my bachelor project, I built a virtual-reality golf-training system in Unity. I attached a Vive tracker to a physical club, worked with full-body tracking, and tested direct feedback on swing angle and direction. It worked at low and medium speeds. A professional swing exposed tracking drift, missed collisions, and physics limits that the earlier tests had not.</p>
            <p>That experience is close to the work I do now. I have worked across AI and backend development, product and production delivery, learning systems, spatial computing, and real-time experiences. I know how easily a technical result can grow into a broader business claim as it moves from the project team to an approval paper.</p>
            <p>I am based in Malta and work with international clients. I stay within AI, software, and digital-product decisions connected to my experience, and I bring in or recommend specialists when a question sits outside it.</p>
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="experience-title">
        <div className="shell">
          <SectionHeading
            kicker="Relevant experience"
            title="What I bring to a review."
            id="experience-title"
            intro={<p>I test the commercial claim against what the product, technology, team, and operating environment can support.</p>}
          />
          <div className="experience-grid">
            <article>
              <Code2 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>AI and technical development</h3>
              <p>I have built AI, backend, real-time, and prototype systems. That helps me separate model or prototype performance from dependable product behaviour.</p>
            </article>
            <article>
              <Layers3 size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Product and production delivery</h3>
              <p>I have worked across product definition, delivery planning, dependencies, technical trade-offs, and the coordination needed to move from proposal to operation.</p>
            </article>
            <article>
              <UsersRound size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Cross-functional leadership</h3>
              <p>I am used to working across leadership, product, design, engineering, and production when ownership or expected outcomes are still unclear.</p>
            </article>
            <article>
              <Presentation size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>Public work</h3>
              <p>I speak and write about AI, emerging technology, decision quality, immersive systems, and the evidence needed before a technical commitment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="practice-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">My role</p>
            <h2 id="practice-title">I keep the review separate from implementation.</h2>
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

      <section className="section" aria-labelledby="talk-title">
        <div className="shell talk-grid">
          <div>
            <p className="section-kicker">TEDxValletta</p>
            <h2 id="talk-title">I am curious about what technology makes possible, and skeptical of the shortcut from possible to ready.</h2>
            <p>In my TEDxValletta talk, I argued for both sides of that coin. Curiosity gets a team moving. Skepticism is the circuit breaker: it creates room to hear concerns, test assumptions, and pause when the evidence changes. I use the same balance in review work.</p>
          </div>
          <TedxVideo />
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}
