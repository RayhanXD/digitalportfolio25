"use client"

import { cn } from "@/lib/utils"

interface CornerBracketsProps {
  color?: "cyan" | "violet" | "amber"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CornerBrackets({ color = "cyan", size = "md", className }: CornerBracketsProps) {
  const colorMap = {
    cyan: "text-hud-cyan",
    violet: "text-hud-violet",
    amber: "text-hud-amber",
  }

  const sizeMap = {
    sm: 8,
    md: 12,
    lg: 16,
  }

  const s = sizeMap[size]

  return (
    <>
      {/* Top Left */}
      <svg
        className={cn("absolute top-0 left-0 opacity-60", colorMap[color], className)}
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M0 ${s}V0H${s}`} stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Top Right */}
      <svg
        className={cn("absolute top-0 right-0 opacity-60", colorMap[color], className)}
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M0 0H${s}V${s}`} stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Bottom Left */}
      <svg
        className={cn("absolute bottom-0 left-0 opacity-60", colorMap[color], className)}
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M0 0V${s}H${s}`} stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Bottom Right */}
      <svg
        className={cn("absolute bottom-0 right-0 opacity-60", colorMap[color], className)}
        width={s}
        height={s}
        viewBox={`0 0 ${s} ${s}`}
        fill="none"
      >
        <path d={`M${s} 0V${s}H0`} stroke="currentColor" strokeWidth="1" />
      </svg>
    </>
  )
}
