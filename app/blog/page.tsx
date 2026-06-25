import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Coastal Journal | ${siteConfig.name}`,
  description: "Read the Tide Buoy Coastal Journal for tide app guides, tide timing notes, and simple coastal planning articles.",
  alternates: {
    canonical: `${siteConfig.url}/blog`
  },
  openGraph: {
    title: `Coastal Journal | ${siteConfig.name}`,
    description: "Read the Tide Buoy Coastal Journal for tide app guides, tide timing notes, and simple coastal planning articles.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = blogPosts;
  const journalShortcuts = [
    {
      label: "Tide basics",
      href: "/blog/how-to-read-a-tide-chart",
      description: "How to read a tide chart"
    },
    {
      label: "Surf timing",
      href: "/blog/best-tide-for-surfing",
      description: "Best tide for surfing"
    },
    {
      label: "Fishing windows",
      href: "/blog/best-tide-for-fishing",
      description: "Best tide for fishing"
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
              "@type": "Blog",
              name: `Coastal Journal | ${siteConfig.name}`,
              url: `${siteConfig.url}/blog`,
              blogPost: blogPosts.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                description: post.metaDescription,
                datePublished: post.datePublished,
                dateModified: post.dateModified,
                url: `${siteConfig.url}/blog/${post.slug}`,
                image: post.heroImage ? `${siteConfig.url}${post.heroImage.src}` : undefined
              }))
            })
          }}
        />
        <div className="relative overflow-hidden rounded-[2.8rem] bg-[var(--primary-deep)] px-8 py-10 text-white md:px-12 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%),linear-gradient(135deg,rgba(0,38,69,0.18),transparent_55%)]" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="relative grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Coastal Journal</p>
              <h1 className="display-face mt-4 text-5xl font-bold tracking-[-0.03em] text-white md:text-6xl">
                Tides, timing, and better coastal instincts.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
                The Tide Buoy Coastal Journal is where we keep the useful stuff: simple tide education, surf and fishing timing
                notes, and real-world planning ideas for people who spend time near the water.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {journalShortcuts.map((shortcut) => (
                <Link
                  key={shortcut.label}
                  href={shortcut.href}
                  className="rounded-[1.6rem] border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:border-white/25"
                  aria-label={`Open ${shortcut.description}`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">{shortcut.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="card-shadow overflow-hidden rounded-[2.6rem] border border-[var(--outline)] bg-white">
            <div className="relative min-h-[320px] overflow-hidden bg-[var(--surface-soft)] px-8 py-8 md:px-10 md:py-10">
              <div
                className="absolute inset-0 opacity-85"
                style={{
                  backgroundImage: `url('${featuredPost.heroImage?.src ?? "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,43,74,0.78),rgba(0,78,125,0.42))]" />
              <div className="relative flex h-full flex-col justify-end">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">{featuredPost.category}</p>
                <h2 className="display-face mt-3 max-w-2xl text-4xl font-bold text-white md:text-5xl">{featuredPost.title}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">{featuredPost.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-white/78">
                  <span>{featuredPost.readTime}</span>
                  <span>Featured read</span>
                </div>
                <div className="mt-8">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="cta-button button-white inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold"
                  >
                    Read Featured Story
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="space-y-4">
            {otherPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">{post.category}</p>
                  <p className="text-sm text-[var(--muted)]">{post.readTime}</p>
                </div>
                <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">{post.title}</h2>
                <p className="mt-4 leading-7 text-[var(--muted)]">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[var(--primary)]">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">More From The Journal</p>
              <h2 className="display-face mt-3 text-4xl font-bold text-[var(--primary-deep)]">Field notes for tide-driven days</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {otherPosts.slice(3).map((post, index) => (
              <article
                key={post.slug}
                className={`card-shadow rounded-[2.2rem] border border-[var(--outline)] p-8 ${
                  index % 2 === 0 ? "bg-white" : "bg-[var(--surface-mid)]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">{post.category}</p>
                <h3 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)]">{post.title}</h3>
                <p className="mt-4 text-sm text-[var(--muted)]">{post.readTime}</p>
                <p className="mt-4 leading-7 text-[var(--muted)]">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--primary)]">
                  Open journal entry
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[2.4rem] bg-[var(--primary-deep)] p-8 text-white md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Live tide charts</p>
              <h2 className="display-face mt-3 text-4xl font-bold">Read here. Plan in the app.</h2>
              <p className="mt-4 max-w-2xl text-white/82">
                Coastal Journal articles are built to help you think more clearly about tides. When you want live tide charts and
                day-of planning, jump back into the Tide Buoy app.
              </p>
            </div>
            <Link
              href="/app"
              className="cta-button button-white inline-flex items-center justify-center rounded-xl px-7 py-4 text-sm font-semibold"
            >
              Explore the App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
