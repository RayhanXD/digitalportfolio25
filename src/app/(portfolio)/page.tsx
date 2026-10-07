import { HomeHero } from "@/components/portfolio/home-hero";
import { HomeStatement } from "@/components/portfolio/home-statement";
import { HomeExperience } from "@/components/portfolio/home-experience";
import { HomeWork } from "@/components/portfolio/home-work";
import { KineticMarquee } from "@/components/portfolio/kinetic-marquee";
import { HomeCta } from "@/components/portfolio/home-cta";
import { HomePageBackground } from "@/components/portfolio/home-page-background";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rayhan Mohammad, full-stack and ML engineer. Agentic AI tooling, multi-agent platforms, and research at UT Austin.",
};

export default function HomePage() {
  return (
    <div className="relative">
      <HomePageBackground />
      <div className="relative z-10">
        <HomeHero />
        <HomeStatement />
        <HomeExperience />
        <HomeWork />
        <KineticMarquee />
        <HomeCta />
      </div>
    </div>
  );
}
