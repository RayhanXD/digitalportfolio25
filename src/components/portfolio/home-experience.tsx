"use client";

import { Fragment, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";

/** Months since January 2023, the ruler's unit */
type Month = number;

type Role = {
  /** Set in display type on the horizon */
  name: string;
  org: string;
  title: string;
  place: string;
  dates: string;
  start: Month;
  /** Last month, or null while it's still going */
  end: Month | null;
  metric: { value: string; label: string };
  line: string;
};

/** Oldest first, so the ruler travels forward in time. Facts mirror EXPERIENCE_BANK.md. */
const ROLES: readonly Role[] = [
  {
    name: "Krowe",
    org: "Krowe Technologies",
    title: "Founding Software Engineer",
    place: "Dallas, TX",
    dates: "Aug 2023 → Present",
    start: 7,
    end: null,
    metric: { value: "$300K", label: "Raised" },
    line: "Modular agentic AI platform and developer marketplace, scaled to 23 startups.",
  },
  {
    name: "PGA of America",
    org: "The PGA of America",
    title: "Machine Learning Engineer Intern",
    place: "Dallas, TX",
    dates: "May → Aug 2025",
    start: 28,
    end: 31,
    metric: { value: "12", label: "ML systems shipped" },
    line: "RAG pipelines in Python, FastAPI, and Docker. Standardized tooling adopted by 500+ engineers.",
  },
  {
    name: "UT CCBB",
    org: "UT Center for Computational Biology and Bioinformatics",
    title: "Undergraduate Researcher",
    place: "Austin, TX",
    dates: "Nov 2025 → Present",
    start: 34,
    end: null,
    metric: { value: "40%", label: "Fewer data errors" },
    line: "Genomic ML pipelines on TACC supercomputers, locating mutation sites in time-series data.",
  },
  {
    name: "Humana",
    org: "Humana",
    title: "Software Engineer Intern",
    place: "Louisville, KY",
    dates: "Summer 2026 → Present",
    start: 41,
    end: null,
    metric: { value: "72%", label: "Faster certification cycles" },
    line: "Vertex AI multi-agent platform that put AI products in front of every L2 team.",
  },
];

/** Ahead of the sun: real dates that haven't happened yet */
const AHEAD = [
  { at: 53, label: "Summer 2027", detail: "Open to internships" },
  { at: 64, label: "May 2028", detail: "B.S., UT Austin" },
] as const;

const FIRST_YEAR = 2023;
/** Months on the ruler, January 2023 through December 2028 */
const SPAN: Month = 72;
/** Ongoing roles run into the near future and fade, rather than claiming a fixed "now" */
const ONGOING_TO: Month = 50;
const months = (n: number) => `calc(var(--m) * ${n})`;

/** Lane brightness by state: not yet reached, already lived, under the sun */
const LANE = { ahead: 0.24, lived: 0.5, active: 1 } as const;

/**
 * Experience as a time ruler. The sun holds still on the horizon while a ruler of months slides
 * beneath it, one lane per role, so overlapping roles read at a glance. Each start date that
 * reaches the sun raises that company out of the horizon, and the light grows a little each time.
 */
export function HomeExperience() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion || !root.current) return;

        const q = gsap.utils.selector(root.current);
        const stage = q("[data-xp-stage]")[0] as HTMLElement;
        const names = q("[data-xp-name]") as HTMLElement[];
        const details = q("[data-xp-detail]") as HTMLElement[];
        const lanes = q("[data-xp-lane]") as HTMLElement[];
        const unit = () => parseFloat(getComputedStyle(stage).getPropertyValue("--m")) || 28;
        // Puts month `m` directly under the sun
        const at = (m: Month) => () => -m * unit();

        gsap.set(names, { opacity: 0 });
        gsap.set(details, { opacity: 0 });
        gsap.set(lanes, { opacity: LANE.ahead });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (desktop ? 2.9 : 2.6)}`,
            pin: stage,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // The horizon draws out from the sun, then the ruler slides in underneath it
        tl.fromTo("[data-xp-horizon]", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.soft }, 0)
          .fromTo("[data-xp-sun]", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 0.8, duration: 0.5, ease: EASE.soft }, 0.15)
          .fromTo("[data-xp-head]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.1)
          .fromTo("[data-xp-ruler]", { opacity: 0, x: at(ROLES[0].start - 6) }, { opacity: 1, x: at(ROLES[0].start), duration: 1.1, ease: "power3.out" }, 0.2);

        const enter = (i: number, t: number) => {
          tl.set(names[i], { opacity: 1 }, t)
            .fromTo(
              names[i].querySelectorAll("[data-char]"),
              { yPercent: 115 },
              { yPercent: 0, duration: 0.65, stagger: 0.03, ease: "power3.out" },
              t
            )
            .fromTo(names[i].querySelector("[data-xp-dates]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, t + 0.15)
            .fromTo(details[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, t + 0.2)
            .to(lanes[i], { opacity: LANE.active, duration: 0.3 }, t + 0.1)
            // A little more light at every stop
            .to("[data-xp-sun]", { scale: 0.8 + (i + 1) * 0.1, duration: 0.5, ease: "power2.out" }, t + 0.1)
            .to("[data-xp-sky]", { opacity: 0.25 + (i + 1) * 0.19, duration: 0.6, ease: "power2.out" }, t + 0.1);
        };

        const leave = (i: number, t: number) => {
          tl.to(
            names[i].querySelectorAll("[data-char]"),
            { yPercent: 115, duration: 0.4, stagger: { each: 0.02, from: "end" }, ease: "power2.in" },
            t
          )
            .to(names[i].querySelector("[data-xp-dates]"), { opacity: 0, duration: 0.25 }, t)
            .to(details[i], { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, t)
            .to(lanes[i], { opacity: LANE.lived, duration: 0.3 }, t + 0.2)
            .set(names[i], { opacity: 0 }, t + 0.5);
        };

        let t = 0.75;
        enter(0, t);
        t += 1.5;
        for (let i = 1; i < ROLES.length; i++) {
          // The ruler glides the gap between start dates and settles as the next one arrives
          tl.to("[data-xp-ruler]", { x: at(ROLES[i].start), duration: 1.1, ease: "power2.inOut" }, t);
          leave(i - 1, t);
          enter(i, t + 0.6);
          t += 2;
        }
        tl.to({}, { duration: 0.3 });
      });
    },
    root
  );

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="relative">
      {/* Without motion: the same roles as a plain ledger */}
      <div className="mx-auto hidden max-w-screen-2xl px-5 py-24 sm:px-6 md:px-8 lg:px-10 motion-reduce:block">
        <h2 className="font-label mb-12 text-xs uppercase tracking-[0.4em] text-secondary-singularity">
          Where I&apos;ve shipped
        </h2>
        <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
          {ROLES.map((role) => (
            <li key={role.name} className="border-t border-white/15 pt-6">
              <p className="font-label text-xs uppercase tracking-[0.22em] text-secondary-singularity">{role.dates}</p>
              <h3 className="font-headline mt-3 text-3xl font-bold uppercase leading-none tracking-tight text-white">
                {role.name}
              </h3>
              <p className="mt-2 text-sm text-white/70">{role.title}</p>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-headline text-4xl font-bold tabular-nums text-white">{role.metric.value}</span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-400">{role.metric.label}</span>
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-on-surface-variant">{role.line}</p>
            </li>
          ))}
        </ol>
      </div>

      <div
        data-xp-stage
        className="relative h-[100svh] min-h-[36rem] overflow-hidden [--horizon:40%] [--m:14px] [--needle:1.25rem] motion-reduce:hidden sm:[--needle:1.5rem] md:[--horizon:46%] md:[--m:26px] md:[--needle:12%] lg:[--m:30px]"
      >
        <div className="absolute inset-x-5 top-[calc(env(safe-area-inset-top)+4.75rem)] flex items-baseline justify-between sm:inset-x-6 md:inset-x-8 md:top-[calc(env(safe-area-inset-top)+5.5rem)] lg:inset-x-10">
          <h2
            id="experience-title"
            data-xp-head
            className="font-label whitespace-nowrap text-[11px] uppercase tracking-[0.28em] text-secondary-singularity md:text-xs md:tracking-[0.4em]"
          >
            Where I&apos;ve shipped
          </h2>
          <Link
            data-xp-head
            href="/about"
            className="font-label group inline-flex items-center gap-2 whitespace-nowrap border-b border-white/25 pb-1 text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60 md:tracking-[0.25em]"
          >
            Full experience
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {/* Light above the horizon, anchored on the sun; it brightens role by role */}
        <div
          data-xp-sky
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[var(--horizon)] opacity-25 [background:radial-gradient(60%_70%_at_var(--needle)_100%,rgba(255,181,153,0.16),rgba(120,180,232,0.06)_45%,transparent_75%)]"
        />

        {/* Above the line: the company, rising out of the horizon */}
        <div className="absolute inset-x-0 top-0 grid h-[var(--horizon)] pl-[var(--needle)] pr-5 sm:pr-6 md:pr-10">
          {ROLES.map((role) => (
            <div
              key={role.name}
              data-xp-name
              className="col-start-1 row-start-1 self-end pb-[clamp(0.6rem,1.8svh,1.25rem)] opacity-0"
            >
              <p
                data-xp-dates
                className="font-label text-xs uppercase tracking-[0.25em] text-secondary-singularity tabular-nums"
              >
                {role.dates}
              </p>
              <h3 className="font-headline mt-4 text-[clamp(2.4rem,7.6vw,8.25rem)] font-black uppercase leading-[0.84] tracking-tighter text-white [clip-path:inset(-60%_-100vw_0_-100vw)]">
                <span className="sr-only">{role.org}</span>
                {role.name.split(" ").map((word, w) => (
                  <Fragment key={word}>
                    {w > 0 ? " " : null}
                    <span className="inline-block whitespace-nowrap">
                      <SplitChars text={word} srLabel={false} />
                    </span>
                  </Fragment>
                ))}
              </h3>
            </div>
          ))}
        </div>

        {/* The horizon: lit behind the sun (the past), cooling toward the future */}
        <div
          data-xp-horizon
          aria-hidden
          className="xp-horizon pointer-events-none absolute inset-x-0 top-[var(--horizon)] h-px origin-[var(--needle)_50%]"
        />

        {/* The ruler slides under the sun: a lane per role, month ticks, and what's ahead. Its
            window fades at the left edge so the past dissolves instead of being cut off */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full [mask-image:linear-gradient(90deg,transparent,#000_var(--needle))] md:[mask-image:linear-gradient(90deg,transparent,#000_calc(var(--needle)*0.45))]">
          <div
            data-xp-ruler
            aria-hidden
            className="pointer-events-none absolute left-[var(--needle)] top-[calc(var(--horizon)+1.25rem)] h-24 will-change-transform md:h-28"
            style={{ width: months(SPAN) }}
          >
            {ROLES.map((role, i) => (
              <div
                key={role.name}
                data-xp-lane
                className="absolute flex h-3 items-center"
                style={{
                  top: `${i * 0.875}rem`,
                  left: months(role.start),
                  width: months((role.end ?? ONGOING_TO) - role.start),
                }}
              >
                <span
                  className={
                    role.end === null
                      ? "h-[2px] w-full rounded-full bg-white [mask-image:linear-gradient(90deg,#000_62%,transparent)]"
                      : "h-[2px] w-full rounded-full bg-white"
                  }
                />
                <span className="font-label absolute right-full mr-2.5 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-white md:text-[10px]">
                  {role.name}
                </span>
              </div>
            ))}

            <div
              className="absolute inset-x-0 top-[4.25rem] h-2 opacity-60 md:top-[4.5rem]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0 1px, transparent 1px var(--m))",
              }}
            />
            {Array.from({ length: SPAN / 12 }, (_, k) => (
              <div
                key={k}
                className="absolute top-[4.25rem] md:top-[4.5rem]"
                style={{ left: months(k * 12) }}
              >
                <span className="block h-4 w-px bg-white/55" />
                <span className="font-label mt-1.5 block -translate-x-1/2 text-[10px] tracking-[0.2em] text-white/55 tabular-nums">
                  {FIRST_YEAR + k}
                </span>
              </div>
            ))}

            {AHEAD.map((mark) => (
              <div key={mark.label} className="absolute top-0 h-[4.25rem] md:h-[4.5rem]" style={{ left: months(mark.at) }}>
                <span className="absolute inset-y-0 left-0 border-l border-dashed border-white/25" />
                <span className="font-label absolute left-2.5 top-0 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-white/40 md:text-[10px]">
                  {mark.label}
                  <span className="mt-1 block normal-case tracking-[0.06em] text-white/30">{mark.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The sun holds still; time moves past it */}
        <div
          data-xp-sun
          aria-hidden
          className="pointer-events-none absolute left-[var(--needle)] top-[var(--horizon)] opacity-0 will-change-transform"
        >
          <span className="absolute left-0 top-0 h-24 w-80 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_center,rgba(255,255,255,0.55)_0%,rgba(255,181,153,0.22)_32%,rgba(120,180,232,0.06)_55%,transparent_72%)] md:w-[28rem]" />
          <span className="absolute left-0 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-white/70 to-transparent md:h-28" />
          <span className="absolute left-0 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8),0_0_28px_8px_rgba(255,181,153,0.35)]" />
        </div>

        {/* Below the ruler: what the role was and what it moved */}
        <div className="absolute inset-x-0 top-[calc(var(--horizon)+8.25rem)] grid pl-[var(--needle)] pr-5 sm:pr-6 md:top-[calc(var(--horizon)+9.5rem)] md:pr-10">
          {ROLES.map((role) => (
            <div
              key={role.name}
              data-xp-detail
              className="col-start-1 row-start-1 grid content-start gap-5 opacity-0 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-16"
            >
              <div>
                <p className="text-sm text-white/80">
                  {role.title} <span className="text-white/40">·</span> {role.place}
                </p>
                <p className="mt-3 flex items-baseline gap-3">
                  <span className="font-headline text-4xl font-bold tabular-nums text-white md:text-5xl">
                    {role.metric.value}
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    {role.metric.label}
                  </span>
                </p>
              </div>
              <p className="max-w-[46ch] text-[15px] font-light leading-relaxed text-on-surface-variant md:self-end md:text-base [text-wrap:pretty]">
                {role.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
