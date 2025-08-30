// app/en/people/profile/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type Person = {
  id: string; // p1..p10
  name: string;
  title: string;
  office: string;
  email?: string;
  phone?: string;
  photo?: string; // will be set from id if not provided
  sectors?: string[];
  services?: string[];
  languages?: string[];
  admissions?: string[];
  education?: Array<{ school: string; degree?: string; year?: string }>;
  bio?: string[];
  experience?: string[];
  matters?: Array<{ title: string; summary: string; year?: string }>;
  publications?: Array<{ title: string; href?: string; date?: string }>;
  insights?: Array<{ title: string; href?: string; date?: string }>;
  recognition?: string[];
  memberships?: string[];
  linkedin?: string;
};

/* ------------------------------------------------------------------ */
/* Wire images to p1..p10 in /public/images/people                    */
/* ------------------------------------------------------------------ */
const IMG_EXT = "jpg" as const; // change to "png" / "webp" if your files differ
function imgSrcById(id?: string) {
  const k = (id ?? "p1").toLowerCase();
  const isValid = /^p(10|[1-9])$/.test(k);
  return isValid
    ? `/images/people/${k}.${IMG_EXT}`
    : `/images/people/p1.${IMG_EXT}`;
}

/* ------------------------------------------------------------------ */
/* Inline dataset (p1..p10) — plug-and-play now; replace later if needed */
/* ------------------------------------------------------------------ */
const PEOPLE: Record<string, Person> = {
  p1: {
    id: "p1",
    name: "Alexandra Morgan",
    title: "Partner, Corporate",
    office: "United Kingdom",
    email: "alexandra.morgan@firm.com",
    phone: "+44 20 7123 4567",
    sectors: ["Financial services", "Energy", "Technology"],
    services: ["M&A", "Private equity", "Corporate governance"],
    languages: ["English", "French"],
    admissions: ["England and Wales", "New York"],
    education: [
      {
        school: "London School of Economics",
        degree: "LLM, Corporate Law",
        year: "2012",
      },
      {
        school: "University of Oxford",
        degree: "BA (Jurisprudence)",
        year: "2010",
      },
    ],
    bio: [
      "Alexandra advises multinational corporates and PE sponsors on complex cross-border M&A, carve-outs and strategic joint ventures.",
      "She frequently coordinates multi-jurisdictional teams across Europe and the US.",
    ],
    experience: [
      "Lead counsel on €2.1bn cross-border acquisition of a European asset manager.",
      "Advised on carve-out and sale of EMEA payments business for a US technology company.",
      "Counsel to PE sponsor on platform build-up in energy services.",
    ],
    matters: [
      {
        title: "Acquisition of European asset manager",
        summary: "Multi-jurisdictional approvals and integration planning.",
      },
      {
        title: "EMEA payments carve-out",
        summary: "IP separation, TSAs and long-term partnership arrangements.",
      },
    ],
    publications: [
      {
        title: "Cross-border carve-outs: five lessons for 2025",
        href: "/en/info/cross-border-carve-outs",
        date: "2025-03-12",
      },
    ],
    recognition: [
      "Ranked: Corporate/M&A (Chambers UK)",
      "Recommended: High-value M&A (Legal 500)",
    ],
    memberships: [
      "International Bar Association",
      "City of London Law Society",
    ],
    linkedin: "https://www.linkedin.com/in/example",
  },
  p2: {
    id: "p2",
    name: "James Patel",
    title: "Senior Associate, Litigation",
    office: "United States",
    email: "james.patel@firm.com",
    phone: "+1 212 555 0188",
    sectors: ["Technology", "Consumer"],
    services: ["Commercial litigation", "Investigations"],
    languages: ["English", "Gujarati"],
    admissions: ["New York"],
    education: [
      { school: "Columbia Law School", degree: "JD", year: "2016" },
      { school: "UCLA", degree: "BA, Economics", year: "2013" },
    ],
    bio: [
      "James represents technology and consumer companies in complex disputes, internal investigations and class actions.",
    ],
    experience: [
      "Defense of a global tech company in multi-district consumer class action.",
      "Internal investigation into revenue recognition practices for a listed retailer.",
    ],
    matters: [
      {
        title: "MDL class action defense",
        summary: "Coordinated strategy across federal jurisdictions.",
      },
    ],
    publications: [
      {
        title: "ESG litigation risk: a US perspective",
        href: "/en/info/esg-litigation-us",
        date: "2024-09-02",
      },
    ],
  },
  p3: {
    id: "p3",
    name: "Sofia Martínez",
    title: "Counsel, Employment",
    office: "Spain",
    email: "sofia.martinez@firm.com",
    phone: "+34 91 555 0140",
    sectors: ["Healthcare", "Industrial"],
    services: ["Employment", "Data protection"],
    languages: ["Spanish", "English"],
    admissions: ["Spain"],
    education: [
      {
        school: "Universidad Complutense de Madrid",
        degree: "LLM, Employment Law",
        year: "2014",
      },
    ],
    bio: [
      "Sofia advises on workforce strategy, restructurings and cross-border mobility, with a focus on regulated industries.",
    ],
    experience: [
      "Pan-EU restructuring for a medical device manufacturer.",
      "Global mobility and immigration program for an industrial group.",
    ],
  },
  p4: {
    id: "p4",
    name: "Liam O’Connor",
    title: "Partner, Real Estate",
    office: "Ireland",
    email: "liam.oconnor@firm.com",
    phone: "+353 1 555 0100",
    sectors: ["Real estate", "Hospitality"],
    services: ["Real estate acquisitions", "Development"],
    languages: ["English"],
    admissions: ["Ireland"],
    education: [
      { school: "Trinity College Dublin", degree: "LLB", year: "2009" },
    ],
    bio: [
      "Liam leads on complex acquisitions, financing and development projects across Ireland and the UK.",
    ],
  },
  p5: {
    id: "p5",
    name: "Chen Wei",
    title: "Associate, IP/IT",
    office: "China",
    email: "chen.wei@firm.com",
    phone: "+86 10 5550 1200",
    sectors: ["Technology", "Media"],
    services: ["Intellectual property", "Commercial contracts"],
    languages: ["Mandarin", "English"],
    admissions: ["PRC"],
    education: [
      { school: "Peking University", degree: "LLM, IP Law", year: "2018" },
    ],
    bio: [
      "Chen advises on IP strategy, licensing and technology commercialization.",
    ],
  },
  p6: {
    id: "p6",
    name: "Amara Ndlovu",
    title: "Senior Associate, Finance",
    office: "South Africa",
    email: "amara.ndlovu@firm.com",
    phone: "+27 11 555 0100",
    sectors: ["Financial services", "Infrastructure"],
    services: ["Banking & Finance", "Project finance"],
    languages: ["English", "Zulu"],
    admissions: ["South Africa"],
    education: [
      { school: "University of Cape Town", degree: "LLB", year: "2015" },
    ],
    bio: [
      "Amara advises lenders and sponsors on cross-border finance and infrastructure deals.",
    ],
  },
  p7: {
    id: "p7",
    name: "Hiro Tanaka",
    title: "Counsel, Antitrust",
    office: "Japan",
    email: "hiro.tanaka@firm.com",
    phone: "+81 3 5550 8899",
    sectors: ["Industrial", "Automotive"],
    services: ["Antitrust/Competition", "Merger control"],
    languages: ["Japanese", "English"],
    admissions: ["Japan"],
    education: [{ school: "University of Tokyo", degree: "LLM", year: "2011" }],
    bio: [
      "Hiro advises on merger control, cartels and distribution strategies.",
    ],
  },
  p8: {
    id: "p8",
    name: "Isabella Rossi",
    title: "Partner, Tax",
    office: "Italy",
    email: "isabella.rossi@firm.com",
    phone: "+39 02 5550 3300",
    sectors: ["Private equity", "Luxury"],
    services: ["Corporate tax", "Transaction tax"],
    languages: ["Italian", "English"],
    admissions: ["Italy"],
    education: [
      { school: "Bocconi University", degree: "LLM, Tax", year: "2010" },
    ],
    bio: [
      "Isabella focuses on tax aspects of cross-border M&A and fund structures.",
    ],
  },
  p9: {
    id: "p9",
    name: "Ahmed Khan",
    title: "Partner, Energy",
    office: "United Arab Emirates",
    email: "ahmed.khan@firm.com",
    phone: "+971 4 555 2200",
    sectors: ["Energy", "Infrastructure"],
    services: ["Projects", "Regulatory"],
    languages: ["Arabic", "English"],
    admissions: ["UAE"],
    education: [
      { school: "American University of Sharjah", degree: "LLB", year: "2008" },
    ],
    bio: [
      "Ahmed advises sponsors and lenders on energy and infrastructure projects across MENA.",
    ],
  },
  p10: {
    id: "p10",
    name: "Emily Turner",
    title: "Associate, Data & Privacy",
    office: "Germany",
    email: "emily.turner@firm.com",
    phone: "+49 89 555 7700",
    sectors: ["Technology", "Healthcare"],
    services: ["Data protection", "Cybersecurity"],
    languages: ["German", "English"],
    admissions: ["Germany"],
    education: [{ school: "LMU Munich", degree: "LLM, IT Law", year: "2019" }],
    bio: [
      "Emily counsels on GDPR compliance, data strategy and incident response.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */
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
const MapPinIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      fill="currentColor"
    />
  </svg>
);
const DownloadIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M12 3v10m0 0l-4-4m4 4l4-4M4 17h16v2H4z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const LinkedinIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M6 9H3V21H6V9ZM4.5 3C3.7 3 3 3.7 3 4.5S3.7 6 4.5 6 6 5.3 6 4.5 5.3 3 4.5 3ZM21 21H18V14.5C18 12.8 17.2 12 16 12S14 12.8 14 14.5V21H11V9H14V10.5C14.6 9.5 15.9 9 17.2 9 19.7 9 21 10.7 21 13.3V21Z"
    />
  </svg>
);
const CopyIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M8 8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2z"
      fill="currentColor"
      opacity=".3"
    />
    <rect x="6" y="8" width="8" height="12" rx="2" ry="2" fill="currentColor" />
  </svg>
);
const CheckIcon = (p: any) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden {...p}>
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */
function buildVCard(p: Person) {
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
      <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-slate-800">
        {children}
      </div>
      <hr className="border-gray-200 my-8" />
    </section>
  );
}

