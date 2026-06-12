import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { tideGuideStates, tideGuideTopics } from "@/data/tidesContent";

const title = `Tide Guides | ${siteConfig.name}`;
const description = "Browse starter Tide Buoy tide guide content for coastal planning, tide direction, and simple tide education.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteConfig.url}/tides`
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/tides`,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function TidesPage() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Tide guides",
              description,
              url: `${siteConfig.url}/tides`,
              about: tideGuideTopics.map((topic) => topic.title)
            })
          }}
        />
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Tide Guides</p>
          <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">Simple Tide Planning Guides for Coastal Days</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Tide Buoy is built to grow into a larger SEO guide engine over time. For now, this section keeps the rollout focused
            on helpful tide education and clear internal paths back to the app.
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {tideGuideStates.map((state) => (
            <div key={state.name} className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-white p-8">
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">{state.name}</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">{state.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {tideGuideTopics.map((topic) => (
            <div key={topic.title} className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-8">
              <h2 className="display-face text-2xl font-bold text-[var(--primary-deep)]">{topic.title}</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] bg-[var(--primary-deep)] p-8 text-white md:p-10">
          <h2 className="display-face text-3xl font-bold">Looking for live web tide charts?</h2>
          <p className="mt-4 max-w-3xl text-white/85">
            Live tide charts are available in the Tide Buoy iOS app. Web tide charts are coming soon. In the meantime, the blog
            and app pages are the best place to learn the system and plan a day around the water.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/app" className="cta-button button-white inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold">
              Explore the App
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white">
              Read Tide Guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
