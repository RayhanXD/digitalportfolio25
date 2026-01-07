"use client"

import type React from "react"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-left"
  | "slide-right"
  | "glitch"
  | "data-stream"
  | "terminal"
  | "scale-pop"
  | "cascade"
  | "border-draw"
  | "timeline-tick"
  | "transmission"
  | "channel-open"
  | "value-count"

interface AnimatedRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  animation?: AnimationType
  duration?: number
}

const animationClasses: Record<AnimationType, string> = {
  fade: "",
  "slide-up": "",
  "slide-left": "",
  "slide-right": "",
  glitch: "animate-glitch-reveal",
  "data-stream": "animate-data-stream",
  terminal: "animate-terminal",
  "scale-pop": "animate-scale-pop",
  cascade: "animate-cascade",
  "border-draw": "animate-border-draw",
  "timeline-tick": "animate-timeline-tick",
  transmission: "animate-transmission",
  "channel-open": "animate-channel-open",
  "value-count": "animate-value-count",
}

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  animation = "fade",
  duration = 500,
}: AnimatedRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      setHasAnimated(true)
      return
    }

    const triggerAnimation = () => {
      setTimeout(() => {
        setIsVisible(true)
        setTimeout(() => setHasAnimated(true), duration)
      }, delay)
    }

    // Check if already in viewport
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight + 50 && rect.bottom > -50
      if (isInViewport) {
        triggerAnimation()
        return
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // Fallback
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
      setHasAnimated(true)
    }, 3000)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [delay, duration, hasAnimated])

  // Custom styles for basic animations
  const getInitialStyles = (): React.CSSProperties => {
    if (hasAnimated) return {}
    if (isVisible && animationClasses[animation]) return {}

    switch (animation) {
      case "fade":
        return { opacity: isVisible ? 1 : 0, transition: `opacity ${duration}ms ease-out` }
      case "slide-up":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: `all ${duration}ms ease-out`,
        }
      case "slide-left":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
          transition: `all ${duration}ms ease-out`,
        }
      case "slide-right":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(30px)",
          transition: `all ${duration}ms ease-out`,
        }
      default:
        return { opacity: isVisible ? 1 : 0 }
    }
  }

  const useKeyframeAnimation = [
    "glitch",
    "data-stream",
    "terminal",
    "scale-pop",
    "cascade",
    "border-draw",
    "timeline-tick",
    "transmission",
    "channel-open",
    "value-count",
  ].includes(animation)

  return (
    <div
      ref={ref}
      className={cn(useKeyframeAnimation && isVisible && animationClasses[animation], className)}
      style={{
        ...(!useKeyframeAnimation ? getInitialStyles() : {}),
        ...(useKeyframeAnimation && !isVisible ? { opacity: 0 } : {}),
      }}
    >
      {children}
    </div>
  )
}
