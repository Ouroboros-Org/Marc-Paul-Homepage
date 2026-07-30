export type ISODate = `${number}-${number}-${number}`;

export type ArticleCategory =
  | "AI investment"
  | "AI delivery"
  | "Software investment"
  | "AI systems"
  | "Decision quality"
  | "Archive / AI policy"
  | "Archive / AI systems"
  | "Archive / Media"
  | "Archive / Future scenario"
  | "Archive / Immersive learning"
  | "Archive / Decision quality"
  | "Archive / Speaking"
  | "Archive / Emerging technology"
  | "Archive / Digital economy";

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  id: string;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface ListBlock {
  type: "list";
  style: "ordered" | "unordered";
  items: readonly string[];
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface NoteBlock {
  type: "note";
  tone: "archive" | "context" | "decision";
  label?: string;
  text: string;
}

export interface LinkBlock {
  type: "link";
  href: string;
  text: string;
  external?: boolean;
}

export type ArticleContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | NoteBlock
  | LinkBlock;

export interface Article {
  slug: string;
  title: string;
  description: string;
  dek: string;
  publishedAt: ISODate;
  displayDate: string;
  updatedAt?: ISODate;
  readTime: string;
  category: ArticleCategory;
  featured: boolean;
  legacy: boolean;
  keywords: readonly string[];
  content: readonly ArticleContentBlock[];
}

export const posts: readonly Article[] = [
  {
    slug: "ai-pilot-to-production-decision",
    title: "The AI pilot worked. Should it go into production?",
    description:
      "Before moving an AI pilot into production, check what the test covered, which outputs people corrected, the full operating cost and who can stop the system.",
    dek:
      "The demonstration ran on selected cases with the project team close by. A production budget has to cover the conditions the trial did not exercise.",
    publishedAt: "2026-07-28",
    displayDate: "28 July 2026",
    updatedAt: "2026-07-30",
    readTime: "8 min",
    category: "AI delivery",
    featured: true,
    legacy: false,
    keywords: [
      "AI pilot to production",
      "AI production readiness review",
      "AI scaling decision",
      "AI pilot evaluation",
      "independent AI initiative review",
    ],
    content: [
      {
        type: "paragraph",
        text: "The pilot handled the selected cases, and invited testers found useful work for it. That result is enough to discuss a production release. Questions about ordinary inputs, operating cost and the authority to intervene remain open.",
      },
      {
        type: "paragraph",
        text: "During a pilot, project staff can screen inputs, coach users and repair awkward output before it causes trouble. Production removes much of that shelter. Demand spikes, new staff arrive without the design rationale, and exceptions land with whoever is available.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-the-pilot-proved",
        text: "The limits of the pilot result",
      },
      {
        type: "paragraph",
        text: "A result often expands as it moves up an organisation. Acceptable answers on a reviewed sample become a claim about departmental automation. Encouraging comments from invited users turn into an adoption forecast. By the time the funding paper reaches its approver, it may describe a test that never took place.",
      },
      {
        type: "paragraph",
        text: "Keep a test record with the sample, excluded cases and selection criteria. Name the people who prepared data or edited output. Include the comparison, test period and work performed outside the interface. The result may still be positive, but the record shows exactly how far it reaches.",
      },
      {
        type: "note",
        tone: "decision",
        label: "For the approval paper",
        text: "State the production commitment supported by the pilot evidence. Keep the eventual product ambition in a separate paragraph.",
      },
      {
        type: "heading",
        level: 2,
        id: "production-case",
        text: "Costs and responsibilities outside the model",
      },
      {
        type: "paragraph",
        text: "The production service depends on data access, integrations and staff behaviour as much as model output. Someone must monitor performance and handle wrong answers. Mandatory human review belongs in the cost model. The approval paper should also state what happens if a model provider changes its price, policy or availability.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Problem: the workflow failure costs enough to warrant changing it.",
          "Evaluation: the test set resembles production inputs and includes expensive failure cases.",
          "Staff work: review time, corrections, escalation and support appear in the operating plan.",
          "Cost: model use, infrastructure and maintenance remain affordable at forecast volume.",
          "Containment: staff can find a serious error before it passes into another process.",
          "Ownership: named people can change permissions, suspend use and retire the system.",
        ],
      },
      {
        type: "paragraph",
        text: "Strong model performance does not settle the production case. Customers may withhold the required data, the workflow may have nowhere safe to send uncertain output, or review labour may consume the saving. The budget commits the organisation to those operating conditions as well as the model.",
      },
      {
        type: "heading",
        level: 2,
        id: "funding-conditions",
        text: "A smaller production commitment",
      },
      {
        type: "paragraph",
        text: "The next release might cover one workflow, a volume cap or a limited group of accounts. Hiring can wait, and a vendor expansion can depend on a customer commitment. Choose a release that exposes production behaviour while reversal is still affordable.",
      },
      {
        type: "paragraph",
        text: "Write each condition as an observable threshold with an owner and review date. “Quality should improve” gives the sponsor nothing to decide. A measured error range on representative cases, paired with a ceiling for correction time, can govern whether the next release occurs.",
      },
      {
        type: "quote",
        text: "Approve the production exposure you can describe and control.",
      },
      {
        type: "heading",
        level: 2,
        id: "independent-review",
        text: "Independent review of a production decision",
      },
      {
        type: "paragraph",
        text: "The proposed production release is treated as one defined decision. The claimed business result is compared with the product mechanism, test evidence and full operating cost. If management and engineering read the same result differently, both readings remain visible in the decision record.",
      },
      {
        type: "paragraph",
        text: "My opinion may support the proposed release, set conditions for a narrower one or call for another test. If correction time doubles when the project team steps away, the approval should already identify who measures it and which spending stops.",
      },
    ],
  },
  {
    slug: "review-ai-business-case-before-funding",
    title: "Review the AI business case before funding the initiative",
    description:
      "Questions for boards and investors before they approve AI budgets, headcount, vendor contracts or another funding round.",
    dek:
      "Model capability settles one claim in the AI business case. The budget still rests on customer behaviour, staff workload and costs that sit outside the prototype.",
    publishedAt: "2026-07-28",
    displayDate: "28 July 2026",
    updatedAt: "2026-07-30",
    readTime: "9 min",
    category: "AI investment",
    featured: true,
    legacy: false,
    keywords: [
      "AI business case review",
      "AI project funding decision",
      "AI investment due diligence",
      "AI initiative economics",
      "independent initiative review",
    ],
    content: [
      {
        type: "paragraph",
        text: "An AI funding request often places the market claim, product concept, technical plan and financial return in one proposal. The figures line up on the page even when their evidence comes from separate tests run under different conditions.",
      },
      {
        type: "paragraph",
        text: "The board has a specific choice: should this company release this money under the case presented? General confidence in AI has little bearing on that vote.",
      },
      {
        type: "heading",
        level: 2,
        id: "reconstruct-the-case",
        text: "The claims behind the return",
      },
      {
        type: "paragraph",
        text: "The projected return sits at the end of a chain. Customers must care enough about the problem to change behaviour. The product has to alter their workflow, the company has to run it at the assumed cost, and adoption must last long enough for the revenue or saving to appear.",
      },
      {
        type: "paragraph",
        text: "Evidence gets stretched when those claims stay bundled. A benchmark supports model performance under its test conditions, but says little about price. Customer interviews may establish frustration while leaving the proposed workflow untested. A vendor quote can cover model use and omit integration or staff review.",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "State the business result attached to the funding request.",
          "Show how the proposed workflow produces that result.",
          "Mark the assumptions whose failure removes most of the value.",
          "Attach the relevant evidence to each material assumption.",
          "Calculate what the company will spend before it can learn whether the assumption holds.",
        ],
      },
      {
        type: "heading",
        level: 2,
        id: "weak-business-case",
        text: "Where the proposal usually thins out",
      },
      {
        type: "paragraph",
        text: "Technology is often the best-supported part of the paper. The weak claim may concern a buyer who expressed interest without assigning budget. Staff may keep the old workflow, or human review may remove the projected margin. Technical completion can also arrive months before routine operational use.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Customers have shown interest, though none has accepted the price or data requirement.",
          "A demonstration at low volume stands in for reliability in a higher-consequence process.",
          "Evaluation, correction time and monitoring sit outside the cost model.",
          "The forecast counts a saving without identifying which budget or role can be removed or reassigned.",
          "No named owner has secured the required data access, integration work or specialist time.",
          "The comparison omits a narrower service, a purchased tool or a change that uses no AI.",
        ],
      },
      {
        type: "paragraph",
        text: "Each gap calls for a different commitment. Weak demand evidence may justify a paid design-partner test. An uncertain operating cost may justify a capped live trial. A full team and a multi-year platform agreement would run ahead of either result.",
      },
      {
        type: "heading",
        level: 2,
        id: "evidence-and-exposure",
        text: "How much is spent before the answer arrives?",
      },
      {
        type: "paragraph",
        text: "The funding decision sets how much cash and organisational change are committed while a decisive claim remains weakly supported. A short experiment keeps that exposure lower than a broad rollout or a contract with a costly exit.",
      },
      {
        type: "paragraph",
        text: "Timing changes the risk. If retention cannot be observed for eighteen months, the company may keep hiring long after demand has weakened. The approval needs an earlier signal, a review date and a spending limit that applies before the retention result arrives.",
      },
      {
        type: "note",
        tone: "decision",
        label: "Funding exposure",
        text: "Record the cash, hires and contractual lock-in created before the next decisive evidence can appear.",
      },
      {
        type: "heading",
        level: 2,
        id: "fundable-conditions",
        text: "Conditions tied to an actual release",
      },
      {
        type: "paragraph",
        text: "A condition should control an action the company can withhold. Paid customer participation might permit two engineering hires. Confirmed data rights could release an integration budget. A correction-time ceiling at a defined volume might govern production expansion.",
      },
      {
        type: "paragraph",
        text: "Name who determines whether the threshold was met and which data they will use. A project team that can revise the measure after seeing the result controls its own funding gate.",
      },
      {
        type: "heading",
        level: 2,
        id: "independent-business-case-review",
        text: "Independent review of the AI business case",
      },
      {
        type: "paragraph",
        text: "The review addresses the commitment in the funding paper. It traces the projected return to its supporting claims, tests the evidence and compares the proposed plan with available alternatives. Funding conditions and unresolved disagreement remain in the same decision record.",
      },
      {
        type: "paragraph",
        text: "If the case is incomplete, the next tranche can be limited to the missing evidence. A proposal that assumes five design partners will pay within the quarter should contain those commitments in its evidence pack before the board approves the hiring plan.",
      },
    ],
  },
  {
    slug: "delayed-software-program-continuation-decision",
    title: "A delayed software program needs a continuation decision, not another forecast",
    description:
      "A delayed software program review should compare remaining value, exit cost and usable work before another funding release.",
    dek:
      "The revised date explains the current schedule. The funding decision depends on the programme that exists now and the value still available.",
    publishedAt: "2026-07-28",
    displayDate: "28 July 2026",
    updatedAt: "2026-07-30",
    readTime: "8 min",
    category: "Software investment",
    featured: true,
    legacy: false,
    keywords: [
      "delayed software program review",
      "software project continuation decision",
      "software investment review",
      "program recovery assessment",
      "continue pause or stop project",
    ],
    content: [
      {
        type: "paragraph",
        text: "Delay usually produces another plan. Milestones move, reporting changes and a recovery lead presents a new completion date. That plan may improve delivery, but it does not answer whether the remaining programme deserves funding.",
      },
      {
        type: "paragraph",
        text: "Treat continuation as a fresh investment. Compare the cash, staff time and disruption still required with the value available today. The original budget describes history. It sets no floor for future spending.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-changed",
        text: "What the delay revealed",
      },
      {
        type: "paragraph",
        text: "A missed date may expose an execution problem inside an otherwise sound case. It can also reveal a vague product, an infeasible integration or a vendor dependency that nobody priced. Sometimes the business cannot absorb the process change. Calling every one of these a delivery delay conceals the decision in front of management.",
      },
      {
        type: "paragraph",
        text: "The benefit can decay while the team works. Customers adopt another process, a commercial window closes or expected savings are assigned elsewhere. The chosen architecture may now cost more to maintain than the system it would replace. Recalculate the remaining spend and the remaining benefit from the same date.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Scope: compare the current backlog with the product that received approval.",
          "Evidence: record what delivery has shown about demand and feasibility.",
          "Cost: include transition work, support and the management time still required.",
          "Benefit: recalculate the expected result on the revised launch date.",
          "Alternatives: price a narrower build, a purchase and continued use of the current process.",
          "Exit: identify contracts, roles and dependencies that make a change expensive.",
        ],
      },
      {
        type: "heading",
        level: 2,
        id: "sunk-cost-and-assets",
        text: "Sunk cost and usable work",
      },
      {
        type: "paragraph",
        text: "Past spending gives no basis for another release. The programme may still have produced assets worth keeping: cleaned data, a proven integration, reusable components or a team with a sharper understanding of the domain. Price those assets into each option now under consideration.",
      },
      {
        type: "paragraph",
        text: "A narrower service might keep the completed integration and discard the rest of the scope. A purchased platform could use the cleaned data. Closing the programme may release specialists for another commitment. The recovery value differs across those choices and should appear beside their transition costs.",
      },
      {
        type: "heading",
        level: 2,
        id: "continuation-options",
        text: "Options for the next commitment",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "Continue the current scope under the revised cost and schedule.",
          "Fund one milestone that resolves the largest open technical question.",
          "Narrow the product around the benefit with the strongest evidence.",
          "Rebuild the investment case around a different delivery plan.",
          "Pause until a named customer, vendor or operating condition is secured.",
          "Close the work and manage the contractual, technical and staffing exit.",
        ],
      },
      {
        type: "paragraph",
        text: "Put transition cost beside every option. Closure can trigger contract payments and migration work. Continuation can extend duplicate systems and scarce staffing. Both belong in the comparison.",
      },
      {
        type: "note",
        tone: "decision",
        label: "Board question",
        text: "Would the organisation approve the remaining scope, cost and timing today if the programme arrived as a new proposal?",
      },
      {
        type: "heading",
        level: 2,
        id: "conditions-for-continuation",
        text: "Controls for another release",
      },
      {
        type: "paragraph",
        text: "A date provides a forecast, not a spending control. The continuation record should fix the funded scope and assign each dependency. It should also name the evidence required for the next release, such as an accepted integration, a cost ceiling or signed operational ownership.",
      },
      {
        type: "paragraph",
        text: "Report against those conditions. A rising ticket count can coexist with a deteriorating economic case. The decision owner needs the cost to reach the next gate, the evidence gathered since approval and any movement in the expected benefit.",
      },
      {
        type: "heading",
        level: 2,
        id: "independent-continuation-review",
        text: "Independent review of the continuation decision",
      },
      {
        type: "paragraph",
        text: "The review compares the approved initiative with the programme now requesting money. It tests the original conditions, evidence gathered during delivery and changes in scope, then prices the options still available. Programme management stays with the client team.",
      },
      {
        type: "paragraph",
        text: "My opinion may support another release, a smaller scope or an exit. A six-month extension that depends on one unresolved integration should identify the owner, test date and spending cap for that dependency before work resumes.",
      },
    ],
  },
  {
    slug: "prototype-is-not-a-product",
    title: "What an AI prototype proves before production",
    description:
      "How to define the evidence from an AI prototype, identify the production questions that remain open, and scope the next investment decision.",
    dek:
      "A prototype can establish technical feasibility under selected conditions. Production readiness requires evidence about ordinary use, operating cost, support, reliability, and control.",
    publishedAt: "2026-06-18",
    displayDate: "18 June 2026",
    updatedAt: "2026-07-30",
    readTime: "6 min",
    category: "AI delivery",
    featured: false,
    legacy: false,
    keywords: [
      "AI prototype vs product",
      "AI prototype evaluation",
      "AI product readiness",
      "prototype investment decision",
      "AI feasibility evidence",
    ],
    content: [
      {
        type: "paragraph",
        text: "A prototype is designed to answer a bounded question. It may show that a model can extract fields from a selected document set, generate a useful draft, or complete part of a workflow under supervised conditions.",
      },
      {
        type: "paragraph",
        text: "The mistake is to expand that result into a product claim. Technical feasibility under selected conditions does not establish adoption, reliability, operating cost, support capacity, compliance, or dependable performance at production volume.",
      },
      {
        type: "paragraph",
        text: "The prototype remains valuable because it narrows uncertainty. The next investment should target the production assumption that still carries the case rather than fund a broad rollout around an untested claim.",
      },
      {
        type: "heading",
        level: 2,
        id: "prototype-boundary",
        text: "What happened inside the test",
      },
      {
        type: "paragraph",
        text: "Prototype conditions are usually favourable by design. The team limits scope, prepares inputs and stays nearby to explain failures. Early users know they are testing unfinished work, so they tolerate delays and workarounds that ordinary users may reject.",
      },
      {
        type: "paragraph",
        text: "The test record should list included cases, work performed outside the interface and any edited output. It should explain how quality was judged and where testing stopped. That boundary determines which funding claim the result can support.",
      },
      {
        type: "heading",
        level: 2,
        id: "product-questions",
        text: "Questions left for the product case",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Will intended users change their routine once the project team leaves?",
          "How does performance change on incomplete and unusual inputs?",
          "Where do unfinished cases go, and how much staff time do they consume?",
          "Who detects a quality change after the model or source data changes?",
          "Does the price or saving still work after support and review are included?",
          "Can the company reverse a costly wrong action before it spreads?",
        ],
      },
      {
        type: "paragraph",
        text: "The system’s role sets the evidence requirement. A specialist drafting aid can tolerate failures that would be unacceptable in a customer-facing process or a tool that moves money. The greater the consequence, the less a polished demonstration can establish on its own.",
      },
      {
        type: "heading",
        level: 2,
        id: "next-commitment",
        text: "The next test and the next cheque",
      },
      {
        type: "paragraph",
        text: "“Scale the prototype” gives no boundary for spending. The next budget should name the open question it will settle. That could mean a representative quality evaluation, a paid customer trial, a supervised live release or a short integration test against the dependency carrying the schedule.",
      },
      {
        type: "note",
        tone: "decision",
        label: "Before the next release",
        text: "Write the tested claim, the production assumption still carrying the case and the evidence this budget must produce.",
      },
      {
        type: "paragraph",
        text: "If the prototype proved extraction quality, the next budget might measure correction time in a live queue. A department-wide rollout can wait for that figure.",
      },
    ],
  },
  {
    slug: "where-agents-need-boundaries",
    title: "Define the operating boundary of an AI agent",
    description:
      "An AI agent investment case should specify permissions, reversible actions, exception handling, auditability, operating cost, and authority to suspend the system.",
    dek:
      "An agent with tool access needs a defined role, a controlled workspace, visible limits, and accountable oversight.",
    publishedAt: "2026-05-02",
    displayDate: "2 May 2026",
    updatedAt: "2026-07-30",
    readTime: "6 min",
    category: "AI systems",
    featured: false,
    legacy: false,
    keywords: [
      "AI agent boundaries",
      "agentic AI governance",
      "AI agent permissions",
      "AI agent operating model",
      "AI agent risk review",
    ],
    content: [
      {
        type: "paragraph",
        text: "The external-contractor analogy is useful. Give the agent a clear brief, the context it needs, a place to keep notes and a task list that shows progress. Then define who reviews the work. Flexibility is useful only when the agent can stay oriented to the job.",
      },
      {
        type: "paragraph",
        text: "Once the agent can update a record, contact a customer, run code or approve a refund, it has authority inside an operating process. That authority should be specified action by action, including the handoff when the system reaches a limit or leaves a task half-complete.",
      },
      {
        type: "heading",
        level: 2,
        id: "operating-envelope",
        text: "The operating envelope",
      },
      {
        type: "paragraph",
        text: "Start with one purpose, a named set of tools and approved data sources. Mark which actions can be undone and which require confirmation. Uncertain cases need a destination, and the operator needs a usable history of what the agent attempted before the handoff.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Which records may the agent read, and for how long may it retain them?",
          "Which actions can run without a person confirming them?",
          "What amount, destination or volume triggers a second check?",
          "Which information stays inside the approved system boundary?",
          "How does an operator restore state after a partial action?",
          "Who receives an exception during and outside business hours?",
        ],
      },
      {
        type: "paragraph",
        text: "These answers shape the technical build and its running cost. Human approval may contain the riskiest action, though every approval adds labour and delay. Narrow permissions reduce the initial feature set and leave a clearer incident trail for support staff.",
      },
      {
        type: "heading",
        level: 2,
        id: "evaluate-workflow",
        text: "Evaluation beyond the staged conversation",
      },
      {
        type: "paragraph",
        text: "A fluent conversation reveals little about an unavailable tool or a half-completed action. Test ordinary tasks alongside missing context, conflicting instructions and cases where the agent should stop. Record whether staff detect the error, how much state changed and how long restoration takes.",
      },
      {
        type: "paragraph",
        text: "The budget pays for the full workflow, including its controls. Recalculate the projected benefit with confirmation steps, exception queues and the support burden observed during the test.",
      },
      {
        type: "heading",
        level: 2,
        id: "ownership",
        text: "Named ownership",
      },
      {
        type: "paragraph",
        text: "Assign authority over permissions, incidents and suspension. Providers and implementation partners may support the system, but someone inside the operating organisation still needs the right and the time to change or stop it.",
      },
      {
        type: "note",
        tone: "decision",
        label: "Before funding",
        text: "Recalculate the benefit after permission limits, human approvals and exception work have been added.",
      },
      {
        type: "paragraph",
        text: "A proposal for a general digital colleague leaves the first approval almost unbounded. An agent limited to drafting replies and creating unsubmitted tickets gives the decision owner a defined scope. The first live review can then examine the draft quality, exception queue and staff correction time.",
      },
    ],
  },
  {
    slug: "skepticism-is-a-design-tool",
    title: "Constructive skepticism improves technology investment decisions",
    description:
      "How constructive skepticism turns broad technology promises into testable assumptions, funding conditions, and proportionate commitments.",
    dek:
      "Skepticism works as a circuit breaker when it turns concern into a test, a funding condition, or a limit on exposure.",
    publishedAt: "2026-03-11",
    displayDate: "11 March 2026",
    updatedAt: "2026-07-30",
    readTime: "5 min",
    category: "Decision quality",
    featured: false,
    legacy: false,
    keywords: [
      "constructive skepticism in technology",
      "AI initiative assumptions",
      "technology decision evidence",
      "software investment review",
      "decision integrity",
    ],
    content: [
      {
        type: "paragraph",
        text: "Curiosity gets a technology initiative moving. Skepticism acts as the circuit breaker: it should interrupt a risky current without stopping the whole system by default.",
      },
      {
        type: "paragraph",
        text: "At the funding table, skepticism has a practical job: identify the conditions on which the proposed result depends. A useful challenge ends with a claim the team can test or a commitment the approver can limit.",
      },
      {
        type: "paragraph",
        text: "Write those conditions plainly. The company has permission to use the required data. Staff can handle the system’s errors. Customers will accept the changed workflow. The saving remains after review time is counted. Each statement needs its own evidence.",
      },
      {
        type: "heading",
        level: 2,
        id: "skepticism-and-ambition",
        text: "When teams agree on the idea and assume different plans",
      },
      {
        type: "paragraph",
        text: "A team can agree on the product while holding incompatible plans. Product treats demand as settled. Engineering expects scope to shrink after discovery. Finance has modelled the removal of work that operations expects to keep. The conflict appears later as delay, unplanned labour or a missed saving.",
      },
      {
        type: "paragraph",
        text: "Writing those assumptions beside the proposal gives the team something concrete to test. It also shows which owner can resolve the question and how much the company should commit before an answer arrives.",
      },
      {
        type: "heading",
        level: 2,
        id: "questions-that-improve-case",
        text: "Questions that change the proposal",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Which assumption contributes most of the expected return?",
          "Was it tested under the conditions planned for launch?",
          "Which early result would contradict it?",
          "How much will be spent before that result becomes visible?",
          "Can a smaller release produce the missing evidence?",
          "Could another cause explain the positive test result?",
        ],
      },
      {
        type: "paragraph",
        text: "Match the burden of proof to the exposure. A reversible internal trial can proceed with gaps that would block a customer-facing release or a long vendor agreement. Small tests need enough evidence to make their limited commitment sensible; larger commitments need more.",
      },
      {
        type: "heading",
        level: 2,
        id: "independence-without-theatre",
        text: "What I expect from an independent review",
      },
      {
        type: "paragraph",
        text: "I revise a finding when better evidence arrives. Product and engineering get a fair chance to correct factual errors. Any disagreement that survives that exchange stays in the record because it changes how the approver should read the case.",
      },
      {
        type: "quote",
        text: "I can be skeptical and still recommend approval when the evidence supports the requested commitment.",
      },
      {
        type: "paragraph",
        text: "Suppose the return depends on customers granting transaction access, and no customer has agreed. The next commitment could be a paid data-access trial instead of the broad build. Whether customers grant access remains unresolved, but the company can learn before it hires around the assumption.",
      },
    ],
  },
  {
    slug: "and-theres-no-turning-back-from-the-ai-arms-race",
    title: "The AI arms race, viewed from February 2025",
    description:
      "My February 2025 note on AI policy, strategic competition, defence spending and the pressure to accelerate development.",
    dek:
      "I wrote this when the public AI debate appeared to be moving from guardrails towards state competition and military investment.",
    publishedAt: "2025-02-12",
    displayDate: "12 February 2025",
    readTime: "3 min",
    category: "Archive / AI policy",
    featured: false,
    legacy: true,
    keywords: [
      "AI arms race archive",
      "AI policy 2025",
      "AI geopolitical competition",
      "AI defense investment",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Archive context",
        text: "I published this on 12 February 2025. The policy references and company examples reflect that date. Use current sources for a present-day assessment.",
      },
      {
        type: "paragraph",
        text: "I read changes in government priorities, defence participation and capital commitments as evidence that strategic competition was overtaking the earlier debate about restraint.",
      },
      {
        type: "paragraph",
        text: "I compared the mood with a space race in which acceleration had become the objective. I questioned how regional regulation would hold while major powers treated advanced AI as strategic infrastructure.",
      },
      {
        type: "paragraph",
        text: "This archive preserves my interpretation in early 2025. Policy, defence relationships and company conduct have moved since publication and require fresh verification.",
      },
    ],
  },
  {
    slug: "openais-o3-vs-deepseek-r1-open-source-or-full-control",
    title: "OpenAI o3 and DeepSeek R1: two strategies in February 2025",
    description:
      "My February 2025 comparison of open model distribution and a controlled platform approach to capable AI systems.",
    dek:
      "The piece compared two strategies through the access, control and tool-use choices visible at the time.",
    publishedAt: "2025-02-03",
    displayDate: "3 February 2025",
    readTime: "4 min",
    category: "Archive / AI systems",
    featured: false,
    legacy: true,
    keywords: [
      "OpenAI o3 Deepseek R1 archive",
      "open source AI models 2025",
      "AI model control",
      "AI model strategy history",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Archive context",
        text: "I published this on 3 February 2025. Capabilities, licences, prices and company positions may have changed. This entry retains the comparison I made at the time.",
      },
      {
        type: "paragraph",
        text: "I contrasted DeepSeek’s open distribution of R1 with OpenAI’s controlled platform strategy. I viewed the open release as a way to draw in outside developers and place smaller models in more computing environments.",
      },
      {
        type: "paragraph",
        text: "For OpenAI, I focused on models selecting and creating tools within a managed platform. That suggested competition over the range of work a system could perform, alongside the cost of running it.",
      },
      {
        type: "paragraph",
        text: "I favoured OpenAI’s near-term position and left the longer horizon open. That judgement belongs to the evidence available in February 2025. It is not a current ranking of either model family.",
      },
    ],
  },
  {
    slug: "ll03d8mhvlvcwskb2kn4ewwm6hg9o5",
    title: "The Blurred Lines of Reality",
    description:
      "My December 2024 reflection on synthetic media, familiar visual authority and the evidence people use to trust digital information.",
    dek:
      "A familiar news format can create confidence in a clip even when the event behind it never happened.",
    publishedAt: "2024-12-20",
    displayDate: "20 December 2024",
    readTime: "3 min",
    category: "Archive / Media",
    featured: false,
    legacy: true,
    keywords: [
      "synthetic media archive",
      "AI generated media",
      "digital information trust",
      "critical thinking online",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Archive context",
        text: "I published this on 20 December 2024. This condensed entry preserves my original argument and leaves current generation or detection capabilities unassessed.",
      },
      {
        type: "paragraph",
        text: "I began with an AI-generated clip presented in the visual language of news media. The harder problem was ordinary viewing habit: people often accept a clip because its format, voice or apparent outlet feels authoritative.",
      },
      {
        type: "paragraph",
        text: "I asked readers to inspect sources and their own assumptions more deliberately. Synthetic material increases the supply of plausible images, while platform selection still influences which ones people encounter repeatedly.",
      },
      {
        type: "paragraph",
        text: "My final question concerned the standard of proof people apply while scrolling. Polish and repetition can create familiarity long before anyone checks the source.",
      },
    ],
  },
  {
    slug: "9cspkbig4roi3fyzh8bvytrgybrezy",
    title: "A day in 2027: where does reality end and AI begin?",
    description:
      "My speculative 2024 scenario about AI-shaped news, office work, advertising and the point where assistance starts directing behaviour.",
    dek:
      "One fictional day follows a person whose environment predicts each preference before it feels fully formed.",
    publishedAt: "2024-10-29",
    displayDate: "29 October 2024",
    readTime: "4 min",
    category: "Archive / Future scenario",
    featured: false,
    legacy: true,
    keywords: [
      "AI future scenario 2027",
      "AI and reality",
      "algorithmic influence",
      "personalized AI assistants",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Fiction archive",
        text: "I published this on 29 October 2024. The events form a thought experiment, not a forecast or report on available systems.",
      },
      {
        type: "paragraph",
        text: "The day begins with a room adjusting sleep and news to its occupant. Social feeds present lives tuned for engagement. Advertising answers preferences the character has barely expressed, while an office system completes ideas before colleagues finish speaking.",
      },
      {
        type: "paragraph",
        text: "A call with a friend sounds strangely polished. Meetings defer to model output without discussion. By evening, the character has trouble identifying which choices began with a personal intention and which were prepared by the surrounding systems.",
      },
      {
        type: "paragraph",
        text: "The story leaves the character inside that uncertainty. The systems sound more human, and daily behavior has begun to follow the patterns those systems reward.",
      },
    ],
  },
  {
    slug: "r00blqatyvpkiimjwa80boji6fb22r",
    title: "What repeat play at PLAYCON showed me about immersive learning",
    description:
      "My 2024 event note on Axon Park’s interactive marine-biology experience at PLAYCON and the response from young participants.",
    dek:
      "Children returned to the marine-biology lesson to improve their scores, giving the team a direct view of play and learning in the same session.",
    publishedAt: "2024-10-28",
    displayDate: "28 October 2024",
    readTime: "3 min",
    category: "Archive / Immersive learning",
    featured: false,
    legacy: true,
    keywords: [
      "PLAYCON Axon Park",
      "immersive learning",
      "education and gaming",
      "marine biology game",
      "VR education archive",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Event record",
        text: "I published this on 28 October 2024. This condensed entry records Axon Park’s participation at PLAYCON.",
      },
      {
        type: "paragraph",
        text: "I watched children and teenagers complete an interactive marine-biology lesson, with some returning to improve their score. Their sustained attention stood out at an event surrounded by conventional games.",
      },
      {
        type: "paragraph",
        text: "Participants entered for the challenge and spent time with the subject matter along the way. I recorded that behaviour as an observation from the event, not as a controlled study of learning outcomes.",
      },
      {
        type: "paragraph",
        text: "I thanked the team behind the installation and noted the repeat play as a direction worth testing in later immersive-learning work.",
      },
    ],
  },
  {
    slug: "5m95en1huzc3xqzcq050bddhjauz6u",
    title: "The Hidden Flaws of Reasonable Decisions",
    description:
      "My 2024 essay on plausible answers that rest on weak premises, incomplete evidence or an unexamined point of view.",
    dek:
      "Coherent reasoning can preserve a faulty starting point all the way to a confident conclusion.",
    publishedAt: "2024-10-02",
    displayDate: "2 October 2024",
    readTime: "5 min",
    category: "Archive / Decision quality",
    featured: false,
    legacy: true,
    keywords: [
      "reasonable decisions bias",
      "AI decision bias",
      "LLM reasoning limitations",
      "decision assumptions",
      "critical decision review",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Archive context",
        text: "I published this on 2 October 2024. The summary retains my argument while leaving current language-model performance outside its scope.",
      },
      {
        type: "paragraph",
        text: "I separated a reasonable-sounding conclusion from a sound one. A person or language model can produce an orderly explanation from partial data or a narrow premise that never appears in the answer.",
      },
      {
        type: "heading",
        level: 2,
        id: "archive-questions-for-reasoning",
        text: "Questions from the original essay",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "Write down the assumption that defines the starting point.",
          "Check the source for missing groups, incentives and outdated data.",
          "Find a counter-example that the explanation would need to survive.",
          "Ask who is absent from the initial group or data set.",
          "Revisit the decision when outcomes contradict its reasoning.",
        ],
      },
      {
        type: "paragraph",
        text: "An explanation shows how a conclusion was assembled. The premise still needs its own evidence, especially when the answer arrives with enough polish to discourage another question.",
      },
    ],
  },
  {
    slug: "u6le025sfymrvt59ba4q1905s55e3h",
    title:
      "National Skills Council panel: Emerging Technologies as a Catalyst for Innovation",
    description:
      "My archive record of a September 2024 National Skills Council panel on emerging technologies and innovation.",
    dek:
      "The surviving entry records the panel topic and my role as a speaker.",
    publishedAt: "2024-09-02",
    displayDate: "2 September 2024",
    readTime: "2 min",
    category: "Archive / Speaking",
    featured: false,
    legacy: true,
    keywords: [
      "National Skills Council panel",
      "emerging technologies innovation",
      "Marc Paul speaker",
      "technology panel archive",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Limited archive record",
        text: "The public archive supplies the event, role, topic and date. I did not find a dependable transcript or detailed event report during migration.",
      },
      {
        type: "paragraph",
        text: "I published the entry on 2 September 2024 after speaking on the National Skills Council panel “Emerging Technologies as a Catalyst for Innovation.”",
      },
      {
        type: "paragraph",
        text: "I keep the record in my speaking archive. Without source material, I do not reconstruct what I or the other participants said.",
      },
    ],
  },
  {
    slug: "by5xloy8vc5q98hyy9cu2igiar4h56",
    title: "SOHO Talks: Breaking Barriers",
    description:
      "My November 2023 archive record of a SOHO Talks appearance under the title Breaking Barriers.",
    dek:
      "Only the event title and publication date survive in the public archive.",
    publishedAt: "2023-11-28",
    displayDate: "28 November 2023",
    readTime: "2 min",
    category: "Archive / Speaking",
    featured: false,
    legacy: true,
    keywords: [
      "SOHO Talks Breaking Barriers",
      "Marc Paul SOHO Talks",
      "technology speaker archive",
      "Breaking Barriers talk",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Limited archive record",
        text: "The public archive confirms the title and date. I did not find a dependable transcript or fuller event note during migration.",
      },
      {
        type: "paragraph",
        text: "I published this record on 28 November 2023 after a SOHO Talks appearance under the title “Breaking Barriers.”",
      },
      {
        type: "paragraph",
        text: "I leave the talk’s content undescribed because the supporting material is unavailable.",
      },
    ],
  },
  {
    slug: "the-era-of-epochal-tech-revolutions",
    title: "The Era of Epochal Tech Revolutions",
    description:
      "My 2023 essay reconsidering an earlier view of AI, Web3, fusion and the long development cycles of new technology.",
    dek:
      "I revisit an early dismissal of AI and ask when skepticism stops testing a claim and starts ignoring new evidence.",
    publishedAt: "2023-08-09",
    displayDate: "9 August 2023",
    readTime: "4 min",
    category: "Archive / Emerging technology",
    featured: false,
    legacy: true,
    keywords: [
      "epochal technology revolutions",
      "emerging technology archive",
      "AI Web3 fusion",
      "technology skepticism",
      "technology adoption history",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Archive context",
        text: "I published this on 9 August 2023. References to the maturity and direction of particular technologies reflect that period.",
      },
      {
        type: "paragraph",
        text: "I revisited my earlier description of AI as brute-force learning. Later tools changed my own work and forced me to reconsider a judgement formed from earlier systems.",
      },
      {
        type: "paragraph",
        text: "I used AI, decentralised ledgers and nuclear fusion as examples of technical work whose eventual application may differ from its popular story. I defended continued experimentation where results had begun to challenge an earlier dismissal.",
      },
      {
        type: "paragraph",
        text: "I still see a live tension between resisting hype and updating a view when the evidence changes. The technology references remain anchored in 2023.",
      },
    ],
  },
  {
    slug: "sfltnb6vsji47kwprm2a91sx2944k1",
    title: "X’s creator revenue model, viewed from 2023",
    description:
      "My August 2023 essay on creator revenue sharing, user attention and changing digital-platform business models.",
    dek:
      "The article examined a platform paying creators from advertising income generated around their participation.",
    publishedAt: "2023-08-05",
    displayDate: "5 August 2023",
    readTime: "4 min",
    category: "Archive / Digital economy",
    featured: false,
    legacy: true,
    keywords: [
      "X revenue model archive",
      "creator revenue sharing",
      "attention economy",
      "digital platform business models",
      "user data value",
    ],
    content: [
      {
        type: "note",
        tone: "archive",
        label: "Archive context",
        text: "I published this on 5 August 2023. Platform programmes and eligibility rules change. Verify current terms before relying on any operational detail.",
      },
      {
        type: "paragraph",
        text: "I examined X’s creator revenue sharing as a change in the platform exchange. Users supplied content and attention, while the platform proposed returning part of the related advertising income to eligible creators.",
      },
      {
        type: "paragraph",
        text: "I connected that programme with competition for engagement and user data. I expected participation to become a more explicit part of the commercial relationship between platforms and creators.",
      },
      {
        type: "paragraph",
        text: "The examples and programme details belong to 2023. My archived question concerns who captures the value created by activity on a platform, independent of X’s current terms.",
      },
    ],
  },
];

export const featuredPosts: readonly Article[] = posts.filter(
  (post) => post.featured,
);

export const currentPosts: readonly Article[] = posts.filter(
  (post) => !post.legacy,
);

export const archivePosts: readonly Article[] = posts.filter(
  (post) => post.legacy,
);

export const allPostSlugs: readonly string[] = posts.map((post) => post.slug);

export function getPostBySlug(slug: string): Article | undefined {
  return posts.find((post) => post.slug === slug);
}
