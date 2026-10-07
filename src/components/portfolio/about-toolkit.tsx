"use client";

import { useRef } from "react";
import { EASE, gsap, MQ, revealOnScroll, useGsap } from "@/lib/motion";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { TOOLKIT } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

export function AboutToolkit() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const spread = desktop ? 1 : 0.5;
        gsap.utils.toArray<HTMLElement>("[data-tool-group]").forEach((group) => {
          revealOnScroll(group.querySelector("[data-tool-heading]"), group);
          // Tools fly in from a scatter and settle into the grid
          gsap.from(group.querySelectorAll("[data-tool]"), {
            x: () => gsap.utils.random(-90, 90) * spread,
            y: () => gsap.utils.random(60, 180) * spread,
            rotate: () => gsap.utils.random(-20, 20),
            scale: 0.7,
            opacity: 0,
            duration: 1.4,
            ease: EASE.cinematic,
            stagger: { each: 0.045, from: "random" },
            scrollTrigger: { trigger: group, start: "top 80%", once: true },
          });
        });
      });
    },
    root
  );

  return (
    <section id="toolkit" className="relative">
      <ChapterBand kicker="06 — Toolkit" lines={["Toolkit"]} />
      <div ref={root} className={chapterBody}>
        <div className={cn(chapterInner, "grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-12")}>
          {TOOLKIT.map((group) => (
            <div key={group.group} data-tool-group>
              <h3
                data-tool-heading
                className="font-label mb-6 border-b border-white/10 pb-4 text-[10px] uppercase tracking-[0.35em] text-secondary-singularity"
              >
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    data-tool
                    className="font-label cursor-default border border-white/10 px-5 py-3 text-xs uppercase tracking-widest text-white transition-[background-color,border-color,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-secondary-singularity/40 hover:bg-white/5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
