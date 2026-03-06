"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

/* =====================================================
   Inline SVG icons
   ===================================================== */
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function TrendingUpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function AwardIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* =====================================================
   Data
   ===================================================== */
const values = [
  {
    Icon: HeartIcon,
    title: "Aloha First",
    desc: "Every client interaction is guided by warmth, respect, and the genuine spirit of aloha that defines Hawaii.",
  },
  {
    Icon: EyeIcon,
    title: "Full Transparency",
    desc: "No surprises, no fine print. We believe informed clients make the best decisions — so we share everything.",
  },
  {
    Icon: UsersIcon,
    title: "Community Roots",
    desc: "We are proud members of the Hawaiian community, reinvesting in local causes and supporting neighborhoods we serve.",
  },
  {
    Icon: TrendingUpIcon,
    title: "Results-Driven",
    desc: "We measure our success by yours. Every strategy, every negotiation, every recommendation is laser-focused on your outcome.",
  },
];

const team = [
  {
    name: "Kalani Akana",
    role: "Principal Broker",
    bio: "Born and raised in Honolulu, Kalani brings 20 years of Hawaii real estate expertise and an unmatched network across all islands.",
    avatarBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 100%)",
    initials: "KA",
  },
  {
    name: "Leilani Moku",
    role: "Senior Buyer's Agent",
    bio: "Leilani specializes in first-time homebuyers and relocation clients, known for her patience and deep knowledge of Oahu neighborhoods.",
    avatarBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 100%)",
    initials: "LM",
  },
  {
    name: "Keanu Hale",
    role: "Investment Specialist",
    bio: "With a background in finance and 12 years in Hawaii real estate, Keanu helps investors identify high-yield opportunities across the state.",
    avatarBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 100%)",
    initials: "KH",
  },
  {
    name: "Maile Reyes",
    role: "Property Manager",
    bio: "Maile oversees our full property management portfolio with meticulous attention to detail and a reputation for exceptional tenant relations.",
    avatarBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 100%)",
    initials: "MR",
  },
];

const awards = [
  {
    year: "2024",
    title: "Top Real Estate Brokerage",
    org: "Honolulu Board of Realtors",
  },
  {
    year: "2023",
    title: "Best Customer Service Award",
    org: "Hawaii Business Magazine",
  },
  {
    year: "2023",
    title: "#1 Property Management Firm",
    org: "Oahu Real Estate Association",
  },
  {
    year: "2022",
    title: "Excellence in Luxury Real Estate",
    org: "Pacific Real Estate Council",
  },
  {
    year: "2022",
    title: "Community Impact Award",
    org: "Honolulu Chamber of Commerce",
  },
  {
    year: "2021",
    title: "Top Producing Team — Hawaii",
    org: "National Association of Realtors",
  },
];

const milestones = [
  { year: "2008", event: "Founded in Honolulu with a team of 3 agents" },
  { year: "2012", event: "Expanded to neighbor islands — Maui, Kauai, Big Island" },
  { year: "2016", event: "Launched full property management division" },
  { year: "2019", event: "Reached $50M in annual transaction volume" },
  { year: "2022", event: "Named top brokerage by Honolulu Board of Realtors" },
  { year: "2024", event: "500+ homes sold milestone achieved" },
];

