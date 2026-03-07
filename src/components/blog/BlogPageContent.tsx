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
    excerpt: "Honolulu home prices held firm through Q4 while inventory ticked upward for the first time in three years. Here is what the data means for your next move.",
    author: "Kalani Akana", authorInitials: "KA", date: "Dec 18, 2024", readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 55%, #CFC499 100%)",
    featured: true,
  },
  {
    id: "first-time-buyer-guide",
    category: "Buying Tips",
    title: "The Complete First-Time Homebuyer Guide for Hawaii",
    excerpt: "From pre-approval to closing day — everything you need to know before buying your first home in the Aloha State, including Hawaii-specific requirements.",
    author: "Leilani Moku", authorInitials: "LM", date: "Dec 10, 2024", readTime: "10 min read",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 55%, #CCC09A 100%)",
    editorPick: true,
  },
  {
    id: "vacation-rental-investment",
    category: "Investment",
    title: "Is a Hawaii Vacation Rental Still a Good Investment in 2024?",
    excerpt: "New short-term rental regulations, Airbnb demand trends, and ROI projections — what every investor needs to consider before purchasing.",
    author: "Keanu Hale", authorInitials: "KH", date: "Nov 20, 2024", readTime: "9 min read",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 55%, #D4C4A0 100%)",
    editorPick: true,
  },
  {
    id: "oahu-neighborhoods",
    category: "Local Living",
    title: "Best Neighborhoods in Oahu for Families, Young Professionals, and Retirees",
    excerpt: "Kailua, Manoa, Kahala, or Ko Olina? We break down lifestyle, schools, commute, and price points across Oahu's most sought-after communities.",
    author: "Leilani Moku", authorInitials: "LM", date: "Dec 4, 2024", readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 55%, #CDBE98 100%)",
  },
  {
    id: "sell-above-asking",
    category: "Selling Tips",
    title: "5 Proven Strategies to Sell Your Hawaii Home Above Asking Price",
    excerpt: "Strategic pricing, professional staging, and timing your listing right can mean tens of thousands more at closing.",
    author: "Kalani Akana", authorInitials: "KA", date: "Nov 28, 2024", readTime: "6 min read",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 100%)",
  },
  {
    id: "moving-to-hawaii",
    category: "Local Living",
    title: "Moving to Hawaii? 12 Things No One Tells You Before You Relocate",
    excerpt: "Island fever, shipping costs, the cost of groceries, and why mainland habits don't always translate — honest advice for anyone planning the move.",
    author: "Maile Reyes", authorInitials: "MR", date: "Nov 12, 2024", readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 100%)",
  },
  {
    id: "property-management-tips",
    category: "Investment",
    title: "How to Maximize ROI on Your Hawaii Investment Property",
    excerpt: "Smart maintenance schedules, tenant retention strategies, and the rental pricing formula our property managers use to keep vacancy near zero.",
    author: "Maile Reyes", authorInitials: "MR", date: "Nov 5, 2024", readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 100%)",
  },
  {
    id: "home-inspection-checklist",
    category: "Buying Tips",
    title: "The Hawaii Home Inspection Checklist Every Buyer Should Use",
    excerpt: "From termite damage to lava zone classifications — the unique inspection items that matter most when buying property in Hawaii.",
    author: "Leilani Moku", authorInitials: "LM", date: "Oct 28, 2024", readTime: "6 min read",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 100%)",
  },
  {
    id: "staging-for-sale",
    category: "Selling Tips",
    title: "Home Staging on a Budget: Prepare Your Hawaii Property for Sale",
    excerpt: "You don't need a full renovation to impress buyers. These low-cost staging moves have helped our sellers achieve faster sales and higher offers.",
    author: "Kalani Akana", authorInitials: "KA", date: "Oct 18, 2024", readTime: "5 min read",
    imageBg: "linear-gradient(135deg, #EDE4CC 0%, #DDD4B4 55%, #CFC499 100%)",
  },
  {
    id: "1031-exchange-hawaii",
    category: "Investment",
    title: "Using a 1031 Exchange to Grow Your Hawaii Real Estate Portfolio",
    excerpt: "A properly executed 1031 exchange can defer capital gains taxes and accelerate your portfolio growth. Here's how Hawaii investors are using it.",
    author: "Keanu Hale", authorInitials: "KH", date: "Oct 8, 2024", readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #E8DFCA 0%, #D9CEB0 55%, #CCC09A 100%)",
  },
  {
    id: "market-timing",
    category: "Market Updates",
    title: "Is Now the Right Time to Buy in Hawaii? What the Data Shows",
    excerpt: "Interest rates, inventory levels, and buyer demand paint a nuanced picture. Our analysts break down the numbers so you can make an informed decision.",
    author: "Kalani Akana", authorInitials: "KA", date: "Sep 25, 2024", readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #F0E8D2 0%, #E2D4B8 55%, #D4C4A0 100%)",
  },
  {
    id: "maui-buying-guide",
    category: "Buying Tips",
    title: "Buying Property on Maui: Everything You Need to Know",
    excerpt: "From the Valley Isle's unique zoning rules to the best neighborhoods for long-term value — a comprehensive guide for Maui home buyers.",
    author: "Leilani Moku", authorInitials: "LM", date: "Sep 10, 2024", readTime: "9 min read",
    imageBg: "linear-gradient(135deg, #EAE1CB 0%, #DCCFB0 55%, #CDBE98 100%)",
  },
];

