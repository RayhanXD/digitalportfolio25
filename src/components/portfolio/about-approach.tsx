"use client";

import { useRef } from "react";
import { EASE, gsap, MQ, revealOnScroll, scrubTextFill, useGsap } from "@/lib/motion";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { FOCUS_AREAS, PRINCIPLES } from "@/components/portfolio/about-data";

export function AboutApproach() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-principle]").forEach((row) => {
          gsap.fromTo(
            row.querySelector("[data-principle-rule]"),
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.4,
              ease: EASE.cinematic,
              scrollTrigger: { trigger: row, start: "top 85%", once: true },
            }
          );
          // Each principle fills from outline to solid as it reaches the reading line
          scrubTextFill(row.querySelector("[data-principle-word]"), row, {
            start: "top 85%",
            end: "top 45%",
          });
          revealOnScroll(row.querySelectorAll("[data-principle-copy]"), row, { delay: 0.15 });
        });
        revealOnScroll("[data-focus-label]", "[data-focus]");
        gsap.fromTo(
          "[data-focus-item]",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: EASE.cinematic,
            stagger: 0.09,
            scrollTrigger: { trigger: "[data-focus]", start: "top 85%", once: true },
          }
        );
      });
    },
    root
  );

  return (
    <section id="approach" className="relative">
      <ChapterBand kicker="02 — Approach" lines={["Approach"]} />
      <div ref={root} className={chapterBody}>
        <div className={chapterInner}>
          <ol>
            {PRINCIPLES.map((principle, i) => (
              <li
                key={principle.word}
                data-principle
                className="relative grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-end md:gap-10 md:py-14"
              >
                <span
                  data-principle-rule
                  className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
                  aria-hidden
                />
                <span
                  data-principle-copy
                  className="font-label text-xs tabular-nums text-neutral-500 md:col-span-1 md:pb-3"
                >
                  0{i + 1}
                </span>
                <h3 className="font-headline text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.85] tracking-tighter md:col-span-6">
                  <span data-principle-word className="text-outline-fill">
                    {principle.word}
                  </span>
                </h3>
                <p
                  data-principle-copy
                  className="max-w-md text-lg font-light leading-relaxed text-on-surface-variant md:col-span-5 md:pb-2"
                >
                  {principle.body}
                </p>
              </li>
            ))}
          </ol>

          <div data-focus className="border-t border-white/10 pt-10">
            <p
              data-focus-label
              className="font-label mb-6 text-[10px] uppercase tracking-[0.35em] text-secondary-singularity"
            >
              Current focus
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 font-headline text-2xl font-bold tracking-tight text-white md:text-4xl">
              {FOCUS_AREAS.map((area, i) => (
                <li key={area} className="flex items-center gap-5 overflow-hidden pb-1">
                  <span data-focus-item className="inline-block">
                    {area}
                  </span>
                  {i < FOCUS_AREAS.length - 1 ? (
                    <span className="text-sm text-tertiary-singularity" aria-hidden>
                      ✦
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
