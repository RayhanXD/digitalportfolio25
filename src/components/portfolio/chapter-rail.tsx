"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ, ScrollTrigger } from "@/lib/motion";
import { useLocomotiveScrollInstance } from "@/components/portfolio/locomotive-scroll-provider";
import { CHAPTERS } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

/**
 * Where you are in the About story. Desktop: a rail on the left whose line fills as you read.
 * Phones: a small chip under the nav with the current chapter.
 * Hidden until the first chapter is on screen and once the closing CTA takes over.
 */
export function ChapterRail() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const fillRef = useRef<HTMLSpanElement>(null);
  const chipFillRef = useRef<HTMLSpanElement>(null);
  const locomotive = useLocomotiveScrollInstance();

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el != null
    );
    if (!sections.length) return;
    const first = sections[0];
    // Set here rather than with Tailwind scale-* (the `scale` property would stack with GSAP's)
    gsap.set(fillRef.current, { scaleY: 0 });
    gsap.set(chipFillRef.current, { scaleX: 0 });
    const last = sections[sections.length - 1];

    const triggers = sections.map((section, i) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      })
    );
    const progress = ScrollTrigger.create({
      trigger: first,
      endTrigger: last,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(fillRef.current, { scaleY: self.progress });
        gsap.set(chipFillRef.current, { scaleX: self.progress });
      },
    });
    const range = ScrollTrigger.create({
      trigger: first,
      endTrigger: last,
      start: "top 60%",
      end: "bottom 40%",
      onToggle: (self) => setVisible(self.isActive),
    });

    return () => {
      triggers.forEach((t) => t.kill());
      progress.kill();
      range.kill();
    };
  }, []);

  const jump = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const reduce = window.matchMedia(MQ.reduce).matches;
    if (locomotive && !reduce) locomotive.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const current = CHAPTERS[active];

  return (
    <>
      {/*
        Compact by default (numbers + dashes) so it stays clear of the chapter titles; the labels
        slide out over a dark panel while the rail is hovered or focused.
      */}
      <nav
        aria-label="About chapters"
        className={cn(
          "group/rail fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex xl:left-8",
          visible ? "opacity-100" : "pointer-events-none -translate-x-3 opacity-0"
        )}
      >
        <span
          className="pointer-events-none absolute -inset-y-4 -left-4 right-[-8.5rem] -z-10 rounded-xl border border-white/5 bg-black/75 opacity-0 backdrop-blur-md transition-opacity duration-300 group-focus-within/rail:opacity-100 group-hover/rail:opacity-100"
          aria-hidden
        />
        <span className="relative mr-4 w-px self-stretch bg-white/10" aria-hidden>
          <span
            ref={fillRef}
            className="absolute inset-0 origin-top bg-gradient-to-b from-secondary-singularity via-white to-tertiary-singularity"
          />
        </span>
        <ol className="flex flex-col gap-4 py-1">
          {CHAPTERS.map((chapter, i) => {
            const isActive = i === active;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => jump(chapter.id)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "group relative flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.3em] transition-colors duration-500",
                    isActive ? "text-white" : "text-white/30 hover:text-white/80"
                  )}
                >
                  <span className="tabular-nums">{chapter.number}</span>
                  <span
                    className={cn(
                      "h-px bg-current transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "w-5" : "w-2 group-hover:w-3.5"
                    )}
                    aria-hidden
                  />
                  <span className="pointer-events-none absolute left-full ml-3 -translate-x-1 whitespace-nowrap opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/rail:translate-x-0 group-focus-within/rail:opacity-100 group-hover/rail:translate-x-0 group-hover/rail:opacity-100">
                    {chapter.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div
        className={cn(
          "pointer-events-none fixed left-1/2 top-[max(1.15rem,calc(env(safe-area-inset-top)+0.4rem))] z-40 -translate-x-1/2 transition-opacity duration-500 lg:hidden",
          visible ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      >
        <div className="overflow-hidden rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
          <p key={current.id} className="exp-roll font-label text-[10px] uppercase tracking-[0.3em] text-white">
            <span className="text-white/40">{current.number}</span> · {current.label}
          </p>
        </div>
        <span className="mx-auto mt-1.5 block h-px w-full overflow-hidden bg-white/10">
          <span
            ref={chipFillRef}
            className="block h-full origin-left bg-gradient-to-r from-secondary-singularity via-white to-tertiary-singularity"
          />
        </span>
      </div>
    </>
  );
}
