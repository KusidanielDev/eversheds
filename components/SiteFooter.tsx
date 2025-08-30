"use client";
import Link from "next/link";
import * as React from "react";

const QUICK_LINKS = [
  { label: "Legal notices", href: "/en/legal-notices" },
  { label: "Terms & conditions", href: "/en/terms" },
  { label: "Privacy notice", href: "/en/privacy" },
  { label: "Cookies", href: "/en/cookies" },
  { label: "Modern Slavery", href: "/en/modern-slavery" },
  { label: "Whistleblowing", href: "/en/whistleblowing" },
  { label: "ES(I)LLP Members", href: "/en/members" },
];

const COLS = [
  {
    title: "Connect",
    items: [
      { label: "Contact us", href: "/en/contact" },
      { label: "Client login", href: "/en/client-login" },
      { label: "Staff login", href: "/en/staff-login" },
      { label: "Subscribe", href: "/en/subscribe" },
    ],
  },
  {
    title: "About us",
    items: [
      { label: "About Eversheds Sutherland", href: "/en/about" },
      { label: "Purpose and values", href: "/en/about" },
      { label: "Responsible business", href: "/en/about" },
      { label: "Alumni", href: "/en/about" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Client tools", href: "/en/tools" },
      { label: "Events and training", href: "/en/events" },
      { label: "Business topics", href: "/en/topics" },
      { label: "Careers", href: "/en/careers" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#464646] text-white border-t border-gray-700">
      <div className="container-page py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="press-hover rounded px-1 hover:text-white hover:bg-[var(--brand-orange)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center md:justify-end items-center gap-3">
            <a
              href="https://www.linkedin.com/company/eversheds-sutherland"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="press-hover w-9 h-9 rounded grid place-items-center border border-gray-600 hover:bg-[var(--brand-orange)] transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-gray-200"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/EvershedsSutherland"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="press-hover w-9 h-9 rounded grid place-items-center border border-gray-600 hover:bg-[var(--brand-orange)] transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-gray-200"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.729 0 1.321-.593 1.321-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/evershedssutherland"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="press-hover w-9 h-9 rounded grid place-items-center border border-gray-600 hover:bg-[var(--brand-orange)] transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-gray-200"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/user/EvershedsSutherland"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="press-hover w-9 h-9 rounded grid place-items-center border border-gray-600 hover:bg-[var(--brand-orange)] transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-gray-200"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.108-2.117c-1.863-.507-9.39-.507-9.39-.507s-7.527 0-9.39.507a2.994 2.994 0 0 0-2.108 2.117c-.507 1.863-.507 5.754-.507 5.754s0 3.891.507 5.754a2.994 2.994 0 0 0 2.108 2.117c1.863.507 9.39.507 9.39.507s7.527 0 9.39-.507a2.994 2.994 0 0 0 2.108-2.117c.507-1.863.507-5.754.507-5.754s0-3.891-.507-5.754zm-13.498 9.568v-7.568l6.545 3.784-6.545 3.784z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <hr className="border-gray-700" />
      <div className="container-page py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-lg font-semibold mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="hover:text-[var(--brand-orange)]"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="group inline-block">
              <div className="text-lg font-semibold mb-3 transition-colors group-hover:text-[var(--brand-orange)]">
                Offices
              </div>
              <svg
                viewBox="0 0 200 100"
                className="w-full max-w-sm h-auto transition-colors"
              >
                <g className="fill-gray-300 group-hover:fill-[var(--brand-orange)] transition-colors duration-200">
                  <path d="M25 45l15-10 10 5-5 8-12 2z" />
                  <path d="M85 35l25-10 35 6-10 8-22 6-18-4z" />
                  <path d="M150 45l25-5 10 10-8 8-22-6z" />
                  <path d="M120 70l20 3 5 7-25 2z" />
                </g>
                <rect x="0" y="0" width="200" height="100" fill="transparent" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-700" />
      <div className="container-page py-8 text-[13px] leading-relaxed text-gray-200 space-y-4">
        <p>
          © Eversheds Sutherland 2025. All rights reserved. Eversheds Sutherland
          is a provider of legal and other services operating through various
          separate and distinct legal entities.
        </p>
        <p>
          Eversheds Sutherland is the name and brand under which the members of
          Eversheds Sutherland Limited (Eversheds Sutherland (International) LLP
          and Eversheds Sutherland (US) LLP) and their respective controlled,
          managed and affiliated firms and the members of Eversheds Sutherland
          (Europe) Limited (each an "Eversheds Sutherland Entity" and together
          the "Eversheds Sutherland Entities") provide legal or other services
          to clients around the world. Eversheds Sutherland Entities are
          constituted and regulated in accordance with relevant local regulatory
          and legal requirements and operate in accordance with their locally
          registered names. The use of the name Eversheds Sutherland, is for
          description purposes only and does not imply that the Eversheds
          Sutherland Entities are in a partnership or are part of a global LLP.
          The responsibility for the provision of services to the client is
          defined in the terms of engagement between the instructed firm and the
          client. For further information about these Eversheds Sutherland
          Entities and Eversheds Sutherlands’ structure please see the Legal
          Notices page of this website. For information on Konexo please also
          see the Legal Notices page of this website.
        </p>
      </div>
    </footer>
  );
}
