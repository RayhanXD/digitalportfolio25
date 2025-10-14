"use client"

import { useEffect, useState } from "react"
import { Preloader } from "@/components/preloader"
import { ParticleCanvas } from "@/components/particle-canvas"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".observe").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handlePreloaderComplete = () => {
    setLoading(false)
    setTimeout(() => setShowContent(true), 0)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <ParticleCanvas />

      <Navbar showContent={showContent} />

      <HeroSection showContent={showContent} />

      <WorkSection />

      <ExperienceSection />

      <AboutSection />

      <ContactSection />

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
