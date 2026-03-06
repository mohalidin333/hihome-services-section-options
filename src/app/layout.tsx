import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

/* =====================================================
   Poppins — clean, modern, and highly readable.
   Weights: Light (300), Regular (400), Medium (500),
            SemiBold (600), Bold (700)
   ===================================================== */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hawaii Home Properties LLC — Our Services",
  description:
    "Full-service real estate in Honolulu, Hawaii. Expert guidance for buying, selling, property management, vacation rentals, and investment opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
