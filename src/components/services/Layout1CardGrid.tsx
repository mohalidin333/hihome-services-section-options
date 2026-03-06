"use client";

/* =====================================================
   Layout 1 — Service Cards Grid (2×2)
   - 4 service cards in a 2-column grid on desktop,
     single column stacked on mobile (<640px).
   - GSAP: cards stagger-fade up on mount.
   - GSAP: card lifts on hover (y-translate + shadow).
   ===================================================== */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { services } from "./serviceData";
import { ServiceIconResolver, ArrowRightIcon } from "./ServiceIcons";

export default function Layout1CardGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Stagger cards in from below on mount */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".l1-card",
        { opacity: 0, y: 52, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* GSAP hover: lift glass card, brighten border */
  const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -7,
      boxShadow: "0 24px 52px rgba(180,148,70,0.22), inset 0 1px 0 rgba(255,255,255,0.90)",
      duration: 0.28,
      ease: "power2.out",
    });
  };
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 8px 32px rgba(180,148,70,0.14), inset 0 1px 0 rgba(255,255,255,0.80)",
      duration: 0.28,
      ease: "power2.out",
    });
  };

  return (
    <div ref={containerRef}>
      {/* Layout identifier (prototype helper) */}
      <p
        style={{
          textAlign: "center",
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(212,175,95,0.42)",
          marginBottom: "2rem",
        }}
      >
        Option 1 — Service Cards Grid
      </p>

      {/* =====================================================
          2×2 Card Grid
          Responsive: 2 columns → 1 column below 640px
          ===================================================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
        className="l1-grid"
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="l1-card hh-service-card"
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
          >
            {/* ---- Image placeholder ---- */}
            {/*
              PLACEHOLDER: Replace this <div> with a <Image> component
              when real photography is available:
                <Image
                  src="/images/{service.id}-hero.jpg"
                  alt={service.title}
                  width={600} height={300}
                  className="w-full object-cover"
                  style={{ height: 190 }}
                />
            */}
            <div
              className="hh-img-placeholder"
              style={{ height: 190, background: service.imageBg }}
            >
              {/* Icon badge centered in image area */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C8A84B",
                  border: "1px solid rgba(255,255,255,0.90)",
                }}
              >
                <ServiceIconResolver icon={service.icon} size={28} />
              </div>
              <span className="hh-img-placeholder-label">
                Image Placeholder — {service.tagline}
              </span>
            </div>

            {/* ---- Card content ---- */}
            <div style={{ padding: "1.5rem" }}>
              {/* Tagline badge */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  color: service.iconColor,
                  marginBottom: "0.5rem",
                }}
              >
                {service.tagline}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "#1E1408",
                  lineHeight: 1.35,
                  marginBottom: "0.625rem",
                  marginTop: 0,
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(30,20,8,0.65)",
                  lineHeight: 1.68,
                  marginBottom: "1.375rem",
                  marginTop: 0,
                }}
              >
                {service.description}
              </p>

              {/* CTA */}
              <button className="hh-btn-primary">
                {service.ctaText}
                <ArrowRightIcon size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive breakpoint for grid */}
      <style>{`
        @media (max-width: 640px) {
          .l1-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
