import ServicesPageContent from "@/components/services/ServicesPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Hawaii Home Properties LLC",
  description:
    "Full-service real estate in Honolulu, Hawaii. Expert guidance for buying, selling, property management, and investment — with aloha spirit.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
