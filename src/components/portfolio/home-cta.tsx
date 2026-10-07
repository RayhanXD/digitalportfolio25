"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, scrubTextFill, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";

const EMAIL = "rayriz.mohammad@gmail.com";
const CHANNELS = [
  { label: "GitHub", href: "https://github.com/RayhanXD" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rayhan-mohammad1" },
] as const;

/** Each line is clipped only at its bottom edge, so letters rise out from below it. */
const lineClass = "block [clip-path:inset(-50%_-100vw_0_-100vw)]";

/**
 * The bookend. The hero's composition returns: two lines of type resting on the horizon,
 * the way to reach me underneath it, while the background lifts back to the sunrise.
 * It's the last screen of the page, so it holds rather than trailing into a footer.
 */
export function HomeCta() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const enter = { trigger: root.current, start: "top 55%", once: true } as const;

        gsap
          .timeline({ defaults: { ease: EASE.cinematic }, scrollTrigger: enter })
          .fromTo('[data-cta-line="1"] [data-char]', { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: { each: 0.04, from: "center" } }, 0)
          .fromTo('[data-cta-line="2"] > span', { yPercent: 115 }, { yPercent: 0, duration: 1.4 }, 0.12)
          .fromTo("[data-cta-below]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.09 }, 0.5);

        // The horizon draws back across the screen and its light returns as the section arrives
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 30%", scrub: true },
          })
          .fromTo("[data-cta-rule]", { scaleX: 0 }, { scaleX: 1 }, 0)
          .fromTo("[data-cta-flare]", { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1 }, 0.25);

        scrubTextFill("[data-cta-fill]", root.current!, { start: "top 40%", end: "top top" });
      });
    },
    root
  );

  return (
    <section
      ref={root}
      id="home-cta"
      aria-labelledby="cta-title"
      className="relative h-[100svh] min-h-[38rem] overflow-hidden"
    >
      {/* Keeps the type legible once the background's sunrise is back behind it */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_40%,rgba(0,0,0,0.5),transparent_72%)]"
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 bottom-1/2 flex flex-col items-center justify-end px-5 pb-[clamp(0.75rem,2.2svh,1.5rem)] text-center sm:px-6">
        <h2
          id="cta-title"
          className="font-headline text-[clamp(3.5rem,min(15vw,24svh),12rem)] font-black uppercase leading-[0.8] tracking-tighter text-white"
        >
          <span className="sr-only">Let&apos;s build</span>
          <span data-cta-line="1" className={lineClass} aria-hidden>
            <SplitChars text="LET'S" srLabel={false} />
          </span>
          <span data-cta-line="2" className={lineClass} aria-hidden>
            <span data-cta-fill className="text-outline-fill inline-block motion-reduce:[background-position:0%_0%]">
              BUILD
            </span>
          </span>
        </h2>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center"
        aria-hidden
      >
        <div data-cta-rule className="horizon-line w-[min(94vw,84rem)]" />
        <div
          data-cta-flare
          className="horizon-flare absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="absolute inset-x-0 top-1/2 bottom-0 flex flex-col items-center px-5 pt-[clamp(1.5rem,4svh,2.5rem)] text-center sm:px-6">
        <p
          data-cta-below
          className="max-w-[44ch] text-base font-light leading-relaxed text-on-surface-variant md:text-lg [text-wrap:balance]"
        >
          Open to Summer 2027 internships in software engineering, machine learning, and agentic
          AI.
        </p>
        <div
          data-cta-below
          className="mt-[clamp(1.5rem,4.5svh,2.75rem)] flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="font-label block rounded bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-on-primary-fixed transition-[box-shadow,transform] duration-200 hover:shadow-[0_10px_30px_-8px_rgba(255,181,153,0.45)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.97]"
            >
              Get in touch
            </Link>
          </Magnetic>
          <a
            href={`mailto:${EMAIL}`}
            className="font-label border-b border-white/25 pb-1 text-sm tracking-[0.08em] text-white transition-colors duration-200 hover:border-tertiary-singularity hover:text-tertiary-singularity focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            {EMAIL}
          </a>
        </div>
      </div>

      {/* Colophon: the page finishes here, quietly */}
      <div
        data-cta-below
        className="absolute inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] flex items-center justify-between gap-4 sm:inset-x-6 md:inset-x-8 lg:inset-x-10"
      >
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/45">
          © 2026 Rayhan Mohammad
        </p>
        <ul className="flex items-center gap-6">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
              >
                {channel.label}
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
