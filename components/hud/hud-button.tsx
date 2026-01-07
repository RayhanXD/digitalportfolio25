"use client"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react"

interface HudButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  modeColor?: "cyan" | "violet" | "amber"
  asChild?: boolean
}

export const HudButton = forwardRef<HTMLButtonElement, HudButtonProps>(
  ({ children, variant = "primary", size = "md", modeColor = "cyan", className, asChild = false, ...props }, ref) => {
    const colorMap = {
      cyan: {
        primary: "bg-hud-cyan text-background hover:bg-hud-cyan/90",
        secondary: "border-hud-cyan text-hud-cyan hover:bg-hud-cyan/10",
        ghost: "text-hud-cyan hover:bg-hud-cyan/10",
      },
      violet: {
        primary: "bg-hud-violet text-background hover:bg-hud-violet/90",
        secondary: "border-hud-violet text-hud-violet hover:bg-hud-violet/10",
        ghost: "text-hud-violet hover:bg-hud-violet/10",
      },
      amber: {
        primary: "bg-hud-amber text-background hover:bg-hud-amber/90",
        secondary: "border-hud-amber text-hud-amber hover:bg-hud-amber/10",
        ghost: "text-hud-amber hover:bg-hud-amber/10",
      },
    }

    const sizeMap = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }

    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          "hud-panel-sm font-medium transition-colors inline-flex items-center justify-center",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          variant === "secondary" && "border bg-transparent",
          colorMap[modeColor][variant],
          sizeMap[size],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
HudButton.displayName = "HudButton"
