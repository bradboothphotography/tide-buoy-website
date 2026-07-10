import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { useCasePages } from "@/data/useCases";

export const metadata: Metadata = {
  title: "Best Tide App Use Cases | Tide Buoy",
  description:
    "Explore Tide Buoy guides for surfing, fishing, beach days, boating, and diving, with keyword-focused pages built around quick tides and exact-location planning.",
  keywords: [
    "best tide app",
    "easy to use tide app",
    "quick tides",
    "exact location",
    "tide app for surfers",
    "fishing tide app",
    "boating tide app",
    "beach tide app",
    "tide app for diving"
  ],
  alternates: {
    canonical: `${siteConfig.url}/use-cases`
  },
  openGraph: {
    title: "Best Tide App Use Cases | Tide Buoy",
    description:
      "Explore Tide Buoy guides for surfing, fishing, beach days, boating, and diving, with keyword-focused pages built around quick tides and exact-location planning.",
    url: `${siteConfig.url}/use-cases`,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function UseCasesIndexPage() {
  const orderedUseCases = ["surfing", "fishing", "boating", "beach-days", "diving"].flatMap((slug) => {
    const useCase = useCasePages.find((entry) => entry.slug === slug);
    return useCase ? [useCase] : [];
  });

  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "CollectionPage",
                  name: "Best Tide App Use Cases",
                  description:
                    "A collection of Tide Buoy guides for surfers, anglers, boaters, divers, and beachgoers looking for a simple tide app.",
                  url: `${siteConfig.url}/use-cases`
                },
                {
                  "@type": "ItemList",
                  itemListElement: orderedUseCases.map((useCase, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    url: `${siteConfig.url}/use-cases/${useCase.slug}`,
                    name: useCase.metaTitle.replace(" | Tide Buoy", "")
                  }))
                }
              ]
            })
          }}
        />

        <div className="relative overflow-hidden rounded-[2.8rem] bg-[var(--primary-deep)] px-8 py-10 text-white md:px-12 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%),linear-gradient(135deg,rgba(0,38,69,0.18),transparent_55%)]" />
          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Use Cases</p>
            <h1 className="display-face mt-4 text-5xl font-bold tracking-[-0.03em] text-white md:text-6xl">
              The best tide app should make sense on real water days.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82">
              These guides break down how surfers, anglers, boaters, beachgoers, and divers actually use tide timing. The goal is simple:
              quick tides, exact location, and cleaner decisions before you head out.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {orderedUseCases.map((useCase) => (
            <Link
              key={useCase.slug}
              href={`/use-cases/${useCase.slug}`}
              className="group card-shadow overflow-hidden rounded-[2.1rem] border border-[var(--outline)] bg-white transition hover:-translate-y-1"
            >
              <div className="relative">
                <img src={useCase.heroImage.src} alt={useCase.heroImage.alt} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">{useCase.kicker}</p>
                  <h2 className="display-face mt-2 text-3xl font-bold text-white">{useCase.metaTitle.replace(" | Tide Buoy", "")}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--muted)]">{useCase.readTime}</p>
                <p className="mt-3 leading-7 text-[var(--muted)]">{useCase.excerpt}</p>
                <p className="mt-5 text-sm font-semibold text-[var(--primary)]">Open guide</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
