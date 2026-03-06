/* =====================================================
   Hawaii Home Properties LLC — Service Content & Types
   Edit this file to update service card content, colors,
   and layout switcher labels without touching components.
   ===================================================== */

export type LayoutId = "grid" | "list" | "split";

export interface ServiceItem {
  id: string;
  /** Short label used for tagline badges */
  tagline: string;
  /** Card headline */
  title: string;
  /** Concise benefit-driven description (used in grid & split) */
  description: string;
  /** Longer description with detail (used in list & featured split) */
  extendedDescription: string;
  /** CTA button text */
  ctaText: string;
  /**
   * CSS gradient string for the image placeholder background.
   * Replace with actual image path when assets are ready:
   *   e.g., imageBg: "url('/images/buying-hero.jpg') center/cover"
   */
  imageBg: string;
  /** Icon identifier — maps to a ServiceIcons component */
  icon: "home" | "tag" | "building" | "chart";
  /** Icon badge background color */
  iconBg: string;
  /** Icon badge foreground / stroke color */
  iconColor: string;
}

export const services: ServiceItem[] = [
  {
    id: "buying",
    tagline: "Buying",
    title: "Find Your Dream Home",
    description:
      "Navigate Hawaii's unique real estate market with personalized expertise and deep local knowledge, guiding you every step of the way.",
    extendedDescription:
      "From Oahu condos to Maui beachfront estates, we match you with the perfect property. Our agents provide end-to-end support — from your first showing to closing day — with genuine aloha spirit.",
    ctaText: "Request Consultation",
    /* PLACEHOLDER — replace with: url('/images/buying-hero.jpg') center/cover */
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 55%, #CFC499 100%)",
    icon: "home",
    iconBg: "rgba(212, 175, 95, 0.16)",
    iconColor: "rgba(212, 175, 95, 0.88)",
  },
  {
    id: "selling",
    tagline: "Selling",
    title: "Sell with Confidence",
    description:
      "Maximize your property's value with proven marketing strategies, sharp market insights, and expert negotiation working for you.",
    extendedDescription:
      "We create stunning property presentations, leverage our extensive buyer network, and secure the best terms. Our team handles every detail so you move forward with complete confidence.",
    ctaText: "List Your Property",
    /* PLACEHOLDER — replace with: url('/images/selling-hero.jpg') center/cover */
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 55%, #CCC09A 100%)",
    icon: "tag",
    iconBg: "rgba(212, 175, 95, 0.16)",
    iconColor: "rgba(212, 175, 95, 0.88)",
  },
  {
    id: "management",
    tagline: "Property Management",
    title: "Worry-Free Management",
    description:
      "Protect and grow your investment while we handle day-to-day operations, tenant relations, and maintenance with true aloha.",
    extendedDescription:
      "From screening quality tenants to coordinating repairs and producing monthly financials, we treat your property like our own. Enjoy passive income without the headaches.",
    ctaText: "Learn More",
    /* PLACEHOLDER — replace with: url('/images/management-hero.jpg') center/cover */
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 55%, #D4C4A0 100%)",
    icon: "building",
    iconBg: "rgba(212, 175, 95, 0.16)",
    iconColor: "rgba(212, 175, 95, 0.88)",
  },
  {
    id: "investment",
    tagline: "Investment Guidance",
    title: "Grow Your Portfolio",
    description:
      "Make smart real estate investments in Hawaii's dynamic market with expert analysis, ROI modeling, and curated opportunity sourcing.",
    extendedDescription:
      "Whether you're a first-time investor or expanding an existing portfolio, our specialists identify high-yield opportunities and guide you through every acquisition with precision and confidence.",
    ctaText: "Explore Opportunities",
    /* PLACEHOLDER — replace with: url('/images/investment-hero.jpg') center/cover */
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 55%, #CDBE98 100%)",
    icon: "chart",
    iconBg: "rgba(212, 175, 95, 0.16)",
    iconColor: "rgba(212, 175, 95, 0.88)",
  },
];

/* Layout switcher options for the FloatingNav */
export const layouts: { id: LayoutId; label: string; description: string }[] =
  [
    { id: "grid", label: "Grid View", description: "Service Cards Grid" },
    { id: "list", label: "List View", description: "Vertical List" },
    { id: "split", label: "Split View", description: "Featured Split" },
  ];
