"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { id: 1, src: "/images/hero/slide-1.jpg", title: "Supporting growth" },
  { id: 2, src: "/images/hero/slide-2.jpg", title: "Navigating change" },
  { id: 3, src: "/images/hero/slide-3.jpg", title: "Delivering results" },
];

export default function CarouselHero() {
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const timerRef = React.useRef<number | null>(null);

  const next = React.useCallback(
    () => setIdx((i) => (i + 1) % SLIDES.length),
    []
  );
  const prev = React.useCallback(
    () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  React.useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setTimeout(next, 4500);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [idx, playing, next]);

  return (
    <section className="relative w-full">
      <div className="relative h-[55vh] md:h-[67vh] min-h-[360px]">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 ${
              i === idx ? "opacity-100" : "opacity-0"
            } transition-opacity duration-600`}
          >
            <Image
              src={s.src}
              alt={s.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}

        {/* Controls (dots | play | arrows to the right) */}
        <div className="absolute left-4 right-4 md:left-6 md:right-6 bottom-[calc(164px+1rem)] flex items-center gap-6">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`dot ${i === idx ? "is-active" : ""}`}
              />
            ))}
          </div>

          {/* Play/Pause with ring */}
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            className="play-btn"
            title={playing ? "Pause" : "Play"}
          >
            <span className="play-ring" />
            {/* simple icon */}
            <span className="text-white text-sm">{playing ? "❚❚" : "▶"}</span>
          </button>

          {/* Spacer pushes arrows to far right */}
          <div className="flex-1" />

          {/* Arrows (right aligned) */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="arrow-box"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={next}
              className="arrow-box"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>

        {/* Bottom card (half height on phones visually) */}
        <div
          className="carousel-card max-w-[1200px] mx-auto px-6 py-5 md:px-8 md:py-6"
          style={{ height: 164 }}
        >
          <div className="text-xl md:text-2xl font-bold">
            Headline goes here
          </div>
          <p className="mt-1 text-sm md:text-base">
            Short supporting line describing the slide content and value.
          </p>

          {/* Arrow 64×64 inside card, top-right, orange fill on hover */}
          <Link
            href="/en/contact"
            className="group absolute top-0 right-0 w-16 h-16 grid place-items-center bg-black text-white"
            aria-label="Contact"
          >
            <span className="text-xl">→</span>
            <span className="pointer-events-none absolute inset-0 -z-10 bg-[var(--brand-orange)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
