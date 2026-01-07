import { cn } from "@/lib/utils"

interface ScanLineProps {
  className?: string
  intensity?: "light" | "medium" | "heavy"
}

export function ScanLine({ className, intensity = "light" }: ScanLineProps) {
  const opacityMap = {
    light: "opacity-[0.02]",
    medium: "opacity-[0.04]",
    heavy: "opacity-[0.06]",
  }

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", opacityMap[intensity], className)}
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 1) 2px,
          rgba(0, 0, 0, 1) 4px
        )`,
      }}
      aria-hidden="true"
    />
  )
}
