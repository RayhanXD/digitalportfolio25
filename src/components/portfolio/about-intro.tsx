"use client";

import { useRef } from "react";
import Image from "next/image";
import { countUp, EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { INTRO_STATS } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

/**
 * `public/about-portrait-subject.png`: Rayhan lifted out of `about-portrait.png` with macOS
 * Vision subject lifting (matte choked ~1px so the bright backdrop doesn't fringe on black).
 */
const SUBJECT = { src: "/about-portrait-subject.png", width: 298, height: 485 } as const;

/*
 * Desktop geometry, all in units of the title's font size (--t) so the overlap holds at every
 * width. The subject stands at the end of the title: hair meeting the G of BUILDING, a shoulder
 * passing in front of the final E. The band's top padding and kicker are matched from ChapterBand.
 */
const BAND_TOP = "clamp(6rem,16vh,10rem) + 2.8rem";
const BAND_BOTTOM = "clamp(2rem,6vh,4rem)";
const subjectBox = {
  left: "calc(13rem + var(--t) * 3.95)",
  top: `calc(${BAND_TOP} + var(--t) * 0.12)`,
  height: "calc(var(--t) * 3.3)",
  aspectRatio: `${SUBJECT.width} / ${SUBJECT.height}`,
};
/** How far the subject reaches below the band, so the copy column keeps clear of it */
const subjectOverhang = `calc(var(--t) * 1.78 - ${BAND_BOTTOM})`;

/** Daylight portrait onto a night page: pulled down a touch, and a real shadow onto the letters */
const subjectFinish =
  "[filter:brightness(0.93)_contrast(1.05)_drop-shadow(-18px_26px_34px_rgba(0,0,0,0.6))] [mask-image:linear-gradient(to_bottom,#000_66%,transparent_97%)]";

export function AboutIntro() {
  const section = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const introReady = usePlayOnIntro(intro);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = section.current!;

        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.cinematic } });
        // The title rises first (ChapterBand's own intro); then he steps in front of it
        tl.fromTo("[data-intro-subject]", { opacity: 0, yPercent: 7 }, { opacity: 1, yPercent: 0, duration: 1.8 }, 0.55)
          .fromTo("[data-intro-figure]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, 0.5)
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

        // Depth on scroll: the nearer plane outruns the page, so he rises further over the title
        gsap.fromTo(
          "[data-intro-subject-plane]",
          { yPercent: 0, scale: 1 },
          {
            yPercent: -11,
            scale: 1.03,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
          }
        );

        // Depth on the pointer: the title and the subject shift by different distances, the
        // shader behind them not at all. Mouse and trackpad only.
        if (window.matchMedia(MQ.fine).matches) {
          const planes = [
            { targets: root.querySelectorAll("[data-band-title]"), px: 7 },
            { targets: root.querySelectorAll("[data-intro-subject-plane]"), px: 22 },
          ].flatMap(({ targets, px }) =>
            Array.from(targets).map((el) => ({
              px,
              x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
            }))
          );
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            planes.forEach((plane) => {
              plane.x(-nx * plane.px);
              plane.y(-ny * plane.px * 0.5);
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
    section
  );

  return (
    <section
      ref={section}
      id="intro"
      className="relative [--t:clamp(3.25rem,15vw,15rem)] lg:[--t:clamp(3.25rem,13vw,15rem)]"
    >
      <ChapterBand kicker="01 — Intro" lines={["Building", "at scale."]} as="h1" introDriven />

      {/* Desktop: standing in front of the title. A sibling above the band, never inside it,
          so the knockout's blend with the shader stays intact. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden lg:block">
        <div className={cn(chapterInner, "relative")}>
          <div data-intro-subject className="absolute" style={subjectBox}>
            <div data-intro-subject-plane className="relative h-full w-full origin-bottom will-change-transform">
              <Image
                src={SUBJECT.src}
                alt="Rayhan Mohammad"
                fill
                priority
                sizes="(min-width: 1024px) 30rem, 1px"
                className={cn("object-contain object-bottom", subjectFinish)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={chapterBody}>
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
            {/* Phones and tablets: the title stays clear above, and he stands under the copy */}
            <div
              data-intro-figure
              className="relative mx-auto w-[min(70vw,22rem)] lg:hidden"
              style={{ aspectRatio: `${SUBJECT.width} / ${SUBJECT.height}` }}
            >
              <Image
                src={SUBJECT.src}
                alt="Rayhan Mohammad"
                fill
                sizes="(max-width: 1023px) 70vw, 1px"
                className={cn("object-contain object-bottom", subjectFinish)}
              />
            </div>
            {/* Desktop: room for the figure standing in front of the title above */}
            <div aria-hidden className="hidden lg:block" style={{ height: subjectOverhang }} />
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
