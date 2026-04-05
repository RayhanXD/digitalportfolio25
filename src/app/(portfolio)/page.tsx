import { HomeHero } from "@/components/portfolio/home-hero";
import { HomeBento } from "@/components/portfolio/home-bento";
import { HomeStats } from "@/components/portfolio/home-stats";
import { HomeCta } from "@/components/portfolio/home-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rayhan Mohammad — full-stack and ML engineering. Agentic AI, production systems, and research at UT Austin.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBento />
      <HomeStats />
      <HomeCta />
    </>
  );
}
