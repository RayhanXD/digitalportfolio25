"use client"

import { ScanReveal } from "@/components/hud/scan-reveal"
import { HudButton } from "@/components/hud/hud-button"
import { CornerBrackets } from "@/components/hud/corner-brackets"
import { DataStream } from "@/components/hud/data-stream"
import { ArrowRight, Download } from "lucide-react"

const capabilities = ["RAG SYSTEMS", "MULTI-AGENT", "DATA PIPELINES", "ML OPS", "PRODUCTION AI"]

export function IdentitySection() {
  return (
    <section id="section-01" data-section-id="01" className="min-h-screen flex items-center pt-20 pb-16 md:py-0">
      <div className="w-full max-w-4xl">
        {/* Meta line */}
        <ScanReveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="hud-micro text-hud-cyan">01</span>
            <div className="h-px w-8 bg-hud-cyan/30" />
            <span className="hud-micro text-muted-foreground">UT AUSTIN // STATISTICS & DATA SCIENCE // TX</span>
          </div>
        </ScanReveal>

        {/* Big name */}
        <ScanReveal delay={100}>
          <div className="relative mb-6">
            <h1 className="hud-title text-foreground">RAYHAN MOHAMMAD</h1>
            <DataStream className="absolute -top-4 right-0" color="cyan" />
          </div>
        </ScanReveal>

        {/* Headline */}
        <ScanReveal delay={200}>
          <p className="hud-header text-foreground mb-4 max-w-2xl">Building production AI systems that scale.</p>
        </ScanReveal>

        {/* One-liner */}
        <ScanReveal delay={300}>
          <p className="hud-body text-muted-foreground max-w-xl mb-8">
            RAG systems, multi-agent automation, and data pipelines—shipped with measurable impact.
          </p>
        </ScanReveal>

        {/* CTAs */}
        <ScanReveal delay={400}>
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <HudButton modeColor="cyan" variant="primary" size="lg" asChild>
              <a href="#section-03" className="inline-flex items-center gap-2">
                VIEW WORK
                <ArrowRight className="w-4 h-4" />
              </a>
            </HudButton>
            <HudButton modeColor="cyan" variant="secondary" size="lg" asChild>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                RESUME
              </a>
            </HudButton>
          </div>
        </ScanReveal>

        {/* Capabilities strip */}
        <ScanReveal delay={500}>
          <div className="relative border border-border/50 p-4">
            <CornerBrackets color="cyan" size="sm" />
            <div className="flex items-center gap-2 mb-2">
              <span className="hud-micro text-hud-cyan">CAPABILITIES</span>
              <div className="h-px flex-1 bg-hud-cyan/20" />
            </div>
            <div className="flex flex-wrap gap-3">
              {capabilities.map((cap) => (
                <span key={cap} className="hud-micro text-muted-foreground hover:text-hud-cyan transition-colors">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </ScanReveal>
      </div>
    </section>
  )
}
