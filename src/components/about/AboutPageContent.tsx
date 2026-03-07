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
  { year: "2024", title: "Top Real Estate Brokerage", org: "Honolulu Board of Realtors" },
  { year: "2023", title: "Best Customer Service Award", org: "Hawaii Business Magazine" },
  { year: "2023", title: "#1 Property Management Firm", org: "Oahu Real Estate Association" },
  { year: "2022", title: "Excellence in Luxury Real Estate", org: "Pacific Real Estate Council" },
  { year: "2022", title: "Community Impact Award", org: "Honolulu Chamber of Commerce" },
  { year: "2021", title: "Top Producing Team — Hawaii", org: "National Association of Realtors" },
];

const milestones = [
  { year: "2008", event: "Founded in Honolulu with a team of 3 agents" },
  { year: "2012", event: "Expanded to neighbor islands — Maui, Kauai, Big Island" },
  { year: "2016", event: "Launched full property management division" },
  { year: "2019", event: "Reached $50M in annual transaction volume" },
  { year: "2022", event: "Named top brokerage by Honolulu Board of Realtors" },
  { year: "2024", event: "500+ homes sold milestone achieved" },
];

/* Shared Tailwind patterns */
const eyebrow = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem]";
const sectionSubtext = "text-[0.9375rem] text-hh-text/[0.55] max-w-[500px] leading-[1.7] m-0";
const sectionInner = "max-w-[1200px] mx-auto px-8 max-[700px]:px-5";

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

      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current.children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.14, delay: 0.3, ease: "power3.out" }
        );
      }

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

      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll("[data-value-card]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
          }
        );
      }

      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.querySelectorAll("[data-team-card]"),
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
          }
        );
      }

      if (awardsRef.current) {
        gsap.fromTo(
          awardsRef.current.querySelectorAll("[data-award-card]"),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: awardsRef.current, start: "top 80%" },
          }
        );
      }

      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll("[data-timeline-item]"),
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
          }
        );
      }

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
    <div className="bg-hh-warm-bg text-hh-text min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          ref={bgRef}
          className="absolute left-0 right-0 bg-cover"
          style={{
            top: -120,
            height: "calc(100% + 240px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundPosition: "center 40%",
            filter: "brightness(0.65) saturate(0.72) contrast(0.95)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)",
          }}
        />
        <div
          ref={heroContentRef}
          className="relative z-[2] max-w-[1200px] mx-auto px-8 pt-[140px] pb-24 w-full max-[700px]:px-5 max-[700px]:pt-[120px] max-[700px]:pb-16"
        >
          <p className={eyebrow}>About Us</p>
          <h1
            className="font-bold text-white mb-5 leading-[1.1] tracking-[-0.02em] max-w-[680px] mt-0"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
          >
            Hawaii's Most Trusted Real Estate Partner
          </h1>
          <p
            className="text-white/[0.82] leading-[1.72] max-w-[540px] mb-10 mt-0"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.1875rem)" }}
          >
            For over 15 years, Hawaii Home Properties LLC has been the
            brokerage of choice for buyers, sellers, investors, and property
            owners across every island — built on integrity, expertise, and
            the spirit of aloha.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="hh-btn-primary">Talk to Our Team</Link>
            <Link href="/services" className="hh-btn-outline-light">Our Services</Link>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-24 bg-hh-warm-bg">
        <div className={sectionInner}>
          <div
            ref={storyRef}
            className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-10 min-[700px]:gap-20 items-center"
          >
            {/* Image */}
            <div
              className="hh-img-placeholder rounded-[24px] overflow-hidden aspect-square relative"
              style={{ background: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 60%, #CFC499 100%)" }}
            >
              <span className="hh-img-placeholder-label">Office / Team Photo</span>
            </div>

            {/* Text */}
            <div>
              <p className={eyebrow}>Our Story</p>
              <h2
                className="font-bold text-hh-text mb-5 mt-0 tracking-[-0.015em] leading-[1.2]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
              >
                Rooted in Hawaii. Built on Trust.
              </h2>
              <p className="text-[0.9375rem] text-hh-text/[0.65] leading-[1.78] mb-[1.125rem] mt-0">
                Hawaii Home Properties LLC was founded in 2008 by a group of
                local real estate professionals who believed the islands deserved
                a brokerage that put people before commissions — one that combined
                deep local knowledge with genuine aloha spirit.
              </p>
              <p className="text-[0.9375rem] text-hh-text/[0.65] leading-[1.78] mb-[1.125rem] mt-0">
                What started as a small team of three agents in Honolulu has grown
                into Hawaii's most comprehensive full-service brokerage, serving
                clients across Oahu, Maui, Kauai, and the Big Island — with the
                same values that guided us from day one.
              </p>
              <p className="text-[0.9375rem] text-hh-text/[0.65] leading-[1.78] mb-8 mt-0">
                Today, we are proud to have helped over 500 families, investors,
                and property owners achieve their real estate goals — and we are
                just getting started.
              </p>

              {/* Key points */}
              <div className="flex flex-col gap-[0.625rem]">
                {[
                  "Founded in Honolulu — locally owned and operated",
                  "Licensed across all major Hawaiian islands",
                  "Full-service: buying, selling, management, investment",
                  "Over $120M in total transaction volume",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-[0.625rem]">
                    <span className="text-hh-gold mt-px flex-shrink-0">
                      <CheckCircleIcon />
                    </span>
                    <span className="text-sm text-hh-text/[0.72] leading-[1.5]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <div className="bg-[rgba(212,175,95,0.06)] border-t border-b border-[rgba(212,175,95,0.14)] py-14">
        <div className={`${sectionInner} grid grid-cols-2 min-[900px]:grid-cols-4 gap-8 text-center`}>
          {[
            { number: "15+", label: "Years in Business" },
            { number: "500+", label: "Homes Sold" },
            { number: "$120M+", label: "In Transactions" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-bold text-hh-text leading-none mb-2 tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
              >
                {stat.number}
              </div>
              <div className="text-[0.8125rem] text-hh-text/[0.48] font-medium tracking-[0.02em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== OUR VALUES ===== */}
      <section ref={valuesRef} className="py-24 bg-hh-warm-bg">
        <div className={sectionInner}>
          <p className={eyebrow}>Our Values</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            What We Stand For
          </h2>
          <p className={sectionSubtext}>
            Our values are not a wall poster — they are the principles behind
            every conversation, recommendation, and transaction we make.
          </p>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-4 gap-5 mt-12">
            {values.map((v) => (
              <div
                key={v.title}
                data-value-card=""
                className="bg-white/[0.68] border border-[rgba(212,175,95,0.16)] rounded-[18px] p-8 text-center"
              >
                <div className="w-[52px] h-[52px] bg-[rgba(212,175,95,0.14)] border border-[rgba(212,175,95,0.24)] rounded-[14px] flex items-center justify-center text-hh-gold mx-auto mb-5">
                  <v.Icon />
                </div>
                <h3 className="text-[0.9375rem] font-semibold text-hh-text m-0 mb-2">{v.title}</h3>
                <p className="text-[0.8125rem] text-hh-text/[0.52] leading-[1.65] m-0">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEET THE TEAM ===== */}
      <section ref={teamRef} className="py-24 bg-[rgba(212,175,95,0.06)]">
        <div className={sectionInner}>
          <p className={eyebrow}>Meet the Team</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            The People Behind the Promise
          </h2>
          <p className={sectionSubtext}>
            Our agents are more than licensed professionals — they are your
            neighbors, your advocates, and your guides through one of life's
            biggest decisions.
          </p>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-4 gap-6 mt-12">
            {team.map((member) => (
              <div
                key={member.name}
                data-team-card=""
                className="bg-white/[0.68] border border-[rgba(212,175,95,0.16)] rounded-[20px] overflow-hidden transition-[transform,box-shadow] duration-[220ms] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(180,148,70,0.18)]"
              >
                {/* Avatar */}
                <div
                  className="hh-img-placeholder aspect-square relative overflow-hidden"
                  style={{ background: member.avatarBg }}
                >
                  <span className="text-[2rem] font-bold text-[rgba(180,145,65,0.50)] tracking-[0.04em] z-[2] relative">
                    {member.initials}
                  </span>
                  <span className="hh-img-placeholder-label">Agent Photo</span>
                </div>
                {/* Info */}
                <div className="px-[1.375rem] pt-5 pb-6">
                  <h3 className="text-base font-semibold text-hh-text m-0 mb-1">{member.name}</h3>
                  <p className="text-xs font-medium text-hh-text/[0.48] tracking-[0.04em] uppercase m-0 mb-[0.875rem]">{member.role}</p>
                  <p className="text-[0.8125rem] text-hh-text/[0.52] leading-[1.65] m-0">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AWARDS & RECOGNITION ===== */}
      <section ref={awardsRef} className="py-24 bg-hh-warm-bg">
        <div className={sectionInner}>
          <p className={eyebrow}>Recognition</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Awards & Achievements
          </h2>
          <p className={sectionSubtext}>
            Our work speaks for itself — and the industry has taken notice.
          </p>
          <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[960px]:grid-cols-3 gap-6 mt-12">
            {awards.map((award) => (
              <div
                key={award.title}
                data-award-card=""
                className="bg-white/[0.58] border border-[rgba(212,175,95,0.14)] rounded-2xl p-7 flex gap-[1.125rem] items-start"
              >
                <div className="w-11 h-11 bg-[rgba(212,175,95,0.14)] border border-[rgba(212,175,95,0.26)] rounded-xl flex items-center justify-center text-hh-gold flex-shrink-0">
                  <AwardIcon size={20} />
                </div>
                <div>
                  <p className="text-[0.625rem] font-bold tracking-[0.12em] uppercase text-hh-text/[0.42] m-0 mb-1">{award.year}</p>
                  <h3 className="text-[0.9375rem] font-semibold text-hh-text m-0 mb-1">{award.title}</h3>
                  <p className="text-[0.8125rem] text-hh-text/[0.45] m-0">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section ref={timelineRef} className="py-24 bg-[rgba(212,175,95,0.06)]">
        <div className={sectionInner}>
          <p className={eyebrow}>Our Journey</p>
          <h2
            className="font-bold text-hh-text mb-12 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            15 Years of Growth
          </h2>
          <div className="flex flex-col max-w-[680px]">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                data-timeline-item=""
                className="flex gap-7 items-start"
                style={{ paddingBottom: i < milestones.length - 1 ? "2.25rem" : 0 }}
              >
                {/* Line + dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-hh-gold border-2 border-[rgba(212,175,95,0.35)] flex-shrink-0 mt-[3px]" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-[rgba(212,175,95,0.14)] mt-1.5 min-h-9" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-1">
                  <span className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase text-hh-text/[0.42] block mb-[0.3rem]">
                    {m.year}
                  </span>
                  <p className="text-[0.9375rem] text-hh-text/[0.78] m-0 leading-[1.55]">
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-28 text-center bg-hh-warm-dark max-[480px]:py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,95,0.18) 0%, transparent 70%)",
          }}
        />
        <div ref={ctaRef} className="relative z-[2] max-w-[640px] mx-auto px-8">
          <p className={`${eyebrow} text-center`}>Work with Us</p>
          <h2
            className="font-bold text-hh-text mb-[1.125rem] mt-0 tracking-[-0.02em] leading-[1.15]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Ready to Experience the Hawaii Home Difference?
          </h2>
          <p className="text-base text-hh-text/[0.62] leading-[1.7] mb-10 mt-0">
            Whether you are buying your first home, selling an investment
            property, or looking for professional management — our team is
            ready to help with the expertise and aloha spirit you deserve.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/contact" className="hh-btn-primary">Schedule a Free Consultation</Link>
            <Link href="/services" className="hh-btn-outline">View Our Services</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
