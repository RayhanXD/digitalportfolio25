"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen px-6 observe flex items-center justify-center pt-28">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="gradient-text">Let&apos;s Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Open to discussing AI projects, startup opportunities, and collaboration. Based in Austin, TX.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
              asChild
            >
              <a href="mailto:rrm3462@eid.utexas.edu">
                <Mail className="w-4 h-4 mr-2" />
                rrm3462@eid.utexas.edu
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted bg-transparent w-full sm:w-auto"
              asChild
            >
              <a href="tel:+19728213646">
                <Phone className="w-4 h-4 mr-2" />
                (972) 821-3646
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              href="https://linkedin.com/in/rayhan-mohammad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border hover:border-primary bg-card hover:bg-primary/10 flex items-center justify-center transition-all group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:rrm3462@eid.utexas.edu"
              className="w-12 h-12 rounded-full border border-border hover:border-primary bg-card hover:bg-primary/10 flex items-center justify-center transition-all group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://maps.google.com/?q=Austin,TX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border hover:border-primary bg-card hover:bg-primary/10 flex items-center justify-center transition-all group"
            >
              <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
