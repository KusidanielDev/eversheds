// components/StickyBottomSearch.tsx
"use client";

import Link from "next/link";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10.5 3a7.5 7.5 0 0 1 5.93 12.19l4.19 4.19-1.41 1.41-4.19-4.19A7.5 7.5 0 1 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Fixed bottom bar — full width, ~10vh height, brand orange.
 * Thin white border top & bottom. Click anywhere to go to /en/search.
 */
export default function StickyBottomSearch() {
  return (
    <Link
      href="/en/search"
      aria-label="How can we help you today?"
      className="
        fixed left-0 right-0 bottom-0
        h-[10vh] min-h-[56px]
        bg-[var(--brand-orange)] text-white
        border-y border-white/70
        z-[999]
      "
    >
      <div
        className="
          h-full max-w-screen-2xl mx-auto
          flex items-center gap-3
          pl-5 pr-4
          text-[16px] sm:text-[17px] font-semibold
        "
      >
        <SearchIcon />
        <span className="whitespace-nowrap">
          How can we help you today?
          <span className="es-caret" />
        </span>
      </div>
    </Link>
  );
}
