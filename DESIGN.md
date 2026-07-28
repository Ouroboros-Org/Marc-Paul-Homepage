# Marc Paul: Decision Integrity Practice

## Direction

The site presents a narrow service before the person: independent examination of consequential AI and software initiatives. The interface borrows the discipline of a decision record—clear states, bounded evidence, aligned fields, and visible conditions—without becoming a dashboard or a consulting template.

The home hero pairs the service offer with an interactive black Rubik's Cube: one orange corner, legal scramble-and-solve moves, and a restrained particle field. Marc appears later as relevant context. Outside this explicit hero illustration, orange remains reserved for active conditions, unresolved evidence, and decision states.

## Information architecture

Buyers can enter through three paths:

- service: review, reconstruction, or continuation;
- situation: approval, production, drift, renewed funding, or closure;
- evidence: sample case and decision-focused articles.

Approach stays secondary. Every commercial page links to the qualification form and at least one relevant situation, article, or adjacent service.

The header exposes this architecture through four disclosure groups: Reviews, Evidence, Practice, and Contact. Each group contains descriptive nested links, and the same hierarchy reflows into the mobile menu. Contact separates a short general-enquiry form at `/contact` from the full review qualification form at `/request-a-review`.

The footer repeats the practical routes in three groups: review services; practice, evidence, and writing; and contact, review request, email, LinkedIn, and privacy.

## Visual system

- Warm canvas: `#F2F1EB`
- Raised canvas: `#E7E6DF`
- Panel: `#FBFAF6`
- Near-black: `#121412`
- Graphite: `#2A2E2A`
- Muted text: `#5D625D`
- Condition orange: `#AA603B`
- Interface type: Manrope Variable
- Editorial emphasis: Newsreader Variable
- Record labels: system monospace stack

The layout is light-first with contained dark sections. Cards use thin borders, modest radius, and almost no decorative shadow. Motion is state-based except for the home-hero cube. Its rendering pauses off-screen and while the page is hidden; automatic movement stops under `prefers-reduced-motion`, while deliberate rotation remains available.

Primary and secondary calls to action use one black refractive pill system. Every CTA keeps a text label and icon; variants change emphasis, not structure. The fixed review CTA visually contracts at rest, expands during active scrolling and on hover or keyboard focus, then contracts after scrolling stops. Reduced-motion mode removes the expansion transition and refractive animation.

## Content principles

- Name the decision, commitment, evidence, limitation, consequence, and owner.
- Describe services and outputs before method.
- Do not claim client outcomes, board use, savings, maturity, or prevented failure without evidence.
- Label illustrative, public-source, and anonymised cases distinctly.
- Keep old time-sensitive articles in a dated archive rather than presenting them as current guidance.
- Use plain-language search terms alongside the coined service name.

## UX guardrails

- Shared route-aware header and grouped footer on every page.
- Four header disclosure groups with descriptive submenus, current-route states, and one responsive hierarchy.
- One `h1` per route and sequential heading levels.
- Visible focus states and at least 44px interaction targets.
- Closed mobile navigation is removed from the tab order; Escape restores focus.
- `/contact` stays short and general; `/request-a-review` collects the full decision, commitment, evidence, ownership, and timing context.
- Both forms use visible labels, nearby hints, native validation, and a direct-email fallback.
- CTA labels and icons remain available; the floating label is clipped visually only in its resting state.
- Local images use stable containers; embedded video loads only after user action.
- Responsive checks at 375px, 768px, 1024px, 1440px, and phone landscape.
- No horizontal page scrolling.
- Vercel Analytics and Speed Insights are mounted once in the root layout.
