"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

/* =====================================================
   Icons
   ===================================================== */
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.97-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* =====================================================
   FAQ data
   ===================================================== */
const faqs = [
  {
    q: "How quickly can I expect a response?",
    a: "We respond to all inquiries within 2 business hours during office hours. For urgent matters, please call us directly at (808) 555-0100.",
  },
  {
    q: "Is the initial consultation really free?",
    a: "Yes, completely free and no obligation. We take the time to understand your goals before making any recommendations.",
  },
  {
    q: "Do you work with clients on all Hawaiian islands?",
    a: "Yes. We have licensed agents and local partners on Oahu, Maui, Kauai, and the Big Island. Tell us your target island and we'll connect you with the right expert.",
  },
  {
    q: "Can you help with both buying and selling at the same time?",
    a: "Absolutely. Many of our clients are simultaneously selling their current home and purchasing a new one. We coordinate both transactions to minimize stress and optimize timing.",
  },
  {
    q: "What types of properties do you specialize in?",
    a: "Residential homes, condos, vacation rentals, multi-family properties, and investment portfolios. We handle everything from starter condos to luxury beachfront estates.",
  },
  {
    q: "Do you offer property management services?",
    a: "Yes. Our full-service property management division handles tenant screening, maintenance, rent collection, and monthly reporting. Contact us for a management proposal.",
  },
];

const subjects = [
  "Select a Subject",
  "Buying a Home",
  "Selling a Property",
  "Property Management",
  "Investment Guidance",
  "General Inquiry",
  "Other",
];

/* Shared Tailwind patterns */
const eyebrow = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem]";
const sectionSubtext = "text-[0.9375rem] text-hh-text/[0.55] max-w-[500px] leading-[1.7] m-0";
const sectionInner = "max-w-[1200px] mx-auto px-8 max-[700px]:px-5";
const infoIcon = "w-11 h-11 bg-[rgba(212,175,95,0.14)] border border-[rgba(212,175,95,0.24)] rounded-xl flex items-center justify-center text-hh-gold flex-shrink-0";
const infoCard = "bg-white/[0.68] border border-[rgba(212,175,95,0.16)] rounded-[18px] px-7 py-6 flex gap-[1.125rem] items-start max-[700px]:p-5";

