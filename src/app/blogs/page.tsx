import BlogPageContent from "@/components/blog/BlogPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Hawaii Home Properties LLC",
  description:
    "Hawaii real estate insights, market updates, buying and selling tips, investment strategies, and local living guides from the experts at Hawaii Home Properties LLC.",
};

export default function BlogsPage() {
  return <BlogPageContent />;
}
