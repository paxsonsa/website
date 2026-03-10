"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Newsreader, Overpass_Mono } from "next/font/google";
import { Threads, GithubCircle, Linkedin, Youtube, SunLight, HalfMoon } from "iconoir-react";
import "./dialogue.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-overpass-mono",
});

// --- Custom hook: trigger a CSS class when an element scrolls into view ---

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // reveal once
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// --- Scroll-reveal wrapper ---

function Reveal({ children, className = "", delay = 0, style = {} }) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// --- Expandable statement (tap-friendly for touch devices) ---

function Statement({ text, detail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group cursor-pointer py-3"
      onClick={() => setExpanded((v) => !v)}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setExpanded(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) setExpanded(false);
      }}
    >
      <p
        className="text-xl sm:text-2xl leading-relaxed transition-colors duration-[375ms]"
        style={{
          fontFamily: "var(--font-newsreader)",
          color: expanded ? "var(--accent, #0891B2)" : "var(--d-text)",
        }}
      >
        {text}
      </p>
      <div
        style={{
          maxHeight: expanded ? "80px" : "0",
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease-out, opacity 0.4s ease-out",
        }}
      >
        <p
          className="text-base leading-relaxed mt-2"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-detail)",
            fontSize: "0.85rem",
          }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

// --- Project line (tap-friendly for touch devices) ---

function ProjectLine({ name, description, href, onNavigate }) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <>
      <span
        className="text-3xl sm:text-4xl font-light transition-colors duration-[375ms]"
        style={{
          fontFamily: "var(--font-newsreader)",
          color: hovered ? "var(--accent, #0891B2)" : "var(--d-text)",
        }}
      >
        {name}
      </span>
      <div
        style={{
          maxHeight: hovered ? "60px" : "0",
          opacity: hovered ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease-out, opacity 0.35s ease-out",
        }}
      >
        <p
          className="text-base leading-relaxed mt-1"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-detail)",
            fontSize: "0.85rem",
          }}
        >
          {description}
        </p>
      </div>
    </>
  );

  const handlers = {
    onMouseEnter: () => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); },
    onMouseLeave: () => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); },
  };

  if (href && onNavigate) {
    return (
      <div
        className="block py-4 cursor-pointer"
        onClick={(e) => { e.preventDefault(); onNavigate(href); }}
        {...handlers}
      >
        {inner}
      </div>
    );
  }

  return (
    <div className="py-4 cursor-pointer" onClick={() => setHovered((v) => !v)} {...handlers}>
      {inner}
    </div>
  );
}

// --- Social card (large) ---

function SocialCard({ href, icon: Icon, label, subtitle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 px-5 py-4 rounded-lg border transition-all duration-[375ms]"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
      }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
      onClick={() => setHovered((v) => !v)}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-[375ms]"
        width={28}
        height={28}
        strokeWidth={1.4}
        style={{ color: hovered ? "var(--accent, #0891B2)" : "var(--d-social-icon)" }}
      />
      <div className="flex-1 min-w-0">
        <span
          className="block text-lg font-normal transition-colors duration-[375ms]"
          style={{
            fontFamily: "var(--font-newsreader)",
            color: hovered ? "var(--accent, #0891B2)" : "var(--d-text)",
          }}
        >
          {label}
        </span>
        <span
          className="block text-xs mt-0.5"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-muted)",
          }}
        >
          {subtitle}
        </span>
      </div>
      <span
        className="text-lg transition-all duration-[375ms]"
        style={{
          color: hovered ? "var(--accent, #0891B2)" : "var(--d-muted)",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        &rarr;
      </span>
    </a>
  );
}

// --- Social link (small) ---

function SocialLinkSmall({ href, icon: Icon, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-md border transition-all duration-[375ms]"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
        color: "var(--d-text)",
      }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-[375ms]"
        width={18}
        height={18}
        strokeWidth={1.5}
        style={{ color: hovered ? "var(--accent, #0891B2)" : "var(--d-social-icon)" }}
      />
      <span
        className="text-sm font-normal transition-colors duration-[375ms]"
        style={{
          fontFamily: "var(--font-overpass-mono)",
          color: hovered ? "var(--accent, #0891B2)" : "var(--d-social-label)",
        }}
      >
        {label}
      </span>
    </a>
  );
}

