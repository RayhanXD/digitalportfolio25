"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Pulls its child toward the cursor while hovered, then settles back. Mouse/trackpad only. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  /** Fraction of the cursor's offset from center the element follows */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia(MQ.fine).matches || window.matchMedia(MQ.reduce).matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Measure from the element's resting center, not its pulled position
      const cx = rect.left + rect.width / 2 - Number(gsap.getProperty(el, "x"));
      const cy = rect.top + rect.height / 2 - Number(gsap.getProperty(el, "y"));
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
