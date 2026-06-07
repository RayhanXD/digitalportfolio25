import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Rayhan Mohammad",
    template: "%s | Rayhan Mohammad",
  },
  description:
    "Software engineer and ML builder — multi-agent AI platforms, RAG pipelines, and production systems. UT Austin Computer Science and Statistics & Data Science.",
  icons: {
    icon: "/galaxy.png",
    shortcut: "/galaxy.png",
    apple: "/galaxy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
