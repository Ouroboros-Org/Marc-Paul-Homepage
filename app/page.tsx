import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Compass,
  Mail,
  Network,
  Quote,
  Route,
  ScanSearch,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { AmbientScene } from "@/components/ambient-scene";
import { ContactButton } from "@/components/contact-modal";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { TedxVideo } from "@/components/tedx-video";
import { TrackedLink } from "@/components/tracked-link";

const advisoryAreas = [
  {
    number: "01",
    title: "AI strategy and feasibility",
    description:
      "Work out which problem deserves AI, what evidence is missing and which option is simple enough to test before a team commits serious budget.",
    icon: BrainCircuit,
    tags: ["Opportunity assessment", "Build or buy", "Feasibility"]
  },
  {
    number: "02",
    title: "Technical product direction",
    description:
      "Turn an ambitious idea into a usable specification with system boundaries, dependencies, acceptance criteria and a delivery sequence.",
    icon: Blocks,
    tags: ["Product specification", "Architecture choices", "Roadmaps"]
  },
  {
    number: "03",
    title: "Agentic systems and automation",
    description:
      "Design AI-agent workflows with durable context, explicit tasks, review points and a clear route back to human judgment.",
    icon: Network,
    tags: ["Agent workflows", "Human review", "Operational controls"]
  },
  {
    number: "04",
    title: "Emerging-technology advisory",
    description:
      "Assess AI, spatial computing and interactive systems against the product goal. Prototypes are used when they can settle a real question.",
    icon: Compass,
    tags: ["Technology assessment", "Prototypes", "Scenario planning"]
  },
  {
    number: "05",
    title: "Product and production leadership",
    description:
      "Connect leadership, product, design and engineering around the decisions that unblock delivery, especially during change or uncertain ownership.",
    icon: Route,
    tags: ["Cross-team alignment", "Delivery support", "Interim leadership"]
  },
  {
    number: "06",
    title: "Independent technical review",
    description:
      "Pressure-test an architecture, vendor proposal or technical plan before it hardens into a roadmap that is expensive to reverse.",
    icon: ShieldCheck,
    tags: ["Technical diligence", "Risk review", "Second opinion"]
  }
];

const outputs = [
  {
    number: "01",
    title: "Decision brief",
    body: "The options, evidence, open questions and recommendation in language that leadership and engineering can both use."
  },
  {
    number: "02",
    title: "System map",
    body: "Data, owners, dependencies, review points and failure paths made visible before they become delivery surprises."
  },
  {
    number: "03",
    title: "Delivery plan",
    body: "A smallest useful release, clear acceptance criteria and the questions the first iteration needs to answer."
  }
];

const principles = [
  {
    number: "01",
    title: "Name the decision",
    body: "A useful engagement begins with the choice that needs to be made and who will own it."
  },
  {
    number: "02",
    title: "Expose the assumptions",
    body: "Cost, data, risk and uncertainty belong in the working material from the start."
  },
  {
    number: "03",
    title: "Give the system an owner",
    body: "Every workflow needs a person who can judge its output, maintain it and stop it."
  },
  {
    number: "04",
    title: "Test the smallest useful form",
    body: "A focused prototype can replace weeks of debate when it is built around a precise question."
  }
];

const work = [
  {
    index: "A",
    eyebrow: "Former role · Axon Park · ended April 2026",
    title: "AI product delivery across code, production and immersive design.",
    description:
      "As Lead Producer & AI Developer, Marc worked across product development, AI and backend systems, production leadership and interactive learning experiences.",
    details: ["Lead Producer & AI Developer", "AI, backend and real-time workflows", "Learning and progression systems"],
    accent: "copper"
  },
  {
    index: "B",
    eyebrow: "Applied research and prototypes",
    title: "Technical experiments that had to work outside a slide deck.",
    description:
      "Work has included wireless shared full-body VR, tracked physical interfaces, AR and VR research, multiplayer systems and interactive installations.",
    details: ["Unity and Unreal", "Spatial computing", "Physical and real-time systems"],
    accent: "bone"
  },
  {
    index: "C",
    eyebrow: "Independent advisory",
    title: "A technical second brain before a costly product commitment.",
    description:
      "Current work focuses on AI feasibility, product specification, agentic workflows and the connection between business intent and implementation reality.",
    details: ["Strategy with technical depth", "Founder and product-team support", "Prototype and delivery planning"],
    accent: "smoke"
  }
];

