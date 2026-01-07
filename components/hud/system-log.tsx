"use client"

import { cn } from "@/lib/utils"
import { useModeColor } from "@/hooks/use-mode-color"
import { useEffect, useState, useRef } from "react"

interface SystemLogProps {
  className?: string
}

const sectionMessages: Record<string, string> = {
  "01": "// IDENTITY MODULE LOADED",
  "02": "// TELEMETRY STREAM ACTIVE",
  "03": "// RENDERING PROJECT ARCHIVES",
  "04": "// TIMELINE DATA SYNCHRONIZED",
  "05": "// TRANSMISSION PACKETS READY",
  "06": "// OPERATOR PROFILE ACCESSED",
  "07": "// CHANNEL OPEN FOR INPUT",
}

export function SystemLog({ className }: SystemLogProps) {
  const { currentSection, currentColor } = useModeColor()
  const [displayMessage, setDisplayMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const prevMessageRef = useRef("")

  const colorMap = {
    cyan: "text-hud-cyan",
    violet: "text-hud-violet",
    amber: "text-hud-amber",
  }

  useEffect(() => {
    const targetMessage = sectionMessages[currentSection] || "// SYSTEM READY"

    if (targetMessage !== prevMessageRef.current) {
      prevMessageRef.current = targetMessage
      setIsTyping(true)
      setDisplayMessage("")

      let index = 0
      const interval = setInterval(() => {
        if (index < targetMessage.length) {
          setDisplayMessage(targetMessage.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(interval)
        }
      }, 30)

      return () => clearInterval(interval)
    }
  }, [currentSection])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 h-8",
        "hidden lg:flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm border-t border-border/30",
        className,
      )}
    >
      <span className={cn("font-mono text-xs", colorMap[currentColor])}>
        {displayMessage}
        {isTyping && <span className="animate-hud-pulse">_</span>}
      </span>
    </div>
  )
}
