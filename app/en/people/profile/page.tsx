// app/en/people/profile/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PEOPLE_BY_ID,
  PEOPLE,
  type DirectoryPerson,
} from "@/components/people/data";

/* --------------------------------------------------------------- */
/* Icons                                                           */
/* --------------------------------------------------------------- */
const MapPinIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      fill="currentColor"
    />
  </svg>
);
const LinkIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M10.6 13.4a4 4 0 010-5.6l2.8-2.8a4 4 0 115.6 5.6l-1.4 1.4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M13.4 10.6a4 4 0 010 5.6l-2.8 2.8a4 4 0 11-5.6-5.6l1.4-1.4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
const PrintIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path d="M6 9V3h12v6" fill="currentColor" />
    <rect x="6" y="13" width="12" height="8" fill="currentColor" />
    <rect
      x="3"
      y="9"
      width="18"
      height="6"
      rx="2"
      fill="currentColor"
      opacity=".2"
    />
  </svg>
);
const MailIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M4 6h16a2 2 0 0 1 2 2v.2l-10 6.25L2 8.2V8a2 2 0 0 1 2-2z"
      fill="currentColor"
    />
    <path
      d="M2 9.3V16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.3l-9.23 5.77a2 2 0 0 1-2.05 0L2 9.3z"
      fill="currentColor"
    />
  </svg>
);
const PhoneIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1 17 17 0 0 1-17-17 1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1L6.6 10.8z"
      fill="currentColor"
    />
  </svg>
);

/* --------------------------------------------------------------- */
/* Helpers                                                          */
/* --------------------------------------------------------------- */
function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-black text-white px-3 py-1.5 text-[12px] font-semibold rounded-sm mr-2 mb-2">
      {children}
    </span>
  );
}
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[96px]">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 text-[16px] md:text-[17px] leading-relaxed text-slate-900">
        {children}
      </div>
      <hr className="border-black/80 mt-10 mb-8" />
    </section>
  );
}

/* Sticky in-page nav */
function useActive(ids: string[]) {
  const [active, setActive] = React.useState(ids[0] || "");
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join("|")]);
  return active;
}
function PageNav({
  sections,
}: {
  sections: Array<{ id: string; label: string }>;
}) {
  const active = useActive(sections.map((s) => s.id));
  return (
    <nav className="sticky top-[88px] hidden lg:block">
      <div className="text-xs uppercase tracking-[.14em] text-gray-500 mb-3">
        On this page
      </div>
      <ul className="space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cls(
                "block px-3 py-2 rounded-md font-semibold transition",
                active === s.id ? "bg-black text-white" : "hover:bg-gray-100"
              )}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* Build a minimal vCard (works even without email/phone) */
