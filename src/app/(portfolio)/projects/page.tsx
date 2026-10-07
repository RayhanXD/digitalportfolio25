import Link from "next/link";
import type { Metadata } from "next";
import { ProjectsWaveShell } from "@/components/portfolio/projects-wave-shell";
import { ProjectsHeader } from "@/components/portfolio/projects-header";
import { ProjectsGallery } from "@/components/portfolio/projects-gallery";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — SelfPI agentic API tooling, LangGraph multi-agent systems, campus-scale search, and multimodal ML.",
};

export default function ProjectsPage() {
  return (
    <ProjectsWaveShell>
      <ProjectsHeader />
      <ProjectsGallery />
      <p className="mx-auto mt-16 max-w-screen-2xl px-5 text-center text-sm text-neutral-400 sm:px-6 md:px-8 lg:px-10">
        More context on the{" "}
        <Link href="/" className="text-secondary-singularity underline-offset-4 hover:underline">
          home
        </Link>{" "}
        page and in my resume.
      </p>
    </ProjectsWaveShell>
  );
}
