// components/Hero.tsx
"use client";
import * as React from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * HERO (merged)
 * - Mobile: ~40vh, bigger text, less white space
 * - Desktop: ~73vh minus 72px header, slight upward pull, left-nudged
 * - EXACTLY 3 lines on lg+ (no mid-line wrap)
 *   1) We’re helping our clients,
 *   2) our people and our
 *   3) communities to thrive.
 * - Wipe animation: clients → people → communities → thrive (stays on thrive)
 */
export default function Hero() {
  const [active, setActive] = React.useState<
    "clients" | "people" | "communities" | "thrive" | null
  >(null);

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      setActive("thrive");
      return;
    }
    const seq: Array<typeof active> = [
      "clients",
      "people",
      "communities",
      "thrive",
    ];
    let i = 0;
    const timers: number[] = [];
    const step = () => {
      setActive(seq[i]);
      if (i < seq.length - 1) {
        i++;
        timers.push(window.setTimeout(step, 1200)); // pacing like your original
      }
    };
    timers.push(window.setTimeout(step, 400)); // slight delay before first wipe
    return () => timers.forEach(clearTimeout);
  }, []);

  const Wipe: React.FC<{
    when: "clients" | "people" | "communities" | "thrive";
    final?: boolean;
    children: React.ReactNode;
  }> = ({ when, final = false, children }) => {
    const run = active === when;
    const cls = ["wipe2"];
    // Support either CSS variant: wipe2--active (my patch) or wipe2--run (your original)
    if (run) cls.push("wipe2--active", "wipe2--run");
    if (final) cls.push("wipe2--final");
    return <span className={cls.join(" ")}>{children}</span>;
  };

  return (
    <section className="bg-white px-4 md:px-0">
      {/* Mobile: ~40vh. Desktop: original height with slight lift */}
      <div className="flex items-center min-h-[40vh] md:min-h-[calc(73vh-72px)] md:-mt-[1.3rem]">
        <div
          className={`
            headline-museo font-bold text-black relative mx-auto
            /* fluid widths; ~55vw at lg for 3-line lock */
            w-[92vw] sm:w-[80vw] md:w-[62vw] lg:w-[55vw]
            /* nudge left on larger screens */
            -translate-x-[1.2vw] md:-translate-x-[1.8vw] lg:-translate-x-[2.2vw]
          `}
          aria-label="We’re helping our clients, our people and our communities to thrive."
        >
          {/* Typography:
              - Mobile: larger vw for bold, impactful type with less white space
              - md+: clamp that guarantees desktop 3-line behavior
          */}
          <div className="text-left leading-[1.08] sm:leading-[1.06] md:leading-[1.08]">
            <p
              className="
                text-[10.4vw] sm:text-[8.6vw] md:text-[clamp(28px,6.7vw,72px)]
                block lg:whitespace-nowrap
              "
            >
              We’re helping our <Wipe when="clients">clients</Wipe>,
            </p>
            <p
              className="
                text-[10.4vw] sm:text-[8.6vw] md:text-[clamp(28px,6.7vw,72px)]
                block lg:whitespace-nowrap
              "
            >
              our <Wipe when="people">people</Wipe> and our
            </p>
            <p
              className="
                text-[10.4vw] sm:text-[8.6vw] md:text-[clamp(28px,6.7vw,72px)]
                block lg:whitespace-nowrap
              "
            >
              <Wipe when="communities">communities</Wipe> to{" "}
              <Wipe when="thrive" final>
                thrive
              </Wipe>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
