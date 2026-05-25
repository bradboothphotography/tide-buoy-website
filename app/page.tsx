import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { FAQSection } from "@/components/FAQSection";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { UseCaseCarousel } from "@/components/UseCaseCarousel";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Tide App Made Simple | Tide Buoy",
  description: "Tide Buoy is a simple tide app for surfers, fishermen, boaters, beachgoers, and coastal locals who want fast tide checks.",
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: "Tide App Made Simple | Tide Buoy",
    description: "Tide Buoy is a simple tide app for surfers, fishermen, boaters, beachgoers, and coastal locals who want fast tide checks.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  }
};

const useCases = [
  ["Surfing", "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Gl70Ap-9aFCPX7aDhGO6-210PaD3alTXTFEyP9-hvXbv4rEpeX2ypjGsRl2qKOVejoZLIII6KHcqoyS5cwe1HyYwN4vx7KBYSVaMDbJogLWLlcZhLovjMY8exOFj0kWGhblvNZBmlL2Q3p9H4EvgZ7IxgXXZ_nnX8m4GwUeIWx3Hen2XacgJrw0kk6QWeTYV7kgrCKA4fpTnErnxP2ix7Y7pyWxaNFhZNN3fBeTBrkOMEF2l1EGy03z0o8o9iGM-J1xgZIhxYYA"],
  ["Fishing", "/images/use-cases/fishing.jpeg"],
  ["Boating", "/images/use-cases/boating.jpeg"],
  ["Beach Days", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"],
  ["Diving", "/images/use-cases/diving.jpeg"]
] as const;

function ImageCard({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} />;
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: "What is Tide Buoy?",
      answer:
        "Tide Buoy is a simple tide app for checking tide charts, tide direction, daily highs and lows, saved spots, and coastal planning on iPhone."
    },
    {
      question: "Who is Tide Buoy for?",
      answer:
        "It is built for surfers, fishermen, boaters, divers, beachgoers, photographers, shell hunters, travelers, and coastal locals who want to get accurate tides quickly in their exact location."
    },
    {
      question: "Does the website show live tide charts yet?",
      answer: "Not yet. Live tide charts are available in the Tide Buoy iOS app. Web tide charts are coming soon."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
      dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url
          })
        }}
      />
      <section className="hero-bg overflow-hidden pb-14 pt-20 md:pb-14 md:pt-16">
        <div className="container-shell text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)] bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white">
            Right tide, Right Location
          </div>
          <h1 className="display-face mx-auto max-w-4xl text-5xl font-extrabold tracking-[-0.03em] text-[var(--primary-deep)] md:text-6xl lg:text-7xl">
            Tide App Made Simple.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            Tide Buoy is the tide app for checking the tide, planning your session, and knowing what the water is doing whether you&apos;re surfing,
            fishing, boating, shell hunting, shooting photos, or heading to the beach.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <AppStoreButton className="px-8 py-4 text-base" label="Download for iPhone" />
            <a
              href="#features"
              className="secondary-cta inline-flex items-center justify-center rounded-xl border-2 border-[color:rgba(31,102,156,0.18)] bg-white/70 px-8 py-4 text-base font-semibold text-[var(--primary)]"
            >
              Explore Features
            </a>
          </div>
          <div className="relative mx-auto mt-14 grid max-w-5xl items-end gap-4 md:mt-16 md:grid-cols-[0.86fr_0.92fr_0.86fr] md:gap-0">
            <div className="absolute -top-20 h-80 w-full rounded-full bg-[color:rgba(31,102,156,0.1)] blur-[120px]" />
            <div className="hero-device relative hidden justify-self-end md:block md:w-[215px] md:mr-8 lg:w-[235px] lg:mr-12">
              <ImageCard
                src="/images/app-screenshots/marketing/closest-live-swell-buoy-data.jpg"
                alt="Tide Buoy swell buoy data screen"
                className="hero-phone hero-phone-left phone-shadow translate-y-8 rounded-[2.5rem] border-8 border-slate-900 -rotate-6"
              />
            </div>
            <div className="hero-device relative z-10 mx-auto w-2/3 md:w-[270px] lg:w-[300px]">
              <ImageCard
                src="/images/app-screenshots/marketing/accurate-tides-in-your-location.jpg"
                alt="Tide Buoy accurate tides screen"
                className="hero-phone hero-phone-center phone-shadow rounded-[3rem] border-[10px] border-slate-900"
              />
            </div>
            <div className="hero-device relative hidden justify-self-start md:block md:w-[215px] md:ml-8 lg:w-[235px] lg:ml-12">
              <ImageCard
                src="/images/app-screenshots/marketing/choose-any-new-location-on-map.jpg"
                alt="Tide Buoy map picker screen"
                className="hero-phone hero-phone-right phone-shadow translate-y-8 rounded-[2.5rem] border-8 border-slate-900 rotate-6"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[var(--surface-soft)] py-20">
        <div className="container-shell">
          <FeatureCarousel />
        </div>
      </section>

      <section className="bg-[var(--surface)] py-20">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <ImageCard
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKnyoucznPRZuLdp6s57zNpccY0KV74IflU1TANpdJyr1wDaGZg1YwdRX0DpcUELiZr8ZfttgX6y90XOXg9rx-NUD9kioyq4GQ_3ZUxAPUXlsKl3z4ngd8YCXcnSRfAWu1xBVzJOyqSy0N3LJHVlFUtSlQw_LCq01wUKDFNiKeIEvxc9Avl9PkO77iyCSkTWmZtz18nc7bbVOrg98mrelVLlrZ_Ehjv-b6GpFScXXY2CQi0j3HdzgYBDrwI61SP1nRSfZSu2JUl1w"
              alt="Coastal lifestyle"
              className="h-[500px] w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,78,125,0.8)] to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-2xl items-center px-10 md:px-16">
              <div>
                <h2 className="display-face text-5xl font-bold text-white">Built for the Wild Blue</h2>
                <p className="mt-5 text-lg leading-8 text-white/90">
                  From dawn surf checks to long fishing mornings, Tide Buoy gives the coast a cleaner interface.
                </p>
                <div className="mt-8">
                  <AppStoreButton variant="white" label="Start Your Adventure" />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-[15%] hidden items-center lg:flex">
              <Image
                src="/images/brand/tide-buoy-buoy-white.png"
                alt=""
                width={1024}
                height={1361}
                aria-hidden="true"
                className="h-[300px] w-auto opacity-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="bg-[var(--surface)] py-20">
        <div className="container-shell">
          <UseCaseCarousel items={useCases} />
        </div>
      </section>

      <section id="pricing" className="bg-[var(--surface-soft)] py-20">
        <div className="container-shell">
          <div className="mb-14 text-center">
            <h2 className="display-face text-4xl font-bold text-[var(--primary-deep)] md:text-5xl">Simple Pricing</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">Free to start. Premium is the ad-free version and is only $3 per year.</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 xl:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[var(--outline)] bg-white p-8">
              <h3 className="display-face text-2xl font-bold text-[var(--primary-deep)]">Free</h3>
              <p className="mt-2 text-sm text-[var(--muted)] md:text-base">Perfect for casual beachgoers.</p>
              <p className="mt-5 text-4xl font-bold text-[var(--ink)]">$0</p>
              <ul className="mt-7 space-y-3 text-sm text-[var(--muted)] md:text-base">
                <li>Daily tide info</li>
                <li>Hyper-local location</li>
                <li>One ad banner</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[var(--primary-deep)] p-8 text-white shadow-2xl">
              <p className="mb-4 inline-flex rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">Most Popular</p>
              <h3 className="display-face text-2xl font-bold">Premium</h3>
              <p className="mt-2 text-sm text-white/80 md:text-base">Ad-free access for people who live around the water.</p>
              <p className="mt-5 text-4xl font-bold">$3<span className="ml-1 text-lg font-medium opacity-75">/year</span></p>
              <ul className="mt-7 space-y-3 text-sm text-white/90 md:text-base">
                <li>Pick and save custom locations</li>
                <li>Surf buoy data</li>
                <li>Fishing data</li>
                <li>Future tides</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] py-20">
        <div className="container-shell max-w-5xl">
          <div className="card-shadow flex flex-col items-center gap-10 rounded-[2.5rem] border border-[var(--outline)] bg-white p-8 md:flex-row md:p-14">
            <ImageCard
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXZw3HKZZ6dJBIDJujWddAoBTPIFucHCorYIQVC241z1s56SCpUnBRjGBRNjI0iqbbqNeX0W-kLHCmVPT80JpbT9lD1lwbpIFQLZ0jK5Rxpiw1R2K3FhHEdwtx6YmuYg0znp2FzsmyGQHYM-0h30SHyw5oapBV_fRoRIDgjJSnAc8BUPYYxxACWocKwaEqEHuEtWsFjiWoDBVdaXFb2zTrswB_gkd6gAwaHw-0i7qEON8EB7K6Q-1bbhbP6ytrh7mpZMFpI1TDcg9Ckw"
              alt="Creator portrait"
              className="h-48 w-48 rounded-full object-cover"
            />
            <div>
              <h2 className="display-face text-4xl font-bold text-[var(--primary-deep)]">From One Ocean Lover to Another</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                Tide Buoy was built by an ocean-loving photographer, traveler, surfer, and outdoorsman who wanted a cleaner, faster way to check the tide.
              </p>
              <p className="mt-5 text-base italic leading-8 text-[var(--muted)]">
                “Spend less time digging through clutter and more time understanding what the water is doing.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        id="home-faq"
        title="Quick answers about Tide Buoy"
        intro="These are the kinds of concise answers search engines and AI systems can lift easily, and they also help visitors understand the app quickly."
        items={homeFaqs}
      />

      <section className="border-y border-[var(--outline)] bg-[var(--surface-soft)] py-12">
        <div className="container-shell">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Popular Tide Guides</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Tides in San Diego", href: "/features/accurate-tides-in-your-location" },
              { label: "Incoming vs Outgoing Tide", href: "/blog/incoming-vs-outgoing-tide" },
              { label: "Best Tide for Surfing", href: "/blog/best-tide-for-surfing" },
              { label: "Tide Guides Directory", href: "/tides" }
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-[var(--muted)] hover:text-[var(--primary)]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--primary-deep)] py-24">
        <div className="container-shell relative z-10 text-center">
          <h2 className="display-face text-5xl font-bold text-white">Ready to hit the coast?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Join the surfers, sailors, anglers, photographers, and beach walkers who want tide data to feel clear again.
          </p>
          <div className="mt-10">
            <AppStoreButton variant="white" className="px-10 py-5" label="Download Tide Buoy" />
          </div>
        </div>
      </section>
    </>
  );
}
