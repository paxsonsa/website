"use client";

import { useState } from "react";
import { Newsreader, Overpass_Mono } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-overpass-mono",
});

const gradients = [
  {
    name: "Cyan (current)",
    bg: "#FAFAF7",
    textColor: "#18181B",
    subtextColor: "#3F3F46",
    accentColor: "#0891B2",
    gradient: `
      radial-gradient(ellipse 80% 60% at 30% 40%, rgba(8, 145, 178, 0.022) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 70% 60%, rgba(8, 145, 178, 0.015) 0%, transparent 50%)
    `,
  },
  {
    name: "Warm Amber",
    bg: "#FAF9F6",
    textColor: "#1C1917",
    subtextColor: "#44403C",
    accentColor: "#B45309",
    gradient: `
      radial-gradient(ellipse 80% 60% at 25% 35%, rgba(180, 83, 9, 0.025) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 75% 65%, rgba(217, 119, 6, 0.018) 0%, transparent 50%)
    `,
  },
  {
    name: "Soft Lavender",
    bg: "#FAFAFC",
    textColor: "#1E1B2E",
    subtextColor: "#4A4563",
    accentColor: "#7C3AED",
    gradient: `
      radial-gradient(ellipse 80% 60% at 30% 40%, rgba(124, 58, 237, 0.020) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 70% 60%, rgba(139, 92, 246, 0.015) 0%, transparent 50%)
    `,
  },
  {
    name: "Sage Green",
    bg: "#F9FAF8",
    textColor: "#1A1F1A",
    subtextColor: "#3D4A3D",
    accentColor: "#16A34A",
    gradient: `
      radial-gradient(ellipse 80% 60% at 25% 45%, rgba(22, 163, 74, 0.020) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 70% 55%, rgba(34, 197, 94, 0.015) 0%, transparent 50%)
    `,
  },
  {
    name: "Blush Rose",
    bg: "#FCFAF9",
    textColor: "#1C1517",
    subtextColor: "#5C4550",
    accentColor: "#DB2777",
    gradient: `
      radial-gradient(ellipse 80% 60% at 30% 40%, rgba(219, 39, 119, 0.018) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 70% 60%, rgba(236, 72, 153, 0.014) 0%, transparent 50%)
    `,
  },
  {
    name: "Slate Blue",
    bg: "#F8F9FC",
    textColor: "#0F172A",
    subtextColor: "#334155",
    accentColor: "#2563EB",
    gradient: `
      radial-gradient(ellipse 80% 60% at 30% 40%, rgba(37, 99, 235, 0.020) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 70% 60%, rgba(59, 130, 246, 0.015) 0%, transparent 50%)
    `,
  },
  {
    name: "Copper",
    bg: "#FAF9F7",
    textColor: "#1C1410",
    subtextColor: "#5C473A",
    accentColor: "#C2410C",
    gradient: `
      radial-gradient(ellipse 80% 60% at 25% 35%, rgba(194, 65, 12, 0.022) 0%, transparent 50%),
      radial-gradient(ellipse 60% 80% at 70% 65%, rgba(234, 88, 12, 0.016) 0%, transparent 50%)
    `,
  },
  {
    name: "Teal + Warm (dual)",
    bg: "#FAFAF7",
    textColor: "#18181B",
    subtextColor: "#3F3F46",
    accentColor: "#0891B2",
    gradient: `
      radial-gradient(ellipse 70% 50% at 20% 35%, rgba(8, 145, 178, 0.022) 0%, transparent 50%),
      radial-gradient(ellipse 50% 70% at 80% 65%, rgba(217, 119, 6, 0.018) 0%, transparent 50%)
    `,
  },
];

