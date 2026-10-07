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
    </ProjectsWaveShell>
  );
}
