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
      className="hh-floating-nav"
      role="navigation"
      aria-label="Layout options"
    >
      {/* Nav header label */}
      <div className="hh-nav-label">Layout</div>

      {/* Layout option buttons */}
      {layouts.map((layout) => {
        const Icon = iconMap[layout.id];
        const isActive = activeLayout === layout.id;

        return (
          <button
            key={layout.id}
            className={`hh-nav-btn${isActive ? " active" : ""}`}
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
