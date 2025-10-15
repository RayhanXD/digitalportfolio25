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
]

export function WorkSection() {
  return (
    <section id="work" className="min-h-screen py-16 px-6 observe flex items-center pt-12">
      <div className="container mx-auto max-w-10xl">
        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Projects Row - Left side, spans 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 cursor-pointer"
              >
                <div className="p-6 space-y-4 h-full flex flex-col">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />

                  <h3 className="text-xl font-bold group-hover:gradient-text transition-all">{project.title}</h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{project.description}</p>

                  <div className="flex items-center gap-2 text-xs text-primary font-medium">
                    <Award className="w-3 h-3" />
                    <span>{project.impact}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-primary pt-2 group-hover:gap-3 transition-all">
                    <span className="text-xs font-medium">View</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </Card>
            ))}
          </div>

          {/* Title Card - Right side, spans 1 column */}
          <Card className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 cursor-pointer lg:col-span-1">
            <div className="p-8 h-full flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="gradient-text">Featured Projects</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Production AI systems with measurable impact
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-primary pt-4 group-hover:gap-4 transition-all">
                <span className="text-sm font-medium">Explore All Work</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>
        </div>
      </div>
    </section>
  )
}
