"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  HomeIcon,
  TagIcon,
  BuildingIcon,
  ChartIcon,
} from "./ServiceIcons";

/* =====================================================
   Inline SVG icons for Why Choose Us + Process sections
   ===================================================== */
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function HandshakeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* =====================================================
   Service detail data
   ===================================================== */
const serviceDetails = [
  {
    id: "buying",
    tagline: "Buying",
    title: "Find Your Dream Home in Hawaii",
    description:
      "Navigating Hawaii's real estate market requires more than just searching listings — it demands deep local knowledge, an understanding of unique island regulations, and a trusted advocate who puts your goals first.",
    features: [
      "Personalized property search tailored to your lifestyle and budget",
      "Expert guidance through Hawaii's unique disclosure requirements",
      "Access to off-market listings through our local agent network",
      "End-to-end support from first showing to closing day",
      "Neighborhood insights across all major Hawaiian islands",
    ],
    cta: "Request a Buyer Consultation",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 55%, #CFC499 100%)",
    Icon: HomeIcon,
    reverse: false,
  },
  {
    id: "selling",
    tagline: "Selling",
    title: "Sell with Confidence & Maximum Value",
    description:
      "Getting the best price for your Hawaii property takes more than a listing. Our proven marketing strategy, professional staging guidance, and extensive buyer network ensures your home stands out and sells on your terms.",
    features: [
      "Comprehensive comparative market analysis and strategic pricing",
      "Professional photography, virtual tours, and luxury property presentations",
      "Targeted digital and social media marketing campaigns",
      "Expert negotiation to maximize your final sale price",
      "Transparent communication and timeline management throughout",
    ],
    cta: "Get a Free Property Valuation",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 55%, #CCC09A 100%)",
    Icon: TagIcon,
    reverse: true,
  },
  {
    id: "management",
    tagline: "Property Management",
    title: "Worry-Free Property Management",
    description:
      "Owning investment property in Hawaii is rewarding — managing it doesn't have to be stressful. Our full-service property management team handles everything so you can enjoy passive income without the day-to-day headaches.",
    features: [
      "Rigorous tenant screening including background and credit checks",
      "Prompt maintenance coordination with licensed local contractors",
      "Accurate monthly financial reporting and rent disbursement",
      "Lease preparation, renewals, and legal compliance management",
      "24/7 emergency response for your tenants and properties",
    ],
    cta: "Learn About Management Services",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 55%, #D4C4A0 100%)",
    Icon: BuildingIcon,
    reverse: false,
  },
  {
    id: "investment",
    tagline: "Investment Guidance",
    title: "Grow Your Real Estate Portfolio",
    description:
      "Hawaii's real estate market offers exceptional long-term investment potential — if you know where to look. Our investment specialists provide the data-driven analysis and curated deal sourcing you need to invest with confidence.",
    features: [
      "Detailed ROI modeling and cash-flow projections for each opportunity",
      "Market trend analysis across residential, vacation rental, and commercial sectors",
      "Access to distressed properties and pre-market investment deals",
      "1031 exchange guidance and tax-efficient acquisition strategies",
      "Portfolio review and rebalancing recommendations",
    ],
    cta: "Explore Investment Opportunities",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 55%, #CDBE98 100%)",
    Icon: ChartIcon,
    reverse: true,
  },
];

const stats = [
  { number: "500+", label: "Homes Sold" },
  { number: "15+", label: "Years of Experience" },
  { number: "$120M+", label: "In Transactions" },
  { number: "98%", label: "Client Satisfaction" },
];

