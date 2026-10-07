"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { useSpotlight } from "@/components/motion/use-spotlight";
import { useLocomotiveScrollInstance } from "@/components/portfolio/locomotive-scroll-provider";
import { ProjectPoster } from "@/components/portfolio/project-poster";
import { PROJECTS, type Project } from "@/components/portfolio/projects-data";
import { cn } from "@/lib/utils";

/*
 * Horizontal layout classes are all `md:motion-safe:` — the same conditions under which the
 * pinned scroll runs. Elsewhere (phones, reduced motion) panels stack vertically.
 * Keep them as full literals: Tailwind only generates classes it can find verbatim.
 */

function formatStat(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

const year = (project: Project) => project.date.slice(-4);

function ProjectPanel({ project }: { project: Project }) {
  const accentText =
    project.accent === "blue" ? "text-secondary-singularity" : "text-tertiary-singularity";
  const { stat } = project;

  return (
    <article
      data-panel
      aria-labelledby={`project-${project.slug}`}
      className={cn(
        "relative grid w-full shrink-0 grid-cols-1 gap-8",
        "md:motion-safe:h-[min(70svh,44rem)] md:motion-safe:w-[min(84vw,80rem)] md:motion-safe:grid-cols-12 md:motion-safe:gap-12"
      )}
    >
      <div
        className={cn(
          "spotlight relative aspect-[4/3] rounded-lg",
          "md:motion-safe:col-span-7 md:motion-safe:aspect-auto md:motion-safe:h-full"
        )}
      >
        <ProjectPoster project={project} className="h-full w-full" />
        {/* The year it shipped, in outline, sliding at its own speed */}
        <span
          data-panel-index
          className="text-outline pointer-events-none absolute -bottom-[0.18em] right-4 font-headline text-[clamp(4.5rem,10vw,9.5rem)] font-black leading-none tracking-tighter"
          aria-hidden
        >
          {year(project)}
        </span>
      </div>

      <div
        data-panel-focus
        className={cn("flex flex-col justify-between gap-6", "md:motion-safe:col-span-5 md:motion-safe:py-2")}
      >
        <div>
          {/* Every frame carries the same label schema: date, what it is, name */}
          <p
            data-panel-copy
            className="font-label mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/70"
          >
            <span className={cn("tabular-nums", accentText)}>{project.date}</span>
            <span aria-hidden className="h-px w-5 bg-white/25" />
            {project.tagline}
          </p>
          <h2
            id={`project-${project.slug}`}
            data-panel-title
            className="font-headline text-5xl font-bold leading-[0.9] tracking-tighter text-white xl:text-6xl"
          >
            {/* Clip sits just below the descenders (y, g, p) so letters rise from under it */}
            <span className="inline-block [clip-path:inset(-20%_-10%_-0.22em_-10%)]">
              <SplitChars text={project.name} />
            </span>
          </h2>
        </div>

        <div data-panel-copy className="border-t border-white/10 pt-6">
          <p className="font-headline text-4xl font-bold tabular-nums tracking-tight text-white md:text-5xl">
            {stat.prefix}
            {typeof stat.value === "number" ? (
              <span data-panel-stat={stat.value}>{formatStat(stat.value)}</span>
            ) : (
              stat.value
            )}
            <span className={accentText}>{stat.suffix}</span>
          </p>
          <p className="font-label mt-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            {stat.label}
          </p>
        </div>

        <p data-panel-copy className="max-w-md leading-relaxed text-neutral-300">
          {project.description}
        </p>

        <div data-panel-copy className="flex flex-wrap items-center justify-between gap-6">
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="font-label rounded border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-wider text-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>
          <Magnetic strength={0.35}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.linkLabel}: ${project.name}`}
              className="group/link flex size-14 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              <ArrowUpRight className="size-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}

/** The strip ends on a plate set like the project labels, so the ask reads as part of the work */
function ClosingPlate() {
  return (
    <article
      data-panel
      aria-labelledby="projects-next"
      className={cn(
        "relative flex w-full shrink-0 flex-col justify-center border-t border-white/10 pt-12",
        "md:motion-safe:h-[min(70svh,44rem)] md:motion-safe:w-[min(60vw,46rem)] md:motion-safe:border-l md:motion-safe:border-t-0 md:motion-safe:pl-12 md:motion-safe:pt-0"
      )}
    >
      <div data-panel-focus>
        <p
          data-panel-copy
          className="font-label mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/70"
        >
          <span className="tabular-nums text-tertiary-singularity">Summer 2027</span>
          <span aria-hidden className="h-px w-5 bg-white/25" />
          Open to internships
        </p>
        <h2
          id="projects-next"
          data-panel-title
          className="font-headline text-5xl font-bold leading-[0.9] tracking-tighter text-white xl:text-6xl"
        >
          <span className="inline-block [clip-path:inset(-20%_-10%_-0.22em_-10%)]">
            <SplitChars text="What's next" />
          </span>
        </h2>
        <p data-panel-copy className="mt-8 max-w-md leading-relaxed text-neutral-300">
          Software engineering, machine learning, and agentic AI. Everything else I&apos;ve built is
          on GitHub.
        </p>
        <div data-panel-copy className="mt-10 flex flex-wrap items-center gap-6">
          <Magnetic>
            <Link
              href="/contact"
              className="font-label block rounded bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-on-primary-fixed transition-[box-shadow,transform] duration-200 hover:shadow-[0_10px_30px_-8px_rgba(255,181,153,0.45)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.97]"
            >
              Get in touch
            </Link>
          </Magnetic>
          <a
            href="https://github.com/RayhanXD"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label group inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            All work on GitHub
            <ArrowUpRight
              className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Animations for one panel as it arrives — `scrollTrigger` decides what "arrives" means. */
function panelArrival(panel: HTMLElement, scrollTrigger: ScrollTrigger.Vars) {
  const tl = gsap.timeline({ defaults: { ease: EASE.cinematic }, scrollTrigger });
  tl.fromTo(
    panel.querySelectorAll("[data-panel-title] [data-char]"),
    { yPercent: 140 },
    { yPercent: 0, duration: 1.2, stagger: 0.035 },
    0
  ).fromTo(
    panel.querySelectorAll("[data-panel-copy]"),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 },
    0.15
  );
  panel.querySelectorAll<HTMLElement>("[data-panel-stat]").forEach((el) => {
    const target = Number(el.dataset.panelStat);
    const counter = { n: 0 };
    el.textContent = "0";
    tl.to(
      counter,
      {
        n: target,
        duration: 1.6,
        ease: "expo.out",
        onUpdate: () => {
          el.textContent = formatStat(counter.n);
        },
      },
      0.3
    );
  });
  return tl;
}

/**
 * Projects as film frames: the section pins and the strip travels sideways as you scroll.
 * The frame crossing the middle is in focus and its neighbours fall back; inside each frame the
 * footage drifts against the motion and the year slides at its own speed. An index of names
 * along the bottom tracks the strip and jumps it. Phones and reduced motion get a vertical stack.
 */
export function ProjectsGallery() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLocomotiveScrollInstance();
  const lenisRef = useRef(lenis);
  const jumpRef = useRef<(index: number) => void>(() => {});
  useSpotlight(root);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");

        if (!desktop) {
          panels.forEach((panel) => {
            panelArrival(panel, { trigger: panel, start: "top 80%", once: true });
            const poster = panel.querySelector(".poster");
            if (!poster) return;
            gsap.fromTo(
              poster,
              { clipPath: "inset(100% 0% 0% 0% round 8px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 8px)",
                duration: 1.4,
                ease: EASE.cinematic,
                scrollTrigger: { trigger: panel, start: "top 85%", once: true },
              }
            );
          });
          return;
        }

        const indexes = gsap.utils.toArray<HTMLElement>("[data-gallery-index]");
        const fills = gsap.utils.toArray<HTMLElement>("[data-gallery-fill]");
        gsap.set(fills, { scaleX: 0 });
        let shown = -1;
        const setActive = (index: number) => {
          if (index === shown) return;
          shown = index;
          indexes.forEach((el, i) => {
            el.dataset.state = i === index ? "active" : i < index ? "done" : "next";
          });
        };

        // Frames lean into fast scrolling and spring back upright when it settles
        // Footage frames don't lean: like a changing scale, a changing skew can stop Chrome
        // painting the video inside
        const posters = gsap.utils
          .toArray<HTMLElement>("[data-panel] .poster")
          .filter((poster) => !poster.querySelector("video"));
        const skewTo = gsap.quickTo(posters, "skewX", { duration: 0.7, ease: "power3.out" });
        let settle: gsap.core.Tween | null = null;
        const lean = (velocity: number) => {
          skewTo(gsap.utils.clamp(-5, 5, velocity / -350));
          settle?.kill();
          settle = gsap.delayedCall(0.12, () => skewTo(0));
        };

        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        /** Where the strip must be for a panel to sit centred, clamped to the travel */
        const centreOf = (panel: HTMLElement) =>
          gsap.utils.clamp(0, distance(), panel.offsetLeft + panel.offsetWidth / 2 - window.innerWidth / 2);

        // Focus pull: the panel nearest the middle is lit, its neighbours fall back
        const focus = () => {
          const mid = window.innerWidth / 2;
          const reach = window.innerWidth * 0.55;
          let best = 0;
          let bestFocus = -1;
          panels.forEach((panel, i) => {
            const r = panel.getBoundingClientRect();
            const d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / reach);
            const f = 1 - d;
            const eased = f * f * (3 - 2 * f);
            panel.style.setProperty("--focus", eased.toFixed(3));
            if (eased > bestFocus) {
              bestFocus = eased;
              best = i;
            }
          });
          // The plate isn't a project, so the index keeps the last project lit beside it
          setActive(Math.min(best, PROJECTS.length - 1));
          fills.forEach((fill, i) => {
            const panel = panels[i];
            const start = i === 0 ? 0 : centreOf(panels[i - 1]);
            const end = centreOf(panel);
            const x = -Number(gsap.getProperty(track, "x"));
            gsap.set(fill, { scaleX: end === start ? (x >= end ? 1 : 0) : gsap.utils.clamp(0, 1, (x - start) / (end - start)) });
          });
        };

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          onUpdate: focus,
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => lean(self.getVelocity()),
            onRefresh: focus,
          },
        });

        jumpRef.current = (index: number) => {
          const st = travel.scrollTrigger;
          const panel = panels[index];
          if (!st || !panel) return;
          const y = st.start + centreOf(panel);
          if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1.4 });
          else window.scrollTo({ top: y, behavior: "smooth" });
        };

        // Keyboard focus moving along the strip brings its panel to the middle
        const onFocusIn = (e: FocusEvent) => {
          const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
          const index = panel ? panels.indexOf(panel) : -1;
          if (index >= 0) jumpRef.current(index);
        };
        track.addEventListener("focusin", onFocusIn);

        // Oversized outline type behind the strip, travelling at a third of its speed
        gsap.to("[data-gallery-ghost]", {
          xPercent: -28,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, i) => {
          const inView = {
            trigger: panel,
            containerAnimation: travel,
            start: "left right",
            end: "right left",
            scrub: true,
          };
          const inner = panel.querySelector("[data-poster-inner]");
          if (inner) gsap.fromTo(inner, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: inView });
          // Sunrise: a generated frame's horizon climbs as it crosses the screen
          const planet = panel.querySelector("[data-poster-planet]");
          if (planet) {
            gsap.fromTo(planet, { yPercent: 10 }, { yPercent: -4, ease: "none", scrollTrigger: inView });
          }
          const index = panel.querySelector("[data-panel-index]");
          if (index) gsap.fromTo(index, { xPercent: 40 }, { xPercent: -40, ease: "none", scrollTrigger: inView });

          // The first frame is already on screen when the pin starts
          panelArrival(
            panel,
            i === 0
              ? { trigger: root.current, start: "top 65%", once: true }
              : {
                  trigger: panel,
                  containerAnimation: travel,
                  start: "left 72%",
                  toggleActions: "play none none reverse",
                }
          );
        });

        focus();
        return () => {
          jumpRef.current = () => {};
          track.removeEventListener("focusin", onFocusIn);
          panels.forEach((panel) => panel.style.removeProperty("--focus"));
        };
      });
    },
    root
  );

  return (
    <section
      ref={root}
      id="projects-gallery"
      className={cn(
        "relative overflow-x-clip py-16",
        "md:motion-safe:flex md:motion-safe:h-[100svh] md:motion-safe:flex-col md:motion-safe:justify-center md:motion-safe:py-0 md:motion-safe:pt-16"
      )}
      aria-label="Projects"
    >
      <div
        data-gallery-ghost
        className={cn(
          "pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-headline text-[22vw] font-black uppercase leading-none tracking-tighter text-white/[0.03]",
          "md:motion-safe:block"
        )}
        aria-hidden
      >
        Selected work · Selected work ·
      </div>

      <div
        data-track
        className={cn(
          "relative flex flex-col gap-24 px-5 sm:px-6",
          "md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-stretch md:motion-safe:gap-[6vw] md:motion-safe:pl-10 md:motion-safe:pr-[20vw]",
          // Focus pull, fed by the strip's position (desktop only; --focus is unset elsewhere).
          // Opacity only: Chrome stops painting video inside a panel whose scale keeps changing
          "md:motion-safe:[&>[data-panel]]:opacity-[calc(0.35+0.65*var(--focus,1))]"
        )}
      >
        {PROJECTS.map((project) => (
          <ProjectPanel key={project.slug} project={project} />
        ))}
        <ClosingPlate />
      </div>

      {/* Index: names fill in as the strip passes them, and each one jumps there */}
      <nav
        aria-label="Projects index"
        className={cn("absolute inset-x-10 bottom-8 hidden grid-cols-5 gap-6", "md:motion-safe:grid")}
      >
        {PROJECTS.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            data-gallery-index
            data-state={i === 0 ? "active" : "next"}
            onClick={() => jumpRef.current(i)}
            className="group text-left text-white/35 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60 data-[state=active]:text-white data-[state=done]:text-white/55"
          >
            <span className="relative block h-px overflow-hidden bg-white/15">
              <span
                data-gallery-fill
                className="absolute inset-0 origin-left"
                style={{ backgroundColor: project.accent === "blue" ? "#78b4e8" : "#ffb599" }}
              />
            </span>
            <span className="font-label mt-3 block truncate text-xs uppercase tracking-[0.22em]">
              {project.name}
            </span>
          </button>
        ))}
      </nav>
    </section>
  );
}
