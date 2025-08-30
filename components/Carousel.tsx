"use client";

import React from "react";
import Image from "next/image";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type Slide = {
  src: string;
  alt?: string;
  title: string;
  content: string;
  href?: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

export default function Carousel({ slides, intervalMs = 8000 }: Props) {
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  const rootRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-advance
  React.useEffect(() => {
    if (!playing || slides.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [playing, slides.length, intervalMs]);

  // Progress ring animation (smooth)
  React.useEffect(() => {
    if (!playing) return;
    let start: number | null = null;
    let raf = 0;

    const loop = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(1, (elapsed % intervalMs) / intervalMs);
      setProgress(pct);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, intervalMs]);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);
  const goto = (i: number) => setIndex(i);
  const togglePlay = () => setPlaying((p) => !p);

  return (
    <section ref={rootRef} className="relative bg-white">
      {/* Stage */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={cx(
              "absolute inset-0 transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={s.src}
              alt={s.alt ?? ""}
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}

        {/* Controls + card */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <div className="flex justify-end md:mr-12">
            <div className="relative w-[95vw] sm:w-[85vw] md:w-[885.5px]">
              {/* Controls row */}
              <div className="pointer-events-auto absolute -top-[56px] left-0 right-0 flex items-center">
                {/* indicators */}
                <div className="flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => goto(i)}
                      className={cx(
                        "w-[12px] h-[12px] border border-white/90",
                        i === index ? "bg-white" : "bg-transparent"
                      )}
                    />
                  ))}
                </div>

                {/* play/pause in the center of ring */}
                <button
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={togglePlay}
                  className="relative ml-4 flex items-center justify-center w-12 h-12 rounded-full text-white"
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="absolute inset-0"
                    width={48}
                    height={48}
                    aria-hidden
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 20}
                      strokeDashoffset={(1 - progress) * (2 * Math.PI * 20)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="relative">
                    {playing ? (
                      <span className="inline-flex gap-[4px] items-center">
                        <span className="block w-[4px] h-[16px] bg-white" />
                        <span className="block w-[4px] h-[16px] bg-white" />
                      </span>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="white"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* arrows at far right, bigger + white */}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    aria-label="Previous"
                    onClick={() => go(-1)}
                    className="w-12 h-12 grid place-items-center border border-white/90 text-white"
                  >
                    <span aria-hidden>←</span>
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => go(1)}
                    className="w-12 h-12 grid place-items-center border border-white/90 text-white"
                  >
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>

              {/* Info card (taller) */}
              <div
                className="pointer-events-auto relative bg-white text-black shadow-md w-[95vw] sm:w-[85vw] md:w-[885.5px]"
                style={{ height: "260px" }}
              >
                <div className="p-5 md:p-6 pr-20 md:pr-[96px]">
                  <h3 className="text-2xl font-bold leading-snug">
                    {slides[index].title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
                    {slides[index].content}
                  </p>
                </div>
                <a
                  href={slides[index].href ?? "#"}
                  className="absolute top-0 right-0 w-16 h-16 grid place-items-center bg-black hover:bg-[var(--brand-orange)] transition-colors"
                  aria-label="Open"
                >
                  <span className="text-white text-2xl leading-none">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
