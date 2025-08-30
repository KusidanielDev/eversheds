// components/Responsible.tsx
"use client";
import * as React from "react";

export default function Responsible() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="responsible-heading" className="bg-white">
      {/* spacer + rule to separate from the carousel */}
      <hr className="border-gray-300 mt-10 mb-8 md:mt-16 md:mb-10" />

      {/* ~30vh on mobile; ~50vh on md+; content centered */}
      <div
        ref={ref}
        className="
          min-h-[30vh] md:min-h-[50vh]
          flex flex-col items-center justify-center
          px-4 sm:px-6
        "
      >
        {/* Headline (centered, max 900px) */}
        <h2
          id="responsible-heading"
          className={`
            text-center text-black font-semibold leading-tight
            max-w-[900px] mx-auto
            text-[clamp(20px,4.4vw,3.2rem)]
            reveal-up ${inView ? "reveal-up--in" : ""}
          `}
        >
          At Eversheds Sutherland we put our commitment to responsible business
          at the heart of everything we do.
        </h2>

        {/* CTA */}
        <div className="mt-6 md:mt-8">
          <a
            href="/en/responsible-business"
            className="
              wipe-btn
              rounded-none
              border border-black
              px-8 py-4
              inline-flex items-center gap-3
              text-[0.95rem] sm:text-base font-semibold tracking-wide
              transition-colors
            "
          >
            <span>Find out more</span>
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
