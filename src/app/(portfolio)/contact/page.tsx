import type { Metadata } from "next";
import { ContactView } from "@/components/portfolio/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Rayhan Mohammad — email, phone, and message.",
};

export default function ContactPage() {
  return <ContactView />;
}
