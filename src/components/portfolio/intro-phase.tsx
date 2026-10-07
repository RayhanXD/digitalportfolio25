"use client";

import { createContext, type RefObject, useContext, useEffect, useRef } from "react";
import type { gsap } from "gsap";

/**
 * False while something covers the page — the preloader on first load, or the horizon
 * transition while a new route mounts behind it. Page intros wait for it to turn true.
 */
export const IntroReadyContext = createContext(true);

export function useIntroReady() {
  return useContext(IntroReadyContext);
}

/**
 * Plays a paused intro timeline the moment the page is uncovered. Returns a ref whose
 * `.current` says whether the page is already uncovered — check it right after building
 * the timeline (layout effects run before this hook's effect).
 */
export function usePlayOnIntro(timeline: RefObject<gsap.core.Timeline | null>) {
  const ready = useIntroReady();
  const readyRef = useRef(ready);

  useEffect(() => {
    readyRef.current = ready;
    if (ready) timeline.current?.play();
  }, [ready, timeline]);

  return readyRef;
}
