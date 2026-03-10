"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Azeret_Mono, Cormorant_Garamond } from "next/font/google";
import { Threads, GithubCircle, Linkedin, Youtube } from "iconoir-react";

const mono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});

/* ───────────────────────────────────────────
   Network node definitions
   ─────────────────────────────────────────── */

const networkNodes = [
  { id: 0, x: 12, y: 18, size: 6, color: "#3B82F6", pulse: 4.2 },
  { id: 1, x: 28, y: 32, size: 8, color: "#3B82F6", pulse: 3.5 },
  { id: 2, x: 72, y: 22, size: 5, color: "#F59E0B", pulse: 5.0 },
  { id: 3, x: 85, y: 45, size: 7, color: "#F59E0B", pulse: 3.8 },
  { id: 4, x: 18, y: 65, size: 5, color: "#8B5CF6", pulse: 4.6 },
  { id: 5, x: 55, y: 58, size: 6, color: "#3B82F6", pulse: 3.2 },
  { id: 6, x: 78, y: 72, size: 5, color: "#F59E0B", pulse: 4.0 },
  { id: 7, x: 42, y: 80, size: 4, color: "#8B5CF6", pulse: 5.2 },
];

const networkEdges = [
  [0, 1],
  [1, 2],
  [1, 5],
  [2, 3],
  [3, 5],
  [3, 6],
  [4, 5],
  [4, 7],
  [5, 6],
  [5, 7],
  [0, 4],
  [6, 7],
];

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */

const capabilities = [
  {
    label: "Product Design",
    description:
      "Shaping tools and interfaces that serve creative professionals — from ideation through production pipelines.",
  },
  {
    label: "Creative Tools",
    description:
      "Building software that disappears into the workflow — letting artists focus on the art, not the apparatus.",
  },
  {
    label: "Systems Design",
    description:
      "Architecting large-scale platforms where reliability and developer experience are first-class concerns.",
  },
];

const projects = [
  {
    label: "MotionStage",
    description:
      "A real-time review and collaboration platform for animation and VFX teams at ILM.",
  },
  {
    label: "PelagoDB",
    description:
      "A production data engine — high-throughput pipelines for managing assets across shows and sequences.",
  },
  {
    label: "KnowledgeDB",
    description:
      "An internal knowledge graph connecting people, projects, and institutional memory across the studio.",
  },
];

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrewpaxson",
  },
  {
    icon: GithubCircle,
    label: "GitHub",
    href: "https://github.com/paxsonsa",
  },
  {
    icon: Threads,
    label: "Threads",
    href: "https://www.threads.com/@paxsonsa",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@UCl1JA8NsoeGxRGHxE8Z0T9Q",
  },
];

/* ───────────────────────────────────────────
   Network background component
   ─────────────────────────────────────────── */

