"use client";

import { useRef } from "react";
import { EASE, gsap, MQ, revealOnScroll, useGsap } from "@/lib/motion";
import { SplitWords } from "@/components/motion/split-text";
import { CurrentlyCard } from "@/components/portfolio/currently-card";

const stats = [
  { prefix: "$", value: 300, suffix: "K", label: "Raised (Krowe)" },
  { prefix: "", value: 72, suffix: "%", label: "Faster certs (Humana)" },
  { prefix: "", value: 500, suffix: "+", label: "Engineers (PGA)" },
] as const;

export function HomeStats() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        revealOnScroll("[data-stats-eyebrow]", "[data-stats-quote]");

        // The quote brightens word by word as it travels up the viewport
        gsap.fromTo(
          "[data-stats-quote] [data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: "[data-stats-quote]",
              start: "top 82%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );

        const tl = gsap.timeline({
          defaults: { ease: EASE.cinematic },
          scrollTrigger: { trigger: "[data-stats-grid]", start: "top 88%", once: true },
        });
        tl.fromTo("[data-stats-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.6 }, 0).fromTo(
          "[data-stat]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 },
          0.2
        );
        gsap.utils.toArray<HTMLElement>("[data-stat-value]").forEach((el, i) => {
          const target = Number(el.dataset.statValue);
          const counter = { n: 0 };
          el.textContent = "0";
          tl.to(
            counter,
            {
              n: target,
              duration: 1.8,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.n));
              },
            },
            0.25 + i * 0.1
          );
        });

        gsap.fromTo(
          "[data-stats-card]",
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: "[data-stats-card]", start: "top 90%", once: true },
          }
        );
      });
    },
    root
  );

  return (
    <section
      ref={root}
      className="border-y border-white/5 px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:px-10"
    >
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-12 md:flex-row md:gap-16">
        <div className="flex-1">
          <h4
            data-stats-eyebrow
            className="font-label mb-8 text-sm uppercase tracking-[0.3em] text-secondary-singularity"
          >
            In one line
          </h4>
          <p
            data-stats-quote
            className="font-headline mb-12 text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl"
          >
            <SplitWords text="“SHIP END-TO-END — FROM" />{" "}
            <SplitWords text="MULTI-AGENT" wordClassName="font-black italic pr-[0.08em]" />{" "}
            <SplitWords text="SYSTEMS TO METRICS TEAMS TRUST.”" />
          </p>
          <div data-stats-grid className="relative grid grid-cols-3 gap-6 pt-10 md:gap-8 md:pt-12">
            <div
              data-stats-rule
              className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
              aria-hidden
            />
            {stats.map((stat) => (
              <div key={stat.label} data-stat>
                <span className="font-headline block text-xl font-bold tabular-nums text-white md:text-2xl">
                  {stat.prefix}
                  <span data-stat-value={stat.value}>{stat.value}</span>
                  {stat.suffix}
                </span>
                <span className="font-label text-[10px] uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div data-stats-card className="w-full max-w-md md:w-auto md:max-w-none">
          <CurrentlyCard />
        </div>
      </div>
    </section>
  );
}