const categories: Category[] = ["All", "Market Updates", "Buying Tips", "Selling Tips", "Investment", "Local Living"];
const INITIAL_VISIBLE = 6;

/* Shared Tailwind snippets (as constants for reuse) */
const categoryBadge =
  "inline-block text-[0.5625rem] font-bold tracking-[0.14em] uppercase text-hh-gold bg-hh-gold/10 border border-hh-gold/20 rounded-full px-3 py-1";

export default function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const bgRef          = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const featuredRef    = useRef<HTMLDivElement>(null);
  const editorPicksRef = useRef<HTMLDivElement>(null);
  const gridRef        = useRef<HTMLDivElement>(null);
  const newsletterRef  = useRef<HTMLDivElement>(null);

  const featured    = posts.find((p) => p.featured)!;
  const editorPicks = posts.filter((p) => p.editorPick);

  const allFilteredPosts =
    activeCategory === "All"
      ? posts.filter((p) => !p.featured && !p.editorPick)
      : posts.filter((p) => !p.featured && p.category === activeCategory);

  const visiblePosts = allFilteredPosts.slice(0, visibleCount);
  const hasMore      = visibleCount < allFilteredPosts.length;

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
        gsap.fromTo(editorPicksRef.current.querySelectorAll("[data-ep-card]"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.14, ease: "power2.out", scrollTrigger: { trigger: editorPicksRef.current, start: "top 82%" } }
        );
      }
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.querySelectorAll("[data-blog-card]"),
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
    setTimeout(() => {
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.querySelectorAll("[data-blog-card]"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" }
        );
      }
    }, 10);
  }

  return (
    <div className="bg-hh-warm-bg min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "54vh" }}>
        <div
          ref={bgRef}
          className="absolute left-0 right-0 bg-cover"
          style={{
            top: -80,
            height: "calc(100% + 160px)",
            backgroundImage: "url('/luxury-home.png')",
            backgroundPosition: "center 55%",
            filter: "brightness(0.58) saturate(0.68) contrast(0.95)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,8,4,0.58) 0%, rgba(10,8,4,0.38) 50%, rgba(10,8,4,0.65) 100%)" }}
        />
        <div ref={heroContentRef} className="relative z-[2] max-w-[1200px] mx-auto px-8 pt-[140px] pb-20 w-full max-[700px]:px-5">
          <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem]">Hawaii Home Blog</p>
          <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-bold text-white mb-[1.125rem] leading-[1.1] tracking-[-0.02em] max-w-[640px] mt-0">
            Insights, Tips &amp; Stories from Hawaii Real Estate
          </h1>
          <p className="text-[clamp(0.9375rem,1.6vw,1.125rem)] text-white/80 leading-[1.72] max-w-[520px] mb-8 mt-0">
            Expert market analysis, buying and selling guides, investment strategies, and local living advice — straight from our team of Hawaii real estate professionals.
          </p>
          {/* Category quick-links */}
          <div className="flex gap-2 flex-wrap">
            {categories.filter((c) => c !== "All").map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  handleCategoryChange(cat);
                  document.getElementById("blog-articles")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-[0.875rem] py-[0.3rem] text-[0.75rem] font-medium font-sans text-white/80 bg-white/10 border border-white/25 rounded-full cursor-pointer transition-all duration-200 hover:bg-[rgba(200,168,75,0.25)] hover:text-hh-gold"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="pt-24">
        <div className="max-w-[1200px] mx-auto px-8 max-[700px]:px-5">
          <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem]">Featured Article</p>
          <div
            ref={featuredRef}
            className="grid grid-cols-1 lg:grid-cols-2 bg-white/[0.68] border border-[rgba(212,175,95,0.20)] rounded-[24px] overflow-hidden mt-12 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(180,148,70,0.20)]"
          >
            {/* Image */}
            <div
              className="hh-img-placeholder relative overflow-hidden aspect-[4/3] lg:aspect-auto"
              style={{ background: featured.imageBg }}
            >
              <span className="hh-img-placeholder-label">Featured Image</span>
            </div>

            {/* Body */}
            <div className="p-8 lg:p-11 flex flex-col justify-center">
              {/* Badges */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className={categoryBadge}>{featured.category}</span>
                <span className="text-[0.625rem] font-bold tracking-[0.12em] uppercase text-hh-gold/65 bg-hh-gold/10 border border-hh-gold/[0.18] rounded-full py-1 px-[0.625rem]">
                  Editor&apos;s Pick
                </span>
              </div>
              <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold text-hh-text mb-4 leading-[1.32] mt-0">
                {featured.title}
              </h2>
              <p className="text-[0.9375rem] text-hh-text/[0.58] leading-[1.75] mb-8 mt-0">
                {featured.excerpt}
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 mb-7">
                <div className="size-9 rounded-full bg-[rgba(212,175,95,0.14)] border border-[rgba(212,175,95,0.24)] flex items-center justify-center text-[0.6875rem] font-bold text-hh-gold shrink-0">
                  {featured.authorInitials}
                </div>
                <div>
                  <p className="text-[0.875rem] font-semibold text-hh-text/[0.82] m-0 leading-[1.2]">{featured.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[0.75rem] text-hh-text/40">{featured.date}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-hh-gold/30" />
                    <span className="flex items-center gap-1 text-[0.75rem] text-hh-text/40">
                      <ClockIcon />{featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
              <button className="hh-btn-primary self-start flex items-center gap-2">
                Read Full Article <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDITOR'S PICKS ===== */}
      <section className="pt-12 pb-8">
        <div className="max-w-[1200px] mx-auto px-8 max-[700px]:px-5">
          <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-6">Editor&apos;s Picks</p>
          <div ref={editorPicksRef} className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-6">
            {editorPicks.map((post) => (
              <div
                key={post.id}
                data-ep-card=""
                className="grid grid-cols-1 min-[540px]:grid-cols-[160px_1fr] min-[900px]:grid-cols-[200px_1fr] bg-white/72 border border-[rgba(212,175,95,0.28)] rounded-[18px] overflow-hidden transition-all duration-200 cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(180,148,70,0.18)]"
              >
                <div
                  className="hh-img-placeholder min-h-[140px] min-[540px]:min-h-0"
                  style={{ background: post.imageBg }}
                >
                  <span className="hh-img-placeholder-label">Post Image</span>
                </div>
                <div className="p-5 px-6 flex flex-col justify-between gap-3">
                  <div>
                    <span className={`${categoryBadge} mb-2.5`}>{post.category}</span>
                    <h3 className="text-[0.9375rem] font-semibold text-hh-text mb-2 leading-[1.4] mt-0">{post.title}</h3>
                    <p className="text-[0.8125rem] text-hh-text/[0.52] leading-[1.6] m-0">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[0.75rem] text-hh-text/40">
                      <ClockIcon />{post.readTime}
                    </div>
                    <span className="flex items-center gap-[0.3rem] text-[0.75rem] font-semibold text-hh-gold">
                      Read <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTICLES GRID + FILTERS ===== */}
      <section id="blog-articles" className="pt-8 pb-24">
        <div className="max-w-[1200px] mx-auto px-8 max-[700px]:px-5">

          {/* Header row */}
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
            <div>
              <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem]">All Articles</p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-hh-text m-0 tracking-[-0.015em]">
                Browse by Topic
              </h2>
            </div>
            <p className="text-[0.8125rem] text-hh-text/[0.38] m-0">
              {allFilteredPosts.length} article{allFilteredPosts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-[0.4rem] text-[0.8125rem] font-sans rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap border ${
                  activeCategory === cat
                    ? "bg-hh-gold border-hh-gold text-[#1a1205] font-semibold"
                    : "font-medium text-hh-text/[0.60] bg-transparent border-[rgba(212,175,95,0.18)] hover:text-hh-text/90 hover:bg-hh-gold/[0.14] hover:border-[rgba(212,175,95,0.28)]"
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-[0.6875rem] font-semibold ${activeCategory === cat ? "opacity-60" : "opacity-40"}`}>
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div ref={gridRef} className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 gap-6">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <article
                  key={post.id}
                  data-blog-card=""
                  className="bg-white/[0.68] border border-[rgba(212,175,95,0.16)] rounded-[20px] overflow-hidden transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(180,148,70,0.18)] flex flex-col"
                >
                  {/* Thumbnail */}
                  <div
                    className="hh-img-placeholder aspect-video overflow-hidden relative"
                    style={{ background: post.imageBg }}
                  >
                    <span className="hh-img-placeholder-label">Post Image</span>
                  </div>
                  {/* Body */}
                  <div className="px-6 pt-[1.375rem] pb-7 flex-1 flex flex-col">
                    <span className={`${categoryBadge} mb-3.5 self-start`}>{post.category}</span>
                    <h3 className="text-[1.0625rem] font-semibold text-hh-text mb-2.5 leading-[1.4] mt-0">{post.title}</h3>
                    <p className="text-[0.875rem] text-hh-text/[0.52] leading-[1.65] mb-5 mt-0 flex-1">{post.excerpt}</p>
                    {/* Author meta */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="size-7 rounded-full bg-[rgba(212,175,95,0.14)] border border-[rgba(212,175,95,0.24)] flex items-center justify-center text-[0.5625rem] font-bold text-hh-gold shrink-0">
                        {post.authorInitials}
                      </div>
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[0.75rem] text-hh-text/[0.38]">
                        <span className="text-hh-gold/60">{post.author}</span>
                        <span className="w-[3px] h-[3px] rounded-full bg-hh-gold/30 shrink-0" />
                        <span>{post.date}</span>
                        <span className="w-[3px] h-[3px] rounded-full bg-hh-gold/30 shrink-0" />
                        <span className="flex items-center gap-1"><ClockIcon />{post.readTime}</span>
                      </div>
                    </div>
                    {/* Read link */}
                    <div className="border-t border-[rgba(212,175,95,0.10)] pt-4">
                      <span className="text-[0.8125rem] font-semibold text-hh-gold flex items-center gap-1.5 cursor-pointer transition-colors duration-200 hover:text-hh-gold-dark">
                        Read Article <ArrowRightIcon />
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-hh-text/[0.38] text-[0.9375rem] m-0">
                  No articles in this category yet — check back soon.
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                className="hh-btn-outline px-10 py-3"
                onClick={() => setVisibleCount((v) => v + 3)}
              >
                Load More Articles
              </button>
            </div>
          )}

          {/* Newsletter */}
          <div
            ref={newsletterRef}
            className="bg-white/[0.58] border border-[rgba(212,175,95,0.16)] rounded-[24px] px-6 py-8 sm:px-14 sm:py-12 flex flex-col min-[700px]:flex-row items-start gap-7 min-[700px]:gap-16 mt-20"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-2">Stay in the Know</p>
              <h3 className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-bold text-hh-text mb-2 mt-0 tracking-[-0.01em]">
                Get Hawaii Real Estate Insights in Your Inbox
              </h3>
              <p className="text-[0.875rem] text-hh-text/[0.50] m-0 leading-[1.65]">
                Market updates, new listings, and expert tips — delivered monthly. No spam, unsubscribe anytime.
              </p>
            </div>
            <div className="flex gap-3 w-full min-[700px]:flex-1 min-[700px]:max-w-[460px] flex-wrap">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 px-[1.125rem] py-[0.65rem] bg-white/72 border border-[rgba(212,175,95,0.28)] rounded-[10px] text-[0.9375rem] font-sans text-hh-text outline-none transition-colors duration-200 focus:border-[rgba(212,175,95,0.48)] placeholder:text-hh-gold/40"
              />
              <button className="hh-btn-primary shrink-0">Subscribe</button>
            </div>
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
          <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-hh-gold mb-[0.875rem] text-center">Ready to Take Action?</p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-hh-text mb-4 mt-0 tracking-[-0.02em] leading-[1.15]">
            Turn Knowledge into Your Next Great Move
          </h2>
          <p className="text-base text-hh-text/[0.62] leading-[1.7] mb-10 mt-0">
            Our team is ready to help you apply these insights to your unique situation — with personalized guidance, local expertise, and genuine aloha spirit.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/contact" className="hh-btn-primary">Book a Free Consultation</Link>
            <Link href="/services" className="hh-btn-outline">Our Services</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
