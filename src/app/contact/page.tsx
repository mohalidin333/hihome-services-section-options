import ContactPageContent from "@/components/contact/ContactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Hawaii Home Properties LLC",
  description:
    "Get in touch with Hawaii Home Properties LLC. Schedule a free consultation, ask a question, or start your Hawaii real estate journey today.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
