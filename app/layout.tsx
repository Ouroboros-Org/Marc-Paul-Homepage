import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource/instrument-serif/400.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://marcpaul.tech"),
  title: { default: "Marc Paul — Independent Technical & AI Advisor", template: "%s — Marc Paul" },
  description: "Independent advice for ambitious AI, automation and emerging-technology decisions.",
  openGraph: { title: "Marc Paul — Independent Technical & AI Advisor", description: "Technology needs ambition. Decisions need skepticism.", type: "website", url: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
