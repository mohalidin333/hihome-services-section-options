import AboutPageContent from "@/components/about/AboutPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Hawaii Home Properties LLC",
  description:
    "Learn about Hawaii Home Properties LLC — Honolulu's trusted full-service real estate brokerage founded on aloha spirit, integrity, and 15+ years of local expertise.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
