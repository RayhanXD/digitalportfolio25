"use client";

import { useRef } from "react";
import { EASE, gsap, MQ, ScrollTrigger, useGsap } from "@/lib/motion";
import { SplitChars } from "@/components/motion/split-text";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";
import { useShaderSpeed } from "@/components/portfolio/about-shell";
import { cn } from "@/lib/utils";

type ChapterBandProps = {
  kicker: string;
  lines: readonly string[];
  as?: "h1" | "h2";
  /**
   * "fly": pins the band and zooms through the first letter until the shader floods the screen,
   * with the rings racing outward — the transition into a centerpiece chapter.
   */
  variant?: "default" | "fly";
  /** Play the entrance when the page is uncovered instead of when scrolled into view */
  introDriven?: boolean;
};

/** Shared horizontal frame for bands and chapter content; `lg:pl-52` clears the chapter rail. */
export const chapterInner = "mx-auto max-w-screen-2xl px-5 sm:px-6 md:px-8 lg:pl-52 lg:pr-10";

/** Chapter content sits on the same near-black as the knockouts, so they read as one surface */
export const chapterBody = "bg-void pb-[clamp(5rem,14vh,9rem)]";

const titleClass =
  "relative font-headline text-[clamp(3.25rem,15vw,15rem)] font-black uppercase leading-[0.82] tracking-tighter lg:text-[clamp(3.25rem,13vw,15rem)]";

/** One copy of the band's contents. Rendered twice: the knockout fill, and an outline on top. */
function BandContents({
  kicker,
  lines,
  as: Heading = "h2",
  copy,
}: ChapterBandProps & { copy: "fill" | "outline" }) {
  const outline = copy === "outline";
  const TitleTag = outline ? "div" : Heading;
  return (
    <div className={chapterInner}>
      <p
        data-band-kicker
        className={cn(
          "font-label mb-5 text-[11px] uppercase tracking-[0.4em] md:mb-7",
          // The fill copy's kicker would be shader-tinted; the outline copy draws the legible one
          outline ? "text-white/70" : "text-transparent"
        )}
      >
        {kicker}
      </p>
      <TitleTag
        data-band-title
        className={cn(
          titleClass,
          outline
            ? // Faint fill + hairline keep letterforms legible when the shader is in a dark phase
              "text-white/[0.07] [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]"
            : "text-white"
        )}
      >
        {!outline ? <span className="sr-only">{lines.join(" ")}</span> : null}
        {lines.map((line, i) => (
          <span
            key={line}
            data-band-line={i}
            className="block [clip-path:inset(-30%_-100vw_-0.04em_-100vw)]"
          >
            <SplitChars text={line} srLabel={false} />
          </span>
        ))}
      </TitleTag>
    </div>
  );
}

/**
 * A chapter title cut out of the black page: the letters are windows onto the About shader.
 * An outline copy sits on top so the letterforms stay defined while the shader is in a dark phase.
 * The outline layer uses `screen` blending: as a plain layer, Chrome composites it in a way that
 * visibly lightens the whole knockout band behind it.
 */
