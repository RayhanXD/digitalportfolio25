"use client";

import { useRef } from "react";
import Link from "next/link";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";
import { HeroDepthPlane } from "@/components/portfolio/hero-depth";

/** Each name line is clipped only at its bottom edge, so letters rise out from below it. */
const nameLineClass = "block [clip-path:inset(-50%_-100vw_0_-100vw)]";

/**
 * The horizon sits at exactly 50% of the viewport — where the preloader headline collapses —
 * so the line appears to be what the headline became. The name rests on top of it.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const introReady = usePlayOnIntro(intro);

  useGsap(
    (mm) => {
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.cinematic } });
        tl.fromTo("[data-hero-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "expo.inOut" }, 0)
          .fromTo(
            "[data-hero-flare]",
            { opacity: 0, scaleX: 0.2 },
            { opacity: 1, scaleX: 1, duration: 0.9, ease: "power2.out" },
            0.1
          )
          .to("[data-hero-flare]", { opacity: 0.45, duration: 1.8, ease: "power2.inOut" }, 1)
          // The line closest to the horizon rises first
          .fromTo(
            '[data-hero-name-line="2"] [data-char]',
            { yPercent: 115 },
            { yPercent: 0, duration: 1.5, stagger: { each: 0.04, from: "center" } },
            0.45
          )
          .fromTo(
            '[data-hero-name-line="1"] [data-char]',
            { yPercent: 115 },
            { yPercent: 0, duration: 1.5, stagger: { each: 0.04, from: "center" } },
            0.62
          )
          .fromTo(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1.2 },
            1.05
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.09 },
            1.15
          )
          .fromTo("[data-hero-cue]", { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.7)
          .fromTo("[data-depth-plane]", { opacity: 0 }, { opacity: 1, duration: 2.4, ease: "power2.out" }, 0.6);
        intro.current = tl;
        if (introReady.current) tl.play();

        // Scrolling away: the name splits apart along the horizon and the scene recedes
        const spread = desktop ? 14 : 6;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to('[data-hero-name-line="1"]', { xPercent: -spread }, 0)
          .to('[data-hero-name-line="2"]', { xPercent: spread }, 0)
          .to("[data-hero-name]", { yPercent: -22, opacity: 0 }, 0)
          .to("[data-hero-horizon]", { opacity: 0, scaleX: 1.15 }, 0)
          .to("[data-hero-top]", { opacity: 0, y: -40 }, 0)
          .to("[data-hero-ctas]", { opacity: 0, y: -60 }, 0)
          .to("[data-hero-cue-wrap]", { opacity: 0 }, 0)
          // Depth: the far stars lag behind the page, the near dust flies past the camera
          .to('[data-depth="back"]', { yPercent: desktop ? 9 : 5 }, 0)
          .to('[data-depth="front"]', { yPercent: desktop ? -34 : -18, scale: 1.3 }, 0);

        // Pointer depth: each plane follows the cursor by its own distance (mouse/trackpad only)
        if (desktop && window.matchMedia(MQ.fine).matches) {
          // The name and the horizon it rests on move together, so the contact line never slips
          const planes = [
            { sel: '[data-depth="back"]', px: 8 },
            { sel: '[data-depth="name"], [data-hero-horizon]', px: 14 },
            { sel: '[data-depth="front"]', px: 46 },
          ].flatMap(({ sel, px }) =>
            gsap.utils.toArray<HTMLElement>(sel, root.current).map((el) => ({
              px,
              x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
            }))
          );
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            planes.forEach((p) => {
              p.x(-nx * p.px);
              p.y(-ny * p.px * 0.6);
            });
          };
          window.addEventListener("pointermove", onMove);
          return () => {
            window.removeEventListener("pointermove", onMove);
            intro.current = null;
          };
        }

        return () => {
          intro.current = null;
        };
      });
    },
    root
  );

  return (
    <section id="home-hero" ref={root} className="relative h-[100svh] min-h-[34rem] overflow-hidden">
      {/* Keeps the name legible when the background's sunrise sits behind it */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_42%_at_50%_38%,rgba(0,0,0,0.55),transparent_72%)]"
        aria-hidden
      />
      {/* Far plane: stars that add to the planet footage behind */}
      <div
        data-depth="back"
        data-depth-plane
        className="pointer-events-none absolute -inset-[6%] mix-blend-screen will-change-transform"
        aria-hidden
      >
        <HeroDepthPlane kind="stars" className="opacity-70" />
      </div>
      <div data-depth="name" className="absolute inset-x-0 top-0 bottom-1/2 flex flex-col items-center justify-end px-5 pb-[clamp(0.75rem,2.2svh,1.5rem)] text-center sm:px-6 md:px-8 lg:px-10">
        <h1
          data-hero-name
          className="font-headline text-[clamp(3.5rem,min(15vw,24svh),12rem)] font-black leading-[0.8] tracking-tighter text-white"
        >
          <span className="sr-only">Rayhan Mohammad</span>
          <span data-hero-name-line="1" className={nameLineClass}>
            <SplitChars text="RAYHAN" srLabel={false} />
          </span>
          <span data-hero-name-line="2" className={nameLineClass}>
            <SplitChars text="MOHAMMAD" srLabel={false} />
          </span>
        </h1>
      </div>

      <div
        data-hero-horizon
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center"
        aria-hidden
      >
        <div data-hero-line className="horizon-line w-[min(94vw,84rem)]" />
        <div
          data-hero-flare
          className="horizon-flare absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Below the horizon: the caption reads like a subtitle, on the planet's dark side */}
      <div className="absolute inset-x-0 top-1/2 bottom-0 flex flex-col items-center px-5 pt-[clamp(1.25rem,3.5svh,2.25rem)] text-center sm:px-6">
        <div data-hero-top>
          <span
            data-hero-eyebrow
            className="font-label block text-xs uppercase tracking-[0.4em] text-secondary-singularity sm:text-sm"
          >
            Agentic AI · Full-stack · ML
          </span>
        </div>
        <div
          data-hero-ctas
          className="mt-[clamp(1.75rem,5svh,3rem)] flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <div data-hero-cta>
            <Magnetic>
              <Link
                href="/contact"
                className="font-label block rounded bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-on-primary-fixed transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(120,180,232,0.45)] active:scale-95"
              >
                Get in touch
              </Link>
            </Magnetic>
          </div>
          <div data-hero-cta>
            <Magnetic>
              <Link
                href="/projects"
                className="font-label block rounded border border-white/20 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/5"
              >
                View projects
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Near plane: out-of-focus dust in front of the name; it overtakes everything on scroll */}
      <div
        data-depth="front"
        data-depth-plane
        className="pointer-events-none absolute -inset-[8%] z-[5] will-change-transform"
        aria-hidden
      >
        <HeroDepthPlane kind="dust" />
      </div>

      <div data-hero-cue-wrap className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
        <a
          data-hero-cue
          href="#intro"
          aria-label="Scroll to introduction"
          className="group flex flex-col items-center gap-3"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-white/40 transition-colors group-hover:text-white/70">
            Scroll
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/10">
            <span className="scroll-cue-dot" />
          </span>
        </a>
      </div>
    </section>
  );
}
