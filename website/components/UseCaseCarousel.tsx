"use client";

import { useRef } from "react";

type UseCaseItem = readonly [title: string, image: string];

type UseCaseCarouselProps = {
  items: readonly UseCaseItem[];
};

export function UseCaseCarousel({ items }: UseCaseCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCards(direction: "prev" | "next") {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>("[data-use-case-card]");
    const amount = firstCard ? firstCard.offsetWidth + 24 : 320;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  }

  return (
    <div className="relative">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="display-face text-4xl font-bold text-[var(--primary-deep)] md:text-5xl">
            Built for Everyone Who Loves the Water
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Whether you&apos;re working or playing, Tide Buoy provides the context you need to enjoy the coast safely.
          </p>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollByCards("prev")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--outline)] bg-white text-[var(--primary)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(10,37,64,0.08)]"
            aria-label="Previous use case"
          >
            <span aria-hidden="true" className="text-xl">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("next")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--outline)] bg-[var(--primary)] text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(10,37,64,0.12)]"
            aria-label="Next use case"
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
        {items.map(([title, image]) => (
          <div
            key={title}
            data-use-case-card
            className="group min-w-[78%] snap-center sm:min-w-[320px] lg:min-w-[340px]"
          >
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.75rem]">
              <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display-face text-2xl font-bold text-white">{title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
