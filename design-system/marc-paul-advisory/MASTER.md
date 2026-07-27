# Marc Paul Advisory — Design System

This file records the implemented design direction after applying UI/UX Pro Max recommendations to the project brief. The generic database result suggested an AI-purple palette; that recommendation was deliberately rejected because it conflicts with the brand requirement to avoid AI-startup clichés.

## Character

- Editorial, architectural, calm, independent
- Dark stone rather than pure black
- Complexity expressed through spacing, depth and material—not interface clutter
- One purposeful animated scene per view at most

## Tokens

| Role | Value |
| --- | --- |
| Background | `#11110f` |
| Elevated surface | `#181816` |
| Stone | `#25231f` |
| Warm paper | `#eee9df` |
| Muted text | `#aaa69e` |
| Burnt orange | `#bd5a32` |
| Active orange | `#dc7145` |
| Border | `rgba(239,235,225,.15)` |

## Typography

- Display: Instrument Serif, regular
- UI and body: Geist Variable
- Metadata: system monospace
- Body minimum: 16px / 1.6

## Interaction

- Minimum primary control height: 44px
- Always-visible labels and keyboard focus
- Entering motion uses ease-out and stays restrained
- Respect `prefers-reduced-motion`
- Form errors use text and `role="alert"`, never colour alone

## Layout

- Maximum editorial shell: 1240px
- Desktop: asymmetric two-column grid
- Mobile: single-column flow; content precedes the visual
- Breakpoints checked at 375, 768, 1024 and 1440px

## Three-dimensional scene

- Simple layered planes, stone, glass, metal and one orange block
- Container-aware canvas dimensions
- Accessible canvas label and static loading fallback
- DPR capped for performance

## Avoid

- Blue-purple gradients, neon glow, brains, robots and orbits
- Generic shadcn card grids
- Decorative animation and bounce easing
- Unsupported claims, inflated language and AI-writing filler
