"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Code2, Terminal, Sparkles, Zap } from "lucide-react"

interface HeroSectionProps {
  showContent: boolean
}

export function HeroSection({ showContent }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto max-w-10xl px-6 py-4 lg:px-12">
        <div className="flex flex-col justify-center min-h-screen py-12">
          {/* Main Content - Centered */}
          <div
            className={`space-y-12 transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {/* Hero Typography */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium gradient-text">AI Engineer</span>
              </div>

              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
                <span className="gradient-text">Rayhan Mohammad</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Building production AI systems that scale
              </p>
            </div>

            {/* Stats Grid - Visual Focus */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 transition-all duration-700 delay-200 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="group cursor-default space-y-2">
                <div className="text-5xl md:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  500+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Professionals</div>
              </div>

              <div className="group cursor-default space-y-2">
                <div className="text-5xl md:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  1K+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Students</div>
              </div>

              <div className="group cursor-default space-y-2">
                <div className="text-5xl md:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  23
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">SMBs</div>
              </div>

              <div className="group cursor-default space-y-2">
                <div className="text-5xl md:text-6xl font-bold gradient-text group-hover:scale-110 transition-transform">
                  4.0
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">GPA</div>
              </div>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden shadow-lg"
                asChild
              >
                <a href="#work" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center">
                    View Projects
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Button>

              <Button size="lg" variant="outline" className="border-border hover:bg-muted/50 bg-transparent" asChild>
                <a href="#contact" className="flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </a>
              </Button>
            </div>

            {/* Tech Icons */}
            <div
              className={`flex items-center gap-6 pt-8 transition-all duration-700 delay-400 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <Code2 className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 transition-transform" />
              <Terminal className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 transition-transform" />
              <Sparkles className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 transition-transform" />
              <Zap className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
