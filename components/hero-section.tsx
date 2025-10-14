"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Code2, Terminal, Sparkles } from "lucide-react"

interface HeroSectionProps {
  showContent: boolean
}

export function HeroSection({ showContent }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="container mx-auto max-w-10xl">
        <div className="text-center space-y-12">
          <h1
            className={`text-6xl md:text-8xl font-bold tracking-tight text-balance transition-all duration-700 delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="gradient-text">Rayhan Mohammad</span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed pt-4 transition-all duration-700 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            AI & Software Engineer building production systems that combine{" "}
            <span className="text-primary font-medium">multi-agent AI</span>,{" "}
            <span className="text-primary font-medium">full-stack web</span>, and{" "}
            <span className="text-primary font-medium">data pipelines</span>
          </p>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-12 transition-all duration-700 delay-400 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-1">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-sm text-muted-foreground">Professionals Trained</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold gradient-text">1,000+</div>
              <div className="text-sm text-muted-foreground">Students Impacted</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold gradient-text">23</div>
              <div className="text-sm text-muted-foreground">SMBs Supported</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold gradient-text">4.0</div>
              <div className="text-sm text-muted-foreground">GPA at UT Austin</div>
            </div>
          </div>

          <div
            className={`flex items-center justify-center gap-4 pt-12 transition-all duration-700 delay-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" asChild>
              <a href="#work">
                View Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent" asChild>
              <a href="#contact">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </a>
            </Button>
          </div>

          <div
            className={`flex items-center justify-center gap-8 pt-10 text-muted-foreground transition-all duration-700 delay-600 ${showContent ? "opacity-100" : "opacity-0"}`}
          >
            <Code2 className="w-6 h-6 animate-float" style={{ animationDelay: "0s" }} />
            <Terminal className="w-6 h-6 animate-float" style={{ animationDelay: "0.2s" }} />
            <Sparkles className="w-6 h-6 animate-float" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
