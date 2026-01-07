"use client"

import { AnimatedReveal } from "@/components/hud/animated-reveal"
import { ModuleHeader } from "@/components/hud/module-header"
import { CornerBrackets } from "@/components/hud/corner-brackets"
import { TargetLock } from "@/components/hud/target-lock"

const transmissions = [
  {
    id: "TX_001",
    org: "FORM.IO",
    role: "AI DEVELOPER",
    signal: "Taught 300+ engineers across 7 conferences",
    freq: "Vector DBs, embeddings, RAG, ranking, latency",
  },
  {
    id: "TX_002",
    org: "TEXAS CONVERGENT",
    role: "SOFTWARE DEVELOPER",
    signal: "Designing data schemas, implementing 7 APIs",
    freq: "Building components for 12 MVPs",
  },
  {
    id: "TX_003",
    org: "BAXA",
    role: "ML/SOFTWARE DEVELOPER",
    signal: "Built website for 140 members",
    freq: "React/Vite/Supabase",
  },
]

export function LeadershipSection() {
  return (
    <section id="section-05" data-section-id="05" className="py-20 md:py-32">
      <AnimatedReveal animation="fade-up" delay={0}>
        <ModuleHeader id="SEC_05" title="TRANSMISSIONS" modeColor="amber" timestamp="3 SIGNALS" />
      </AnimatedReveal>

      <div className="grid md:grid-cols-3 gap-4">
        {transmissions.map((tx, index) => (
          <AnimatedReveal key={tx.id} delay={100 + index * 100} animation="fade-up">
            <TargetLock color="amber">
              <div className="relative border border-border/50 p-5 h-full hover:border-hud-amber/30 transition-colors">
                <CornerBrackets color="amber" size="sm" />

                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="hud-micro text-hud-amber">{tx.id}</span>
                  <div className="h-px flex-1 bg-hud-amber/20" />
                </div>

                {/* Org & Role */}
                <h3 className="hud-subheader text-foreground mb-1">{tx.org}</h3>
                <span className="hud-micro text-hud-cyan">{tx.role}</span>

                {/* Signal */}
                <p className="hud-body text-muted-foreground mt-4">{tx.signal}</p>

                {/* Frequency */}
                <div className="mt-4 pt-4 border-t border-border/30">
                  <span className="hud-micro text-muted-foreground">{tx.freq}</span>
                </div>
              </div>
            </TargetLock>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  )
}
