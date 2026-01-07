import type React from "react"
import type { Metadata, Viewport } from "next"
import { Oxanium, Recursive, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
})

const recursive = Recursive({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "RAYHAN.SYS — AI Systems Engineer",
  description:
    "Building production AI systems that scale. RAG architectures, multi-agent automation, and high-performance data pipelines.",
}

export const viewport: Viewport = {
  themeColor: "#07070B",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable} ${recursive.variable} ${jetbrainsMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
