"use client";

import { useRef } from "react";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";

export function ProjectsHeader() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const introReady = usePlayOnIntro(intro);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.cinematic } });
        tl.fromTo("[data-ph-label]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1 }, 0)
          .fromTo(
            "[data-ph-title] [data-char]",
            { yPercent: 110 },
            { yPercent: 0, duration: 1.4, stagger: 0.04 },
            0.1
          )
          // "WORK" fills from outline to solid once the letters have landed
          .fromTo(
            "[data-ph-fill]",
            { backgroundPosition: "100% 0%" },
            { backgroundPosition: "0% 0%", duration: 1.6, ease: "power2.inOut" },
            0.7
          )
          .fromTo("[data-ph-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4 }, 0.6)
          .fromTo("[data-ph-copy]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2 }, 0.75);
        intro.current = tl;
        if (introReady.current) tl.play();

        // The header lifts away as the gallery takes over
        gsap.to(root.current, {
          yPercent: -25,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          intro.current = null;
        };
      });
    },
    root
  );

  return (
    <header
      ref={root}
      className="mx-auto mb-12 max-w-screen-2xl px-5 sm:px-6 md:mb-0 md:min-h-[calc(100svh-4.75rem-env(safe-area-inset-top))] md:px-8 lg:px-10 md:flex md:flex-col md:justify-center"
    >
      <p
        data-ph-label
        className="font-label mb-4 text-xs uppercase tracking-[0.35em] text-secondary-singularity"
      >
        Projects
      </p>
      <h1
        data-ph-title
        className="font-headline mb-6 text-5xl font-bold tracking-tighter text-white md:text-8xl lg:text-[10rem] lg:leading-[0.85]"
      >
        <span className="inline-block [clip-path:inset(-20%_-10%_0_-10%)]">
          <SplitChars text="SELECTED" />
        </span>{" "}
        <span data-ph-fill className="text-outline-fill">
          WORK
        </span>
      </h1>
      <div data-ph-rule className="mb-8 h-0.5 w-24 origin-left bg-secondary-singularity" />
      <p data-ph-copy className="max-w-xl text-lg leading-relaxed text-neutral-300">
        Agentic tooling that patches breaking API changes, multi-agent orchestration, campus-scale
        search, and multimodal ML — built for measurable impact.
      </p>
    </header>
  );
}
