"use client";

import { useRef } from "react";
import { countUp, EASE, gsap, MQ, revealOnScroll, scrubTextFill, useGsap } from "@/lib/motion";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { EDUCATION } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

export function AboutEducation() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        revealOnScroll("[data-edu-school]", "[data-edu-degrees]");
        gsap.fromTo(
          "[data-edu-degree]",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.3,
            ease: EASE.cinematic,
            stagger: 0.14,
            scrollTrigger: { trigger: "[data-edu-degrees]", start: "top 85%", once: true },
          }
        );
        revealOnScroll("[data-edu-class]", "[data-edu-degrees]", { delay: 0.4 });

        // GPA counts up while its outline fills in
        const gpa = root.current!.querySelector<HTMLElement>("[data-edu-gpa]")!;
        scrubTextFill(gpa, gpa, { start: "top 90%", end: "top 45%" });
        gsap
          .timeline({ scrollTrigger: { trigger: gpa, start: "top 85%", once: true } })
          .add(countUp(gpa, EDUCATION.gpa, { decimals: 1, duration: 2 }));

        gsap.fromTo(
          "[data-edu-rule]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: "[data-edu-research]", start: "top 85%", once: true },
          }
        );
        revealOnScroll("[data-edu-research] [data-edu-copy]", "[data-edu-research]", {
          stagger: 0.1,
          delay: 0.2,
        });
      });
    },
    root
  );

  const { research } = EDUCATION;

  return (
    <section id="education" className="relative">
      <ChapterBand kicker="05 — Education & research" lines={["Education"]} />
      <div ref={root} className={chapterBody}>
        <div className={cn(chapterInner, "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10")}>
          <div data-edu-degrees className="lg:col-span-7">
            <p
              data-edu-school
              className="font-label mb-8 text-[11px] uppercase tracking-[0.35em] text-secondary-singularity"
            >
              {EDUCATION.school}
            </p>
            <ul className="space-y-2">
              {EDUCATION.degrees.map((degree, i) => (
                <li key={degree} className="overflow-hidden pb-1">
                  <p
                    data-edu-degree
                    className="font-headline text-[clamp(2rem,4.4vw,4.25rem)] font-bold leading-[1.02] tracking-tight text-white"
                  >
                    {i > 0 ? <span className="text-tertiary-singularity">+ </span> : null}
                    {degree}
                  </p>
                </li>
              ))}
            </ul>
            <p
              data-edu-class
              className="font-label mt-8 text-[10px] uppercase tracking-[0.3em] text-neutral-500"
            >
              Class of {EDUCATION.graduation} · Dual degree
            </p>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <p className="font-headline text-[clamp(7rem,16vw,15rem)] font-black leading-[0.8] tracking-tighter">
              <span data-edu-gpa className="text-outline-fill">
                {EDUCATION.gpa.toFixed(1)}
              </span>
            </p>
            <p className="font-label mt-4 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
              Cumulative GPA
            </p>
          </div>

          <article data-edu-research className="relative grid grid-cols-1 gap-6 pt-10 md:grid-cols-12 lg:col-span-12">
            <span
              data-edu-rule
              className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
              aria-hidden
            />
            <div data-edu-copy className="md:col-span-3">
              <p className="font-label text-[10px] uppercase tracking-[0.35em] text-secondary-singularity">
                Research
              </p>
              <p className="font-label mt-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                {research.dates}
              </p>
            </div>
            <div data-edu-copy className="md:col-span-5">
              <h3 className="font-headline text-2xl font-bold text-white md:text-3xl">
                {research.title}
              </h3>
              <p className="mt-2 text-neutral-400">{research.lab}</p>
            </div>
            <p
              data-edu-copy
              className="text-base font-light leading-relaxed text-on-surface-variant md:col-span-4"
            >
              {research.body}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
