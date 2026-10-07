"use client";

import { type RefObject, useEffect } from "react";
import { MQ } from "@/lib/motion";

/**
 * Feeds the cursor position into `--mx` / `--my` on every `.spotlight` element inside `scope`
 * so the CSS radial glow can follow it.
 */
export function useSpotlight(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root || !window.matchMedia(MQ.fine).matches) return;

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, [scope]);
}
