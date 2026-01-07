"use client"

import { cn } from "@/lib/utils"
import { useModeColor } from "@/hooks/use-mode-color"

interface SystemBarProps {
  className?: string
}

export function SystemBar({ className }: SystemBarProps) {
  const { currentColor, currentSection } = useModeColor()

  const colorMap = {
    cyan: "text-hud-cyan border-hud-cyan/30",
    violet: "text-hud-violet border-hud-violet/30",
    amber: "text-hud-amber border-hud-amber/30",
  }

  const bgMap = {
    cyan: "bg-hud-cyan",
    violet: "bg-hud-violet",
    amber: "bg-hud-amber",
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4 md:px-6",
        "bg-background/80 backdrop-blur-md border-b border-border/50",
        className,
      )}
    >
      {/* Left: System name */}
      <div className="flex items-center gap-3">
        <div className={cn("w-2 h-2 animate-hud-pulse", bgMap[currentColor])} />
        <span className="hud-micro text-foreground tracking-wider">RAYHAN.SYS</span>
      </div>

      {/* Center: Mode indicator */}
      <div className="hidden md:flex items-center gap-2">
        <span className="hud-micro text-muted-foreground">MODE</span>
        <span className={cn("hud-micro", colorMap[currentColor])}>{currentColor.toUpperCase()}</span>
        <span className="hud-micro text-muted-foreground mx-2">//</span>
        <span className="hud-micro text-muted-foreground">SEC</span>
        <span className={cn("hud-micro", colorMap[currentColor])}>{currentSection}</span>
      </div>

      {/* Right: Quick actions */}
      <nav className="flex items-center gap-4">
        <a href="#work" className={cn("hud-micro text-muted-foreground hover:text-foreground transition-colors")}>
          WORK
        </a>
        <a href="#about" className={cn("hud-micro text-muted-foreground hover:text-foreground transition-colors")}>
          ABOUT
        </a>
        <a
          href="#contact"
          className={cn("hud-micro px-3 py-1 border transition-colors", colorMap[currentColor], "hover:bg-current/10")}
        >
          CONTACT
        </a>
      </nav>
    </header>
  )
}
