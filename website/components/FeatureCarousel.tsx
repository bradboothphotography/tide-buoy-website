"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { featurePages } from "@/data/features";

export function FeatureCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCards(direction: "prev" | "next") {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = firstCard ? firstCard.offsetWidth + 24 : 360;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  }

  return (
    <div className="relative">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">Features</p>
          <h2 className="display-face mt-3 text-3xl font-bold text-[var(--primary-deep)] md:text-4xl">Inside Tide Buoy</h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">
            Swipe through the core features that make Tide Buoy feel fast, simple, and actually useful at the coast.
          </p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollByCards("prev")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--outline)] bg-white text-[var(--primary)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(10,37,64,0.08)]"
            aria-label="Previous feature"
          >
            <span aria-hidden="true" className="text-xl">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("next")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--outline)] bg-[var(--primary)] text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(10,37,64,0.12)]"
            aria-label="Next feature"
          >
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {featurePages.map((feature) => (
          <Link
            key={feature.slug}
            href={`/features/${feature.slug}`}
            data-carousel-card
            className="card-shadow min-w-[80%] snap-center overflow-hidden rounded-[1.75rem] border border-[var(--outline)] bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(10,37,64,0.1)] sm:min-w-[360px] lg:min-w-[390px]"
          >
            <div className="border-b border-[var(--outline)] bg-[var(--surface-soft)] p-4">
              <Image
                src={feature.screenshot}
                alt={`${feature.title} screenshot`}
                width={945}
                height={2048}
                unoptimized
                className="mx-auto h-auto max-h-[420px] w-auto rounded-[1.25rem]"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--primary)]">{feature.kicker}</p>
              <h3 className="display-face mt-3 text-xl font-bold text-[var(--primary-deep)]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{feature.shortDescription}</p>
              <p className="mt-5 text-sm font-semibold text-[var(--primary)]">Open feature page</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
