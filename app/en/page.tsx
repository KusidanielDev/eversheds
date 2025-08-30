import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Responsible from "@/components/Responsible";
import WorldMapInteractive from "@/components/WorldMapInteractive";
import InsightsHub from "@/components/InsightsHub";
import SupportHeroImage from "@/components/SupportHeroImage";
import StickyBottomSearch from "@/components/StickyBottomSearch";

export default function Home() {
  return (
    <main>
      <Hero />
      <Carousel
        slides={[
          {
            src: "/images/slide1.jpg",
            title: "Advising on complex, cross-border matters",
            content:
              "We partner with clients to navigate risk, regulation and growth across jurisdictions.",
            href: "/en/insights",
          },
          {
            src: "/images/slide2.jpg",
            title: "Sector insight with global reach",
            content:
              "Practical, commercial guidance underpinned by deep sector knowledge.",
            href: "/en/capabilities",
          },
          {
            src: "/images/slide3.jpg",
            title: "People-focused, technology-enabled",
            content:
              "Efficient delivery that blends expertise, process and technology.",
            href: "/en/resources",
          },
        ]}
        intervalMs={6000}
      />
      <Responsible />
      <WorldMapInteractive />
      <InsightsHub />
      <SupportHeroImage />
      <StickyBottomSearch />
    </main>
  );
}
