"use client"

import { useState } from "react"
import { AnimatedReveal } from "@/components/hud/animated-reveal"
import { ModuleHeader } from "@/components/hud/module-header"
import { CornerBrackets } from "@/components/hud/corner-brackets"
import { Copy, Check, Mail, Phone, Linkedin, ArrowUp } from "lucide-react"

const contacts = [
  { type: "EMAIL", value: "rrm3462@eid.utexas.edu", href: "mailto:rrm3462@eid.utexas.edu", icon: Mail },
  { type: "PHONE", value: "(972) 821-3646", href: "tel:+19728213646", icon: Phone },
  {
    type: "LINKEDIN",
    value: "rayhan-mohammad1",
    href: "https://linkedin.com/in/rayhan-mohammad1",
    icon: Linkedin,
  },
]

export function ContactSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="section-07" data-section-id="07" className="py-20 md:py-32">
      <ModuleHeader id="SEC_07" title="OPEN CHANNEL" modeColor="amber" timestamp="READY" />

      <div className="max-w-2xl mx-auto">
        <AnimatedReveal animation="channel-open" delay={100}>
          <div className="relative border border-hud-amber/30 p-6 mb-8">
            <CornerBrackets color="amber" />

            <div className="text-center mb-6">
              <p className="hud-body text-muted-foreground">
                Open to discussing AI projects, startup opportunities, and collaboration.
              </p>
            </div>

            {/* Contact entries with staggered data-stream animation */}
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <AnimatedReveal key={contact.type} animation="data-stream" delay={200 + index * 100}>
                  <div className="flex items-center justify-between p-3 border border-border/50 hover:border-hud-amber/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <contact.icon className="w-4 h-4 text-hud-amber" />
                      <span className="hud-micro text-muted-foreground">{contact.type}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={contact.href}
                        target={contact.type === "LINKEDIN" ? "_blank" : undefined}
                        rel={contact.type === "LINKEDIN" ? "noopener noreferrer" : undefined}
                        className="font-mono text-sm text-foreground hover:text-hud-amber transition-colors"
                      >
                        {contact.value}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.value, index)}
                        className="p-1 text-muted-foreground hover:text-hud-amber transition-colors"
                        aria-label={`Copy ${contact.type}`}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-hud-green" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={500} animation="scale-pop">
          <div className="text-center">
            <a
              href="#section-01"
              className="inline-flex items-center gap-2 hud-micro text-muted-foreground hover:text-hud-amber transition-colors"
            >
              <ArrowUp className="w-3 h-3" />
              RETURN TO TOP
            </a>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
