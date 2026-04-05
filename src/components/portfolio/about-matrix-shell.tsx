"use client";

import type { ReactNode } from "react";
import { SkyGradientOverlay } from "@/components/portfolio/sky-gradient-overlay";
import { SignalMatrixBackground } from "@/components/ui/rainbow-matrix-shader";

export function AboutMatrixShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-[calc(100vh-6rem)] w-full overflow-hidden md:min-h-[calc(100vh-8rem)]">
      <SignalMatrixBackground />
      <SkyGradientOverlay variant="subtle" />
      <div className="relative z-10 pt-6 pb-24 md:pt-8 md:pb-12 lg:pb-8">
        {children}
      </div>
    </div>
  );
}
