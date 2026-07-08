import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blogPosts";
import { siteConfig } from "@/data/siteConfig";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: post.images?.[0]
        ? [
            {
              url: `${siteConfig.url}${post.images[0].src}`,
              alt: post.images[0].alt
            }
          ]
        : undefined
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-[var(--surface)] py-20">
      <div className="container-shell max-w-5xl">
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
                  name: "Coastal Journal",
                  item: `${siteConfig.url}/blog`
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `${siteConfig.url}/blog/${slug}`
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
              "@type": "BlogPosting",
              headline: post.title,
              description: post.metaDescription,
              datePublished: post.datePublished,
              dateModified: post.dateModified,
              image: post.images?.map((image) => `${siteConfig.url}${image.src}`),
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
                "@id": `${siteConfig.url}/blog/${slug}`
              }
            })
          }}
        />
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{post.category}</p>
          <h1 className="display-face mt-5 text-5xl font-bold tracking-[-0.03em] text-[var(--primary-deep)] md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[var(--muted)]">
            <span>{post.readTime}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--primary)]" />
            <span>Coastal Journal</span>
            <span className="h-1 w-1 rounded-full bg-[var(--primary)]" />
            <time dateTime={post.dateModified}>Updated {new Date(`${post.dateModified}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-[var(--muted)]">{post.excerpt}</p>
          {post.seoTags?.length ? (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {post.seoTags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--outline)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="border-t border-[var(--outline)] pt-12">
            {post.sections.map((section, index) => (
              <section key={section.heading} className={index === 0 ? "" : "mt-14 border-t border-[var(--outline)] pt-14"}>
                <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)] md:text-4xl">{section.heading}</h2>
                <div className="mt-6 space-y-6">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-9 text-[var(--muted)]">
                      {paragraph}
                    </p>
                  ))}
                  {section.items?.length ? (
                    <ul className="space-y-3 rounded-[1.5rem] border border-[var(--outline)] bg-white p-6 text-lg leading-8 text-[var(--muted)]">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {section.imageIndexes?.length && post.images ? (
                  <div className={`mt-8 grid gap-4 ${section.imageIndexes.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {section.imageIndexes.map((imageIndex) => {
                      const image = post.images?.[imageIndex];
                      if (!image) {
                        return null;
                      }

                      return (
                        <figure key={image.src} className="overflow-hidden rounded-[1.5rem] border border-[var(--outline)] bg-white shadow-sm">
                          <div className={`relative w-full bg-[var(--surface-soft)] ${image.aspectClass ?? "aspect-[4/3]"}`}>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                              style={image.focalPoint ? { objectPosition: image.focalPoint } : undefined}
                              priority={index === 0 && imageIndex === 0}
                            />
                          </div>
                          <figcaption className="px-4 py-3 text-sm leading-6 text-[var(--muted)]">
                            <span className="font-semibold text-[var(--primary)]">{image.tag}:</span> {image.caption}
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--outline)] pt-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Live tide charts</p>
                <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">Read here. Plan in the app.</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Live tide charts are available in the Tide Buoy iOS app. Web tide charts are coming soon.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row md:flex-col">
                <Link href="/app" className="cta-button button-blue inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold">
                  Explore the App
                </Link>
                <Link href="/blog" className="cta-button button-white inline-flex items-center justify-center rounded-xl border border-[var(--outline)] px-6 py-3 text-sm font-semibold">
                  Back to Coastal Journal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
