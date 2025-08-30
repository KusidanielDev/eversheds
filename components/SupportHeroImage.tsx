// components/SupportHeroImage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Full-bleed image (~85vh) with a bottom-right card.
 * - Card is FLUSH to the bottom-right on mobile (bottom-0 right-0).
 * - On md+ it lifts off edges (bottom-16 right-16).
 * - Card is longer on phone; standard height on md+.
 * - Arrow square (64×64) inside the card at its top-right corner.
 * - Arrow hover effect only on desktop.
 */
export default function SupportHeroImage() {
  return (
    <section className="relative w-full pt-8 md:pt-12">
      {/* Background image */}
      <div className="relative w-full h-[85vh]">
        <Image
          src="/images/sections/support-hero.jpg" // replace with your real image
          alt="Clients working with Eversheds Sutherland"
          fill
          priority
          className="object-cover"
        />

        {/* Card — bottom-right corner on mobile; offset on md+ */}
        <div
          className="
            absolute
            bottom-0 right-0
            md:bottom-16 md:right-16
            w-[95vw] sm:w-[88vw] md:w-[885px]
            min-h-[220px] md:min-h-[164px]
            bg-white text-black
            border border-gray-300 shadow-md
            p-5 md:p-6 pr-24 md:pr-28   /* room for the arrow box */
          "
        >
          {/* Title + copy */}
          <h3 className="text-2xl font-bold leading-snug">
            Get the legal support your business needs
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed">
            From strategic advisory to day-to-day matters, our cross-border
            teams help you move fast, manage risk, and deliver results.
          </p>

          {/* Arrow square (64 × 64) INSIDE the card, top-right */}
          <Link
            href="/en/contact"
            aria-label="Contact us"
            className="
              group
              absolute top-0 right-0
              w-16 h-16 grid place-items-center
              bg-black text-white
              transition-colors
              md:hover:bg-[var(--brand-orange)]
            "
          >
            <span className="text-xl leading-none">→</span>
            {/* Orange fill sweep on hover (desktop only) */}
            <span
              className="
                pointer-events-none absolute inset-0 -z-10
                bg-[var(--brand-orange)]
                scale-x-0 origin-left
                transition-transform duration-300
                md:group-hover:scale-x-100
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
