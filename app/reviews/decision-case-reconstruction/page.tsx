import type { Metadata } from "next";
import { ReviewServicePage, type ServicePageContent } from "@/components/review-service-page";

export const metadata: Metadata = {
  title: "AI & Software Decision Case Reconstruction",
  description:
    "Rebuild an incomplete AI or software investment case before the next approval, funding, or scale decision.",
  alternates: { canonical: "/reviews/decision-case-reconstruction" },
  openGraph: {
    title: "Decision Case Reconstruction",
    description: "Rework an incomplete technology proposal until it can support a decision, or establish that it should close.",
    url: "/reviews/decision-case-reconstruction"
  }
};

const content: ServicePageContent = {
  slug: "decision-case-reconstruction",
  eyebrow: "Investment case service / Rebuild the proposal",
  title: "Decision Case Reconstruction",
  lead:
    "A structured reconstruction of an AI or software proposal whose evidence, scope, economics, delivery plan, or ownership cannot yet support approval.",
  status: "Defined proposal / incomplete case",
  duration: "Scoped to the gaps in the case",
  decision:
    "What must change, and what evidence is still needed, before this initiative can return for a decision?",
  introduction: [
    "Use this service when the opportunity may be real but the requested scope, timing, product mechanism, resource plan, or return lacks sufficient support.",
    "I provide a reconstructed decision case, a record of the alternatives and revised scope, a validation plan, and a brief for the next approval point. Management remains responsible for the proposal and final decision."
  ],
  decisionExamples: [
    "Can a broad AI programme become a defensible first commitment?",
    "What evidence does the business case need before funding can be considered?",
    "Should the organisation build, buy, partner, wait, or use a non-AI option?",
    "Can the scope and economics of a platform rebuild fit the available delivery capacity?",
    "What test would show whether a product opportunity exists beyond the demonstration?",
    "Which conditions would make a revised proposal ready for reconsideration?"
  ],
  reviewAreas: [
    {
      title: "Decision structure",
      description: "The problem, solution fit, delivery choice, and timing are separated so each part can be assessed on its own evidence."
    },
    {
      title: "Investment logic",
      description: "The link from problem and proposed mechanism through adoption, capability, operation, economics, and measurable result."
    },
    {
      title: "Credible alternatives",
      description: "Comparison of full approval with a smaller version, staged funding, a narrower test, buying, partnering, waiting, the current process, or closure."
    },
    {
      title: "Evidence plan",
      description: "The evidence required for decisive assumptions, with validation work kept proportionate to the proposed commitment."
    },
    {
      title: "Scope and economics",
      description: "Alignment of the proposed result, technical boundary, resource model, operating cost, timing, and expected return."
    },
    {
      title: "Conditions and ownership",
      description: "A named owner and date for each evidence task, funding gate, stop condition, and next decision."
    }
  ],
  outputs: [
    {
      title: "Reconstructed decision case",
      description: "A revised account of the problem, proposed mechanism, evidence, economics, delivery conditions, and exposure."
    },
    {
      title: "Alternative and scope record",
      description: "The credible options considered, reasons for exclusion, and boundaries of the revised proposal."
    },
    {
      title: "Validation and conditions plan",
      description: "The remaining evidence required, who will obtain it, when it is due, and the decision it will inform."
    },
    {
      title: "Re-entry decision brief",
      description: "A concise brief for the next approval point, showing what changed and what remains unresolved."
    }
  ],
  prerequisites: [
    "A defined proposal addressing a real opportunity or obligation",
    "A sponsor prepared to reconsider scope, timing, and alternatives",
    "Access to the existing case, financial assumptions, delivery plan, and evidence",
    "Named owners for the revised decision and evidence work",
    "Permission to conclude that rebuilding the proposal is unwarranted"
  ],
  notIncluded: [
    "Open-ended corporate strategy or innovation workshops",
    "A promotional business case written to secure a predetermined approval",
    "Product delivery, recruitment, vendor procurement, or operation of the evidence plan",
    "Legal, security, financial, or specialist technical work"
  ],
  related: [
    {
      label: "Review the existing case",
      href: "/reviews/independent-initiative-review",
      description: "Use an independent review when a defined proposal and decision are already on the table."
    },
    {
      label: "Reassess an active programme",
      href: "/reviews/independent-continuation-review",
      description: "Use a continuation review when the next release of funding or scope needs a fresh decision."
    },
    {
      label: "Find the relevant decision point",
      href: "/situations",
      description: "Compare the services for approval, scale, programme drift, renewed funding, and closure."
    }
  ],
  ctaTitle: "Rebuild the proposal before it returns for a decision.",
  ctaText: "Send the decision, the parts of the case that no longer hold, and the date management needs a revised proposal."
};

export default function DecisionCaseReconstructionPage() {
  return <ReviewServicePage content={content} />;
}
