"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Newsreader, Overpass_Mono } from "next/font/google";
import { Threads, GithubCircle, Linkedin, Youtube } from "iconoir-react";

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
        className="text-xl sm:text-2xl leading-relaxed transition-colors duration-300"
        style={{
          fontFamily: "var(--font-newsreader)",
          color: expanded ? "var(--accent, #0891B2)" : "#E8E6E3",
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
            color: "#6B6B6F",
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

function ProjectLine({ name, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="py-4 cursor-pointer"
      onClick={() => setHovered((v) => !v)}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setHovered(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) setHovered(false);
      }}
    >
      <span
        className="text-3xl sm:text-4xl font-light transition-colors duration-300"
        style={{
          fontFamily: "var(--font-newsreader)",
          color: hovered ? "var(--accent, #0891B2)" : "#E8E6E3",
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
            color: "#6B6B6F",
            fontSize: "0.85rem",
          }}
        >
          {description}
        </p>
      </div>
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
      className="group flex items-center gap-5 px-5 py-4 rounded-lg border transition-all duration-300"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "#2A2A2E",
        backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent",
      }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
      onClick={() => setHovered((v) => !v)}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-300"
        width={28}
        height={28}
        strokeWidth={1.4}
        style={{ color: hovered ? "var(--accent, #0891B2)" : "#8B8A87" }}
      />
      <div className="flex-1 min-w-0">
        <span
          className="block text-lg font-normal transition-colors duration-300"
          style={{
            fontFamily: "var(--font-newsreader)",
            color: hovered ? "var(--accent, #0891B2)" : "#E8E6E3",
          }}
        >
          {label}
        </span>
        <span
          className="block text-xs mt-0.5"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "#6B6B6F",
          }}
        >
          {subtitle}
        </span>
      </div>
      <span
        className="text-lg transition-all duration-300"
        style={{
          color: hovered ? "var(--accent, #0891B2)" : "#6B6B6F",
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
      className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-md border transition-all duration-300"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "#2A2A2E",
        backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent",
        color: "#E8E6E3",
      }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-300"
        width={18}
        height={18}
        strokeWidth={1.5}
        style={{ color: hovered ? "var(--accent, #0891B2)" : "#6B6B6F" }}
      />
      <span
        className="text-sm font-normal transition-colors duration-300"
        style={{
          fontFamily: "var(--font-overpass-mono)",
          color: hovered ? "var(--accent, #0891B2)" : "#8B8A87",
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
      className="inline-flex items-center justify-center transition-colors duration-300"
      style={{ color: hovered ? "var(--accent, #0891B2)" : "#6B6B6F" }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
    >
      <Icon width={20} height={20} strokeWidth={1.5} />
    </a>
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

// ==========================================================================
// Page
// ==========================================================================

const CASCADING_SECTIONS = 6; // narrative, what-i-do, work, writing, connect, footer

export default function DialogueNightPage() {
  const [typingDone, setTypingDone] = useState(false);
  const [headerComplete, setHeaderComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setTypingDone(true);
    }, TOTAL_INTRO_DELAY_MS);

    const headerTimer = setTimeout(() => {
      setHeaderComplete(true);
    }, HEADER_COMPLETE_MS);

    // Cascade sections in one by one after header completes
    const sectionTimers = [];
    for (let i = 0; i < CASCADING_SECTIONS; i++) {
      sectionTimers.push(
        setTimeout(() => {
          setVisibleSections((v) => v + 1);
        }, HEADER_COMPLETE_MS + (i + 1) * SECTION_STAGGER_MS)
      );
    }

    // Accent color cycle — synced to the 1800s (30 min) gradient cycle
    const CYCLE_DURATION = 1800000; // 30 minutes in ms
    const accentColors = [
      { pos: 0,    color: [96, 165, 250] },  // morning — soft blue
      { pos: 0.20, color: [8, 145, 178] },   // day — cyan
      { pos: 0.42, color: [217, 119, 6] },   // golden — amber
      { pos: 0.60, color: [192, 38, 119] },  // dusk — rose
      { pos: 0.78, color: [99, 90, 200] },   // night — indigo
      { pos: 1.0,  color: [96, 165, 250] },  // back to morning
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

    // Pick a random starting position in the cycle so each visit feels different
    const randomOffset = Math.random() * CYCLE_DURATION;
    const startTime = Date.now();

    // Set the CSS animation offset to match (negative delay = start partway through)
    const offsetSec = Math.round(randomOffset / 1000);
    document.documentElement.style.setProperty("--cycle-offset", `-${offsetSec}s`);

    const accentInterval = setInterval(() => {
      const accent = getAccent((Date.now() - startTime) + randomOffset);
      document.documentElement.style.setProperty("--accent", accent);
    }, 1000); // update every 1s — plenty smooth for 30min cycle

    // Set initial accent at random position
    const initialAccent = getAccent(randomOffset);
    document.documentElement.style.setProperty("--accent", initialAccent);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(headerTimer);
      sectionTimers.forEach(clearTimeout);
      clearInterval(accentInterval);
      document.documentElement.style.removeProperty("--accent");
    };
  }, []);

  // Character count for CSS steps()
  const charCount = GREETING.length;

  // Cascade style: section N becomes visible when visibleSections >= N
  const cascadeStyle = (visible, index) => ({
    opacity: visible >= index ? 1 : 0,
    transform: visible >= index ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  return (
    <div
      className={`${newsreader.variable} ${overpassMono.variable} min-h-screen dialogue-night-page`}
      style={{ backgroundColor: "#0D0F14", color: "#E8E6E3" }}
    >
      {/* ---- keyframes & animations ---- */}
      <style jsx global>{`
        /* --- Typewriter --- */
        @keyframes typing {
          from { width: 0; }
          to   { width: 100%; }
        }

        @keyframes blinkCaret {
          0%, 100% { border-color: var(--accent, #0891B2); }
          50%      { border-color: transparent; }
        }

        .typewriter-wrapper {
          display: inline-block;
          position: relative;
        }

        .typewriter-text {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid var(--accent, #0891B2);
          width: 0;
          animation:
            typing ${TYPING_DURATION_MS}ms steps(${charCount}, end) forwards,
            blinkCaret 0.7s step-end infinite;
          animation-delay: 0.15s;
        }

        /* --- Stagger-in after typing completes --- */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stagger-after-1 {
          opacity: 0;
          animation: fadeUp 0.8s ease-out ${SUBTITLE_DELAY_MS}ms forwards;
        }
        .stagger-after-1b {
          opacity: 0;
          animation: fadeUp 0.8s ease-out ${BELIEF_DELAY_MS}ms forwards;
        }
        .stagger-after-2 {
          opacity: 0;
          animation: fadeUp 0.8s ease-out ${ROLE_DELAY_MS}ms forwards;
        }
        .stagger-after-3 {
          opacity: 0;
          animation: fadeUp 0.6s ease-out ${SOCIALS_DELAY_MS}ms forwards;
        }

        /* --- Breathing: subtle scale pulse on main content --- */
        @keyframes breathe {
          0%, 100% { transform: scale(1.0); }
          50%      { transform: scale(1.003); }
        }

        .breathing {
          animation: breathe 8s ease-in-out infinite;
        }

        /* --- Teal accent pulse --- */
        @keyframes tealPulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.85; }
        }

        .teal-pulse {
          animation: tealPulse 4s ease-in-out infinite;
        }

        /* --- Social icon pile-in --- */
        @keyframes pileIn {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .social-pile-in {
          opacity: 0;
          display: inline-flex;
          animation: pileIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* --- Night cycle background --- */
        /* 5 phases cross-fading on a 1800s cycle — richer/deeper on dark background */

        .dialogue-night-page {
          position: relative;
        }

        /* Slow drift for each gradient layer */
        @keyframes driftA {
          0%   { background-position: 20% 30%; }
          50%  { background-position: 80% 70%; }
          100% { background-position: 20% 30%; }
        }

        @keyframes driftB {
          0%   { background-position: 70% 60%; }
          50%  { background-position: 30% 40%; }
          100% { background-position: 70% 60%; }
        }

        /* Cross-fade keyframes — each layer is visible for ~20% of the cycle
           with long overlapping fades. Total cycle: 1800s (30 minutes). */

        /* Phase 1: Morning — deeper blue, hint of dawn */
        @keyframes cycleMorning {
          0%   { opacity: 1; }
          15%  { opacity: 1; }
          25%  { opacity: 0; }
          85%  { opacity: 0; }
          95%  { opacity: 1; }
          100% { opacity: 1; }
        }

        /* Phase 2: Day — richer teal/cyan */
        @keyframes cycleDay {
          0%   { opacity: 0; }
          10%  { opacity: 0; }
          22%  { opacity: 1; }
          38%  { opacity: 1; }
          48%  { opacity: 0; }
          100% { opacity: 0; }
        }

        /* Phase 3: Golden hour — warm muted amber */
        @keyframes cycleGolden {
          0%   { opacity: 0; }
          33%  { opacity: 0; }
          43%  { opacity: 1; }
          55%  { opacity: 1; }
          65%  { opacity: 0; }
          100% { opacity: 0; }
        }

        /* Phase 4: Dusk — deep magenta/plum */
        @keyframes cycleDusk {
          0%   { opacity: 0; }
          50%  { opacity: 0; }
          60%  { opacity: 1; }
          72%  { opacity: 1; }
          82%  { opacity: 0; }
          100% { opacity: 0; }
        }

        /* Phase 5: Night — midnight indigo, nearly invisible */
        @keyframes cycleNight {
          0%   { opacity: 0; }
          68%  { opacity: 0; }
          78%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; }
        }

        .day-cycle-base {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-size: 200% 200%;
        }

        /* Morning: deeper blue tones */
        .day-cycle-morning {
          background:
            radial-gradient(ellipse 80% 60% at 25% 35%, rgba(56, 100, 190, 0.038) 0%, transparent 55%),
            radial-gradient(ellipse 50% 70% at 75% 60%, rgba(30, 58, 138, 0.022) 0%, transparent 50%);
          animation: cycleMorning 1800s ease-in-out infinite, driftA 45s ease-in-out infinite;
          animation-delay: var(--cycle-offset, 0s), 0s;
        }

        /* Day: richer teal/cyan */
        .day-cycle-day {
          background:
            radial-gradient(ellipse 80% 60% at 30% 40%, rgba(8, 145, 178, 0.040) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 70% 60%, rgba(6, 182, 212, 0.026) 0%, transparent 50%);
          animation: cycleDay 1800s ease-in-out infinite, driftB 40s ease-in-out infinite;
          animation-delay: var(--cycle-offset, 0s), 0s;
        }

        /* Golden: warm but muted amber */
        .day-cycle-golden {
          background:
            radial-gradient(ellipse 75% 55% at 35% 45%, rgba(180, 110, 10, 0.038) 0%, transparent 50%),
            radial-gradient(ellipse 55% 75% at 70% 55%, rgba(146, 76, 6, 0.026) 0%, transparent 55%);
          animation: cycleGolden 1800s ease-in-out infinite, driftA 50s ease-in-out infinite;
          animation-delay: var(--cycle-offset, 0s), 0s;
        }

        /* Dusk: deep magenta/plum */
        .day-cycle-dusk {
          background:
            radial-gradient(ellipse 70% 60% at 30% 50%, rgba(157, 23, 77, 0.038) 0%, transparent 50%),
            radial-gradient(ellipse 60% 70% at 75% 45%, rgba(88, 28, 135, 0.030) 0%, transparent 55%);
          animation: cycleDusk 1800s ease-in-out infinite, driftB 48s ease-in-out infinite;
          animation-delay: var(--cycle-offset, 0s), 0s;
        }

        /* Night: midnight indigo, nearly invisible */
        .day-cycle-night {
          background:
            radial-gradient(ellipse 85% 65% at 40% 45%, rgba(15, 10, 60, 0.040) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 65% 55%, rgba(30, 20, 100, 0.028) 0%, transparent 55%);
          animation: cycleNight 1800s ease-in-out infinite, driftA 42s ease-in-out infinite;
          animation-delay: var(--cycle-offset, 0s), 0s;
        }
      `}</style>

      {/* Night cycle gradient layers — bloom in as page cascades */}
      {(() => {
        const progress = visibleSections / CASCADING_SECTIONS; // 0 → 1
        const scale = headerComplete ? 0.7 + progress * 0.5 : 0.5; // 0.5 → 0.7 → 1.2
        const opacity = headerComplete ? 0.15 + progress * 0.85 : 0.08; // barely there → full
        const yShift = headerComplete ? (1 - progress) * -8 : -15; // starts high, settles to center
        return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${yShift}%)`,
          transformOrigin: "50% 30%", // bloom from upper area where the hero text lives
          transition: "opacity 2.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)",
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
              color: "#8B8A87",
            }}
          >
            I&rsquo;m a product designer and engineer who builds tools for
            creative teams.
          </p>

          <p
            className="stagger-after-1b mt-3 text-lg sm:text-xl leading-relaxed font-light italic"
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
              color: "#6B6B6F",
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
                  color: "#8B8A87",
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
                  color: "#8B8A87",
                }}
              >
                Currently at{" "}
                <span style={{ color: "#E8E6E3", fontWeight: 400 }}>
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
                  color: "#6B6B6F",
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
                  color: "#6B6B6F",
                }}
              >
                Selected work
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ProjectLine
                name="MotionStage"
                description="Pipeline tooling for motion-capture workflows at ILM."
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
                  color: "#8B8A87",
                }}
              >
                I write about the intersection of art, engineering, and product
                thinking in a blog called{" "}
                <span style={{ color: "#E8E6E3", fontWeight: 400 }}>
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
                className="inline-block mt-8 text-base font-semibold transition-colors duration-300 border-b-2 teal-pulse"
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
                  color: "#8B8A87",
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
          <footer className="border-t pt-8 pb-16 cascade-section" style={{ borderColor: "#2A2A2E", ...cascadeStyle(visibleSections, 6) }}>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "#6B6B6F",
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
