import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site-ui";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How marcpaul.tech handles review requests, email correspondence, website analytics, and performance data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Privacy notice"
        title="How I handle information sent through this website."
        lead="This notice covers marcpaul.tech, the review-request form, and website analytics. I agree separate confidentiality, access, storage, and retention terms for client work."
        breadcrumbs={[{ label: "Privacy" }]}
      />

      <section className="section section-tight">
        <div className="shell legal-layout">
          <aside>
            <p className="card-label">Last updated</p>
            <time dateTime="2026-07-30">30 July 2026</time>
            <a href="mailto:info@marcpaul.tech">info@marcpaul.tech</a>
          </aside>
          <div className="legal-copy">
            <section aria-labelledby="controller-title">
              <h2 id="controller-title">Responsibility for this website</h2>
              <p>I, Marc Paul, operate marcpaul.tech and the Decision Integrity Practice. Send questions about this notice, or requests for access, correction, or deletion, to <a href="mailto:info@marcpaul.tech">info@marcpaul.tech</a>.</p>
            </section>

            <section aria-labelledby="request-data-title">
              <h2 id="request-data-title">Review requests and correspondence</h2>
              <p>I ask for your name, work email, organisation, decision, initiative, deadline, requested commitment, decision owner, available evidence, sponsor, current status, reporting needs, and any optional context.</p>
              <p>I use this information to assess fit, reply to the request, discuss scope, and retain the related correspondence. Do not send credentials, source code, personal information about other people, confidential attachments, or material unnecessary for the initial assessment.</p>
            </section>

            <section aria-labelledby="processors-title">
              <h2 id="processors-title">Service providers</h2>
              <h3>Google Forms</h3>
              <p>When the form is configured, your submission is sent to Google Forms and made available to me for response. Google processes it under Google&apos;s service and privacy terms.</p>
              <h3>Vercel Web Analytics and Speed Insights</h3>
              <p>Vercel Web Analytics and Speed Insights provide aggregate page-use data and measurements of loading and interaction performance. They may process the technical request information needed for those reports. This site does not use them to build advertising profiles.</p>
              <h3>Website hosting</h3>
              <p>The hosting provider processes network and server information needed to deliver the site, maintain security, and diagnose failures.</p>
            </section>

            <section aria-labelledby="cookies-title">
              <h2 id="cookies-title">Cookies and local storage</h2>
              <p>I do not intentionally set advertising cookies or create an advertising profile. Third-party content, including the TEDx video, loads only after you choose to play it. Requests made after that point are governed by the provider&apos;s terms.</p>
            </section>

            <section aria-labelledby="retention-title">
              <h2 id="retention-title">How long information is kept</h2>
              <p>I keep request information for as long as reasonably needed to assess and answer the request, manage any resulting business relationship, and meet applicable record-keeping duties. I do not sell it. I may disclose it when required by law or to providers used for the website and correspondence.</p>
              <p>If an engagement begins, I agree its confidentiality, access, storage, and retention arrangements separately.</p>
            </section>

            <section aria-labelledby="rights-title">
              <h2 id="rights-title">Access, correction, and deletion</h2>
              <p>Email <a href="mailto:info@marcpaul.tech">info@marcpaul.tech</a> to request access to, correction of, or deletion of information I hold about you. I may need to retain some records to meet legal or record-keeping duties.</p>
              <p>You may send the initial review brief by email instead of using Google Forms.</p>
            </section>

            <section aria-labelledby="changes-title">
              <h2 id="changes-title">Changes to this notice</h2>
              <p>This page is revised when the forms, analytics, service providers, or handling practices change materially. The date above identifies the latest version.</p>
            </section>

            <Link className="text-link" href="/"><ArrowLeft size={16} aria-hidden="true" /> Back to the homepage</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
