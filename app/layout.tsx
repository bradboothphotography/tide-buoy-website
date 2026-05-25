import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Tide App | ${siteConfig.name}`,
  description: "Tide Buoy is a simple tide app for checking tide charts, tide direction, highs, lows, and coastal planning on iPhone.",
  keywords: [
    "tide app",
    "tide chart app",
    "simple tide app",
    "surf tide app",
    "fishing tide app",
    "beach tide app",
    "coastal planning"
  ],
  openGraph: {
    title: `Tide App | ${siteConfig.name}`,
    description: "Tide Buoy is a simple tide app for checking tide charts, tide direction, highs, lows, and coastal planning on iPhone.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `Tide App | ${siteConfig.name}`,
    description: "Tide Buoy is a simple tide app for checking tide charts, tide direction, highs, lows, and coastal planning on iPhone."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
