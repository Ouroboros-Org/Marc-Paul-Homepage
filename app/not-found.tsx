import { ArrowLeft, FileQuestion } from "lucide-react";
import { CtaButton } from "@/components/cta-button";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="shell not-found-panel">
        <FileQuestion size={34} strokeWidth={1.4} aria-hidden="true" />
        <p className="section-kicker">404 / Page not found</p>
        <h1>We could not find this page.</h1>
        <p>The address may have changed, or the page may no longer exist.</p>
        <CtaButton href="/" icon={<ArrowLeft size={17} />} iconPosition="start">
          Return home
        </CtaButton>
      </div>
    </main>
  );
}
