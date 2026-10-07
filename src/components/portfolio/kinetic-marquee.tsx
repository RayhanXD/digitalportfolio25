"use client";

import { Fragment, useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ROWS = [
  ["Agentic AI", "Multi-agent systems", "RAG pipelines", "Production ML"],
  ["LangGraph", "FastAPI", "Vertex AI", "TensorFlow", "Next.js", "AWS"],
] as const;

/** Seconds for one full loop at rest */
const BASE_DURATION = [38, 46] as const;

function Row({ words, outlineEven }: { words: readonly string[]; outlineEven: boolean }) {
  // Two identical halves so a -50% shift loops seamlessly
  return (
    <div data-marquee-row className="flex w-max">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {words.map((word, i) => (
            <Fragment key={word}>
              <span
                className={cn(
                  "whitespace-nowrap px-[0.35em]",
                  (i % 2 === 0) === outlineEven ? "text-outline" : "text-white"
                )}
              >
                {word}
              </span>
              <span className="text-[0.4em] text-tertiary-singularity" aria-hidden>
                ✦
              </span>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Two bands of oversized type drifting in opposite directions. Scrolling throws them
 * faster, and scrolling back up reverses them, so the page feels like it has momentum.
 */
export function KineticMarquee() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-marquee-row]");
        const loops = rows.map((row, i) =>
          gsap.fromTo(
            row,
            { xPercent: i % 2 === 0 ? 0 : -50 },
            {
              xPercent: i % 2 === 0 ? -50 : 0,
              duration: BASE_DURATION[i],
              ease: "none",
              repeat: -1,
            }
          )
        );

        // Start deep into the loop so reversing (negative timeScale) never runs out of runway
        loops.forEach((loop) => loop.totalTime(loop.duration() * 100));

        let direction = 1;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => loops.forEach((loop) => (self.isActive ? loop.play() : loop.pause())),
          onUpdate: (self) => {
            direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 9);
            loops.forEach((loop) => {
              gsap.killTweensOf(loop);
              loop.timeScale(direction * boost);
              // Coast back down to cruising speed, keeping the latest direction
              gsap.to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out" });
            });
          },
        });
        loops.forEach((loop) => loop.pause());

        // Slight counter-skew while moving — the type leans into the speed
        gsap.fromTo(
          "[data-marquee-band]",
          { rotate: -2.5 },
          {
            rotate: 1.5,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        return () => st.kill();
      });
    },
    root
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Focus areas: Agentic AI, multi-agent systems, RAG pipelines, production ML"
    >
      <div
        data-marquee-band
        className="font-headline flex flex-col gap-2 text-[clamp(3rem,9vw,8.5rem)] font-black uppercase leading-[0.95] tracking-tighter md:gap-4"
        aria-hidden
      >
        <Row words={ROWS[0]} outlineEven={false} />
        <div className="text-[0.55em]">
          <Row words={ROWS[1]} outlineEven />
        </div>
      </div>
    </section>
  );
}
