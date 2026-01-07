"use client"

import { useState, useRef, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface TargetLockProps {
  children: ReactNode
  className?: string
  color?: "cyan" | "violet" | "amber"
  showCoordinates?: boolean
}

export function TargetLock({ children, className, color = "cyan", showCoordinates = true }: TargetLockProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const borderColorMap = {
    cyan: "border-hud-cyan text-hud-cyan",
    violet: "border-hud-violet text-hud-violet",
    amber: "border-hud-amber text-hud-amber",
  }

  const bgColorMap = {
    cyan: "bg-hud-cyan",
    violet: "bg-hud-violet",
    amber: "bg-hud-amber",
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && !prefersReducedMotion) {
      const rect = containerRef.current.getBoundingClientRect()
      setCoords({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative group cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {/* Target lock border overlay */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Corner brackets */}
        <div className={cn("absolute top-0 left-0 w-4 h-4 border-l border-t", borderColorMap[color])} />
        <div className={cn("absolute top-0 right-0 w-4 h-4 border-r border-t", borderColorMap[color])} />
        <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-l border-b", borderColorMap[color])} />
        <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-r border-b", borderColorMap[color])} />

        {/* Side tick marks - using static class maps */}
        <div className={cn("absolute top-1/2 left-0 w-2 h-px -translate-y-1/2", bgColorMap[color])} />
        <div className={cn("absolute top-1/2 right-0 w-2 h-px -translate-y-1/2", bgColorMap[color])} />
        <div className={cn("absolute left-1/2 top-0 h-2 w-px -translate-x-1/2", bgColorMap[color])} />
        <div className={cn("absolute left-1/2 bottom-0 h-2 w-px -translate-x-1/2", bgColorMap[color])} />

        {/* Coordinate display */}
        {showCoordinates && (
          <div className={cn("absolute bottom-1 right-1 hud-micro", borderColorMap[color])} style={{ fontSize: "8px" }}>
            X:{String(coords.x).padStart(3, "0")} Y:{String(coords.y).padStart(3, "0")}
          </div>
        )}
      </div>
    </div>
  )
}
