import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { CornerBrackets } from "./corner-brackets"

interface HudFrameProps {
  children: ReactNode
  className?: string
  modeColor?: "cyan" | "violet" | "amber"
  showCorners?: boolean
  variant?: "default" | "panel" | "inset"
}

export function HudFrame({
  children,
  className,
  modeColor = "cyan",
  showCorners = true,
  variant = "default",
}: HudFrameProps) {
  const colorMap = {
    cyan: "border-hud-cyan/20",
    violet: "border-hud-violet/20",
    amber: "border-hud-amber/20",
  }

  return (
    <div
      className={cn(
        "relative",
        variant === "panel" && "hud-panel bg-background/50 backdrop-blur-sm",
        variant === "inset" && "bg-background/30",
        colorMap[modeColor],
        className,
      )}
    >
      {showCorners && <CornerBrackets color={modeColor} />}
      {children}
    </div>
  )
}
