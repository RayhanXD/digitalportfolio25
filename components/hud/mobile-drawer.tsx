"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useModeColor } from "@/hooks/use-mode-color"
import { Menu, X } from "lucide-react"

interface MobileDrawerProps {
  className?: string
}

export function MobileDrawer({ className }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { currentColor } = useModeColor()

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

  const navItems = [
    { label: "IDENTITY", href: "#section-01" },
    { label: "PROOF", href: "#section-02" },
    { label: "WORK", href: "#section-03" },
    { label: "EXPERIENCE", href: "#section-04" },
    { label: "LEADERSHIP", href: "#section-05" },
    { label: "ABOUT", href: "#section-06" },
    { label: "CONTACT", href: "#section-07" },
  ]

  return (
    <div className={cn("lg:hidden", className)}>
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-4 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 animate-hud-pulse", bgMap[currentColor])} />
          <span className="hud-micro text-foreground">RAYHAN.SYS</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("p-2 border", colorMap[currentColor])}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {/* Drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-12" onClick={() => setIsOpen(false)}>
          <nav className="flex flex-col items-center justify-center h-full gap-6">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "hud-subheader text-muted-foreground hover:text-foreground transition-colors",
                  "flex items-center gap-3",
                )}
              >
                <span className={cn("hud-micro", colorMap[currentColor])}>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
