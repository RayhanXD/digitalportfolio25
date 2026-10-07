"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LightBeam } from "@stianlarsen/react-light-beam";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { cn } from "@/lib/utils";

const PRELOADER_WELCOME_WORD = "Welcome,";
const PRELOADER_HEADLINE_REST = " to The Horizon";
/** When the headline starts revealing, ms from mount */
const HEADLINE_START_MS = 250;
/** Stagger for “Welcome,” only */
const WELCOME_CHAR_STAGGER_MS = 65;
/** Stagger for “ to The Horizon” */
const CHAR_STAGGER_MS = 24;
/** Must match `.preloader-char-in` animation duration in globals.css */
const CHAR_DURATION_MS = 420;
/** Pause after the last letter of “Welcome” finishes its reveal */
const PAUSE_AFTER_WELCOME_MS = 140;
/** When the headline collapses into the horizon line, ms from mount */
const OUTRO_START_MS = 2550;
/** Outro stagger: letters collapse from both edges inward, meeting at the center */
const OUTRO_STAGGER_MS = 20;
/** Must match `.preloader-char-out` animation duration in globals.css */
const OUTRO_CHAR_DURATION_MS = 520;

const PRELOADER_HEADLINE_CHAR_COUNT =
  PRELOADER_WELCOME_WORD.length + PRELOADER_HEADLINE_REST.length;

const PRELOADER_CENTER_INDEX = (PRELOADER_HEADLINE_CHAR_COUNT - 1) / 2;
const PRELOADER_MAX_CENTER_DISTANCE = Math.ceil(PRELOADER_CENTER_INDEX);

/** Outro delay for the character at `globalIndex`: edges go first, the center last. */
function preloaderOutroDelayMs(globalIndex: number): number {
  const distance = Math.ceil(Math.abs(globalIndex - PRELOADER_CENTER_INDEX));
  return (PRELOADER_MAX_CENTER_DISTANCE - distance) * OUTRO_STAGGER_MS;
}

/** Wall time for full outro: the center char’s delay + its collapse */
const OUTRO_SEQUENCE_MS =
  PRELOADER_MAX_CENTER_DISTANCE * OUTRO_STAGGER_MS + OUTRO_CHAR_DURATION_MS;

/** Overlay exit fade — keep in sync with root `duration-[900ms]` below */
const EXIT_FADE_MS = 900;

/** When the last character’s outro finishes (absolute time from page load) */
const TEXT_OUTRO_END_MS = OUTRO_START_MS + OUTRO_SEQUENCE_MS;

/**
 * Start exiting while the last letters are still collapsing, so the hero's horizon line
 * ignites underneath the fading overlay exactly where the headline disappears.
 */
const AUTO_DISMISS_MS = OUTRO_START_MS + 380;

/**
 * Wall-clock deadline for auto-dismiss (performance.now()) across remounts.
 * Without this, effect cleanup clears timeouts on every PagePreloader remount
 * (hydration / layout / RSC boundaries), so dismiss can be pushed forever on Vercel.
 */
let preloaderAutoDismissDeadlineMs: number | null = null;

export type PagePreloaderPhase = "run" | "exit" | "done";

function preloaderRestCharBaseDelayMs(): number {
  const lastWelcomeIndex = PRELOADER_WELCOME_WORD.length - 1;
  const welcomeCompleteMs =
    lastWelcomeIndex * WELCOME_CHAR_STAGGER_MS + CHAR_DURATION_MS;
  // Relative to the headline mounting (HEADLINE_START_MS), not to page load
  return welcomeCompleteMs + PAUSE_AFTER_WELCOME_MS;
}

