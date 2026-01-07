"use client"

import type React from "react"
import { useRef, useState, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { usePreloader } from "@/contexts/preloader-context"

type AnimationType =
  | "fade"
  | "fade-up"
  | "slide-up"
  | "slide-left"
  | "slide-right"
  | "text-reveal"
  | "line-expand"
  | "stagger-fade"
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
  "fade-up": "animate-fade-up",
  "slide-up": "",
  "slide-left": "",
  "slide-right": "",
  "text-reveal": "animate-text-reveal",
  "line-expand": "animate-line-expand",
  "stagger-fade": "animate-stagger-fade",
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

const keyframeAnimations = [
  "fade-up",
  "text-reveal",
  "line-expand",
  "stagger-fade",
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
]

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
  const { isLoading } = usePreloader()

  useEffect(() => {
    // Don't start observing until preloader is done
    if (isLoading) return

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerAnimation()
          observer.disconnect()
        }
      },
      {
        threshold: 0.15, // Element must be 15% visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before bottom of viewport
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay, duration, hasAnimated, isLoading])

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

  const useKeyframeAnimation = keyframeAnimations.includes(animation)

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
