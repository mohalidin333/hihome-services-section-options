"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

/* =====================================================
   Icons
   ===================================================== */
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* =====================================================
   Data
   ===================================================== */
type Category = "All" | "Market Updates" | "Buying Tips" | "Selling Tips" | "Investment" | "Local Living";

interface Post {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  imageBg: string;
  featured?: boolean;
  editorPick?: boolean;
}

const posts: Post[] = [
  {
    id: "hawaii-market-2024",
    category: "Market Updates",
    title: "Hawaii Real Estate Market Report: What Buyers and Sellers Need to Know in 2024",
    excerpt:
      "Honolulu home prices held firm through Q4 while inventory ticked upward for the first time in three years. Here is what the data means for your next move.",
    author: "Kalani Akana",
    authorInitials: "KA",
    date: "Dec 18, 2024",
    readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 55%, #CFC499 100%)",
    featured: true,
  },
  {
    id: "first-time-buyer-guide",
    category: "Buying Tips",
    title: "The Complete First-Time Homebuyer Guide for Hawaii",
    excerpt:
      "From pre-approval to closing day — everything you need to know before buying your first home in the Aloha State, including Hawaii-specific requirements.",
    author: "Leilani Moku",
    authorInitials: "LM",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 55%, #CCC09A 100%)",
    editorPick: true,
  },
  {
    id: "vacation-rental-investment",
    category: "Investment",
    title: "Is a Hawaii Vacation Rental Still a Good Investment in 2024?",
    excerpt:
      "New short-term rental regulations, Airbnb demand trends, and ROI projections — what every investor needs to consider before purchasing.",
    author: "Keanu Hale",
    authorInitials: "KH",
    date: "Nov 20, 2024",
    readTime: "9 min read",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 55%, #D4C4A0 100%)",
    editorPick: true,
  },
  {
    id: "oahu-neighborhoods",
    category: "Local Living",
    title: "Best Neighborhoods in Oahu for Families, Young Professionals, and Retirees",
    excerpt:
      "Kailua, Manoa, Kahala, or Ko Olina? We break down lifestyle, schools, commute, and price points across Oahu's most sought-after communities.",
    author: "Leilani Moku",
    authorInitials: "LM",
    date: "Dec 4, 2024",
    readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 55%, #CDBE98 100%)",
  },
  {
    id: "sell-above-asking",
    category: "Selling Tips",
    title: "5 Proven Strategies to Sell Your Hawaii Home Above Asking Price",
    excerpt:
      "Strategic pricing, professional staging, and timing your listing right can mean tens of thousands more at closing.",
    author: "Kalani Akana",
    authorInitials: "KA",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 100%)",
  },
  {
    id: "moving-to-hawaii",
    category: "Local Living",
    title: "Moving to Hawaii? 12 Things No One Tells You Before You Relocate",
    excerpt:
      "Island fever, shipping costs, the cost of groceries, and why mainland habits don't always translate — honest advice for anyone planning the move.",
    author: "Maile Reyes",
    authorInitials: "MR",
    date: "Nov 12, 2024",
    readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 100%)",
  },
  {
    id: "property-management-tips",
    category: "Investment",
    title: "How to Maximize ROI on Your Hawaii Investment Property",
    excerpt:
      "Smart maintenance schedules, tenant retention strategies, and the rental pricing formula our property managers use to keep vacancy near zero.",
    author: "Maile Reyes",
    authorInitials: "MR",
    date: "Nov 5, 2024",
    readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 100%)",
  },
  {
    id: "home-inspection-checklist",
    category: "Buying Tips",
    title: "The Hawaii Home Inspection Checklist Every Buyer Should Use",
    excerpt:
      "From termite damage to lava zone classifications — the unique inspection items that matter most when buying property in Hawaii.",
    author: "Leilani Moku",
    authorInitials: "LM",
    date: "Oct 28, 2024",
    readTime: "6 min read",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 100%)",
  },
  {
    id: "staging-for-sale",
    category: "Selling Tips",
    title: "Home Staging on a Budget: Prepare Your Hawaii Property for Sale",
    excerpt:
      "You don't need a full renovation to impress buyers. These low-cost staging moves have helped our sellers achieve faster sales and higher offers.",
    author: "Kalani Akana",
    authorInitials: "KA",
    date: "Oct 18, 2024",
    readTime: "5 min read",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 55%, #CFC499 100%)",
  },
  {
    id: "1031-exchange-hawaii",
    category: "Investment",
    title: "Using a 1031 Exchange to Grow Your Hawaii Real Estate Portfolio",
    excerpt:
      "A properly executed 1031 exchange can defer capital gains taxes and accelerate your portfolio growth. Here's how Hawaii investors are using it.",
    author: "Keanu Hale",
    authorInitials: "KH",
    date: "Oct 8, 2024",
    readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 55%, #CCC09A 100%)",
  },
  {
    id: "market-timing",
    category: "Market Updates",
    title: "Is Now the Right Time to Buy in Hawaii? What the Data Shows",
    excerpt:
      "Interest rates, inventory levels, and buyer demand paint a nuanced picture. Our analysts break down the numbers so you can make an informed decision.",
    author: "Kalani Akana",
    authorInitials: "KA",
    date: "Sep 25, 2024",
    readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 55%, #D4C4A0 100%)",
  },
  {
    id: "maui-buying-guide",
    category: "Buying Tips",
    title: "Buying Property on Maui: Everything You Need to Know",
    excerpt:
      "From the Valley Isle's unique zoning rules to the best neighborhoods for long-term value — a comprehensive guide for Maui home buyers.",
    author: "Leilani Moku",
    authorInitials: "LM",
    date: "Sep 10, 2024",
    readTime: "9 min read",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 55%, #CDBE98 100%)",
  },
];

