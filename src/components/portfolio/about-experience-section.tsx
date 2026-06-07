"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocomotiveScrollInstance } from "@/components/portfolio/locomotive-scroll-provider";

const ABOUT_EXP_PROGRESS_EVENT = "about-exp-focus";

export type AboutExperience = {
  years: string;
  title: string;
  org: string;
  body: string;
};

const experiences: readonly AboutExperience[] = [
  {
    years: "SUM 2026 — PRES.",
    title: "SOFTWARE ENGINEER INTERN",
    org: "Humana",
    body: "Deployed AI products to all L2 teams via Vertex AI multi-agent platform and Azure DevOps CI/CD. Cut certification cycle time 72% with 18 Python automation scripts — cleared a 90-day backlog for 13 engineers.",
  },
  {
    years: "MAY — AUG 2025",
    title: "MACHINE LEARNING ENGINEER INTERN",
    org: "The PGA of America",
    body: "Shipped 12 ML systems — RAG pipelines in Python/FastAPI/Docker with CI/CD alongside 14 ML engineers. Drove 500+ engineer adoption by standardizing Docker tooling, unblocking integration 3 weeks early.",
  },
  {
    years: "AUG 2023 — PRES.",
    title: "FOUNDING SOFTWARE ENGINEER",
    org: "Krowe Technologies",
    body: "Shipped Kairos to 23 SMBs — multi-agent LLM platform end-to-end on React/Next.js, FastAPI, and AWS. Cut agent time-to-ship with CI/CD, eval cycles, and Supabase production monitoring.",
  },
  {
    years: "NOV 2025 — PRES.",
    title: "UNDERGRADUATE RESEARCHER",
    org: "UT Center for Computational Biology and Bioinformatics",
    body: "Identified genomic mutation sites in time-series data via Python ML pipeline on TACC HPC clusters. Cut data errors 40% with automated statistical validation and reproducible Git workflows on Linux.",
  },
  {
    years: "MAY — AUG 2024",
    title: "SOFTWARE ENGINEER INTERN",
    org: "Nixar Solutions",
    body: "Generated 5-figure revenue shipping React/Next.js features with multi-agent AI pipelines and CI/CD. Drove 18% conversion lift via A/B testing; KPI dashboards boosted interactions 533% and reach 582%.",
  },
  {
    years: "AUG 2025 — PRES.",
    title: "TECHNOLOGY CONSULTANT",
    org: "Technology Consulting Group (TCG)",
    body: "Built agentic investment diligence system with Claude API for XFund ($190M) — enabled a $120K raise. Engineered 27-state geospatial data pipeline and visualization dashboard for Well Water Finders.",
  },
  {
    years: "JUL 2025 — PRES.",
    title: "SOFTWARE ENGINEER",
    org: "Texas Convergent",
    body: "Achieved 35% throughput gain for AMOS Labs (Capital Factory) with a TypeScript recursive AI agent. Shipped React Native/Node.js app streaming Apple HealthKit biometrics to live athlete dashboards via MongoDB.",
  },
  {
    years: "JUL 2025 — PRES.",
    title: "ML & SOFTWARE DEVELOPER",
    org: "Business Analytics Association (B.A.X.A.)",
    body: "Won 1st of 150 teams at T-Mobile Hackathon — NumPy/Keras ML pipeline for 140-member analytics club. Built React/Supabase member portal with engagement dashboards across 8 monthly events.",
  },
] as const;

type ProgressDetail = { target: HTMLElement; progress: number };

