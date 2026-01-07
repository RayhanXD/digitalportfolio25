import { cn } from "@/lib/utils"
import { CornerBrackets } from "./corner-brackets"

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  subtext?: string
  color?: "cyan" | "violet" | "amber"
  className?: string
}

export function MetricCard({ label, value, unit, subtext, color = "cyan", className }: MetricCardProps) {
  const colorMap = {
    cyan: "text-hud-cyan",
    violet: "text-hud-violet",
    amber: "text-hud-amber",
  }

  return (
    <div className={cn("relative p-4 bg-card border border-border/50", className)}>
      <CornerBrackets color={color} size="sm" />

      <span className="hud-micro text-muted-foreground block mb-2">{label}</span>

      <div className="flex items-baseline gap-1">
        <span className={cn("text-3xl font-mono font-bold", colorMap[color])}>{value}</span>
        {unit && <span className="hud-micro text-muted-foreground">{unit}</span>}
      </div>

      {subtext && <span className="hud-micro text-muted-foreground mt-1 block">{subtext}</span>}
    </div>
  )
}
