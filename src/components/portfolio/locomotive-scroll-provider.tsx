"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type LocomotiveScroll from "locomotive-scroll";

const LocomotiveScrollContext = createContext<LocomotiveScroll | null>(null);

export function useLocomotiveScrollInstance() {
  return useContext(LocomotiveScrollContext);
}

export function LocomotiveScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const [instance, setInstance] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    let cancelled = false;
    let scroll: LocomotiveScroll | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const { default: LocomotiveScroll } = await import("locomotive-scroll");
      if (cancelled) return;

      scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.1,
          smoothWheel: true,
        },
      });
      if (cancelled) {
        scroll.destroy();
        return;
      }
      scrollRef.current = scroll;
      setInstance(scroll);

      resizeObserver = new ResizeObserver(() => {
        scroll?.resize();
      });
      resizeObserver.observe(document.body);
      scroll.resize();
    };

    void init();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      scroll?.destroy();
      scrollRef.current = null;
      setInstance(null);
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollRef.current?.resize();
      });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <LocomotiveScrollContext.Provider value={instance}>
      {children}
    </LocomotiveScrollContext.Provider>
  );
}
