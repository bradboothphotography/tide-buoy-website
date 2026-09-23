import type { Metadata } from "next";
import Link from "next/link";
import { outgoingTidePreview } from "@/data/outgoingTidePreview";

export const metadata: Metadata = {
  title: `Draft Preview: ${outgoingTidePreview.metaTitle}`,
  description: outgoingTidePreview.metaDescription,
  robots: {
    index: false,
    follow: false
  }
};

export default function OutgoingTidePreviewPage() {
  const post = outgoingTidePreview;

  return (
    <main className="bg-[var(--surface)] py-12 md:py-20">
      <article className="container-shell max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-[var(--outline)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            Draft preview
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{post.category}</p>
          <h1 className="display-face mt-4 text-4xl font-bold text-[var(--primary-deep)] md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-[var(--muted)]">
            <span>{post.readTime}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--primary)]" />
            <time dateTime={post.dateModified}>Updated September 23, 2026</time>
          </div>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>
        </header>

        <div className="mx-auto mt-14 max-w-3xl border-t border-[var(--outline)] pt-10 md:mt-16 md:pt-12">
          {post.sections.map((section, index) => (
            <section key={section.heading} className={index === 0 ? "" : "mt-12 border-t border-[var(--outline)] pt-10"}>
              {section.heading !== post.title ? (
                <h2 className="display-face text-2xl font-bold text-[var(--primary-deep)] md:text-3xl">{section.heading}</h2>
              ) : null}
              <div className="mt-5 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-8 text-[var(--muted)]">
                    {paragraph}
                  </p>
                ))}
                {section.items?.length ? (
                  <ul className="space-y-3 rounded-xl border border-[var(--outline)] bg-white p-5 text-base leading-7 text-[var(--muted)] md:p-6 md:text-lg">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--primary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <footer className="mx-auto mt-14 max-w-3xl border-t border-[var(--outline)] pt-10">
          <div className="flex flex-col gap-5 rounded-xl bg-[var(--primary-deep)] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Before you go</p>
              <h2 className="display-face mt-2 text-2xl font-bold">Check the tide in Tide Buoy.</h2>
              <p className="mt-2 max-w-xl leading-7 text-white/80">
                See the current tide, direction, and next high or low tide for your coastal spot.
              </p>
            </div>
            <Link href="/app" className="cta-button button-white inline-flex shrink-0 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold">
              Explore the App
            </Link>
          </div>
          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            <Link href="/blog" className="font-semibold text-[var(--primary)]">Back to Coastal Journal</Link>
          </p>
        </footer>
      </article>
    </main>
  );
}
