"use client";

import { useEffect, useRef, useState } from "react";
import { FileCheck2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/button";

const idleCollapseDelay = 850;

export function FloatingReviewCta() {
  const pathname = usePathname();
  const frameRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const lastScrollAtRef = useRef(0);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [isInlineActionVisible, setIsInlineActionVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    const collapseAfterIdle = () => {
      const elapsed = performance.now() - lastScrollAtRef.current;
      const remaining = idleCollapseDelay - elapsed;

      if (remaining > 0) {
        idleTimerRef.current = window.setTimeout(collapseAfterIdle, remaining);
        return;
      }

      idleTimerRef.current = null;
      setIsScrollActive(false);
    };

    const handleScroll = () => {
      lastScrollAtRef.current = performance.now();

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          frameRef.current = null;
          setIsScrollActive(true);
        });
      }

      if (idleTimerRef.current === null) {
        idleTimerRef.current = window.setTimeout(
          collapseAfterIdle,
          idleCollapseDelay,
        );
      }
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const inlineActions = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".request-form-panel, .contact-form-footer, .cta-panel",
      ),
    );
    if (inlineActions.length === 0) {
      setIsInlineActionVisible(false);
      return;
    }

    const visibleActions = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleActions.add(entry.target);
          else visibleActions.delete(entry.target);
        });
        setIsInlineActionVisible(visibleActions.size > 0);
      },
      { rootMargin: "0px 0px 24px" },
    );

    inlineActions.forEach((action) => observer.observe(action));
    return () => observer.disconnect();
  }, [pathname]);

  const className = [
    "cta-button floating-review-cta",
    isScrollActive ? "is-expanded" : "is-collapsed",
    isInlineActionVisible ? "is-suppressed" : "",
    prefersReducedMotion ? "reduce-motion" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      href="/request-a-review"
      className={className}
      ariaLabel="Request an initiative review"
      icon={<FileCheck2 size={18} strokeWidth={1.8} aria-hidden="true" />}
      isCta={true}
    >
      Request a review
    </Button>
  );
}
