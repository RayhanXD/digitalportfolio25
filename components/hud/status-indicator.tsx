import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "online" | "offline" | "processing" | "error"
  label?: string
  className?: string
}

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const statusConfig = {
    online: { color: "bg-hud-green", text: "text-hud-green", label: "ONLINE" },
    offline: { color: "bg-muted-foreground", text: "text-muted-foreground", label: "OFFLINE" },
    processing: { color: "bg-hud-amber", text: "text-hud-amber", label: "PROCESSING" },
    error: { color: "bg-hud-red", text: "text-hud-red", label: "ERROR" },
  }

  const config = statusConfig[status]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-2 h-2", config.color, status === "processing" && "animate-hud-pulse")} />
      <span className={cn("hud-micro", config.text)}>{label || config.label}</span>
    </div>
  )
}
