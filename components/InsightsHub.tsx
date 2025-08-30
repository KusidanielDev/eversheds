"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cx } from "@/lib/utils";

type TabKey = "insights" | "news" | "events";
type CardItem = {
  id: string;
  image: string;
  title: string;
  date: string;
  blurb: string;
  href: string;
};

const DATA: Record<TabKey, CardItem[]> = {
  insights: [
    {
      id: "i1",
      image: "/images/insights/insight-01.jpg",
      title: "AI readiness for GCs",
      date: "Aug 15, 2025",
      blurb: "How to de-risk AI adoption in legal ops.",
      href: "/en/insights/ai-readiness",
    },
    {
      id: "i2",
      image: "/images/insights/insight-02.jpg",
      title: "Cross-border M&A",
      date: "Jul 29, 2025",
      blurb: "Key regulatory trends to watch this quarter.",
      href: "/en/insights/cross-border-ma",
    },
    {
      id: "i3",
      image: "/images/insights/insight-03.jpg",
      title: "Data protection 101",
      date: "Jun 30, 2025",
      blurb: "What the latest decisions mean for you.",
      href: "/en/insights/data-protection",
    },
    {
      id: "i4",
      image: "/images/insights/insight-04.jpg",
      title: "ESG disclosures",
      date: "Jun 18, 2025",
      blurb: "Preparing for new reporting obligations.",
      href: "/en/insights/esg-disclosures",
    },
  ],
  news: [
    {
      id: "n1",
      image: "/images/news/news-01.jpg",
      title: "Eversheds Sutherland wins award",
      date: "Aug 11, 2025",
      blurb: "Recognized for innovation in client service.",
      href: "/en/news/awards-2025",
    },
    {
      id: "n2",
      image: "/images/news/news-02.jpg",
      title: "New partner promotions",
      date: "Jul 31, 2025",
      blurb: "20 partners added across EMEA & US.",
      href: "/en/news/partner-promotions",
    },
    {
      id: "n3",
      image: "/images/news/news-03.jpg",
      title: "Office opening",
      date: "Jul 02, 2025",
      blurb: "Expanding our presence in CEE.",
      href: "/en/news/new-office",
    },
    {
      id: "n4",
      image: "/images/news/news-04.jpg",
      title: "Pro bono milestone",
      date: "Jun 20, 2025",
      blurb: "50,000 hours delivered globally.",
      href: "/en/news/pro-bono",
    },
  ],
  events: [
    {
      id: "e1",
      image: "/images/events/event-01.jpg",
      title: "ESG briefing",
      date: "Sep 02, 2025",
      blurb: "Join our ESG disclosure masterclass.",
      href: "/en/events/esg",
    },
    {
      id: "e2",
      image: "/images/events/event-02.jpg",
      title: "AI for in-house",
      date: "Sep 18, 2025",
      blurb: "Live demo + Q&A for GCs.",
      href: "/en/events/ai-inhouse",
    },
    {
      id: "e3",
      image: "/images/events/event-03.jpg",
      title: "Competition clinic",
      date: "Oct 08, 2025",
      blurb: "Merger control Q4 outlook.",
      href: "/en/events/competition",
    },
    {
      id: "e4",
      image: "/images/events/event-04.jpg",
      title: "Employment update",
      date: "Oct 24, 2025",
      blurb: "Hybrid work & case law.",
      href: "/en/events/employment",
    },
  ],
};

export default function InsightsHub() {
  const [tab, setTab] = React.useState<TabKey>("insights");
  const items = DATA[tab];

  return (
    <section className="bg-white mt-10">
      {/* lighter HR to separate previous section */}
      <hr className="hr-light mb-6" />

      <div className="container-page">
        {/* Mobile: dropdown selector */}
        <div className="md:hidden mb-6">
          <label className="block text-sm font-medium mb-1">Browse</label>
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value as TabKey)}
            className="w-full border-gray-300 rounded-md"
          >
            <option value="insights">Insights</option>
            <option value="news">News</option>
            <option value="events">Latest Events</option>
          </select>
        </div>

        <div className="hidden md:flex flex-col lg:flex-row gap-8">
          {/* LEFT: tabs column (desktop only) */}
          <div className="w-full lg:w-[220px] shrink-0">
            <div className="flex lg:flex-col gap-6 lg:gap-4">
              <TabLink
                label="Insights"
                active={tab === "insights"}
                onClick={() => setTab("insights")}
              />
              <TabLink
                label="News"
                active={tab === "news"}
                onClick={() => setTab("news")}
              />
              <TabLink
                label="Latest Events"
                active={tab === "events"}
                onClick={() => setTab("events")}
              />
            </div>
          </div>

          {/* RIGHT: 4 vertical cards (desktop) */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((it) => (
                <ArticleTall key={it.id} item={it} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile layout: two-column rows (image left, text right, arrow under text) */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-5">
            {items.map((it) => (
              <ArticleHorizontal key={it.id} item={it} />
            ))}
          </div>
        </div>

        {/* Bottom-right CTA */}
        <div className="mt-10 flex justify-end">
          <Link
            href={
              tab === "insights"
                ? "/en/insights"
                : tab === "news"
                ? "/en/news"
                : "/en/events"
            }
            className="wipe-btn border border-black px-6 py-3 font-semibold inline-flex items-center gap-2 rounded-none"
          >
            <span>View all latest {tab === "events" ? "events" : tab}</span>
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TabLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "relative text-left font-semibold uppercase tracking-wide text-black tab-link"
      )}
      data-active={active ? "true" : "false"}
    >
      <span className="pr-1">{label}</span>
    </button>
  );
}

/** Desktop tall card (203×539) */
function ArticleTall({ item }: { item: CardItem }) {
  return (
    <Link
      href={item.href}
      className={cx(
        "group relative block w-[203px] h-[539px] mx-auto",
        "card-vertical"
      )}
    >
      <div className="relative w-[203px] h-[260px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="203px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-200/20 pointer-events-none" />
      </div>

      <div className="card-pad px-3 pt-3 pb-12">
        <div className="text-[13px] font-semibold uppercase tracking-wide opacity-80">
          {item.title}
        </div>
        <div className="text-[12px] opacity-70 mt-1">{item.date}</div>
        <div className="mt-3 font-bold leading-snug">{item.blurb}</div>
      </div>

      <span className="card-arrow">→</span>
    </Link>
  );
}

/** Mobile horizontal card (image left, content right, arrow under text) */
function ArticleHorizontal({ item }: { item: CardItem }) {
  return (
    <Link
      href={item.href}
      className={cx(
        "group grid grid-cols-[112px_1fr] gap-4 items-start border border-gray-200 bg-white p-3",
        "card-vertical"
      )}
    >
      <div className="relative w-[112px] h-[144px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="112px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-200/20 pointer-events-none" />
      </div>

      <div className="card-pad pr-3">
        <div className="text-[13px] font-semibold uppercase tracking-wide opacity-80">
          {item.title}
        </div>
        <div className="text-[12px] opacity-70 mt-1">{item.date}</div>
        <div className="mt-2 font-bold leading-snug">{item.blurb}</div>

        <div className="mt-3 flex justify-end">
          <span className="inline-grid place-items-center w-8 h-8 bg-black text-white group-hover:bg-white group-hover:text-black transition">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
