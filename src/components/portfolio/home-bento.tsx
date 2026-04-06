"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HomeBento() {
  return (
    <section
      id="work"
      className="mx-auto max-w-screen-2xl scroll-mt-[calc(env(safe-area-inset-top)+5rem)] px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:px-10"
    >
      <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="font-headline mb-6 text-5xl font-black uppercase tracking-tighter text-white md:text-6xl">
            Selected <span className="text-outline">projects</span>
          </h2>
          <p className="text-lg font-light leading-relaxed text-on-surface-variant">
            Highlights from my stack — agentic search, health telemetry, multimodal ML, and quant
            tooling — the same themes you&apos;ll see in experience and research.
          </p>
        </div>
        <div className="text-right">
          <p className="font-label mb-2 text-xs uppercase tracking-widest text-neutral-600">
            Graduation
          </p>
          <span className="font-headline text-3xl font-bold text-tertiary-singularity md:text-4xl">
            May &apos;29
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="group relative aspect-[16/9] overflow-hidden rounded-lg bg-surface-container-low event-horizon-glow md:col-span-8">
          <video
            className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/wave-lattice-card.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 [&_h3]:drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] [&_p]:drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] [&>span]:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <span className="font-label mb-3 text-xs uppercase tracking-widest text-secondary-singularity">
              Campus Connect AI
            </span>
            <h3 className="font-headline mb-3 text-2xl font-bold text-white md:text-4xl">
              AGENTIC SEARCH
            </h3>
            <p className="line-clamp-2 max-w-md text-on-surface-variant">
              Full-stack platform for 1,000+ students — semantic models, PostgreSQL, FastAPI, and CI/CD.
            </p>
          </div>
          <div className="absolute right-6 top-6 flex gap-2 md:right-10 md:top-10">
            <span className="rounded border border-white/10 bg-white/10 px-3 py-1 font-label text-[10px] uppercase text-white backdrop-blur-md">
              NLP
            </span>
            <span className="rounded border border-white/10 bg-white/10 px-3 py-1 font-label text-[10px] uppercase text-white backdrop-blur-md">
              FastAPI
            </span>
          </div>
        </div>

        <div className="group relative min-h-[280px] overflow-hidden rounded-lg bg-surface-container-low md:col-span-4 md:min-h-0">
          <div className="absolute inset-0 -scale-x-100 overflow-hidden">
            <video
              className="h-full w-full min-h-full min-w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            >
              <source src="/agentic-search.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 [&_h3]:drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] [&>span]:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <span className="font-label mb-2 text-xs uppercase tracking-widest text-secondary-singularity">
              C.Y.R.U.S.
            </span>
            <h3 className="font-headline text-xl font-bold uppercase text-white md:text-2xl">
              Voice + gesture ML
            </h3>
          </div>
        </div>

        <div className="group relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-lg bg-black md:col-span-12">
          <div className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-[1.08]">
            <video
              className="absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            >
              <source src="/all-projects-bg.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between p-6 md:p-10 [&_h3]:drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] [&_span]:drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            <div>
              <span className="font-label mb-2 block text-xs uppercase tracking-widest text-neutral-300">
                Full portfolio
              </span>
              <h3 className="font-headline text-2xl font-bold uppercase text-white md:text-3xl">
                All projects
              </h3>
            </div>
            <Link
              href="/projects"
              className="pointer-events-auto flex size-14 items-center justify-center rounded border border-white/20 transition-colors hover:bg-white hover:text-black md:size-16"
              aria-label="View projects"
            >
              <ArrowUpRight className="size-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
