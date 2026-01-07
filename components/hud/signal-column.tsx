"use client"

import { cn } from "@/lib/utils"
import { useModeColor } from "@/hooks/use-mode-color"

interface SignalColumnProps {
  tags?: string[]
  className?: string
}

export function SignalColumn({ tags = [], className }: SignalColumnProps) {
  const { currentColor } = useModeColor()

  const colorMap = {
    cyan: "text-hud-cyan border-hud-cyan/30",
    violet: "text-hud-violet border-hud-violet/30",
    amber: "text-hud-amber border-hud-amber/30",
  }

  const defaultTags = ["AI/ML", "RAG", "AGENTS", "PYTHON", "TYPESCRIPT", "NEXTJS"]
  const displayTags = tags.length > 0 ? tags : defaultTags

  return (
    <aside
      className={cn(
        "fixed right-0 top-10 bottom-0 w-16 md:w-20 z-40",
        "hidden xl:flex flex-col items-center py-6",
        "bg-background/50 backdrop-blur-sm border-l border-border/30",
        className,
      )}
    >
      {/* Quick jump indicators */}
      <div className="flex flex-col gap-2 items-center">
        {["01", "02", "03", "04", "05", "06", "07"].map((num) => (
          <a
            key={num}
            href={`#section-${num}`}
            className={cn(
              "hud-micro text-muted-foreground hover:text-foreground transition-colors",
              "w-6 h-6 flex items-center justify-center",
            )}
          >
            {num}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="w-4 h-px bg-border/30 my-4" />

      {/* Tags - rotated */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        {displayTags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className={cn("hud-micro", colorMap[currentColor])}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </aside>
  )
}
