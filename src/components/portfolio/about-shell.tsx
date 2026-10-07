"use client";

import { createContext, type ReactNode, type RefObject, useContext, useRef } from "react";
import { ShaderAnimation } from "@/components/ui/shader-animation";

const ShaderSpeedContext = createContext<RefObject<number> | null>(null);

/** Lets chapters push the background rings faster (e.g. the warp into Experience). */
export function useShaderSpeed() {
  return useContext(ShaderSpeedContext);
}

/**
 * The About page sits on a sticky full-viewport shader that is almost entirely hidden:
 * every section is near-black, and the shader only shows through `.knockout` chapter titles.
 *
 * The content wrapper deliberately has no z-index/transform — a stacking context there would
 * isolate the knockouts' blend from the shader and they'd render black.
 */
export function AboutShell({ children }: { children: ReactNode }) {
  const speed = useRef(1);

  return (
    <ShaderSpeedContext.Provider value={speed}>
      <div className="relative isolate min-h-screen w-full overflow-x-clip">
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
          <ShaderAnimation
            className="h-full min-h-[100dvh] w-full"
            speedRef={speed}
            ringScale={2.2}
          />
        </div>
        <div className="relative -mt-[100dvh]">{children}</div>
      </div>
    </ShaderSpeedContext.Provider>
  );
}
