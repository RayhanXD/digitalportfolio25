"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, revealOnScroll, scrubTextFill, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { useSpotlight } from "@/components/motion/use-spotlight";

const cardRevealFrom = "inset(100% 0% 0% 0% round 8px)";
const cardRevealTo = "inset(0% 0% 0% 0% round 8px)";

export function HomeBento() {
  const root = useRef<HTMLElement>(null);
  useSpotlight(root);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-bento-title] [data-char]",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: EASE.cinematic,
            stagger: 0.035,
            scrollTrigger: { trigger: "[data-bento-title]", start: "top 88%", once: true },
          }
        );
        scrubTextFill("[data-bento-fill]", "[data-bento-title]");
        revealOnScroll("[data-bento-intro]", "[data-bento-title]", { delay: 0.25 });

        // Cards rise out of their bottom edge while the footage settles from a push-in
        gsap.utils.toArray<HTMLElement>("[data-bento-card]").forEach((card) => {
          const tl = gsap.timeline({
            defaults: { ease: EASE.cinematic },
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
          tl.fromTo(card, { clipPath: cardRevealFrom }, { clipPath: cardRevealTo, duration: 1.5 }, 0)
            .fromTo(card.querySelector("[data-card-media]"), { scale: 1.3 }, { scale: 1, duration: 2 }, 0)
            .fromTo(
              card.querySelectorAll("[data-card-copy]"),
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.1, stagger: 0.07 },
              0.45
            );
        });
      });
    },
    root
  );

  return (
    <section
      ref={root}
      id="work"
      className="mx-auto max-w-screen-2xl scroll-mt-[calc(env(safe-area-inset-top)+5rem)] px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:px-10"
    >
      <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2
            data-bento-title
            className="font-headline mb-6 text-5xl font-black uppercase tracking-tighter text-white md:text-6xl"
          >
            <span className="inline-block [clip-path:inset(-20%_-10%_0_-10%)]">
              <SplitChars text="Selected" />
            </span>{" "}
            <span data-bento-fill className="text-outline-fill">
              projects
            </span>
          </h2>
          <p
            data-bento-intro
            className="text-lg font-light leading-relaxed text-on-surface-variant"
          >
            Highlights from my stack — agentic tooling, multi-agent orchestration, campus-scale
            search, and production ML — the same themes you&apos;ll see in experience and research.
          </p>
        </div>
        <div data-bento-intro className="text-right">
          <p className="font-label mb-2 text-xs uppercase tracking-widest text-neutral-600">
            Graduation
          </p>
          <span className="font-headline text-3xl font-bold text-tertiary-singularity md:text-4xl">
            May &apos;28
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div
          data-bento-card
          className="spotlight group relative aspect-[16/9] overflow-hidden rounded-lg bg-surface-container-low event-horizon-glow md:col-span-8"
        >
          <div data-card-media className="absolute inset-0">
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
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 [&_h3]:drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] [&_p]:drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] [&>span]:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <span
              data-card-copy
              className="font-label mb-3 text-xs uppercase tracking-widest text-secondary-singularity"
            >
              SelfPI
            </span>
            <h3 data-card-copy className="font-headline mb-3 text-2xl font-bold text-white md:text-4xl">
              AGENTIC API TOOL
            </h3>
            <p data-card-copy className="line-clamp-2 max-w-md text-on-surface-variant">
              Detects third-party breaking changes and opens PRs patching every affected call site —
              FastAPI, React, AWS Fargate.
            </p>
          </div>
          <div data-card-copy className="absolute right-6 top-6 flex gap-2 md:right-10 md:top-10">
            <span className="rounded border border-white/10 bg-white/10 px-3 py-1 font-label text-[10px] uppercase text-white backdrop-blur-md">
              Agents
            </span>
            <span className="rounded border border-white/10 bg-white/10 px-3 py-1 font-label text-[10px] uppercase text-white backdrop-blur-md">
              AWS
            </span>
          </div>
        </div>

        <div
          data-bento-card
          className="spotlight group relative min-h-[280px] overflow-hidden rounded-lg bg-surface-container-low md:col-span-4 md:min-h-0"
        >
          <div data-card-media className="absolute inset-0">
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
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 [&_h3]:drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] [&>span]:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <span
              data-card-copy
              className="font-label mb-2 text-xs uppercase tracking-widest text-secondary-singularity"
            >
              Keystone
            </span>
            <h3
              data-card-copy
              className="font-headline text-xl font-bold uppercase text-white md:text-2xl"
            >
              Best Overall · LangGraph
            </h3>
          </div>
        </div>

        <div
          data-bento-card
          className="spotlight group relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-lg bg-black md:col-span-12"
        >
          <div data-card-media className="absolute inset-0">
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
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between p-6 md:p-10 [&_h3]:drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] [&_span]:drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            <div>
              <span
                data-card-copy
                className="font-label mb-2 block text-xs uppercase tracking-widest text-neutral-300"
              >
                Full portfolio
              </span>
              <h3
                data-card-copy
                className="font-headline text-2xl font-bold uppercase text-white md:text-3xl"
              >
                All projects
              </h3>
            </div>
            <div data-card-copy className="pointer-events-auto">
              <Magnetic strength={0.4}>
                <Link
                  href="/projects"
                  className="flex size-14 items-center justify-center rounded border border-white/20 backdrop-blur-sm transition-colors hover:bg-white hover:text-black md:size-16"
                  aria-label="View projects"
                >
                  <ArrowUpRight className="size-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
