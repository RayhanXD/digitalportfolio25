"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { EASE, gsap, MQ } from "@/lib/motion";

/** Give up waiting for a route and reopen anyway (e.g. a failed navigation) */
const REVEAL_FALLBACK_MS = 6000;

/**
 * Horizon wipe between routes. Two dark lids close from the top and bottom edges, a line of
 * light ignites along their seam, the route swaps behind them, then they part again.
 *
 * Intercepts same-origin link clicks in the capture phase (before Next's <Link> handler,
 * which bails on `defaultPrevented`), so every internal link gets the transition for free.
 */
export function PageTransition({
  onCoveredChange,
}: {
  /** True from the moment the lids start closing until they start parting */
  onCoveredChange: (covered: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pendingPath = useRef<string | null>(null);
  const coverTl = useRef<gsap.core.Timeline | null>(null);
  const notifyCovered = useEffectEvent((covered: boolean) => onCoveredChange(covered));

  const reveal = useEffectEvent(() => {
    const el = root.current;
    if (!el || !pendingPath.current) return;
    pendingPath.current = null;
    coverTl.current?.kill();
    coverTl.current = null;

    const q = gsap.utils.selector(el);
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(el, { autoAlpha: 0 });
        },
      })
      .to(q("[data-pt-line]"), { opacity: 1, scaleX: 1.06, duration: 0.2, ease: "power2.out" })
      .to(q("[data-pt-flare]"), { opacity: 1, scaleX: 1, duration: 0.2, ease: "power2.out" }, 0)
      // Page intros start as the lids begin to part
      .call(() => notifyCovered(false), [], 0.12)
      .to(q("[data-pt-lid='top']"), { yPercent: -101, duration: 0.9, ease: EASE.travel }, 0.12)
      .to(q("[data-pt-lid='bottom']"), { yPercent: 101, duration: 0.9, ease: EASE.travel }, 0.12)
      .to(q("[data-pt-line], [data-pt-flare]"), { opacity: 0, duration: 0.5, ease: "power2.out" }, 0.35);
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    gsap.set(q("[data-pt-lid='top']"), { yPercent: -101 });
    gsap.set(q("[data-pt-lid='bottom']"), { yPercent: 101 });
    gsap.set(q("[data-pt-line]"), { scaleX: 0 });
  }, []);

  useEffect(() => {
    const cover = (href: string, path: string) => {
      const el = root.current;
      if (!el) return;
      pendingPath.current = path;
      notifyCovered(true);
      router.prefetch(href);

      const q = gsap.utils.selector(el);
      gsap.killTweensOf(q("*"));
      coverTl.current = gsap
        .timeline()
        .set(el, { autoAlpha: 1 })
        .fromTo(q("[data-pt-lid='top']"), { yPercent: -101 }, { yPercent: 0, duration: 0.6, ease: EASE.travel }, 0)
        .fromTo(q("[data-pt-lid='bottom']"), { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: EASE.travel }, 0)
        .fromTo(
          q("[data-pt-line]"),
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, duration: 0.6, ease: EASE.cinematic },
          0.38
        )
        .fromTo(
          q("[data-pt-flare]"),
          { opacity: 0, scaleX: 0.3 },
          { opacity: 0.8, scaleX: 1, duration: 0.5, ease: "power2.out" },
          0.42
        )
        .call(() => router.push(href), [], 0.6)
        // If the route is slow to arrive, the line breathes like a loading indicator
        .to(q("[data-pt-line]"), { opacity: 0.45, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true }, 1.1)
        .call(() => reveal(), [], REVEAL_FALLBACK_MS / 1000);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (including in-page #anchors): let the browser handle it
      if (url.pathname === window.location.pathname) return;
      if (window.matchMedia(MQ.reduce).matches) return;

      e.preventDefault();
      if (pendingPath.current) return;
      cover(url.pathname + url.search + url.hash, url.pathname);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new route has committed behind the lids: give it two frames to paint, then part them
  useEffect(() => {
    if (!pendingPath.current) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => reveal());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return (
    <div
      ref={root}
      className="pointer-events-auto invisible fixed inset-0 z-[90] opacity-0"
      aria-hidden
    >
      {/* Lids start off-screen via GSAP (yPercent ±101) — no Tailwind translate, it would stack */}
      <div data-pt-lid="top" className="absolute inset-x-0 top-0 h-1/2 bg-[#050506]" />
      <div data-pt-lid="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050506]" />
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
        <div data-pt-line className="horizon-line w-[min(94vw,84rem)]" />
        <div
          data-pt-flare
          className="horizon-flare absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
        />
      </div>
    </div>
  );
}
