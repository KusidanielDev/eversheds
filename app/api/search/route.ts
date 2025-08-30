import { NextRequest, NextResponse } from "next/server";
import { rank } from "@/lib/fuzzy";

const INDEX = [
  { label: "People", href: "/en/people" },
  { label: "Capabilities", href: "/en/capabilities" },
  { label: "Services", href: "/en/capabilities/services" },
  { label: "Industries", href: "/en/capabilities/industries" },
  { label: "Resources", href: "/en/resources" },
  { label: "Insights", href: "/en/insights" },
  { label: "Events & training", href: "/en/events" },
  { label: "Client tools", href: "/en/tools" },
  { label: "Business topics", href: "/en/topics" },
  { label: "About", href: "/en/about" },
  { label: "Careers", href: "/en/careers" },
  { label: "Offices", href: "/en/offices" },
  { label: "Legal notices", href: "/en/legal-notices" },
  { label: "Terms & conditions", href: "/en/terms" },
  { label: "Privacy notice", href: "/en/privacy" },
];
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q")||"").slice(0,64);
  const results = rank(q, INDEX, 10);
  return NextResponse.json({ q, results });
}
