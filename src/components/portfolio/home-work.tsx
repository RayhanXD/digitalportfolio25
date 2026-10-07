"use client";

import { Fragment, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, MQ, ScrollTrigger, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { PROJECTS, type Project } from "@/components/portfolio/projects-data";
import { clipSrc, frameStyle } from "@/components/portfolio/project-poster";
import { useLocomotiveScrollInstance } from "@/components/portfolio/locomotive-scroll-provider";

type Feature = {
  slug: string;
  /** Index label on phones, where four full names don't fit on one row */
  short: string;
  /** One line for the homepage; the Projects page carries the full description */
  line: string;
};

const FEATURES: readonly Feature[] = [
  {
    slug: "selfpi",
    short: "SelfPI",
    line: "Detects breaking changes in third-party APIs and opens pull requests that patch every affected call site.",
  },
  {
    slug: "keystone",
    short: "Keystone",
    line: "Won Best Overall at HBA×CSBA Hack Day: a LangGraph and Gemini multi-agent platform for real estate.",
  },
  {
    slug: "raygent",
    short: "Raygent",
    line: "A LangGraph visualizer for inspecting multi-agent systems in real time, built on Next.js with NVIDIA Nemotron.",
  },
  {
    slug: "campus-connect-ai",
    short: "CCAI",
    line: "Agentic campus search over vector embeddings and PostgreSQL, at 92% query relevance with latency cut 55%.",
  },
];

const ACCENT = { blue: "#78b4e8", orange: "#ffb599" } as const;

const ITEMS = FEATURES.map((feature) => {
  const project = PROJECTS.find((p) => p.slug === feature.slug);
  if (!project?.media) throw new Error(`Featured project needs footage: ${feature.slug}`);
  return { ...feature, project, ...project.media };
});

function formatStat({ stat }: Project) {
  const value = typeof stat.value === "number" ? stat.value.toLocaleString("en-US") : stat.value;
  return `${stat.prefix ?? ""}${value}${stat.suffix ?? ""}`;
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(MQ.reduce);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Seconds of timeline per beat; only the ratios matter, the scroll length is set separately */
const OPEN = 0.8;
const HOLD = 1.05;
const CLOSE = 0.65;
/** Copy leaves this long before the shutter starts closing, so the edges never chop it */
const COPY_OUT = 0.3;
/** From the moment a project starts opening to the moment it is shut again */
const SHUT = OPEN + HOLD + CLOSE;
const CLOSED = "inset(50% 0% 50% 0%)";
const OPENED = "inset(0% 0% 0% 0%)";

/**
 * The signature act. The horizon line that runs through the whole site opens like a shutter,
 * and each project is shown through it. Between projects it closes back to a single line, so
 * every project emerges from the horizon. Pinned on motion; a plain list without it.
 */
export function HomeWork() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLocomotiveScrollInstance();
  const lenisRef = useRef(lenis);
  const jumpRef = useRef<(index: number) => void>(() => {});
  // The plain list's stills only load for visitors who will actually see the list
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(MQ.reduce).matches,
    () => false
  );

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion || !root.current) return;

        const q = gsap.utils.selector(root.current);
        const frame = q("[data-work-frame]")[0] as HTMLElement;
        const windowEl = q("[data-work-window]")[0] as HTMLElement;
        const [edgeTop, edgeBottom] = q("[data-work-edge]") as HTMLElement[];
        const zoom = q("[data-work-zoom]")[0] as HTMLElement;
        const flare = q("[data-work-flare]")[0] as HTMLElement;
        const players = q("video[data-work-video]") as HTMLVideoElement[];
        const copies = q("[data-work-copy]") as HTMLElement[];
        const progress = q("[data-work-progress]") as HTMLElement[];
        const indexes = q("[data-work-index]") as HTMLElement[];
        const half = () => frame.offsetHeight / 2;

        gsap.set(windowEl, { clipPath: CLOSED });
        gsap.set(edgeTop, { y: half });
        gsap.set(edgeBottom, { y: () => -half() });
        gsap.set(flare, { opacity: 0 });
        // Copy only fades, never hides, so every project stays readable and focusable for AT
        gsap.set(copies, { opacity: 0 });
        gsap.set(progress, { scaleX: 0 });

        /** Timeline time at which each project starts opening (the shutter is shut), and is open */
        const openStart: number[] = [];
        const openAt: number[] = [];
        let active = -1;
        let inView = false;
        /** True while the shutter shows any of the active project */
        let open = false;

        // Two players, double-buffered: the one behind loads the next clip during the current
        // project, so when the shutter reopens its frames are already decoded. Sources only
        // change on the hidden player, and every swap is a fresh source, which also sidesteps
        // Chrome never painting a clip that began playing unseen.
        let front = 0;
        const holds = (player: HTMLVideoElement, i: number) => player.dataset.slug === ITEMS[i]?.slug;
        const load = (player: HTMLVideoElement, i: number) => {
          const item = ITEMS[i];
          if (!item || holds(player, i)) return;
          player.dataset.slug = item.slug;
          Object.assign(player.style, frameStyle(item));
          player.src = clipSrc(item.video);
          player.load();
        };
        const reveal = (player: HTMLVideoElement) => {
          // Fade in on the first frame rather than on playback, so a frame still shows wherever
          // autoplay is refused (iOS Low Power Mode, data saver)
          if (player.readyState >= 2) player.style.opacity = "1";
          else player.addEventListener("loadeddata", () => (player.style.opacity = "1"), { once: true });
        };
        const show = (i: number, direction: number) => {
          let current = players[front];
          if (!holds(current, i)) {
            const back = players[1 - front];
            if (!holds(back, i)) load(back, i);
            current.pause();
            current.style.opacity = "0";
            front = 1 - front;
            current = back;
          }
          reveal(current);
          // Queue whichever project the visitor is heading toward
          load(players[1 - front], i + (direction < 0 ? -1 : 1));
        };
        // Start buffering the first two clips a screen or so before the act arrives, not on page load
        const warm = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom+=100%",
          once: true,
          onEnter: () => {
            if (active < 0) {
              load(players[0], 0);
              load(players[1], 1);
            }
          },
        });

        // Only play while some of the frame is actually showing: a clip that starts playing
        // while nothing of it is visible can be left unpainted by Chrome
        const syncVideo = () => {
          const current = players[front];
          players[1 - front].pause();
          if (inView && active >= 0 && open) void current.play().catch(() => {});
          else current.pause();
        };

        let lastTime = 0;
        const setActive = (next: number, direction: number) => {
          if (next === active) return;
          active = next;
          if (active >= 0) show(active, direction);
          indexes.forEach((el, i) => {
            el.dataset.state = i === active ? "active" : i < active ? "done" : "next";
          });
          copies.forEach((el, i) => {
            el.dataset.state = i === active ? "active" : "idle";
          });
          syncVideo();
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (desktop ? 5 : 4.2)}`,
            pin: "[data-work-stage]",
            scrub: 1,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              inView = self.isActive;
              syncVideo();
            },
          },
          // The scrub lags the scroll, so read the timeline's own time: the source must only
          // swap at the instant the shutter is shut
          onUpdate: () => {
            const time = tl.time();
            let next = -1;
            openStart.forEach((at, i) => {
              if (time >= at) next = i;
            });
            setActive(next, time >= lastTime ? 1 : -1);
            lastTime = time;
            // A sliver of margin at both ends, so playback starts once the frame is visible
            const nowOpen = next >= 0 && time > openStart[next] + 0.04 && time < openStart[next] + SHUT - 0.04;
            if (nowOpen !== open) {
              open = nowOpen;
              syncVideo();
            }
          },
        });

        // Silence first: an empty stage and one line, which draws out from the centre
        tl.fromTo([edgeTop, edgeBottom], { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: EASE.soft }, 0.05)
          .fromTo("[data-work-head]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.15)
          .fromTo("[data-work-nav]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.3)
          .fromTo(flare, { opacity: 0, scaleX: 0.3 }, { opacity: 0.7, scaleX: 1, duration: 0.6, ease: EASE.soft }, 0.1);

        const shutter = (clipPath: string, edge: number | (() => number), duration: number, ease: string, t: number) => {
          const fromClip = clipPath === OPENED ? CLOSED : OPENED;
          const toTop = edge;
          const toBottom = typeof edge === "number" ? -edge : () => -edge();
          const fromTop = edge === 0 ? half : 0;
          const fromBottom = edge === 0 ? () => -half() : 0;
          tl.fromTo(windowEl, { clipPath: fromClip }, { clipPath, duration, ease, immediateRender: false }, t)
            .fromTo(edgeTop, { y: fromTop }, { y: toTop, duration, ease, immediateRender: false }, t)
            .fromTo(edgeBottom, { y: fromBottom }, { y: toBottom, duration, ease, immediateRender: false }, t);
        };

        let t = 0.9;
        ITEMS.forEach((_, i) => {
          const chars = copies[i].querySelectorAll("[data-char]");
          const lines = copies[i].querySelectorAll("[data-work-line]");
          const first = i === 0;
          const last = i === ITEMS.length - 1;

          // Open: decelerating out of the line, the footage settling as it arrives. Coming out
          // of a close there is no pause at the line, so the blink reads as one motion
          shutter(OPENED, 0, OPEN, first ? "power3.inOut" : "power3.out", t);
          tl.set(copies[i], { opacity: 1 }, t)
            .fromTo(zoom, { scale: 1.12 }, { scale: 1, duration: OPEN + HOLD, ease: "power2.out", immediateRender: first }, t)
            .to(flare, { opacity: 0, duration: OPEN * 0.6, ease: "power2.out" }, t)
            .fromTo(chars, { yPercent: 115 }, { yPercent: 0, duration: 0.6, stagger: 0.025, ease: "power3.out" }, t + OPEN * 0.4)
            .fromTo(lines, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, t + OPEN * 0.5)
            .to(progress[i], { scaleX: 1, duration: OPEN + HOLD + CLOSE }, t);
          openStart.push(t);
          openAt.push(t + OPEN);
          t += OPEN + HOLD;

          // Copy leaves first, then the shutter accelerates into the line and light gathers there
          tl.to(chars, { yPercent: 115, duration: 0.4, stagger: { each: 0.015, from: "end" }, ease: "power2.in" }, t - COPY_OUT)
            .to(lines, { opacity: 0, y: -8, duration: 0.3, ease: "power2.in" }, t - COPY_OUT);
          shutter(CLOSED, half, CLOSE, last ? "power3.inOut" : "power2.in", t);
          tl.fromTo(zoom, { scale: 1 }, { scale: 1.05, duration: CLOSE, ease: "power2.in", immediateRender: false }, t)
            .to(flare, { opacity: last ? 0.7 : 1, duration: CLOSE, ease: "power2.in" }, t)
            .set(copies[i], { opacity: 0 }, t + CLOSE);
          t += CLOSE;
        });
        // The line holds a moment on its own before the page moves on
        tl.to({}, { duration: 0.45 });

        jumpRef.current = (index: number) => {
          const s = tl.scrollTrigger;
          if (!s) return;
          const y = s.start + ((openAt[index] + 0.15) / tl.duration()) * (s.end - s.start);
          if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1.4 });
          else window.scrollTo({ top: y, behavior: "smooth" });
        };

        return () => {
          jumpRef.current = () => {};
          warm.kill();
          players.forEach((player) => player.pause());
        };
      });
    },
    root
  );

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative">
      {/* Without motion: the same work as a plain, readable list */}
      <div className="mx-auto hidden max-w-screen-2xl px-5 py-24 sm:px-6 md:px-8 lg:px-10 motion-reduce:block">
        <h2 className="font-label mb-12 text-xs uppercase tracking-[0.4em] text-secondary-singularity">
          Selected work
        </h2>
        <ul className="grid gap-16">
          {ITEMS.map(({ project, line, video, crop, grade, slug }) => (
            <li key={slug} className="grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] bg-[#030304]">
                <video
                  className="h-full w-full object-cover"
                  style={frameStyle({ crop, grade })}
                  src={reduced ? clipSrc(video) : undefined}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              </div>
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.3em]" style={{ color: ACCENT[project.accent] }}>
                  {project.tagline}
                </p>
                <h3 className="font-headline mt-3 text-5xl font-black tracking-tighter text-white">{project.name}</h3>
                <p className="mt-4 max-w-[52ch] text-lg font-light leading-relaxed text-on-surface-variant">{line}</p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label mt-6 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-xs uppercase tracking-[0.2em] text-white"
                >
                  {project.linkLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div data-work-stage className="relative h-[100svh] min-h-[36rem] overflow-hidden motion-reduce:hidden">
        <div className="absolute inset-x-5 top-[calc(env(safe-area-inset-top)+4.75rem)] flex items-baseline justify-between sm:inset-x-6 md:inset-x-8 md:top-[calc(env(safe-area-inset-top)+5.5rem)] lg:inset-x-10">
          <h2
            id="work-title"
            data-work-head
            className="font-label whitespace-nowrap text-[11px] uppercase tracking-[0.28em] text-secondary-singularity md:text-xs md:tracking-[0.4em]"
          >
            Selected work
          </h2>
          <Link
            data-work-head
            href="/projects"
            className="font-label group inline-flex items-center gap-2 border-b border-white/25 pb-1 text-[11px] uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:border-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            All projects
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {/* The shutter: a window whose top and bottom edges are the horizon line */}
        <div
          data-work-frame
          className="absolute inset-x-5 top-[16svh] bottom-[19svh] sm:inset-x-6 md:inset-x-8 md:top-[17svh] md:bottom-[18svh] lg:inset-x-10"
        >
          <div
            data-work-window
            className="absolute inset-0 overflow-hidden bg-[#030304] [clip-path:inset(50%_0%_50%_0%)]"
          >
            <div data-work-zoom className="absolute inset-0 overflow-hidden will-change-transform" aria-hidden>
              {[0, 1].map((player) => (
                <video
                  key={player}
                  data-work-video
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-out"
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              ))}
            </div>
            {/* A band of density under the copy only; the top of the frame keeps its footage */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(3,3,4,0.95)_0%,rgba(3,3,4,0.78)_32%,rgba(3,3,4,0.2)_64%,transparent_82%)] md:bg-[linear-gradient(to_top,rgba(3,3,4,0.92)_0%,rgba(3,3,4,0.7)_30%,rgba(3,3,4,0.18)_58%,transparent_74%)]"
            />
            {ITEMS.map(({ slug, line, project }, i) => (
              <article
                key={slug}
                data-work-copy
                data-state="idle"
                aria-labelledby={`work-${slug}`}
                onFocus={() => jumpRef.current(i)}
                className="pointer-events-none absolute inset-x-0 bottom-0 flex opacity-0 flex-col gap-6 p-5 data-[state=active]:pointer-events-auto sm:p-8 md:flex-row md:items-end md:justify-between md:gap-10 md:p-10 lg:p-12"
              >
                <div className="min-w-0 max-w-4xl">
                  <p
                    data-work-line
                    className="font-label flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/80"
                  >
                    <span
                      aria-hidden
                      className="h-px w-6"
                      style={{ backgroundColor: ACCENT[project.accent] }}
                    />
                    {project.tagline}
                  </p>
                  <h3
                    id={`work-${slug}`}
                    className="font-headline mt-3 text-[clamp(2.4rem,6.2vw,6.5rem)] font-black leading-[0.86] tracking-tighter text-white [clip-path:inset(-40%_-5%_0_-5%)] md:whitespace-nowrap"
                  >
                    <span className="sr-only">{project.name}</span>
                    {/* Words stay whole so long names wrap between words on phones */}
                    {project.name.split(" ").map((word, w) => (
                      <Fragment key={word}>
                        {w > 0 ? " " : null}
                        <span className="inline-block whitespace-nowrap">
                          <SplitChars text={word} srLabel={false} />
                        </span>
                      </Fragment>
                    ))}
                  </h3>
                  <p
                    data-work-line
                    className="mt-5 max-w-[52ch] text-[15px] font-light leading-relaxed text-white/85 md:text-lg [text-wrap:pretty]"
                  >
                    {line}
                  </p>
                </div>
                <div
                  data-work-line
                  className="flex shrink-0 items-end justify-between gap-6 md:flex-col md:items-end md:gap-5 md:text-right"
                >
                  <div>
                    <span className="font-headline block text-3xl font-bold tabular-nums text-white md:text-4xl">
                      {formatStat(project)}
                    </span>
                    <span className="font-label mt-1 block text-[10px] uppercase tracking-[0.22em] text-white/65">
                      {project.stat.label}
                    </span>
                  </div>
                  <p className="font-label hidden text-[10px] uppercase tracking-[0.22em] text-white/55 lg:block">
                    {project.stack.join(" · ")}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label group inline-flex items-center gap-2 rounded-[2px] border border-white/30 bg-black/20 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-[background-color,color,border-color] duration-200 hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/70 active:translate-y-px md:px-5"
                  >
                    {project.linkLabel}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div aria-hidden data-work-edge className="horizon-line absolute inset-x-0 top-0 opacity-0" />
          <div aria-hidden data-work-edge className="horizon-line absolute inset-x-0 bottom-0 opacity-0" />
          {/* Light gathers on the line each time the shutter shuts */}
          <div
            aria-hidden
            data-work-flare
            className="horizon-flare pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
          />
        </div>

        {/* Index: names light up as their project passes, and each one jumps there */}
        <nav
          data-work-nav
          aria-label="Featured projects"
          className="absolute inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+5svh)] grid grid-cols-4 gap-3 sm:inset-x-6 md:inset-x-8 md:gap-8 lg:inset-x-10"
        >
          {ITEMS.map(({ slug, short, project }, i) => (
            <button
              key={slug}
              type="button"
              data-work-index
              data-state="next"
              onClick={() => jumpRef.current(i)}
              className="group text-left text-white/35 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60 data-[state=active]:text-white data-[state=done]:text-white/55"
            >
              <span className="relative block h-px overflow-hidden bg-white/15">
                <span
                  data-work-progress
                  className="absolute inset-0 origin-left"
                  style={{ backgroundColor: ACCENT[project.accent] }}
                />
              </span>
              <span className="font-label mt-3 block truncate text-[10px] uppercase tracking-[0.22em] md:text-xs">
                <span className="md:hidden">{short}</span>
                <span className="hidden md:inline">{project.name}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
