"use client"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Rayhan Mohammad. Built with Next.js & passion.</p>
          <p className="font-mono">{"<AI + Software />"}</p>
        </div>
      </div>
    </footer>
  )
}
