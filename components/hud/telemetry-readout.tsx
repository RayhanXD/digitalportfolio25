import { cn } from "@/lib/utils"

interface TelemetryReadoutProps {
  label: string
  value: string | number
  color?: "cyan" | "violet" | "amber"
  className?: string
}

export function TelemetryReadout({ label, value, color = "cyan", className }: TelemetryReadoutProps) {
  const colorMap = {
    cyan: "text-hud-cyan",
    violet: "text-hud-violet",
    amber: "text-hud-amber",
  }

  return (
    <div className={cn("flex flex-col items-center gap-0.5", className)}>
      <span className="hud-micro text-muted-foreground" style={{ fontSize: "8px" }}>
        {label}
      </span>
      <span className={cn("font-mono text-xs font-medium", colorMap[color])}>{value}</span>
    </div>
  )
}
