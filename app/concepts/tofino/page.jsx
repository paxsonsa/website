"use client";

import { useEffect, useRef, useState } from "react";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Linkedin, GithubCircle, Threads, Youtube } from "iconoir-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

// ─── Color Palette ──────────────────────────────────────────────
const C = {
  bg: "#0C1210",
  text: "#D6E8DF",
  copper: "#C46A3F",
  pacific: "#1A5C5C",
  fog: "#7A9188",
};

// ─── Scroll-reveal hook ─────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal(0.08);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Breathing Divider ──────────────────────────────────────────
function BreathingDivider() {
  return (
    <div className="py-24 max-w-[900px] mx-auto px-6">
      <div
        className="h-px breathing-line"
        style={{ background: C.fog, opacity: 0.15, transformOrigin: "center" }}
      />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════
export default function TofinoPage() {
  return (
    <div
      className={`${playfair.variable} ${jetbrains.variable} min-h-screen relative`}
      style={{ background: C.bg, color: C.text }}
    >
      {/* ── Global styles / keyframes ─────────────────────────── */}
      <style jsx global>{`
        ::selection {
          background: ${C.copper};
          color: ${C.bg};
        }

        /* ── FOG DRIFT ─────────────────────────────────────── */
        @keyframes fogDrift1 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(10%); }
        }
        @keyframes fogDrift2 {
          0% { transform: translateX(10%); }
          100% { transform: translateX(-60%); }
        }
        @keyframes fogDrift3 {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(20%); }
        }
        @keyframes fogDrift4 {
          0% { transform: translateX(5%); }
          100% { transform: translateX(-45%); }
        }

        .fog-layer {
          position: fixed;
          left: 0;
          width: 400%;
          pointer-events: none;
          will-change: transform;
          z-index: 50;
        }
        .fog-1 {
          top: 10%;
          height: 200px;
          animation: fogDrift1 40s ease-in-out infinite alternate;
          opacity: 0.035;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(214, 232, 223, 0.5) 15%,
            rgba(214, 232, 223, 0.8) 30%,
            transparent 50%,
            rgba(214, 232, 223, 0.4) 70%,
            transparent 100%
          );
          filter: blur(40px);
        }
        .fog-2 {
          top: 35%;
          height: 160px;
          animation: fogDrift2 28s ease-in-out infinite alternate;
          opacity: 0.05;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(214, 232, 223, 0.3) 20%,
            rgba(214, 232, 223, 0.7) 40%,
            rgba(214, 232, 223, 0.5) 55%,
            transparent 75%,
            rgba(214, 232, 223, 0.2) 90%,
            transparent 100%
          );
          filter: blur(50px);
        }
        .fog-3 {
          top: 60%;
          height: 250px;
          animation: fogDrift3 18s ease-in-out infinite alternate;
          opacity: 0.04;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(214, 232, 223, 0.6) 10%,
            transparent 30%,
            rgba(214, 232, 223, 0.9) 50%,
            rgba(214, 232, 223, 0.3) 70%,
            transparent 100%
          );
          filter: blur(60px);
        }
        .fog-4 {
          top: 80%;
          height: 180px;
          animation: fogDrift4 35s ease-in-out infinite alternate;
          opacity: 0.025;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(214, 232, 223, 0.4) 25%,
            rgba(214, 232, 223, 0.7) 45%,
            transparent 65%,
            rgba(214, 232, 223, 0.5) 85%,
            transparent 100%
          );
          filter: blur(45px);
        }

        /* ── RAIN ──────────────────────────────────────────── */
        @keyframes rainFall {
          0% { background-position: 0 0; }
          100% { background-position: 0 300px; }
        }
        .rain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: repeating-linear-gradient(
            180deg,
            transparent,
            transparent 6px,
            rgba(214, 232, 223, 0.025) 6px,
            rgba(214, 232, 223, 0.025) 7px
          );
          background-size: 100% 300px;
          animation: rainFall 8s linear infinite;
        }

        /* ── BREATHING DIVIDERS ────────────────────────────── */
        @keyframes breathe {
          0%, 100% { transform: scaleX(0.6); opacity: 0.1; }
          50% { transform: scaleX(1); opacity: 0.2; }
        }
        .breathing-line {
          animation: breathe 6s ease-in-out infinite;
        }

        /* ── WORK BLOCK HOVER ──────────────────────────────── */
        .work-block .work-line {
          width: 0;
          transition: width 0.8s cubic-bezier(.16,1,.3,1);
        }
        .work-block:hover .work-line {
          width: 100%;
        }
        .work-block:hover .work-title {
          color: ${C.copper} !important;
        }

        /* ── CONNECT LINK HOVER ────────────────────────────── */
        .connect-link {
          transition: color 0.3s ease;
        }
        .connect-link:hover {
          color: ${C.copper} !important;
        }
        .connect-link:hover .connect-arrow {
          transform: translateX(8px);
          opacity: 1;
        }
        .connect-arrow {
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        }

        /* ── NOISE TEXTURE ─────────────────────────────────── */
        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* ── Noise texture ─────────────────────────────────────── */}
      <svg className="noise-overlay" width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* ── Fog layers (FIXED, drift over everything) ─────────── */}
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />
      <div className="fog-layer fog-3" />
      <div className="fog-layer fog-4" />

      {/* ── Rain ──────────────────────────────────────────────── */}
      <div className="rain-overlay" />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO — full viewport, the edge of the continent        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen flex flex-col items-start justify-end overflow-hidden px-6 md:px-16 pb-[12vh]">
        {/* Sky-to-ocean gradient with horizon */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                180deg,
                #080E0B 0%,
                #0C1210 20%,
                #0E1614 40%,
                #111A17 55%,
                ${C.copper}08 58%,
                ${C.copper}04 62%,
                #14201C 65%,
                #182924 75%,
                #1A302A 85%,
                #152420 100%
              )
            `,
          }}
        />

        {/* Horizon line — the edge */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: "40%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.fog}25, ${C.copper}18, ${C.fog}20, transparent)`,
          }}
        />

        {/* Hero content — anchored low, massive */}
        <div className="relative z-10 max-w-[1400px]">
          <h1
            className="font-black leading-[0.85] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(4rem, 10vw, 12rem)",
              color: C.text,
              textShadow: `0 4px 80px rgba(12,18,16,0.9), 0 0 120px ${C.bg}`,
            }}
          >
            Andrew
            <br />
            Paxson
          </h1>

          <p
            className="text-lg md:text-xl tracking-[0.25em] uppercase mb-8"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: C.copper,
            }}
          >
            Product Designer &amp; Software Engineer
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {[
              { href: "https://www.linkedin.com/in/andrewpaxson", icon: Linkedin, label: "LinkedIn" },
              { href: "https://github.com/paxsonsa", icon: GithubCircle, label: "GitHub" },
              { href: "https://www.threads.com/@paxsonsa", icon: Threads, label: "Threads" },
              { href: "https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q", icon: Youtube, label: "YouTube" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ color: C.fog }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.copper)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.fog)}
              >
                <Icon width={24} height={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          style={{ color: C.fog, opacity: 0.3 }}
        >
          <div
            className="w-px h-12 mx-auto mb-2"
            style={{
              background: `linear-gradient(to bottom, transparent, ${C.fog})`,
            }}
          />
          <span
            className="text-[10px] tracking-[0.4em] uppercase block text-center"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ABOUT — emerging through mist                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10">
        <div className="max-w-[900px] mx-auto px-6 md:px-16 pt-32 pb-8">
          <Reveal>
            <p
              className="text-xl md:text-2xl leading-relaxed"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: C.fog,
                lineHeight: 2,
              }}
            >
              10+ years building at the intersection of design and engineering.
              Currently a{" "}
              <span style={{ color: C.text, fontWeight: 700 }}>
                Staff Engineer at Industrial Light &amp; Magic
              </span>
              , crafting tools that empower creative teams to do impossible work.
            </p>
          </Reveal>
        </div>
      </section>

      <BreathingDivider />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CAPABILITIES — raw text, no cards                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-[900px] mx-auto px-6 md:px-16 pb-8">
        <Reveal>
          <h2
            className="text-4xl md:text-6xl font-black mb-20"
            style={{
              fontFamily: "var(--font-playfair)",
              color: C.copper,
            }}
          >
            What I Do
          </h2>
        </Reveal>

        <div className="space-y-20">
          {[
            {
              title: "Product Design",
              desc: "Research-driven design systems and user experiences that scale across complex creative workflows. From first sketch to shipped product.",
            },
            {
              title: "Systems Engineering",
              desc: "High-performance tooling, APIs, and infrastructure. Rust, C++, Python \u2014 whatever the problem demands. Built to last.",
            },
            {
              title: "Creative Technology",
              desc: "Bridging the gap between artists and engineers. Making powerful technology feel intuitive. Making the impossible feel obvious.",
            },
          ].map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.15}>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: C.text,
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  className="text-lg md:text-xl max-w-[700px]"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: C.fog,
                    lineHeight: 1.9,
                  }}
                >
                  {cap.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <BreathingDivider />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* WORK — MASSIVE project names                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 pb-8">
        <Reveal>
          <h2
            className="text-4xl md:text-6xl font-black mb-20"
            style={{
              fontFamily: "var(--font-playfair)",
              color: C.copper,
            }}
          >
            Selected Work
          </h2>
        </Reveal>

        <div>
          {[
            {
              title: "MotionStage",
              desc: "A real-time motion capture review tool for animation teams \u2014 rethinking how directors give feedback on performance.",
              href: "/work",
            },
            {
              title: "PelagoDB",
              desc: "High-performance database tooling for visual effects pipelines, handling millions of assets across global productions.",
              href: "/work",
            },
            {
              title: "KnowledgeDB",
              desc: "A personal knowledge graph system \u2014 structured memory for creative and technical research.",
              href: "/work",
            },
          ].map((project, i) => (
            <Reveal key={project.title} delay={i * 0.12}>
              <Link href={project.href}>
                <div className="work-block group py-12 md:py-16 cursor-pointer">
                  <h3
                    className="work-title font-black leading-[0.9] mb-4 transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "clamp(2.5rem, 6vw, 8rem)",
                      color: C.text,
                    }}
                  >
                    {project.title}
                  </h3>
                  {/* Animated copper line */}
                  <div
                    className="work-line h-px mb-6"
                    style={{ background: C.copper }}
                  />
                  <p
                    className="text-lg md:text-xl max-w-[650px]"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: C.fog,
                      lineHeight: 1.8,
                    }}
                  >
                    {project.desc}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <BreathingDivider />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* WRITING — Mosaic & Monoliths                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-[900px] mx-auto px-6 md:px-16 py-8">
        <Reveal>
          <h2
            className="text-5xl md:text-7xl font-bold italic mb-8"
            style={{
              fontFamily: "var(--font-playfair)",
              color: C.text,
            }}
          >
            Mosaic &amp;
            <br />
            Monoliths
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="text-lg md:text-xl mb-10 max-w-[650px]"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: C.fog,
              lineHeight: 1.9,
            }}
          >
            Writing about the craft of building &mdash; from systems architecture to
            design philosophy. Notes on making things that matter.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="https://andrewpaxson.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-link inline-flex items-center gap-4 text-xl"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: C.text,
            }}
          >
            Read on Substack
            <span
              className="connect-arrow inline-block"
              style={{ color: C.copper }}
            >
              &rarr;
            </span>
          </a>
        </Reveal>
      </section>

      <BreathingDivider />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CONNECT — clean labeled links                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-[900px] mx-auto px-6 md:px-16 pb-8">
        <Reveal>
          <h2
            className="text-4xl md:text-6xl font-black mb-20"
            style={{
              fontFamily: "var(--font-playfair)",
              color: C.copper,
            }}
          >
            Connect
          </h2>
        </Reveal>

        <div className="space-y-10">
          {[
            {
              href: "https://www.linkedin.com/in/andrewpaxson",
              icon: Linkedin,
              title: "LinkedIn",
              sub: "Resume & Career",
            },
            {
              href: "https://github.com/paxsonsa",
              icon: GithubCircle,
              title: "GitHub",
              sub: "Engineering Work",
            },
            {
              href: "https://www.threads.com/@paxsonsa",
              icon: Threads,
              title: "Threads",
              sub: "@paxsonsa",
            },
            {
              href: "https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q",
              icon: Youtube,
              title: "YouTube",
              sub: "Talks & Demos",
            },
          ].map(({ href, icon: Icon, title, sub }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="connect-link flex items-center gap-6 group"
                style={{ color: C.text }}
              >
                <Icon
                  width={24}
                  height={24}
                  className="flex-shrink-0"
                  style={{ color: C.fog }}
                />
                <div>
                  <span
                    className="text-xl md:text-2xl font-bold block"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {sub}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: C.fog,
                    }}
                  >
                    {title}
                  </span>
                </div>
                <span
                  className="connect-arrow ml-auto text-lg"
                  style={{ color: C.copper }}
                >
                  &rarr;
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FOOTER                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <footer className="relative z-10 py-32 text-center">
        <p
          className="text-sm tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: C.fog,
            opacity: 0.4,
          }}
        >
          Built where land meets ocean.
        </p>
      </footer>
    </div>
  );
}
