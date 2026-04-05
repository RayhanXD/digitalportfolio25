"use client";

import { useCallback, useEffect, useState } from "react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "singularity-preloader-dismissed";

export function PagePreloader() {
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setPhase("done");
      return;
    }
    const t = window.setTimeout(() => setCtaVisible(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("exit");
    window.setTimeout(() => setPhase("done"), 700);
  }, []);

  useEffect(() => {
    if (phase !== "run") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, dismiss]);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-black transition-opacity duration-700 ease-out",
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      aria-busy={phase === "run"}
      aria-label="Loading"
    >
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[min(50vw,280px)] rounded-full border-2 border-dashed border-secondary-singularity/25 animate-[spin_12s_linear_infinite]" />
        <div className="absolute size-[min(28vw,160px)] rounded-full border border-white/10" />
      </div>

      <div className="pointer-events-none absolute bottom-10 left-6 md:bottom-14 md:left-10">
        <p className="font-label text-xs uppercase tracking-[0.35em] text-secondary-singularity/90">
          Portfolio
        </p>
        <p className="font-headline mt-1 text-2xl font-bold text-white md:text-3xl">
          Rayhan Mohammad
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <button
          type="button"
          onClick={dismiss}
          className={cn(
            "pointer-events-auto font-label text-xl font-extralight uppercase tracking-[0.25em] text-white transition-all duration-700",
            "hover:tracking-[0.35em]",
            ctaVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          Enter
        </button>
        {ctaVisible ? (
          <button
            type="button"
            onClick={dismiss}
            className="pointer-events-auto mt-6 text-[10px] uppercase tracking-widest text-neutral-500 underline-offset-4 hover:text-neutral-300 hover:underline"
          >
            Skip
          </button>
        ) : null}
      </div>
    </div>
  );
}
