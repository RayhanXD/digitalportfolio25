"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { useSpotlight } from "@/components/motion/use-spotlight";
import { ProjectPoster } from "@/components/portfolio/project-poster";
import { PROJECTS, type Project } from "@/components/portfolio/projects-data";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");
const total = pad(PROJECTS.length);

/*
 * Horizontal layout classes are all `md:motion-safe:` — the same conditions under which the
 * pinned scroll runs. Elsewhere (phones, reduced motion) panels stack vertically.
 * Keep them as full literals: Tailwind only generates classes it can find verbatim.
 */

function formatStat(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const accentText =
    project.accent === "blue" ? "text-secondary-singularity" : "text-tertiary-singularity";
  const { stat } = project;

  return (
    <article
      data-panel
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
        <span
          data-panel-index
          className="text-outline pointer-events-none absolute -bottom-[0.18em] right-4 font-headline text-[clamp(5rem,12vw,11rem)] font-black leading-none tracking-tighter"
          aria-hidden
        >
          {pad(index + 1)}
        </span>
      </div>

      <div className={cn("flex flex-col justify-between gap-6", "md:motion-safe:col-span-5 md:motion-safe:py-2")}>
        <div>
          <p
            data-panel-copy
            className={cn("font-label mb-5 text-[10px] uppercase tracking-[0.35em]", accentText)}
          >
            Project {pad(index + 1)} — {project.tagline}
          </p>
          <h2
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
              className="group/link flex size-14 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              <ArrowUpRight className="size-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </Magnetic>
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
 * Inside each frame the footage drifts against the motion, the horizon rises, and the
 * oversized index slides at its own speed. Phones and reduced motion get a vertical stack.
 */
export function ProjectsGallery() {
  const root = useRef<HTMLElement>(null);
  useSpotlight(root);

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");

        if (!desktop) {
          panels.forEach((panel) => {
            panelArrival(panel, { trigger: panel, start: "top 80%", once: true });
            gsap.fromTo(
              panel.querySelector(".poster"),
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

        let shown = 0;
        const setActive = (index: number) => {
          if (index === shown) return;
          const dir = index > shown ? 1 : -1;
          shown = index;
          const counter = root.current!.querySelector<HTMLElement>("[data-gallery-counter]")!;
          gsap
            .timeline()
            .to(counter, { yPercent: -100 * dir, opacity: 0, duration: 0.2, ease: "power2.in" })
            .call(() => {
              counter.textContent = pad(index + 1);
            })
            .fromTo(
              counter,
              { yPercent: 100 * dir, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.45, ease: EASE.cinematic }
            );
        };

        // Frames lean into fast scrolling and spring back upright when it settles
        const posters = gsap.utils.toArray<HTMLElement>("[data-panel] .poster");
        const skewTo = gsap.quickTo(posters, "skewX", { duration: 0.7, ease: "power3.out" });
        let settle: gsap.core.Tween | null = null;
        const lean = (velocity: number) => {
          skewTo(gsap.utils.clamp(-5, 5, velocity / -350));
          settle?.kill();
          settle = gsap.delayedCall(0.12, () => skewTo(0));
        };

        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.set("[data-gallery-progress]", { scaleX: 0 });

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              lean(self.getVelocity());
              gsap.set("[data-gallery-progress]", { scaleX: self.progress });
              const active = Math.min(
                PROJECTS.length - 1,
                Math.round(self.progress * (PROJECTS.length - 1))
              );
              setActive(active);
            },
          },
        });

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
          gsap.fromTo(
            panel.querySelector("[data-poster-inner]"),
            { xPercent: -6 },
            { xPercent: 6, ease: "none", scrollTrigger: inView }
          );
          // Sunrise: each frame's horizon climbs as it crosses the screen
          const planet = panel.querySelector("[data-poster-planet]");
          if (planet) {
            gsap.fromTo(planet, { yPercent: 10 }, { yPercent: -4, ease: "none", scrollTrigger: inView });
          }
          gsap.fromTo(
            panel.querySelector("[data-panel-index]"),
            { xPercent: 40 },
            { xPercent: -40, ease: "none", scrollTrigger: inView }
          );

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
          "md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-stretch md:motion-safe:gap-[6vw] md:motion-safe:pl-10 md:motion-safe:pr-[8vw]"
        )}
      >
        {PROJECTS.map((project, i) => (
          <ProjectPanel key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-10 bottom-8 hidden items-center gap-6",
          "md:motion-safe:flex"
        )}
        aria-hidden
      >
        <span className="font-label flex overflow-hidden text-xs tracking-[0.3em] text-white tabular-nums">
          <span data-gallery-counter className="inline-block">
            01
          </span>
          <span className="text-neutral-500">&nbsp;/ {total}</span>
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-white/10">
          <span
            data-gallery-progress
            className="horizon-line absolute inset-0 origin-left"
          />
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-neutral-500">
          Scroll
        </span>
      </div>
    </section>
  );
}
