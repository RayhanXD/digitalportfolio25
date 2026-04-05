"use client";

import type { ReactNode } from "react";
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
import { PagePreloader } from "@/components/portfolio/page-preloader";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Grid3x3 },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function PortfolioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-surface-container-lowest text-on-surface-singularity selection:bg-secondary-singularity selection:text-on-secondary-singularity">
      <PagePreloader />
      <DottedSurface className="fixed inset-0 -z-20 opacity-40" aria-hidden />

      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-white/10 bg-[#131313] p-6 lg:flex">
        <div className="mb-12">
          <h2 className="font-headline text-xl font-black uppercase text-white">
            Rayhan Mohammad
          </h2>
          <p className="font-label mt-1 text-xs uppercase tracking-widest text-neutral-600">
            Stats & CS · UT Austin
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-md p-3 font-label text-xs uppercase tracking-widest transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-neutral-600 hover:bg-neutral-800"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-3 border-t border-white/5">
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-headline text-[10px] font-bold tracking-tight text-white"
            aria-hidden
          >
            RM
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-tight text-white">
              Software & ML
            </p>
            <p className="text-[10px] uppercase text-neutral-500">
              Open to roles
            </p>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-64">
        <div
          className={cn(
            pathname !== "/projects" &&
              pathname !== "/about" &&
              pathname !== "/contact" &&
              "pb-24 md:pb-12 lg:pb-8",
            pathname !== "/" &&
              pathname !== "/projects" &&
              pathname !== "/about" &&
              pathname !== "/contact" &&
              "pt-6 md:pt-8"
          )}
        >
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/5 bg-neutral-950/90 py-4 backdrop-blur-xl lg:hidden">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1",
                active ? "text-white" : "text-neutral-500"
              )}
            >
              <Icon className="size-5" />
              <span className="font-label text-[8px] uppercase">
                {item.label === "Projects" ? "Works" : item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {pathname !== "/contact" && (
        <div className="pointer-events-none fixed bottom-24 right-6 z-50 md:bottom-10 md:right-10">
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