export function ChapterBand(props: ChapterBandProps) {
  const { variant = "default", introDriven = false } = props;
  const root = useRef<HTMLDivElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const introReady = usePlayOnIntro(intro);
  const shaderSpeed = useShaderSpeed();

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const el = root.current!;
        const copies = gsap.utils.toArray<HTMLElement>("[data-band-copy]", el);

        // Entrance: letters rise out of their own baseline, both copies in lockstep
        const enter = gsap.timeline({
          paused: introDriven,
          defaults: { ease: EASE.cinematic },
          scrollTrigger: introDriven ? undefined : { trigger: el, start: "top 80%", once: true },
        });
        copies.forEach((copy) => {
          enter
            .fromTo(
              copy.querySelectorAll("[data-char]"),
              { yPercent: 118 },
              { yPercent: 0, duration: 1.4, stagger: 0.035 },
              0
            )
            .fromTo(
              copy.querySelector("[data-band-kicker]"),
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 1 },
              0.1
            );
        });
        if (introDriven) {
          intro.current = enter;
          if (introReady.current) enter.play();
        }

        if (variant === "default") {
          // Lines drift in opposite directions while the band crosses the screen
          copies.forEach((copy) => {
            copy.querySelectorAll<HTMLElement>("[data-band-line]").forEach((line, i) => {
              gsap.fromTo(
                line,
                { xPercent: i % 2 === 0 ? 3 : -3 },
                {
                  xPercent: i % 2 === 0 ? -3 : 3,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                }
              );
            });
          });

          // The letters lean into the scroll: faster scrolling, more lean, settling upright the
          // moment the page stops. Both copies move together so fill and outline stay in register.
          const lines = el.querySelectorAll<HTMLElement>("[data-band-line]");
          const lean = gsap.quickTo(lines, "skewX", { duration: 0.7, ease: "power3.out" });
          let settle: gsap.core.Tween | null = null;
          const velocity = ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              lean(gsap.utils.clamp(-7, 7, -self.getVelocity() / 260));
              settle?.kill();
              settle = gsap.delayedCall(0.12, () => lean(0));
            },
            onToggle: (self) => {
              if (!self.isActive) lean(0);
            },
          });
          return () => {
            settle?.kill();
            velocity.kill();
          };
        }

        // ── Fly-through ──
        const titles = copies.map((c) => c.querySelector<HTMLElement>("[data-band-title]")!);
        // Zoom into the stem of the first letter so it swallows the screen
        const origin = (title: HTMLElement) => {
          const letter = title.querySelector<HTMLElement>("[data-char]")!;
          const x = letter.offsetLeft + letter.offsetWidth * 0.2;
          const y = letter.offsetTop + letter.offsetHeight * 0.55;
          return `${x}px ${y}px`;
        };
        const warp = { v: 1 };
        const applyWarp = () => {
          if (shaderSpeed) shaderSpeed.current = warp.v;
        };

        // No GSAP pin: a pinned (fixed) wrapper would isolate the knockout's blend. The band's
        // two layers are `sticky` inside a tall wrapper instead, and this timeline scrubs over it.
        const fly = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onLeave: () => gsap.to(warp, { v: 1, duration: 1.2, onUpdate: applyWarp }),
          },
        });
        titles.forEach((title) => {
          fly.fromTo(
            title,
            { scale: 1, transformOrigin: () => origin(title) },
            { scale: 34, ease: "power2.in", duration: 0.75 },
            0.1
          );
        });
        fly
          .to(el.querySelectorAll("[data-band-kicker]"), { opacity: 0, duration: 0.15 }, 0.1)
          // Outline goes before the zoom gets extreme, or its scaled faint fill shows as a panel
          .to(el.querySelector('[data-band-copy="outline"]'), { opacity: 0, duration: 0.18 }, 0.3)
          // Guarantee a full flood even where the zoom lands between strokes
          .fromTo(
            el.querySelector("[data-band-knockout]"),
            { backgroundColor: "#030304" },
            { backgroundColor: "#ffffff", duration: 0.25 },
            0.62
          )
          .fromTo(warp, { v: 1 }, { v: 9, duration: 0.6, ease: "power2.in", onUpdate: applyWarp }, 0.15)
          .to(warp, { v: 2.5, duration: 0.25, ease: "power2.out", onUpdate: applyWarp }, 0.75)
          .to({}, { duration: 0.1 });

        return () => {
          if (shaderSpeed) shaderSpeed.current = 1;
        };
      });
    },
    root
  );

  if (variant === "fly") {
    // Tall wrapper; both layers stick to the viewport while it scrolls past. The knockout layer
    // is itself the sticky element, so its blend still reaches the shader.
    return (
      <div ref={root} className="relative h-[260vh]">
        <div
          data-band-copy="fill"
          data-band-knockout
          className="knockout sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden"
        >
          <BandContents {...props} copy="fill" />
        </div>
        <div
          data-band-copy="outline"
          className="pointer-events-none sticky top-0 -mt-[100svh] flex h-[100svh] flex-col justify-center overflow-hidden mix-blend-screen"
          aria-hidden
        >
          <BandContents {...props} copy="outline" />
        </div>
      </div>
    );
  }

  return (
    <div ref={root} className="relative">
      <div
        data-band-copy="fill"
        data-band-knockout
        className="knockout pb-[clamp(2rem,6vh,4rem)] pt-[clamp(6rem,16vh,10rem)]"
      >
        <BandContents {...props} copy="fill" />
      </div>
      <div
        data-band-copy="outline"
        className="pointer-events-none absolute inset-0 pb-[clamp(2rem,6vh,4rem)] pt-[clamp(6rem,16vh,10rem)] mix-blend-screen"
        aria-hidden
      >
        <BandContents {...props} copy="outline" />
      </div>
    </div>
  );
}
