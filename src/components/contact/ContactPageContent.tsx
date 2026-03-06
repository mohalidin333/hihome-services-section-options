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
          faqRef.current.querySelectorAll(".hh-contact-faq-item"),
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
    <div className="hh-sp-page">

      {/* ===== HERO ===== */}
      <section className="hh-sp-hero" style={{ minHeight: "50vh" }}>
        <div
          ref={bgRef}
          style={{
            position: "absolute", left: 0, right: 0, top: -80,
            height: "calc(100% + 160px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 70%",
            filter: "brightness(0.58) saturate(0.68) contrast(0.95)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)" }} />
        <div ref={heroContentRef} className="hh-sp-hero-content" style={{ padding: "140px 2rem 4rem" }}>
          <p className="hh-sp-eyebrow">Contact Us</p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700, color: "#FFFFFF",
              margin: "0 0 1.125rem", lineHeight: 1.1,
              letterSpacing: "-0.02em", maxWidth: 580,
            }}
          >
            Let's Start a Conversation
          </h1>
          <p style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1.125rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.72, maxWidth: 480, margin: 0 }}>
            Whether you have a question, need a property valuation, or are ready
            to start your Hawaii real estate journey — we are here and ready to help.
          </p>
        </div>
      </section>

      {/* ===== FORM + INFO ===== */}
      <section className="hh-sp-section" style={{ background: "#FAF8F2" }}>
        <div className="hh-sp-section-inner">
          <div className="hh-contact-layout">

            {/* ---- FORM ---- */}
            <div ref={formRef} className="hh-contact-form-wrap">
              {submitted ? (
                /* Success state */
                <div
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    textAlign: "center", padding: "3rem 1rem", gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: 64, height: 64,
                      background: "rgba(212,175,95,0.15)",
                      border: "1px solid rgba(212,175,95,0.30)",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#C8A84B",
                    }}
                  >
                    <CheckIcon />
                  </div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1E1408", margin: 0 }}>
                    Message Sent!
                  </h2>
                  <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.58)", lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
                    Thank you for reaching out. One of our team members will get
                    back to you within 2 business hours.
                  </p>
                  <button
                    className="hh-btn-outline"
                    style={{ marginTop: "0.5rem" }}
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ firstName: "", lastName: "", email: "", phone: "", subject: subjects[0], message: "" });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#1E1408", margin: "0 0 0.375rem" }}>
                      Send Us a Message
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "rgba(30,20,8,0.50)", margin: 0 }}>
                      Free consultation — no obligation, no pressure.
                    </p>
                  </div>

                  {/* Name row */}
                  <div className="hh-contact-field-group">
                    <div className="hh-contact-field">
                      <label className="hh-contact-label">First Name</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Kalani"
                        className="hh-contact-input"
                        required
                      />
                    </div>
                    <div className="hh-contact-field">
                      <label className="hh-contact-label">Last Name</label>
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
                  <div className="hh-contact-field-group">
                    <div className="hh-contact-field">
                      <label className="hh-contact-label">Email Address</label>
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
                    <div className="hh-contact-field">
                      <label className="hh-contact-label">Phone Number</label>
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
                  <div className="hh-contact-field">
                    <label className="hh-contact-label">Subject</label>
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
                  <div className="hh-contact-field">
                    <label className="hh-contact-label">Message</label>
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
            <div ref={infoRef} className="hh-contact-info-stack">
              <div className="hh-contact-info-card">
                <div className="hh-contact-info-icon"><PhoneIcon /></div>
                <div>
                  <p className="hh-contact-info-label">Phone</p>
                  <p className="hh-contact-info-value">(808) 555-0100</p>
                  <p className="hh-contact-info-sub">Mon–Sat, 8am–6pm HST</p>
                </div>
              </div>

              <div className="hh-contact-info-card">
                <div className="hh-contact-info-icon"><MailIcon /></div>
                <div>
                  <p className="hh-contact-info-label">Email</p>
                  <p className="hh-contact-info-value">hello@hawaiihomeproperties.com</p>
                  <p className="hh-contact-info-sub">We reply within 2 business hours</p>
                </div>
              </div>

              <div className="hh-contact-info-card">
                <div className="hh-contact-info-icon"><MapPinIcon /></div>
                <div>
                  <p className="hh-contact-info-label">Office</p>
                  <p className="hh-contact-info-value">1234 Kalakaua Ave, Suite 500</p>
                  <p className="hh-contact-info-sub">Honolulu, Hawaii 96815</p>
                </div>
              </div>

              <div className="hh-contact-info-card">
                <div className="hh-contact-info-icon"><ClockIcon /></div>
                <div>
                  <p className="hh-contact-info-label">Office Hours</p>
                  <p className="hh-contact-info-value">Mon – Fri: 8:00am – 6:00pm</p>
                  <p className="hh-contact-info-sub">Sat: 9:00am – 4:00pm · Sun: By appointment</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="hh-contact-map hh-img-placeholder">
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(30,20,8,0.35)", zIndex: 2, position: "relative" }}>
                  Map Placeholder
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section ref={faqRef} className="hh-sp-section" style={{ background: "rgba(212,175,95,0.06)" }}>
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow">FAQ</p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700, color: "#1E1408",
              margin: "0 0 0.5rem", letterSpacing: "-0.015em",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.55)", maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
            Quick answers to the questions we hear most often.
          </p>
          <div className="hh-contact-faq-list">
            {faqs.map((faq) => (
              <div key={faq.q} className="hh-contact-faq-item">
                <h3 className="hh-contact-faq-q">{faq.q}</h3>
                <p className="hh-contact-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hh-sp-cta" style={{ background: "#F0EAD8" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,95,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="hh-sp-cta-inner">
          <p className="hh-sp-eyebrow" style={{ textAlign: "center" }}>We'd Love to Hear from You</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "#1E1408", margin: "0 0 1.125rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Your Dream Property in Hawaii Starts with a Conversation
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(30,20,8,0.62)", lineHeight: 1.7, margin: "0 0 2.5rem" }}>
            No pressure, no commitment. Just an honest conversation about your
            goals and how we can help you achieve them.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
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
