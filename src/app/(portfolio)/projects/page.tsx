import Link from "next/link";
import type { Metadata } from "next";
import { ProjectsWaveShell } from "@/components/portfolio/projects-wave-shell";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — LangGraph multi-agent systems, agentic search, multimodal ML, and production health APIs.",
};

/** Live / repo URLs from resume (PDF link annotations) */
const PROJECT_LINKS = {
  keystone: "https://github.com/RayhanXD",
  raygent: "https://github.com/RayhanXD",
  campusConnectAi: "https://www.campusconnectai.org/",
  cyrus: "https://github.com/RayhanXD/C.Y.R.U.S.",
  syntra: "https://github.com/RayhanXD/Syntra",
} as const;

export default function ProjectsPage() {
  return (
    <ProjectsWaveShell>
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-6 md:px-8 lg:px-10">
        <header className="mb-16 md:mb-20">
          <p className="font-label mb-4 text-xs uppercase tracking-[0.35em] text-secondary-singularity">
            Projects
          </p>
          <h1 className="font-headline mb-4 text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            SELECTED <span className="text-outline">WORK</span>
          </h1>
          <div className="mb-8 h-0.5 w-24 bg-secondary-singularity" />
          <p className="max-w-xl text-lg leading-relaxed text-neutral-300">
            Multi-agent orchestration, agentic search at campus scale, multimodal ML, and production
            health APIs — built for measurable impact.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <article className="glow-secondary group relative flex min-h-[420px] flex-col justify-between bg-black/75 p-8 backdrop-blur-md transition-all duration-500 md:col-span-8">
          <div className="absolute right-0 top-0 p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary-singularity">
              Project 01
            </span>
          </div>
          <div className="relative z-10 mt-auto">
            <h2 className="font-headline mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              KEYSTONE
            </h2>
            <p className="mb-8 max-w-md text-neutral-500">
              Won Best Overall at HBA×CSBA Hack Day — LangGraph/Gemini multi-agent real estate platform
              built in 5 hours. Python, FastAPI, React, multi-agent orchestration.
            </p>
            <a
              href={PROJECT_LINKS.keystone}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-secondary-singularity"
            >
              View
            </a>
          </div>
        </article>

        <article className="glow-secondary group relative flex min-h-[380px] flex-col justify-between bg-black/75 p-8 backdrop-blur-md transition-all duration-500 md:col-span-4">
          <div className="absolute right-0 top-0 p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary-singularity">
              Project 02
            </span>
          </div>
          <div className="mt-auto">
            <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              RAYGENT
            </h2>
            <p className="mb-8 text-neutral-500">
              Real-time multi-agent inspection via LangGraph visualizer on React/Next.js with NVIDIA
              Nemotron. TypeScript, Python, LangGraph.
            </p>
            <a
              href={PROJECT_LINKS.raygent}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              View
            </a>
          </div>
        </article>

        <article className="glow-tertiary group relative flex min-h-[420px] flex-col justify-between bg-black/75 p-8 backdrop-blur-md transition-all duration-500 md:col-span-4">
          <div className="absolute right-0 top-0 p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-tertiary-singularity">
              Project 03
            </span>
          </div>
          <div className="mt-auto">
            <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              CAMPUS CONNECT AI
            </h2>
            <p className="mb-8 text-neutral-500">
              Served 1,000+ students at 92% query relevance — agentic search in Python/FastAPI with
              vector embeddings and PostgreSQL. Cut latency 55%.
            </p>
            <a
              href={PROJECT_LINKS.campusConnectAi}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              View
            </a>
          </div>
        </article>

        <article className="glow-tertiary group relative flex min-h-[380px] flex-col justify-between overflow-hidden bg-black/75 p-8 backdrop-blur-md transition-all duration-500 md:col-span-8">
          <div className="absolute right-0 top-0 p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-tertiary-singularity">
              Project 04
            </span>
          </div>
          <div className="relative z-10 mt-auto">
            <h2 className="font-headline mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              C.Y.R.U.S.
            </h2>
            <p className="mb-8 max-w-sm text-neutral-500">
              85ms end-to-end inference fusing voice and gesture ML via TensorFlow/Keras and MediaPipe
              signal processing.
            </p>
            <a
              href={PROJECT_LINKS.cyrus}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-tertiary-singularity"
            >
              View
            </a>
          </div>
        </article>

        <article className="glow-secondary group relative flex flex-col justify-between gap-12 bg-black/75 p-10 backdrop-blur-md transition-all duration-500 md:col-span-12 md:flex-row md:items-end md:p-12">
          <div className="md:w-1/2">
            <span className="font-label mb-8 block text-[10px] uppercase tracking-[0.3em] text-secondary-singularity">
              Project 05
            </span>
            <h2 className="font-headline mb-6 text-4xl font-bold tracking-tighter md:text-5xl">
              SYNTRA
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-400">
              Node.js/Express REST APIs on AWS — 500 concurrent users at 99.8% uptime. HealthKit via
              Sahha SDK processing 10,000+ daily data points for athlete readiness.
            </p>
            <a
              href={PROJECT_LINKS.syntra}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block bg-white px-12 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-secondary-singularity"
            >
              View
            </a>
          </div>
          <div className="relative h-64 w-full overflow-hidden bg-black md:w-1/2" />
        </article>
      </div>

        <p className="mt-16 text-center text-sm text-neutral-400">
          More context on the{" "}
          <Link href="/" className="text-secondary-singularity underline-offset-4 hover:underline">
            home
          </Link>{" "}
          page and in my resume.
        </p>
      </div>
    </ProjectsWaveShell>
  );
}
