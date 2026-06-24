import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Terms of Use | Tide Buoy",
  description: "View the Tide Buoy Terms of Use through Apple’s standard Licensed Application End User License Agreement.",
  alternates: {
    canonical: `${siteConfig.url}/terms`
  },
  openGraph: {
    title: "Terms of Use | Tide Buoy",
    description: "View the Tide Buoy Terms of Use through Apple’s standard Licensed Application End User License Agreement.",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function TermsPage() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell max-w-4xl">
        <div className="rounded-[2.4rem] border border-[var(--outline)] bg-white p-8 text-center md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Terms of Use</p>
          <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">Apple Standard Terms Apply</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Tide Buoy uses Apple&apos;s standard Licensed Application End User License Agreement in the App Store. Use the link below to
            view the same Terms of Use referenced inside the app.
          </p>
          <div className="mt-10">
            <Link
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              className="cta-button button-blue inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              View Apple&apos;s Standard Terms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