const whyUs = [
  {
    Icon: MapPinIcon,
    title: "Deep Local Knowledge",
    desc: "Born and raised in Hawaii, our agents understand each neighborhood, school district, and market nuance across every island.",
  },
  {
    Icon: ShieldIcon,
    title: "Trusted & Transparent",
    desc: "We operate with complete transparency — no hidden fees, no pressure tactics. Just honest advice that puts your interests first.",
  },
  {
    Icon: StarIcon,
    title: "Award-Winning Service",
    desc: "Consistently recognized as a top-producing brokerage in Honolulu, backed by hundreds of five-star client reviews.",
  },
  {
    Icon: HandshakeIcon,
    title: "Aloha Spirit in Every Deal",
    desc: "Real estate is personal. We treat every client like family, bringing warmth, patience, and genuine care to every transaction.",
  },
  {
    Icon: ChartIcon,
    title: "Data-Driven Strategy",
    desc: "From market analysis to pricing strategy, every recommendation is backed by real-time data and decades of local market experience.",
  },
  {
    Icon: HomeIcon,
    title: "Full-Service Brokerage",
    desc: "Whether buying, selling, renting, or investing — we offer everything under one roof, so you never need to look elsewhere.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "We start by listening. Understanding your goals, timeline, and priorities so we can tailor a strategy built specifically for you.",
  },
  {
    num: "02",
    title: "Market Analysis",
    desc: "We deliver a comprehensive market report — pricing trends, comparable properties, and opportunity assessments — so you can make informed decisions.",
  },
  {
    num: "03",
    title: "Negotiation & Offer",
    desc: "Our experienced negotiators advocate fiercely on your behalf, ensuring you get the best possible terms and price at every stage.",
  },
  {
    num: "04",
    title: "Closing & Beyond",
    desc: "We guide you through every closing step and stay available long after — because our relationship doesn't end at the closing table.",
  },
];

/* Shared Tailwind patterns */
const eyebrow = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem]";
const sectionSubtext = "text-[0.9375rem] text-hh-text/[0.55] max-w-[500px] leading-[1.7] m-0";
const serviceTagline = "inline-block text-[0.625rem] font-bold tracking-[0.16em] uppercase text-hh-gold/[0.80] bg-[rgba(212,175,95,0.10)] border border-[rgba(212,175,95,0.22)] rounded-full px-[0.875rem] py-[0.3rem] mb-[1.125rem]";
const sectionInner = "max-w-[1200px] mx-auto px-8 max-[700px]:px-5";

