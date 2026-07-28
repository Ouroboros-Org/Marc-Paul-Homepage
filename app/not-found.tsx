import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="shell not-found-panel">
        <FileQuestion size={34} strokeWidth={1.4} aria-hidden="true" />
        <p className="section-kicker">404 / Page not found</p>
        <h1>We could not find this page.</h1>
        <p>The address may have changed, or the page may no longer exist.</p>
        <Button href="/" icon={<ArrowLeft size={17} />} iconPosition="start" isCta={true}>
          Return home
        </Button>
      </div>
    </main>
  );
}