/* Sticky in-page nav */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState<string>(ids[0] || "");
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
  const active = useActiveSection(sections.map((s) => s.id));
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
              className={`block px-2 py-1 rounded transition ${
                active === s.id ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* Contact CTAs */
function ContactActions({ person }: { person: Person }) {
  const [copied, setCopied] = React.useState<string | null>(null);
  const vcardUrl = React.useMemo(() => buildVCard(person), [person?.id]);

  const copy = async (text?: string, key?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key || text);
      setTimeout(() => setCopied(null), 1400);
    } catch {}
  };

  return (
    <div className="flex flex-wrap gap-2">
      {person.email && (
        <>
          <a
            href={`mailto:${person.email}`}
            className="inline-flex items-center gap-2 border border-black px-3 py-2 font-semibold hover:bg-black hover:text-white transition"
          >
            <MailIcon /> Email
          </a>
          <button
            onClick={() => copy(person.email, "email")}
            className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 font-semibold hover:bg-gray-100 transition"
            aria-label="Copy email"
          >
            {copied === "email" ? <CheckIcon /> : <CopyIcon />} Copy
          </button>
        </>
      )}
      {person.phone && (
        <>
          <a
            href={`tel:${person.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 border border-black px-3 py-2 font-semibold hover:bg-black hover:text-white transition"
          >
            <PhoneIcon /> Call
          </a>
          <button
            onClick={() => copy(person.phone, "phone")}
            className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 font-semibold hover:bg-gray-100 transition"
            aria-label="Copy phone"
          >
            {copied === "phone" ? <CheckIcon /> : <CopyIcon />} Copy
          </button>
        </>
      )}
      <a
        href={vcardUrl}
        download={`${person.name.replace(/\s+/g, "_")}.vcf`}
        className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 font-semibold hover:bg-gray-100 transition"
      >
        <DownloadIcon /> vCard
      </a>
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 font-semibold hover:bg-gray-100 transition"
        >
          <LinkedinIcon /> LinkedIn
        </a>
      )}
    </div>
  );
}

