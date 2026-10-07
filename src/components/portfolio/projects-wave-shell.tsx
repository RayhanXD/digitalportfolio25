"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/motion";

/** Playback speed of the background footage (1 = original). Normal speed under reduced motion. */
const BG_PLAYBACK_RATE = 6;

export function ProjectsWaveShell({ children }: { children: ReactNode }) {
  const bg = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el || window.matchMedia(MQ.reduce).matches) return;
    // Some browsers reset the rate when the source (re)loads, so apply it again then
    const apply = () => {
      el.defaultPlaybackRate = BG_PLAYBACK_RATE;
      el.playbackRate = BG_PLAYBACK_RATE;
    };
    apply();
    el.addEventListener("loadeddata", apply);
    el.addEventListener("play", apply);
    return () => {
      el.removeEventListener("loadeddata", apply);
      el.removeEventListener("play", apply);
    };
  }, []);

  // Same language as Home: the scene recedes and darkens once the work takes the stage
  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const gallery = document.getElementById("projects-gallery");
        if (!gallery) return;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: gallery, start: "top bottom", end: "top top", scrub: true },
          })
          .fromTo("[data-bg-dim]", { opacity: 0 }, { opacity: 0.62 }, 0)
          .to("[data-bg-media]", { scale: 1.1 }, 0);
      });
      mm.add(MQ.reduce, () => {
        gsap.set("[data-bg-dim]", { opacity: 0.5 });
      });
    },
    bg
  );

  return (
    <div className="relative isolate min-h-screen w-full">
      <div
        ref={bg}
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] min-h-screen w-screen max-w-[100vw] overflow-hidden bg-black"
      >
        <div data-bg-media className="absolute inset-0 will-change-transform">
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/projects-section-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div data-bg-dim className="absolute inset-0 bg-black opacity-0" />
      </div>
      <div className="relative z-10 pb-12 pt-[calc(env(safe-area-inset-top)+4.75rem)] md:pb-16 lg:pb-10">
        {children}
      </div>
    </div>
  );
}