function PreviewCard({ g, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-lg border-2 transition-all duration-300 overflow-hidden"
      style={{
        borderColor: selected ? g.accentColor : "transparent",
        opacity: selected ? 1 : 0.75,
      }}
    >
      {/* Mini preview */}
      <div
        className="relative h-32 w-full"
        style={{ backgroundColor: g.bg }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: g.gradient,
            backgroundSize: "200% 200%",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-4">
          <div
            className="text-lg font-light leading-tight"
            style={{ fontFamily: "var(--font-newsreader)", color: g.textColor }}
          >
            Hi, I&rsquo;m Andrew.
          </div>
          <div
            className="text-xs mt-1"
            style={{ fontFamily: "var(--font-newsreader)", color: g.subtextColor }}
          >
            I&rsquo;m a product designer and engineer...
          </div>
          <div
            className="text-[9px] mt-1 italic"
            style={{ fontFamily: "var(--font-newsreader)", color: g.accentColor }}
          >
            The best software disappears...
          </div>
        </div>
      </div>
      {/* Label */}
      <div className="px-3 py-2" style={{ backgroundColor: g.bg }}>
        <span
          className="text-xs font-medium"
          style={{ fontFamily: "var(--font-overpass-mono)", color: g.subtextColor }}
        >
          {g.name}
        </span>
        <span
          className="block w-3 h-3 rounded-full mt-1"
          style={{ backgroundColor: g.accentColor }}
        />
      </div>
    </button>
  );
}

export default function GradientPreviewPage() {
  const [active, setActive] = useState(0);
  const g = gradients[active];

  return (
    <div className={`${newsreader.variable} ${overpassMono.variable}`}>
      {/* Full-page preview */}
      <div
        className="min-h-screen relative transition-colors duration-700"
        style={{ backgroundColor: g.bg, color: g.textColor }}
      >
        {/* Gradient wash */}
        <div
          className="fixed inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: g.gradient,
            backgroundSize: "200% 200%",
            animation: "gradientWash 20s ease-in-out infinite",
          }}
        />

        <style jsx global>{`
          @keyframes gradientWash {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes breathe {
            0%, 100% { transform: scale(1.0); }
            50%      { transform: scale(1.003); }
          }
          .breathing { animation: breathe 8s ease-in-out infinite; }
          @keyframes tealPulse {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0.85; }
          }
        `}</style>

        {/* Picker bar */}
        <div className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: `${g.subtextColor}15`, backgroundColor: `${g.bg}DD` }}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-overpass-mono)", color: g.subtextColor }}
            >
              Gradient Wash Preview &mdash; pick a vibe
            </p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {gradients.map((gr, i) => (
                <PreviewCard
                  key={gr.name}
                  g={gr}
                  selected={i === active}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Simulated Dialogue content */}
        <main
          className="mx-auto px-6 sm:px-8 breathing relative"
          style={{ maxWidth: "720px", zIndex: 1 }}
        >
          <section className="pt-32 sm:pt-44 pb-24">
            <h1
              className="text-5xl sm:text-6xl font-light leading-tight"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              Hi, I&rsquo;m Andrew.
            </h1>

            <p
              className="mt-4 text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: g.subtextColor }}
            >
              I&rsquo;m a product designer and engineer who builds tools for
              creative teams.
            </p>

            <p
              className="mt-6 text-base"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: `${g.subtextColor}99`,
                letterSpacing: "0.02em",
              }}
            >
              Staff Engineer at Industrial Light &amp; Magic
            </p>

            {/* Fake social dots */}
            <div className="mt-5 flex items-center gap-5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: `${g.subtextColor}30` }}
                />
              ))}
            </div>
          </section>

          <section className="pb-20 space-y-16">
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: g.subtextColor }}
            >
              For the past decade, I&rsquo;ve worked at the intersection of
              design and engineering&mdash;the place where taste meets craft,
              and ideas become tools people actually reach for.
            </p>

            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: g.subtextColor }}
            >
              Currently at{" "}
              <span style={{ color: g.textColor, fontWeight: 400 }}>
                Industrial Light &amp; Magic
              </span>
              , where I build the internal tools that help artists create the
              impossible.
            </p>

            <p
              className="text-xl sm:text-2xl leading-relaxed font-light italic"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: g.accentColor,
                animation: "tealPulse 4s ease-in-out infinite",
              }}
            >
              I believe the best software disappears into the work it enables.
            </p>
          </section>

          <section className="pb-24">
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-overpass-mono)", color: `${g.subtextColor}99` }}
            >
              What I do
            </p>
            {[
              "I design products end-to-end — from research to shipped code.",
              "I build tools for complex creative workflows.",
              "I lead distributed teams that ship.",
            ].map((text) => (
              <div key={text} className="py-3">
                <p
                  className="text-xl sm:text-2xl leading-relaxed"
                  style={{ fontFamily: "var(--font-newsreader)", color: g.textColor }}
                >
                  {text}
                </p>
              </div>
            ))}
          </section>

          <section className="pb-24">
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ fontFamily: "var(--font-overpass-mono)", color: `${g.subtextColor}99` }}
            >
              Selected work
            </p>
            {["MotionStage", "PelagoDB", "KnowledgeDB"].map((name) => (
              <div key={name} className="py-4">
                <span
                  className="text-3xl sm:text-4xl font-light"
                  style={{ fontFamily: "var(--font-newsreader)", color: g.textColor }}
                >
                  {name}
                </span>
              </div>
            ))}
          </section>

          <section className="pb-24">
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{ fontFamily: "var(--font-newsreader)", color: g.subtextColor }}
            >
              I write about the intersection of art, engineering, and product
              thinking in a blog called{" "}
              <span style={{ color: g.textColor, fontWeight: 400 }}>
                Mosaic and Monoliths
              </span>
              .
            </p>
            <span
              className="inline-block mt-8 text-base font-semibold border-b-2"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: g.accentColor,
                borderColor: g.accentColor,
                paddingBottom: "2px",
              }}
            >
              Read the blog &rarr;
            </span>
          </section>

          <footer className="border-t pt-8 pb-16" style={{ borderColor: `${g.subtextColor}20` }}>
            <p
              className="text-xs"
              style={{ fontFamily: "var(--font-overpass-mono)", color: `${g.subtextColor}99` }}
            >
              &copy; 2025 Andrew Paxson
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
