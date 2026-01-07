"use client"

import { useState } from "react"
import { AnimatedReveal } from "@/components/hud/animated-reveal"
import { ModuleHeader } from "@/components/hud/module-header"
import { CornerBrackets } from "@/components/hud/corner-brackets"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    id: "EXP_001",
    role: "Machine Learning Extern",
    org: "PGA of America",
    period: "OCT 2024 – JUL 2025",
    location: "DALLAS, TX",
    summary: "Led AI training conferences for 500+ professionals; built reproducible multi-agent labs.",
    bullets: [
      "Led AI training conferences for 500+ professionals; built reproducible multi-agent labs in Python.",
      "Built CNN workflows in Colab; mentored 14 developers on scalable ML deployment + version control.",
      "Collaborated with PGA CTO on AI tooling integration + documentation quality.",
    ],
  },
  {
    id: "EXP_002",
    role: "Undergraduate Researcher",
    org: "UT Center for Computational Biology",
    period: "NOV 2025 – PRESENT",
    location: "AUSTIN, TX",
    summary: "Built Python/R pipelines for genomic datasets on Unix/Linux; TACC HPC workflows.",
    bullets: [
      "Built Python/R pipelines for genomic datasets on Unix/Linux; worked on TACC HPC workflows.",
      "Designed experiments + visualization + statistical reporting in research teams.",
    ],
  },
  {
    id: "EXP_003",
    role: "Chief Technology Officer",
    org: "Krowe Technologies",
    period: "AUG 2023 – AUG 2025",
    location: "DALLAS, TX",
    summary: "Built & maintained Krowe Hub supporting 23 small businesses and 100+ founders.",
    bullets: [
      "Built & maintained Krowe Hub supporting 23 small businesses and 100+ founders.",
      "Developed Kairos AI Assistant + Idea Analyzer supporting 7 startups with real-time guidance.",
      "Showcased at 18 competitions; converted pilots to paid via reliable deployment.",
    ],
  },
]

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="section-04" data-section-id="04" className="py-20 md:py-32">
      <ModuleHeader id="SEC_04" title="TIME AXIS" modeColor="violet" timestamp="3 ENTRIES" />

      {/* Timeline */}
      <div className="relative">
        <AnimatedReveal animation="slide-up" delay={0} duration={800}>
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-hud-violet/20" />
        </AnimatedReveal>

        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-10 md:pl-14 pb-8 last:pb-0">
            <AnimatedReveal animation="timeline-tick" delay={index * 150}>
              <div
                className={cn(
                  "absolute left-0 top-2 w-6 md:w-8 h-px transition-colors",
                  expandedIndex === index ? "bg-hud-violet" : "bg-hud-violet/30",
                )}
              />
            </AnimatedReveal>
            <div
              className={cn(
                "absolute left-[10px] md:left-[14px] top-1 w-2 h-2 transition-colors",
                expandedIndex === index ? "bg-hud-violet" : "bg-background border border-hud-violet/50",
              )}
            />

            <AnimatedReveal animation="terminal" delay={100 + index * 150}>
              <div className="relative border border-border/50 hover:border-hud-violet/30 transition-colors">
                <CornerBrackets color="violet" size="sm" />

                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="hud-micro text-hud-violet">{exp.id}</span>
                        <span className="hud-micro text-muted-foreground">{exp.period}</span>
                      </div>
                      <h3 className="hud-subheader text-foreground">{exp.role}</h3>
                      <p className="hud-micro text-hud-cyan mt-1">{exp.org}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hud-micro text-muted-foreground">{exp.location}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform",
                          expandedIndex === index && "rotate-180",
                        )}
                      />
                    </div>
                  </div>
                  <p className="hud-body text-muted-foreground mt-2">{exp.summary}</p>
                </button>

                {/* Expanded bullets */}
                {expandedIndex === index && (
                  <div className="px-4 pb-4 border-t border-border/30">
                    <ul className="pt-4 space-y-2">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={`${exp.id}-bullet-${bulletIndex}`}
                          className="flex gap-2 hud-body text-muted-foreground"
                        >
                          <span className="text-hud-violet">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AnimatedReveal>
          </div>
        ))}
      </div>
    </section>
  )
}
