import Link from "next/link";
import type { Metadata } from "next";
import { ProjectsWaveShell } from "@/components/portfolio/projects-wave-shell";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — agentic search, health tech, ML for accessibility, and quantitative finance.",
};

export default function ProjectsPage() {
  return (
    <ProjectsWaveShell>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
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
            <button
              type="button"
              className="font-label bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-secondary-singularity"
            >
              View
            </button>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-[3/2] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(120,180,232,0.2),transparent_65%)] opacity-40 transition-opacity duration-700 group-hover:opacity-60"
          />
        </article>

        <article className="glow-tertiary group relative flex min-h-[420px] flex-col justify-between bg-black/75 p-8 backdrop-blur-md transition-all duration-500 md:col-span-4">
          <div className="absolute right-0 top-0 p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-tertiary-singularity">
              Project 02
            </span>
          </div>
          <div className="mt-auto">
            <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              SYNTRA
            </h2>
            <p className="mb-8 text-neutral-500">
              React Native health app — Node.js/Express on AWS, 500 concurrent users at 99.8% uptime. HealthKit via Sahha SDK; 10,000+ daily data points for readiness insights.
            </p>
            <button
              type="button"
              className="font-label bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              View
            </button>
          </div>
        </article>

        <article className="glow-secondary group relative flex min-h-[380px] flex-col justify-between bg-black/75 p-8 backdrop-blur-md transition-all duration-500 md:col-span-4">
          <div className="absolute right-0 top-0 p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary-singularity">
              Project 03
            </span>
          </div>
          <div className="mt-auto">
            <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              C.Y.R.U.S.
            </h2>
            <p className="mb-8 text-neutral-500">
              Voice + gesture ML with MediaPipe and Keras — fused inputs and signal processing at ~85ms end-to-end. Hands-free control for media, IoT, and accessibility.
            </p>
            <button
              type="button"
              className="font-label bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              View
            </button>
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
            <button
              type="button"
              className="font-label bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-tertiary-singularity"
            >
              View
            </button>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-full w-2/3 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.04)_40%,rgba(255,181,153,0.1)_100%)] opacity-60 transition-opacity duration-700 group-hover:opacity-90"
          />
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
            <button
              type="button"
              className="font-label bg-white px-12 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-secondary-singularity"
            >
              Highlights
            </button>
          </div>
          <div className="relative h-64 w-full overflow-hidden bg-black/50 md:w-1/2">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_50%,rgba(120,180,232,0.15),transparent_60%),radial-gradient(ellipse_60%_50%_at_90%_80%,rgba(255,181,153,0.08),transparent_55%)] transition-transform duration-[2s] group-hover:scale-[1.02]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5),transparent_40%)]"
            />
          </div>
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
