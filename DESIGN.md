# Marc Paul: Product-minded advisory site

## Direction

The site presents the service before the person. It borrows the clarity of a product canvas: contained workspaces, modular artifacts and visible system status, without imitating any one product UI.

The hero is design-led and contains no portrait. A quiet, code-native 3D system represents interconnected decisions and feedback loops. Candid imagery appears only where it explains context, while the distant TEDx image remains supporting proof.

## Design principles

- **Artifact first:** capabilities, methods, work and thinking carry the hierarchy.
- **Contained complexity:** dark workspace surfaces hold dense or immersive content; the surrounding page stays light and calm.
- **Useful motion:** motion communicates hierarchy and spatial relationship, stays under 600ms, and disappears under `prefers-reduced-motion`.
- **Responsive by content:** grids reflow when their content becomes cramped, with dedicated checks at 375px, 768px, 1024px and 1440px.
- **Human evidence, lightly:** one natural working-session image and the TEDx talk add context without turning the page into a biography.
- **Service before biography:** the page answers who the work is for, which decisions it supports and what an engagement produces before describing Marc's background.
- **Specific writing:** claims stay factual, verbs stay concrete and the copy avoids puffery, canned conclusions and repetitive contrast formulas.

## Visual system

- Canvas: `#F3F4EE`
- Raised canvas: `#E8EAE2`
- Panel: `#FFFFFF`
- Dark workspace: `#111411`
- Primary text: `#111411`
- Muted text: `#62675F`
- Signal clay: `#B97955`
- Status sage: `#B6CDA8`
- Border: `#D8DBD2`
- Radius: 12px controls, 20px cards, 30px feature surfaces
- Type: Manrope Variable for interface/content; Newsreader Variable for selective editorial emphasis

## UX guardrails

- Every control has a visible focus state and at least a 44px target.
- Navigation closes with Escape and exposes expanded state to assistive technology.
- Images use `next/image`, explicit aspect ratios and stable containers.
- Generated photography is framed as illustrative context and is never used as proof of a client engagement.
- WebGL uses the host canvas dimensions, caps pixel density and pauses rendering when off-screen.
- Nothing depends on hover; hover is a secondary enhancement.
- No forced motion, horizontal page scrolling or fixed-width content columns.
