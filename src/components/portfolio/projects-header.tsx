"use client";

import { useRef } from "react";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";
import { HeroDepthPlane } from "@/components/portfolio/hero-depth";

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
          .fromTo("[data-ph-copy]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2 }, 0.75)
          .fromTo("[data-ph-plane]", { opacity: 0 }, { opacity: 1, duration: 2.2, ease: "power2.out" }, 0.4);
        intro.current = tl;
        if (introReady.current) tl.play();

        // The header lifts away as the gallery takes over. The two words part, and the planes
        // separate: far stars lag, near dust overtakes the camera
        const desktop = window.matchMedia(MQ.desktop).matches;
        const spread = desktop ? 9 : 4;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to("[data-ph-content]", { yPercent: -25, opacity: 0 }, 0)
          .to("[data-ph-word='1']", { xPercent: -spread }, 0)
          .to("[data-ph-word='2']", { xPercent: spread }, 0)
          .to("[data-ph-depth='back']", { yPercent: 8 }, 0)
          .to("[data-ph-depth='front']", { yPercent: desktop ? -30 : -16, scale: 1.25 }, 0);

        // Pointer depth: each plane follows the cursor by its own distance (mouse/trackpad only)
        if (desktop && window.matchMedia(MQ.fine).matches) {
          const planes = [
            { sel: "[data-ph-depth='back']", px: 8 },
            { sel: "[data-ph-title]", px: 16 },
            { sel: "[data-ph-depth='front']", px: 44 },
          ].flatMap(({ sel, px }) =>
            gsap.utils.toArray<HTMLElement>(sel, root.current).map((el) => ({
              px,
              x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
            }))
          );
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            planes.forEach((p) => {
              p.x(-nx * p.px);
              p.y(-ny * p.px * 0.6);
            });
          };
          window.addEventListener("pointermove", onMove);
          return () => {
            window.removeEventListener("pointermove", onMove);
            intro.current = null;
          };
        }

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
      className="relative mb-12 overflow-hidden md:mb-0 md:min-h-[calc(100svh-4.75rem-env(safe-area-inset-top))]"
    >
      {/* Far plane: stars over the footage, behind the title */}
      <div
        data-ph-depth="back"
        data-ph-plane
        aria-hidden
        className="pointer-events-none absolute -inset-[6%] hidden mix-blend-screen will-change-transform md:block"
      >
        <HeroDepthPlane kind="stars" className="opacity-60" />
      </div>

      <div
        data-ph-content
        className="relative mx-auto max-w-screen-2xl px-5 sm:px-6 md:flex md:min-h-[calc(100svh-4.75rem-env(safe-area-inset-top))] md:flex-col md:justify-center md:px-8 lg:px-10"
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
          <span data-ph-word="1" className="inline-block [clip-path:inset(-20%_-10%_0_-10%)]">
            <SplitChars text="SELECTED" />
          </span>{" "}
          <span data-ph-word="2" className="inline-block">
            <span data-ph-fill className="text-outline-fill">
              WORK
            </span>
          </span>
        </h1>
        <div data-ph-rule className="mb-8 h-0.5 w-24 origin-left bg-secondary-singularity" />
        <p data-ph-copy className="max-w-xl text-lg leading-relaxed text-neutral-300">
          Agentic tooling that patches breaking API changes, multi-agent orchestration, campus-scale
          search, and multimodal ML — built for measurable impact.
        </p>
      </div>

      {/* Near plane: out-of-focus dust in front of the title; it overtakes everything on scroll */}
      <div
        data-ph-depth="front"
        data-ph-plane
        aria-hidden
        className="pointer-events-none absolute -inset-[8%] z-[5] will-change-transform"
      >
        <HeroDepthPlane kind="dust" />
      </div>
    </header>
  );
}
