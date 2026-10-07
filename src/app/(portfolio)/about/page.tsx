import type { Metadata } from "next";
import { AboutShell } from "@/components/portfolio/about-shell";
import { ChapterRail } from "@/components/portfolio/chapter-rail";
import { AboutIntro } from "@/components/portfolio/about-intro";
import { AboutApproach } from "@/components/portfolio/about-approach";
import { AboutExperience } from "@/components/portfolio/about-experience";
import { AboutWins } from "@/components/portfolio/about-wins";
import { AboutEducation } from "@/components/portfolio/about-education";
import { AboutToolkit } from "@/components/portfolio/about-toolkit";
import { AboutCta } from "@/components/portfolio/about-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rayhan Mohammad — software engineer shipping agentic AI platforms, RAG pipelines, and production ML systems. UT Austin, GPA 4.0.",
};

export default function AboutPage() {
  return (
    <AboutShell>
      <ChapterRail />
      <AboutIntro />
      <AboutApproach />
      <AboutExperience />
      <AboutWins />
      <AboutEducation />
      <AboutToolkit />
      <AboutCta />
    </AboutShell>
  );
}
