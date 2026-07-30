import type { Metadata } from "next";
import { ReviewServicePage, type ServicePageContent } from "@/components/review-service-page";

export const metadata: Metadata = {
  title: "AI & Software Continuation Review",
  description:
    "Independent review of whether an active AI or software initiative still justifies more funding, scope, time, or vendor commitment.",
  alternates: { canonical: "/reviews/independent-continuation-review" },
  openGraph: {
    title: "Independent Continuation Review",
    description: "Reassess the evidence and original conditions before releasing the next commitment.",
    url: "/reviews/independent-continuation-review"
  }
};

const content: ServicePageContent = {
  slug: "independent-continuation-review",
  eyebrow: "Active initiative service / Review the next release",
  title: "Independent Continuation Review",
  lead:
    "Independent reassessment of an active AI or software initiative before another tranche of funding, scope, time, or customer exposure is released.",
  status: "Active initiative / defined review points",
  duration: "Agreed periods and decision gates",
  decision:
    "Do the evidence and original conditions justify releasing the next commitment?",
  introduction: [
    "Commission the review at an agreed funding, production, scale, renewal, or continuation gate. The original approval conditions are compared with the evidence gathered since that decision.",
    "I provide a continuation opinion, a status record for the original conditions, an updated exposure record, and the boundary for the next decision. The review remains separate from daily programme management and the delivery team."
  ],
  decisionExamples: [
    "Should the next funding tranche be released after this milestone?",
    "Do the pilot results support production, a smaller extension, or another test?",
    "Does the delayed roadmap still have a credible route to the intended result?",
    "Should the organisation renew or expand this material vendor commitment?",
    "Has scope drift changed the economics or exposure enough to require fresh approval?",
    "Have the stop conditions been reached, or does current evidence support continuation?"
  ],
  reviewAreas: [
    {
      title: "Original conditions",
      description: "Whether the evidence, assumptions, boundaries, and controls attached to the original approval still hold."
    },
    {
      title: "New evidence",
      description: "Delivery, customer, technical, commercial, and operating evidence gathered since the last decision."
    },
    {
      title: "Spending and exposure",
      description: "Whether the initiative remains inside its approved boundary and where new lock-in, customer, or vendor exposure has appeared."
    },
    {
      title: "Scope and benefit drift",
      description: "Comparison of the current work with the intended result and whether the expected benefit remains plausible."
    },
    {
      title: "Funding and stop conditions",
      description: "The conditions that were met, missed, reinterpreted, or overtaken by better evidence."
    },
    {
      title: "Next commitment",
      description: "The smallest defensible release of funding, scope, time, or exposure, together with its next review point."
    }
  ],
  outputs: [
    {
      title: "Continuation opinion",
      description: "A recommendation to release, condition, narrow, delay, rework, pause, or withhold the next commitment."
    },
    {
      title: "Condition status record",
      description: "The status of each original condition, the current evidence, and any unresolved disagreement."
    },
    {
      title: "Updated exposure record",
      description: "A record of changed costs, dependencies, delays, customer exposure, operating risk, and difficulty of reversal."
    },
    {
      title: "Next decision record",
      description: "The approved boundary, owner, deadline, next conditions, and date of the following continuation decision."
    }
  ],
  prerequisites: [
    "A defined initiative with a clear approval basis",
    "A specific funding, production, scale, renewal, or continuation decision",
    "Access to the delivery record and evidence gathered since the last decision",
    "A sponsor and decision owner able to act on the opinion",
    "Agreement that missed conditions and unresolved disagreement can be recorded"
  ],
  notIncluded: [
    "Daily programme governance, delivery management, or team supervision",
    "Management's operating controls",
    "Approval based on money already spent",
    "Specialist audits, certifications, legal opinions, or investment advice"
  ],
  related: [
    {
      label: "Review before initial approval",
      href: "/reviews/independent-initiative-review",
      description: "Examine the case and set approval conditions before the initiative begins."
    },
    {
      label: "Rebuild a weak decision case",
      href: "/reviews/decision-case-reconstruction",
      description: "Rework a potentially viable proposal whose current logic can no longer support commitment."
    },
    {
      label: "Recognise delay or scope drift",
      href: "/situations#after-drift",
      description: "See when an active programme needs a continuation decision before its roadmap is extended."
    }
  ],
  ctaTitle: "Request an Independent Continuation Review before the next release.",
  ctaText: "Send the original approval basis, the initiative's current position, the next commitment, and its decision date."
};

export default function IndependentContinuationReviewPage() {
  return <ReviewServicePage content={content} />;
}
