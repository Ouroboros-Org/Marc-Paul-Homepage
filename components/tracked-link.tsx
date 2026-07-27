"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { track } from "@vercel/analytics";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  event: string;
  eventData?: Record<string, string | number | boolean | null>;
};

export function TrackedLink({
  event,
  eventData,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (mouseEvent: MouseEvent<HTMLAnchorElement>) => {
    track(event, eventData);
    onClick?.(mouseEvent);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
