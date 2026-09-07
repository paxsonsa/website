"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { HalfMoon, SunLight } from "iconoir-react";

import { SiteProvider, useSite } from "./SiteContext";
import TransitionLink from "./TransitionLink";

function ThemeToggle() {
  const { isDark, toggleTheme } = useSite();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full border transition-all duration-500 cursor-pointer"
      style={{
        borderColor: hovered ? "var(--accent)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
        color: hovered ? "var(--accent)" : "var(--d-detail)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className="block"
        style={{
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isDark ? "rotate(0deg)" : "rotate(-90deg)",
        }}
      >
        {isDark ? (
          <SunLight width={16} height={16} strokeWidth={1.5} />
        ) : (
          <HalfMoon width={16} height={16} strokeWidth={1.5} />
        )}
      </span>
    </button>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <TransitionLink
      href={href}
      className="mono text-xs tracking-[0.15em] uppercase transition-colors duration-[375ms] pb-0.5 border-b"
      style={{
        color: hovered || active ? "var(--d-text)" : "var(--d-detail)",
        borderColor: active ? "var(--accent)" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </TransitionLink>
  );
}

function Nav() {
  const { chromeVisible } = useSite();
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header
      className="w-full mx-auto px-6 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between"
      style={{
        maxWidth: "720px",
        opacity: chromeVisible ? 1 : 0,
        transition: "opacity 0.8s ease-out",
        pointerEvents: chromeVisible ? "auto" : "none",
      }}
    >
      <TransitionLink
        href="/"
        className="mono text-xs tracking-[0.15em] uppercase transition-colors duration-[375ms]"
        style={{ color: isHome ? "var(--d-muted)" : "var(--d-detail)" }}
        aria-label="Home"
      >
        Andrew Paxson
      </TransitionLink>
      <nav className="flex items-center gap-5 sm:gap-6">
        <NavLink href="/work">Work</NavLink>
        <NavLink href="/articles">Writing</NavLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}

function GradientBloom() {
  const { isDark, swirlDirection, driftElRef, bloomPhase, bloomProgress } = useSite();
  const isSwirling = swirlDirection !== 0;
  const bloomDir = isDark ? -1 : 1;

  let scale, opacity, rotate, yShift, transition;
  if (isSwirling) {
    scale = 1.8;
    opacity = 1;
    rotate = 18 * swirlDirection;
    yShift = -8 * swirlDirection;
    transition =
      "opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.8s cubic-bezier(0.34, 1.2, 0.64, 1)";
  } else if (bloomPhase === "dormant") {
    scale = 0.5;
    opacity = isDark ? 0.08 : 0.04;
    rotate = 0;
    yShift = 15 * bloomDir;
    transition = "none";
  } else if (bloomPhase === "opening") {
    scale = 0.85 + bloomProgress * 0.35;
    opacity = (isDark ? 0.4 : 0.35) + bloomProgress * (isDark ? 0.6 : 0.65);
    rotate = 0;
    yShift = 6 * bloomDir - bloomProgress * (6 * bloomDir);
    transition =
      "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
  } else {
    scale = 1.2;
    opacity = 1;
    rotate = 0;
    yShift = 0;
    transition =
      "opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)";
  }
  const settled = bloomPhase === "full" && !isSwirling;

  return (
    <div
      ref={driftElRef}
      aria-hidden="true"
      className={`fixed pointer-events-none z-0${settled ? " gradient-cloud-pass" : ""}`}
      style={{
        inset: "-20%",
        "--drift-x": "0%",
        "--drift-y": "0%",
        "--bloom-opacity": opacity,
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg) translate(var(--drift-x), calc(${yShift}% + var(--drift-y)))`,
        transformOrigin: "50% 40%",
        transition,
        willChange: "transform, opacity",
      }}
    >
      <div className="bloom-layer bloom-layer-a" />
      <div className="bloom-layer bloom-layer-b" />
    </div>
  );
}

function Footer() {
  const { chromeVisible } = useSite();
  return (
    <footer
      className="w-full mx-auto px-6 sm:px-8 pb-12 pt-8 border-t flex flex-wrap items-center justify-between gap-3"
      style={{
        maxWidth: "720px",
        borderColor: "var(--d-border)",
        opacity: chromeVisible ? 1 : 0,
        transition: "opacity 0.8s ease-out",
      }}
    >
      <p className="mono text-xs" style={{ color: "var(--d-muted)" }}>
        &copy; 2026 Andrew Paxson
      </p>
      <a
        href="https://github.com/paxsonsa/website"
        target="_blank"
        rel="noopener noreferrer"
        className="mono text-xs transition-colors duration-[375ms] hover:underline"
        style={{ color: "var(--d-muted)" }}
      >
        Source on GitHub
      </a>
    </footer>
  );
}

function Shell({ children }) {
  const { contentVisible } = useSite();
  return (
    <div className="min-h-screen flex flex-col" style={{ color: "var(--d-text)" }}>
      <GradientBloom />
      <div
        className="relative z-10 flex-1 flex flex-col"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(-8px)",
          transition:
            "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default function SiteShell({ children }) {
  return (
    <SiteProvider>
      <Shell>{children}</Shell>
    </SiteProvider>
  );
}