function useFocusedExperienceIndex(enabled: boolean) {
  const [focused, setFocused] = useState<number | null>(null);
  const progressMap = useRef<Record<number, number>>({});
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const flush = () => {
      raf.current = 0;
      const entries = progressMap.current;
      let bestIdx = 0;
      let bestP = -1;
      for (const [k, v] of Object.entries(entries)) {
        const i = Number(k);
        if (v > bestP) {
          bestP = v;
          bestIdx = i;
        }
      }
      setFocused((prev) => {
        if (bestP < 0.06) return prev === null ? prev : null;
        return bestIdx !== prev ? bestIdx : prev;
      });
    };

    const onProgress = (e: Event) => {
      const ce = e as CustomEvent<ProgressDetail>;
      const raw = ce.detail?.target?.getAttribute("data-exp-index");
      if (raw == null) return;
      const idx = Number(raw);
      if (Number.isNaN(idx)) return;
      progressMap.current[idx] = ce.detail.progress;
      if (raf.current) return;
      raf.current = requestAnimationFrame(flush);
    };

    window.addEventListener(ABOUT_EXP_PROGRESS_EVENT, onProgress as EventListener);
    return () => {
      window.removeEventListener(ABOUT_EXP_PROGRESS_EVENT, onProgress as EventListener);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return focused;
}

export function AboutExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const locomotive = useLocomotiveScrollInstance();
  const scrollFx = locomotive != null;

  useEffect(() => {
    if (!locomotive || !sectionRef.current) return;
    const root = sectionRef.current;
    locomotive.removeScrollElements(root);
    locomotive.addScrollElements(root);
    return () => {
      locomotive.removeScrollElements(root);
    };
  }, [locomotive]);

  const focused = useFocusedExperienceIndex(scrollFx);

  return (
    <section ref={sectionRef} className="mx-auto mb-24 max-w-5xl md:mb-40">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-headline mb-4 text-xs uppercase tracking-[0.3em] text-secondary-singularity">
              Experience
            </h2>
            <p className="mb-8 max-w-xs text-sm font-light leading-relaxed text-neutral-400">
              Smooth scroll sharpens each role as it crosses center — like pulling focus on a lens.
            </p>
            <div
              className={cn(
                "hidden font-headline text-6xl font-extrabold tabular-nums tracking-tighter text-white/90 transition-[opacity,transform] duration-500 ease-out md:block lg:text-7xl",
                focused == null && "opacity-30"
              )}
              aria-hidden
            >
              {focused != null ? String(focused + 1).padStart(2, "0") : "—"}
            </div>
            <p
              className={cn(
                "font-headline mt-3 hidden min-h-[2.75rem] text-xs font-bold uppercase leading-snug tracking-wide text-secondary-singularity transition-opacity duration-300 md:block",
                focused == null && "opacity-40"
              )}
            >
              {focused != null ? experiences[focused]?.title : "\u00a0"}
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-5 lg:col-span-8">
          {experiences.map((row, i) => (
            <article
              key={row.title}
              data-exp-index={i}
              data-scroll={scrollFx ? true : undefined}
              data-scroll-css-progress={scrollFx ? true : undefined}
              data-scroll-event-progress={scrollFx ? ABOUT_EXP_PROGRESS_EVENT : undefined}
              data-scroll-position={scrollFx ? "middle,middle" : undefined}
              data-scroll-offset={scrollFx ? "38%,38%" : undefined}
              className={cn(
                "group relative grid grid-cols-1 gap-4 overflow-hidden rounded-lg px-4 py-10 transition-shadow duration-500 md:grid-cols-12 md:py-12",
                "border border-white/[0.04] bg-white/[0.02]",
                "motion-reduce:border-white/[0.06] motion-reduce:bg-white/[0.03]",
                scrollFx && [
                  "[--p:var(--progress,0)]",
                  "opacity-[calc(0.28+0.72*(4*var(--p)*(1-var(--p))))]",
                  "scale-[calc(0.985+0.03*(4*var(--p)*(1-var(--p))))]",
                  "[filter:blur(calc((1-4*var(--p)*(1-var(--p)))*3px))]",
                  "shadow-[0_0_calc(48px*(4*var(--p)*(1-var(--p))))_rgba(120,180,232,0.12)]",
                  "motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:filter-none motion-reduce:shadow-none",
                ],
                !scrollFx && "hover:bg-white/[0.04]"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-secondary-singularity/80 via-secondary-singularity/25 to-transparent opacity-0 transition-opacity duration-500",
                  scrollFx && "opacity-[calc(4*var(--p)*(1-var(--p)))]",
                  !scrollFx && "group-hover:opacity-40"
                )}
                aria-hidden
              />
              <div className="font-label text-sm text-neutral-500 md:col-span-2">{row.years}</div>
              <div className="md:col-span-6">
                <h3 className="font-headline mb-2 text-xl font-bold text-white md:text-2xl">
                  {row.title}
                </h3>
                <p className="font-label text-xs uppercase tracking-wide text-neutral-500">
                  {row.org}
                </p>
              </div>
              <div className="text-sm font-light leading-relaxed text-on-surface-variant md:col-span-4">
                {row.body}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