export function PagePreloader({
  onPhaseChange,
}: {
  onPhaseChange?: (phase: PagePreloaderPhase) => void;
} = {}) {
  const [phase, setPhase] = useState<PagePreloaderPhase>("run");
  const [ctaVisible, setCtaVisible] = useState(false);
  const [outroActive, setOutroActive] = useState(false);
  const dismissStartedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissStartedRef.current) return;
    dismissStartedRef.current = true;
    setPhase("exit");
    window.setTimeout(() => setPhase("done"), EXIT_FADE_MS);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (preloaderAutoDismissDeadlineMs === null) {
      preloaderAutoDismissDeadlineMs = performance.now() + AUTO_DISMISS_MS;
    }
    const dismissInMs = Math.max(
      0,
      preloaderAutoDismissDeadlineMs - performance.now()
    );
    const tWelcome = window.setTimeout(() => setCtaVisible(true), HEADLINE_START_MS);
    const tOutro = window.setTimeout(() => setOutroActive(true), OUTRO_START_MS);
    const tDismiss = window.setTimeout(() => dismiss(), dismissInMs);
    return () => {
      window.clearTimeout(tWelcome);
      window.clearTimeout(tOutro);
      window.clearTimeout(tDismiss);
    };
  }, [dismiss]);

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

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  if (phase === "done") return null;

  const restCharBaseDelayMs = preloaderRestCharBaseDelayMs();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-black transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-300 motion-reduce:ease-out",
          phase === "exit"
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        )}
        aria-busy={phase === "run"}
        aria-label="Loading"
      >
        <div className="absolute inset-0">
          <SpiralAnimation />
        </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <p
          className={cn(
            "pointer-events-none max-w-[min(92vw,44rem)] font-label text-2xl font-extralight uppercase text-white sm:text-3xl md:text-4xl",
            /* Per-char spans are inline-block; parent letter-spacing won’t space them — use flex + gap */
            "flex flex-wrap justify-center gap-x-[0.2em] md:gap-x-[0.25em]",
            ctaVisible ? "opacity-100 translate-y-0" : "translate-y-4 opacity-0"
          )}
          aria-label="Welcome, to The Horizon"
        >
          {ctaVisible ? (
            <>
              {PRELOADER_WELCOME_WORD.split("").map((char, i) => {
                const globalIndex = i;
                const outroDelay = preloaderOutroDelayMs(globalIndex);
                return (
                  <span
                    key={`w-${i}`}
                    className={cn(
                      "preloader-char",
                      outroActive ? "preloader-char-out" : "preloader-char-in"
                    )}
                    style={{
                      animationDelay: outroActive
                        ? `${outroDelay}ms`
                        : `${i * WELCOME_CHAR_STAGGER_MS}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {PRELOADER_HEADLINE_REST.split("").map((char, i) => {
                const globalIndex = PRELOADER_WELCOME_WORD.length + i;
                const outroDelay = preloaderOutroDelayMs(globalIndex);
                return (
                  <span
                    key={`r-${i}`}
                    className={cn(
                      "preloader-char",
                      outroActive ? "preloader-char-out" : "preloader-char-in",
                      char === " " && "min-w-[0.45em] text-center"
                    )}
                    style={{
                      animationDelay: outroActive
                        ? `${outroDelay}ms`
                        : `${
                            restCharBaseDelayMs + i * CHAR_STAGGER_MS
                          }ms`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                );
              })}
            </>
          ) : null}
        </p>
      </div>
      </div>

      {/* Fades out quickly at dismiss, then unmounts with overlay — avoids a hard cut vs the long curtain fade */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[101] flex flex-col justify-end overflow-hidden transition-opacity duration-[380ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:duration-150 motion-reduce:ease-out",
          phase === "run" ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      >
        <div className="preloader-light-beam-stack relative h-[min(88vh,60rem)] w-full shrink-0">
          <div className="preloader-light-beam-flip">
            <div
              className="preloader-light-beam-intensity"
              style={{ animationDuration: `${TEXT_OUTRO_END_MS}ms` }}
            >
              <LightBeam
                id="preloader-light-beam"
                className="preloader-light-beam-layer"
                colorDarkmode="rgba(255, 220, 130, 0.58)"
                colorLightmode="rgba(255, 205, 110, 0.52)"
                fullWidth={.75}
                maskLightByProgress={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
