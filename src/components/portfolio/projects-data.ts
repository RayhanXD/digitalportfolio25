export type ProjectStat = {
  /** Numbers count up as the panel arrives; strings are shown as-is */
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: readonly string[];
  stat: ProjectStat;
  href: string;
  linkLabel: string;
  accent: "blue" | "orange";
  /**
   * Looping clip for the panel's poster, e.g. "/projects/selfpi.mp4" in /public.
   * Until one is set, the poster renders a generated horizon in the project's accent.
   */
  video?: string;
  /** Composition of the generated horizon poster */
  horizon: { tilt: number; top: string; size: string };
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "selfpi",
    name: "SelfPI",
    tagline: "Agentic API tooling",
    description:
      "Watches third-party OpenAPI specs, detects breaking changes, and opens PRs patching every affected call site. Static analysis on AWS Fargate + MongoDB Atlas.",
    stack: ["Python", "FastAPI", "React", "Terraform", "AWS"],
    stat: { value: 6, suffix: "-stage", label: "Static analysis pipeline" },
    href: "https://github.com/RayhanXD/selfpi",
    linkLabel: "View on GitHub",
    accent: "blue",
    horizon: { tilt: -8, top: "58%", size: "180%" },
  },
  {
    slug: "keystone",
    name: "Keystone",
    tagline: "Multi-agent real estate platform",
    description:
      "Won Best Overall at HBA×CSBA Hack Day — a LangGraph/Gemini multi-agent real estate platform built in 5 hours.",
    stack: ["LangGraph", "Gemini", "Python", "FastAPI", "React"],
    stat: { value: 5, suffix: " hrs", label: "To Best Overall" },
    href: "https://github.com/RayhanXD/CSB-Hack-Day.git",
    linkLabel: "View on GitHub",
    accent: "blue",
    horizon: { tilt: 6, top: "64%", size: "220%" },
  },
  {
    slug: "raygent",
    name: "Raygent",
    tagline: "Multi-agent inspection",
    description:
      "Real-time multi-agent inspection through a LangGraph visualizer on React/Next.js with NVIDIA Nemotron.",
    stack: ["TypeScript", "Python", "LangGraph", "Next.js"],
    stat: { value: "Live", label: "Agent graph inspection" },
    href: "https://github.com/RayhanXD/raygent",
    linkLabel: "View on GitHub",
    accent: "orange",
    horizon: { tilt: -14, top: "52%", size: "150%" },
  },
  {
    slug: "campus-connect-ai",
    name: "Campus Connect AI",
    tagline: "Agentic campus search",
    description:
      "Agentic search in Python/FastAPI with vector embeddings and PostgreSQL — 92% query relevance, latency cut 55%.",
    stack: ["Python", "FastAPI", "Embeddings", "PostgreSQL"],
    stat: { value: 1000, suffix: "+", label: "Students served" },
    href: "https://apps.apple.com/us/app/ccai-campus-connect-ai/id6757893694",
    linkLabel: "View on the App Store",
    accent: "orange",
    horizon: { tilt: 10, top: "60%", size: "200%" },
  },
  {
    slug: "cyrus",
    name: "C.Y.R.U.S.",
    tagline: "Voice + gesture control",
    description:
      "Hands-free UI control across media, IoT, and accessibility — fusing voice and gesture ML via TensorFlow/Keras and MediaPipe.",
    stack: ["TensorFlow", "Keras", "MediaPipe", "Python"],
    stat: { value: 85, suffix: "ms", label: "End-to-end inference" },
    href: "https://github.com/RayhanXD/C.Y.R.U.S.",
    linkLabel: "View on GitHub",
    accent: "blue",
    horizon: { tilt: -4, top: "55%", size: "165%" },
  },
];
