"use client";
import * as React from "react";

const WORDS = ["clients,", "people", "communities", "thrive."]; // we wipe these in order

export default function HeroFiveLine() {
  const [step, setStep] = React.useState<number>(-1); // -1 = idle → then 0..3

  React.useEffect(() => {
    // sequence: clients → people → communities → thrive (and stay on thrive)
    const t1 = setTimeout(() => setStep(0), 300);
    const t2 = setTimeout(() => setStep(1), 1800);
    const t3 = setTimeout(() => setStep(2), 3300);
    const t4 = setTimeout(() => setStep(3), 4800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const wipeClass = (i: number) =>
    `wipe2 ${step === i ? "wipe2--run" : step > i ? "wipe2--final" : ""}`;

  return (
    <section className="bg-white">
      <div className="container-page" style={{ minHeight: "50vh" }}>
        <div className="pt-10 md:pt-12" />
        <h1
          className="headline-museo font-normal text-black leading-[1.05]"
          style={{ fontSize: "5.28vw", maxWidth: "55vw" }}
        >
          We’re helping our
          <br />
          <span className={wipeClass(0)}>clients,</span> our
          <br />
          <span className={wipeClass(1)}>people</span> and our
          <br />
          <span className={wipeClass(2)}>communities</span> to
          <br />
          <span className={wipeClass(3)}>thrive.</span>
        </h1>
        <div className="pb-6 md:pb-10" />
      </div>
    </section>
  );
}
