"use client";

/* =====================================================
   Layout 2 — Icon + Description Vertical List
   - 4 services stacked vertically as enriched list rows.
   - GSAP ScrollTrigger: each row fades in from the left
     as it enters the viewport.
   - "View All Services" outline button at the bottom.
   ===================================================== */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "./serviceData";
import { ServiceIconResolver, ArrowRightIcon } from "./ServiceIcons";

export default function Layout2VerticalList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Register ScrollTrigger (safe to call multiple times) */
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Stagger each list row in from the left via ScrollTrigger */
      gsap.utils.toArray<Element>(".l2-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -44 },
          {
            opacity: 1,
            x: 0,
            duration: 0.72,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* "View All Services" button fades up */
      gsap.fromTo(
        ".l2-view-all",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".l2-view-all",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
          color: "rgba(255,255,255,0.38)",
          marginBottom: "2rem",
        }}
      >
        Option 2 — Icon + Description Vertical List
      </p>

      {/* =====================================================
          Vertical list rows
          ===================================================== */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {services.map((service, index) => (
          <div
            key={service.id}
            className="l2-row hh-glass-row"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1.375rem",
              padding: "1.5rem",
            }}
          >
            {/* ---- Left column: icon badge + step number ---- */}
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {/*
                ICON PLACEHOLDER
                Replace this div with an <Image> or custom SVG icon:
                  <Image src="/icons/{service.id}.svg" width={28} height={28} alt="" />
              */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: service.iconBg,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: service.iconColor,
                  flexShrink: 0,
                }}
              >
                <ServiceIconResolver icon={service.icon} size={24} />
              </div>

              {/* Step number */}
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.04em",
                }}
              >
                0{index + 1}
              </span>
            </div>

            {/* ---- Middle column: text content ---- */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Tagline */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  color: service.iconColor,
                  marginBottom: "0.375rem",
                }}
              >
                {service.tagline}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.35,
                  marginBottom: "0.5rem",
                  marginTop: 0,
                }}
              >
                {service.title}
              </h3>

              {/* Extended description (more detail than Layout 1) */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.7,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {service.extendedDescription}
              </p>
            </div>

            {/* ---- Right column: mini image thumbnail ----
                PLACEHOLDER: replace with <Image> when ready.
                Hidden below 480px via responsive style below.
            */}
            <div
              className="l2-thumb"
              style={{
                flexShrink: 0,
                width: 96,
                height: 82,
                background: service.imageBg,
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.3rem",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <ServiceIconResolver icon={service.icon} size={22} />
              <span
                style={{
                  fontSize: "0.5rem",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 1.25,
                  padding: "0 0.25rem",
                }}
              >
                Image
                <br />
                Placeholder
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---- View All Services CTA ---- */}
      <div
        className="l2-view-all"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <button
          className="hh-btn-outline"
          style={{ padding: "0.75rem 2.25rem", fontSize: "0.9375rem" }}
        >
          View All Services
          <ArrowRightIcon size={15} />
        </button>
      </div>

      {/* Responsive: hide thumbnail on narrow screens */}
      <style>{`
        @media (max-width: 480px) {
          .l2-thumb { display: none !important; }
        }
      `}</style>
    </div>
  );
}
