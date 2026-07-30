export const siteUrl = "https://www.marcpaul.tech";

export const primaryReview = {
  slug: "independent-initiative-review",
  shortTitle: "Initiative Review",
  title: "Independent Initiative Review",
  label: "Primary engagement",
  description:
    "Independent assessment of one defined AI or software initiative before funding, production, scale, or continuation.",
  decision:
    "Should the organisation proceed, stage the commitment, rework the case, pause, or stop under the evidence available now?",
  duration: "Usually 5 to 10 working days after access is confirmed",
  href: "/reviews/independent-initiative-review",
} as const;

export const reviews = [
  primaryReview,
  {
    slug: "decision-case-reconstruction",
    shortTitle: "Case Reconstruction",
    title: "Decision Case Reconstruction",
    label: "When the current proposal cannot support approval",
    description:
      "Reconstruction of the logic, evidence, scope, economics, and ownership of a proposal that is not ready for approval.",
    decision:
      "What would make this a credible, bounded investment case, and what evidence is needed before approval?",
    duration: "Set by the gaps in the existing case",
    href: "/reviews/decision-case-reconstruction",
  },
  {
    slug: "independent-continuation-review",
    shortTitle: "Continuation Review",
    title: "Independent Continuation Review",
    label: "For initiatives already under way",
    description:
      "Independent reassessment of an active initiative before another release of funding, scope, time, or customer exposure.",
    decision:
      "Do the original conditions still hold, and should the next commitment be released, narrowed, delayed, or withheld?",
    duration: "Defined review points over an agreed period",
    href: "/reviews/independent-continuation-review",
  },
] as const;

export const situations = [
  {
    id: "before-approval",
    number: "01",
    title: "Before approval",
    summary:
      "Management is requesting a material commitment. The proposal treats customer demand, technical feasibility, delivery capacity, and expected return as one settled conclusion.",
    signals: [
      "The initiative is difficult to challenge internally",
      "Alternatives received little serious attention",
      "The proposed commitment will be expensive to reverse",
    ],
    review: "Independent Initiative Review",
    href: "/reviews/independent-initiative-review",
  },
  {
    id: "before-scale",
    number: "02",
    title: "Before pilot-to-production",
    summary:
      "A pilot or demonstration worked under limited conditions. Production brings operating cost, customer exposure, integration work, and new accountability into the decision.",
    signals: [
      "Pilot results exclude manual correction or support work",
      "Production economics are still estimates",
      "Failure detection and ownership remain unclear",
    ],
    review: "Independent Initiative Review for AI",
    href: "/reviews/ai-initiative-review",
  },
  {
    id: "after-drift",
    number: "03",
    title: "After delay or scope drift",
    summary:
      "The roadmap, cost, or intended outcome has changed. The initiative is still being judged against the case that secured its original approval.",
    signals: [
      "More work is being funded without better evidence",
      "The original decision conditions are no longer visible",
      "Teams debate execution while the investment premise goes untested",
    ],
    review: "Independent Continuation Review",
    href: "/reviews/independent-continuation-review",
  },
  {
    id: "before-funding",
    number: "04",
    title: "Before renewed funding",
    summary:
      "An investor, finance leader, or board is being asked to release another tranche, extend the runway, or support a recovery plan.",
    signals: [
      "Progress reports list activity without evidence of outcomes",
      "The latest request relies on assumptions from an earlier plan",
      "No one has defined what would justify withholding the next commitment",
    ],
    review: "Independent Initiative Review",
    href: "/reviews/independent-initiative-review",
  },
  {
    id: "before-restructure",
    number: "05",
    title: "Before restructuring or closure",
    summary:
      "The organisation must decide whether a narrower version remains defensible, the case needs to be rebuilt, or further exposure should end.",
    signals: [
      "A narrower version of the initiative may remain viable",
      "Past spending is influencing the next decision",
      "Management needs a usable record of why the direction changed",
    ],
    review: "Decision Case Reconstruction",
    href: "/reviews/decision-case-reconstruction",
  },
] as const;

export const deliverables = [
  {
    title: "Review opinion",
    description:
      "A clear recommendation, its limits, any conditions attached to it, and the points that remain unresolved.",
  },
  {
    title: "Decision map",
    description:
      "The decision, intended result, proposed commitment, realistic alternatives, and decision owner.",
  },
  {
    title: "Assumption record",
    description:
      "The claims carrying the case, the evidence for each claim, and the owner of any remaining uncertainty.",
  },
  {
    title: "Exposure record",
    description:
      "Potential loss, delay, dependencies, customer impact, and commitments that would be hard to undo.",
  },
  {
    title: "Conditions register",
    description:
      "Observable requirements for releasing funds, expanding scope, entering production, or stopping.",
  },
  {
    title: "Decision record",
    description:
      "A short account of what was reviewed and decided, including material disagreement and the next review point.",
  },
] as const;

export const reviewOutcomes = [
  "Proceed",
  "Proceed under conditions",
  "Stage the commitment",
  "Rework the case",
  "Pause",
  "Stop under the current case",
] as const;

export const audience = [
  {
    title: "Company leadership",
    description:
      "Founders, CEOs, CFOs, and executive sponsors in growth-stage technology companies deciding whether the expected value justifies the commitment.",
  },
  {
    title: "Boards and finance leaders",
    description:
      "Boards and finance leaders seeking a decision-ready view of the evidence, economics, delivery conditions, exposure, and alternatives.",
  },
  {
    title: "Investors",
    description:
      "Investors assessing a defined portfolio-company initiative, follow-on commitment, product reset, or recovery plan. Full transaction diligence remains outside scope.",
  },
] as const;

export const unsuitableWork = [
  "General strategy, innovation workshops, or founder coaching",
  "Implementation outsourcing, software development, or recruitment",
  "Source-code review, penetration testing, or security certification",
  "Financial audit, legal opinion, regulatory certification, or investment advice",
  "Open-ended operational management or a mandate to validate a preferred answer",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
