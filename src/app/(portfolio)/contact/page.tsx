import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { ContactView } from "@/components/portfolio/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rayhan Mohammad — send a message, email, LinkedIn, or GitHub.",
};

/** Drop a résumé at public/resume.pdf and the Contact page links it automatically. */
const RESUME_PATH = "/resume.pdf";

export default function ContactPage() {
  const resumeHref = existsSync(join(process.cwd(), "public", RESUME_PATH)) ? RESUME_PATH : null;
  return <ContactView resumeHref={resumeHref} />;
}
