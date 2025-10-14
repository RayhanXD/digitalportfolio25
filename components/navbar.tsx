"use client"

interface NavbarProps {
  showContent: boolean
}

export function Navbar({ showContent }: NavbarProps) {
  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full border border-border/30 backdrop-blur-md bg-background/40 px-6 py-3 transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      <div className="flex items-center gap-8">
        <div className="font-mono text-sm">
          <span className="gradient-text font-bold">{"<RM />"}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Experience
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
