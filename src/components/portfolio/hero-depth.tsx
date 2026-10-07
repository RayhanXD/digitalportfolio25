"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type PlaneKind = "stars" | "dust";

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STAR_TINTS = ["255,255,255", "214,232,255", "120,180,232", "255,226,205"];

function paint(canvas: HTMLCanvasElement, kind: PlaneKind) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const r = rng(kind === "stars" ? 7 : 29);
  ctx.clearRect(0, 0, w, h);

  if (kind === "stars") {
    const count = Math.round((width * height) / 2600);
    for (let i = 0; i < count; i++) {
      const m = Math.pow(r(), 3.4);
      const x = r() * w;
      const y = r() * h;
      const rad = (0.35 + m * 1.3) * dpr;
      ctx.globalAlpha = 0.18 + m * 0.7;
      ctx.fillStyle = `rgb(${STAR_TINTS[(r() * STAR_TINTS.length) | 0]})`;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  // Dust: soft out-of-focus motes, kept off the centre column where the name sits
  const count = width < 768 ? 14 : 26;
  for (let i = 0; i < count; i++) {
    let x = r();
    if (x > 0.3 && x < 0.7) x = x < 0.5 ? x - 0.26 : x + 0.26;
    const y = 0.08 + r() * 0.9;
    const rad = (6 + Math.pow(r(), 2) * 34) * dpr;
    const warm = r() > 0.55;
    const g = ctx.createRadialGradient(x * w, y * h, 0, x * w, y * h, rad);
    const c = warm ? "255,181,153" : "120,180,232";
    const a = 0.08 + r() * 0.16;
    g.addColorStop(0, `rgba(${c},${a})`);
    g.addColorStop(0.55, `rgba(${c},${a * 0.45})`);
    g.addColorStop(1, `rgba(${c},0)`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = g;
    ctx.fillRect(x * w - rad, y * h - rad, rad * 2, rad * 2);
  }
}

/**
 * One generated plane of the hero's depth stack. Purely decorative; the hero
 * moves it with scroll and pointer at its own rate.
 */
export function HeroDepthPlane({ kind, className }: { kind: PlaneKind; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const run = () => paint(canvas, kind);
    run();
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(run, 120);
    });
    ro.observe(canvas);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [kind]);

  return <canvas ref={ref} className={cn("block h-full w-full", className)} aria-hidden />;
}
