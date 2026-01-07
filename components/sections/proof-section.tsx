"use client"

import { AnimatedReveal } from "@/components/hud/animated-reveal"
import { ModuleHeader } from "@/components/hud/module-header"
import { MetricCard } from "@/components/hud/metric-card"
import { CornerBrackets } from "@/components/hud/corner-brackets"

const metrics = [
  { label: "GPA", value: "4.0", unit: "/ 4.0", subtext: "UT Austin", color: "cyan" as const },
  { label: "PROFESSIONALS TRAINED", value: "500", unit: "+", subtext: "AI Conferences", color: "cyan" as const },
  { label: "STUDENTS SUPPORTED", value: "1K", unit: "+", subtext: "Campus Connect", color: "cyan" as const },
  { label: "SMALL BUSINESSES", value: "23", unit: "", subtext: "Krowe Hub", color: "cyan" as const },
  { label: "FOUNDERS SUPPORTED", value: "100", unit: "+", subtext: "Krowe Hub", color: "cyan" as const },
  { label: "REVENUE CLOSED", value: "5", unit: "-FIG", subtext: "Automation Systems", color: "cyan" as const },
]

const nixarMetrics = [
  { label: "MEDIA VIEWS", value: "+598", unit: "%", color: "violet" as const },
  { label: "ENGAGEMENT", value: "+288", unit: "%", color: "violet" as const },
  { label: "INTERACTIONS", value: "+533", unit: "%", color: "violet" as const },
  { label: "REACH", value: "+582", unit: "%", color: "violet" as const },
]

export function ProofSection() {
  return (
    <section id="section-02" data-section-id="02" className="py-20 md:py-32">
      <ModuleHeader id="SEC_02" title="TELEMETRY" modeColor="cyan" timestamp="REAL-TIME" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <AnimatedReveal key={metric.label} delay={i * 80} animation="data-stream">
            <MetricCard
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              subtext={metric.subtext}
              color={metric.color}
            />
          </AnimatedReveal>
        ))}
      </div>

      <AnimatedReveal delay={500} animation="scale-pop">
        <div className="relative border border-border/50 p-4 mb-8">
          <CornerBrackets color="violet" size="sm" />
          <div className="flex items-center gap-2 mb-4">
            <span className="hud-micro text-hud-violet">NIXAR SOLUTIONS</span>
            <div className="h-px flex-1 bg-hud-violet/20" />
            <span className="hud-micro text-muted-foreground">MARKETING METRICS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nixarMetrics.map((metric, i) => (
              <AnimatedReveal key={metric.label} delay={600 + i * 100} animation="value-count">
                <div className="text-center">
                  <span className="text-2xl font-mono font-bold text-hud-violet">
                    {metric.value}
                    {metric.unit}
                  </span>
                  <span className="hud-micro text-muted-foreground block mt-1">{metric.label}</span>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal delay={900} animation="glitch">
        <div className="relative border border-hud-amber/30 p-6">
          <CornerBrackets color="amber" />
          <div className="flex items-center gap-4">
            <div>
              <span className="text-4xl md:text-5xl font-mono font-bold text-hud-amber">1ST</span>
              <span className="hud-micro text-hud-amber ml-2">PLACE</span>
            </div>
            <div className="h-12 w-px bg-hud-amber/30" />
            <div>
              <span className="hud-micro text-muted-foreground block">ESCAPE McCOMBS</span>
              <span className="hud-micro text-muted-foreground">150 COMPETITORS</span>
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  )
}
