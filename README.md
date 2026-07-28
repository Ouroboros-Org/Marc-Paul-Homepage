# Marc Paul — Decision Integrity Practice

A multi-page Vinext/Next site for independent reviews of consequential AI and software initiatives.

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

## Main routes

- `/reviews` and the three engagement detail pages
- `/reviews/ai-initiative-review` (AI-specific application of the Independent Initiative Review)
- `/situations`
- `/approach`
- `/cases` and `/cases/sample-ai-pilot`
- `/about`
- `/blog` and `/blog/[slug]`
- `/contact`
- `/request-a-review`
- `/privacy`

The blog data lives in `lib/posts.ts`. It contains current decision-focused articles and all ten legacy blog slugs so existing links remain valid.

## Shared interface

- The responsive header uses four disclosure groups: Reviews, Evidence, Practice, and Contact. Nested links include short descriptions on desktop and mobile.
- `CtaButton` provides the reusable black refractive pill for primary and secondary links or buttons. Text and icon remain constant.
- The fixed review CTA is compact at rest, expands during scrolling and on hover or keyboard focus, and respects reduced motion.
- The footer groups review pages, practice and evidence routes, contact options, LinkedIn, and privacy.

## Contact forms

`/contact` is the short general-enquiry route. It asks for name, work email, optional organisation, subject, and message.

`/request-a-review` is the full qualification route. It collects the initiative, decision, deadline, commitment, owner, available evidence, active status, sponsor, and reporting context.

Both forms post to a Google Form through a hidden response frame and use the same six Google Form fields while presenting different flows on the site.

Create a public Google Form with these questions in this order:

1. Name — short answer, required
2. Work email — short answer, required
3. Organisation — short answer, required
4. Review type — short answer or dropdown, required
5. Review brief — paragraph, required
6. Decision due — short answer, required

The review route fixes the review type to `Independent Initiative Review` and combines its qualification answers into the Review brief field. The contact route uses `General enquiry`, combines subject and message, and supplies the submission date as timing.

Do not require Google sign-in or use a file-upload question. Generate a pre-filled link to obtain the six `entry.*` identifiers, copy `.env.example` to `.env.local`, and replace the placeholder form and entry IDs. The form action must end in `/formResponse`.

Without those environment variables both forms deliberately show the direct-email fallback.

## Vercel Web Analytics and Speed Insights

`app/layout.tsx` already mounts both clients once at the root using the framework-neutral React entrypoints appropriate for the Vinext/Vite runtime. No page-level setup is required:

- `@vercel/analytics/react`
- `@vercel/speed-insights/react`

After connecting the repository to Vercel:

1. Enable Web Analytics and Speed Insights in the Vercel project.
2. Redeploy after enabling both products.
3. Confirm `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` load successfully in production.
4. Confirm page-view and Web Vitals data appear in their respective Vercel dashboards.

Local development uses Vercel's debug scripts and may log blocked-request messages in restricted environments.
