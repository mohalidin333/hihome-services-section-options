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
      <p className="text-center text-[0.625rem] font-semibold tracking-[0.12em] uppercase text-[rgba(212,175,95,0.42)] mb-8">
        Option 2 — Icon + Description Vertical List
      </p>

      {/* =====================================================
          Vertical list rows
          ===================================================== */}
      <div className="flex flex-col gap-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="l2-row hh-glass-row flex items-start gap-[1.375rem] p-6 max-[480px]:gap-4 max-[480px]:p-[1.125rem]"
          >
            {/* ---- Left column: icon badge + step number ---- */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              {/*
                ICON PLACEHOLDER
                Replace this div with an <Image> or custom SVG icon:
                  <Image src="/icons/{service.id}.svg" width={28} height={28} alt="" />
              */}
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 max-[480px]:w-11 max-[480px]:h-11 max-[480px]:rounded-[11px]"
                style={{ background: service.iconBg, color: service.iconColor }}
              >
                <ServiceIconResolver icon={service.icon} size={24} />
              </div>

              {/* Step number */}
              <span className="text-[0.625rem] font-bold text-[rgba(212,175,95,0.22)] tracking-[0.04em]">
                0{index + 1}
              </span>
            </div>

            {/* ---- Middle column: text content ---- */}
            <div className="flex-1 min-w-0">
              {/* Tagline */}
              <span
                className="inline-block text-[0.625rem] font-bold tracking-[0.11em] uppercase mb-[0.375rem]"
                style={{ color: service.iconColor }}
              >
                {service.tagline}
              </span>

              {/* Title */}
              <h3 className="text-[1.0625rem] font-semibold text-hh-text leading-[1.35] mb-2 mt-0">
                {service.title}
              </h3>

              {/* Extended description (more detail than Layout 1) */}
              <p className="text-sm text-hh-text/[0.65] leading-[1.7] mt-0 mb-0">
                {service.extendedDescription}
              </p>
            </div>

            {/* ---- Right column: mini image thumbnail ----
                PLACEHOLDER: replace with <Image> when ready.
                Hidden below 560px via Tailwind responsive class.
            */}
            <div
              className="l2-thumb flex-shrink-0 w-24 h-[82px] rounded-xl flex flex-col items-center justify-center gap-[0.3rem] text-[rgba(90,62,10,0.75)] max-[560px]:hidden"
              style={{ background: service.imageBg }}
            >
              <ServiceIconResolver icon={service.icon} size={22} />
              <span className="text-[0.5rem] text-[rgba(80,55,10,0.55)] tracking-[0.07em] uppercase text-center leading-[1.25] px-1">
                Image
                <br />
                Placeholder
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---- View All Services CTA ---- */}
      <div className="l2-view-all flex justify-center mt-8">
        <button
          className="hh-btn-outline-light"
          style={{ padding: "0.75rem 2.25rem", fontSize: "0.9375rem" }}
        >
          View All Services
          <ArrowRightIcon size={15} />
        </button>
      </div>
    </div>
  );
}
