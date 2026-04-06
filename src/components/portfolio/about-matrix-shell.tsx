"use client";

import type { ReactNode } from "react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function AboutMatrixShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen w-full overflow-x-clip">
      {/*
        Sticky full-viewport shader for the whole about scroll: stays pinned while content moves
        (avoids broken `fixed` under the portfolio shell transform). -mt pulls content over it.
      */}
      <div
        aria-hidden
        className="pointer-events-none sticky top-0 z-0 h-[100dvh] shrink-0"
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          width: "100vw",
          maxWidth: "100vw",
        }}
      >
        <ShaderAnimation className="h-full min-h-[100dvh] w-full" />
      </div>
      <div className="relative z-10 -mt-[100dvh] pt-[calc(env(safe-area-inset-top)+4.75rem)]">
        {children}
      </div>
    </div>
  );
}
