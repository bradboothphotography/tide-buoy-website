import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@/components/FAQSection";
import { getFeaturePage } from "@/data/features";
import { getBlogPost } from "@/data/blogPosts";
import { getUseCasePage, useCasePages } from "@/data/useCases";
import { siteConfig } from "@/data/siteConfig";

export function generateStaticParams() {
  return useCasePages.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCasePage(slug);

  if (!useCase) {
    return {};
  }

  const imageUrl = useCase.heroImage.src.startsWith("http") ? useCase.heroImage.src : `${siteConfig.url}${useCase.heroImage.src}`;

  return {
    title: useCase.metaTitle,
    description: useCase.metaDescription,
    keywords: [...useCase.seoTags, "easy to use tide app", "quick tides", "exact location"],
    alternates: {
      canonical: `${siteConfig.url}/use-cases/${slug}`
    },
    openGraph: {
      title: useCase.metaTitle,
      description: useCase.metaDescription,
      url: `${siteConfig.url}/use-cases/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: imageUrl,
          alt: useCase.heroImage.alt
        }
      ]
    }
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCasePage(slug);

  if (!useCase) {
    notFound();
  }

  const relatedFeatures = useCase.relatedFeatureSlugs.flatMap((relatedSlug) => {
    const feature = getFeaturePage(relatedSlug);
    return feature ? [feature] : [];
  });
  const relatedPosts = useCase.relatedBlogSlugs.flatMap((relatedSlug) => {
    const post = getBlogPost(relatedSlug);
    return post ? [post] : [];
  });
  const relatedUseCases = useCase.relatedUseCaseSlugs.flatMap((relatedSlug) => {
    const related = getUseCasePage(relatedSlug);
    return related ? [related] : [];
  });
  const imageUrl = useCase.heroImage.src.startsWith("http") ? useCase.heroImage.src : `${siteConfig.url}${useCase.heroImage.src}`;

  return (
    <>
      <section className="bg-[var(--surface)] py-20">
        <div className="container-shell">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
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
                        name: "Use Cases",
                        item: `${siteConfig.url}/use-cases`
                      },
                      {
                        "@type": "ListItem",
                        position: 3,
                        name: useCase.title,
                        item: `${siteConfig.url}/use-cases/${slug}`
                      }
                    ]
                  },
                  {
                    "@type": "Article",
                    headline: useCase.metaTitle,
                    description: useCase.metaDescription,
                    image: [imageUrl],
                    author: {
                      "@type": "Organization",
                      name: siteConfig.name
                    },
                    publisher: {
                      "@type": "Organization",
                      name: siteConfig.name,
                      url: siteConfig.url,
                      logo: {
                        "@type": "ImageObject",
                        url: `${siteConfig.url}/images/brand/tide-buoy-logo-blue.png`
                      }
                    },
                    mainEntityOfPage: {
                      "@type": "WebPage",
                      "@id": `${siteConfig.url}/use-cases/${slug}`
                    },
                    keywords: useCase.seoTags.join(", ")
                  }
                ]
              })
            }}
          />

          <article className="mx-auto max-w-3xl">
            <header className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">{useCase.kicker}</p>
              <h1 className="display-face mt-4 text-5xl font-bold tracking-[-0.03em] text-[var(--primary-deep)] md:text-6xl">
                {useCase.metaTitle.replace(" | Tide Buoy", "")}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-[var(--muted)]">{useCase.intro}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {useCase.seoTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--outline)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </header>

            <div className="mt-16 border-t border-[var(--outline)] pt-12">
              <div className="border-b border-[var(--outline)] pb-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Quick read</p>
                  <p className="text-sm text-[var(--muted)]">{useCase.readTime}</p>
                </div>
                <p className="mt-4 text-lg leading-9 text-[var(--muted)]">{useCase.excerpt}</p>
                <ul className="mt-6 space-y-3 text-lg leading-8 text-[var(--muted)]">
                  {useCase.quickChecks.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {useCase.images.map((image, imageIndex) => (
                  <figure key={image.src} className="overflow-hidden rounded-[1.5rem] border border-[var(--outline)] bg-white shadow-sm">
                    <div className={`relative w-full bg-[var(--surface-soft)] ${image.aspectClass ?? "aspect-[4/3]"}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        style={image.focalPoint ? { objectPosition: image.focalPoint } : undefined}
                        priority={imageIndex === 0}
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm leading-6 text-[var(--muted)]">
                      <span className="font-semibold text-[var(--primary)]">{image.tag}:</span> {image.caption} Photo credit: {" "}
                      <a href="https://bradboothmedia.com" target="_blank" rel="noreferrer" className="font-semibold text-[var(--primary)] underline decoration-[var(--primary)]/30 underline-offset-4 hover:decoration-[var(--primary)]">
                        Brad Booth
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {useCase.sections.map((section, index) => (
                <section key={section.heading} className={index === 0 ? "mt-14" : "mt-14 border-t border-[var(--outline)] pt-14"}>
                  <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)] md:text-4xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-8 text-[var(--muted)]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.items?.length ? (
                    <ul className="mt-6 space-y-3 border-l-2 border-[var(--primary)] pl-6 text-lg leading-8 text-[var(--muted)]">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="my-16 rounded-[2.3rem] bg-[var(--primary-deep)] p-8 text-white md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Before you go</p>
                <h2 className="display-face mt-3 text-3xl font-bold">Quick tides, exact location, less guesswork.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">
                  Tide Buoy is built to be an easy to use tide app for people who want quick tides in their exact location without digging through clutter.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Link href="/app" className="cta-button button-white inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold">
                    Explore the app
                  </Link>
                  <Link
                    href="/use-cases"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white"
                  >
                    All use cases
                  </Link>
                </div>
              </section>

              {relatedFeatures.length ? (
                <section className="mb-16">
                  <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Related features</p>
                    <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">Tools that support this use case</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedFeatures.map((feature) => (
                      <Link
                        key={feature.slug}
                        href={`/features/${feature.slug}`}
                        className="rounded-[1.8rem] border border-[var(--outline)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(10,37,64,0.08)]"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">Feature</p>
                        <h3 className="display-face mt-3 text-2xl font-bold text-[var(--primary-deep)]">{feature.title}</h3>
                        <p className="mt-3 leading-7 text-[var(--muted)]">{feature.shortDescription}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {relatedPosts.length ? (
                <section className="mb-16">
                  <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Coastal Journal</p>
                    <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">Related reading</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="rounded-[1.8rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-6 transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(10,37,64,0.08)]"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">{post.category}</p>
                        <h3 className="display-face mt-3 text-2xl font-bold text-[var(--primary-deep)]">{post.title}</h3>
                        <p className="mt-3 leading-7 text-[var(--muted)]">{post.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {relatedUseCases.length ? (
                <section>
                  <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">More use cases</p>
                    <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">Keep planning around the water</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedUseCases.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/use-cases/${related.slug}`}
                        className="rounded-[1.8rem] border border-[var(--outline)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(10,37,64,0.08)]"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">{related.kicker}</p>
                        <h3 className="display-face mt-3 text-2xl font-bold text-[var(--primary-deep)]">{related.metaTitle.replace(" | Tide Buoy", "")}</h3>
                        <p className="mt-3 leading-7 text-[var(--muted)]">{related.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </article>
        </div>
      </section>

      <FAQSection
        id="use-case-faq"
        eyebrow="FAQ"
        title={`${useCase.title} tide planning questions`}
        intro="Clear answers help people and search engines understand how this use case connects to tide timing in the real world."
        items={useCase.faqs}
      />
    </>
  );
}
