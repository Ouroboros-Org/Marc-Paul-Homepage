import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marcpaul.tech"),
  title: "Marc Paul | Independent Technical & AI Advisor",
  description:
    "Independent technical and AI advisory for founders, product leaders and engineering teams. AI feasibility, product direction, agentic systems, automation and technical review from Malta across Europe.",
  keywords: [
    "independent AI advisor",
    "technical AI advisor",
    "AI strategy consultant",
    "AI feasibility assessment",
    "technical product strategy",
    "AI agent workflows",
    "agentic systems consultant",
    "technical due diligence",
    "emerging technology advisor",
    "AI consultant Malta",
    "Marc Paul"
  ],
  authors: [{ name: "Marc Paul", url: "https://www.marcpaul.tech" }],
  creator: "Marc Paul",
  alternates: {
    canonical: "/"
  },
  category: "technology consulting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Marc Paul | Independent Technical & AI Advisor",
    description:
      "Clear decisions, buildable scope and practical delivery plans for AI, technical products and emerging technology.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Marc Paul",
    images: [
      {
        url: "/images/advisory-working-session.jpg",
        width: 1672,
        height: 941,
        alt: "A small team reviewing technical system diagrams during a working session"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Paul | Independent Technical & AI Advisor",
    description:
      "AI strategy, product direction, agentic systems and technical review for teams making difficult technology decisions.",
    images: ["/images/advisory-working-session.jpg"]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#f3f4ee",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
