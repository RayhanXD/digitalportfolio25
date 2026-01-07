import { cn } from "@/lib/utils"

interface ModuleHeaderProps {
  id: string
  title: string
  modeColor?: "cyan" | "violet" | "amber"
  timestamp?: string
  className?: string
}

export function ModuleHeader({ id, title, modeColor = "cyan", timestamp, className }: ModuleHeaderProps) {
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

  return (
    <div className={cn("flex items-center gap-4 mb-6", className)}>
      {/* Module ID */}
      <span className={cn("hud-micro", colorMap[modeColor])}>{id}</span>

      {/* Color rule */}
      <div className={cn("h-px flex-1 opacity-30", bgMap[modeColor])} />

      {/* Title */}
      <h2 className="hud-header text-foreground">{title}</h2>

      {/* Extended rule */}
      <div className={cn("h-px flex-1 opacity-30", bgMap[modeColor])} />

      {/* Timestamp meta */}
      {timestamp && <span className="hud-micro text-muted-foreground">{timestamp}</span>}
    </div>
  )
}
