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
      <p className="text-center text-[0.625rem] font-semibold tracking-[0.12em] uppercase text-[rgba(212,175,95,0.42)] mb-8">
        Option 1 — Service Cards Grid
      </p>

      {/* =====================================================
          2×2 Card Grid
          Responsive: 2 columns → 1 column below 640px
          ===================================================== */}
      <div className="l1-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              className="hh-img-placeholder h-[190px]"
              style={{ background: service.imageBg }}
            >
              {/* Icon badge centered in image area */}
              <div className="w-[58px] h-[58px] bg-white/[0.72] backdrop-blur-[8px] rounded-[14px] flex items-center justify-center text-hh-gold border border-white/90">
                <ServiceIconResolver icon={service.icon} size={28} />
              </div>
              <span className="hh-img-placeholder-label">
                Image Placeholder — {service.tagline}
              </span>
            </div>

            {/* ---- Card content ---- */}
            <div className="p-6">
              {/* Tagline badge */}
              <span
                className="inline-block text-[0.625rem] font-bold tracking-[0.11em] uppercase mb-2"
                style={{ color: service.iconColor }}
              >
                {service.tagline}
              </span>

              {/* Title */}
              <h3 className="text-[1.0625rem] font-semibold text-hh-text leading-[1.35] mb-[0.625rem] mt-0">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-hh-text/[0.65] leading-[1.68] mb-[1.375rem] mt-0">
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
    </div>
  );
}
