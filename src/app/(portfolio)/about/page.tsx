import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { AboutMatrixShell } from "@/components/portfolio/about-matrix-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rayhan Mohammad — education, experience, and technical skills in software and machine learning.",
};

/** Matches `public/about-portrait.png` pixel dimensions. */
const ABOUT_PORTRAIT = { width: 1024, height: 650 } as const;

const skills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "TensorFlow",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "REST APIs",
  "Git & CI/CD",
];

export default function AboutPage() {
  return (
    <AboutMatrixShell>
      <div className="mx-auto max-w-screen-2xl px-5 pb-12 sm:px-6 md:px-8 lg:px-10">
        <p className="font-label mb-10 text-xs uppercase tracking-[0.35em] text-secondary-singularity">
          About
        </p>
        <section className="mb-24 grid grid-cols-1 gap-8 lg:mb-40 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h1 className="font-headline mb-10 text-5xl font-extrabold leading-[0.85] tracking-tighter text-white md:text-7xl lg:text-9xl">
            BUILDING
            <br />
            <span className="text-secondary-singularity">AT SCALE.</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl font-light leading-relaxed text-neutral-200 md:text-2xl">
              I&apos;m Rayhan — a Statistics &amp; Data Science and Computer Science student at UT Austin
              (GPA 4.0). I ship full-stack products and ML systems: from agentic search and FastAPI
              backends to production monitoring, evals, and research-grade pipelines in genomics.
            </p>
          </div>
        </div>
        <div className="relative flex justify-end lg:col-span-4">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-lg bg-surface-container-low"
            style={{
              aspectRatio: `${ABOUT_PORTRAIT.width} / ${ABOUT_PORTRAIT.height}`,
            }}
          >
            <Image
              src="/about-portrait.png"
              alt="Rayhan Mohammad"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 28rem"
              priority
            />
          </div>
          <div className="absolute -z-10 left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-singularity/10 blur-[100px]" />
        </div>
      </section>

      <section className="mb-24 grid grid-cols-1 items-start gap-16 md:mb-40 md:grid-cols-2">
        <div className="md:sticky md:top-32">
          <h2 className="font-headline mb-6 text-xs uppercase tracking-[0.3em] text-secondary-singularity">
            How I work
          </h2>
          <h3 className="font-headline mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            SHIP, MEASURE, ITERATE.
          </h3>
          <div className="mb-8 h-1 w-24 bg-white" />
        </div>
        <div className="space-y-10 text-lg font-light text-on-surface-variant">
          <p>
            I care about end-to-end ownership: clear APIs, reproducible workflows, and telemetry
            so features don&apos;t just launch — they stay reliable. That mindset came from leading
            engineering at a startup, shipping ML education at scale, and mentoring peers through
            live workshops.
          </p>
          <p>
            Recent focus:{" "}
            <span className="font-medium text-white">
              agentic LLM features, retrieval and embeddings, and statistical validation in research
            </span>
            — always with an eye on latency, correctness, and real user impact.
          </p>
          <Link
            href="/projects"
            className="font-headline group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-secondary-singularity"
          >
            View Portfolio
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <section className="mb-24 md:mb-40">
        <h2 className="font-headline mb-12 text-center text-xs uppercase tracking-[0.3em] text-secondary-singularity">
          Technical skills
        </h2>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
          {skills.map((s) => (
            <span
              key={s}
              className="font-label cursor-default bg-white/5 px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-white/10"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-24 max-w-5xl md:mb-40">
        <h2 className="font-headline mb-16 text-xs uppercase tracking-[0.3em] text-secondary-singularity">
          Experience
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              years: "NOV 2025 — PRES.",
              title: "UNDERGRADUATE RESEARCHER",
              org: "UT Center for Computational Biology and Bioinformatics",
              body: "Applied AI in Python to locate genes and mutation sites; built automated statistical validation pipelines and reproducible Git workflows (≈40% fewer data errors).",
            },
            {
              years: "JUL 2025 — PRES.",
              title: "ML / SOFTWARE (BAA + TEXAS CONVERGENT)",
              org: "UT Austin",
              body: "Teaching ML in Python via workshops; built React/Supabase member portal with analytics. Shipping a wearable biometric tracker with time-series models and REST APIs for convergent MVPs.",
            },
            {
              years: "OCT 2024 — JUL 2025",
              title: "MACHINE LEARNING EXTERN",
              org: "The PGA of America",
              body: "Delivered 12 Python ML labs with CI/CD and telemetry; adopted by 500+ learners. Standardized Docker tooling and unblocked 14 engineers ahead of schedule.",
            },
            {
              years: "AUG 2023 — AUG 2025",
              title: "CHIEF TECHNOLOGY OFFICER",
              org: "Krowe Technologies",
              body: "Shipped Kairos end-to-end (React/Next.js, FastAPI, AWS/Firestore) for 23 SMBs and 100+ founders. Shipped agentic LLM features with CI/CD, evals, and production monitoring.",
            },
            {
              years: "DEC 2023 — JUL 2024",
              title: "SOFTWARE ENGINEER INTERN",
              org: "Nixar Solutions",
              body: "Shipped React/Next.js customer features with API integrations. Drove 18% conversion lift via A/B tests; KPI dashboards improved user interactions 533%.",
            },
          ].map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-1 gap-4 rounded-lg bg-white/[0.02] px-4 py-12 transition-colors duration-500 hover:bg-white/[0.04] md:grid-cols-12"
            >
              <div className="font-label text-sm text-neutral-500 md:col-span-2">{row.years}</div>
              <div className="md:col-span-6">
                <h4 className="font-headline mb-2 text-xl font-bold text-white md:text-2xl">
                  {row.title}
                </h4>
                <p className="font-label text-xs uppercase tracking-wide text-neutral-500">
                  {row.org}
                </p>
              </div>
              <div className="text-sm font-light leading-relaxed text-on-surface-variant md:col-span-4">
                {row.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-lg bg-black/60 py-20 text-center backdrop-blur-md md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-1/2 -top-1/2 size-full bg-secondary-singularity blur-[160px]" />
          <div className="absolute -bottom-1/2 -right-1/2 size-full bg-tertiary-singularity blur-[160px]" />
        </div>
        <div className="relative z-10">
          <h2 className="font-headline mb-8 text-4xl font-extrabold tracking-tighter text-white md:text-6xl lg:text-7xl">
            LET&apos;S CONNECT.
          </h2>
          <p className="mx-auto mb-10 max-w-xl font-light text-neutral-300">
            Open to internships, research, and product engineering roles — especially where ML meets production systems.
          </p>
          <Link
            href="mailto:rayhanm@utexas.edu"
            className="font-label inline-block bg-white px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary-fixed transition-all duration-300 hover:shadow-[0_0_30px_rgba(120,180,232,0.45)] active:scale-95"
          >
            Email me
          </Link>
        </div>
      </section>
      </div>
    </AboutMatrixShell>
  );
}
