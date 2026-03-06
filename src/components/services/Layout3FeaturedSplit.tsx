"use client";

/* =====================================================
   Layout 3 — Featured Split Services
   - Top row: 2 large "featured" cards side-by-side
     (Buying · Selling) — slide in from left/right.
   - Bottom row: 2 smaller horizontal cards
     (Property Management · Investment) — fade in from below.
   - GSAP: entrance animations on mount, lift on hover.
   ===================================================== */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { services } from "./serviceData";
import { ServiceIconResolver, ArrowRightIcon } from "./ServiceIcons";

export default function Layout3FeaturedSplit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Featured cards: slide in from opposite sides */
      gsap.fromTo(
        ".l3-feat-left",
        { opacity: 0, x: -64 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }
      );
      gsap.fromTo(
        ".l3-feat-right",
        { opacity: 0, x: 64 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" }
      );

      /* Secondary cards: stagger up from below */
      gsap.fromTo(
        ".l3-secondary",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.14,
          delay: 0.28,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* Shared hover handlers — glass shadow depth */
  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -6,
      boxShadow: "0 24px 52px rgba(180,148,70,0.22), inset 0 1px 0 rgba(255,255,255,0.90)",
      duration: 0.28,
      ease: "power2.out",
    });
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 8px 32px rgba(180,148,70,0.14), inset 0 1px 0 rgba(255,255,255,0.80)",
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const [primary1, primary2, secondary1, secondary2] = services;

  return (
    <div ref={containerRef}>
      {/* Layout identifier */}
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
        Option 3 — Featured Split Services
      </p>

      {/* =====================================================
          Top row: 2 large featured cards
          ===================================================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
        className="l3-featured-row"
      >
        {/* Featured card — LEFT (Buying) */}
        <div
          className="l3-feat-left hh-service-card"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {/*
            IMAGE PLACEHOLDER (large featured card)
            Replace with: <Image src="/images/buying-hero.jpg" … />
          */}
          <div
            className="hh-img-placeholder"
            style={{ height: 248, background: primary1.imageBg }}
          >
            <div style={{ textAlign: "center", color: "#C8A84B" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                  opacity: 0.9,
                }}
              >
                <ServiceIconResolver icon={primary1.icon} size={44} />
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {primary1.tagline}
              </span>
            </div>
            <span className="hh-img-placeholder-label">
              Image Placeholder — {primary1.tagline}
            </span>
          </div>

          <div style={{ padding: "1.875rem" }}>
            <h3
              style={{
                fontSize: "1.1875rem",
                fontWeight: 700,
                color: "#1E1408",
                lineHeight: 1.3,
                marginBottom: "0.75rem",
                marginTop: 0,
              }}
            >
              {primary1.title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(30,20,8,0.65)",
                lineHeight: 1.72,
                marginBottom: "1.5rem",
                marginTop: 0,
              }}
            >
              {primary1.extendedDescription}
            </p>
            <button className="hh-btn-primary">
              {primary1.ctaText}
              <ArrowRightIcon size={13} />
            </button>
          </div>
        </div>

        {/* Featured card — RIGHT (Selling) */}
        <div
          className="l3-feat-right hh-service-card"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div
            className="hh-img-placeholder"
            style={{ height: 248, background: primary2.imageBg }}
          >
            <div style={{ textAlign: "center", color: "#C8A84B" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                  opacity: 0.9,
                }}
              >
                <ServiceIconResolver icon={primary2.icon} size={44} />
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {primary2.tagline}
              </span>
            </div>
            <span className="hh-img-placeholder-label">
              Image Placeholder — {primary2.tagline}
            </span>
          </div>

          <div style={{ padding: "1.875rem" }}>
            <h3
              style={{
                fontSize: "1.1875rem",
                fontWeight: 700,
                color: "#1E1408",
                lineHeight: 1.3,
                marginBottom: "0.75rem",
                marginTop: 0,
              }}
            >
              {primary2.title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(30,20,8,0.65)",
                lineHeight: 1.72,
                marginBottom: "1.5rem",
                marginTop: 0,
              }}
            >
              {primary2.extendedDescription}
            </p>
            <button className="hh-btn-primary">
              {primary2.ctaText}
              <ArrowRightIcon size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          Bottom row: 2 smaller horizontal cards
          ===================================================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
        className="l3-secondary-row"
      >
        {[secondary1, secondary2].map((service) => (
          <div
            key={service.id}
            className="l3-secondary hh-service-card"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
          >
            {/* Left color strip with icon (image placeholder) */}
            <div
              style={{
                width: 116,
                flexShrink: 0,
                background: service.imageBg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                color: "#C8A84B",
                padding: "0 0.5rem",
              }}
            >
              <ServiceIconResolver icon={service.icon} size={28} />
              <span
                style={{
                  fontSize: "0.5rem",
                  color: "rgba(212,175,95,0.40)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                Image
                <br />
                Placeholder
              </span>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "1.25rem 1.375rem" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.5625rem",
                  fontWeight: 700,
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  color: service.iconColor,
                  marginBottom: "0.35rem",
                }}
              >
                {service.tagline}
              </span>
              <h3
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#1E1408",
                  lineHeight: 1.35,
                  marginBottom: "0.5rem",
                  marginTop: 0,
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(30,20,8,0.65)",
                  lineHeight: 1.65,
                  marginBottom: "1rem",
                  marginTop: 0,
                }}
              >
                {service.description}
              </p>
              <button
                className="hh-btn-primary"
                style={{ padding: "0.5rem 1.125rem", fontSize: "0.8125rem" }}
              >
                {service.ctaText}
                <ArrowRightIcon size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive breakpoints */}
      <style>{`
        @media (max-width: 640px) {
          .l3-featured-row,
          .l3-secondary-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .l3-secondary.hh-service-card { flex-direction: column !important; }
          .l3-secondary.hh-service-card > div:first-child {
            width: 100% !important;
            height: 88px !important;
          }
        }
      `}</style>
    </div>
  );
}
