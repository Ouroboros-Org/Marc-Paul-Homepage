import type { Metadata } from "next";
import { ReviewServicePage, type ServicePageContent } from "@/components/review-service-page";

export const metadata: Metadata = {
  title: "Independent Initiative Review for AI and Software Decisions",
  description:
    "A 5 to 10 working day independent review of one material AI or software decision, with an opinion, conditions, and decision record.",
  alternates: { canonical: "/reviews/independent-initiative-review" },
  openGraph: {
    title: "Independent Initiative Review",
    description: "Examine the evidence, exposure, and conditions behind a material technology commitment.",
    url: "/reviews/independent-initiative-review"
  }
};

const content: ServicePageContent = {
  slug: "independent-initiative-review",
  eyebrow: "Primary service / Independent opinion",
  title: "Independent Initiative Review",
  lead:
    "I examine whether the evidence for one defined AI or software initiative supports the next commitment and what conditions should govern it.",
  status: "One initiative / one defined decision",
  duration: "Usually 5–10 working days",
  fee: "$8,000–$15,000",
  decision:
    "Does the evidence available now justify this commitment, and which conditions should govern it?",
  introduction: [
    "Ask me to review the initiative when approval, funding, production, scale, continuation, restructuring, pause, or closure is due. I cover one initiative, not the company's entire strategy or future prospects.",
    "I give the decision owner my opinion, any conditions attached to it, and records of the assumptions, realistic alternatives, exposure, and material disagreement. My conclusion does not depend on approval."
  ],
  decisionExamples: [
    "Should the company approve this AI product investment?",
    "Does the pilot evidence justify production in additional markets?",
    "Should the board release another funding tranche for the delayed platform programme?",
    "Does the software rebuild justify its scope, or should the commitment be staged?",
    "Should an investor support the portfolio company's product reset or recovery plan?",
    "Does the current case support continuation, restructuring, a pause, or closure?"
  ],
  reviewAreas: [
    {
      title: "Intended result and problem",
      description: "I establish whether the intended result matters, the customer or operating problem is supported, and the initiative can plausibly change it."
    },
    {
      title: "Product and technology fit",
      description: "I assess whether the proposed mechanism, system, and technical capability fit the task under ordinary operating conditions."
    },
    {
      title: "Demand and adoption evidence",
      description: "I examine what customers or internal users have done, committed, paid for, or changed, and I keep stated preference separate from observed behaviour."
    },
    {
      title: "Economics and resources",
      description: "I review the full delivery and operating cost, resource model, expected return, and any omitted work that changes the economics."
    },
    {
      title: "Delivery conditions",
      description: "I check team capacity, data, integration, vendor dependencies, delivery sequence, accountability, and how early failure can be detected."
    },
    {
      title: "Exposure and alternatives",
      description: "I set out the possible consequences, weak evidence, discovery delay, difficulty of reversal, and realistic alternatives to full approval."
    }
  ],
  outputs: [
    {
      title: "Review opinion",
      description: "My conclusion to proceed, add conditions, stage, rework, pause, or stop under the current case."
    },
    {
      title: "Decision and assumption record",
      description: "My record of the decision, intended result, requested commitment, material assumptions, available evidence, and named owners."
    },
    {
      title: "Exposure and conditions register",
      description: "My record of exposure to loss, delay, dependency, or lock-in, with observable conditions for the next commitment."
    },
    {
      title: "Decision record",
      description: "A concise leadership and board record of what was reviewed, excluded, disputed, decided, and assigned."
    }
  ],
  prerequisites: [
    "A specific decision, deadline, and requested commitment",
    "A named decision owner and authorised sponsor",
    "One bounded initiative",
    "Access to the relevant documents, data, and stakeholders",
    "Permission to record material disagreement and reach an unfavourable conclusion"
  ],
  notIncluded: [
    "Implementation delivery or programme management",
    "Source-code review, penetration testing, or security certification",
    "Financial audit, legal opinion, regulatory certification, or investment advice",
    "General strategy, coaching, recruitment, or pitch-deck preparation"
  ],
  related: [
    {
      label: "If the case needs reconstruction",
      href: "/reviews/decision-case-reconstruction",
      description: "Rebuild the proposal around defensible logic, evidence, scope, economics, and ownership."
    },
    {
      label: "At the next decision gate",
      href: "/reviews/independent-continuation-review",
      description: "Reassess the conditions before the next funding, production, scale, or renewal decision."
    },
    {
      label: "For an AI-specific decision",
      href: "/reviews/ai-initiative-review",
      description: "Include evaluation, correction work, reliability, containment, and model dependency in the review."
    }
  ],
  ctaTitle: "Request an Independent Initiative Review while the decision remains open.",
  ctaText: "Send me the decision, initiative, deadline, and requested commitment. A short account is enough for me to assess scope and fit."
};

export default function IndependentInitiativeReviewPage() {
  return <ReviewServicePage content={content} />;
}
