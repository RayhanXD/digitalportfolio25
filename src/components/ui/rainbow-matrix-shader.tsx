"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useCallback } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const PROJECT_ID = "jYxrWzSRtsXNqZADHnVH";

export const Component = () => {
  const { width, height } = useWindowSize();
  const ready = width > 0 && height > 0;

  return (
    <div className={cn("flex w-full flex-col items-center")}>
      {ready ? (
        <UnicornScene
          production={true}
          projectId={PROJECT_ID}
          width={width}
          height={height}
        />
      ) : null}
    </div>
  );
};

/**
 * Fills a positioned parent (e.g. absolute inset-0) and sizes UnicornScene to the container
 * via ResizeObserver so the matrix stays interactive at the correct resolution.
 */
export function SignalMatrixBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { clientWidth, clientHeight } = el;
    setDims({ width: clientWidth, height: clientHeight });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const ready = dims.width > 0 && dims.height > 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-auto absolute inset-0 z-0 overflow-hidden bg-black",
        className
      )}
    >
      {ready ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <UnicornScene
            production={true}
            projectId={PROJECT_ID}
            width={dims.width}
            height={dims.height}
          />
        </div>
      ) : null}
    </div>
  );
}

