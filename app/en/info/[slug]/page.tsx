// app/en/info/[slug]/page.tsx
import Link from "next/link";

type Props = { params: { slug: string } };

const COPY: Record<string, { title: string; blurb: string }> = {
  // Core sections
  services: {
    title: "Services",
    blurb:
      "An overview of our legal service areas, from corporate and commercial to dispute resolution and beyond.",
  },
  sectors: {
    title: "Sectors",
    blurb:
      "We partner with clients across key industries, tailoring legal strategies to sector-specific challenges.",
  },
  solutions: {
    title: "Solutions",
    blurb:
      "Practical, technology-enabled solutions designed to help you move faster while managing risk.",
  },

  insights: {
    title: "Insights",
    blurb:
      "Timely perspectives, analysis and commentary from our global teams on the issues that matter.",
  },
  publications: {
    title: "Publications",
    blurb:
      "In-depth reports, guides and briefings to help you navigate complex legal and regulatory topics.",
  },
  events: {
    title: "Events & training",
    blurb:
      "Join our upcoming seminars, webinars and trainings to stay ahead on legal and business topics.",
  },
  news: {
    title: "News",
    blurb:
      "Firm announcements, recognitions and media coverage from across our global network.",
  },

  "about-us": {
    title: "About us",
    blurb:
      "Who we are, how we work and what guides us—learn more about our firm and global network.",
  },
  "purpose-and-values": {
    title: "Purpose and values",
    blurb:
      "Our shared purpose and values shape how we serve clients, develop people and engage communities.",
  },
  "responsible-business": {
    title: "Responsible business",
    blurb:
      "How we integrate responsibility into everything we do, from sustainability to pro bono initiatives.",
  },
  community: {
    title: "Community",
    blurb:
      "Building positive, long-term impact through partnerships and programs in our local communities.",
  },
  "diversity-and-inclusion": {
    title: "Diversity & Inclusion",
    blurb:
      "Creating an inclusive environment where everyone can thrive and contribute at their best.",
  },
  "environmental-sustainability": {
    title: "Environmental sustainability",
    blurb:
      "Our approach to sustainability, including targets, progress and initiatives across the firm.",
  },
  "pro-bono": {
    title: "Pro bono",
    blurb:
      "Providing meaningful legal support to organizations and individuals who need it most.",
  },
  reports: {
    title: "Reports",
    blurb:
      "Annual reports and key firm publications that share our performance and progress.",
  },
  alumni: {
    title: "Alumni",
    blurb:
      "Celebrating our alumni community and the many ways we continue to collaborate and connect.",
  },

  offices: {
    title: "Offices",
    blurb:
      "Find our locations and contact details across our global network of offices.",
  },

  // Careers
  "uk-careers": {
    title: "UK Careers",
    blurb:
      "Opportunities across our UK offices for lawyers, business professionals and students.",
  },
  applications: {
    title: "Applications",
    blurb:
      "What to expect when applying—timelines, requirements and how to prepare.",
  },
  "why-us": {
    title: "Why us?",
    blurb:
      "What makes our firm a great place to build your career and grow your expertise.",
  },
  "lawyers-and-partners": {
    title: "Lawyers and partners",
    blurb:
      "Experienced hires and partner opportunities with real impact and responsibility.",
  },
  "business-professionals": {
    title: "Business professionals",
    blurb:
      "Non-legal careers across operations, finance, HR, marketing, technology and more.",
  },
  "students-and-recent-graduates": {
    title: "Students and recent graduates",
    blurb:
      "Vacation schemes, training contracts and programs to launch your legal career.",
  },
  apprenticeships: {
    title: "Apprenticeships",
    blurb:
      "Earn while you learn—structured apprenticeship routes into the profession.",
  },
  students: {
    title: "Students",
    blurb:
      "Early-career opportunities and resources tailored for students exploring law.",
  },
  graduates: {
    title: "Graduates",
    blurb:
      "Graduate programs that develop your skills through real client work and mentoring.",
  },
  "recruitment-process": {
    title: "Recruitment process",
    blurb:
      "From application to offer—what our selection process looks like and how to prepare.",
  },
  "student-and-graduate-applications": {
    title: "Student and graduate applications",
    blurb:
      "Application windows, requirements and tips focused on student and graduate routes.",
  },

  // Utility
  search: { title: "Search", blurb: "Search our content and people." },

  // Regions & Languages examples (generic copy)
  // e.g., /en/info/region-united-kingdom
  "region-united-kingdom": {
    title: "Region: United Kingdom",
    blurb:
      "You’re viewing regional information for the United Kingdom. Content is tailored to this region.",
  },
  // e.g., /en/info/language-english
  "language-english": {
    title: "Language: English",
    blurb:
      "You’ve selected English. Content and navigation will reflect this preference.",
  },
};

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function InfoPage({ params }: Props) {
  const raw = params.slug;
  const data = COPY[raw] ?? {
    title: titleCase(raw),
    blurb:
      "This section is being prepared. In the meantime, here’s a brief summary and quick links to navigate the site.",
  };

  return (
    <main className="min-h-[60vh] bg-white">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <div className="text-sm uppercase tracking-widest text-gray-500">
            Overview
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">{data.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
            {data.blurb}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="border border-gray-200 p-5">
            <h2 className="font-semibold text-lg">What you’ll find here</h2>
            <p className="mt-2 text-[15px] text-gray-700">
              Highlights, key topics, and how to get in touch with our teams.
              We’ll keep this page updated as new material is published.
            </p>
          </div>
          <div className="border border-gray-200 p-5">
            <h2 className="font-semibold text-lg">Next steps</h2>
            <ul className="mt-2 list-disc list-inside text-[15px] text-gray-700">
              <li>
                Explore{" "}
                <Link href="/en/people" className="underline">
                  People
                </Link>{" "}
                to find an expert.
              </li>
              <li>
                Return{" "}
                <Link href="/" className="underline">
                  home
                </Link>{" "}
                to browse featured content.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
