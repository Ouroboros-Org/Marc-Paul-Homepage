"use client";

import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";

/**
 * Keep global CSS behind a zero-render client boundary. vite-rsc wraps
 * CSS-importing server component exports with stylesheet resources, which is
 * not a valid wrapper for the root document and can destabilize hydration when
 * rendered as a body child.
 */
export function GlobalStyles() {
  return null;
}
