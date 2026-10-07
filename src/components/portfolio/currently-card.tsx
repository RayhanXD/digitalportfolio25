"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { EASE, gsap, MQ, ScrollTrigger, useGsap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useAustinTime } from "@/lib/use-austin-time";

const CURRENTLY = [
  { label: "Building", title: "SelfPI", detail: "Agentic API patching" },
  { label: "Founding", title: "Krowe Technologies", detail: "Agentic AI marketplace · $300K raised" },
  { label: "Researching", title: "Genomic ML", detail: "TACC HPC · UT CCBB" },
  { label: "Studying", title: "CS + Statistics & Data Science", detail: "UT Austin · May '28" },
  { label: "Open to", title: "Summer '27 roles", detail: "SWE · ML · Agentic AI" },
] as const;

/** How long each line holds before rolling to the next */
const HOLD_S = 3.6;

/**
 * Rotates through what Rayhan is doing right now with a slot-style vertical roll.
 * Pauses on hover/focus and while off-screen; static list under reduced motion.
 */
export function CurrentlyCard({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const goToRef = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const time = useAustinTime();

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-currently-item]");
        const fills = gsap.utils.toArray<HTMLElement>("[data-currently-fill]");
        let current = 0;
        let hovered = false;
        let inView = false;

        gsap.set(items, { autoAlpha: 0 });
        gsap.set(items[0], { autoAlpha: 1 });
        gsap.set(fills, { scaleX: 0 });

        const hold = gsap.to({}, { duration: HOLD_S, paused: true });

        const syncPlayback = () => {
          if (inView && !hovered) hold.play();
          else hold.pause();
        };

        const goTo = (next: number) => {
          if (next === current) return;
          const prev = current;
          current = next;
          setActive(next);

          const out = items[prev].querySelectorAll("[data-roll]");
          const into = items[next].querySelectorAll("[data-roll]");
          gsap.killTweensOf([out, into]);
          gsap.set(items[next], { autoAlpha: 1 });
          gsap.to(out, {
            yPercent: -110,
            duration: 0.55,
            ease: EASE.collapse,
            stagger: 0.04,
            onComplete: () => {
              gsap.set(items[prev], { autoAlpha: 0 });
            },
          });
          gsap.fromTo(
            into,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, ease: EASE.cinematic, stagger: 0.06, delay: 0.3 }
          );

          // Segments behind the active one read as complete; the active one fills with the hold
          fills.forEach((fill, i) => {
            if (i !== next) gsap.set(fill, { scaleX: i < next ? 1 : 0 });
          });
          hold.eventCallback("onUpdate", () => {
            gsap.set(fills[next], { scaleX: hold.progress() });
          });
          hold.restart();
          syncPlayback();
        };

        hold.eventCallback("onUpdate", () => {
          gsap.set(fills[0], { scaleX: hold.progress() });
        });
        hold.eventCallback("onComplete", () => {
          goTo((current + 1) % items.length);
        });
        goToRef.current = goTo;

        const el = root.current!;
        const onEnter = () => {
          hovered = true;
          syncPlayback();
        };
        const onLeave = () => {
          hovered = false;
          syncPlayback();
        };
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("focusin", onEnter);
        el.addEventListener("focusout", onLeave);

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            inView = self.isActive;
            syncPlayback();
          },
        });

        return () => {
          st.kill();
          hold.kill();
          goToRef.current = () => {};
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
          el.removeEventListener("focusin", onEnter);
          el.removeEventListener("focusout", onLeave);
        };
      });
    },
    root
  );

  return (
    <div
      ref={root}
      className={cn(
        "glass-panel event-horizon-glow relative flex aspect-square w-full max-w-md flex-col justify-between rounded-lg border border-white/5 p-8 md:w-[400px] md:max-w-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-label text-[10px] uppercase tracking-[0.35em] text-neutral-400">
          Currently
        </h3>
        <span className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          <span className="size-1.5 animate-pulse rounded-full bg-tertiary-singularity shadow-[0_0_10px_rgba(255,181,153,0.7)] motion-reduce:animate-none" />
          Live
        </span>
      </div>

      {/* Animated view */}
      <div className="motion-reduce:hidden" aria-hidden>
        <div className="mb-8 flex gap-1.5">
          {CURRENTLY.map((item, i) => (
            <button
              key={item.label}
              type="button"
              tabIndex={-1}
              onClick={() => goToRef.current(i)}
              className="group/seg relative h-4 flex-1 cursor-pointer"
              aria-label={`Show ${item.label}`}
            >
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-surface-container-high transition-colors group-hover/seg:bg-white/25">
                <span
                  data-currently-fill
                  className="absolute inset-0 origin-left bg-secondary-singularity"
                />
              </span>
            </button>
          ))}
        </div>
        <div className="relative h-[8.5rem]">
          {CURRENTLY.map((item, i) => (
            <div
              key={item.label}
              data-currently-item
              className={cn("absolute inset-0", i !== 0 && "invisible")}
            >
              <div className="overflow-hidden">
                <p data-roll className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary-singularity">
                  {item.label}
                </p>
              </div>
              <div className="mt-3 overflow-hidden pb-1">
                <p data-roll className="font-headline text-3xl font-bold leading-[1.05] tracking-tight text-white">
                  {item.title}
                </p>
              </div>
              <div className="mt-2 overflow-hidden">
                <p data-roll className="text-sm font-light text-on-surface-variant">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screen readers and reduced motion get the full list */}
      <ul className="sr-only space-y-3 motion-reduce:not-sr-only">
        {CURRENTLY.map((item, i) => (
          <li key={item.label} className={cn("text-sm", i === active && "text-white")}>
            <span className="font-label mr-2 text-[10px] uppercase tracking-[0.25em] text-secondary-singularity">
              {item.label}
            </span>
            <span className="text-on-surface-variant">
              {item.title} — {item.detail}
            </span>
          </li>
        ))}
      </ul>

      <div>
        <p className="font-label mb-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500 tabular-nums">
          Austin, TX · {time ? `${time} CT` : "Central Time"}
        </p>
        <Link
          href="/contact"
          className="font-label block w-full border border-secondary-singularity py-4 text-center text-xs uppercase tracking-widest text-secondary-singularity transition-colors hover:bg-secondary-singularity hover:text-on-secondary-singularity"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
