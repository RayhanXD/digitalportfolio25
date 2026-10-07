"use client";

import { useRef } from "react";
import Image from "next/image";
import { countUp, EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { INTRO_STATS } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

/** Matches `public/about-portrait.png` pixel dimensions. */
const PORTRAIT = { width: 1024, height: 650 } as const;


export function AboutIntro() {
  const root = useRef<HTMLDivElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const introReady = usePlayOnIntro(intro);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.cinematic } });
        tl.fromTo(
          "[data-intro-portrait]",
          { clipPath: "inset(100% 0% 0% 0% round 8px)" },
          { clipPath: "inset(0% 0% 0% 0% round 8px)", duration: 1.6 },
          0.35
        )
          .fromTo("[data-intro-portrait-img]", { scale: 1.35 }, { scale: 1.1, duration: 2.2 }, 0.35)
          .fromTo("[data-intro-lede]", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2 }, 0.7)
          .fromTo("[data-intro-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4 }, 0.85)
          .fromTo(
            "[data-intro-stat]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
            0.9
          )
          .fromTo("[data-intro-caption]", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el, i) => {
          const decimals = Number(el.dataset.decimals ?? 0);
          tl.add(countUp(el, Number(el.dataset.count), { decimals }), 1 + i * 0.08);
        });
        intro.current = tl;
        if (introReady.current) tl.play();

        gsap.fromTo(
          "[data-intro-portrait-img]",
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-intro-portrait]",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        return () => {
          intro.current = null;
        };
      });
    },
    root
  );

  return (
    <section id="intro" className="relative">
      <ChapterBand kicker="01 — Intro" lines={["Building", "at scale."]} as="h1" introDriven />
      <div ref={root} className={chapterBody}>
        <div className={cn(chapterInner, "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10")}>
          <div className="lg:col-span-7">
            <p
              data-intro-lede
              className="max-w-2xl text-xl font-light leading-relaxed text-neutral-200 md:text-2xl"
            >
              I&apos;m Rayhan — B.S. Computer Science and Statistics &amp; Data Science at UT
              Austin. I ship production AI: Vertex multi-agent platforms at Humana, a $300K-backed
              agentic marketplace at Krowe, RAG systems at PGA, and genomic ML on TACC HPC — always
              with CI/CD, evals, and measurable impact.
            </p>
            <div
              data-intro-rule
              className="mt-12 h-px origin-left bg-white/10"
              aria-hidden
            />
            <ul className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {INTRO_STATS.map((stat) => (
                <li key={stat.label} data-intro-stat>
                  <p className="font-headline text-4xl font-bold tabular-nums tracking-tight text-white md:text-5xl">
                    {stat.prefix}
                    {typeof stat.value === "number" ? (
                      <span data-count={stat.value} data-decimals={stat.decimals ?? 0}>
                        {stat.value.toFixed(stat.decimals ?? 0)}
                      </span>
                    ) : (
                      stat.value
                    )}
                    <span className="text-secondary-singularity">{stat.suffix}</span>
                  </p>
                  <p className="font-label mt-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <figure className="lg:col-span-5">
            <div
              data-intro-portrait
              className="relative overflow-hidden rounded-lg bg-surface-container-low"
              style={{ aspectRatio: `${PORTRAIT.width} / ${PORTRAIT.height}` }}
            >
              <div data-intro-portrait-img className="absolute inset-0">
                <Image
                  src="/about-portrait.png"
                  alt="Rayhan Mohammad"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 32rem"
                  priority
                />
              </div>
            </div>
            <figcaption
              data-intro-caption
              className="font-label mt-4 flex justify-between text-[10px] uppercase tracking-[0.3em] text-neutral-500"
            >
              <span>Austin, TX</span>
              <span>UT Austin · Class of &apos;28</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