/* Chips */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-gray-300 px-2 py-1 text-[12px] rounded-sm mr-2 mb-2">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function ProfilePage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // Accept ?id=p1..p10 (case-insensitive). Default to p1.
  const idParam = (searchParams.id || "p1").toLowerCase();
  const safeId = /^p(10|[1-9])$/.test(idParam) ? idParam : "p1";

  // Lookup person; ensure photo wired to /images/people/pN.jpg
  const base = PEOPLE[safeId] || PEOPLE["p1"];
  const person: Person = {
    ...base,
    id: safeId,
    photo: imgSrcById(safeId),
  };

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    ...(person.matters?.length ? [{ id: "matters", label: "Matters" }] : []),
    ...(person.publications?.length || person.insights?.length
      ? [{ id: "publications", label: "Publications & insights" }]
      : []),
    { id: "credentials", label: "Credentials" },
    ...(person.recognition?.length
      ? [{ id: "recognition", label: "Recognition" }]
      : []),
    ...(person.memberships?.length
      ? [{ id: "memberships", label: "Memberships" }]
      : []),
  ];

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.title,
    worksFor: { "@type": "Organization", name: "Eversheds Sutherland" },
    email: person.email ? `mailto:${person.email}` : undefined,
    telephone: person.phone,
    address: person.office
      ? { "@type": "PostalAddress", addressLocality: person.office }
      : undefined,
  };

  return (
    <main className="bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top rule for rhythm */}
      <hr className="border-gray-200" />

      {/* Hero block */}
      <div className="mx-auto max-w-[var(--page-max)] px-4 sm:px-6 py-8">
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[320px,1fr,280px]">
          {/* Photo */}
          <div className="order-1">
            <div className="relative w-full aspect-[3/4] bg-gray-100">
              <Image
                src={person.photo || "/images/people/placeholder.jpg"}
                alt={person.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Core info */}
          <div className="order-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {person.name}
            </h1>
            <div className="mt-1 text-[17px] text-slate-700">
              {person.title}
            </div>
            <div className="mt-1 flex items-center gap-2 text-[14px] text-slate-600">
              <MapPinIcon /> {person.office}
            </div>

            <div className="mt-5">
              <ContactActions person={person} />
            </div>

            {/* Practice chips */}
            {(person.sectors?.length || person.services?.length) && (
              <div className="mt-6">
                {person.sectors?.length ? (
                  <div className="mb-2">
                    <div className="text-xs uppercase tracking-[.14em] text-gray-500 mb-1">
                      Sectors
                    </div>
                    {person.sectors.map((s) => (
                      <Chip key={`sec-${s}`}>{s}</Chip>
                    ))}
                  </div>
                ) : null}
                {person.services?.length ? (
                  <div>
                    <div className="text-xs uppercase tracking-[.14em] text-gray-500 mb-1">
                      Services
                    </div>
                    {person.services.map((s) => (
                      <Chip key={`srv-${s}`}>{s}</Chip>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Sticky page nav */}
          <div className="order-3">
            <PageNav sections={sections} />
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="mx-auto max-w-[var(--page-max)] px-4 sm:px-6 pb-12">
        <Section id="overview" title="Overview">
          {person.bio?.length ? (
            person.bio.map((p, i) => (
              <p key={i} className="mb-3">
                {p}
              </p>
            ))
          ) : (
            <p>No biography available.</p>
          )}
        </Section>

        <Section id="experience" title="Experience highlights">
          {person.experience?.length ? (
            <ul className="list-disc list-inside space-y-2">
              {person.experience.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          ) : (
            <p>No experience listed.</p>
          )}
        </Section>

        {person.matters?.length ? (
          <Section id="matters" title="Matters">
            <div className="grid md:grid-cols-2 gap-6">
              {person.matters.map((m, i) => (
                <article key={i} className="border border-gray-200 p-5">
                  <h3 className="text-lg font-semibold">{m.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-700">{m.summary}</p>
                  {m.year ? (
                    <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider">
                      {m.year}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {person.publications?.length || person.insights?.length ? (
          <Section id="publications" title="Publications & insights">
            <div className="grid md:grid-cols-2 gap-6">
              {person.publications?.map((p, i) => (
                <a
                  key={`pub-${i}`}
                  href={p.href || "#"}
                  className="group border border-gray-200 p-5 hover:bg-gray-50 transition"
                >
                  <div className="text-sm uppercase tracking-[.14em] text-gray-500">
                    {p.date ? new Date(p.date).toLocaleDateString() : "—"}
                  </div>
                  <div className="mt-1 font-semibold group-hover:underline">
                    {p.title}
                  </div>
                </a>
              ))}
              {person.insights?.map((p, i) => (
                <a
                  key={`ins-${i}`}
                  href={p.href || "#"}
                  className="group border border-gray-200 p-5 hover:bg-gray-50 transition"
                >
                  <div className="text-sm uppercase tracking-[.14em] text-gray-500">
                    {p.date ? new Date(p.date).toLocaleDateString() : "—"}
                  </div>
                  <div className="mt-1 font-semibold group-hover:underline">
                    {p.title}
                  </div>
                </a>
              ))}
            </div>
          </Section>
        ) : null}

        <Section id="credentials" title="Credentials">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[.14em] text-gray-500">
                Admissions
              </div>
              <ul className="mt-2 space-y-1">
                {person.admissions?.length ? (
                  person.admissions.map((a, i) => <li key={i}>{a}</li>)
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[.14em] text-gray-500">
                Education
              </div>
              <ul className="mt-2 space-y-2">
                {person.education?.length ? (
                  person.education.map((e, i) => (
                    <li key={i}>
                      <div className="font-medium">{e.school}</div>
                      <div className="text-[14px] text-slate-700">
                        {[e.degree, e.year].filter(Boolean).join(", ")}
                      </div>
                    </li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[.14em] text-gray-500">
                Languages
              </div>
              <ul className="mt-2 space-y-1">
                {person.languages?.length ? (
                  person.languages.map((l, i) => <li key={i}>{l}</li>)
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
          </div>
        </Section>

        {person.recognition?.length ? (
          <Section id="recognition" title="Recognition">
            <ul className="space-y-2 list-disc list-inside">
              {person.recognition.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {person.memberships?.length ? (
          <Section id="memberships" title="Memberships">
            <ul className="space-y-2 list-disc list-inside">
              {person.memberships.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Back links */}
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/en/people"
            className="inline-flex items-center gap-2 border border-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition"
          >
            ← Back to People
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
