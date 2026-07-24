"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export type Review = {
  name: string;
  place: string;
  text: string;
};

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const el = trackRef.current;
    if (!el) return;

    const id = window.setInterval(() => {
      const card = el.querySelector<HTMLElement>("[data-review-card]");
      if (!card) return;
      const step = card.offsetWidth + 16;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 4200);

    return () => window.clearInterval(id);
  }, [paused, reviews.length]);

  function scrollByCard(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    if (!card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="rounded-full border border-[var(--line)] bg-white p-2 text-ink transition hover:border-sea hover:text-sea"
          aria-label="Reseña anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="rounded-full border border-[var(--line)] bg-white p-2 text-ink transition hover:border-sea hover:text-sea"
          aria-label="Reseña siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <blockquote
            key={`${review.name}-${review.place}`}
            data-review-card
            className="flex w-[min(100%,320px)] shrink-0 snap-start flex-col rounded-3xl border border-[var(--line)] bg-white/90 p-6 shadow-[0_12px_30px_rgba(11,31,42,0.06)] sm:w-[340px]"
          >
            <div className="flex gap-0.5 text-[var(--sun)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-sun text-sun" />
              ))}
            </div>
            <p className="mt-4 flex-1 font-display text-xl leading-snug text-ink">“{review.text}”</p>
            <footer className="mt-6">
              <p className="font-semibold text-ink">{review.name}</p>
              <p className="text-sm text-ink-soft">{review.place}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
