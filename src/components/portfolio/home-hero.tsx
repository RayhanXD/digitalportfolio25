"use client";

import Link from "next/link";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { ChevronDown } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden void-gradient px-6 md:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 accretion-disk-glow" />
        <div className="absolute inset-0 opacity-90">
          <ShaderAnimation className="min-h-screen opacity-80" />
        </div>
        <div className="absolute left-1/4 top-1/3 size-[400px] rounded-full bg-tertiary-singularity/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-singularity/20 blur-[120px]" />
      </div>

      <div className="relative z-10 text-center">
        <span className="font-label mb-6 block text-sm uppercase tracking-[0.4em] text-secondary-singularity">
          Full-stack · ML · Agentic AI
        </span>
        <h1 className="font-headline text-[clamp(4rem,15vw,12rem)] font-black leading-[0.8] tracking-tighter text-white">
          RAYHAN MOHAMMAD
        </h1>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
          <Link
            href="/contact"
            className="font-label rounded bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-on-primary-fixed transition-all duration-500 hover:shadow-[0_0_30px_rgba(120,180,232,0.45)] active:scale-95"
          >
            Get in touch
          </Link>
          <Link
            href="/projects"
            className="font-label rounded border border-white/20 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/5"
          >
            View projects
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <a href="#work" aria-label="Scroll to work">
          <ChevronDown className="size-8 text-white/40" />
        </a>
      </div>
    </section>
  );
}
