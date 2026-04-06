"use client";

import { useCallback, useEffect, useState } from "react";
import { LightBeam } from "@stianlarsen/react-light-beam";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { cn } from "@/lib/utils";

const PRELOADER_WELCOME_WORD = "Welcome,";
const PRELOADER_HEADLINE_REST = " to The Horizon";
/** Time between each character’s animation start */
const CHAR_STAGGER_MS = 45;
/** Must match `.preloader-char` animation duration in globals.css */
const CHAR_DURATION_MS = 420;
/** Pause after the last letter of “Welcome” finishes its reveal */
const PAUSE_AFTER_WELCOME_MS = 350;
/** When the headline outro (reverse stagger) starts, ms from page load */
const OUTRO_START_MS = 7500;

const PRELOADER_HEADLINE_CHAR_COUNT =
  PRELOADER_WELCOME_WORD.length + PRELOADER_HEADLINE_REST.length;

/** Wall time for full outro: last char delay + char duration (matches intro timing math) */
const OUTRO_SEQUENCE_MS =
  (PRELOADER_HEADLINE_CHAR_COUNT - 1) * CHAR_STAGGER_MS + CHAR_DURATION_MS;

/** Overlay exit fade — keep in sync with root `duration-[1000ms]` below */
const EXIT_FADE_MS = 1000;

/** When the last character’s outro finishes (absolute time from page load) */
const TEXT_OUTRO_END_MS = OUTRO_START_MS + OUTRO_SEQUENCE_MS;

/**
 * Fire `dismiss` this many ms before the text outro ends so that `phase === "done"`
 * (preloader fully gone) happens on the same frame as the last letter finishing.
 */
const AUTO_DISMISS_MS = Math.max(0, TEXT_OUTRO_END_MS - EXIT_FADE_MS);

export type PagePreloaderPhase = "run" | "exit" | "done";

function preloaderRestCharBaseDelayMs(): number {
  const lastWelcomeIndex = PRELOADER_WELCOME_WORD.length - 1;
  const welcomeCompleteMs =
    lastWelcomeIndex * CHAR_STAGGER_MS + CHAR_DURATION_MS;
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

  const dismiss = useCallback(() => {
    setPhase("exit");
    window.setTimeout(() => setPhase("done"), EXIT_FADE_MS);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tWelcome = window.setTimeout(() => setCtaVisible(true), 2000);
    const tOutro = window.setTimeout(() => setOutroActive(true), OUTRO_START_MS);
    const tDismiss = window.setTimeout(() => dismiss(), AUTO_DISMISS_MS);
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
          "fixed inset-0 z-[100] flex flex-col bg-black transition-opacity duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-300 motion-reduce:ease-out",
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
                const outroDelay =
                  (PRELOADER_HEADLINE_CHAR_COUNT - 1 - globalIndex) *
                  CHAR_STAGGER_MS;
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
                        : `${i * CHAR_STAGGER_MS}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {PRELOADER_HEADLINE_REST.split("").map((char, i) => {
                const globalIndex = PRELOADER_WELCOME_WORD.length + i;
                const outroDelay =
                  (PRELOADER_HEADLINE_CHAR_COUNT - 1 - globalIndex) *
                  CHAR_STAGGER_MS;
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
