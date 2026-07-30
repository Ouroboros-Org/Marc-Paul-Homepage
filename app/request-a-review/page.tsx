import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { ReviewRequestForm } from "@/components/review-request-form";
import { PageHero } from "@/components/site-ui";

export const metadata: Metadata = {
  title: "Request an Independent AI or Software Initiative Review",
  description:
    "Submit an AI or software decision, deadline, requested commitment, evidence, owner, sponsor, and reporting context for independent review.",
  alternates: { canonical: "/request-a-review" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Request an Independent AI or Software Initiative Review",
    description: "Send the decision, evidence available, and commitment being considered.",
    url: "/request-a-review"
  }
};

export default function RequestReviewPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Request a review"
        title="Tell me about the decision you need reviewed."
        lead="I use the information below to assess whether the decision fits an Independent Initiative Review and what access I would need. Submitting the form does not book or begin an engagement."
        breadcrumbs={[{ label: "Request a Review" }]}
        aside={
          <div className="request-fit-card">
            <p className="card-label">Please include</p>
            <ul>
              {[
                "One defined initiative",
                "The decision and its deadline",
                "The commitment being considered",
                "A named owner and sponsor",
                "The evidence and stakeholders available"
              ].map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
        }
      />

      <section className="section section-tight" aria-labelledby="form-title">
        <div className="shell request-layout">
          <aside className="request-sidebar">
            <p className="section-kicker">Before submitting</p>
            <h2 id="form-title">My opinion may disagree with the proposed direction.</h2>
            <p>I am not the right reviewer when a preferred answer needs confirmation. My opinion may support proceeding, adding conditions, staging, reworking, pausing, or stopping under the current case.</p>
            <div className="request-privacy-note">
              <LockKeyhole size={19} strokeWidth={1.5} aria-hidden="true" />
              <p>Leave out source code, personal data, credentials, and confidential attachments at this stage.</p>
            </div>
            <p>You can also send the brief to <a href="mailto:info@marcpaul.tech">info@marcpaul.tech</a>.</p>
            <Link className="text-link" href="/privacy">Read the privacy notice <ArrowRight size={16} aria-hidden="true" /></Link>
          </aside>
          <div className="request-form-panel">
            <ReviewRequestForm />
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="next-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">After submission</p>
            <h2 id="next-title">I will reply with an assessment of fit and scope.</h2>
          </div>
          <div className="prose-block">
            <p>I will assess whether the work fits my scope, what information and stakeholder access it requires, and which engagement is proportionate.</p>
            <p>I will also flag work that belongs with an implementation partner, specialist auditor, lawyer, transaction adviser, or another provider.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
