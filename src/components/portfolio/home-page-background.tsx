"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGsap } from "@/lib/motion";

/** Dim over the video once the hero has scrolled away, so sections stay legible over the planet */
const DIM_CONTENT = 0.74;
/** While the work shutter is open the room goes dark around it, like a theatre */
const DIM_STAGE = 0.92;
/** At the close the scene opens back up, bookending the page with the hero's sunrise */
const DIM_FINALE = 0.34;

type Keys = readonly (readonly [number, number])[];

/** Piecewise-linear lookup through [scrollY, value] stops */
function sample(keys: Keys, y: number) {
  if (y <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [y1, v1] = keys[i];
    if (y <= y1) {
      const [y0, v0] = keys[i - 1];
      return y1 === y0 ? v1 : v0 + ((v1 - v0) * (y - y0)) / (y1 - y0);
    }
  }
  return keys[keys.length - 1][1];
}

/**
 * Fixed, full-viewport video backdrop (covers entire screen including mobile dynamic viewport).
 * One grade runs the length of the page: night under the content, darker still around the
 * work, cooling through the experience, and warming back to sunrise at the close.
 */
export function HomePageBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const el = root.current!;
        const setScale = gsap.quickSetter(el.querySelector("[data-bg-media]"), "scale");
        const setDim = gsap.quickSetter(el.querySelector("[data-bg-dim]"), "opacity");
        const setCool = gsap.quickSetter(el.querySelector("[data-bg-tint-cool]"), "opacity");
        const setWarm = gsap.quickSetter(el.querySelector("[data-bg-tint-warm]"), "opacity");

        let keys: { scale: Keys; dim: Keys; cool: Keys; warm: Keys } | null = null;

        // Section positions include pin spacing, so measure only after every trigger has refreshed
        const measure = () => {
          const vh = window.innerHeight;
          const top = (id: string) => {
            const node = document.getElementById(id);
            return node ? node.getBoundingClientRect().top + window.scrollY : null;
          };
          const bottom = (id: string) => {
            const node = document.getElementById(id);
            return node ? node.getBoundingClientRect().bottom + window.scrollY : null;
          };
          const end = Math.max(1, document.documentElement.scrollHeight - vh);
          const heroEnd = bottom("home-hero") ?? vh;
          const xp = top("experience") ?? heroEnd;
          const workTop = top("work") ?? end;
          const workEnd = bottom("work") ?? end;
          const cta = top("home-cta") ?? end;

          keys = {
            scale: [
              [0, 1],
              [heroEnd, 1.12],
            ],
            dim: [
              [0, 0],
              [heroEnd, DIM_CONTENT],
              [workTop - vh * 0.6, DIM_CONTENT],
              [workTop, DIM_STAGE],
              [workEnd - vh * 1.1, DIM_STAGE],
              [workEnd - vh * 0.5, DIM_CONTENT],
              [cta - vh, DIM_CONTENT],
              [end, DIM_FINALE],
            ],
            cool: [
              [xp - vh, 0],
              [xp, 1],
              [workTop, 0.5],
              [cta - vh, 0.5],
              [end, 0],
            ],
            warm: [
              [cta - vh, 0],
              [end, 1],
            ],
          };
        };

        const update = () => {
          if (!keys) measure();
          const y = window.scrollY;
          setScale(sample(keys!.scale, y));
          setDim(sample(keys!.dim, y));
          setCool(sample(keys!.cool, y));
          setWarm(sample(keys!.warm, y));
        };

        const onRefresh = () => {
          measure();
          update();
        };
        ScrollTrigger.addEventListener("refresh", onRefresh);
        const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update });
        update();

        return () => {
          ScrollTrigger.removeEventListener("refresh", onRefresh);
          st.kill();
        };
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
      <div
        data-bg-tint-cool
        className="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(120,180,232,0.13),transparent_70%)]"
      />
      <div
        data-bg-tint-warm
        className="absolute inset-0 opacity-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_42%,rgba(255,181,153,0.12),transparent_70%)]"
      />
    </div>
  );
}
