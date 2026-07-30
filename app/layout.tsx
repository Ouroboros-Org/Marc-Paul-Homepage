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
    default: "Independent AI & Software Investment Reviews | Marc Paul",
    template: "%s | Marc Paul"
  },
  description:
    "Independent AI and software investment reviews for founders, boards, investors, and finance leaders before funding, production, scale, or continuation.",
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
    title: "Independent AI & Software Investment Reviews | Marc Paul",
    description:
      "Independent assessment of the commercial, product, technical, delivery, and operating case behind a material technology commitment.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Marc Paul — Decision Integrity Practice",
    images: [
      {
        url: "/images/advisory-working-session.jpg",
        width: 960,
        height: 720,
        alt: "Independent review of an AI or software investment decision"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Independent AI & Software Investment Reviews | Marc Paul",
    description: "Independent assessment before a material AI or software commitment.",
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
