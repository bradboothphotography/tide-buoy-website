import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Simple Tide App | ${siteConfig.name}`,
  description: "Learn how Tide Buoy works as a simple tide app for surfers, anglers, boaters, beachgoers, and photographers.",
  alternates: {
    canonical: `${siteConfig.url}/app`
  },
  openGraph: {
    title: `Simple Tide App | ${siteConfig.name}`,
    description: "Learn how Tide Buoy works as a simple tide app for surfers, anglers, boaters, beachgoers, and photographers.",
    url: `${siteConfig.url}/app`,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function AppPage() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: siteConfig.name,
              applicationCategory: "WeatherApplication",
              operatingSystem: "iOS",
              url: siteConfig.appStoreUrl,
              description:
                "Tide Buoy is a simple iPhone tide app for local tide charts, tide direction, saved spots, surf buoy data, fishing data, and future tides.",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  description: "Free version with one ad banner."
                },
                {
                  "@type": "Offer",
                  price: "3",
                  priceCurrency: "USD",
                  description: "Premium version for $3 per year."
                }
              ]
            })
          }}
        />
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">The App</p>
          <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">A Simple Tide App for Real Days on the Water</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Tide Buoy keeps tide charts, tide direction, and daily coastal timing easy to understand on iPhone. It is built
            for quick decisions before a surf check, fishing mission, boat launch, shell hunt, beach day, or sunrise photo session.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <AppStoreButton label="Download Tide Buoy" />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--outline)] bg-white px-6 py-3 text-sm font-semibold text-[var(--primary-deep)]"
            >
              Contact Support
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.appHighlights.map((item) => (
            <div key={item} className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-8">
              <p className="text-lg font-semibold text-[var(--primary-deep)]">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-2">
          <div className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-white p-8 md:p-10">
            <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Who It Is For</h2>
            <p className="mt-4 text-[var(--muted)]">
              Tide Buoy is designed for surfers, fishermen, boaters, beachgoers, shell hunters, photographers, travelers, and
              coastal locals who want the answer fast without digging through clutter.
            </p>
          </div>
          <div className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-[var(--primary-deep)] p-8 text-white md:p-10">
            <h2 className="display-face text-3xl font-bold">Pricing That Stays Light</h2>
            <p className="mt-4 text-white/85">
              The free version includes one ad banner. Premium includes pick and save custom locations, surf buoy data, fishing
              data, and future tides for $3 per year. Optional tips are available separately for people who want to support
              continued development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
