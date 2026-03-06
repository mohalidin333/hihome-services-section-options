"use client";

/* =====================================================
   ServicesSection — Main wrapper for the Services section.

   Background scroll effects (GSAP + ScrollTrigger):
   1. Parallax  — image moves at ~40% of scroll speed,
                  creating depth as the user scrolls.
   2. Blur      — image softly blurs (0 → 8px) as the
                  section scrolls upward through the viewport,
                  keeping the elegant photo visible on arrival
                  while letting content breathe at depth.

   Layout switching: fade out → swap component → fade in.
   ===================================================== */

import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingNav from "./FloatingNav";
import Layout1CardGrid from "./Layout1CardGrid";
import Layout2VerticalList from "./Layout2VerticalList";
import Layout3FeaturedSplit from "./Layout3FeaturedSplit";
import type { LayoutId } from "./serviceData";

export default function ServicesSection() {
  const [activeLayout, setActiveLayout] = useState<LayoutId>("grid");
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layoutContainerRef = useRef<HTMLDivElement>(null);

  /* =====================================================
     1. Background scroll effects — parallax + blur
     ===================================================== */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    /*
      PARALLAX
      Background image travels at ~40% of the user's scroll
      speed. Starts at y:0, ends at y:-120px by the time the
      section exits the viewport (top → bottom sweep).
      scrub: true = frame-perfect sync with scroll position.
    */
    const parallaxTween = gsap.to(bg, {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // section enters viewport from below
        end: "bottom top",   // section exits viewport from above
        scrub: true,
      },
    });

    /*
      PROGRESSIVE BLUR
      The image starts desaturated (from CSS filter on the class).
      GSAP only adds a gentle blur — max 3px — to softly diffuse
      the image further as content is scrolled. The base
      brightness/saturate/contrast values must be carried through
      the entire fromTo so they are not reset mid-animation.
      scrub: 1.6 = silky lag, never mechanical.
    */
    const blurTween = gsap.fromTo(
      bg,
      { filter: "brightness(0.88) saturate(0.80) contrast(0.95) blur(0px)" },
      {
        filter: "brightness(0.88) saturate(0.80) contrast(0.95) blur(5px)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",   // blur begins when header reaches viewport top
          end: "80% top",     // at max by 80% scroll progress
          scrub: 1.6,
        },
      }
    );

    return () => {
      parallaxTween.scrollTrigger?.kill();
      blurTween.scrollTrigger?.kill();
      parallaxTween.kill();
      blurTween.kill();
    };
  }, []);

  /* =====================================================
     2. Section header entrance animation
     ===================================================== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hh-header-child",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.13,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =====================================================
     3. Layout switch: fade out → swap → fade in
     ===================================================== */
  const handleLayoutChange = useCallback(
    (newLayout: LayoutId) => {
      if (newLayout === activeLayout || !layoutContainerRef.current) return;

      gsap.to(layoutContainerRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveLayout(newLayout);
          gsap.set(layoutContainerRef.current, { y: 18 });
          gsap.to(layoutContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
          });
        },
      });
    },
    [activeLayout]
  );

  const renderLayout = () => {
    switch (activeLayout) {
      case "grid":  return <Layout1CardGrid />;
      case "list":  return <Layout2VerticalList />;
      case "split": return <Layout3FeaturedSplit />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="hh-section-bg"
      style={{ minHeight: "100vh", padding: "5rem 1.5rem 6rem" }}
    >
      {/* =====================================================
          BACKGROUND IMAGE LAYER
          backgroundImage is set via inline style (not CSS) to
          avoid any bundler/PostCSS URL rewriting issues.
          .hh-bg-parallax — animated by GSAP (y + filter:blur).
          .hh-bg-overlay  — dark gradient, keeps text legible.
          ===================================================== */}
      <div
        ref={bgRef}
        className="hh-bg-parallax"
        style={{ backgroundImage: "url('/luxury-home.png')" }}
      />
      <div className="hh-bg-overlay" />

      {/* ---- Floating layout switcher (above everything) ---- */}
      <FloatingNav
        activeLayout={activeLayout}
        onLayoutChange={handleLayoutChange}
      />

      {/* ---- Main content ---- */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* =====================================================
            Section Header — dark text on frosted pearl overlay
            ===================================================== */}
        <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>

          {/* Eyebrow tag */}
          <span className="hh-section-tag hh-header-child">Our Services</span>

          {/* Divider */}
          <div
            className="hh-divider hh-header-child"
            style={{ margin: "0.875rem auto 1.625rem" }}
          />

          {/* Main heading */}
          <h2
            className="hh-header-child"
            style={{
              fontSize: "clamp(1.875rem, 4.5vw, 2.875rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.2,
              letterSpacing: "-0.022em",
              marginBottom: "1rem",
              marginTop: 0,
            }}
          >
            Real Estate Services with{" "}
            <span style={{ color: "#C8A84B" }}>Aloha Spirit</span>
          </h2>

          {/* Subheading */}
          <p
            className="hh-header-child"
            style={{
              fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
              color: "rgba(255, 255, 255, 0.78)",
              lineHeight: 1.72,
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            Hawaii Home Properties LLC guides you through every step of your
            real estate journey in the Aloha State — with professionalism,
            trust, and genuine local expertise.
          </p>
        </header>

        {/* =====================================================
            Layout container (GSAP transition target)
            ===================================================== */}
        <div ref={layoutContainerRef}>{renderLayout()}</div>
      </div>
    </section>
  );
}