// --- Compact social icon for header row ---

function SocialIconSmall({ href, icon: Icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center transition-colors duration-[375ms]"
      style={{ color: hovered ? "var(--accent, #0891B2)" : "var(--d-muted)" }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
    >
      <Icon width={20} height={20} strokeWidth={1.5} />
    </a>
  );
}

// --- Theme toggle button ---

function ThemeToggle({ isDark, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-full border transition-all duration-500 cursor-pointer"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "var(--d-bg)",
        color: hovered ? "var(--accent, #0891B2)" : "var(--d-muted)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div
        style={{
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
          transform: isDark ? "rotate(0deg)" : "rotate(-90deg)",
        }}
      >
        {isDark ? <SunLight width={18} height={18} strokeWidth={1.5} /> : <HalfMoon width={18} height={18} strokeWidth={1.5} />}
      </div>
    </button>
  );
}

// --- Constants ---

const GREETING = "Hi, I\u2019m Andrew.";
const TYPING_DURATION_MS = 1800;
const CURSOR_PAUSE_MS = 600; // short beat after typing
const TOTAL_INTRO_DELAY_MS = TYPING_DURATION_MS + CURSOR_PAUSE_MS; // ~2.4s

// Header stagger timings
const SUBTITLE_DELAY_MS = TOTAL_INTRO_DELAY_MS + 200; // ~2.6s — subtitle appears
const BELIEF_DELAY_MS = TOTAL_INTRO_DELAY_MS + 2200; // ~4.6s — let subtitle hang ~2s, then belief
const ROLE_DELAY_MS = TOTAL_INTRO_DELAY_MS + 4200; // ~6.6s — let belief hang ~2s, then role
const SOCIALS_DELAY_MS = TOTAL_INTRO_DELAY_MS + 5000; // ~7.4s — social icons start
const SOCIAL_ICON_STAGGER_MS = 120; // stagger between each social icon
const HEADER_COMPLETE_MS = TOTAL_INTRO_DELAY_MS + 6200; // ~8.6s — page cascades shortly after socials land
const SECTION_STAGGER_MS = 350; // gentle stagger between sections

const THEME_KEY = "dialogue-theme";

// ==========================================================================
// Page
// ==========================================================================

const CASCADING_SECTIONS = 6; // narrative, what-i-do, work, writing, connect, footer

// Module-level flag — survives client-side navigations but resets on full page refresh
let introHasPlayed = false;

export default function DialoguePage() {
  const router = useRouter();

  // Theme state — default to system preference, persist choice
  const [isDark, setIsDark] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      setIsDark(saved === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    setThemeReady(true);

    // Listen for system preference changes (only when no saved preference)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  // Animation states — always start "not played" for SSR hydration consistency
  const [typingDone, setTypingDone] = useState(false);
  const [bloomStarted, setBloomStarted] = useState(false);
  const [headerComplete, setHeaderComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);
  const [pageExiting, setPageExiting] = useState(false);

  // Fade out page, then navigate
  const navigateWithFade = useCallback((href) => {
    setPageExiting(true);
    setTimeout(() => router.push(href), 500);
  }, [router]);

  // Gradient drift — follows mouse (desktop) or scroll (mobile)
  const driftRef = useRef({ x: 0, y: 0 });
  const driftTargetRef = useRef({ x: 0, y: 0 });
  const driftElRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const MAX_DRIFT = 1.5;
    const LERP_FACTOR = 0.015;
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    let lastScrollY = window.scrollY;

    function onMouseMove(e) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      driftTargetRef.current = { x: nx * MAX_DRIFT, y: ny * MAX_DRIFT };
    }

    function onScroll() {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      const nudge = Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, delta * 0.02));
      driftTargetRef.current = { x: driftTargetRef.current.x, y: nudge };
    }

    function tick() {
      const d = driftRef.current;
      const t = driftTargetRef.current;
      d.x += (t.x - d.x) * LERP_FACTOR;
      d.y += (t.y - d.y) * LERP_FACTOR;
      if (driftElRef.current) {
        driftElRef.current.style.setProperty("--drift-x", `${d.x}%`);
        driftElRef.current.style.setProperty("--drift-y", `${d.y}%`);
      }
      if (isTouch) {
        t.x *= 0.98;
        t.y *= 0.98;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    if (isTouch) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const timers = [];

    if (introHasPlayed) {
      // Returning via client-side nav — reveal immediately
      requestAnimationFrame(() => {
        setTypingDone(true);
        setBloomStarted(true);
        setHeaderComplete(true);
        setVisibleSections(CASCADING_SECTIONS);
      });
    } else {
      // Fresh page load — run the full intro sequence
      timers.push(setTimeout(() => setTypingDone(true), TOTAL_INTRO_DELAY_MS));

      const BLOOM_LEAD_MS = 400;
      timers.push(setTimeout(() => setBloomStarted(true), HEADER_COMPLETE_MS - BLOOM_LEAD_MS));
      timers.push(setTimeout(() => setHeaderComplete(true), HEADER_COMPLETE_MS));

      for (let i = 0; i < CASCADING_SECTIONS; i++) {
        timers.push(
          setTimeout(() => setVisibleSections((v) => v + 1), HEADER_COMPLETE_MS + (i + 1) * SECTION_STAGGER_MS)
        );
      }

      // Mark intro as played — survives SPA navigation, resets on refresh
      timers.push(
        setTimeout(() => {
          introHasPlayed = true;
        }, HEADER_COMPLETE_MS + CASCADING_SECTIONS * SECTION_STAGGER_MS + 500)
      );
    }

    // Accent color cycle
    const CYCLE_DURATION = 1800000;
    const accentColors = [
      { pos: 0,    color: [96, 165, 250] },
      { pos: 0.20, color: [8, 145, 178] },
      { pos: 0.42, color: [217, 119, 6] },
      { pos: 0.60, color: [192, 38, 119] },
      { pos: 0.78, color: [99, 90, 200] },
      { pos: 1.0,  color: [96, 165, 250] },
    ];

    function lerpColor(a, b, t) {
      return a.map((v, i) => Math.round(v + (b[i] - v) * t));
    }

    function getAccent(elapsed) {
      const t = (elapsed % CYCLE_DURATION) / CYCLE_DURATION;
      for (let i = 0; i < accentColors.length - 1; i++) {
        const curr = accentColors[i];
        const next = accentColors[i + 1];
        if (t >= curr.pos && t <= next.pos) {
          const local = (t - curr.pos) / (next.pos - curr.pos);
          const rgb = lerpColor(curr.color, next.color, local);
          return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }
      }
      return `rgb(8, 145, 178)`;
    }

    const randomOffset = Math.random() * CYCLE_DURATION;
    const startTime = Date.now();

    const offsetSec = Math.round(randomOffset / 1000);
    document.documentElement.style.setProperty("--cycle-offset", `-${offsetSec}s`);

    const accentInterval = setInterval(() => {
      const accent = getAccent((Date.now() - startTime) + randomOffset);
      document.documentElement.style.setProperty("--accent", accent);
    }, 1000);

    const initialAccent = getAccent(randomOffset);
    document.documentElement.style.setProperty("--accent", initialAccent);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(accentInterval);
      document.documentElement.style.removeProperty("--accent");
    };
  }, []);

  const cascadeStyle = (visible, index) => ({
    opacity: visible >= index ? 1 : 0,
    transform: visible >= index ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  // Bloom direction: day drifts down, night rises up
  const bloomDir = isDark ? -1 : 1;

  return (
    <div
      className={`${newsreader.variable} ${overpassMono.variable} min-h-screen dialogue-page${isDark ? " dark-mode" : ""}`}
      style={{
        backgroundColor: "var(--d-bg)",
        color: "var(--d-text)",
        opacity: pageExiting ? 0 : themeReady ? 1 : 0,
        transform: pageExiting ? "translateY(-4px)" : "translateY(0)",
        transition: "background-color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {/* Theme toggle */}
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      {/* Gradient bloom */}
      {(() => {
        const progress = visibleSections / CASCADING_SECTIONS;
        let scale, opacity, yShift;
        if (!bloomStarted) {
          scale = 0.5;
          opacity = isDark ? 0.08 : 0.04;
          yShift = 15 * bloomDir;
        } else if (visibleSections === 0) {
          scale = 0.85;
          opacity = isDark ? 0.4 : 0.35;
          yShift = 6 * bloomDir;
        } else {
          scale = 0.85 + progress * 0.35;
          opacity = (isDark ? 0.4 : 0.35) + progress * (isDark ? 0.6 : 0.65);
          yShift = 6 * bloomDir - progress * 6 * bloomDir;
        }
        return (
          <div
            ref={driftElRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              "--drift-x": "0%",
              "--drift-y": "0%",
              opacity,
              transform: `scale(${scale}) translate(var(--drift-x), calc(${yShift}% + var(--drift-y)))`,
              transformOrigin: "50% 30%",
              transition: bloomStarted
                ? "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
            }}
          >
            <div className="day-cycle-base day-cycle-morning" />
            <div className="day-cycle-base day-cycle-day" />
            <div className="day-cycle-base day-cycle-golden" />
            <div className="day-cycle-base day-cycle-dusk" />
            <div className="day-cycle-base day-cycle-night" />
          </div>
        );
      })()}

      <main
        className="mx-auto px-6 sm:px-8 breathing relative"
        style={{ maxWidth: "720px", zIndex: 1 }}
      >
        {/* ================================================================
            1. Opening — Typing animation + compact social row
        ================================================================ */}
        <section className="pt-32 sm:pt-44 pb-24">
          <h1
            className="text-5xl sm:text-6xl font-light leading-tight"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            <span className="typewriter-wrapper">
              <span className="typewriter-text">{GREETING}</span>
            </span>
          </h1>

          <p
            className="stagger-after-1 mt-4 text-xl sm:text-2xl leading-relaxed font-light"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "var(--d-subtext)",
            }}
          >
            I&rsquo;m a product designer and engineer who builds tools for
            creative teams.
          </p>

          <p
            className="stagger-after-1b mt-3 text-lg sm:text-xl leading-relaxed font-light"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "var(--accent, #0891B2)",
            }}
          >
            I believe the best software disappears into the work it enables.
          </p>

          <p
            className="stagger-after-2 mt-6 text-base"
            style={{
              fontFamily: "var(--font-overpass-mono)",
              color: "var(--d-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Staff Engineer at Industrial Light &amp; Magic
          </p>

          {/* Compact social icon row — pile in one by one */}
          <div className="mt-5 flex items-center gap-5">
            {[
              { href: "https://www.linkedin.com/in/andrewpaxson", icon: Linkedin },
              { href: "https://github.com/paxsonsa", icon: GithubCircle },
              { href: "https://www.threads.com/@paxsonsa", icon: Threads },
              { href: "https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q", icon: Youtube },
            ].map((social, i) => (
              <span
                key={social.href}
                className="social-pile-in"
                style={{ animationDelay: `${SOCIALS_DELAY_MS + i * SOCIAL_ICON_STAGGER_MS}ms` }}
              >
                <SocialIconSmall href={social.href} icon={social.icon} />
              </span>
            ))}
          </div>
        </section>

        {/* ================================================================
            Below-header content — cascades in section by section
        ================================================================ */}
        <div>
          {/* ================================================================
              2. Flowing narrative
          ================================================================ */}
          <section className="pb-20 space-y-16 cascade-section" style={cascadeStyle(visibleSections, 1)}>
            <Reveal>
              <p
                className="text-xl sm:text-2xl leading-relaxed font-light"
                style={{
                  fontFamily: "var(--font-newsreader)",
                  color: "var(--d-subtext)",
                }}
              >
                For the past decade, I&rsquo;ve worked at the intersection of
                design and engineering&mdash;the place where taste meets
                craft, and ideas become tools people actually reach for.
              </p>
            </Reveal>

            <Reveal>
              <p
                className="text-xl sm:text-2xl leading-relaxed font-light"
                style={{
                  fontFamily: "var(--font-newsreader)",
                  color: "var(--d-subtext)",
                }}
              >
                Currently at{" "}
                <span style={{ color: "var(--d-text)", fontWeight: 400 }}>
                  Industrial Light &amp; Magic
                </span>
                , where I build the internal tools that help artists create
                the impossible.
              </p>
            </Reveal>

          </section>

          {/* ================================================================
              3. What I do
          ================================================================ */}
          <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 2)}>
            <Reveal>
              <p
                className="text-sm uppercase tracking-widest mb-6"
                style={{
                  fontFamily: "var(--font-overpass-mono)",
                  color: "var(--d-muted)",
                }}
              >
                What I do
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Statement
                text="I design products end-to-end — from research to shipped code."
                detail="User research, system design, prototyping, production frontend and backend implementation."
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Statement
                text="I build tools for complex creative workflows."
                detail="VFX production pipelines, asset management, artist-facing applications at studio scale."
              />
            </Reveal>
            <Reveal delay={0.2}>
              <Statement
                text="I lead distributed teams that ship."
                detail="Cross-functional collaboration across studios, time zones, and disciplines."
              />
            </Reveal>
          </section>

          {/* ================================================================
              4. Work
          ================================================================ */}
          <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 3)}>
            <Reveal>
              <p
                className="text-sm uppercase tracking-widest mb-6"
                style={{
                  fontFamily: "var(--font-overpass-mono)",
                  color: "var(--d-muted)",
                }}
              >
                Selected work
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ProjectLine
                name="MotionStage"
                description="Pipeline tooling for motion-capture workflows at ILM."
                href="/concepts/dialogue/projects/motion-stage"
                onNavigate={navigateWithFade}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ProjectLine
                name="PelagoDB"
                description="High-performance data platform for production VFX assets."
              />
            </Reveal>
            <Reveal delay={0.2}>
              <ProjectLine
                name="KnowledgeDB"
                description="Internal knowledge graph for studio institutional memory."
              />
            </Reveal>
          </section>

          {/* ================================================================
              5. Writing
          ================================================================ */}
          <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 4)}>
            <Reveal>
              <p
                className="text-xl sm:text-2xl leading-relaxed font-light"
                style={{
                  fontFamily: "var(--font-newsreader)",
                  color: "var(--d-subtext)",
                }}
              >
                I write about the intersection of art, engineering, and product
                thinking in a blog called{" "}
                <span style={{ color: "var(--d-text)", fontWeight: 400 }}>
                  Mosaic and Monoliths
                </span>
                &mdash;mosaics of art and product systems, monoliths as
                engineering simplicity.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href="https://andrewpaxson.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 text-base font-semibold transition-colors duration-[375ms] border-b-2 teal-pulse"
                style={{
                  fontFamily: "var(--font-overpass-mono)",
                  color: "var(--accent, #0891B2)",
                  borderColor: "var(--accent, #0891B2)",
                  paddingBottom: "2px",
                }}
              >
                Read the blog &rarr;
              </a>
            </Reveal>
          </section>

          {/* ================================================================
              6. Connect — Blueprint-style social cards
          ================================================================ */}
          <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 5)}>
            <Reveal>
              <p
                className="text-xl sm:text-2xl leading-relaxed font-light mb-8"
                style={{
                  fontFamily: "var(--font-newsreader)",
                  color: "var(--d-subtext)",
                }}
              >
                The best way to find me:
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-3">
                <SocialCard
                  href="https://www.linkedin.com/in/andrewpaxson"
                  icon={Linkedin}
                  label="LinkedIn"
                  subtitle="Resume & Career"
                />
                <SocialCard
                  href="https://github.com/paxsonsa"
                  icon={GithubCircle}
                  label="GitHub"
                  subtitle="Engineering Work"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex gap-3 mt-4">
                <SocialLinkSmall
                  href="https://www.threads.com/@paxsonsa"
                  icon={Threads}
                  label="Threads"
                />
                <SocialLinkSmall
                  href="https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q"
                  icon={Youtube}
                  label="YouTube"
                />
              </div>
            </Reveal>
          </section>

          {/* ================================================================
              7. Footer
          ================================================================ */}
          <footer className="border-t pt-8 pb-16 cascade-section" style={{ borderColor: "var(--d-border)", ...cascadeStyle(visibleSections, 6) }}>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "var(--d-muted)",
              }}
            >
              &copy; 2025 Andrew Paxson
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