function NetworkBackground({ opacity }) {
  return (
    <div
      className="fixed inset-0 w-full h-screen pointer-events-none"
      style={{ opacity, transition: "opacity 0.4s ease-out", zIndex: 0 }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* SVG edges */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {networkEdges.map(([a, b], i) => (
          <line
            key={i}
            x1={networkNodes[a].x}
            y1={networkNodes[a].y}
            x2={networkNodes[b].x}
            y2={networkNodes[b].y}
            stroke="url(#edge-grad)"
            strokeWidth="0.08"
            strokeDasharray="0.6 0.6"
            style={{
              animation: `dashFlow ${6 + (i % 4) * 2}s linear infinite`,
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {networkNodes.map((node) => (
        <div
          key={node.id}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: node.color,
            boxShadow: `0 0 ${node.size * 3}px ${node.color}80, 0 0 ${node.size * 6}px ${node.color}30`,
            transform: "translate(-50%, -50%)",
            animation: `nodePulse ${node.pulse}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────
   Main page
   ─────────────────────────────────────────── */

export default function SignalsPage() {
  const [networkOpacity, setNetworkOpacity] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      // Fade from 1 at top to 0.05 at 1.5x viewport height
      const fade = Math.max(0.05, 1 - scrollY / (windowH * 1.5));
      setNetworkOpacity(fade);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`${mono.variable} ${serif.variable} bg-[#060B18] min-h-screen text-white`}
    >
      <style jsx global>{`
        @keyframes nodePulse {
          0%,
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(0.8);
          }
        }

        @keyframes dashFlow {
          to {
            stroke-dashoffset: -20;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Network background — fixed, behind everything */}
      <NetworkBackground opacity={networkOpacity} />

      {/* ═══════════════════════════════════════
          CONTENT — normal scrolling flow
          ═══════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* ─── Hero ─── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">
          <h1
            className={`${serif.className} text-6xl md:text-8xl lg:text-9xl font-light text-white/95 tracking-tight text-center`}
            style={{
              textShadow: "0 0 80px rgba(255,255,255,0.06)",
              animation: "fadeInUp 1s ease-out 0.2s both",
            }}
          >
            Andrew Paxson
          </h1>

          <p
            className={`${mono.className} mt-5 text-sm md:text-base tracking-[0.25em] uppercase text-white/40 text-center`}
            style={{ animation: "fadeInUp 1s ease-out 0.5s both" }}
          >
            Staff Engineer at Industrial Light &amp; Magic
          </p>

          <p
            className={`${serif.className} mt-6 text-2xl md:text-3xl text-white/50 font-light italic max-w-lg mx-auto text-center`}
            style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}
          >
            Designing systems where art meets technology
          </p>

          {/* Social icons row */}
          <div
            className="mt-8 flex items-center gap-6"
            style={{ animation: "fadeInUp 1s ease-out 1.1s both" }}
          >
            {socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/30 hover:text-white/80 transition-colors duration-300"
              >
                <s.icon className="w-5 h-5" strokeWidth={1.5} />
                <span
                  className={`${mono.className} text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline`}
                >
                  {s.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="mt-20 flex flex-col items-center gap-2 text-white/20"
            style={{ animation: "fadeIn 1s ease-out 1.8s both" }}
          >
            <span
              className={`${mono.className} text-xs tracking-widest uppercase`}
            >
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </section>

        {/* ─── About ─── */}
        <section className="max-w-3xl mx-auto px-6 py-32">
          <p
            className={`${mono.className} text-sm tracking-[0.25em] uppercase text-white/30 mb-6`}
          >
            About
          </p>
          <p
            className={`${serif.className} text-xl md:text-2xl text-white/60 font-light leading-relaxed`}
          >
            For over a decade I have been building tools and systems for creative
            teams — the invisible architecture that lets artists focus on the
            art. At Industrial Light &amp; Magic, that means production
            platforms, data pipelines, and collaborative software for some of the
            most complex visual storytelling on the planet. I care about
            developer experience, design clarity, and building things that last.
          </p>
        </section>

        {/* ─── Capabilities ─── */}
        <section className="max-w-3xl mx-auto px-6 py-24">
          <p
            className={`${mono.className} text-sm tracking-[0.25em] uppercase text-white/30 mb-10`}
          >
            Capabilities
          </p>
          <div className="space-y-8">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
              >
                <h3
                  className={`${mono.className} text-sm md:text-base tracking-wider uppercase text-blue-400 mb-3`}
                >
                  {cap.label}
                </h3>
                <p
                  className={`${serif.className} text-xl md:text-2xl text-white/60 font-light leading-relaxed`}
                >
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Work ─── */}
        <section className="max-w-3xl mx-auto px-6 py-24">
          <p
            className={`${mono.className} text-sm tracking-[0.25em] uppercase text-white/30 mb-10`}
          >
            Work
          </p>
          <div className="space-y-8">
            {projects.map((proj) => (
              <div
                key={proj.label}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
              >
                <h3
                  className={`${mono.className} text-sm md:text-base tracking-wider uppercase text-amber-400 mb-3`}
                >
                  {proj.label}
                </h3>
                <p
                  className={`${serif.className} text-xl md:text-2xl text-white/60 font-light leading-relaxed`}
                >
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Writing ─── */}
        <section className="max-w-3xl mx-auto px-6 py-24">
          <p
            className={`${mono.className} text-sm tracking-[0.25em] uppercase text-white/30 mb-10`}
          >
            Writing
          </p>
          <Link
            href="https://andrewpaxson.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 rounded-xl border border-white/[0.06] hover:border-blue-500/30 transition-all duration-500 hover:bg-blue-500/[0.03] bg-white/[0.02] backdrop-blur-sm"
          >
            <h3
              className={`${serif.className} text-4xl md:text-5xl font-light text-white/90 group-hover:text-blue-400 transition-colors duration-300`}
            >
              Mosaic &amp; Monoliths
            </h3>
            <p
              className={`${serif.className} mt-4 text-xl md:text-2xl text-white/50 font-light leading-relaxed`}
            >
              Writing on design engineering, creative infrastructure, and the
              systems behind the screen.
            </p>
            <span
              className={`${mono.className} inline-block mt-6 text-sm tracking-widest uppercase text-white/30 group-hover:text-blue-400 transition-colors duration-300`}
            >
              Read on Substack &rarr;
            </span>
          </Link>
        </section>

        {/* ─── Connect ─── */}
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-32">
          <p
            className={`${mono.className} text-sm tracking-[0.25em] uppercase text-white/30 mb-10`}
          >
            Connect
          </p>

          {/* Primary links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              {
                icon: Linkedin,
                label: "Resume & Career",
                sub: "LinkedIn",
                href: "https://www.linkedin.com/in/andrewpaxson",
                accent: "hover:border-blue-500/30",
              },
              {
                icon: GithubCircle,
                label: "Engineering Work",
                sub: "GitHub",
                href: "https://github.com/paxsonsa",
                accent: "hover:border-slate-500/40",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-5 p-6 rounded-xl border border-white/[0.06] ${link.accent} transition-all duration-500 hover:bg-white/[0.03] bg-white/[0.02] backdrop-blur-sm`}
              >
                <link.icon
                  className="w-8 h-8 text-white/30 group-hover:text-white/80 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <div>
                  <span
                    className={`${mono.className} block text-base text-white/80 group-hover:text-white transition-colors duration-300`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`${mono.className} block text-sm text-white/30 tracking-wider uppercase mt-1`}
                  >
                    {link.sub}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Threads,
                label: "@paxsonsa",
                sub: "Threads",
                href: "https://www.threads.com/@paxsonsa",
              },
              {
                icon: Youtube,
                label: "Talks & Demos",
                sub: "YouTube",
                href: "https://www.youtube.com/@UCl1JA8NsoeGxRGHxE8Z0T9Q",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:bg-white/[0.02] bg-white/[0.01] backdrop-blur-sm"
              >
                <link.icon
                  className="w-6 h-6 text-white/25 group-hover:text-white/70 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <div>
                  <span
                    className={`${mono.className} block text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`${mono.className} block text-xs text-white/25 tracking-wider uppercase mt-0.5`}
                  >
                    {link.sub}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 pt-16 mt-16 border-t border-white/[0.05]">
            <div
              className="w-2 h-2 rounded-full bg-green-500"
              style={{
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                animation: "nodePulse 3s ease-in-out infinite",
              }}
            />
            <span
              className={`${mono.className} text-xs tracking-[0.3em] uppercase text-white/20`}
            >
              Signal Active
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
