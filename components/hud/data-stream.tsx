"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface DataStreamProps {
  className?: string
  color?: "cyan" | "violet" | "amber"
  speed?: "slow" | "normal" | "fast"
}

export function DataStream({ className, color = "cyan", speed = "normal" }: DataStreamProps) {
  const [chars, setChars] = useState<string[]>(["0", "1", "0", "1", "1", "0", "1", "0"])

  const colorMap = {
    cyan: "text-hud-cyan",
    violet: "text-hud-violet",
    amber: "text-hud-amber",
  }

  const speedMap = {
    slow: 200,
    normal: 100,
    fast: 50,
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      return
    }

    const characters = "01"
    const interval = setInterval(() => {
      setChars(
        Array(8)
          .fill(0)
          .map(() => characters[Math.floor(Math.random() * characters.length)]),
      )
    }, speedMap[speed])

    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className={cn("font-mono text-xs opacity-30", colorMap[color], className)}>
      {chars.map((char, i) => (
        <span key={`char-${i}`}>{char}</span>
      ))}
    </div>
  )
}
