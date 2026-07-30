import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GlobalStyles } from "./global-styles";
import { FloatingReviewCta } from "@/components/floating-review-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marcpaul.tech"),
  title: {
    default: "Marc Paul | Independent AI & Software Initiative Reviews",
    template: "%s | Marc Paul"
  },
  description:
    "I provide independent reviews of AI and software initiatives before approval, funding, production, or continuation.",
  keywords: [
    "independent initiative review",
    "AI initiative review",
    "AI investment review",
    "AI pilot to production review",
    "software initiative review",
    "technology investment decision",
    "AI business case review",
    "independent AI advisor",
    "Marc Paul"
  ],
  authors: [{ name: "Marc Paul", url: "https://www.marcpaul.tech/about" }],
  creator: "Marc Paul",
  category: "technology advisory",
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
    title: "Marc Paul | Independent AI & Software Initiative Reviews",
    description:
      "I test the case behind an AI or software initiative before the next commitment.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Marc Paul — Decision Integrity Practice",
    images: [
      {
        url: "/images/marc-paul-tedx-wide.jpg",
        width: 960,
        height: 720,
        alt: "Marc Paul speaking at TEDx about AI decisions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Paul | Independent AI & Software Initiative Reviews",
    description: "I test the case behind an AI or software initiative before the next commitment.",
    images: ["/images/advisory-working-session.jpg"]
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: "#f2f1eb",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GlobalStyles />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <FloatingReviewCta />
        {children}
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
