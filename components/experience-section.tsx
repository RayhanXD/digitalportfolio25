"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, MapPin } from "lucide-react"

const experiences = [
  {
    role: "Chief Technology Officer",
    company: "Krowe Technologies Inc",
    period: "Aug 2023 – Present",
    location: "Frisco, TX",
    highlights: [
      "Shipped Krowe Hub supporting 23 SMBs and 100+ founders",
      "Built Kairos AI Assistant with real-time guidance",
      "Presented at 18 competitions, converting pilots to paying users",
    ],
  },
  {
    role: "Machine Learning Extern",
    company: "PGA of America",
    period: "Oct 2024 – Jul 2025",
    location: "Dallas, TX",
    highlights: [
      "Led PGA AI Conferences with 80+ attendees each",
      "Trained 500+ professionals on multi-agent AI",
      "Mentored 14 developers on scalable AI applications",
    ],
  },
  {
    role: "Software Engineering Manager",
    company: "Nixar Solutions",
    period: "2024",
    location: "Frisco, TX",
    highlights: [
      "Achieved +598% media views, +288% engagement",
      "Automated digital marketing with multi-agent AI",
      "Closed 5-figure revenue with data-driven optimizations",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-32 px-6 observe flex items-center pt-24">
      <div className="container mx-auto max-w-10xl">
        <div className="space-y-4 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground">Building AI products that convert pilots to paying users</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-border/50 bg-card hover:border-primary/30 transition-all">
              <div className="p-8 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                    <span className="font-mono">{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-4">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
