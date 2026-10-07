"use client";

import { useRef } from "react";
import { gsap, MQ, useGsap } from "@/lib/motion";

/** Dim over the video once the hero has scrolled away — keeps sections legible over the planet. */
const DIM_CONTENT = 0.74;
/** At the closing CTA the scene opens back up, bookending the page with the horizon. */
const DIM_FINALE = 0.38;

/** Fixed, full-viewport video backdrop (covers entire screen including mobile dynamic viewport). */
export function HomePageBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const hero = document.getElementById("home-hero");
        const finale = document.getElementById("home-cta");

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          })
          .to("[data-bg-media]", { scale: 1.12 }, 0)
          .fromTo("[data-bg-dim]", { opacity: 0 }, { opacity: DIM_CONTENT }, 0);

        if (finale) {
          gsap.fromTo(
            "[data-bg-dim]",
            { opacity: DIM_CONTENT },
            {
              opacity: DIM_FINALE,
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: finale, start: "top bottom", end: "bottom bottom", scrub: true },
            }
          );
        }
      });

      // Without motion the hero never recedes, so hold a static dim for legibility
      mm.add(MQ.reduce, () => {
        gsap.set("[data-bg-dim]", { opacity: 0.55 });
      });
    },
    root
  );

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] min-h-screen w-screen max-w-[100vw] overflow-hidden bg-black"
      aria-hidden
    >
      <div data-bg-media className="absolute inset-0 will-change-transform">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/campus-connect-ai.mp4" type="video/mp4" />
        </video>
      </div>
      <div data-bg-dim className="absolute inset-0 bg-black opacity-0" />
    </div>
  );
}
