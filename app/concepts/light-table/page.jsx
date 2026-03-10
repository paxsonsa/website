"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Space_Mono, Instrument_Serif } from "next/font/google";
import { Threads, GithubCircle, Linkedin, Youtube } from "iconoir-react";

/* ─── Fonts ─────────────────────────────────────────────────────────── */

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

/* ─── Data ──────────────────────────────────────────────────────────── */

const capabilities = [
  {
    label: "COMP",
    title: "Product Design",
    description:
      "End-to-end product thinking from research and strategy through interaction design, prototyping, and visual craft. I work closest to the material.",
  },
  {
    label: "LAYER",
    title: "Engineering Leadership",
    description:
      "Building and mentoring teams that ship high-quality software. Architecture decisions, code review culture, and sustainable velocity.",
  },
  {
    label: "PASS",
    title: "Creative Tooling",
    description:
      "Designing and building bespoke software for artists and technical directors — tools that disappear into the workflow.",
  },
];

const workItems = [
  {
    title: "MotionStage",
    category: "Design System + Platform",
    description:
      "A unified motion capture review platform used across ILM productions. Real-time 3D playback, annotation layers, and artist-first workflows.",
    layers: ["Interface Design", "WebGL Pipeline", "Artist Tools"],
    format: "4K | 23.976fps | EXR",
  },
  {
    title: "PelagoDB",
    category: "Data Infrastructure",
    description:
      "Production asset database serving thousands of artists. Designed the query interface and visualization layer for navigating massive VFX datasets.",
    layers: ["Query UX", "Data Viz", "Pipeline Integration"],
    format: "2K | 24fps | ACES",
  },
  {
    title: "KnowledgeDB",
    category: "Internal Product",
    description:
      "Institutional knowledge capture system. Semantic search, relationship mapping, and contextual surfacing of tribal knowledge across productions.",
    layers: ["Search UX", "Graph Viz", "Knowledge Capture"],
    format: "HD | 30fps | sRGB",
  },
];

const socials = [
  {
    label: "Threads",
    href: "https://www.threads.com/@paxsonsa",
    icon: Threads,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q",
    icon: Youtube,
  },
];

const navSocials = [
  {
    label: "Threads",
    href: "https://www.threads.com/@paxsonsa",
    icon: Threads,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/andrewpaxson",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/paxsonsa",
    icon: GithubCircle,
  },
];

/* ─── Film Grain SVG Filter ─────────────────────────────────────────── */

function FilmGrain() {
  return (
    <svg className="fixed inset-0 w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─── Timecode Display ──────────────────────────────────────────────── */

function Timecode() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 576000); // ~6.67 hours at 24fps
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  const totalFrames = frame;
  const ff = totalFrames % 24;
  const ss = Math.floor(totalFrames / 24) % 60;
  const mm = Math.floor(totalFrames / 24 / 60) % 60;
  const hh = Math.floor(totalFrames / 24 / 3600);

  const pad = (n, d = 2) => String(n).padStart(d, "0");

  return (
    <span className={`${spaceMono.className} text-xs tracking-wider text-white/30`}>
      {pad(hh)}:{pad(mm)}:{pad(ss)}:{pad(ff)}
    </span>
  );
}

/* ─── RGB Channel Indicator ─────────────────────────────────────────── */

function ChannelIndicator({ className = "" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-red-500/60" />
      <div className="w-2 h-2 rounded-full bg-green-500/60" />
      <div className="w-2 h-2 rounded-full bg-blue-500/60" />
    </div>
  );
}

/* ─── Render Progress Bar ───────────────────────────────────────────── */

function RenderProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.15));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className={`${spaceMono.className} text-[11px] tracking-wider uppercase text-white/30`}>
        RENDER
      </span>
      <div className="w-32 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, rgba(212,165,116,0.6), rgba(91,164,207,0.6))",
          }}
        />
      </div>
      <span className={`${spaceMono.className} text-[11px] text-white/25`}>
        {Math.floor(progress)}%
      </span>
    </div>
  );
}

/* ─── Node Connector (between sections) ─────────────────────────────── */