function buildVCard(p: DirectoryPerson & { email?: string; phone?: string }) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${p.name}`,
    `TITLE:${p.title}`,
    p.email ? `EMAIL;TYPE=INTERNET:${p.email}` : "",
    p.phone ? `TEL;TYPE=WORK,VOICE:${p.phone}` : "",
    `ORG:Eversheds Sutherland`,
    p.office ? `ADR;TYPE=WORK:;;${p.office};;;;` : "",
    "END:VCARD",
  ].filter(Boolean);
  const blob = new Blob([lines.join("\n")], { type: "text/vcard" });
  return URL.createObjectURL(blob);
}

/* Contact card — shows email/phone if ever present; otherwise elegant fallback */
function ContactCard({
  person,
}: {
  person: DirectoryPerson & { email?: string; phone?: string };
}) {
  const [copied, setCopied] = React.useState(false);
  const vcf = React.useMemo(() => buildVCard(person), [person.id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const hasDirect = !!(person as any).email || !!(person as any).phone;

  return (
    <aside className="border-2 border-black p-5 bg-white">
      <h3 className="text-lg font-extrabold">Contact</h3>

      {hasDirect ? (
        <div className="mt-3 space-y-2">
          {(person as any).email && (
            <a
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-black text-white font-bold rounded-sm hover:opacity-90"
              href={`mailto:${(person as any).email}`}
            >
              <MailIcon /> Email
            </a>
          )}
          {(person as any).phone && (
            <a
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black font-bold rounded-sm hover:bg-gray-100"
              href={`tel:${String((person as any).phone).replace(/\s+/g, "")}`}
            >
              <PhoneIcon /> Call
            </a>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <Link
            href={`/en/contact?person=${encodeURIComponent(
              person.name
            )}&office=${encodeURIComponent(
              person.office
            )}&service=${encodeURIComponent(
              person.service
            )}&sector=${encodeURIComponent(person.sector)}`}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-black text-white font-bold rounded-sm hover:opacity-90"
          >
            Contact this person
          </Link>
          <p className="mt-2 text-sm text-slate-700">
            Your message routes to the right team with this profile attached.
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-2 px-3 py-2 border-2 border-black font-bold rounded-sm hover:bg-gray-100"
        >
          <LinkIcon /> {copied ? "Copied!" : "Copy profile link"}
        </button>
        <a
          href={vcf}
          download={`${person.name.replace(/\s+/g, "_")}.vcf`}
          className="inline-flex items-center gap-2 px-3 py-2 border-2 border-black font-bold rounded-sm hover:bg-gray-100"
        >
          Download vCard
        </a>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-3 py-2 border-2 border-black bg-black text-white font-bold rounded-sm hover:opacity-90"
        >
          <PrintIcon /> Print profile
        </button>
      </div>
    </aside>
  );
}

/* Pick related people (by service/sector/office) */
function getRelated(all: DirectoryPerson[], current: DirectoryPerson, max = 6) {
  const score = (p: DirectoryPerson) => {
    let s = 0;
    if (p.id === current.id) return -1;
    if (p.service === current.service && p.sector === current.sector) s += 4;
    else if (p.service === current.service) s += 3;
    else if (p.sector === current.sector) s += 2;
    if (p.office === current.office) s += 1;
    return s;
  };
  return [...all]
    .filter((p) => p.id !== current.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, max);
}

/* --------------------------------------------------------------- */
/* Page                                                             */
/* --------------------------------------------------------------- */
export default function ProfilePage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // Accept numeric ids "1"..."10"
  const idParam = (searchParams.id || PEOPLE[0].id).toString();
  const person: DirectoryPerson = PEOPLE_BY_ID[idParam] || PEOPLE[0];

  // Page sections
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "expertise", label: "Expertise" },
    { id: "related", label: "Related people" },
    { id: "explore", label: "Explore more" },
  ];

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.title,
    worksFor: { "@type": "Organization", name: "Eversheds Sutherland" },
    address: person.office
      ? { "@type": "PostalAddress", addressLocality: person.office }
      : undefined,
  };

  // Related
  const related = React.useMemo(
    () => getRelated(PEOPLE, person, 6),
    [person.id]
  );

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Thick top rule */}
      <hr className="border-black/80" />

      {/* Hero */}
      <div className="mx-auto max-w-[var(--page-max)] px-4 sm:px-6 py-10">
        {/* Breadcrumbs */}
        <div className="text-[12px] uppercase tracking-[.14em] text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/en/people" className="hover:underline">
            People
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{person.name}</span>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[380px,1fr,300px]">
          {/* Photo — portrait aspect, top-anchored to keep faces visible */}
          <div className="order-1">
            <div className="relative w-full aspect-[3/4] bg-gray-100 border-2 border-black overflow-hidden">
              <Image
                src={person.image || "/images/people/placeholder.jpg"}
                alt={person.name}
                fill
                sizes="(min-width:1280px) 380px, (min-width:1024px) 34vw, (min-width:640px) 50vw, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Core info */}
          <div className="order-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
              {person.name}
            </h1>
            <div className="mt-2 text-[18px] md:text-[19px] text-slate-800 font-semibold">
              {person.title}
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-[15px] md:text-[16px] text-slate-700">
              <MapPinIcon /> {person.office}
            </div>

            {/* Chips */}
            <div className="mt-6">
              <div className="mb-3">
                <div className="text-xs uppercase tracking-[.14em] text-gray-500 mb-2">
                  Sector
                </div>
                <Chip>{person.sector}</Chip>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[.14em] text-gray-500 mb-2">
                  Service
                </div>
                <Chip>{person.service}</Chip>
              </div>
            </div>
          </div>

          {/* Right rail: Contact + page nav */}
          <div className="order-3 space-y-4">
            <ContactCard
              person={
                person as DirectoryPerson & { email?: string; phone?: string }
              }
            />
            <PageNav sections={sections} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[var(--page-max)] px-4 sm:px-6 pb-14">
        {/* Overview */}
        <Section id="overview" title="Overview">
          <div className="bg-slate-50 border-2 border-black p-6">
            <p className="mb-3">
              {person.name} is {person.title} based in {person.office}.
            </p>
            <p className="mb-3">
              Their work spans the{" "}
              <strong className="font-extrabold">{person.sector}</strong> sector
              with a focus on{" "}
              <strong className="font-extrabold">{person.service}</strong>.
            </p>
            <p className="mb-0">
              They collaborate with cross-border teams at Eversheds Sutherland
              to deliver pragmatic, business-aligned advice.
            </p>
          </div>
        </Section>

        {/* Expertise */}
        <Section id="expertise" title="Expertise">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-black p-6 bg-white">
              <div className="text-xs uppercase tracking-[.14em] text-gray-600">
                Primary sector
              </div>
              <div className="mt-3 text-[16px] font-extrabold">
                {person.sector}
              </div>
              <p className="mt-2 text-slate-800">
                Advises organisations operating in the{" "}
                {person.sector.toLowerCase()} ecosystem.
              </p>
            </div>
            <div className="border-2 border-black p-6 bg-white">
              <div className="text-xs uppercase tracking-[.14em] text-gray-600">
                Core service
              </div>
              <div className="mt-3 text-[16px] font-extrabold">
                {person.service}
              </div>
              <p className="mt-2 text-slate-800">
                Focus on {person.service.toLowerCase()} matters with practical,
                outcome-driven advice.
              </p>
            </div>
            <div className="border-2 border-black p-6 bg-white">
              <div className="text-xs uppercase tracking-[.14em] text-gray-600">
                Office
              </div>
              <div className="mt-3 text-[16px] font-extrabold">
                {person.office}
              </div>
              <p className="mt-2 text-slate-800">
                Works closely with our {person.office} team and international
                network.
              </p>
            </div>
          </div>
        </Section>

        {/* Related people — FIXED images (portrait aspect + object-top) */}
        <Section id="related" title="Related people">
          {related.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <article
                  key={r.id}
                  className="border-2 border-black bg-white overflow-hidden"
                >
                  <div className="relative aspect-[3/4] bg-slate-100">
                    <Image
                      src={r.image || "/images/people/placeholder.jpg"}
                      alt={r.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold leading-tight">
                      {r.name}
                    </h3>
                    <div className="text-sm text-slate-700">{r.title}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {r.office}
                    </div>
                    <div className="mt-3 flex flex-wrap">
                      <Chip>{r.sector}</Chip>
                      <Chip>{r.service}</Chip>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={{
                          pathname: "/en/people/profile",
                          query: { id: r.id },
                        }}
                        className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 font-bold hover:bg-black hover:text-white transition"
                      >
                        View profile →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>No related people found.</p>
          )}
        </Section>

        {/* Explore more */}
        <Section id="explore" title="Explore more">
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href={`/en/people?sector=${encodeURIComponent(person.sector)}`}
              className="group border-2 border-black p-6 bg-white hover:bg-slate-50 transition block"
            >
              <div className="text-xs uppercase tracking-[.14em] text-gray-600">
                Sector
              </div>
              <div className="mt-2 text-[17px] font-extrabold underline-offset-4 group-hover:underline">
                More in {person.sector}
              </div>
              <p className="mt-2 text-slate-800">
                Browse our {person.sector.toLowerCase()} specialists.
              </p>
            </a>
            <a
              href={`/en/people?service=${encodeURIComponent(person.service)}`}
              className="group border-2 border-black p-6 bg-white hover:bg-slate-50 transition block"
            >
              <div className="text-xs uppercase tracking-[.14em] text-gray-600">
                Service
              </div>
              <div className="mt-2 text-[17px] font-extrabold underline-offset-4 group-hover:underline">
                More in {person.service}
              </div>
              <p className="mt-2 text-slate-800">
                Explore our {person.service.toLowerCase()} capabilities.
              </p>
            </a>
            <a
              href={`/en/people?office=${encodeURIComponent(person.office)}`}
              className="group border-2 border-black p-6 bg-white hover:bg-slate-50 transition block"
            >
              <div className="text-xs uppercase tracking-[.14em] text-gray-600">
                Office
              </div>
              <div className="mt-2 text-[17px] font-extrabold underline-offset-4 group-hover:underline">
                More in {person.office}
              </div>
              <p className="mt-2 text-slate-800">
                Meet the team in {person.office}.
              </p>
            </a>
          </div>
        </Section>

        {/* Back links */}
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/en/people"
            className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 font-extrabold hover:bg-black hover:text-white transition"
          >
            ← Back to People
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-black px-6 py-3 font-extrabold hover:bg-gray-100 transition"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Thick bottom rule */}
      <hr className="border-black/80" />
    </main>
  );
}
