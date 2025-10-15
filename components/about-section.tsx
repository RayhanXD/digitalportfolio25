"use client"

import { GraduationCap } from "lucide-react"

const skills = [
  { name: "Python (ML/AI)", level: 95 },
  { name: "React / Next.js", level: 92 },
  { name: "FastAPI / Backend", level: 90 },
  { name: "TensorFlow / Keras", level: 88 },
  { name: "Multi-Agent AI", level: 85 },
  { name: "Cloud & DevOps", level: 87 },
]

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-16 px-6 observe flex items-center pt-12">
      <div className="container mx-auto max-w-10xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">About</span>
            </h2>
            <div className="flex items-center gap-2 text-primary font-medium mb-4">
              <GraduationCap className="w-5 h-5" />
              <span>Statistics & Data Science @ UT Austin</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI & software engineer studying <strong className="text-foreground">Statistics & Data Science</strong> at{" "}
              <strong className="text-foreground">UT Austin (GPA 4.0)</strong>. I build production systems that combine
              multi-agent AI, full-stack web, and data pipelines.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As <strong className="text-foreground">CTO of Krowe Technologies</strong>, I ship AI tools that help
              founders launch faster. Previously{" "}
              <strong className="text-foreground">ML Extern at PGA of America</strong>, where I taught engineers and PMs
              how to apply practical AI.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My work focuses on converting pilots into paid usage with measurable engagement and growth - from
              multi-agent automation to RAG systems and developer enablement.
            </p>
          </div>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
