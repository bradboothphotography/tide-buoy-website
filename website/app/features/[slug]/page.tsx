import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featurePages, getFeaturePage } from "@/data/features";
import { siteConfig } from "@/data/siteConfig";
import { FAQSection } from "@/components/FAQSection";

export function generateStaticParams() {
  return featurePages.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeaturePage(slug);

  if (!feature) {
    return {};
  }

  return {
    title: feature.metaTitle,
    description: feature.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/features/${slug}`
    },
    openGraph: {
      title: feature.metaTitle,
      description: feature.metaDescription,
      url: `${siteConfig.url}/features/${slug}`,
      siteName: siteConfig.name,
      type: "article"
    }
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeaturePage(slug);

  if (!feature) {
    notFound();
  }

  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Features",
                  item: `${siteConfig.url}/features`
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: feature.title,
                  item: `${siteConfig.url}/features/${slug}`
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: feature.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
            })
          }}
        />
        <div className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
          <div className="xl:sticky xl:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{feature.kicker}</p>
            <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">{feature.title}</h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{feature.intro}</p>

            <div className="mt-10 overflow-hidden rounded-[2.2rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-6">
              <Image
                src={feature.screenshot}
                alt={`${feature.title} screenshot in Tide Buoy`}
                width={1200}
                height={1600}
                unoptimized
                className="mx-auto h-auto max-h-[560px] w-auto rounded-[1.5rem]"
              />
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Why this feature matters</h2>
              <div className="mt-6 space-y-5">
                {feature.whyItMatters.map((item) => (
                  <p key={item} className="text-lg leading-8 text-[var(--muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">How Tide Buoy uses it</h2>
              <ul className="mt-6 list-disc space-y-4 pl-6 text-lg leading-8 text-[var(--muted)]">
                {feature.howItHelps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Best real-world uses</h2>
              <ul className="mt-6 list-disc space-y-4 pl-6 text-lg leading-8 text-[var(--muted)]">
                {feature.practicalUses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] bg-[var(--primary-deep)] p-8 text-white md:p-10">
              <h2 className="display-face text-3xl font-bold">Want to try this in the app?</h2>
              <p className="mt-4 max-w-2xl text-white/82">
                Tide Buoy brings this feature into a simple, mobile-first tide app experience built for the coast.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link href="/app" className="cta-button button-white inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold">
                  Explore the app
                </Link>
                <Link href="/features" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white">
                  All features
                </Link>
              </div>
            </section>

            <section>
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Related features</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {feature.relatedFeatures.map((relatedSlug) => {
                  const related = getFeaturePage(relatedSlug);

                  if (!related) {
                    return null;
                  }

                  return (
                    <Link
                      key={related.slug}
                      href={`/features/${related.slug}`}
                      className="rounded-[1.6rem] border border-[var(--outline)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(10,37,64,0.08)]"
                    >
                      <h3 className="display-face text-2xl font-bold text-[var(--primary-deep)]">{related.title}</h3>
                      <p className="mt-3 leading-7 text-[var(--muted)]">{related.shortDescription}</p>
                    </Link>
                  );
                })}
              </div>
            </section>

            <FAQSection
              id="feature-faq"
              eyebrow="FAQ"
              title={`${feature.title} questions, answered`}
              intro="Clear answers help both humans and search engines understand what this Tide Buoy feature actually does."
              items={feature.faqs}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
