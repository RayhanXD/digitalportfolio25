"use client";

import {
  type DependencyList,
  type RefObject,
  useEffect,
  useLayoutEffect,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Media queries shared by every motion surface. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  /** Mouse/trackpad — cursor-driven effects only run here */
  fine: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 768px)",
} as const;

/** Signature curves. `cinematic` matches the CSS cubic-bezier(0.22,1,0.36,1) used across the site. */
export const EASE = {
  cinematic: "expo.out",
  soft: "power3.out",
  collapse: "expo.in",
  travel: "expo.inOut",
} as const;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs GSAP setup inside a scoped `gsap.matchMedia()` so selector strings resolve
 * within `scope`, and every tween / ScrollTrigger is reverted on unmount.
 */
export function useGsap(
  setup: (mm: gsap.MatchMedia) => void,
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia(scope.current ?? undefined);
    setup(mm);
    return () => mm.revert();
  }, deps);
}

/** Fade + rise once when `trigger` scrolls into view. */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  vars: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    targets,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: EASE.cinematic,
      stagger: 0.08,
      ...vars,
      scrollTrigger: { trigger, start: "top 85%", once: true },
    }
  );
}

/**
 * Outline words (`.text-outline-fill`) fill solid as they travel through the viewport.
 * Near the bottom of a page, pass an earlier `end` so the fill can actually complete.
 */
export function scrubTextFill(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  range: { start?: string; end?: string } = {}
) {
  return gsap.fromTo(
    targets,
    { backgroundPosition: "100% 0%" },
    {
      backgroundPosition: "0% 0%",
      ease: "none",
      scrollTrigger: {
        trigger,
        start: range.start ?? "top 85%",
        end: range.end ?? "top 35%",
        scrub: true,
      },
    }
  );
}

/**
 * Counts `el`'s text up from 0 to `target`. Returns the tween so it can sit in a timeline.
 * The element should already contain the final value in markup (for no-JS / reduced motion).
 */
export function countUp(
  el: HTMLElement,
  target: number,
  { decimals = 0, duration = 1.6 }: { decimals?: number; duration?: number } = {}
) {
  const format = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const counter = { n: 0 };
  el.textContent = format(0);
  return gsap.to(counter, {
    n: target,
    duration,
    ease: "expo.out",
    onUpdate: () => {
      el.textContent = format(counter.n);
    },
  });
}
