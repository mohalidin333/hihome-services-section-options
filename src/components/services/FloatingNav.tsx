"use client";

/* =====================================================
   FloatingNav — Fixed layout switcher (top-right desktop,
   bottom-center mobile). Switches between the three
   layout options with smooth GSAP entrance animation.
   ===================================================== */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GridIcon, ListIcon, SplitIcon } from "./ServiceIcons";
import { layouts } from "./serviceData";
import type { LayoutId } from "./serviceData";

const iconMap = {
  grid: GridIcon,
  list: ListIcon,
  split: SplitIcon,
} as const;

interface FloatingNavProps {
  activeLayout: LayoutId;
  onLayoutChange: (id: LayoutId) => void;
}

export default function FloatingNav({
  activeLayout,
  onLayoutChange,
}: FloatingNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  /* Slide in from the right on mount */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.55, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-6 right-6 z-[100] bg-[rgba(250,248,242,0.92)] backdrop-blur-[28px] border border-[rgba(212,175,95,0.30)] rounded-2xl p-2 shadow-[0_8px_32px_rgba(180,148,70,0.18),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.90)] flex flex-col gap-1 min-w-[148px] max-[768px]:flex-row max-[768px]:left-0 max-[768px]:right-0 max-[768px]:mx-auto max-[768px]:w-fit max-[768px]:min-w-0 max-[768px]:bottom-5 max-[768px]:gap-0.5 max-[768px]:p-1.5"
      role="navigation"
      aria-label="Layout options"
    >
      {/* Nav header label */}
      <div className="px-3 pt-1.5 pb-2 text-[0.5625rem] font-bold tracking-[0.14em] uppercase text-[rgba(212,175,95,0.50)] border-b border-[rgba(212,175,95,0.14)] mb-1 text-center max-[768px]:hidden">
        Layout
      </div>

      {/* Layout option buttons */}
      {layouts.map((layout) => {
        const Icon = iconMap[layout.id];
        const isActive = activeLayout === layout.id;

        return (
          <button
            key={layout.id}
            className={`flex items-center gap-[0.6rem] px-[0.875rem] py-[0.6rem] rounded-[10px] border text-[0.8125rem] font-medium cursor-pointer transition-[background,color,border-color] duration-[180ms] text-left whitespace-nowrap w-full max-[768px]:flex-col max-[768px]:gap-1 max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-[0.625rem] max-[768px]:rounded-lg ${
              isActive
                ? "bg-hh-gold border-hh-gold text-[#1a1205] font-bold"
                : "border-transparent bg-transparent text-[rgba(30,20,8,0.55)] hover:bg-[rgba(212,175,95,0.14)] hover:text-[rgba(30,20,8,0.88)] hover:border-[rgba(212,175,95,0.28)]"
            }`}
            onClick={() => onLayoutChange(layout.id)}
            aria-pressed={isActive}
            title={layout.description}
          >
            <Icon size={15} />
            <span>{layout.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