export default function ContactPageContent() {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });

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
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, delay: 0.3, ease: "power3.out" }
        );
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: formRef.current, start: "top 82%" } }
        );
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.65, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: infoRef.current, start: "top 82%" } }
        );
      }
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelectorAll("[data-faq-item]"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: "power2.out", scrollTrigger: { trigger: faqRef.current, start: "top 80%" } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-hh-warm-bg text-hh-text min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "50vh" }}>
        <div
          ref={bgRef}
          className="absolute left-0 right-0 bg-cover"
          style={{
            top: -80,
            height: "calc(100% + 160px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundPosition: "center 70%",
            filter: "brightness(0.58) saturate(0.68) contrast(0.95)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)" }}
        />
        <div
          ref={heroContentRef}
          className="relative z-[2] max-w-[1200px] mx-auto px-8 pt-[140px] pb-16 w-full max-[700px]:px-5 max-[700px]:pt-[120px]"
        >
          <p className={eyebrow}>Contact Us</p>
          <h1
            className="font-bold text-white mb-[1.125rem] leading-[1.1] tracking-[-0.02em] max-w-[580px] mt-0"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let's Start a Conversation
          </h1>
          <p
            className="text-white/[0.82] leading-[1.72] max-w-[480px] m-0"
            style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1.125rem)" }}
          >
            Whether you have a question, need a property valuation, or are ready
            to start your Hawaii real estate journey — we are here and ready to help.
          </p>
        </div>
      </section>

      {/* ===== FORM + INFO ===== */}
      <section className="py-24 bg-hh-warm-bg">
        <div className={sectionInner}>
          <div className="grid grid-cols-1 min-[1024px]:grid-cols-[1fr_420px] gap-16 min-[1024px]:gap-16 items-start max-[1024px]:gap-10">

            {/* ---- FORM ---- */}
            <div ref={formRef} className="bg-white/[0.68] border border-[rgba(212,175,95,0.18)] rounded-[24px] px-11 py-10 max-[700px]:px-5 max-[700px]:py-6">
              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center text-center px-4 py-12 gap-5">
                  <div className="w-16 h-16 bg-[rgba(212,175,95,0.15)] border border-[rgba(212,175,95,0.30)] rounded-full flex items-center justify-center text-hh-gold">
                    <CheckIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-hh-text m-0">Message Sent!</h2>
                  <p className="text-[0.9375rem] text-hh-text/[0.58] leading-[1.7] m-0 max-w-[380px]">
                    Thank you for reaching out. One of our team members will get
                    back to you within 2 business hours.
                  </p>
                  <button
                    className="hh-btn-outline mt-2"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ firstName: "", lastName: "", email: "", phone: "", subject: subjects[0], message: "" });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-[1.375rem] font-bold text-hh-text m-0 mb-1.5">Send Us a Message</h2>
                    <p className="text-sm text-hh-text/50 m-0">Free consultation — no obligation, no pressure.</p>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8125rem] font-medium text-hh-gold/[0.75] tracking-[0.01em]">First Name</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Kalani"
                        className="hh-contact-input"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8125rem] font-medium text-hh-gold/[0.75] tracking-[0.01em]">Last Name</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Akana"
                        className="hh-contact-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 min-[700px]:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8125rem] font-medium text-hh-gold/[0.75] tracking-[0.01em]">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="hh-contact-input"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8125rem] font-medium text-hh-gold/[0.75] tracking-[0.01em]">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(808) 555-0000"
                        className="hh-contact-input"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-medium text-hh-gold/[0.75] tracking-[0.01em]">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="hh-contact-select"
                      required
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s} disabled={s === subjects[0]}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-medium text-hh-gold/[0.75] tracking-[0.01em]">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your real estate goals, timeline, and any questions you have..."
                      className="hh-contact-textarea"
                      required
                    />
                  </div>

                  <button type="submit" className="hh-btn-primary" style={{ gap: "0.5rem" }}>
                    <SendIcon />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* ---- INFO SIDEBAR ---- */}
            <div ref={infoRef} className="flex flex-col gap-5">
              <div className={infoCard}>
                <div className={infoIcon}><PhoneIcon /></div>
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-hh-text/[0.42] m-0 mb-[0.3rem]">Phone</p>
                  <p className="text-[0.9375rem] font-medium text-hh-text m-0 mb-0.5">(808) 555-0100</p>
                  <p className="text-[0.8125rem] text-hh-text/[0.45] m-0">Mon–Sat, 8am–6pm HST</p>
                </div>
              </div>

              <div className={infoCard}>
                <div className={infoIcon}><MailIcon /></div>
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-hh-text/[0.42] m-0 mb-[0.3rem]">Email</p>
                  <p className="text-[0.9375rem] font-medium text-hh-text m-0 mb-0.5">hello@hawaiihomeproperties.com</p>
                  <p className="text-[0.8125rem] text-hh-text/[0.45] m-0">We reply within 2 business hours</p>
                </div>
              </div>

              <div className={infoCard}>
                <div className={infoIcon}><MapPinIcon /></div>
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-hh-text/[0.42] m-0 mb-[0.3rem]">Office</p>
                  <p className="text-[0.9375rem] font-medium text-hh-text m-0 mb-0.5">1234 Kalakaua Ave, Suite 500</p>
                  <p className="text-[0.8125rem] text-hh-text/[0.45] m-0">Honolulu, Hawaii 96815</p>
                </div>
              </div>

              <div className={infoCard}>
                <div className={infoIcon}><ClockIcon /></div>
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-[0.12em] uppercase text-hh-text/[0.42] m-0 mb-[0.3rem]">Office Hours</p>
                  <p className="text-[0.9375rem] font-medium text-hh-text m-0 mb-0.5">Mon – Fri: 8:00am – 6:00pm</p>
                  <p className="text-[0.8125rem] text-hh-text/[0.45] m-0">Sat: 9:00am – 4:00pm · Sun: By appointment</p>
                </div>
              </div>

              {/* OpenStreetMap — Kalakaua Ave, Honolulu */}
              <div className="hh-contact-map">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-157.8342%2C21.2665%2C-157.8142%2C21.2865&layer=mapnik&marker=21.2765%2C-157.8242"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  title="Hawaii Home Properties LLC — 1234 Kalakaua Ave, Honolulu"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section ref={faqRef} className="py-24 bg-[rgba(212,175,95,0.06)]">
        <div className={sectionInner}>
          <p className={eyebrow}>FAQ</p>
          <h2
            className="font-bold text-hh-text mb-2 mt-0 tracking-[-0.015em] leading-[1.2]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Frequently Asked Questions
          </h2>
          <p className={sectionSubtext}>
            Quick answers to the questions we hear most often.
          </p>
          <div className="flex flex-col gap-4 mt-12">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                data-faq-item=""
                className="bg-white/[0.58] border border-[rgba(212,175,95,0.14)] rounded-2xl px-7 py-6 max-[700px]:p-5"
              >
                <h3 className="text-[0.9375rem] font-semibold text-hh-text m-0 mb-[0.625rem]">{faq.q}</h3>
                <p className="text-sm text-hh-text/[0.52] leading-[1.68] m-0">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-28 text-center bg-hh-warm-dark max-[480px]:py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,95,0.18) 0%, transparent 70%)" }}
        />
        <div className="relative z-[2] max-w-[640px] mx-auto px-8">
          <p className={`${eyebrow} text-center`}>We'd Love to Hear from You</p>
          <h2
            className="font-bold text-hh-text mb-[1.125rem] mt-0 tracking-[-0.02em] leading-[1.15]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Your Dream Property in Hawaii Starts with a Conversation
          </h2>
          <p className="text-base text-hh-text/[0.62] leading-[1.7] mb-10 mt-0">
            No pressure, no commitment. Just an honest conversation about your
            goals and how we can help you achieve them.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="tel:+18085550100" className="hh-btn-primary">
              Call (808) 555-0100
            </Link>
            <Link href="/services" className="hh-btn-outline">Explore Services</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