export default function AboutPageContent() {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Hero parallax */
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: bgRef.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* Hero content entrance */
      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current.children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.14, delay: 0.3, ease: "power3.out" }
        );
      }

      /* Story section */
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: "power3.out",
            scrollTrigger: { trigger: storyRef.current, start: "top 80%" },
          }
        );
      }

      /* Values cards */
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll(".hh-about-value-card"),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
          }
        );
      }

      /* Team cards */
      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.querySelectorAll(".hh-about-team-card"),
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
          }
        );
      }

      /* Awards */
      if (awardsRef.current) {
        gsap.fromTo(
          awardsRef.current.querySelectorAll(".hh-about-award-card"),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: awardsRef.current, start: "top 80%" },
          }
        );
      }

      /* Timeline items */
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll(".hh-about-timeline-item"),
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
          }
        );
      }

      /* CTA */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 82%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="hh-sp-page">

      {/* ===== HERO ===== */}
      <section className="hh-sp-hero">
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            left: 0, right: 0, top: -120,
            height: "calc(100% + 240px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.65) saturate(0.72) contrast(0.95)",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)",
          }}
        />
        <div ref={heroContentRef} className="hh-sp-hero-content">
          <p className="hh-sp-eyebrow">About Us</p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 1.25rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 680,
            }}
          >
            Hawaii's Most Trusted Real Estate Partner
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.1875rem)",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.72,
              maxWidth: 540,
              margin: "0 0 2.5rem",
            }}
          >
            For over 15 years, Hawaii Home Properties LLC has been the
            brokerage of choice for buyers, sellers, investors, and property
            owners across every island — built on integrity, expertise, and
            the spirit of aloha.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="hh-btn-primary">Talk to Our Team</Link>
            <Link href="/services" className="hh-btn-outline-light">Our Services</Link>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="hh-sp-section" style={{ background: "#FAF8F2" }}>
        <div className="hh-sp-section-inner">
          <div ref={storyRef} className="hh-about-story">
            {/* Image */}
            <div
              className="hh-about-story-img hh-img-placeholder"
              style={{
                background: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 60%, #CFC499 100%)",
              }}
            >
              <span className="hh-img-placeholder-label">Office / Team Photo</span>
            </div>

            {/* Text */}
            <div>
              <p className="hh-sp-eyebrow">Our Story</p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700, color: "#1E1408",
                  margin: "0 0 1.25rem", letterSpacing: "-0.015em", lineHeight: 1.2,
                }}
              >
                Rooted in Hawaii. Built on Trust.
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.65)", lineHeight: 1.78, margin: "0 0 1.125rem" }}>
                Hawaii Home Properties LLC was founded in 2008 by a group of
                local real estate professionals who believed the islands deserved
                a brokerage that put people before commissions — one that combined
                deep local knowledge with genuine aloha spirit.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.65)", lineHeight: 1.78, margin: "0 0 1.125rem" }}>
                What started as a small team of three agents in Honolulu has grown
                into Hawaii's most comprehensive full-service brokerage, serving
                clients across Oahu, Maui, Kauai, and the Big Island — with the
                same values that guided us from day one.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.65)", lineHeight: 1.78, margin: "0 0 2rem" }}>
                Today, we are proud to have helped over 500 families, investors,
                and property owners achieve their real estate goals — and we are
                just getting started.
              </p>

              {/* Key points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  "Founded in Honolulu — locally owned and operated",
                  "Licensed across all major Hawaiian islands",
                  "Full-service: buying, selling, management, investment",
                  "Over $120M in total transaction volume",
                ].map((point) => (
                  <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <span style={{ color: "#C8A84B", marginTop: "1px", flexShrink: 0 }}>
                      <CheckCircleIcon />
                    </span>
                    <span style={{ fontSize: "0.875rem", color: "rgba(30,20,8,0.72)", lineHeight: 1.5 }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP (reuse from services page) ===== */}
      <div className="hh-sp-stats">
        <div className="hh-sp-stats-grid">
          {[
            { number: "15+", label: "Years in Business" },
            { number: "500+", label: "Homes Sold" },
            { number: "$120M+", label: "In Transactions" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="hh-sp-stat-number">{stat.number}</div>
              <div className="hh-sp-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== OUR VALUES ===== */}
      <section ref={valuesRef} className="hh-sp-section" style={{ background: "#FAF8F2" }}>
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow">Our Values</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700, color: "#1E1408",
              margin: "0 0 0.5rem", letterSpacing: "-0.015em",
            }}
          >
            What We Stand For
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.55)", maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
            Our values are not a wall poster — they are the principles behind
            every conversation, recommendation, and transaction we make.
          </p>
          <div className="hh-about-values-grid">
            {values.map((v) => (
              <div key={v.title} className="hh-about-value-card">
                <div className="hh-about-value-icon">
                  <v.Icon />
                </div>
                <h3 className="hh-about-value-title">{v.title}</h3>
                <p className="hh-about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEET THE TEAM ===== */}
      <section
        ref={teamRef}
        className="hh-sp-section"
        style={{ background: "rgba(212,175,95,0.06)" }}
      >
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow">Meet the Team</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700, color: "#1E1408",
              margin: "0 0 0.5rem", letterSpacing: "-0.015em",
            }}
          >
            The People Behind the Promise
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.55)", maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
            Our agents are more than licensed professionals — they are your
            neighbors, your advocates, and your guides through one of life's
            biggest decisions.
          </p>
          <div className="hh-about-team-grid">
            {team.map((member) => (
              <div key={member.name} className="hh-about-team-card">
                {/* Avatar */}
                <div
                  className="hh-about-team-avatar hh-img-placeholder"
                  style={{ background: member.avatarBg }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "rgba(180,145,65,0.50)",
                      letterSpacing: "0.04em",
                      zIndex: 2,
                      position: "relative",
                    }}
                  >
                    {member.initials}
                  </span>
                  <span className="hh-img-placeholder-label">Agent Photo</span>
                </div>
                {/* Info */}
                <div className="hh-about-team-info">
                  <h3 className="hh-about-team-name">{member.name}</h3>
                  <p className="hh-about-team-role">{member.role}</p>
                  <p className="hh-about-team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AWARDS & RECOGNITION ===== */}
      <section ref={awardsRef} className="hh-sp-section" style={{ background: "#FAF8F2" }}>
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow">Recognition</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700, color: "#1E1408",
              margin: "0 0 0.5rem", letterSpacing: "-0.015em",
            }}
          >
            Awards & Achievements
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.55)", maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
            Our work speaks for itself — and the industry has taken notice.
          </p>
          <div className="hh-about-awards-grid">
            {awards.map((award) => (
              <div key={award.title} className="hh-about-award-card">
                <div className="hh-about-award-badge">
                  <AwardIcon size={20} />
                </div>
                <div>
                  <p className="hh-about-award-year">{award.year}</p>
                  <h3 className="hh-about-award-title">{award.title}</h3>
                  <p className="hh-about-award-org">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section
        ref={timelineRef}
        className="hh-sp-section"
        style={{ background: "rgba(212,175,95,0.06)" }}
      >
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow">Our Journey</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700, color: "#1E1408",
              margin: "0 0 3rem", letterSpacing: "-0.015em",
            }}
          >
            15 Years of Growth
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              maxWidth: 680,
            }}
          >
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="hh-about-timeline-item"
                style={{
                  display: "flex",
                  gap: "1.75rem",
                  alignItems: "flex-start",
                  paddingBottom: i < milestones.length - 1 ? "2.25rem" : 0,
                  position: "relative",
                }}
              >
                {/* Line + dot */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#C8A84B",
                      border: "2px solid rgba(212,175,95,0.35)",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  {i < milestones.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        background: "rgba(212,175,95,0.14)",
                        marginTop: 6,
                        minHeight: 36,
                      }}
                    />
                  )}
                </div>
                {/* Content */}
                <div style={{ paddingBottom: "0.25rem" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(30,20,8,0.42)",
                      display: "block",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {m.year}
                  </span>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "rgba(30,20,8,0.78)",
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hh-sp-cta" style={{ background: "#F0EAD8" }}>
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,95,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div ref={ctaRef} className="hh-sp-cta-inner">
          <p className="hh-sp-eyebrow" style={{ textAlign: "center" }}>Work with Us</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700, color: "#1E1408",
              margin: "0 0 1.125rem", letterSpacing: "-0.02em", lineHeight: 1.15,
            }}
          >
            Ready to Experience the Hawaii Home Difference?
          </h2>
          <p
            style={{
              fontSize: "1rem", color: "rgba(30,20,8,0.62)",
              lineHeight: 1.7, margin: "0 0 2.5rem",
            }}
          >
            Whether you are buying your first home, selling an investment
            property, or looking for professional management — our team is
            ready to help with the expertise and aloha spirit you deserve.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="hh-btn-primary">Schedule a Free Consultation</Link>
            <Link href="/services" className="hh-btn-outline">View Our Services</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
