"use client"

import { useCallback } from "react"
import { Preloader } from "@/components/hud/preloader"
import { SystemBar } from "@/components/hud/system-bar"
import { TelemetryRail } from "@/components/hud/telemetry-rail"
import { SignalColumn } from "@/components/hud/signal-column"
import { SystemLog } from "@/components/hud/system-log"
import { MobileDrawer } from "@/components/hud/mobile-drawer"
import { ScanLine } from "@/components/hud/scan-line"
import { PreloaderProvider, usePreloader } from "@/contexts/preloader-context"

import { IdentitySection } from "@/components/sections/identity-section"
import { ProofSection } from "@/components/sections/proof-section"
import { WorkSection } from "@/components/sections/work-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"

function PortfolioContent() {
  const { isLoading, setIsLoading } = usePreloader()

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [setIsLoading])

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className={`relative min-h-screen overflow-x-hidden bg-background hud-grid-bg transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Scanline overlay */}
        <ScanLine intensity="light" />

        {/* Desktop: System bar (top) */}
        <div className="hidden lg:block">
          <SystemBar />
        </div>

        {/* Mobile: Drawer navigation */}
        <MobileDrawer />

        {/* Desktop: Telemetry rail (left) */}
        <TelemetryRail />

        {/* Desktop: Signal column (right) */}
        <SignalColumn />

        {/* Main content area - offset for rails */}
        <main className="pt-12 lg:pt-10 lg:pl-20 xl:pr-20 lg:pb-8">
          <div className="px-4 md:px-8 lg:px-12">
            <div className="mx-auto max-w-[1000px]">
              {/* Section 01: Identity */}
              <IdentitySection />

              {/* Circuit trace divider */}
              <div className="circuit-trace my-12" />

              {/* Section 02: Proof/Telemetry */}
              <ProofSection />

              <div className="circuit-trace my-12" />

              {/* Section 03: Work/Projects */}
              <WorkSection />

              <div className="circuit-trace my-12" />

              {/* Section 04: Experience/Timeline */}
              <ExperienceSection />

              <div className="circuit-trace my-12" />

              {/* Section 05: Leadership/Transmissions */}
              <LeadershipSection />

              <div className="circuit-trace my-12" />

              {/* Section 06: About/Operator */}
              <AboutSection />

              <div className="circuit-trace my-12" />

              {/* Section 07: Contact/Channel */}
              <ContactSection />

              {/* Footer spacer for system log */}
              <div className="h-16 lg:h-8" />
            </div>
          </div>
        </main>

        {/* Desktop: System log (bottom) */}
        <SystemLog />
      </div>
    </>
  )
}

export default function Portfolio() {
  return (
    <PreloaderProvider>
      <PortfolioContent />
    </PreloaderProvider>
  )
}
