"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { countUp, EASE, gsap, MQ, ScrollTrigger, useGsap } from "@/lib/motion";
import { ChapterBand, chapterInner } from "@/components/portfolio/chapter-band";
import { ROLES, type Metric } from "@/components/portfolio/about-data";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** The year a role started, from its dates line ("May → Aug 2025" → "2025") */
const startYear = (dates: string) => dates.match(/\d{4}/)?.[0] ?? "";

const DIGITS = "0123456789".split("");

/**
 * The focused role's start year as an odometer: each digit is a strip that rolls through the
 * numbers in between, so moving from 2026 to 2023 visibly winds back. It stays mounted while the
 * stage below it re-keys, which is what lets it roll rather than reset.
 */
function YearOdometer({ year }: { year: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  // Strips are positioned by a custom property GSAP owns after mount; React only sets the first
  const [initial] = useState(year);

  useIsomorphicLayoutEffect(() => {
    const strips = root.current?.querySelectorAll<HTMLElement>("[data-odo-strip]");
    if (!strips) return;
    const reduce = window.matchMedia(MQ.reduce).matches;
    strips.forEach((strip, i) => {
      gsap.to(strip, {
        "--d": Number(year[i] ?? 0),
        duration: reduce ? 0 : 0.9,
        ease: "power3.inOut",
        delay: reduce ? 0 : i * 0.05,
        overwrite: true,
      });
    });
  }, [year]);

  return (
    <p
      ref={root}
      className="font-headline flex text-6xl font-black leading-none tracking-tighter text-white xl:text-7xl"
    >
      <span className="sr-only">Started {year}</span>
      {initial.split("").map((digit, i) => (
        <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden tabular-nums">
          <span
            data-odo-strip
            className="flex flex-col [transform:translateY(calc(var(--d)*-10%))]"
            style={{ "--d": Number(digit) } as CSSProperties}
          >
            {DIGITS.map((n) => (
              <span key={n} className="block h-[1em]">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </p>
  );
}

function MetricValue({ metric, countable }: { metric: Metric; countable?: boolean }) {
  return (
    <>
      {metric.prefix}
      {typeof metric.value === "number" ? (
        <span data-stage-count={countable ? metric.value : undefined}>{metric.value}</span>
      ) : (
        metric.value
      )}
      <span className="text-secondary-singularity">{metric.suffix}</span>
    </>
  );
}

/** The sticky panel showing the focused role in full. Re-keyed per role so it rolls in fresh. */
function Stage({ index }: { index: number }) {
  const root = useRef<HTMLDivElement>(null);
  const role = ROLES[index];

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia(MQ.reduce).matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } });
      tl.fromTo(
        "[data-stage-roll]",
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
        0
      ).fromTo(
        "[data-stage-fade]",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
        0.15
      );
      gsap.utils.toArray<HTMLElement>("[data-stage-count]").forEach((num) => {
        tl.add(countUp(num, Number(num.dataset.stageCount), { duration: 1.2 }), 0.2);
      });
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={root} className="flex h-full flex-col justify-between">
      <div>
        <div className="overflow-hidden pb-1">
          <h3
            data-stage-roll
            className="font-headline text-3xl font-bold leading-[1.05] tracking-tight text-white xl:text-4xl"
          >
            {role.title}
          </h3>
        </div>
        <p data-stage-fade className="font-label mt-3 text-[11px] uppercase tracking-[0.25em] text-secondary-singularity">
          {role.org}
        </p>
        <p data-stage-fade className="font-label mt-1 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          {role.place} · {role.dates}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        {role.metrics.map((metric) => (
          <div key={metric.label}>
            <div className="overflow-hidden">
              <p
                data-stage-roll
                className="font-headline text-4xl font-bold tabular-nums tracking-tight text-white xl:text-5xl"
              >
                <MetricValue metric={metric} countable />
              </p>
            </div>
            <p data-stage-fade className="font-label mt-2 text-[10px] uppercase leading-relaxed tracking-[0.25em] text-neutral-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <p data-stage-fade className="max-w-md text-base font-light leading-relaxed text-on-surface-variant">
        {role.body}
      </p>
    </div>
  );
}

/**
 * Experience as a focus stage: company names scroll past as an index of huge type, each
 * sharpening as it crosses the middle of the screen (where a point of light rides the horizon
 * line). The sticky stage on the left shows whichever role is in focus.
 */
export function AboutExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        const { motion } = ctx.conditions as { motion: boolean; reduce: boolean };
        const list = root.current!.querySelector<HTMLElement>("[data-role-list]")!;
        const rows = gsap.utils.toArray<HTMLElement>("[data-role-row]");

        // Focus is scroll position, not animation, so it runs under reduced motion too (minus blur)
        const update = () => {
          const mid = window.innerHeight * 0.5;
          const reach = window.innerHeight * 0.55;
          let best = 0;
          let bestFocus = -1;
          rows.forEach((row, i) => {
            const r = row.getBoundingClientRect();
            const d = Math.min(1, Math.abs(r.top + r.height / 2 - mid) / reach);
            const f = 1 - d;
            const focus = f * f * (3 - 2 * f);
            row.style.setProperty("--focus", focus.toFixed(3));
            if (focus > bestFocus) {
              bestFocus = focus;
              best = i;
            }
          });
          if (best !== activeRef.current) {
            activeRef.current = best;
            setActive(best);
          }
        };
        const focusTrigger = ScrollTrigger.create({
          trigger: list,
          start: "top bottom",
          end: "bottom top",
          onUpdate: update,
          onRefresh: update,
        });
        update();

        if (motion) {
          const range = { trigger: list, start: "top 50%", end: "bottom 50%", scrub: true };
          gsap.fromTo("[data-role-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: range });
          gsap.fromTo(
            "[data-role-dot]",
            { y: 0 },
            {
              y: () => list.offsetHeight,
              ease: "none",
              scrollTrigger: { ...range, invalidateOnRefresh: true },
            }
          );
          gsap.utils.toArray<HTMLElement>("[data-role-node]").forEach((node) => {
            ScrollTrigger.create({
              trigger: node,
              start: "center 50%",
              onEnter: () => {
                node.dataset.lit = "true";
              },
              onLeaveBack: () => {
                node.dataset.lit = "false";
              },
            });
          });
        } else {
          gsap.set("[data-role-fill]", { scaleY: 1 });
          gsap.set("[data-role-dot]", { opacity: 0 });
        }

        return () => focusTrigger.kill();
      });
    },
    root
  );

  return (
    <section id="experience" className="relative">
      <ChapterBand kicker="03 — Experience" lines={["Experience"]} variant="fly" />
      <div ref={root} className="relative bg-void py-[clamp(4rem,10vh,7rem)]">
        <div className={cn(chapterInner, "grid grid-cols-1 gap-10 lg:grid-cols-12")}>
          <div className="hidden lg:col-span-5 lg:block" aria-hidden>
            <div className="sticky top-[18vh] flex h-[64vh] flex-col">
              <YearOdometer year={startYear(ROLES[active].dates)} />
              <div className="mt-6 min-h-0 flex-1">
                <Stage key={active} index={active} />
              </div>
            </div>
          </div>

          <div data-role-list className="relative pl-8 md:pl-12 lg:col-span-7">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/10" aria-hidden>
              <div
                data-role-fill
                className="absolute inset-0 origin-top bg-gradient-to-b from-secondary-singularity/40 via-white to-tertiary-singularity"
              />
              <div
                data-role-dot
                className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_28px_rgba(120,180,232,0.7)]"
              >
                {/* The homepage's sun, riding this line instead of the horizon */}
                <span className="absolute left-1/2 top-1/2 h-40 w-24 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_center,rgba(255,255,255,0.4)_0%,rgba(255,181,153,0.18)_32%,rgba(120,180,232,0.06)_55%,transparent_72%)]" />
              </div>
            </div>

            <ol>
              {ROLES.map((role) => (
                <li
                  key={`${role.org}-${role.title}`}
                  data-role-row
                  className="relative flex flex-col justify-center py-12 opacity-[calc(0.16+0.84*var(--focus,1))] lg:min-h-[48vh] lg:py-0 lg:[filter:blur(calc((1-var(--focus,1))*5px))] motion-reduce:lg:[filter:none]"
                >
                  <span
                    data-role-node
                    data-lit="false"
                    className="absolute -left-8 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 transition-[background-color,box-shadow,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[lit=true]:scale-150 data-[lit=true]:bg-white data-[lit=true]:shadow-[0_0_10px_rgba(120,180,232,0.9)] md:-left-12"
                    aria-hidden
                  />
                  <p className="font-label mb-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                    {role.dates}
                  </p>
                  <h3 className="font-headline text-[clamp(2.25rem,4.6vw,5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white">
                    {role.index}
                  </h3>
                  {/* Full details: visible on phones, screen-reader-only beside the desktop stage */}
                  <div className="mt-6 lg:sr-only">
                    <p className="font-headline text-xl font-bold text-white">{role.title}</p>
                    <p className="font-label mt-1 text-[10px] uppercase tracking-[0.25em] text-secondary-singularity">
                      {role.org} · {role.place}
                    </p>
                    <ul className="mt-5 grid grid-cols-2 gap-4">
                      {role.metrics.map((metric) => (
                        <li key={metric.label}>
                          <p className="font-headline text-3xl font-bold tabular-nums text-white">
                            <MetricValue metric={metric} />
                          </p>
                          <p className="font-label mt-1 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                            {metric.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm font-light leading-relaxed text-on-surface-variant">
                      {role.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
