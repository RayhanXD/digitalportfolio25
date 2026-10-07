"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, MQ, revealOnScroll, useGsap } from "@/lib/motion";
import { Magnetic } from "@/components/motion/magnetic";
import { ChapterBand, chapterInner } from "@/components/portfolio/chapter-band";
import { cn } from "@/lib/utils";

export function AboutCta() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        revealOnScroll(["[data-cta-copy]", "[data-cta-action]"], root.current!, { stagger: 0.12 });

        // The homepage's horizon closes this page too: it draws out under the title, then its
        // light comes up, finishing exactly as the page runs out
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
          })
          .fromTo("[data-cta-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, 0)
          .fromTo("[data-cta-flare]", { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.5 }, 0.45);
      });
    },
    root
  );

  return (
    <section id="about-cta" className="relative">
      <ChapterBand kicker="End of file — Next: contact" lines={["Let’s", "connect."]} />
      <div
        ref={root}
        className="bg-void pb-[max(6rem,calc(env(safe-area-inset-bottom)+4rem))] md:pb-[max(8rem,calc(env(safe-area-inset-bottom)+5rem))]"
      >
        <div className={chapterInner}>
          <div aria-hidden className="pointer-events-none relative mb-12 flex items-center md:mb-16">
            <div data-cta-line className="horizon-line w-full origin-left" />
            <div data-cta-flare className="horizon-flare absolute left-[22%] top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div
          className={cn(
            chapterInner,
            "flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          )}
        >
          <p data-cta-copy className="max-w-xl text-lg font-light leading-relaxed text-neutral-300">
            Open to software and ML engineering roles — especially agentic AI platforms, RAG
            infrastructure, full-stack product, and data-intensive systems.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-4 whitespace-nowrap">
            <div data-cta-action>
              <Magnetic>
                <Link
                  href="/contact"
                  className="font-label flex items-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary-fixed transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(120,180,232,0.45)] active:scale-95"
                >
                  Send a signal
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </Magnetic>
            </div>
            <div data-cta-action>
              <Magnetic>
                <a
                  href="mailto:rayriz.mohammad@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label block border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white/5"
                >
                  Email me
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
