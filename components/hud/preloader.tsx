"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [statusText, setStatusText] = useState("INITIALIZING")
  const [subline, setSubline] = useState("CALIBRATING MODULES")
  const [showTargetLock, setShowTargetLock] = useState(false)
  const [checksumVerified, setChecksumVerified] = useState(false)
  const [showWarning, setShowWarning] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const hasCompletedRef = useRef(false)
  const hasShownTargetLockRef = useRef(false)
  const hasVerifiedChecksumRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Mount-independent fallback: ensures preloader always dismisses even if isMounted never becomes true (e.g. hydration failure on Vercel)
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true
        setProgress(100)
        setIsExiting(true)
        setTimeout(() => {
          onCompleteRef.current?.()
        }, 600)
      }
    }, 5500)
    return () => clearTimeout(fallbackTimeout)
  }, [])

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      try {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        setPrefersReducedMotion(mediaQuery.matches)
      } catch (error) {
        console.error("Error checking reduced motion preference:", error)
        setPrefersReducedMotion(false)
      }
    }
  }, [])

  // Absolute maximum timeout - ensures preloader always completes
  useEffect(() => {
    if (!isMounted) return
    
    const absoluteTimeout = setTimeout(() => {
      if (!hasCompletedRef.current) {
        console.warn("Preloader timeout - forcing completion")
        hasCompletedRef.current = true
        setProgress(100)
        setIsExiting(true)
        setTimeout(() => {
          onCompleteRef.current?.()
        }, 600)
      }
    }, 5000) // 5 second absolute maximum

    return () => clearTimeout(absoluteTimeout)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted || hasCompletedRef.current) return

    let progressInterval: NodeJS.Timeout | null = null
    let safetyTimeout: NodeJS.Timeout | null = null
    let isCleanedUp = false

    try {
      const duration = prefersReducedMotion ? 1500 : 3000
      const startTime = Date.now()
      
      // Safety timeout to ensure preloader completes even if interval fails
      safetyTimeout = setTimeout(() => {
        if (!hasCompletedRef.current && !isCleanedUp) {
          hasCompletedRef.current = true
          setProgress(100)
          setIsExiting(true)
          setTimeout(() => {
            if (!isCleanedUp) {
              onCompleteRef.current?.()
            }
          }, 600)
        }
      }, duration + 1000)

      progressInterval = setInterval(() => {
        try {
          if (isCleanedUp || hasCompletedRef.current) {
            if (progressInterval) clearInterval(progressInterval)
            return
          }

          const elapsedTime = Date.now() - startTime
          const newProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100))
          
          setProgress(newProgress)
          setElapsed(elapsedTime)

          if (newProgress >= 30 && newProgress < 60) {
            setSubline("SYNCING TELEMETRY")
          } else if (newProgress >= 60 && newProgress < 90) {
            setSubline("LINKING SIGNALS")
            if (!hasShownTargetLockRef.current) {
              hasShownTargetLockRef.current = true
              setShowTargetLock(true)
            }
          } else if (newProgress >= 90) {
            setSubline("FINALIZING BOOT")
          }

          if (newProgress >= 80) {
            setStatusText("ONLINE")
            setShowWarning(false)
          }

          if (newProgress >= 95 && !hasVerifiedChecksumRef.current) {
            hasVerifiedChecksumRef.current = true
            setChecksumVerified(true)
          }

          if (newProgress >= 100) {
            if (progressInterval) clearInterval(progressInterval)
            hasCompletedRef.current = true
            setIsExiting(true)
            setTimeout(() => {
              if (!isCleanedUp) {
                onCompleteRef.current?.()
              }
            }, 600)
          }
        } catch (error) {
          console.error("Preloader interval error:", error)
          // Force completion on error
          if (progressInterval) clearInterval(progressInterval)
          hasCompletedRef.current = true
          setProgress(100)
          setIsExiting(true)
          setTimeout(() => {
            if (!isCleanedUp) {
              onCompleteRef.current?.()
            }
          }, 600)
        }
      }, 16)
    } catch (error) {
      console.error("Preloader setup error:", error)
      // Force immediate completion on setup error
      hasCompletedRef.current = true
      setProgress(100)
      setIsExiting(true)
      setTimeout(() => {
        if (!isCleanedUp) {
          onCompleteRef.current?.()
        }
      }, 600)
    }

    return () => {
      isCleanedUp = true
      if (progressInterval) clearInterval(progressInterval)
      if (safetyTimeout) clearTimeout(safetyTimeout)
    }
  }, [isMounted, prefersReducedMotion])

  const formatElapsed = useCallback((ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `T+00:00:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
  }, [])

  const segments = 60
  const filledSegments = Math.floor((progress / 100) * segments)

  if (!isMounted) {
    return <div className="fixed inset-0 z-[9999] bg-[#07070B]" />
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 bg-[#07070B]" />

      <div
        className={`absolute inset-0 transition-opacity duration-700 ${isExiting ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(243, 247, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 247, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        }}
      />

      <svg
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDelay: isExiting ? "0ms" : "200ms" }}
      >
        <line
          x1="5%"
          y1="20%"
          x2="35%"
          y2="20%"
          stroke="#00E5FF"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 8 20 8"
        />
        <line x1="5%" y1="19%" x2="5%" y2="21%" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
        <line x1="15%" y1="19.5%" x2="15%" y2="20.5%" stroke="#00E5FF" strokeWidth="1" opacity="0.2" />
        <line x1="25%" y1="19.5%" x2="25%" y2="20.5%" stroke="#00E5FF" strokeWidth="1" opacity="0.2" />
        <line x1="35%" y1="19%" x2="35%" y2="21%" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />

        <line
          x1="85%"
          y1="25%"
          x2="85%"
          y2="55%"
          stroke="#00E5FF"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="2 12 8 12"
        />

        <line
          x1="10%"
          y1="85%"
          x2="30%"
          y2="75%"
          stroke="#00E5FF"
          strokeWidth="1"
          opacity="0.12"
          strokeDasharray="6 10"
        />
      </svg>

      <div
        className={`absolute top-6 left-6 md:top-8 md:left-8 transition-all duration-300 ${
          isExiting ? "opacity-0 -translate-x-4" : "opacity-100"
        }`}
      >
        <span
          className="text-[#9AA4B2] uppercase tracking-[0.18em] text-[11px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          BOOT SEQUENCE
        </span>
      </div>

      <div
        className={`absolute top-6 right-6 md:top-8 md:right-8 transition-all duration-300 ${
          isExiting ? "opacity-0 translate-x-4" : "opacity-100"
        }`}
      >
        <span
          className="text-[#00E5FF] uppercase tracking-[0.18em] text-[11px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {formatElapsed(elapsed)}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`relative w-full max-w-[520px] transition-all duration-500 ${
            isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div
            className="relative p-8 md:p-10"
            style={{
              clipPath:
                "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
              background: "rgba(7, 7, 11, 0.95)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath:
                  "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))",
                border: "1px solid rgba(0, 229, 255, 0.3)",
                background: "transparent",
              }}
            />

            <svg className="absolute top-0 left-0 w-6 h-6" viewBox="0 0 24 24">
              <path d="M0 16 L0 0 L16 0" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
            </svg>
            <svg className="absolute top-0 right-0 w-6 h-6" viewBox="0 0 24 24">
              <path d="M8 0 L24 0 L24 16" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-6 h-6" viewBox="0 0 24 24">
              <path d="M0 8 L0 24 L16 24" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-6 h-6" viewBox="0 0 24 24">
              <path d="M8 24 L24 24 L24 8" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
            </svg>

            {showTargetLock && !prefersReducedMotion && (
              <div
                className="absolute -inset-3 pointer-events-none animate-pulse"
                style={{
                  border: "1px solid rgba(0, 229, 255, 0.4)",
                  clipPath:
                    "polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              />
            )}

            <div className="text-center space-y-6">
              <h1
                className="text-[#F3F7FF] text-2xl md:text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                INITIALIZING SYSTEM
              </h1>

              <p
                className="text-[#9AA4B2] text-sm tracking-wide transition-opacity duration-200"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {subline}
              </p>

              <div className="space-y-3">
                <div className="flex gap-[2px] justify-center">
                  {Array.from({ length: segments }).map((_, i) => {
                    const isFilled = i < filledSegments
                    const isBlinking = i === filledSegments && progress < 100
                    const isVioletAccent = isFilled && (i === 20 || i === 40)
                    const isAmberAccent = isFilled && i === 50

                    let bgColor = "rgba(243, 247, 255, 0.1)"
                    if (isFilled) {
                      if (isVioletAccent) bgColor = "#9B5CFF"
                      else if (isAmberAccent) bgColor = "#FFB020"
                      else bgColor = "#00E5FF"
                    }

                    return (
                      <div
                        key={`segment-${i}`}
                        className={`h-[3px] w-[6px] md:w-[7px] transition-all duration-75 ${
                          isBlinking && !prefersReducedMotion ? "animate-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: bgColor,
                          opacity: isFilled ? (isVioletAccent || isAmberAccent ? 0.8 : 0.9) : 0.15,
                          boxShadow: isFilled ? `0 0 4px ${bgColor}` : "none",
                        }}
                      />
                    )
                  })}
                </div>

                <div className="flex justify-center gap-6">
                  <span
                    className="text-[#00E5FF] text-[11px] uppercase tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LOAD: {progress.toString().padStart(3, "0")}%
                  </span>
                  <span
                    className="text-[#9AA4B2] text-[11px] uppercase tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    COORD: X:014 Y:221
                  </span>
                </div>
              </div>

              <div
                className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  checksumVerified ? "text-[#76FF5A]" : "text-[#FF4D4D]"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                CHECKSUM {checksumVerified ? "OK" : "PENDING"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-6 left-6 md:bottom-8 md:left-8 transition-all duration-300 ${
          isExiting ? "opacity-0 -translate-y-4" : "opacity-100"
        }`}
      >
        <div className="relative px-3 py-2 border border-[rgba(0,229,255,0.25)]">
          <svg className="absolute -top-[2px] -left-[2px] w-2 h-2" viewBox="0 0 8 8">
            <path d="M0 8 L0 0 L8 0" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
          </svg>
          <svg className="absolute -top-[2px] -right-[2px] w-2 h-2" viewBox="0 0 8 8">
            <path d="M0 0 L8 0 L8 8" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
          </svg>
          <svg className="absolute -bottom-[2px] -left-[2px] w-2 h-2" viewBox="0 0 8 8">
            <path d="M0 0 L0 8 L8 8" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
          </svg>
          <svg className="absolute -bottom-[2px] -right-[2px] w-2 h-2" viewBox="0 0 8 8">
            <path d="M0 8 L8 8 L8 0" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
          </svg>

          <span
            className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              statusText === "ONLINE" ? "text-[#76FF5A]" : "text-[#00E5FF]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            STATUS: {statusText}
          </span>
        </div>
      </div>

      <div
        className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 transition-all duration-500 ${
          showWarning ? "opacity-100" : "opacity-0 translate-y-2"
        }`}
      >
        <span
          className="text-[#FFB020] text-[11px] uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          TRACE VALIDATION...
        </span>
      </div>

      <style jsx>{`
        @keyframes scan-sweep {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </div>
  )
}
