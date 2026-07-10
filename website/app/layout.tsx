import type { Metadata } from "next";
import Script from "next/script";
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
    "best tide app",
    "easy to use tide app",
    "quick tides",
    "exact location",
    "tide chart app",
    "simple tide app",
    "surf tide app",
    "fishing tide app",
    "beach tide app",
    "coastal planning"
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: `Tide App | ${siteConfig.name}`,
    description: "Tide Buoy is a simple tide app for checking tide charts, tide direction, highs, lows, and coastal planning on iPhone.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/images/brand/tide-buoy-logo-blue.png",
        width: 1024,
        height: 512,
        alt: "Tide Buoy logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `Tide App | ${siteConfig.name}`,
    description: "Tide Buoy is a simple tide app for checking tide charts, tide direction, highs, lows, and coastal planning on iPhone.",
    images: ["/images/brand/tide-buoy-logo-blue.png"]
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2ZY1X3J9LR" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2ZY1X3J9LR');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
