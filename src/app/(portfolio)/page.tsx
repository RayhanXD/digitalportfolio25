import { HomeHero } from "@/components/portfolio/home-hero";
import { HomeBento } from "@/components/portfolio/home-bento";
import { HomeStats } from "@/components/portfolio/home-stats";
import { HomeCta } from "@/components/portfolio/home-cta";
import { HomePageBackground } from "@/components/portfolio/home-page-background";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rayhan Mohammad — full-stack and ML engineering. Agentic AI tooling, multi-agent platforms, and research at UT Austin.",
};

export default function HomePage() {
  return (
    <div className="relative">
      <HomePageBackground />
      <div className="relative z-10">
        <HomeHero />
        <HomeBento />
        <HomeStats />
        <HomeCta />
      </div>
    </div>
  );
}
