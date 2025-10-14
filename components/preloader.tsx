"use client"

import { useEffect, useState } from "react"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const duration = 2500
    const interval = 20
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setProgress((currentStep / steps) * 100)

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setIsFadingOut(true)
          setTimeout(() => {
            onComplete()
          }, 200)
        }, 100)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: isFadingOut ? 0 : 1 }}
    >
      <div className="text-center space-y-8">
        <div className="relative font-mono text-5xl font-bold">
          <div className="absolute inset-0 text-purple-500 animate-pulse blur-sm">{"<RM />"}</div>
          <div className="absolute inset-0 text-pink-500 animate-pulse blur-md opacity-50">{"<RM />"}</div>
          <div className="relative gradient-text animate-[pulse_1.5s_ease-in-out_infinite] hover:scale-110 transition-transform">
            {"<RM />"}
          </div>
        </div>
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground font-mono">Loading portfolio...</p>
      </div>
    </div>
  )
}
