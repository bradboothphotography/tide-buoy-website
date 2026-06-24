import type { Metadata } from "next";
import Link from "next/link";
import { featurePages } from "@/data/features";
import { FAQSection } from "@/components/FAQSection";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Tide App Features | Tide Buoy",
  description: "Explore Tide Buoy feature pages for tide charts, tide direction, highs and lows, location tools, coastal planning, and clean design.",
  alternates: {
    canonical: `${siteConfig.url}/features`
  },
  openGraph: {
    title: "Tide App Features | Tide Buoy",
    description: "Explore Tide Buoy feature pages for tide charts, tide direction, highs and lows, location tools, coastal planning, and clean design.",
    url: `${siteConfig.url}/features`,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function FeaturesPage() {
  const faqs = [
    {
      question: "What do these feature pages cover?",
      answer:
        "Each page explains how a Tide Buoy feature works, why it matters for coastal planning, and what kind of real-world tide decisions it helps with."
    },
    {
      question: "Are the feature pages live tide pages?",
      answer:
        "Not yet. They are informational SEO pages that explain the app's features while live tide charts remain in the iOS app."
    },
    {
      question: "Why build feature pages at all?",
      answer:
        "Feature pages help Tide Buoy rank for high-intent searches like tide app, tide chart app, surf tide app, and fishing tide app while also helping visitors understand the product faster."
    }
  ];

  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Tide Buoy feature pages",
              itemListElement: featurePages.map((feature, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: feature.title,
                url: `${siteConfig.url}/features/${feature.slug}`
              }))
            })
          }}
        />
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Features</p>
          <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">
            Feature pages for a simpler tide app
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            These pages explain what Tide Buoy actually does, how each feature works, and why the app is built around faster, cleaner coastal decisions.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featurePages.map((feature) => (
            <Link
              key={feature.slug}
              href={`/features/${feature.slug}`}
              className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(10,37,64,0.1)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">{feature.kicker}</p>
              <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">{feature.title}</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">{feature.shortDescription}</p>
              <p className="mt-5 text-sm font-semibold text-[var(--primary)]">Open feature page</p>
            </Link>
          ))}
        </div>
      </div>

      <FAQSection
        id="features-faq"
        eyebrow="Feature pages"
        title="Questions people ask before they tap through"
        intro="Clear explanations help the page rank for useful intent and help answer engines summarize the site correctly."
        items={faqs}
      />
    </section>
  );
}
