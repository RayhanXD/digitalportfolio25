import Link from "next/link";
import type { Metadata } from "next";
import { ProjectsWaveShell } from "@/components/portfolio/projects-wave-shell";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — agentic search, health tech, ML for accessibility, and quantitative finance.",
};

/** Live / repo URLs from resume (PDF link annotations), plus event post for Project 05 */
const PROJECT_LINKS = {
  campusConnectAi: "https://www.campusconnectai.org/",
  cyrus: "https://github.com/RayhanXD/C.Y.R.U.S.",
  syntra: "https://github.com/RayhanXD/Syntra",
  tradex: "https://tradex-frontend-ruby.vercel.app/",
  escapeMccombsHackathon:
    "https://www.linkedin.com/posts/texas-business-analytics-association_escape-mccombs-fall-2025-activity-7396641799932600320-Nzue/",
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
            Full-stack and ML builds — semantic search at campus scale, health APIs on AWS, multimodal ML, and portfolio optimization.
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
              CAMPUS CONNECT AI
            </h2>
            <p className="mb-8 max-w-md text-neutral-500">
              Agentic search for 1,000+ students — React, Python, FastAPI, NLP, vector embeddings, PostgreSQL. ~92% relevance; 55% lower query latency via caching and query tuning.
            </p>
            <a
              href={PROJECT_LINKS.campusConnectAi}
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
              C.Y.R.U.S.
            </h2>
            <p className="mb-8 text-neutral-500">
              Voice + gesture ML with MediaPipe and Keras — fused inputs and signal processing at ~85ms end-to-end. Hands-free control for media, IoT, and accessibility.
            </p>
            <a
              href={PROJECT_LINKS.cyrus}
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
              SYNTRA
            </h2>
            <p className="mb-8 text-neutral-500">
              React Native health app — Node.js/Express on AWS, 500 concurrent users at 99.8% uptime. HealthKit via Sahha SDK; 10,000+ daily data points for readiness insights.
            </p>
            <a
              href={PROJECT_LINKS.syntra}
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
              TRADEX
            </h2>
            <p className="mb-8 max-w-sm text-neutral-500">
              Portfolio optimizer — FastAPI backend, Next.js frontend, Black-Litterman and optimization. Backtested across 10+ market scenarios (NumPy, SciPy).
            </p>
            <a
              href={PROJECT_LINKS.tradex}
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
              T-MOBILE ESCAPE MCCOMBS
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-neutral-400">
              1st place out of 150+ teams — engineered an ML pipeline with vectorized NumPy solvers and Keras baselines for the McCombs School of Business hackathon (Nov 2025).
            </p>
            <a
              href={PROJECT_LINKS.escapeMccombsHackathon}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block bg-white px-12 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-secondary-singularity"
              aria-label="Highlights — BAXA Escape McCombs Fall 2025 (LinkedIn)"
            >
              Highlights
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
