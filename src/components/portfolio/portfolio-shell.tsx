"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid3x3,
  Home,
  Mail,
  Rocket,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { LocomotiveScrollProvider } from "@/components/portfolio/locomotive-scroll-provider";
import { PagePreloader } from "@/components/portfolio/page-preloader";

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

function NavPill({ items, ariaLabel }: { items: readonly NavItem[]; ariaLabel: string }) {
  const pathname = usePathname();
  return (
    <nav className={navPillClass} aria-label={ariaLabel}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
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

export function PortfolioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative min-h-screen text-on-surface-singularity selection:bg-secondary-singularity selection:text-on-secondary-singularity",
        pathname !== "/" &&
          "bg-surface-container-lowest bg-[radial-gradient(ellipse_120%_80%_at_100%_0%,rgba(120,180,232,0.06),transparent_50%),radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(255,181,153,0.04),transparent_45%)]"
      )}
    >
      <PagePreloader />
      <DottedSurface
        className={cn(
          "fixed inset-0 -z-20 opacity-40",
          pathname === "/" && "hidden"
        )}
        aria-hidden
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex w-full items-start justify-between px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-4 sm:pt-[max(1rem,env(safe-area-inset-top))] sm:pb-4 lg:px-5 lg:pt-[max(1.25rem,env(safe-area-inset-top))] lg:pb-5">
        <NavPill items={navLeft} ariaLabel="Home and about" />
        <NavPill items={navRight} ariaLabel="Projects and contact" />
      </header>

      <main className="relative z-0 min-h-screen w-full">
        <LocomotiveScrollProvider>{children}</LocomotiveScrollProvider>
      </main>

      {pathname !== "/contact" && (
        <div className="pointer-events-none fixed bottom-6 right-5 z-50 md:bottom-10 md:right-10">
          <Link
            href="/contact"
            className="pointer-events-auto flex size-16 items-center justify-center rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-transform hover:scale-110 active:scale-95"
            aria-label="Contact"
          >
            <Rocket className="size-7" strokeWidth={2.5} />
          </Link>
        </div>
      )}
    </div>
  );
}
