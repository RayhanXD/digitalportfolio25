"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScanRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right" | "top" | "bottom"
}

export function ScanReveal({ children, className, delay = 0, direction = "left" }: ScanRevealProps) {
  // Animation is purely enhancement - if it fails, content is still shown
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") {
      setAnimationComplete(true)
      return
    }

    try {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        setAnimationComplete(true)
        return
      }

      // Start in "needs animation" state
      setShouldAnimate(true)

      const triggerAnimation = () => {
        setTimeout(() => {
          setAnimationComplete(true)
        }, delay)
      }

      // Check if already in viewport
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100
        if (isInViewport) {
          triggerAnimation()
          return
        }
      }

      // Set up observer for elements not yet in viewport
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerAnimation()
            observer.disconnect()
          }
        },
        { threshold: 0.05, rootMargin: "100px" },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      const fallbackTimer = setTimeout(() => {
        setAnimationComplete(true)
      }, 2000)

      return () => {
        observer.disconnect()
        clearTimeout(fallbackTimer)
      }
    } catch (error) {
      // Silently fail during SSR/static generation
      console.error("Error in ScanReveal:", error)
      setAnimationComplete(true)
    }
  }, [delay])

  // If not yet mounted or animation complete, show full content
  // Animation only applies during the brief window when shouldAnimate=true and animationComplete=false
  const isAnimating = shouldAnimate && !animationComplete

  const transformMap = {
    left: isAnimating ? "translateX(-20px)" : "translateX(0)",
    right: isAnimating ? "translateX(20px)" : "translateX(0)",
    top: isAnimating ? "translateY(-20px)" : "translateY(0)",
    bottom: isAnimating ? "translateY(20px)" : "translateY(0)",
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-500 ease-out", className)}
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: transformMap[direction],
      }}
    >
      {children}
    </div>
  )
}
