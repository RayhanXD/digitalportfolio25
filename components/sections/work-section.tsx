"use client"

import { useState } from "react"
import { AnimatedReveal } from "@/components/hud/animated-reveal"
import { ModuleHeader } from "@/components/hud/module-header"
import { TargetLock } from "@/components/hud/target-lock"
import { CornerBrackets } from "@/components/hud/corner-brackets"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: "PRJ_001",
    title: "KROWE HUB",
    status: "DEPLOYED",
    problem: "Small businesses lacked affordable AI-powered operations tools",
    solution: "Workflow automation + business plan analysis + real-time operational optimization",
    impact: "Supporting 23 small businesses and 100+ founders",
    stack: ["NEXT.JS", "PYTHON", "OPENAI", "FASTAPI", "FIRESTORE", "AWS"],
  },
  {
    id: "PRJ_002",
    title: "CAMPUS CONNECT AI",
    status: "PILOTED",
    problem: "Students struggled to find resources across fragmented university systems",
    solution: "Student success platform piloted at UNT/UTD",
    impact: "Supporting 1,000+ students with scholarships, tutoring, and dashboards",
    stack: ["REACT", "PYTHON", "REST"],
  },
  {
    id: "PRJ_003",
    title: "C.Y.R.U.S.",
    status: "PROTOTYPE",
    problem: "Traditional assistants lack intuitive multimodal input",
    solution: "Multimodal assistant combining voice + gesture recognition",
    impact: "Seamless human-computer interaction via TensorFlow/Keras + MediaPipe",
    stack: ["TENSORFLOW", "KERAS", "MEDIAPIPE"],
  },
  {
    id: "PRJ_004",
    title: "TRADEX",
    status: "DEPLOYED",
    problem: "Individual investors lack sophisticated portfolio optimization tools",
    solution: "Portfolio optimization from user market views with risk/return constraints",
    impact: "Personalized investment strategies accessible to retail investors",
    stack: ["NEXT.JS", "TAILWIND", "FASTAPI"],
  },
]

export function WorkSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="section-03" data-section-id="03" className="py-20 md:py-32">
      <ModuleHeader id="SEC_03" title="PROJECT ARCHIVES" modeColor="violet" timestamp="4 ENTRIES" />

      <div className="space-y-4">
        {projects.map((project, index) => (
          <AnimatedReveal key={project.id} delay={index * 120} animation="cascade">
            <TargetLock color="violet">
              <div
                className={cn(
                  "relative border border-border/50 transition-all duration-300",
                  expandedIndex === index && "border-hud-violet/50",
                )}
              >
                <CornerBrackets color="violet" size="sm" />

                {/* Collapsed header */}
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="hud-micro text-hud-violet">{project.id}</span>
                      <span className="hud-subheader text-foreground">{project.title}</span>
                      <span
                        className={cn(
                          "hud-micro px-2 py-0.5 border",
                          project.status === "DEPLOYED"
                            ? "text-hud-green border-hud-green/30"
                            : project.status === "PILOTED"
                              ? "text-hud-amber border-hud-amber/30"
                              : "text-muted-foreground border-border",
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform",
                        expandedIndex === index && "rotate-180",
                      )}
                    />
                  </div>
                </button>

                {/* Expanded content */}
                {expandedIndex === index && (
                  <div className="px-4 pb-4 border-t border-border/30">
                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      {/* Left: Problem/Solution/Impact */}
                      <div className="space-y-4">
                        <div>
                          <span className="hud-micro text-hud-red block mb-1">PROBLEM</span>
                          <p className="hud-body text-muted-foreground">{project.problem}</p>
                        </div>
                        <div>
                          <span className="hud-micro text-hud-amber block mb-1">SOLUTION</span>
                          <p className="hud-body text-muted-foreground">{project.solution}</p>
                        </div>
                        <div>
                          <span className="hud-micro text-hud-green block mb-1">IMPACT</span>
                          <p className="hud-body text-muted-foreground">{project.impact}</p>
                        </div>
                      </div>

                      {/* Right: Stack */}
                      <div>
                        <span className="hud-micro text-hud-violet block mb-3">TECH STACK</span>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="hud-micro px-2 py-1 border border-hud-violet/30 text-hud-violet"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TargetLock>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  )
}