function NodeConnector() {
  return (
    <div className="flex flex-col items-center py-6 boot-content">
      <div className="w-2.5 h-2.5 rounded-full border border-white/15 bg-white/[0.04]" />
      <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
    </div>
  );
}

/* ─── Viewport Frame Lines ──────────────────────────────────────────── */

function ViewportFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 hidden md:block">
      {/* Corner brackets — animated on boot */}
      <div className="absolute top-6 left-6 w-8 h-8 viewport-corner viewport-corner-tl" />
      <div className="absolute top-6 right-6 w-8 h-8 viewport-corner viewport-corner-tr" />
      <div className="absolute bottom-6 left-6 w-8 h-8 viewport-corner viewport-corner-bl" />
      <div className="absolute bottom-6 right-6 w-8 h-8 viewport-corner viewport-corner-br" />
      {/* Safe-area lines */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-white/[0.03] viewport-safeline" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-white/[0.03] viewport-safeline" />
      <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white/[0.03] viewport-safeline" />
      <div className="absolute right-[10%] top-0 bottom-0 w-px bg-white/[0.03] viewport-safeline" />
    </div>
  );
}

/* ─── Frosted Panel ─────────────────────────────────────────────────── */

function Panel({ children, className = "", hover = false, glow = false, ...props }) {
  return (
    <div
      className={`
        relative rounded-lg
        bg-[rgba(255,255,255,0.04)]
        backdrop-blur-xl
        border border-[rgba(255,255,255,0.08)]
        ${hover ? "transition-all duration-500 hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]" : ""}
        ${glow ? "shadow-[0_0_40px_rgba(212,165,116,0.04)]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Work Card with Layer Depth ────────────────────────────────────── */

function WorkCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group"
      style={{ position: "relative", perspective: "800px" }}
      onClick={() => setHovered((v) => !v)}
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) setHovered(true);
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) setHovered(false);
      }}
    >
      {/* Stacked layer cards behind the main card */}
      {item.layers.map((layer, i) => (
        <div
          key={layer}
          className="absolute inset-0 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] transition-all duration-700 ease-out"
          style={{
            transform: hovered
              ? `translateY(${(i + 1) * -6}px) translateX(${(i + 1) * 3}px) scale(${1 - (i + 1) * 0.01})`
              : "translateY(0) translateX(0) scale(1)",
            opacity: hovered ? 0.4 - i * 0.1 : 0,
            zIndex: 0 - i,
          }}
        />
      ))}

      {/* Glow edge on hover */}
      <div
        className="absolute -inset-px rounded-lg transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          zIndex: 5,
          background:
            "linear-gradient(135deg, rgba(212,165,116,0.12) 0%, transparent 40%, transparent 60%, rgba(91,164,207,0.08) 100%)",
        }}
      />

      <Panel hover className="p-4 sm:p-6 md:p-8" style={{ position: "relative", zIndex: 10 }}>
        {/* Layer labels visible on hover */}
        <div
          className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 flex flex-col items-end gap-1.5 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            zIndex: 20,
          }}
        >
          {item.layers.map((layer, i) => (
            <span
              key={layer}
              className={`${spaceMono.className} text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full border whitespace-nowrap transition-all`}
              style={{
                color: "rgba(212,165,116,0.75)",
                borderColor: "rgba(212,165,116,0.25)",
                backgroundColor: "rgba(212,165,116,0.06)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {layer}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
          <span
            className={`${spaceMono.className} text-xs tracking-[0.2em] uppercase`}
            style={{ color: "#D4A574" }}
          >
            {item.category}
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`${spaceMono.className} text-[10px] sm:text-[11px] text-white/20 tracking-wider`}
            >
              {item.format}
            </span>
            <span
              className={`${spaceMono.className} text-xs text-white/25`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <h3
          className={`${instrumentSerif.className} text-3xl md:text-4xl text-white/95 mb-3`}
        >
          {item.title}
        </h3>

        <p
          className={`${spaceMono.className} text-sm md:text-base leading-relaxed text-white/55 max-w-[70%]`}
        >
          {item.description}
        </p>
      </Panel>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */

export default function LightTableConcept() {
  return (
    <div
      className={`${spaceMono.variable} ${instrumentSerif.variable} min-h-screen relative boot-sequence`}
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Film Grain Overlay */}
      <FilmGrain />
      <div
        className="fixed inset-0 pointer-events-none z-50 boot-grain"
        style={{
          filter: "url(#film-grain)",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      {/* Scan Lines Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 boot-grain"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          opacity: 0.4,
        }}
      />

      {/* Viewport Frame */}
      <ViewportFrame />

      {/* Atmospheric gradient washes — more layered */}
      <div className="fixed inset-0 pointer-events-none z-0 boot-atmosphere">
        <div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,165,116,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/6 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(91,164,207,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(212,165,116,0.025) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(91,164,207,0.03) 0%, transparent 70%)",
          }}
        />
        {/* Translucent overlay bands */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(212,165,116,0.02) 0%, transparent 20%, transparent 80%, rgba(91,164,207,0.02) 100%)",
          }}
        />
      </div>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <nav className="relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5 boot-nav-left">
            <Link
              href="/concepts/light-table"
              className={`${spaceMono.className} text-xs sm:text-sm tracking-[0.3em] uppercase text-white/75 hover:text-white/95 transition-colors`}
            >
              A.Paxson
            </Link>
            <ChannelIndicator className="hidden sm:flex" />
          </div>

          <div className="flex items-center gap-4 sm:gap-8 boot-nav-right">
            <div className="hidden md:contents">
              <Timecode />
              <div className="w-px h-4 bg-white/10" />
              {["Work", "Writing", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${spaceMono.className} text-sm tracking-[0.15em] uppercase text-white/40 hover:text-white/70 transition-colors`}
                >
                  {item}
                </a>
              ))}
              <div className="w-px h-4 bg-white/10" />
            </div>
            <div className="flex items-center gap-3">
              {navSocials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white/70 transition-colors"
                  aria-label={label}
                >
                  <Icon width={18} height={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-36 pb-16 sm:pb-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <div className="flex items-center gap-4 mb-8 boot-hero-line" style={{ animationDelay: "1.4s" }}>
              <p
                className={`${spaceMono.className} text-sm tracking-[0.3em] uppercase`}
                style={{ color: "#D4A574" }}
              >
                Product Design + Engineering Leadership
              </p>
              <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-[rgba(212,165,116,0.2)] to-transparent" />
            </div>

            <h1 className="mb-8">
              <span
                className={`${instrumentSerif.className} block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white/95 leading-[1.05] boot-hero-line`}
                style={{ animationDelay: "1.55s" }}
              >
                I design and ship products
              </span>
              <span
                className={`${instrumentSerif.className} block text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] mt-2 boot-hero-line`}
                style={{ color: "rgba(255,255,255,0.50)", animationDelay: "1.7s" }}
              >
                that help creative teams
              </span>
              <span
                className={`${instrumentSerif.className} block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white/95 leading-[1.05] mt-2 boot-hero-line`}
                style={{ animationDelay: "1.85s" }}
              >
                move faster.
              </span>
            </h1>

            <p
              className={`${spaceMono.className} text-base md:text-lg text-white/55 max-w-2xl leading-relaxed boot-hero-line`}
              style={{ animationDelay: "2.0s" }}
            >
              Staff Engineer at Industrial Light & Magic. A decade building
              tools, systems, and interfaces where art meets technology.
            </p>
          </div>

          {/* Decorative hero sidebar — format specs */}
          <div className="hidden md:flex flex-col items-end gap-3 pb-4 boot-content">
            <span className={`${spaceMono.className} text-[11px] tracking-widest uppercase text-white/20`}>
              COMP_v001
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent" />
            <span className={`${spaceMono.className} text-[11px] text-white/20`}>
              4K
            </span>
            <span className={`${spaceMono.className} text-[11px] text-white/15`}>
              23.976fps
            </span>
            <span className={`${spaceMono.className} text-[11px] text-white/15`}>
              EXR
            </span>
            <ChannelIndicator className="mt-1" />
          </div>
        </div>

        {/* Scroll affordance + render bar */}
        <div className="mt-10 sm:mt-16 flex items-center justify-between boot-content">
          <div className="scroll-chevron flex flex-col items-center">
            <div className="w-px h-6 bg-white/10" />
            <svg width="16" height="10" viewBox="0 0 16 10" className="mt-1 text-white/25 animate-bounce-subtle">
              <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <RenderProgress />
        </div>
      </section>

      <NodeConnector />

      {/* ── About ────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 boot-content">
        <Panel className="p-5 sm:p-8 md:p-12" glow>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`${spaceMono.className} text-xs tracking-[0.3em] uppercase text-white/30`}
                >
                  About
                </span>
                <span className={`${spaceMono.className} text-[11px] tracking-wider uppercase text-white/15`}>
                  // BIO
                </span>
              </div>
              <h2
                className={`${instrumentSerif.className} text-4xl md:text-5xl text-white/95`}
              >
                Andrew Paxson
              </h2>
            </div>
            <div className="space-y-5">
              <p
                className={`${spaceMono.className} text-base leading-[1.9] text-white/60`}
              >
                I&rsquo;m a product designer and software engineer with over a
                decade of experience building tools for creative teams. As a
                Staff Engineer at Industrial Light &amp; Magic, I work at the
                intersection of design and engineering &mdash; shaping
                products that serve artists, technical directors, and
                production pipelines across some of the most complex visual
                effects workflows in the industry.
              </p>
              <p
                className={`${spaceMono.className} text-base leading-[1.9] text-white/60`}
              >
                I believe the best tools feel invisible. They get out of the
                way and let people focus on the work that matters. That
                philosophy drives everything I build &mdash; from data
                platforms handling millions of assets to real-time review
                tools used on set.
              </p>
            </div>
          </div>
        </Panel>
      </section>

      <NodeConnector />

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 boot-content">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <span
              className={`${spaceMono.className} text-xs tracking-[0.3em] uppercase text-white/30`}
            >
              Capabilities
            </span>
            <div className="h-px w-16 bg-white/10" />
          </div>
          <span className={`${spaceMono.className} text-[11px] tracking-wider uppercase text-white/15`}>
            NODE_GRAPH // 3 PASSES
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <Panel key={cap.title} hover className="p-6 md:p-8 group">
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`${spaceMono.className} text-[11px] tracking-[0.2em] uppercase px-2 py-0.5 rounded border`}
                  style={{
                    color: "rgba(91,164,207,0.7)",
                    borderColor: "rgba(91,164,207,0.2)",
                    backgroundColor: "rgba(91,164,207,0.05)",
                  }}
                >
                  {cap.label}
                </span>
                <span
                  className={`${spaceMono.className} text-xs text-white/20`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className={`${instrumentSerif.className} text-2xl md:text-3xl text-white/90 mb-4`}
              >
                {cap.title}
              </h3>
              <p
                className={`${spaceMono.className} text-sm leading-[1.9] text-white/50`}
              >
                {cap.description}
              </p>
            </Panel>
          ))}
        </div>
      </section>

      <NodeConnector />

      {/* ── Work ─────────────────────────────────────────────────── */}
      <section id="work" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 boot-content">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span
                className={`${spaceMono.className} text-xs tracking-[0.3em] uppercase text-white/30`}
              >
                Selected Work
              </span>
              <ChannelIndicator />
            </div>
            <h2
              className={`${instrumentSerif.className} text-4xl md:text-5xl text-white/95`}
            >
              Projects
            </h2>
          </div>
          <ChannelIndicator />
        </div>

        <div className="grid gap-6">
          {workItems.map((item, i) => (
            <WorkCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      <NodeConnector />

      {/* ── Writing / Blog ───────────────────────────────────────── */}
      <section id="writing" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20 boot-content">
        <Panel className="p-5 sm:p-8 md:p-12" glow>
          <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`${spaceMono.className} text-xs tracking-[0.3em] uppercase text-white/30`}
                >
                  Writing
                </span>
                <span className={`${spaceMono.className} text-[11px] tracking-wider uppercase text-white/15`}>
                  // SUBSTACK
                </span>
              </div>

              <div className="w-12 h-px bg-white/15 mb-6" />

              <h2
                className={`${instrumentSerif.className} text-4xl md:text-5xl text-white/95 mb-4`}
              >
                Mosaic &amp; Monoliths
              </h2>

              <p
                className={`${spaceMono.className} text-base leading-[1.9] text-white/55 mb-8`}
              >
                A blog exploring the intersection of design, engineering, and
                creative technology. Thoughts on building tools for artists,
                the nature of software craft, and lessons from a decade in
                visual effects pipelines.
              </p>

              <a
                href="https://andrewpaxson.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${spaceMono.className} inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-lg border transition-all duration-300 hover:shadow-[0_0_20px_rgba(91,164,207,0.1)]`}
                style={{
                  color: "rgba(91,164,207,0.85)",
                  borderColor: "rgba(91,164,207,0.25)",
                  backgroundColor: "rgba(91,164,207,0.05)",
                }}
              >
                Read on Substack
                <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>

            {/* Decorative compositing element */}
            <div className="hidden md:flex flex-col items-center justify-center">
              <div className="relative w-full max-w-xs aspect-square">
                {/* Layered translucent frames */}
                <div
                  className="absolute inset-4 rounded-lg border border-white/[0.06]"
                  style={{
                    background: "linear-gradient(135deg, rgba(91,164,207,0.04) 0%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute inset-10 rounded-lg border border-white/[0.05]"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,165,116,0.04) 0%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute inset-16 rounded-lg border border-white/[0.04] flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
                  }}
                >
                  <span className={`${spaceMono.className} text-[11px] tracking-[0.3em] uppercase text-white/15`}>
                    EDITORIAL
                  </span>
                </div>
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10" />
              </div>
            </div>
          </div>
        </Panel>
      </section>

      <NodeConnector />

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 boot-content">
        <Panel className="p-5 sm:p-8 md:p-12">
          <div className="grid md:grid-cols-[1fr_1fr] gap-10">
            {/* Left — identity + social links */}
            <div>
              <h3
                className={`${instrumentSerif.className} text-3xl text-white/80 mb-2`}
              >
                Andrew Paxson
              </h3>
              <p
                className={`${spaceMono.className} text-sm text-white/35 mb-8`}
              >
                Product Design + Engineering Leadership
              </p>

              {/* Prominent social links */}
              <div className="space-y-3">
                <a
                  href="https://linkedin.com/in/andrewpaxson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all">
                    <Linkedin width={20} height={20} strokeWidth={1.5} className="text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div>
                    <span className={`${spaceMono.className} text-sm text-white/65 group-hover:text-white/90 transition-colors block`}>
                      LinkedIn
                    </span>
                    <span className={`${spaceMono.className} text-xs text-white/30`}>
                      Resume &amp; Career
                    </span>
                  </div>
                </a>

                <a
                  href="https://github.com/paxsonsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all">
                    <GithubCircle width={20} height={20} strokeWidth={1.5} className="text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div>
                    <span className={`${spaceMono.className} text-sm text-white/65 group-hover:text-white/90 transition-colors block`}>
                      GitHub
                    </span>
                    <span className={`${spaceMono.className} text-xs text-white/30`}>
                      Engineering Work
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — small social icons + decorative */}
            <div className="flex flex-col items-end justify-between">
              <div className="flex items-center gap-4">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-white/70 transition-colors"
                    aria-label={label}
                  >
                    <Icon width={22} height={22} strokeWidth={1.5} />
                  </a>
                ))}
              </div>

              <div className="flex flex-col items-end gap-2 mt-6">
                <ChannelIndicator />
                <span className={`${spaceMono.className} text-[11px] tracking-wider text-white/15`}>
                  FINAL_COMP_v001
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span
              className={`${spaceMono.className} text-xs tracking-[0.15em] text-white/20`}
            >
              &copy; 2025 Andrew Paxson. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <RenderProgress />
              <span
                className={`${spaceMono.className} text-xs tracking-[0.15em] text-white/15`}
              >
                Concept: Light Table
              </span>
            </div>
          </div>
        </Panel>
      </footer>

      {/* ── Inline Styles (animations + grain + boot sequence) ──── */}
      <style jsx global>{`
        /* ── Boot Sequence Animation ─────────────────────────────── */

        /* Phase 0: Page starts invisible */
        .boot-sequence {
          animation: bootPageIn 0.6s ease-out 0.1s both;
        }

        @keyframes bootPageIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Phase 1: Viewport frame corners draw in (0.1s - 0.7s) */
        .viewport-corner {
          opacity: 0;
        }

        .viewport-corner-tl {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-left: 1px solid rgba(255,255,255,0.06);
          animation: cornerDrawTL 0.5s ease-out 0.2s both;
        }
        .viewport-corner-tr {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-right: 1px solid rgba(255,255,255,0.06);
          animation: cornerDrawTR 0.5s ease-out 0.3s both;
        }
        .viewport-corner-bl {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          border-left: 1px solid rgba(255,255,255,0.06);
          animation: cornerDrawBL 0.5s ease-out 0.35s both;
        }
        .viewport-corner-br {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          border-right: 1px solid rgba(255,255,255,0.06);
          animation: cornerDrawBR 0.5s ease-out 0.4s both;
        }

        @keyframes cornerDrawTL {
          0% {
            opacity: 0;
            width: 0;
            height: 0;
          }
          50% {
            opacity: 0.5;
            width: 32px;
            height: 0;
          }
          100% {
            opacity: 1;
            width: 32px;
            height: 32px;
          }
        }

        @keyframes cornerDrawTR {
          0% {
            opacity: 0;
            width: 0;
            height: 0;
          }
          50% {
            opacity: 0.5;
            width: 32px;
            height: 0;
          }
          100% {
            opacity: 1;
            width: 32px;
            height: 32px;
          }
        }

        @keyframes cornerDrawBL {
          0% {
            opacity: 0;
            width: 0;
            height: 0;
          }
          50% {
            opacity: 0.5;
            width: 32px;
            height: 0;
          }
          100% {
            opacity: 1;
            width: 32px;
            height: 32px;
          }
        }

        @keyframes cornerDrawBR {
          0% {
            opacity: 0;
            width: 0;
            height: 0;
          }
          50% {
            opacity: 0.5;
            width: 32px;
            height: 0;
          }
          100% {
            opacity: 1;
            width: 32px;
            height: 32px;
          }
        }

        /* Safe-area lines fade in */
        .viewport-safeline {
          animation: safeFadeIn 0.8s ease-out 0.5s both;
        }

        @keyframes safeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Phase 2: Film grain + scan lines fade in (0.6s - 1.0s) */
        .boot-grain {
          animation: grainFadeIn 0.6s ease-out 0.6s both;
        }

        @keyframes grainFadeIn {
          from { opacity: 0 !important; }
        }

        /* Phase 3: Nav elements fade in from sides (0.9s - 1.3s) */
        .boot-nav-left {
          animation: navSlideLeft 0.5s ease-out 0.9s both;
        }

        .boot-nav-right {
          animation: navSlideRight 0.5s ease-out 1.0s both;
        }

        @keyframes navSlideLeft {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes navSlideRight {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Phase 4: Hero headline — line by line (1.4s - 2.1s) */
        .boot-hero-line {
          animation: heroLineReveal 0.55s ease-out both;
        }

        @keyframes heroLineReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Phase 5: Atmospheric gradients bloom (1.6s - 2.8s) */
        .boot-atmosphere {
          animation: atmosphereBloom 1.4s ease-out 1.6s both;
        }

        @keyframes atmosphereBloom {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Phase 6: Remaining content fades in (2.2s - 2.8s) */
        .boot-content {
          animation: contentFadeIn 0.7s ease-out 2.2s both;
        }

        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── Existing Animations ─────────────────────────────────── */

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        .animate-bounce-subtle {
          animation: bounceSoft 2s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Selection */
        ::selection {
          background: rgba(212, 165, 116, 0.25);
          color: white;
        }
      `}</style>
    </div>
  );
}
