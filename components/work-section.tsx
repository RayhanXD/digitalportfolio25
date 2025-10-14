"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, Award } from "lucide-react"

const projects = [
  {
    title: "Krowe Hub",
    description:
      "AI-powered startup acceleration platform supporting 23 small businesses and 100+ founders with DeepSeek-driven automation pipelines",
    tags: ["Next.js", "FastAPI", "OpenAI", "Firestore"],
    gradient: "from-purple-500 to-pink-500",
    impact: "23 SMBs · 100+ founders",
  },
  {
    title: "Campus Connect AI",
    description:
      "Full-stack AI platform connecting 1,000+ students to scholarships, tutoring, and dashboards. Piloted at UNT and UTD",
    tags: ["React", "Python", "FastAPI", "RAG"],
    gradient: "from-blue-500 to-cyan-500",
    impact: "1,000+ students",
  },
  {
    title: "C.Y.R.U.S.",
    description:
      "Cybernetic Responsive Utility System - multimodal HCI with voice + gesture control using TensorFlow and MediaPipe",
    tags: ["TensorFlow", "MediaPipe", "Python", "Docker"],
    gradient: "from-pink-500 to-purple-500",
    impact: "200+ students trained",
  },
  {
    title: "Kairos AI Assistant",
    description:
      "Real-time AI guidance and market validation tool delivering automated feedback for startups and small businesses",
    tags: ["OpenAI", "FastAPI", "Next.js", "Firestore"],
    gradient: "from-cyan-500 to-blue-500",
    impact: "7 local startups",
  },
]

export function WorkSection() {
  return (
    <section id="work" className="min-h-screen py-32 px-6 observe flex items-center pt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground">Production AI systems with measurable impact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 cursor-pointer"
            >
              <div className="p-8 space-y-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <h3 className="text-2xl font-bold group-hover:gradient-text transition-all">{project.title}</h3>

                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Award className="w-4 h-4" />
                  <span>{project.impact}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-primary pt-4 group-hover:gap-4 transition-all">
                  <span className="text-sm font-medium">View Project</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