export default function ServicesPageContent() {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const serviceRowsRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
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
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      /* Service rows slide in */
      serviceRowsRef.current.forEach((row, i) => {
        if (!row) return;
        const isReverse = i % 2 !== 0;
        gsap.fromTo(
          row,
          { opacity: 0, x: isReverse ? 40 : -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
            },
          }
        );
      });

      /* Stats count-up feel */
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll("[data-stat-num]"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      /* Why cards stagger */
      if (whyRef.current) {
        gsap.fromTo(
          whyRef.current.querySelectorAll("[data-why-card]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: whyRef.current,
              start: "top 80%",
            },
          }
        );
      }

      /* Process cards stagger */
      if (processRef.current) {
        gsap.fromTo(
          processRef.current.querySelectorAll("[data-process-card]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 80%",
            },
          }
        );
      }

      /* CTA entrance */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 82%",
            },
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
        {/* Parallax background */}
        <div
          ref={bgRef}
          className="absolute left-0 right-0 bg-cover"
          style={{
            top: -120,
            height: "calc(100% + 240px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundPosition: "center 30%",
            filter: "brightness(0.72) saturate(0.75) contrast(0.95)",
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)",
          }}
        />

        <div
          ref={heroContentRef}
          className="relative z-[2] max-w-[1200px] mx-auto px-8 pt-[140px] pb-24 w-full max-[700px]:px-5 max-[700px]:pt-[120px] max-[700px]:pb-16"
        >
          <p className={eyebrow}>Hawaii Home Properties LLC</p>
          <h1
            className="font-bold text-white mb-5 leading-[1.12] tracking-[-0.02em] max-w-[700px] mt-0"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
          >
            Comprehensive Real Estate Services with Aloha Spirit
          </h1>
          <p
            className="text-white/[0.82] leading-[1.7] max-w-[560px] mb-10 mt-0"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.1875rem)" }}
          >
            From finding your dream home to managing your investment portfolio —
            we deliver expert real estate guidance across every corner of Hawaii,
            with the warmth and integrity of true aloha.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="hh-btn-primary">
              Get a Free Consultation
            </Link>
            <button className="hh-btn-outline-light">Explore Our Services</button>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <div
        ref={statsRef}
        className="bg-[rgba(212,175,95,0.06)] border-t border-b border-[rgba(212,175,95,0.14)] py-14"
      >
        <div className={`${sectionInner} grid grid-cols-2 min-[900px]:grid-cols-4 gap-8 text-center`}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                data-stat-num=""
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

      {/* ===== SERVICE DETAILS ===== */}
      <section className="py-24 bg-hh-warm-bg">
        <div className={sectionInner}>
          <p className={eyebrow}>What We Offer</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Everything You Need, Under One Roof
          </h2>
          <p className={sectionSubtext}>
            Our full-service brokerage covers every aspect of Hawaii real estate
            — whether you are a first-time buyer, seasoned investor, or property
            owner looking for professional management.
          </p>

          {serviceDetails.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) serviceRowsRef.current[i] = el;
              }}
              className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-16 items-center py-[4.5rem] border-b border-[rgba(212,175,95,0.12)] last:border-b-0 max-[700px]:gap-8 max-[700px]:py-12"
              style={{ direction: service.reverse ? "rtl" : "ltr" }}
            >
              {/* Image */}
              <div
                className="hh-img-placeholder rounded-[20px] overflow-hidden aspect-[4/3] relative"
                style={{ background: service.imageBg, direction: "ltr" }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-[rgba(180,145,65,0.45)]">
                  <service.Icon size={72} />
                </div>
                <span className="hh-img-placeholder-label">
                  Image Placeholder
                </span>
              </div>

              {/* Content */}
              <div style={{ direction: "ltr" }}>
                <span className={serviceTagline}>{service.tagline}</span>
                <h3
                  className="font-bold text-hh-text m-0 mb-4 leading-[1.2] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)" }}
                >
                  {service.title}
                </h3>
                <p className="text-[0.9375rem] text-hh-text/[0.65] leading-[1.75] m-0 mb-6">
                  {service.description}
                </p>
                <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-[0.625rem]">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-[0.625rem] text-sm text-hh-text/[0.72] leading-[1.5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[rgba(212,175,95,0.70)] flex-shrink-0 mt-[0.45rem]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="hh-btn-primary">
                  {service.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section ref={whyRef} className="py-24 bg-[rgba(212,175,95,0.03)]">
        <div className={sectionInner}>
          <p className={eyebrow}>Why Choose Us</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            The Hawaii Home Difference
          </h2>
          <p className={sectionSubtext}>
            What sets us apart isn't just our track record — it's the way we
            treat every client, every time.
          </p>
          <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[900px]:grid-cols-3 gap-6 mt-12">
            {whyUs.map((item) => (
              <div
                key={item.title}
                data-why-card=""
                className="bg-white/[0.68] border border-[rgba(212,175,95,0.16)] rounded-[18px] p-8"
              >
                <div className="w-12 h-12 bg-[rgba(212,175,95,0.14)] border border-[rgba(212,175,95,0.24)] rounded-[13px] flex items-center justify-center text-hh-gold mb-5">
                  <item.Icon size={22} />
                </div>
                <h3 className="text-base font-semibold text-hh-text m-0 mb-[0.625rem]">{item.title}</h3>
                <p className="text-sm text-hh-text/[0.52] leading-[1.65] m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section ref={processRef} className="py-24 bg-hh-warm-bg">
        <div className={sectionInner}>
          <p className={eyebrow}>Our Process</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            How It Works
          </h2>
          <p className={sectionSubtext}>
            A clear, proven process designed to make your real estate journey
            smooth, confident, and stress-free.
          </p>
          <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[900px]:grid-cols-4 gap-6 mt-12">
            {processSteps.map((step) => (
              <div
                key={step.num}
                data-process-card=""
                className="relative p-8 px-6 bg-white/[0.58] border border-[rgba(212,175,95,0.14)] rounded-[18px]"
              >
                <div className="text-[2.5rem] font-bold text-[rgba(212,175,95,0.15)] leading-none mb-4 tracking-[-0.03em]">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-hh-text m-0 mb-[0.625rem]">{step.title}</h3>
                <p className="text-sm text-hh-text/[0.52] leading-[1.65] m-0">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-28 text-center bg-hh-warm-dark max-[480px]:py-16">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,95,0.18) 0%, transparent 70%)",
          }}
        />
        <div ref={ctaRef} className="relative z-[2] max-w-[640px] mx-auto px-8">
          <p className={`${eyebrow} text-center`}>
            Ready to Get Started?
          </p>
          <h2
            className="font-bold text-hh-text mb-[1.125rem] mt-0 tracking-[-0.02em] leading-[1.15]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Let's Find Your Perfect Property in Hawaii
          </h2>
          <p className="text-base text-hh-text/[0.62] leading-[1.7] mb-10 mt-0">
            Schedule a free, no-obligation consultation with one of our local
            experts and take the first step toward your real estate goals.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/contact" className="hh-btn-primary">
              Book a Free Consultation
            </Link>
            <button className="hh-btn-outline">Call Us Today</button>
          </div>
        </div>
      </section>
    </div>
  );
}
