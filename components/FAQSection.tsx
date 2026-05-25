type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: FAQItem[];
};

export function FAQSection({ id, eyebrow, title, intro, items }: FAQSectionProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section id={id} className="bg-[var(--surface)] py-20">
      <div className="container-shell max-w-4xl">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{eyebrow}</p> : null}
          <h2 className="display-face mt-3 text-4xl font-bold text-[var(--primary-deep)] md:text-[3.25rem] md:leading-[1.02]">{title}</h2>
          {intro ? <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{intro}</p> : null}
        </div>

        <div className="mt-12 space-y-4">
          {items.map((item) => (
            <details key={item.question} className="group rounded-[1.5rem] border border-[var(--outline)] bg-[var(--surface-soft)] p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--primary-deep)]">
                <span className="flex items-center justify-between gap-6">
                  <span>{item.question}</span>
                  <span className="text-2xl font-light text-[var(--primary)] transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      </div>
    </section>
  );
}
