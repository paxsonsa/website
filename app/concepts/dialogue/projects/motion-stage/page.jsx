"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Newsreader, Overpass_Mono } from "next/font/google";
import { ArrowLeft } from "iconoir-react";

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

// --- Timing ---
const BLOOM_DELAY_MS = 200; // bloom starts almost immediately
const CONTENT_DELAY_MS = 800; // content fades in after bloom opens
const SECTION_STAGGER_MS = 300;
const CASCADING_SECTIONS = 5; // overview, role, approach, outcomes, nav

// --- Scroll reveal ---
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform 1.1s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function MotionStagePage() {
  const router = useRouter();
  const [pageVisible, setPageVisible] = useState(false);
  const [pageExiting, setPageExiting] = useState(false);
  const [bloomStarted, setBloomStarted] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);

  // Fade page in on mount
  useEffect(() => {
    requestAnimationFrame(() => setPageVisible(true));
  }, []);

  const navigateWithFade = useCallback((href) => {
    setPageExiting(true);
    setTimeout(() => router.push(href), 500);
  }, [router]);

  // Gradient drift
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
      if (isTouch) { t.x *= 0.98; t.y *= 0.98; }
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
    // Bloom opens first
    const bloomTimer = setTimeout(() => setBloomStarted(true), BLOOM_DELAY_MS);
    // Then content fades in
    const contentTimer = setTimeout(() => setContentReady(true), CONTENT_DELAY_MS);
    // Cascade sections
    const sectionTimers = [];
    for (let i = 0; i < CASCADING_SECTIONS; i++) {
      sectionTimers.push(
        setTimeout(() => setVisibleSections((v) => v + 1), CONTENT_DELAY_MS + (i + 1) * SECTION_STAGGER_MS)
      );
    }

    // Accent color — use the same cycle as Dialogue
    const CYCLE_DURATION = 1800000;
    const accentColors = [
      { pos: 0, color: [96, 165, 250] },
      { pos: 0.20, color: [8, 145, 178] },
      { pos: 0.42, color: [217, 119, 6] },
      { pos: 0.60, color: [192, 38, 119] },
      { pos: 0.78, color: [99, 90, 200] },
      { pos: 1.0, color: [96, 165, 250] },
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
    document.documentElement.style.setProperty("--accent", getAccent(randomOffset));

    const accentInterval = setInterval(() => {
      document.documentElement.style.setProperty("--accent", getAccent((Date.now() - startTime) + randomOffset));
    }, 1000);

    return () => {
      clearTimeout(bloomTimer);
      clearTimeout(contentTimer);
      sectionTimers.forEach(clearTimeout);
      clearInterval(accentInterval);
      document.documentElement.style.removeProperty("--accent");
    };
  }, []);

  const cascadeStyle = (visible, index) => ({
    opacity: visible >= index ? 1 : 0,
    transform: visible >= index ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  // Bloom phases
  const progress = visibleSections / CASCADING_SECTIONS;
  let bloomScale, bloomOpacity, bloomY;
  if (!bloomStarted) {
    bloomScale = 0.5; bloomOpacity = 0.04; bloomY = 15;
  } else if (visibleSections === 0) {
    bloomScale = 0.85; bloomOpacity = 0.35; bloomY = 6;
  } else {
    bloomScale = 0.85 + progress * 0.35;
    bloomOpacity = 0.35 + progress * 0.65;
    bloomY = 6 - progress * 6;
  }

  return (
    <div
      className={`${newsreader.variable} ${overpassMono.variable} min-h-screen`}
      style={{
        backgroundColor: "#FAFAF7",
        color: "#18181B",
        opacity: pageExiting ? 0 : pageVisible ? 1 : 0,
        transform: pageExiting ? "translateY(-4px)" : pageVisible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <style jsx global>{`
        .project-gradient-base {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-size: 200% 200%;
        }
        @keyframes driftA {
          0%, 100% { background-position: 50% 50%; }
          33% { background-position: 45% 55%; }
          66% { background-position: 55% 45%; }
        }
        @keyframes driftB {
          0%, 100% { background-position: 50% 50%; }
          33% { background-position: 55% 45%; }
          66% { background-position: 45% 55%; }
        }
        .project-gradient-a {
          background:
            radial-gradient(ellipse 80% 60% at 30% 40%, rgba(8, 145, 178, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 70% 60%, rgba(8, 145, 178, 0.12) 0%, transparent 50%);
          animation: driftA 45s ease-in-out infinite;
        }
        .project-gradient-b {
          background:
            radial-gradient(ellipse 75% 55% at 65% 35%, rgba(96, 165, 250, 0.14) 0%, transparent 55%),
            radial-gradient(ellipse 55% 75% at 35% 65%, rgba(99, 90, 200, 0.10) 0%, transparent 50%);
          animation: driftB 50s ease-in-out infinite;
        }
      `}</style>

      {/* Gradient bloom */}
      <div
        ref={driftElRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          "--drift-x": "0%",
          "--drift-y": "0%",
          opacity: bloomOpacity,
          transform: `scale(${bloomScale}) translate(var(--drift-x), calc(${bloomY}% + var(--drift-y)))`,
          transformOrigin: "50% 30%",
          transition: bloomStarted
            ? "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "none",
        }}
      >
        <div className="project-gradient-base project-gradient-a" />
        <div className="project-gradient-base project-gradient-b" />
      </div>

      {/* Content */}
      <main
        className="mx-auto px-6 sm:px-8 relative"
        style={{ maxWidth: "720px", zIndex: 1 }}
      >
        {/* Back link */}
        <div
          className="pt-8 sm:pt-12"
          style={{
            opacity: contentReady ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        >
          <button
            onClick={() => navigateWithFade("/concepts/dialogue")}
            className="inline-flex items-center gap-2 text-sm transition-colors duration-[375ms] cursor-pointer"
            style={{
              fontFamily: "var(--font-overpass-mono)",
              color: "#A1A1AA",
              background: "none",
              border: "none",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent, #0891B2)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
          >
            <ArrowLeft width={16} height={16} />
            Back
          </button>
        </div>

        {/* Hero */}
        <section
          className="pt-16 sm:pt-24 pb-16"
          style={{
            opacity: contentReady ? 1 : 0,
            transform: contentReady ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <p
            className="text-sm uppercase tracking-widest mb-4"
            style={{
              fontFamily: "var(--font-overpass-mono)",
              color: "#A1A1AA",
            }}
          >
            Case Study
          </p>
          <h1
            className="text-4xl sm:text-5xl font-light leading-tight"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            MotionStage
          </h1>
          <p
            className="mt-4 text-xl sm:text-2xl leading-relaxed font-light"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "#3F3F46",
            }}
          >
            Pipeline tooling for motion-capture workflows at Industrial Light &amp; Magic.
          </p>
          <div
            className="mt-6 flex flex-wrap gap-3"
            style={{ fontFamily: "var(--font-overpass-mono)" }}
          >
            {["Pipeline", "React", "Python", "USD"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border"
                style={{ borderColor: "#E4E4E7", color: "#71717A" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 1. Overview */}
        <section className="pb-20 cascade-section" style={cascadeStyle(visibleSections, 1)}>
          <Reveal>
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-overpass-mono)", color: "#A1A1AA" }}
            >
              Overview
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: "#3F3F46" }}
            >
              Motion-capture sessions at ILM generate terabytes of data per day.
              Artists needed a way to review, tag, and route takes through the
              production pipeline without losing context or time.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              className="mt-6 text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: "#3F3F46" }}
            >
              MotionStage is the tool I designed and built to solve that &mdash;
              a real-time review environment that connects the capture stage to
              the rest of the pipeline.
            </p>
          </Reveal>
        </section>

        {/* 2. Role & Scope */}
        <section className="pb-20 cascade-section" style={cascadeStyle(visibleSections, 2)}>
          <Reveal>
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-overpass-mono)", color: "#A1A1AA" }}
            >
              My Role
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {[
                "Led product design from research through shipped software.",
                "Wrote the core pipeline integration layer in Python.",
                "Built the review UI in React with real-time WebSocket updates.",
                "Coordinated with mocap supervisors and pipeline TDs to validate workflows.",
              ].map((line) => (
                <p
                  key={line}
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-newsreader)", color: "#18181B" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 3. Approach */}
        <section className="pb-20 cascade-section" style={cascadeStyle(visibleSections, 3)}>
          <Reveal>
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-overpass-mono)", color: "#A1A1AA" }}
            >
              Approach
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light italic"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--accent, #0891B2)",
              }}
            >
              The best pipeline tools feel like extensions of the artist&rsquo;s
              hands &mdash; fast, invisible, and always in context.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              className="mt-6 text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: "#3F3F46" }}
            >
              I started with two weeks of on-stage observation, mapping the
              actual workflow artists used versus the one we assumed. The gap
              was significant. From there, the design focused on three
              principles: zero-click context, live data, and pipeline-native
              output.
            </p>
          </Reveal>
        </section>

        {/* 4. Outcomes */}
        <section className="pb-20 cascade-section" style={cascadeStyle(visibleSections, 4)}>
          <Reveal>
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-overpass-mono)", color: "#A1A1AA" }}
            >
              Outcomes
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              {[
                { metric: "60%", label: "reduction in take-review turnaround time" },
                { metric: "3x", label: "increase in takes tagged per session" },
                { metric: "Zero", label: "manual file transfers after deployment" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-4">
                  <span
                    className="text-3xl sm:text-4xl font-light"
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      color: "var(--accent, #0891B2)",
                    }}
                  >
                    {item.metric}
                  </span>
                  <span
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      color: "#3F3F46",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 5. Navigation */}
        <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 5)}>
          <div className="border-t pt-8" style={{ borderColor: "#E4E4E7" }}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigateWithFade("/concepts/dialogue")}
                className="text-sm transition-colors duration-[375ms] cursor-pointer"
                style={{
                  fontFamily: "var(--font-overpass-mono)",
                  color: "#A1A1AA",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent, #0891B2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
              >
                &larr; All Work
              </button>
              <Link
                href="/concepts/dialogue/projects/motion-stage"
                className="text-sm transition-colors duration-[375ms]"
                style={{
                  fontFamily: "var(--font-overpass-mono)",
                  color: "#A1A1AA",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent, #0891B2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
              >
                Next Project &rarr;
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t pt-8 pb-16" style={{ borderColor: "#E4E4E7" }}>
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-overpass-mono)",
              color: "#A1A1AA",
            }}
          >
            &copy; 2025 Andrew Paxson
          </p>
        </footer>
      </main>
    </div>
  );
}
