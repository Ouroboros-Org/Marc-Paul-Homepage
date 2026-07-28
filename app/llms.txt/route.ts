import { currentPosts, featuredPosts } from "@/lib/posts";
import { absoluteUrl, audience, reviews, situations, unsuitableWork } from "@/lib/site";

export const dynamic = "force-static";

function link(title: string, path: string, note: string) {
  return `- [${title}](${absoluteUrl(path)}): ${note}`;
}

export async function GET() {
  const reviewLinks = reviews
    .map((review) => link(review.title, review.href, `${review.description} Typical fee and timing: ${review.fee}; ${review.duration}.`))
    .join("\n");

  const situationLinks = situations
    .map((situation) =>
      link(
        situation.title,
        `/situations#${situation.id}`,
        `${situation.summary} Usual service: ${situation.review}.`
      )
    )
    .join("\n");

  const featuredLinks = featuredPosts
    .map((post) => link(post.title, `/blog/${post.slug}`, post.description))
    .join("\n");

  const writingLinks = currentPosts
    .filter((post) => !post.featured)
    .map((post) => link(post.title, `/blog/${post.slug}`, post.description))
    .join("\n");

  const audienceNotes = audience.map((item) => `- ${item.title}: ${item.description}`).join("\n");
  const outOfScope = unsuitableWork.map((item) => `- ${item}`).join("\n");

  const body = `# Marc Paul — Decision Integrity Practice

> Independent reviews of consequential AI and software initiatives for CEOs, CFOs, founders, boards, and investors. The practice tests whether the evidence for one defined initiative supports the next commitment.

Marc Paul is based in Malta and works with international clients. The practice does not sell implementation, coaching, audit opinions, legal advice, or investment advice. The primary product is a written independent opinion on a named decision.

Important distinctions:

- An Independent Initiative Review examines one defined initiative and the decision attached to it — not general strategy and not a full transaction diligence mandate.
- The opinion may support proceeding, proceeding under conditions, staging the commitment, reworking the case, pausing, or stopping under the case currently presented.
- Contact for a general enquiry is ${absoluteUrl("/contact")}. Qualification for a review is ${absoluteUrl("/request-a-review")}. Email: info@marcpaul.tech.

Typical sponsors:

${audienceNotes}

Out of scope:

${outOfScope}

## Reviews

${link("Review services overview", "/reviews", "Compare Initiative Review, Case Reconstruction, and Continuation Review.")}
${link("Independent AI Initiative Review", "/reviews/ai-initiative-review", "AI-specific application of the primary review: business case, pilot-to-production, automation programme, or AI product investment.")}
${reviewLinks}

## Situations

${link("Situations overview", "/situations", "Entry points by decision state rather than by service name.")}
${situationLinks}

## Practice

${link("Home", "/", "Service offer, review outcomes, audiences, and FAQ.")}
${link("Approach", "/approach", "How a review is scoped, evidenced, and reported.")}
${link("About Marc Paul", "/about", "Background in AI development, product delivery, technical production, and cross-functional leadership.")}
${link("Sample case", "/cases/sample-ai-pilot", "Illustrative AI pilot-to-production decision record.")}
${link("Cases", "/cases", "Evidence and illustrative cases.")}

## Contact

${link("Request a review", "/request-a-review", "Full qualification form: decision, commitment, evidence, ownership, and timing.")}
${link("Contact", "/contact", "Short general enquiry form.")}
${link("Privacy", "/privacy", "Privacy notice.")}

## Writing

${link("Blog", "/blog", "Current decision-focused articles and a dated archive of earlier writing.")}
${featuredLinks}

## Optional

${writingLinks}
${link("Sitemap", "/sitemap.xml", "Complete indexable URL list for crawlers.")}
${link("Robots", "/robots.txt", "Crawler access policy; AI search and training crawlers are allowed.")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800"
    }
  });
}
