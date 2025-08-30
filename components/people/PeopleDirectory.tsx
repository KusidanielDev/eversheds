// components/people/PeopleDirectory.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PEOPLE,
  ALL_OFFICES,
  ALL_SECTORS,
  ALL_SERVICES,
  type DirectoryPerson,
} from "@/components/people/data";

// ---------- Utils ----------
function setParam(
  router: ReturnType<typeof useRouter>,
  sp: URLSearchParams,
  key: string,
  value: string | null
) {
  const next = new URLSearchParams(sp.toString());
  if (value && value.length) next.set(key, value);
  else next.delete(key);
  next.delete("page"); // reset pagination when changing filters
  router.push(`/en/people?${next.toString()}`);
}
function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// ---------- Main ----------
export default function PeopleDirectory(props: {
  office: string;
  q: string;
  sector: string;
  service: string;
  letter: string;
  page: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [qInput, setQInput] = React.useState(props.q);

  // Filter pipeline (client-side for demo; swap with server search in prod)
  const filtered = PEOPLE.filter((p) => {
    if (props.office && p.office !== props.office) return false;
    if (props.sector && p.sector !== props.sector) return false;
    if (props.service && p.service !== props.service) return false;
    if (props.letter && p.name[0].toUpperCase() !== props.letter) return false;
    if (
      props.q &&
      !`${p.name} ${p.title}`.toLowerCase().includes(props.q.toLowerCase())
    )
      return false;
    return true;
  });

  // Pagination
  const pageSize = 12;
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, props.page), pages);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  const clearChip = (key: "office" | "sector" | "service" | "letter" | "q") => {
    setParam(router, searchParams, key, null);
  };

  return (
    <section className="border-t">
      {/* Filters */}
      <div className="container-page py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left rail / filter form */}
          <aside className="w-full lg:w-[300px] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setParam(router, searchParams, "q", qInput);
              }}
              className="space-y-6"
            >
              {/* Office */}
              <div>
                <label
                  htmlFor="office"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Location (office)
                </label>
                <select
                  id="office"
                  className="mt-1 w-full border rounded-md px-3 py-2"
                  value={props.office}
                  onChange={(e) =>
                    setParam(router, searchParams, "office", e.target.value)
                  }
                >
                  {ALL_OFFICES.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service (capabilities) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Capabilities
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {ALL_SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setParam(
                          router,
                          searchParams,
                          "service",
                          props.service === s ? "" : s
                        )
                      }
                      className={cls(
                        "px-2.5 py-1.5 border rounded text-sm",
                        props.service === s
                          ? "bg-black text-white"
                          : "hover:bg-slate-100"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Sectors
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {ALL_SECTORS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setParam(
                          router,
                          searchParams,
                          "sector",
                          props.sector === s ? "" : s
                        )
                      }
                      className={cls(
                        "px-2.5 py-1.5 border rounded text-sm",
                        props.sector === s
                          ? "bg-black text-white"
                          : "hover:bg-slate-100"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div>
                <label
                  htmlFor="q"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  Search people
                </label>
                <div className="mt-1 flex">
                  <input
                    id="q"
                    value={qInput}
                    onChange={(e) => setQInput(e.target.value)}
                    className="w-full border rounded-l-md px-3 py-2"
                    placeholder="Name, title…"
                  />
                  <button
                    className="px-4 py-2 bg-[var(--brand-orange)] text-white rounded-r-md"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* A–Z quick filter */}
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                People A–Z
              </div>
              <div className="flex flex-wrap gap-1">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((L) => (
                  <button
                    key={L}
                    type="button"
                    onClick={() =>
                      setParam(
                        router,
                        searchParams,
                        "letter",
                        props.letter === L ? "" : L
                      )
                    }
                    className={cls(
                      "w-7 h-7 grid place-items-center border rounded text-xs",
                      props.letter === L
                        ? "bg-black text-white"
                        : "hover:bg-slate-100"
                    )}
                  >
                    {L}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Active chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {props.office && (
                <Chip
                  label={`Office: ${props.office}`}
                  onClear={() => clearChip("office")}
                />
              )}
              {props.service && (
                <Chip
                  label={`Capability: ${props.service}`}
                  onClear={() => clearChip("service")}
                />
              )}
              {props.sector && (
                <Chip
                  label={`Sector: ${props.sector}`}
                  onClear={() => clearChip("sector")}
                />
              )}
              {props.letter && (
                <Chip
                  label={`Letter: ${props.letter}`}
                  onClear={() => clearChip("letter")}
                />
              )}
              {props.q && (
                <Chip label={`“${props.q}”`} onClear={() => clearChip("q")} />
              )}
              {(props.office ||
                props.service ||
                props.sector ||
                props.letter ||
                props.q) && (
                <button
                  onClick={() => router.push("/en/people")}
                  className="text-sm underline decoration-slate-400 hover:text-black"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Count */}
            <div className="text-sm text-slate-600 mb-3">
              Showing <span className="font-semibold">{items.length}</span> of{" "}
              {total} result{total === 1 ? "" : "s"}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((p) => (
                <article
                  key={p.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative h-48 bg-slate-100">
                    <Image
                      src={p.image ?? "/images/people/placeholder.jpg"}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold leading-tight">
                      {p.name}
                    </h3>
                    <div className="text-sm text-slate-600">{p.title}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {p.office}
                    </div>
                    <div className="mt-3">
                      <Link
                        href={{
                          pathname: "/en/people/profile",
                          query: { id: p.id },
                        }}
                        className="inline-flex items-center gap-2 text-[var(--brand-orange)] font-semibold"
                      >
                        View profile <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: pages }).map((_, i) => {
                  const n = i + 1;
                  const next = new URLSearchParams(searchParams.toString());
                  next.set("page", String(n));
                  return (
                    <Link
                      key={n}
                      href={`/en/people?${next.toString()}`}
                      className={cls(
                        "px-3 py-1.5 border rounded",
                        n === page
                          ? "bg-black text-white"
                          : "hover:bg-slate-100"
                      )}
                    >
                      {n}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Subcomponents ----------
function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm">
      {label}
      <button
        onClick={onClear}
        className="w-5 h-5 grid place-items-center rounded-full bg-slate-300 hover:bg-black hover:text-white"
        aria-label={`Clear ${label}`}
      >
        ×
      </button>
    </span>
  );
}
