"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EASE, gsap, MQ, revealOnScroll, useGsap } from "@/lib/motion";
import { ChapterBand, chapterBody, chapterInner } from "@/components/portfolio/chapter-band";
import { type Evidence, TOOL_EVIDENCE, TOOLKIT } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const FIRST_TOOL = TOOLKIT[0].items[0];
/** The longest evidence list. An invisible copy of it reserves the panel's height, so changing
 * the selection never shifts the page below. */
const LONGEST = Object.values(TOOL_EVIDENCE).reduce((a, b) => (b.length > a.length ? b : a));

function Places({ places, hidden }: { places: readonly Evidence[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        "col-start-1 row-start-1 flex flex-wrap content-start gap-x-10 gap-y-5",
        hidden && "invisible"
      )}
    >
      {places.map((place) => (
        <li key={place.name} data-evidence-item={hidden ? undefined : ""} className="flex items-baseline gap-3">
          <span
            aria-hidden
            className={cn(
              "size-1.5 shrink-0 -translate-y-1 rounded-full",
              place.kind === "Project" ? "bg-secondary-singularity" : "bg-tertiary-singularity"
            )}
          />
          <span className="font-headline text-xl font-bold tracking-tight text-white md:text-2xl">
            {place.name}
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            {place.kind}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The toolkit as evidence: pick any tool and the panel below lists every role, project and
 * campus org where it actually shipped. Hover previews on desktop; tap or focus selects anywhere.
 */
export function AboutToolkit() {
  const root = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<string>(FIRST_TOOL);
  const evidence = TOOL_EVIDENCE[tool] ?? [];

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
        revealOnScroll("[data-evidence]", "[data-evidence]", { delay: 0.3 });
      });
    },
    root
  );

  // Each new selection rolls in: the tool's name first, then where it shipped
  useIsomorphicLayoutEffect(() => {
    const panel = root.current?.querySelector<HTMLElement>("[data-evidence]");
    if (!panel || window.matchMedia(MQ.reduce).matches) return;
    const tween = gsap
      .timeline({ defaults: { ease: EASE.cinematic } })
      .fromTo(panel.querySelectorAll("[data-evidence-roll]"), { yPercent: 105 }, { yPercent: 0, duration: 0.7 }, 0)
      .fromTo(
        panel.querySelectorAll("[data-evidence-item]"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.04 },
        0.08
      );
    return () => {
      tween.kill();
    };
  }, [tool]);

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
                {group.items.map((item) => {
                  const selected = item === tool;
                  return (
                    <li key={item} data-tool>
                      <button
                        type="button"
                        aria-pressed={selected}
                        aria-controls="tool-evidence"
                        onClick={() => setTool(item)}
                        onFocus={() => setTool(item)}
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse") setTool(item);
                        }}
                        className={cn(
                          "font-label border px-5 py-3 text-xs uppercase tracking-widest transition-[background-color,border-color,color,translate] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/60 active:translate-y-px",
                          selected
                            ? "border-tertiary-singularity/70 bg-white/[0.07] text-white"
                            : "border-white/10 text-white/80 hover:border-secondary-singularity/40 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Where the selected tool shipped */}
          <div
            id="tool-evidence"
            data-evidence
            aria-live="polite"
            className="relative border-t border-white/10 pt-8 md:col-span-2 md:pt-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
              <div className="min-w-0">
                <p className="font-label text-[10px] uppercase tracking-[0.35em] text-neutral-500">
                  Shipped with
                </p>
                <div className="mt-3 overflow-hidden pb-1">
                  <p
                    data-evidence-roll
                    className="font-headline whitespace-nowrap text-3xl font-black uppercase leading-none tracking-tighter text-white sm:text-4xl md:text-6xl"
                  >
                    {tool}
                  </p>
                </div>
              </div>
              <p className="font-label shrink-0 text-[10px] uppercase tracking-[0.3em] text-neutral-500 md:pb-2">
                <span className="text-white tabular-nums">{evidence.length}</span>{" "}
                {evidence.length === 1 ? "place" : "places"} · hover or tap a tool
              </p>
            </div>
            <div className="mt-8 grid">
              <Places places={LONGEST} hidden />
              <Places places={evidence} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
