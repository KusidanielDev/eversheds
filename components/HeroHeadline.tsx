"use client";
import * as React from "react";

/**
 * ~40vh hero. Desktop font ≈ 4.8rem, lighter weight (400), clean padding.
 * Mobile has extra side padding. Keeps wipe sequence across words.
 */
export default function HeroHeadline() {
  // wipe sequence across these markers:
  const ids = ["clients", "people", "communities", "thrive"];

  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(`wipe-${id}`));
    let t: number[] = [];
    // reset
    els.forEach((el) => el?.classList.remove("wipe2--final", "wipe2--run"));

    const run = (el: HTMLElement | null, delay: number) => {
      t.push(window.setTimeout(() => el?.classList.add("wipe2--run"), delay));
    };
    const holdFinal = (el: HTMLElement | null, delay: number) => {
      t.push(
        window.setTimeout(() => {
          // final highlight (stays)
          el?.classList.remove("wipe2--run");
          el?.classList.add("wipe2--final");
        }, delay)
      );
    };

    // timings
    run(els[0], 200);
    run(els[1], 1400);
    run(els[2], 2600);
    run(els[3], 3800); // arrive at thrive
    holdFinal(els[3], 5200);

    return () => {
      t.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="container-page" style={{ minHeight: "40vh" }}>
        <div className="pt-8 md:pt-10 pb-10 md:pb-12">
          <h1
            className="
              font-source font-normal
              leading-tight
              text-[2.3rem] sm:text-[3rem] lg:text-[4.8rem]
              tracking-[-.01em]
              max-w-[55vw] md:max-w-[55vw] w-full
            "
            style={{ lineHeight: 1.05 }}
          >
            <span>We’re helping our </span>
            <span className="wipe2" id="wipe-clients">
              clients
            </span>
            <span>, our </span>
            <span className="wipe2" id="wipe-people">
              people
            </span>
            <span> and our </span>
            <span className="wipe2" id="wipe-communities">
              communities
            </span>
            <span> to </span>
            <span className="wipe2" id="wipe-thrive">
              thrive
            </span>
            <span>.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
