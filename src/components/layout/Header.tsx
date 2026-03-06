"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* Slide in from top on mount */
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power3.out" }
    );
  }, []);

  /* Animate mobile menu open */
  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header ref={headerRef} className="hh-header">
      <div className="hh-header-inner">
        {/* Logo */}
        <Link href="/" className="hh-logo">
          <div className="hh-logo-mark">HH</div>
          <div>
            <span className="hh-logo-name">Hawaii Home</span>
            <span className="hh-logo-sub">Properties LLC</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hh-header-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hh-header-nav-link${pathname === link.href ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div className="hh-header-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hh-header-social-link" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hh-header-social-link" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>

        {/* Desktop CTA */}
        <Link href="/contact" className="hh-btn-primary hh-header-cta">
          Get Started
        </Link>

        {/* Hamburger */}
        <button
          className="hh-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            style={{
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "translateX(-8px)" : "none",
            }}
          />
          <span
            style={{
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div ref={mobileMenuRef} className="hh-mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hh-mobile-nav-link${pathname === link.href ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="hh-btn-primary"
            style={{ marginTop: "0.75rem", justifyContent: "center" }}
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
          <div className="hh-mobile-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hh-header-social-link" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hh-header-social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
