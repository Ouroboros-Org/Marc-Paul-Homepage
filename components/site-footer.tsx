import Link from "next/link";
import { FileCheck2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";

const reviewLinks = [
  {
    href: "/reviews/independent-initiative-review",
    label: "Independent Initiative Review"
  },
  {
    href: "/reviews/decision-case-reconstruction",
    label: "Decision Case Reconstruction"
  },
  {
    href: "/reviews/independent-continuation-review",
    label: "Independent Continuation Review"
  }
] as const;

const practiceLinks = [
  { href: "/approach", label: "Approach" },
  { href: "/reviews/ai-initiative-review", label: "AI review areas" },
  { href: "/situations", label: "Situations" },
  { href: "/cases", label: "Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link
            className="brand footer-brand"
            href="/"
            aria-label="Decision Integrity Practice, home"
          >
            <img className="brand-mark" aria-hidden="true" src="/logo/logo-white-small.png" alt="Marc Paul logo" />
            <span>
              <strong>Marc Paul</strong>
              <small>Decision Integrity Practice</small>
            </span>
          </Link>
          <p>Independent Initiative Reviews for consequential AI and software decisions.</p>
          <Button
            className="footer-cta"
            href="/request-a-review"
            icon={<FileCheck2 size={17} />}
            isCta={true}
          >
            Request a review
          </Button>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <div className="footer-link-group">
            <p className="footer-group-title">Reviews</p>
            <div className="footer-links">
              {reviewLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-link-group">
            <p className="footer-group-title">Practice</p>
            <div className="footer-links">
              {practiceLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-link-group">
            <p className="footer-group-title">Contact</p>
            <div className="footer-links">
              <Link href="/contact">Contact us</Link>
              <Link href="/request-a-review">Request a review</Link>
              <a href="mailto:info@marcpaul.tech">info@marcpaul.tech</a>
              <a
                href="https://mt.linkedin.com/in/marc-paul"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </a>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </nav>

        <div className="footer-meta">
          <p className="copyright">&copy; {currentYear} Marc Paul</p>
          <p>The practice accepts no implementation fees or vendor incentives.</p>
        </div>
      </div>
    </footer>
  );
}
