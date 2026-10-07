"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitWords } from "@/components/motion/split-text";
import { CurrentlyCard } from "@/components/portfolio/currently-card";

/**
 * The quiet beat after the hero: one plain sentence about the work, lit word by word as it
 * travels up the screen, with what's happening right now beside it.
 */
export function HomeStatement() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-statement] [data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-statement]", start: "top 82%", end: "bottom 48%", scrub: true },
          }
        );
        gsap.fromTo(
          "[data-statement-meta]",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: EASE.cinematic,
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-statement]", start: "bottom 80%", once: true },
          }
        );
        gsap.fromTo(
          "[data-statement-card]",
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: EASE.cinematic,
            scrollTrigger: { trigger: "[data-statement-card]", start: "top 88%", once: true },
          }
        );
      });
    },
    root
  );

  return (
    <section
      ref={root}
      id="intro"
      aria-label="Introduction"
      className="mx-auto max-w-screen-2xl scroll-mt-[calc(env(safe-area-inset-top)+5rem)] px-5 py-28 sm:px-6 md:px-8 md:py-44 lg:px-10"
    >
      <div className="grid items-end gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p
            data-statement
            className="font-headline text-[clamp(2rem,4.3vw,4.25rem)] font-light leading-[1.08] tracking-[-0.02em] text-white [text-wrap:balance]"
          >
            <SplitWords text="I build" />{" "}
            <SplitWords text="agentic AI systems" wordClassName="font-bold" />{" "}
            <SplitWords text="and the infrastructure that carries them into" />{" "}
            <SplitWords text="production." wordClassName="font-bold" />
          </p>
          <div className="mt-12 flex max-w-3xl flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-12">
            <p
              data-statement-meta
              className="max-w-[48ch] text-base font-light leading-relaxed text-on-surface-variant md:text-lg [text-wrap:pretty]"
            >
              Computer Science and Statistics &amp; Data Science at UT Austin, graduating May 2028.
              I&apos;ve shipped at Humana, the PGA of America, and Krowe, where I&apos;m the founding
              engineer.
            </p>
            <div data-statement-meta className="shrink-0">
              <Link
                href="/about"
                className="font-label group inline-flex items-center gap-2 border-b border-white/25 pb-1.5 text-xs uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
              >
                More about me
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
        <div data-statement-card className="w-full max-w-md lg:col-span-4 lg:max-w-none lg:justify-self-end">
          <CurrentlyCard />
        </div>
      </div>
    </section>
  );
}
