"use client";

import type { ReactNode } from "react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function AboutMatrixShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen w-full">
      <div className="pointer-events-none fixed inset-0 z-0">
        <ShaderAnimation className="h-full min-h-screen w-full" />
      </div>
      <div className="relative z-10 pb-12 pt-[calc(env(safe-area-inset-top)+4.75rem)] md:pb-16 lg:pb-10">
        {children}
      </div>
    </div>
  );
}
