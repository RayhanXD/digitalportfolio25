"use client"

import { AnimatedReveal } from "@/components/hud/animated-reveal"
import { ModuleHeader } from "@/components/hud/module-header"
import { CornerBrackets } from "@/components/hud/corner-brackets"

const capabilities = [
  { category: "LANGUAGES", items: ["PYTHON", "TYPESCRIPT", "R", "SQL"] },
  { category: "FRAMEWORKS", items: ["REACT", "NEXT.JS", "FASTAPI", "TENSORFLOW"] },
  { category: "AI/ML", items: ["RAG", "MULTI-AGENT", "CNN", "LLM OPS"] },
  { category: "INFRA", items: ["AWS", "DOCKER", "GIT", "TACC HPC"] },
]

export function AboutSection() {
  return (
    <section id="section-06" data-section-id="06" className="py-20 md:py-32">
      <ModuleHeader id="SEC_06" title="OPERATOR PROFILE" modeColor="amber" timestamp="VERIFIED" />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <AnimatedReveal animation="glitch" delay={100}>
            <div className="relative border border-border/50 p-6">
              <CornerBrackets color="amber" />

              <div className="flex items-center gap-2 mb-4">
                <span className="hud-micro text-hud-amber">MANIFESTO</span>
                <div className="h-px flex-1 bg-hud-amber/20" />
              </div>

              <p className="hud-header text-foreground mb-4">I ship. I teach. I lead.</p>

              <div className="space-y-4 hud-body text-muted-foreground">
                <p>
                  I build production AI systems that deliver measurable outcomes—not prototypes, not demos, but real
                  tools that scale. From RAG pipelines to multi-agent automation, I focus on what actually works in
                  production.
                </p>
                <p>
                  I&apos;ve trained 500+ professionals, supported 1,000+ students, and helped 100+ founders ship their ideas.
                  When I build, it ships. When I teach, people learn. When I lead, teams deliver.
                </p>
              </div>
            </div>
          </AnimatedReveal>
        </div>

        <div>
          <AnimatedReveal animation="border-draw" delay={200}>
            <div className="relative border border-border/50 p-6">
              <CornerBrackets color="amber" />

              <div className="flex items-center gap-2 mb-4">
                <span className="hud-micro text-hud-amber">CAPABILITIES MATRIX</span>
                <div className="h-px flex-1 bg-hud-amber/20" />
              </div>

              <div className="space-y-4">
                {capabilities.map((cap, catIndex) => (
                  <div key={cap.category}>
                    <span className="hud-micro text-muted-foreground block mb-2">{cap.category}</span>
                    <div className="flex flex-wrap gap-2">
                      {cap.items.map((item, itemIndex) => (
                        <AnimatedReveal key={item} animation="scale-pop" delay={300 + catIndex * 100 + itemIndex * 50}>
                          <span className="hud-micro px-2 py-1 border border-hud-amber/30 text-hud-amber hover:bg-hud-amber/10 transition-colors">
                            {item}
                          </span>
                        </AnimatedReveal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  )
}
