"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { id: "s1", src: "/images/carousel/slide-1.jpg", title: "Slide one" },
  { id: "s2", src: "/images/carousel/slide-2.jpg", title: "Slide two" },
  { id: "s3", src: "/images/carousel/slide-3.jpg", title: "Slide three" },
];

export default function CarouselFeature() {
  const [i, setI] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  // ring animation timing
  const ringRef = React.useRef<SVGCircleElement | null>(null);

  // autoplay every 4.5s
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, [playing]);

  // Reset ring animation on index change
  React.useEffect(() => {
    if (!ringRef.current) return;
    const c = ringRef.current;
    c.style.transition = "none";
    c.style.strokeDashoffset = "282";
    // tick to trigger reflow
    requestAnimationFrame(() => {
      c.style.transition = "stroke-dashoffset 4.3s linear";
      c.style.strokeDashoffset = "0";
    });
  }, [i, playing]);

  return (
    <section className="relative">
      <div className="carousel-wrap">
        {/* Slides */}
        {SLIDES.map((s, idx) => (
          <div key={s.id} className="absolute inset-0">
            <Image
              src={s.src}
              alt={s.title}
              fill
              className={`object-cover transition-opacity duration-500 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Controls (bottom above card). Left: dots, middle: play/pause, right: arrows */}
        <div className="carousel-controls">
          {/* dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`dot ${idx === i ? "is-active" : ""}`}
              />
            ))}
          </div>

          {/* play / pause with progress ring */}
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((v) => !v)}
            className="play-btn text-white"
          >
            {playing ? (
              <span className="w-2 h-2 border-l-2 border-r-2 border-white inline-block" />
            ) : (
              <span className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent inline-block ml-[2px]" />
            )}
            <span className="play-ring" />
            {/* progress ring */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="transparent"
                strokeWidth="10"
                fill="none"
              />
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r="45"
                stroke="#fff"
                strokeWidth="10"
                fill="none"
                style={{
                  strokeDasharray: 282,
                  strokeDashoffset: 0,
                  transition: "stroke-dashoffset 4.3s linear",
                }}
              />
            </svg>
          </button>

          {/* arrows (pushed to right) */}
          <div className="ml-auto flex items-center gap-2">
            <button
              aria-label="Previous"
              className="arrow-box text-white"
              onClick={() =>
                setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)
              }
            >
              ←
            </button>
            <button
              aria-label="Next"
              className="arrow-box text-white"
              onClick={() => setI((v) => (v + 1) % SLIDES.length)}
            >
              →
            </button>
          </div>
        </div>

        {/* Bottom card (~ half of section’s height) */}
        <div
          className="carousel-card"
          style={{
            minHeight: "calc(67vh / 2)",
            maxHeight: 340,
            padding: "1.25rem 7rem 1.25rem 1.25rem",
          }}
        >
          <h3 className="text-2xl font-bold leading-snug">
            A headline for this slide goes here
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed max-w-[60ch]">
            Short supporting copy that sits on top of the image. This card spans
            nearly half the section height and leaves small gaps on the
            right/bottom as requested.
          </p>

          {/* Arrow box 64×64 at top-right corner of the card */}
          <Link
            href="/en/insights"
            aria-label="Open"
            className="group absolute top-0 right-0 w-16 h-16 grid place-items-center bg-black text-white transition-colors"
          >
            <span className="text-xl leading-none">→</span>
            <span className="pointer-events-none absolute inset-0 -z-10 bg-[var(--brand-orange)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
