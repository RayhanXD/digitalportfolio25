"use client";

import { useRef } from "react";
import { countUp, EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { useSpotlight } from "@/components/motion/use-spotlight";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { HEADLINE_WINS, WINS } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

export function AboutWins() {
  const root = useRef<HTMLDivElement>(null);
  useSpotlight(root);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.cinematic },
          scrollTrigger: { trigger: "[data-wins-headline]", start: "top 80%", once: true },
        });
        tl.fromTo("[data-wins-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, stagger: 0.15 }, 0)
          .fromTo("[data-win-divider]", { scaleY: 0 }, { scaleY: 1, duration: 1.2 }, 0.2)
          .fromTo(
            "[data-win-number]",
            { yPercent: 105 },
            { yPercent: 0, duration: 1.3, stagger: 0.15 },
            0.1
          )
          .fromTo(
            "[data-win-copy]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
            0.45
          );

        const strip = gsap.timeline({
          defaults: { ease: EASE.cinematic },
          scrollTrigger: { trigger: "[data-wins-strip]", start: "top 85%", once: true },
        });
        strip.fromTo(
          "[data-win-small]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 },
          0
        );
        gsap.utils.toArray<HTMLElement>("[data-win-count]").forEach((el, i) => {
          strip.add(countUp(el, Number(el.dataset.winCount)), 0.1 + i * 0.08);
        });
      });
    },
    root
  );

  return (
    <section id="wins" className="relative">
      <ChapterBand kicker="04 — Wins" lines={["Wins"]} />
      <div ref={root} className={chapterBody}>
        <div className={chapterInner}>
          <div data-wins-headline className="relative grid grid-cols-1 md:grid-cols-2">
            <span
              data-wins-rule
              className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
              aria-hidden
            />
            <span
              data-win-divider
              className="absolute inset-y-0 left-1/2 hidden w-px origin-top bg-white/10 md:block"
              aria-hidden
            />
            {HEADLINE_WINS.map((win, i) => (
              <article
                key={win.title}
                className={cn(
                  "spotlight relative py-12 md:py-16",
                  i === 0 ? "md:pr-12" : "border-t border-white/10 md:border-t-0 md:pl-12"
                )}
              >
                <div className="overflow-hidden">
                  <p
                    data-win-number
                    className="font-headline text-[clamp(5.5rem,12vw,11rem)] font-black leading-[0.85] tracking-tighter text-white"
                  >
                    {win.value}
                    <span className="text-tertiary-singularity">{win.suffix}</span>
                    {win.of ? (
                      <span className="ml-3 align-top text-[0.32em] font-bold tracking-tight text-neutral-500">
                        {win.of}
                      </span>
                    ) : null}
                  </p>
                </div>
                <h3 data-win-copy className="font-headline mt-8 text-xl font-bold text-white md:text-2xl">
                  {win.title}
                </h3>
                <p data-win-copy className="mt-2 max-w-md text-neutral-400">
                  {win.detail}
                </p>
              </article>
            ))}
          </div>

          <ul
            data-wins-strip
            className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4"
          >
            {WINS.map((win, i) => (
              <li
                key={win.title}
                data-win-small
                className={cn(
                  "py-8 md:py-10",
                  i % 2 === 1 && "border-l border-white/10 pl-6",
                  i > 0 && "md:border-l md:border-white/10 md:pl-8",
                  i > 1 && "border-t border-white/10 md:border-t-0"
                )}
              >
                <p className="font-headline text-4xl font-bold tabular-nums tracking-tight text-white md:text-5xl">
                  {win.prefix}
                  <span data-win-count={win.value}>{win.value.toLocaleString("en-US")}</span>
                  <span className="text-secondary-singularity">{win.suffix}</span>
                </p>
                <p className="font-label mt-3 text-[10px] uppercase tracking-[0.3em] text-white/80">
                  {win.title}
                </p>
                <p className="mt-1 text-xs text-neutral-500">{win.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
