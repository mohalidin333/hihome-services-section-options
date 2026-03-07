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
      <p className="text-center text-[0.625rem] font-semibold tracking-[0.12em] uppercase text-[rgba(212,175,95,0.42)] mb-8">
        Option 3 — Featured Split Services
      </p>

      {/* =====================================================
          Top row: 2 large featured cards
          ===================================================== */}
      <div className="l3-featured-row grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
            className="hh-img-placeholder h-[248px]"
            style={{ background: primary1.imageBg }}
          >
            <div className="text-center text-[rgba(90,62,10,0.80)]">
              <div className="flex justify-center mb-3 opacity-90">
                <ServiceIconResolver icon={primary1.icon} size={44} />
              </div>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase opacity-80">
                {primary1.tagline}
              </span>
            </div>
            <span className="hh-img-placeholder-label">
              Image Placeholder — {primary1.tagline}
            </span>
          </div>

          <div className="p-[1.875rem]">
            <h3 className="text-[1.1875rem] font-bold text-hh-text leading-[1.3] mb-3 mt-0">
              {primary1.title}
            </h3>
            <p className="text-sm text-hh-text/[0.65] leading-[1.72] mb-6 mt-0">
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
            className="hh-img-placeholder h-[248px]"
            style={{ background: primary2.imageBg }}
          >
            <div className="text-center text-[rgba(90,62,10,0.80)]">
              <div className="flex justify-center mb-3 opacity-90">
                <ServiceIconResolver icon={primary2.icon} size={44} />
              </div>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase opacity-80">
                {primary2.tagline}
              </span>
            </div>
            <span className="hh-img-placeholder-label">
              Image Placeholder — {primary2.tagline}
            </span>
          </div>

          <div className="p-[1.875rem]">
            <h3 className="text-[1.1875rem] font-bold text-hh-text leading-[1.3] mb-3 mt-0">
              {primary2.title}
            </h3>
            <p className="text-sm text-hh-text/[0.65] leading-[1.72] mb-6 mt-0">
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
      <div className="l3-secondary-row grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[secondary1, secondary2].map((service) => (
          <div
            key={service.id}
            className="l3-secondary hh-service-card flex flex-row overflow-hidden max-[480px]:flex-col"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {/* Left color strip with icon (image placeholder) */}
            <div
              className="w-[116px] flex-shrink-0 flex flex-col items-center justify-center gap-2 text-[rgba(90,62,10,0.80)] px-2 max-[480px]:w-full max-[480px]:h-[88px]"
              style={{ background: service.imageBg }}
            >
              <ServiceIconResolver icon={service.icon} size={28} />
              <span className="text-[0.5rem] text-[rgba(80,55,10,0.55)] tracking-[0.07em] uppercase text-center leading-[1.3]">
                Image
                <br />
                Placeholder
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 px-[1.375rem] py-5">
              <span
                className="inline-block text-[0.5625rem] font-bold tracking-[0.11em] uppercase mb-[0.35rem]"
                style={{ color: service.iconColor }}
              >
                {service.tagline}
              </span>
              <h3 className="text-[0.9375rem] font-semibold text-hh-text leading-[1.35] mb-2 mt-0">
                {service.title}
              </h3>
              <p className="text-[0.8125rem] text-hh-text/[0.65] leading-[1.65] mb-4 mt-0">
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
    </div>
  );
}
