"use client";
import * as React from "react";
import Link from "next/link";
import { Caret, Globe, Pin, SearchIcon } from "./ui/Icons";
import { overlay, OverlayKey } from "@/lib/overlay/OverlayManager";
import { useEventListener } from "@/hooks/useEventListener";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cx } from "@/lib/utils";

/** slug helper for /en/info/[slug] */
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const info = (label: string) => `/en/info/${toSlug(label)}`;

/**
 * Header
 * - Desktop: fixed sideways brand rail (links to "/"), dropdowns open over content (high z)
 * - Mobile: thick bottom border, square menu button (no top border), brand text 2 lines (links to "/")
 * - Mobile drawer slides from RIGHT -> LEFT
 * - All links (except People) route to /en/info/[slug]
 */
export default function SiteHeader() {
  const [open, setOpen] = React.useState<OverlayKey>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const unsub = overlay.subscribe(setOpen);
    return () => unsub();
  }, []);

  useEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") {
        overlay.close();
        setMobileOpen(false);
      }
    },
    [setOpen]
  );

  // DESKTOP: label offsets → panels start at clicked label and extend to right
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const capRef = React.useRef<HTMLButtonElement | null>(null);
  const resRef = React.useRef<HTMLButtonElement | null>(null);
  const aboutRef = React.useRef<HTMLButtonElement | null>(null);
  const careersRef = React.useRef<HTMLButtonElement | null>(null);

  const [capLeft, setCapLeft] = React.useState(0);
  const [resLeft, setResLeft] = React.useState(0);
  const [aboutLeft, setAboutLeft] = React.useState(0);
  const [careersLeft, setCareersLeft] = React.useState(0);

  const measure = React.useCallback(() => {
    const nav = navRef.current?.getBoundingClientRect();
    const offset = (el: HTMLElement | null) => {
      if (!el || !nav) return 0;
      const r = el.getBoundingClientRect();
      return Math.max(0, r.left - nav.left);
    };
    setCapLeft(offset(capRef.current));
    setResLeft(offset(resRef.current));
    setAboutLeft(offset(aboutRef.current));
    setCareersLeft(offset(careersRef.current));
  }, []);

  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const trapRef = useFocusTrap<HTMLDivElement>(() => overlay.close());

  const item =
    "px-3 py-2 text-[13px] md:text-[14px] font-semibold uppercase tracking-[.04em] text-black rounded transition hover:bg-[var(--brand-orange)] hover:text-white";
  const activeItem = "bg-[var(--panel-bg)] text-white";

  // Re-usable lists for menus
  const capabilities = ["Services", "Sectors", "Solutions"];
  const resources = ["Insights", "Publications", "Events", "News"];
  const aboutList = [
    "About us",
    "Purpose and values",
    "Responsible business",
    "Community",
    "Diversity and Inclusion",
    "Environmental sustainability",
    "Pro bono",
    "Reports",
    "Alumni",
    "News",
  ];
  const careersList = [
    "UK Careers",
    "Applications",
    "Why us?",
    "Lawyers and partners",
    "Business professionals",
    "Students and recent graduates",
    "Apprenticeships",
    "Students",
    "Graduates",
    "Recruitment process",
    "Events",
    "Student and graduate applications",
  ];
  const regions = [
    "Angola",
    "Asia",
    "Austria",
    "Belgium",
    "Bulgaria",
    "Czech Republic",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Hungary",
    "Iraq",
    "Ireland",
    "Italy",
    "Jordan",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Mauritius",
    "Mozambique",
    "Netherlands",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Saudi Arabia",
    "Slovakia",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland",
    "Tunisia",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Rest of the world",
  ];
  const languages = [
    "Cestina",
    "Deutsch",
    "Dutch",
    "Eesti",
    "English",
    "Español",
    "Français",
    "Italiano",
    "Latviešu",
    "Lietuvių",
    "Magyar",
    "Polski",
    "Português",
    "Slovencina",
    "Suomi",
    "български",
  ];

  return (
    <header className="sticky top-0 z-[1300] bg-white">
      {/* ======== BRAND RAIL (desktop only): now a link to "/" ======== */}
      <div
        className="hidden md:block fixed top-0 left-0 z-[1400] p-2"
        style={{ marginTop: "5.5rem", marginLeft: "-2rem" }}
      >
        <div className="flex items-start">
          <Link
            href="/"
            className="brand-chip font-source text-[32px] leading-[1.05] tracking-[0.12em] uppercase"
            style={{ whiteSpace: "nowrap", transform: "rotate(-90deg)" }}
          >
            <span className="block">EVERSHEDS</span>
            <span className="block">SUTHERLAND</span>
          </Link>
        </div>
      </div>

      {/* ======== MOBILE HEADER ======== */}
      <div className="md:hidden">
        {/* Grey box lines: no top border; strong bottom border */}
        <div className="border-x border-b-2 border-gray-400">
          <div className="relative h-[72px]">
            {/* Brand text now links to "/" */}
            <Link href="/" className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="font-source text-[14px] leading-[1.05] tracking-[0.12em] uppercase">
                <span className="block">EVERSHEDS</span>
                <span className="block">SUTHERLAND</span>
              </div>
            </Link>

            {/* Menu button: square, merges with border via left border only */}
            <button
              type="button"
              aria-label="Open site menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="absolute right-0 top-0 h-full aspect-square grid place-items-center border-l border-gray-400"
            >
              {/* Burger → X */}
              <span className="sr-only">Toggle menu</span>
              <div className="w-6 h-4 relative">
                <span
                  className={cx(
                    "absolute inset-x-0 top-0 h-[2px] bg-black transition-transform",
                    mobileOpen && "translate-y-[6px] rotate-45"
                  )}
                />
                <span
                  className={cx(
                    "absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-black transition-opacity",
                    mobileOpen && "opacity-0"
                  )}
                />
                <span
                  className={cx(
                    "absolute inset-x-0 bottom-0 h-[2px] bg-black transition-transform",
                    mobileOpen && "-translate-y-[6px] -rotate-45"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Slide-in panel under the header (RIGHT -> LEFT) */}
        <div
          className={cx(
            "fixed left-0 right-0 bottom-0 top-[72px] z-[1050] bg-[var(--panel-bg)] text-white",
            "transform transition-transform duration-300 will-change-transform",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="h-full overflow-y-auto">
            <ul className="p-5 space-y-3 text-[15px] font-semibold uppercase">
              <li>
                <Link href="/en/people" onClick={() => setMobileOpen(false)}>
                  People
                </Link>
              </li>

              {/* Capabilities (dropdown) */}
              <li>
                <details>
                  <summary className="cursor-pointer">Capabilities</summary>
                  <div className="mt-2 ml-3 space-y-2 normal-case">
                    {capabilities.map((l) => (
                      <Link
                        key={l}
                        href={info(l)}
                        onClick={() => setMobileOpen(false)}
                        className="block"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </details>
              </li>

              {/* Resources (dropdown) */}
              <li>
                <details>
                  <summary className="cursor-pointer">Resources</summary>
                  <div className="mt-2 ml-3 space-y-2 normal-case">
                    {resources.map((l) => (
                      <Link
                        key={l}
                        href={info(l)}
                        onClick={() => setMobileOpen(false)}
                        className="block"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </details>
              </li>

              {/* About (dropdown) */}
              <li>
                <details>
                  <summary className="cursor-pointer">About</summary>
                  <div className="mt-2 ml-3 space-y-2 normal-case">
                    {aboutList.map((l) => (
                      <Link
                        key={l}
                        href={info(l)}
                        onClick={() => setMobileOpen(false)}
                        className="block"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </details>
              </li>

              {/* Careers (dropdown) */}
              <li>
                <details>
                  <summary className="cursor-pointer">Careers</summary>
                  <div className="mt-2 ml-3 space-y-2 normal-case">
                    {careersList.map((l) => (
                      <Link
                        key={l}
                        href={info(l)}
                        onClick={() => setMobileOpen(false)}
                        className="block"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </details>
              </li>

              {/* Offices */}
              <li>
                <Link
                  href={info("Offices")}
                  onClick={() => setMobileOpen(false)}
                >
                  Offices
                </Link>
              </li>

              {/* Region */}
              <li>
                <details>
                  <summary className="cursor-pointer">Region</summary>
                  <div className="mt-2 ml-3 grid grid-cols-2 gap-2 normal-case">
                    {regions.map((r) => (
                      <Link
                        key={r}
                        href={info(`Region ${r}`)}
                        onClick={() => setMobileOpen(false)}
                        className="block"
                      >
                        {r}
                      </Link>
                    ))}
                  </div>
                </details>
              </li>

              {/* Language */}
              <li>
                <details>
                  <summary className="cursor-pointer">Language</summary>
                  <div className="mt-2 ml-3 grid grid-cols-2 gap-2 normal-case">
                    {languages.map((l) => (
                      <Link
                        key={l}
                        href={info(`Language ${l}`)}
                        onClick={() => setMobileOpen(false)}
                        className="block"
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </details>
              </li>

              {/* Search */}
              <li className="pt-2 border-t border-white/20 normal-case text-sm text-white/90">
                <Link
                  href={info("Search")}
                  onClick={() => setMobileOpen(false)}
                >
                  Search
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* ======== DESKTOP NAV ROW (right-aligned) ======== */}
      <div className="hidden md:block">
        <div
          ref={navRef}
          className="w-full h-[72px] flex items-center justify-end gap-1.5 pr-6"
        >
          <Link href="/en/people" className={item}>
            PEOPLE
          </Link>

          <button
            ref={capRef}
            onClick={() => overlay.toggle("capabilities")}
            className={cx(
              item,
              open === "capabilities" && activeItem,
              "flex items-center gap-1"
            )}
            aria-expanded={open === "capabilities"}
          >
            CAPABILITIES <Caret open={open === "capabilities"} />
          </button>

          <button
            ref={resRef}
            onClick={() => overlay.toggle("resources")}
            className={cx(
              item,
              open === "resources" && activeItem,
              "flex items-center gap-1"
            )}
            aria-expanded={open === "resources"}
          >
            RESOURCES <Caret open={open === "resources"} />
          </button>

          <button
            ref={aboutRef}
            onClick={() => overlay.toggle("about")}
            className={cx(
              item,
              open === "about" && activeItem,
              "flex items-center gap-1"
            )}
            aria-expanded={open === "about"}
          >
            ABOUT <Caret open={open === "about"} />
          </button>

          <button
            ref={careersRef}
            onClick={() => overlay.toggle("careers")}
            className={cx(
              item,
              open === "careers" && activeItem,
              "flex items-center gap-1"
            )}
            aria-expanded={open === "careers"}
          >
            CAREERS <Caret open={open === "careers"} />
          </button>

          <Link href={info("Offices")} className={item}>
            OFFICES
          </Link>

          <button
            onClick={() => overlay.toggle("region")}
            className={cx(
              item,
              open === "region" && activeItem,
              "flex items-center gap-1"
            )}
            aria-expanded={open === "region"}
          >
            <Pin /> <span className="ml-1">UNITED KINGDOM</span>{" "}
            <Caret open={open === "region"} />
          </button>

          <button
            onClick={() => overlay.toggle("language")}
            className={cx(
              item,
              open === "language" && activeItem,
              "flex items-center gap-1"
            )}
            aria-expanded={open === "language"}
          >
            <Globe /> <span>EN</span> <Caret open={open === "language"} />
          </button>

          <Link
            href={info("Search")}
            aria-label="Search"
            className="p-2 text-black hover:text-[var(--brand-orange)]"
          >
            <SearchIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* PANELS — high z-index to overlay everything beneath */}
        {open && (
          <div
            className="absolute left-0 right-0 top-[72px] z-[500]"
            ref={trapRef}
          >
            {open === "capabilities" && (
              <div
                className="panel absolute"
                style={{ left: capLeft, right: 0 }}
              >
                <div className="p-6 pt-8">
                  <div className="text-sm text-gray-300 mb-4">
                    In this section you can find
                  </div>
                  <div className="flex items-center justify-between gap-8">
                    <Link
                      href={info("Services")}
                      className="group text-base font-semibold flex-1"
                    >
                      Services
                      <span className="inline-flex items-center gap-2 float-right mr-10 opacity-80 group-hover:translate-x-1 transition">
                        &rarr;
                      </span>
                    </Link>
                    <Link
                      href={info("Industries")}
                      className="group text-base font-semibold flex-1"
                    >
                      Industries
                      <span className="inline-flex items-center gap-2 float-right mr-10 opacity-80 group-hover:translate-x-1 transition">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {open === "resources" && (
              <div
                className="panel absolute"
                style={{ left: resLeft, right: 0 }}
              >
                <div className="p-6 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <Link className="hover:underline" href={info("Insights")}>
                    Insights
                  </Link>
                  <Link className="hover:underline" href={info("Events")}>
                    Events &amp; training
                  </Link>
                  <Link className="hover:underline" href={info("Client tools")}>
                    Client tools
                  </Link>
                  <Link
                    className="hover:underline"
                    href={info("Business topics")}
                  >
                    Business topics
                  </Link>
                </div>
              </div>
            )}

            {open === "about" && (
              <div
                className="panel absolute h-[70vh] overflow-auto"
                style={{ left: aboutLeft, right: 0 }}
              >
                <div className="p-6 pt-8 grid grid-cols-2 gap-4 text-base">
                  {aboutList.map((l, i) => (
                    <Link key={i} className="hover:underline" href={info(l)}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {open === "careers" && (
              <div
                className="panel absolute h-[74vh] overflow-auto"
                style={{ left: careersLeft, right: 0 }}
              >
                <div className="p-6 pt-8 grid grid-cols-2 gap-3 text-base">
                  {careersList.map((l, i) => (
                    <Link key={l} className="hover:underline" href={info(l)}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* REGION OVERLAY */}
      {open === "region" && (
        <div
          className="fixed inset-0 z-[600]"
          style={{ top: "72px" }}
          onClick={() => overlay.close()}
        >
          <div
            className="overlay h-[calc(100vh-72px-5vh)] p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => overlay.close()}
              className="absolute top-2 right-3 p-2 leading-none"
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-sm uppercase tracking-wide flex items-center gap-2">
              🌐 VISIT GLOBAL SITE
            </div>
            <hr className="border-gray-600 my-3" />
            <div className="text-2xl font-bold">
              Select a local version of the site
            </div>
            <hr className="border-gray-600 my-3" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {regions.map((c) => (
                <Link key={c} href={info(`Region ${c}`)} className="group">
                  <div className="pb-1 group-hover:text-yellow-400">{c}</div>
                  <hr className="border-gray-600 group-hover:border-yellow-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE OVERLAY */}
      {open === "language" && (
        <div
          className="fixed inset-0 z-[600]"
          style={{ top: "72px" }}
          onClick={() => overlay.close()}
        >
          <div
            className="overlay h-[40vh] p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => overlay.close()}
              className="absolute top-2 right-3 p-2 leading-none"
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-2xl font-bold">Select language</div>
            <hr className="border-gray-600 my-3" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {languages.map((l) => (
                <Link key={l} href={info(`Language ${l}`)} className="group">
                  <div className="pb-1 group-hover:text-yellow-400">{l}</div>
                  <hr className="border-gray-600 group-hover:border-yellow-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
