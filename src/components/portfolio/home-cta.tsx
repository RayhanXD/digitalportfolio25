"use client";

import { useRef } from "react";
import Link from "next/link";
import { EASE, gsap, MQ, revealOnScroll, scrubTextFill, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";

export function HomeCta() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-cta-title] [data-char]",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.3,
            ease: EASE.cinematic,
            stagger: 0.05,
            scrollTrigger: { trigger: "[data-cta-title]", start: "top 88%", once: true },
          }
        );
        // The page ends shortly below this title, so the fill completes higher than usual
        scrubTextFill("[data-cta-fill]", "[data-cta-title]", { start: "top 92%", end: "top 62%" });
        revealOnScroll(["[data-cta-copy]", "[data-cta-email]"], "[data-cta-copy]", { stagger: 0.12 });
        gsap.fromTo(
          "[data-cta-underline]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: EASE.cinematic,
            delay: 0.35,
            scrollTrigger: { trigger: "[data-cta-email]", start: "top 90%", once: true },
          }
        );
      });
    },
    root
  );

  return (
    <section
      ref={root}
      id="home-cta"
      className="relative overflow-hidden py-28 text-center md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-6 md:px-8 lg:px-10">
        <h2
          data-cta-title
          className="font-headline mb-10 text-5xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl"
        >
          <span className="inline-block [clip-path:inset(-20%_-10%_0_-10%)]">
            <SplitChars text="LET'S" />
          </span>{" "}
          <span data-cta-fill className="text-outline-fill">
            BUILD
          </span>
        </h2>
        <p
          data-cta-copy
          className="mx-auto mb-10 max-w-xl text-lg font-light italic text-on-surface-variant"
        >
          Open to internships, research, and teams shipping agentic AI, ML infrastructure, and
          full-stack product.
        </p>
        <div data-cta-email>
          <Magnetic strength={0.18}>
            <Link
              className="font-headline group relative inline-block pb-3 text-2xl font-bold text-white transition-colors duration-300 hover:text-tertiary-singularity md:text-3xl"
              href="mailto:rayriz.mohammad@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              RAYRIZ.MOHAMMAD@GMAIL.COM
              <span
                data-cta-underline
                className="absolute inset-x-0 bottom-0 h-1 origin-left bg-tertiary-singularity"
                aria-hidden
              />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
