import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { AboutMatrixShell } from "@/components/portfolio/about-matrix-shell";
import { AboutExperienceSection } from "@/components/portfolio/about-experience-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rayhan Mohammad — software engineer shipping agentic AI platforms, RAG pipelines, and production ML systems. UT Austin, GPA 4.0.",
};

/** Matches `public/about-portrait.png` pixel dimensions. */
const ABOUT_PORTRAIT = { width: 1024, height: 650 } as const;

const skills = [
  "Python",
  "TypeScript",
  "React",
  "FastAPI",
  "LangGraph",
  "TensorFlow",
  "Keras",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Azure DevOps",
  "RAG",
];

export default function AboutPage() {
  return (
    <AboutMatrixShell>
      <>
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
              I&apos;m Rayhan — B.S. Computer Science and Statistics &amp; Data Science at UT Austin
              (GPA 4.0, May 2028). I ship production AI: Vertex multi-agent platforms at Humana,
              a $300K-backed agentic marketplace at Krowe, RAG systems at PGA, and genomic ML on
              TACC HPC — always with CI/CD, evals, and measurable impact.
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
            I care about end-to-end ownership: ship, instrument, iterate. That came from raising
            $300K as founding engineer at Krowe, deploying enterprise AI across Humana L2 teams,
            and running statistical validation pipelines in genomics research — clear APIs,
            reproducible workflows, and telemetry so features stay reliable after launch.
          </p>
          <p>
            Recent focus:{" "}
            <span className="font-medium text-white">
              agentic tooling (SelfPI), multi-agent orchestration (LangGraph, Vertex AI), RAG and
              embeddings, and statistical validation at scale
            </span>
            — with latency and correctness as hard constraints.
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

      <AboutExperienceSection />
      </div>

      <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip bg-black/60 pb-[max(5rem,env(safe-area-inset-bottom))] pt-20 text-center backdrop-blur-md md:pb-[max(6rem,env(safe-area-inset-bottom))] md:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-1/2 -top-1/2 size-full bg-secondary-singularity blur-[160px]" />
          <div className="absolute -bottom-1/2 -right-1/2 size-full bg-tertiary-singularity blur-[160px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-screen-2xl px-5 sm:px-6 md:px-8 lg:px-10">
          <h2 className="font-headline mb-8 text-4xl font-extrabold tracking-tighter text-white md:text-6xl lg:text-7xl">
            LET&apos;S CONNECT.
          </h2>
          <p className="mx-auto mb-10 max-w-xl font-light text-neutral-300">
            Open to software and ML engineering roles — especially agentic AI platforms, RAG
            infrastructure, full-stack product, and data-intensive systems.
          </p>
          <Link
            href="mailto:rayriz.mohammad@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label inline-block bg-white px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary-fixed transition-all duration-300 hover:shadow-[0_0_30px_rgba(120,180,232,0.45)] active:scale-95"
          >
            Email me
          </Link>
        </div>
      </section>
      </>
    </AboutMatrixShell>
  );
}
