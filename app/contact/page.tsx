import type { Metadata } from "next";
import { ArrowRight, FileCheck2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/button";
import { ShortContactForm } from "@/components/short-contact-form";
import { PageHero } from "@/components/site-ui";

const directEmailHref = "mailto:info@marcpaul.tech?subject=General%20enquiry";

export const metadata: Metadata = {
  title: "Contact Marc Paul | Decision Integrity Practice",
  description:
    "Send me a general enquiry or use the dedicated form to request an independent initiative review.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Marc Paul | Decision Integrity Practice",
    description: "Send me a general enquiry or start a defined initiative review request.",
    url: "/contact"
  }
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title="Ask me about my work or a possible review."
        lead="Use this page for a general question. If an AI or software decision already has an owner and deadline, send me a review request instead."
        breadcrumbs={[{ label: "Contact" }]}
        actions={
          <>
            <Button
              href="#general-enquiry"
              variant="primary"
              icon={<ArrowRight size={17} />}
              isCta={true}
            >
              Write a message
            </Button>
            <Button
              href="/request-a-review"
              variant="secondary"
              icon={<FileCheck2 size={17} />}
              isCta={true}
            >
              Request a review
            </Button>
          </>
        }
        aside={
          <dl className="service-summary">
            <div>
              <dt>This form</dt>
              <dd>General enquiries</dd>
            </div>
            <div>
              <dt>Review form</dt>
              <dd>A defined initiative and decision</dd>
            </div>
          </dl>
        }
      />

      <section
        className="section section-tight"
        id="general-enquiry"
        aria-labelledby="contact-form-title"
      >
        <div className="shell request-layout">
          <aside className="request-sidebar">
            <p className="section-kicker">General contact</p>
            <h2 id="contact-form-title">Send me a short message.</h2>
            <p>Include your subject and enough context for a useful reply.</p>
            <div className="request-privacy-note">
              <LockKeyhole size={19} strokeWidth={1.5} aria-hidden="true" />
              <p>Leave out credentials, source code, personal data, and confidential attachments.</p>
            </div>
            <Button
              href={directEmailHref}
              variant="secondary"
              className="button-contact-secondary"
              icon={<Mail size={17} />}
            >
              Email directly
            </Button>
          </aside>
          <div className="request-form-panel">
            <ShortContactForm />
          </div>
        </div>
      </section>

      <section className="section section-contrast" aria-labelledby="review-contact-title">
        <div className="shell content-split">
          <div>
            <p className="section-kicker">For a defined decision</p>
            <h2 id="review-contact-title">Send a review request when a commitment is due.</h2>
          </div>
          <div className="prose-block">
            <p>
              I ask for the initiative, decision, deadline, commitment, owner, sponsor, and
              evidence available. I use that information to assess scope and fit.
            </p>
            <Button
              href="/request-a-review"
              variant="secondary"
              icon={<ArrowRight size={17} />}
            >
              Go to the review request
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
