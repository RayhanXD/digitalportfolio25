"use client"

import { cn } from "@/lib/utils"
import { useModeColor } from "@/hooks/use-mode-color"
import { TelemetryReadout } from "./telemetry-readout"
import { useEffect, useState } from "react"

interface TelemetryRailProps {
  className?: string
}

export function TelemetryRail({ className }: TelemetryRailProps) {
  const { currentColor, currentSection } = useModeColor()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.round(progress))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const colorMap = {
    cyan: "text-hud-cyan border-hud-cyan",
    violet: "text-hud-violet border-hud-violet",
    amber: "text-hud-amber border-hud-amber",
  }

  const bgMap = {
    cyan: "bg-hud-cyan",
    violet: "bg-hud-violet",
    amber: "bg-hud-amber",
  }

  const sectionLabels: Record<string, string> = {
    "01": "IDENTITY",
    "02": "PROOF",
    "03": "WORK",
    "04": "EXPERIENCE",
    "05": "LEADERSHIP",
    "06": "ABOUT",
    "07": "CONTACT",
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-10 bottom-0 w-16 md:w-20 z-40",
        "hidden lg:flex flex-col items-center py-6",
        "bg-background/50 backdrop-blur-sm border-r border-border/30",
        className,
      )}
    >
      {/* Section label - rotated */}
      <div className="flex-1 flex items-center leading-6">
        <span
          className={cn("hud-micro whitespace-nowrap", colorMap[currentColor])}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {sectionLabels[currentSection] || "SYSTEM"}
        </span>
      </div>

      {/* Scroll progress bar */}
      <div className="w-px h-32 bg-border/30 relative my-4">
        <div
          className={cn("absolute bottom-0 left-0 w-full transition-all duration-150", bgMap[currentColor])}
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Metrics readouts */}
      <div className="flex flex-col gap-3 items-center">
        <TelemetryReadout label="SEC" value={currentSection} color={currentColor} />
        <TelemetryReadout label="POS" value={`${scrollProgress}%`} color={currentColor} />
      </div>

      {/* Status block */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <div className={cn("w-2 h-2 animate-hud-pulse", bgMap[currentColor])} />
        <span className="hud-micro text-muted-foreground" style={{ fontSize: "8px" }}>
          ONLINE
        </span>
      </div>
    </aside>
  )
}
