# Marc Paul Advisory

A dark editorial advisory homepage for Marc Paul, built with Next.js and a lightweight Three.js ambient layer.

## Local development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm typecheck
pnpm build
```

## Google Forms contact backend

The custom contact dialog posts directly to a Google Form through a hidden response frame, so the
site keeps its own UI without needing a separate API or database.

Create a public Google Form with these questions in this order. Use short-answer fields for name,
email and organisation, dropdown or multiple choice for advisory area and timing, and a paragraph
field for the decision/challenge:

1. Name (required)
2. Work email (required)
3. Organisation (optional)
4. What would you like help with? (required)
5. What is the decision or challenge? (required)
6. Timing (optional)

Do not require Google sign-in or use a file-upload question. Generate a pre-filled link to obtain
the `entry.*` IDs, copy `.env.example` to `.env.local`, and replace the form ID and all six entry
IDs. The public form URL must end in `/formResponse`, as shown in the example.

The source material was synthesized from Marc's current public homepage, public writing, LinkedIn activity, TEDx talk transcript, and three supplied CV designs. Only current, relevant public-facing details are surfaced.