const insights = [
  {
    date: "12 FEB 2025",
    type: "AI strategy",
    title: "And There’s No Turning Back from the AI Arms Race…",
    description:
      "A look at government spending, strategic competition and the pressure to accelerate AI development before its consequences are understood.",
    href: "https://www.marcpaul.tech/blog/and-theres-no-turning-back-from-the-ai-arms-race"
  },
  {
    date: "03 FEB 2025",
    type: "Frontier models",
    title: "OpenAI’s o3 vs DeepSeek R1: Open-Source or Full-Control",
    description:
      "Two approaches to capable AI, with different answers about access, autonomy, compute and who controls the tools built on top.",
    href: "https://www.marcpaul.tech/blog/openais-o3-vs-deepseek-r1-open-source-or-full-control"
  },
  {
    date: "29 OCT 2024",
    type: "Future scenario",
    title: "A Day in 2027: Where Does Reality End and AI Begin?",
    description:
      "A near-future scenario about predictive convenience, synthetic connection and the point where useful assistance becomes quiet control.",
    href: "https://www.marcpaul.tech/blog/9cspkbig4roi3fyzh8bvytrgybrezy"
  }
];

const faqs = [
  {
    question: "What does an independent technical and AI advisor do?",
    answer:
      "I help a team make a difficult technology decision before cost and momentum narrow its options. That can include AI opportunity assessment, technical scope, architecture choices, product specification, delivery planning or an independent review of an existing plan."
  },
  {
    question: "Can you work with our existing product and engineering team?",
    answer:
      "Yes. The work is designed to sit between leadership, product and engineering. I can lead a focused decision process, support an existing owner or stay involved through early delivery while responsibilities settle."
  },
  {
    question: "Do you build prototypes as well as advise?",
    answer:
      "Yes, when a prototype is the quickest credible way to test feasibility. The goal is to answer a defined question about users, data, system behaviour or technical risk. A prototype is not treated as a miniature production system."
  },
  {
    question: "What makes an AI-agent workflow reliable enough to use?",
    answer:
      "Reliable agentic work starts with a clear brief, durable context, bounded tools, observable actions and explicit review points. The operating team also needs a way to correct the system and take control when the output is uncertain."
  },
  {
    question: "Where do you work?",
    answer:
      "I am based in Malta and work remotely with founders, product leaders and technical teams across Europe. In-person working sessions can be discussed when the project benefits from them."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.marcpaul.tech/#person",
      name: "Marc Paul",
      url: "https://www.marcpaul.tech",
      email: "mailto:info@marcpaul.tech",
      jobTitle: "Independent Technical & AI Advisor",
      description:
        "Malta-based independent advisor working across AI strategy, technical product direction, agentic systems, automation and emerging technology.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MT"
      },
      sameAs: [
        "https://mt.linkedin.com/in/marc-paul",
        "https://www.youtube.com/watch?v=6ffnZ5jkCOM"
      ],
      knowsAbout: [
        "AI strategy",
        "AI feasibility",
        "Technical product direction",
        "Agentic systems",
        "Automation",
        "Spatial computing",
        "Technical production"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.marcpaul.tech/#advisory",
      name: "Marc Paul Technical & AI Advisory",
      url: "https://www.marcpaul.tech",
      founder: { "@id": "https://www.marcpaul.tech/#person" },
      areaServed: ["Malta", "Europe"],
      serviceType: [
        "AI strategy and feasibility",
        "Technical product advisory",
        "Agentic systems and automation",
        "Emerging-technology advisory",
        "Technical due diligence"
      ],
      email: "info@marcpaul.tech"
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navigation />

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="shell hero-shell">
            <div className="hero-workspace">
              <AmbientScene />
              <div className="hero-grid" aria-hidden="true" />

              <div className="workspace-bar">
                <div className="workspace-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Independent Technical & AI Advisory</p>
                <span className="workspace-mode">Malta · Europe · Remote</span>
              </div>

              <div className="hero-copy">
                <p className="eyebrow">
                  <span aria-hidden="true" />
                  Strategy that can survive delivery
                </p>
                <h1 id="hero-title">
                  Make better decisions about AI and
                  <em> what to build next.</em>
                </h1>
                <p className="hero-lede">
                  I help founders, product leaders and engineering teams test feasibility, define
                  technical scope and move a useful idea into delivery without losing sight of risk,
                  ownership or human judgment.
                </p>
                <div className="hero-actions">
                  <ContactButton
                    className="button button-primary"
                    label="Discuss an engagement"
                    location="hero"
                  />
                  <a className="button button-ghost" href="#advisory">
                    Explore the services
                    <ArrowDown size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="hero-status">
                <span className="status-pulse" aria-hidden="true" />
                <p>
                  <strong>Selective advisory engagements</strong>
                  Focused sprints · Embedded support · Technical review
                </p>
              </div>
            </div>

            <div className="hero-proof" aria-label="What an engagement should produce">
              <div>
                <span className="proof-index">01 · DECISION</span>
                <p>Know what deserves budget</p>
                <small>Options, evidence and a recommendation</small>
              </div>
              <div>
                <span className="proof-index">02 · SCOPE</span>
                <p>Give the idea buildable boundaries</p>
                <small>Requirements, dependencies and acceptance criteria</small>
              </div>
              <div>
                <span className="proof-index">03 · OWNERSHIP</span>
                <p>Leave with a clear next move</p>
                <small>An owner, a sequence and a learning loop</small>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Areas of practice">
          <div className="shell signal-list">
            <span>AI strategy</span>
            <i aria-hidden="true" />
            <span>Product direction</span>
            <i aria-hidden="true" />
            <span>Agentic systems</span>
            <i aria-hidden="true" />
            <span>Technical review</span>
            <i aria-hidden="true" />
            <span>Emerging technology</span>
          </div>
        </section>

        <section className="section section-advisory" id="advisory" aria-labelledby="advisory-title">
          <div className="shell">
            <Reveal className="section-intro split-intro">
              <div>
                <p className="section-kicker">01 · Services</p>
                <h2 id="advisory-title">
                  Decide what is
                  <br />
                  <em>worth building.</em>
                </h2>
              </div>
              <div className="intro-copy">
                <p>
                  AI projects often become expensive while the central question is still vague.
                  The team has tools, a pilot and plenty of activity, but no shared definition of a
                  useful result.
                </p>
                <p>
                  My role is to make that decision legible. I connect product intent with technical
                  reality, identify the assumptions carrying the most risk and help the people doing
                  the work agree on a next move they can own.
                </p>
              </div>
            </Reveal>

            <div className="services-grid">
              {advisoryAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <Reveal key={area.title} className="service-card" delay={(index % 3) * 70}>
                    <div className="service-topline">
                      <span>{area.number}</span>
                      <span className="service-icon" aria-hidden="true">
                        <Icon size={21} strokeWidth={1.5} />
                      </span>
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                    <ul aria-label={`${area.title} topics`}>
                      {area.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section-process" aria-labelledby="process-title">
          <div className="shell process-grid">
            <Reveal className="process-media">
              <figure>
                <div className="process-image">
                  <Image
                    src="/images/advisory-working-session.jpg"
                    alt="Illustrative working session with a small team reviewing system diagrams"
                    fill
                    quality={86}
                    sizes="(max-width: 779px) calc(100vw - 36px), 52vw"
                  />
                </div>
                <figcaption>
                  Illustrative working session. The work happens with the people who will own the result.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="process-copy" delay={90}>
              <p className="section-kicker">What the work produces</p>
              <h2 id="process-title">From an open question to an owned plan.</h2>
              <p>
                Some teams arrive with a vendor shortlist. Others have a pilot that works in a demo
                and nowhere else. The first task is to define the decision, then collect enough
                evidence to make it without pretending the uncertainty has disappeared.
              </p>
              <div className="output-list">
                {outputs.map((output) => (
                  <div key={output.number} className="output-item">
                    <span>{output.number}</span>
                    <div>
                      <h3>{output.title}</h3>
                      <p>{output.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-statement" aria-label="Working principle">
          <div className="shell">
            <Reveal className="statement-grid">
              <div className="statement-mark">
                <ScanSearch size={28} strokeWidth={1.2} aria-hidden="true" />
                <span>Working principle</span>
              </div>
              <blockquote>
                Technology needs ambition.
                <em> Decisions need skepticism.</em>
              </blockquote>
              <p>Good technical leadership makes room for both before momentum takes over.</p>
            </Reveal>
          </div>
        </section>

        <section className="section section-approach" id="approach" aria-labelledby="approach-title">
          <div className="shell">
            <Reveal className="section-intro approach-intro">
              <p className="section-kicker">02 · How I work</p>
              <h2 id="approach-title">Clarity before activity.</h2>
              <p>
                The process is deliberately light. It creates enough structure to make the hard
                choice, records why it was made and leaves the delivery team with room to do its job.
              </p>
            </Reveal>

            <div className="principles">
              {principles.map((principle, index) => (
                <Reveal key={principle.number} className="principle" delay={index * 60}>
                  <span>{principle.number}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="engagement-band">
              <div>
                <span className="engagement-icon" aria-hidden="true">
                  <BriefcaseBusiness size={23} strokeWidth={1.5} />
                </span>
                <p>
                  <strong>Advisory sprint</strong>
                  Resolve one defined decision and leave with usable working material.
                </p>
              </div>
              <div>
                <span className="engagement-icon" aria-hidden="true">
                  <Route size={23} strokeWidth={1.5} />
                </span>
                <p>
                  <strong>Embedded support</strong>
                  Stay through alignment, early delivery and the first real feedback.
                </p>
              </div>
              <div>
                <span className="engagement-icon" aria-hidden="true">
                  <Sparkles size={23} strokeWidth={1.5} />
                </span>
                <p>
                  <strong>Founder sparring</strong>
                  Examine product direction, feasibility and the assumptions behind a technical bet.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-work" id="work" aria-labelledby="work-title">
          <div className="shell">
            <Reveal className="section-intro work-heading">
              <div>
                <p className="section-kicker">03 · Relevant experience</p>
                <h2 id="work-title">
                  Strategy informed by
                  <br />
                  <em>building systems.</em>
                </h2>
              </div>
              <p>
                The advisory work draws on product leadership, AI development, real-time technology
                and years of prototypes that exposed practical constraints early.
              </p>
            </Reveal>

            <div className="work-stack">
              {work.map((item) => (
                <Reveal key={item.index} className={`work-card work-${item.accent}`}>
                  <div className="work-index">{item.index}</div>
                  <div className="work-copy">
                    <p className="work-eyebrow">{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="experience-line" aria-label="Experience timeline">
              <div>
                <span>2014–2020</span>
                <p>Emerging-tech research, AR/VR and real-time prototypes</p>
              </div>
              <i aria-hidden="true" />
              <div>
                <span>2023–APR 2026</span>
                <p>AI development and product leadership at Axon Park</p>
              </div>
              <i aria-hidden="true" />
              <div>
                <span>CURRENT</span>
                <p>Independent Technical & AI Advisor, based in Malta</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-tedx" aria-labelledby="tedx-title">
          <div className="shell tedx-grid">
            <Reveal className="tedx-media">
              <TedxVideo />
            </Reveal>
            <Reveal className="tedx-copy" delay={100}>
              <p className="section-kicker">TEDxValletta · 2025</p>
              <h2 id="tedx-title">Balancing ambition and skepticism in AI.</h2>
              <div className="tedx-quote">
                <Quote size={24} strokeWidth={1.2} aria-hidden="true" />
                <blockquote>
                  Be curious and be skeptical.
                  <em> Be both sides of the coin.</em>
                </blockquote>
              </div>
              <p>
                The talk looks at curiosity, technological momentum and the point where credible
                warnings become inconvenient. Its practical question is simple: how do we keep
                ambition useful when the consequences are still uncertain?
              </p>
              <TrackedLink
                className="text-link"
                href="https://www.youtube.com/watch?v=6ffnZ5jkCOM"
                target="_blank"
                rel="noreferrer"
                event="Outbound Link"
                eventData={{ destination: "tedx" }}
              >
                Watch the TEDx talk
                <ArrowUpRight size={17} aria-hidden="true" />
              </TrackedLink>
            </Reveal>
          </div>
        </section>

        <section className="section section-thinking" id="thinking" aria-labelledby="thinking-title">
          <div className="shell">
            <Reveal className="section-intro thinking-heading">
              <div>
                <p className="section-kicker">04 · Writing</p>
                <h2 id="thinking-title">Notes on systems and consequences.</h2>
              </div>
              <TrackedLink
                className="text-link"
                href="https://www.marcpaul.tech/blog"
                event="Outbound Link"
                eventData={{ destination: "blog" }}
              >
                Read all articles
                <ArrowRight size={17} aria-hidden="true" />
              </TrackedLink>
            </Reveal>

            <div className="insights-grid">
              {insights.map((insight, index) => (
                <Reveal key={insight.href} className="insight-card" delay={index * 70}>
                  <TrackedLink
                    href={insight.href}
                    aria-label={`Read ${insight.title}`}
                    event="Article Click"
                    eventData={{ title: insight.title, type: insight.type }}
                  >
                    <div className="insight-meta">
                      <span>{insight.date}</span>
                      <span>{insight.type}</span>
                    </div>
                    <h3>{insight.title}</h3>
                    <p>{insight.description}</p>
                    <span className="insight-arrow" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </TrackedLink>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-faq" aria-labelledby="faq-title">
          <div className="shell faq-grid">
            <Reveal className="faq-heading">
              <p className="section-kicker">05 · Practical questions</p>
              <h2 id="faq-title">Before we work together.</h2>
              <p>
                A short answer to the questions that usually appear before a technical advisory
                conversation.
              </p>
            </Reveal>
            <Reveal className="faq-list" delay={80}>
              {faqs.map((item, index) => (
                <details key={item.question}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.question}
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section section-contact" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-grid">
            <Reveal className="contact-heading">
              <p className="section-kicker">06 · Start a conversation</p>
              <h2 id="contact-title">
                Bring the difficult
                <em> decision.</em>
              </h2>
            </Reveal>
            <Reveal className="contact-copy" delay={100}>
              <p>
                You do not need a polished brief. Share the decision, the constraints and anything
                the team has already tried. I will reply with an honest view of whether I can help
                and what a sensible first step would be.
              </p>
              <ContactButton
                className="button contact-form-cta"
                label="Share your project note"
                location="contact"
                icon="arrow-right"
              />
              <div className="contact-email">
                <p>Prefer to write directly?</p>
                <TrackedLink
                  href="mailto:info@marcpaul.tech?subject=Technical%20and%20AI%20advisory"
                  event="Email Contact"
                  eventData={{ location: "contact" }}
                >
                  <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                  info@marcpaul.tech
                </TrackedLink>
              </div>
              <p className="availability">
                <span aria-hidden="true" />
                Based in Malta · Working remotely across Europe
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <span className="brand-mark" aria-hidden="true">MP</span>
            <p>Build boldly. Question continuously.</p>
          </div>
          <div className="footer-links">
            <TrackedLink
              href="https://mt.linkedin.com/in/marc-paul"
              target="_blank"
              rel="noreferrer"
              event="Outbound Link"
              eventData={{ destination: "linkedin" }}
            >
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="https://github.com/marcpaul"
              target="_blank"
              rel="noreferrer"
              event="Outbound Link"
              eventData={{ destination: "github" }}
            >
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </TrackedLink>
            <a href="#top">
              Back to top <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Marc Paul</p>
        </div>
      </footer>
    </>
  );
}
