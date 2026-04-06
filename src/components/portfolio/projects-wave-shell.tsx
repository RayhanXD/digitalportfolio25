"use client";

import type { ReactNode } from "react";

export function ProjectsWaveShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen w-full">
      <div className="pointer-events-none fixed inset-0 z-0 h-[100dvh] min-h-screen w-screen max-w-[100vw] overflow-hidden bg-black">
        <video
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
      <div className="relative z-10 pb-12 pt-[calc(env(safe-area-inset-top)+4.75rem)] md:pb-16 lg:pb-10">
        {children}
      </div>
    </div>
  );
}
