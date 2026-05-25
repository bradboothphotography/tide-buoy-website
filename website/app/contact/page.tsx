import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { SupportForm } from "@/components/SupportForm";

export const metadata: Metadata = {
  title: `Contact & Support | ${siteConfig.name}`,
  description: "Get help with Tide Buoy, send support tickets, report bugs, or ask questions about the iPhone app."
};

export default function ContactPage() {
  return (
    <section className="bg-[var(--surface)] py-20">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Support</p>
          <h1 className="display-face mt-4 text-5xl font-bold text-[var(--primary-deep)] md:text-6xl">Contact Tide Buoy</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            Use the form below for support tickets, bug reports, billing questions, and general help. We designed this page
            so every request can flow into a Google Sheet and trigger an email alert when it is configured on your server.
          </p>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <SupportForm />

          <div className="space-y-6">
            <div className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-8">
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Before You Send</h2>
              <ul className="mt-5 space-y-3 text-[var(--muted)]">
                {siteConfig.supportChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-white p-8">
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Direct Contact</h2>
              <p className="mt-4 text-[var(--muted)]">
                Email: <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-[var(--primary)]">{siteConfig.supportEmail}</a>
              </p>
              <p className="mt-3 text-[var(--muted)]">{siteConfig.supportResponseTime}</p>
            </div>

            <div className="card-shadow rounded-[2rem] border border-[var(--outline)] bg-white p-8">
              <h2 className="display-face text-3xl font-bold text-[var(--primary-deep)]">Support FAQ</h2>
              <div className="mt-5 space-y-5">
                {siteConfig.supportFaqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-[var(--ink)]">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
