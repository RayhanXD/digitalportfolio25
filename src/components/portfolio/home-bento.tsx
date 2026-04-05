"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HomeBento() {
  return (
    <section
      id="work"
      className="mx-auto max-w-7xl scroll-mt-8 px-6 py-24 md:px-8 md:py-32"
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
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(120,180,232,0.18),transparent_55%),radial-gradient(ellipse_70%_50%_at_85%_75%,rgba(255,181,153,0.08),transparent_50%)] opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="absolute -right-24 top-0 size-[min(55vw,420px)] rounded-full bg-secondary-singularity/20 blur-[80px] transition-opacity duration-700 group-hover:opacity-90"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 md:p-10">
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
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04)_0%,transparent_45%),radial-gradient(circle_at_80%_20%,rgba(120,180,232,0.12),transparent_50%)] transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-[100%] border-t border-l border-white/10"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-6 md:p-8">
            <span className="font-label mb-2 text-xs uppercase tracking-widest text-tertiary-singularity">
              Syntra
            </span>
            <h3 className="font-headline text-xl font-bold uppercase text-white md:text-2xl">
              Health &amp; APIs
            </h3>
          </div>
        </div>

        <div className="group relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-lg bg-black md:col-span-12">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/wave-lattice-card.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between bg-gradient-to-r from-black/50 via-black/25 to-transparent p-6 md:p-10">
            <div>
              <span className="font-label mb-2 block text-xs uppercase tracking-widest text-neutral-500">
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
