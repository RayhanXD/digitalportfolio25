"use client";

import type { ReactNode } from "react";
import { SkyGradientOverlay } from "@/components/portfolio/sky-gradient-overlay";
import { Waves } from "@/components/ui/wave-background";

export function ProjectsWaveShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-[calc(100vh-6rem)] w-full overflow-hidden md:min-h-[calc(100vh-8rem)]">
      <div className="pointer-events-auto absolute inset-0 z-0 bg-black">
        <Waves
          className="h-full w-full"
          strokeColor="#c9d6f5"
          backgroundColor="#000000"
        />
      </div>
      <SkyGradientOverlay />
      <div className="relative z-10 pt-6 pb-24 md:pt-8 md:pb-12 lg:pb-8">
        {children}
      </div>
    </div>
  );
}
