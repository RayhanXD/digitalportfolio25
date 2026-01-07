"use client"

import { useState, useEffect, useCallback } from "react"

type ModeColor = "cyan" | "violet" | "amber"

interface SectionColorMap {
  [sectionId: string]: ModeColor
}

const defaultSectionColors: SectionColorMap = {
  "01": "cyan",
  "02": "cyan",
  "03": "violet",
  "04": "violet",
  "05": "amber",
  "06": "amber",
  "07": "amber",
}

export function useModeColor(sectionId?: string) {
  const [currentSection, setCurrentSection] = useState<string>("01")

  const getModeColor = useCallback((id: string): ModeColor => {
    return defaultSectionColors[id] || "cyan"
  }, [])

  const currentColor = sectionId ? getModeColor(sectionId) : getModeColor(currentSection)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section-id]")
      let activeSection = "01"

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 3) {
          activeSection = section.getAttribute("data-section-id") || "01"
        }
      })

      setCurrentSection(activeSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return {
    currentSection,
    currentColor,
    getModeColor,
  }
}
