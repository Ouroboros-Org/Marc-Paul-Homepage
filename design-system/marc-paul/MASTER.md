# Marc Paul — Decision Integrity Practice design system

> Read a page override in `pages/` first when one exists. Page rules override this file.

## Product and tone

- Product: independent professional review service
- Audience: CEOs, CFOs, founders, boards, investors, and executive sponsors
- Tone: service-led, controlled, serious, technically literate, direct
- Density: spacious marketing and long-form reading
- Motion: restrained and state-based; the interactive home-hero cube is the only continuous illustrative motion

Visible copy leads with the buyer's decision, the review service, and the resulting deliverables. First person is reserved for Marc's judgement, independence, scope limits, and direct client interaction. Headings and service descriptions remain professional and neutral. Copy favours concrete operating conditions over promotional claims and leaves unresolved questions visible.

## Information hierarchy

1. Decision and buyer situation
2. Service and independent opinion
3. Outputs and conditions
4. Scope boundary and proof
5. Relevant experience
6. Approach and method

## Tokens

| Role | Value | CSS token |
|---|---:|---|
| Canvas | `#F2F1EB` | `--canvas` |
| Raised canvas | `#E7E6DF` | `--canvas-deep` |
| Panel | `#FBFAF6` | `--panel` |
| Near-black | `#121412` | `--ink` |
| Graphite | `#2A2E2A` | `--graphite` |
| Muted text | `#5D625D` | `--muted` |
| Border | `#D3D4CD` | `--line` |
| Condition orange | `#AA603B` | `--accent` |
| Condition orange dark | `#89482C` | `--accent-dark` |

Orange indicates an active decision, condition, unresolved evidence, or a point requiring attention. It is not ambient decoration.

## Typography

- Interface and content: Manrope Variable
- Editorial emphasis: Newsreader Variable
- Record codes, dates, labels, and states: system monospace stack
- Minimum body size: 16px
- Long-form line-height: approximately 1.7
- Long-form measure: 760px maximum

## Layout

- Maximum shell: 1320px
- Fluid gutters: 18–64px
- Section spacing: 76–132px
- Breakpoints: 560px, 780px, 1040px, 1240px
- Core QA widths: 375px, 768px, 1024px, 1440px, plus phone landscape

## Components

- CTAs: reusable black refractive pill with primary and secondary variants, a 48px minimum target, constant text and icon, and visible hover/focus feedback
- Floating CTA: compact at rest; expands only during active scrolling, hover, or keyboard focus; contracts after scroll idle
- Cards: thin border, 18px radius, little or no shadow
- Feature surfaces: 28px radius
- Forms: visible labels, 48px controls, clear hints, and nearby errors; `/contact` is the short general-enquiry path and `/request-a-review` is the full qualification path
- Navigation: sticky, route-aware, and organised into Reviews, Evidence, Practice, and Contact disclosure groups with descriptive nested links
- Footer: grouped review, practice, evidence, contact, external, and privacy links with a review CTA

## Accessibility and performance

- WCAG AA text contrast
- Visible focus ring on every interactive element
- No hover-only information
- Closed mobile menu removed from tab order
- Closed disclosure panels hidden from assistive technology and the tab order; Escape restores focus to the relevant trigger
- One `h1` per route with sequential heading levels
- Reduced motion makes CTA expansion immediate and removes refractive animation and other nonessential transitions
- WebGL is confined to the home-hero cube, pauses off-screen and while the document is hidden, caps pixel density on mobile, and has a CSS fallback
- Reduced motion leaves the cube static while preserving deliberate pointer and keyboard rotation
- Stable media containers and lazy loading below the fold
- No horizontal page scroll at supported widths
- Vercel Analytics and Speed Insights mounted once at the root

## Forbidden patterns

- Generic consulting claims or invented proof
- Decorative dashboards, data streams, brains, robots, chess pieces, or warning icons
- Orange used as a general page wash
- Tiny body text, low-contrast grey, or invisible focus states
- Layout-shifting hover effects
- Icon-only primary CTAs or permanently animated CTA effects
- Methodology dominating the commercial offer
- Unlabelled hypothetical or public-source cases