const categories: Category[] = ["All", "Market Updates", "Buying Tips", "Selling Tips", "Investment", "Local Living"];

const INITIAL_VISIBLE = 6;

export default function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const editorPicksRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const featured = posts.find((p) => p.featured)!;
  const editorPicks = posts.filter((p) => p.editorPick);
  const gridPosts = posts.filter(
    (p) => !p.featured && !p.editorPick &&
      (activeCategory === "All" || p.category === activeCategory)
  );
  // When filtering, include editorPicks too if they match the category
  const allFilteredPosts = activeCategory === "All"
    ? posts.filter((p) => !p.featured && !p.editorPick)
    : posts.filter((p) => !p.featured && p.category === activeCategory);

  const visiblePosts = allFilteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredPosts.length;

  // Category post counts
  const countFor = (cat: Category) =>
    cat === "All"
      ? posts.filter((p) => !p.featured).length
      : posts.filter((p) => !p.featured && p.category === cat).length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -100, ease: "none",
          scrollTrigger: { trigger: bgRef.current.parentElement, start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current.children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, delay: 0.3, ease: "power3.out" }
        );
      }
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current, { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: featuredRef.current, start: "top 84%" } }
        );
      }
      if (editorPicksRef.current) {
        gsap.fromTo(editorPicksRef.current.querySelectorAll(".hh-blog-ep-card"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.14, ease: "power2.out", scrollTrigger: { trigger: editorPicksRef.current, start: "top 82%" } }
        );
      }
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.querySelectorAll(".hh-blog-card"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 82%" } }
        );
      }
      if (newsletterRef.current) {
        gsap.fromTo(newsletterRef.current, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: newsletterRef.current, start: "top 84%" } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  function handleCategoryChange(cat: Category) {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE);
    // Re-animate grid
    setTimeout(() => {
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.querySelectorAll(".hh-blog-card"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" }
        );
      }
    }, 10);
  }

  return (
    <div className="hh-sp-page">

      {/* ===== HERO ===== */}
      <section className="hh-sp-hero" style={{ minHeight: "54vh" }}>
        <div
          ref={bgRef}
          style={{
            position: "absolute", left: 0, right: 0, top: -80,
            height: "calc(100% + 160px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundSize: "cover", backgroundPosition: "center 55%",
            filter: "brightness(0.58) saturate(0.68) contrast(0.95)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)" }} />
        <div ref={heroContentRef} className="hh-sp-hero-content" style={{ padding: "140px 2rem 5rem" }}>
          <p className="hh-sp-eyebrow">Hawaii Home Blog</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.125rem", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 640 }}>
            Insights, Tips & Stories from Hawaii Real Estate
          </h1>
          <p style={{ fontSize: "clamp(0.9375rem, 1.6vw, 1.125rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.72, maxWidth: 520, margin: "0 0 2rem" }}>
            Expert market analysis, buying and selling guides, investment strategies, and local living advice — straight from our team of Hawaii real estate professionals.
          </p>
          {/* Category pills in hero */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.filter((c) => c !== "All").map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  handleCategoryChange(cat);
                  document.getElementById("blog-articles")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "0.3rem 0.875rem",
                  fontSize: "0.75rem", fontWeight: 500, fontFamily: "inherit",
                  color: "rgba(255,255,255,0.82)",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 20, cursor: "pointer", transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,168,75,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "#C8A84B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.82)"; }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="hh-sp-section" style={{ background: "#FAF8F2", paddingBottom: 0 }}>
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow">Featured Article</p>
          <div ref={featuredRef} className="hh-blog-featured">
            {/* Image */}
            <div className="hh-blog-featured-img hh-img-placeholder" style={{ background: featured.imageBg }}>
              <span className="hh-img-placeholder-label">Featured Image</span>
            </div>
            {/* Content */}
            <div className="hh-blog-featured-body">
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
                <span className="hh-blog-category">{featured.category}</span>
                <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,175,95,0.65)", background: "rgba(212,175,95,0.10)", border: "1px solid rgba(212,175,95,0.18)", borderRadius: 20, padding: "0.25rem 0.625rem" }}>
                  Editor's Pick
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", fontWeight: 700, color: "#1E1408", margin: "0 0 1rem", lineHeight: 1.32 }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "rgba(30,20,8,0.58)", lineHeight: 1.75, margin: "0 0 2rem" }}>
                {featured.excerpt}
              </p>
              {/* Author row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(212,175,95,0.14)", border: "1px solid rgba(212,175,95,0.24)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6875rem", fontWeight: 700, color: "#C8A84B", flexShrink: 0 }}>
                  {featured.authorInitials}
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(30,20,8,0.82)", margin: 0, lineHeight: 1.2 }}>{featured.author}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(30,20,8,0.40)" }}>{featured.date}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(212,175,95,0.30)" }} />
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", color: "rgba(30,20,8,0.40)" }}>
                      <ClockIcon />{featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
              <button className="hh-btn-primary" style={{ gap: "0.5rem" }}>
                Read Full Article <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDITOR'S PICKS ===== */}
      <section className="hh-sp-section" style={{ background: "#FAF8F2", paddingTop: "3rem" }}>
        <div className="hh-sp-section-inner">
          <p className="hh-sp-eyebrow" style={{ marginBottom: "1.5rem" }}>Editor's Picks</p>
          <div ref={editorPicksRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {editorPicks.map((post) => (
              <div
                key={post.id}
                className="hh-blog-ep-card"
                style={{
                  display: "grid", gridTemplateColumns: "200px 1fr", gap: 0,
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(212,175,95,0.28)",
                  borderRadius: 18, overflow: "hidden",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(180,148,70,0.18)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                <div className="hh-img-placeholder" style={{ background: post.imageBg, minHeight: 160 }}>
                  <span className="hh-img-placeholder-label">Post Image</span>
                </div>
                <div style={{ padding: "1.375rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span className="hh-blog-category" style={{ marginBottom: "0.625rem" }}>{post.category}</span>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#1E1408", margin: "0 0 0.5rem", lineHeight: 1.4 }}>{post.title}</h3>
                    <p style={{ fontSize: "0.8125rem", color: "rgba(30,20,8,0.52)", lineHeight: 1.6, margin: "0 0 1rem" }}>{post.excerpt}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "rgba(30,20,8,0.40)" }}>
                      <ClockIcon />{post.readTime}
                    </div>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", fontWeight: 600, color: "#C8A84B" }}>
                      Read <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GRID + FILTERS ===== */}
      <section id="blog-articles" className="hh-sp-section" style={{ background: "#FAF8F2", paddingTop: "2rem" }}>
        <div className="hh-sp-section-inner">

          {/* Section header + filters */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <p className="hh-sp-eyebrow">All Articles</p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1E1408", margin: 0, letterSpacing: "-0.015em" }}>
                Browse by Topic
              </h2>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "rgba(30,20,8,0.38)", margin: 0 }}>
              {allFilteredPosts.length} article{allFilteredPosts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Filter pills */}
          <div className="hh-blog-filters" style={{ marginTop: 0, marginBottom: "2.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`hh-blog-filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
                <span style={{
                  marginLeft: "0.375rem", fontSize: "0.6875rem", fontWeight: 600,
                  opacity: activeCategory === cat ? 0.6 : 0.4,
                }}>
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div ref={gridRef} className="hh-blog-grid">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <article key={post.id} className="hh-blog-card">
                  {/* Image */}
                  <div className="hh-blog-card-img hh-img-placeholder" style={{ background: post.imageBg }}>
                    <span className="hh-img-placeholder-label">Post Image</span>
                  </div>
                  {/* Body */}
                  <div className="hh-blog-card-body">
                    <span className="hh-blog-category">{post.category}</span>
                    <h3 className="hh-blog-card-title">{post.title}</h3>
                    <p className="hh-blog-card-excerpt">{post.excerpt}</p>
                    {/* Author + meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.125rem" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(212,175,95,0.14)", border: "1px solid rgba(212,175,95,0.24)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5625rem", fontWeight: 700, color: "#C8A84B", flexShrink: 0 }}>
                        {post.authorInitials}
                      </div>
                      <div className="hh-blog-card-meta">
                        <span style={{ color: "rgba(212,175,95,0.60)" }}>{post.author}</span>
                        <span className="hh-blog-card-meta-dot" />
                        <span>{post.date}</span>
                        <span className="hh-blog-card-meta-dot" />
                        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <ClockIcon />{post.readTime}
                        </span>
                      </div>
                    </div>
                    {/* CTA */}
                    <div style={{ borderTop: "1px solid rgba(212,175,95,0.10)", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#C8A84B", display: "flex", alignItems: "center", gap: "0.375rem", cursor: "pointer", transition: "color 0.18s" }}>
                        Read Article <ArrowRightIcon />
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "5rem 0" }}>
                <p style={{ color: "rgba(30,20,8,0.38)", fontSize: "0.9375rem", margin: 0 }}>
                  No articles in this category yet — check back soon.
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <button
                className="hh-btn-outline"
                onClick={() => setVisibleCount((v) => v + 3)}
                style={{ padding: "0.75rem 2.5rem" }}
              >
                Load More Articles
              </button>
            </div>
          )}

          {/* Newsletter */}
          <div ref={newsletterRef} className="hh-newsletter">
            <div style={{ flex: 1 }}>
              <p className="hh-sp-eyebrow" style={{ margin: "0 0 0.5rem" }}>Stay in the Know</p>
              <h3 style={{ fontSize: "clamp(1.125rem, 2.2vw, 1.5rem)", fontWeight: 700, color: "#1E1408", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>
                Get Hawaii Real Estate Insights in Your Inbox
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(30,20,8,0.50)", margin: 0, lineHeight: 1.65 }}>
                Market updates, new listings, and expert tips — delivered monthly. No spam, unsubscribe anytime.
              </p>
            </div>
            <div className="hh-newsletter-form">
              <input type="email" placeholder="Your email address" className="hh-newsletter-input" />
              <button className="hh-btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>
            </div>
          </div>

        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hh-sp-cta" style={{ background: "#F0EAD8" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,95,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="hh-sp-cta-inner">
          <p className="hh-sp-eyebrow" style={{ textAlign: "center" }}>Ready to Take Action?</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "#1E1408", margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Turn Knowledge into Your Next Great Move
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(30,20,8,0.62)", lineHeight: 1.7, margin: "0 0 2.5rem" }}>
            Our team is ready to help you apply these insights to your unique situation — with personalized guidance, local expertise, and genuine aloha spirit.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="hh-btn-primary">Book a Free Consultation</Link>
            <Link href="/services" className="hh-btn-outline">Our Services</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
