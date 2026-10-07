"use client";

import type { ComponentType, ReactNode, RefObject } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid3x3,
  Home,
  Mail,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, gsap, MQ } from "@/lib/motion";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { LocomotiveScrollProvider } from "@/components/portfolio/locomotive-scroll-provider";
import {
  PagePreloader,
  type PagePreloaderPhase,
} from "@/components/portfolio/page-preloader";
import { IntroReadyContext } from "@/components/portfolio/intro-phase";
import { PageTransition } from "@/components/portfolio/page-transition";

type NavIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}>;

type NavItem = { href: string; label: string; icon: NavIcon };

const navLeft: readonly NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
];

const navRight: readonly NavItem[] = [
  { href: "/projects", label: "Projects", icon: Grid3x3 },
  { href: "/contact", label: "Contact", icon: Mail },
];

const navPillClass = "pointer-events-auto flex items-center gap-0.5 sm:gap-1";

function NavPill({
  items,
  ariaLabel,
  linkRefs,
}: {
  items: readonly NavItem[];
  ariaLabel: string;
  linkRefs: RefObject<Map<string, HTMLAnchorElement>>;
}) {
  const pathname = usePathname();
  return (
    <nav className={navPillClass} aria-label={ariaLabel}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            ref={(el) => {
              if (el) linkRefs.current.set(item.href, el);
              else linkRefs.current.delete(item.href);
            }}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex size-9 items-center justify-center rounded-lg transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:size-10",
              active ? "text-white" : "text-neutral-500 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "size-[17px] shrink-0 sm:size-[18px]",
                active && "drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
              )}
              strokeWidth={active ? 2.25 : 1.75}
              aria-hidden
            />
          </Link>
        );
      })}
    </nav>
  );
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * A short streak of light under the active nav icon. On route change it glides to the
 * new icon — across the whole header when moving between the left and right pills.
 */
function measureIndicator(header: HTMLElement | null, link: HTMLAnchorElement | undefined) {
  if (!header || !link) return null;
  const h = header.getBoundingClientRect();
  const l = link.getBoundingClientRect();
  return { x: l.left - h.left + l.width / 2, y: l.bottom - h.top + 2 };
}

function useNavIndicator(
  headerRef: RefObject<HTMLElement | null>,
  indicatorRef: RefObject<HTMLDivElement | null>,
  linkRefs: RefObject<Map<string, HTMLAnchorElement>>
) {
  const pathname = usePathname();
  const placedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    const pos = measureIndicator(headerRef.current, linkRefs.current.get(pathname));
    if (!pos) {
      gsap.to(indicator, { opacity: 0, duration: 0.3 });
      return;
    }

    const reduce = window.matchMedia(MQ.reduce).matches;
    if (!placedRef.current || reduce) {
      placedRef.current = true;
      gsap.set(indicator, { x: pos.x, y: pos.y, xPercent: -50, opacity: 1 });
      return;
    }

    const tl = gsap.timeline();
    tl.to(indicator, { x: pos.x, y: pos.y, opacity: 1, duration: 0.9, ease: EASE.travel }, 0)
      // Stretch into a streak mid-flight, then settle back to a point
      .to(indicator, { scaleX: 5, duration: 0.45, ease: "power2.in" }, 0)
      .to(indicator, { scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.45);
    return () => {
      tl.kill();
    };
  }, [pathname, headerRef, indicatorRef, linkRefs]);

  useEffect(() => {
    const onResize = () => {
      const pos = measureIndicator(headerRef.current, linkRefs.current.get(pathname));
      if (pos && indicatorRef.current) gsap.set(indicatorRef.current, { x: pos.x, y: pos.y });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, headerRef, indicatorRef, linkRefs]);
}

export function PortfolioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [preloaderPhase, setPreloaderPhase] =
    useState<PagePreloaderPhase>("run");
  const [transitionCovered, setTransitionCovered] = useState(false);
  const introReady = preloaderPhase !== "run" && !transitionCovered;
  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  useNavIndicator(headerRef, indicatorRef, linkRefs);

  return (
    <div
      className={cn(
        "relative min-h-screen text-on-surface-singularity selection:bg-secondary-singularity selection:text-on-secondary-singularity",
        pathname !== "/" &&
          "bg-surface-container-lowest bg-[radial-gradient(ellipse_120%_80%_at_100%_0%,rgba(120,180,232,0.06),transparent_50%),radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(255,181,153,0.04),transparent_45%)]"
      )}
    >
      <PagePreloader onPhaseChange={setPreloaderPhase} />
      <PageTransition onCoveredChange={setTransitionCovered} />
      <DottedSurface
        className={cn(
          "fixed inset-0 -z-20 opacity-40",
          pathname === "/" && "hidden"
        )}
        aria-hidden
      />

      {/* z-[95]: above the transition lids (z-90) so the nav indicator glides in view mid-wipe */}
      <header
        ref={headerRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-[95] flex w-full items-start justify-between px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-4 sm:pt-[max(1rem,env(safe-area-inset-top))] sm:pb-4 lg:px-5 lg:pt-[max(1.25rem,env(safe-area-inset-top))] lg:pb-5"
      >
        <NavPill items={navLeft} ariaLabel="Home and about" linkRefs={linkRefs} />
        <NavPill items={navRight} ariaLabel="Projects and contact" linkRefs={linkRefs} />
        <div
          ref={indicatorRef}
          className="pointer-events-none absolute left-0 top-0 h-px w-3 bg-white opacity-0 shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_16px_rgba(120,180,232,0.6)]"
          aria-hidden
        />
      </header>

      <main className="relative z-0 min-h-screen w-full">
        {/*
          Only translated while the preloader runs: any `translate` value (even 0) makes this
          the containing block for `position: fixed` page backgrounds, so they'd scroll away.
          Home runs its own horizon intro instead of the nudge.
        */}
        <div
          className={cn(
            "transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            preloaderPhase === "run" &&
              pathname !== "/" &&
              "translate-y-[8px] motion-reduce:translate-none"
          )}
        >
          <IntroReadyContext.Provider value={introReady}>
            <LocomotiveScrollProvider>{children}</LocomotiveScrollProvider>
          </IntroReadyContext.Provider>
        </div>
      </main>
    </div>
  );
}
