"use client";

import { useEffect, useRef, useState } from "react";
import { Newsreader, Overpass_Mono } from "next/font/google";
import { SunLight, HalfMoon } from "iconoir-react";
import { DialogueProvider, useDialogue } from "./DialogueContext";
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

function ThemeToggle() {
  const { isDark, toggleTheme, contentVisible } = useDialogue();
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.4s ease-out" }}>
      <button
        onClick={toggleTheme}
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
    </div>
  );
}

function GradientBloom() {
  const { isDark, swirlDirection, driftElRef, bloomPhase, bloomProgress } = useDialogue();
  const isSwirling = swirlDirection !== 0;
  const bloomDir = isDark ? -1 : 1;

  let scale, opacity, rotate, yShift, transition;

  if (isSwirling) {
    // Page transition swirl — dramatic movement
    scale = 1.8;
    opacity = 1;
    rotate = 18 * swirlDirection;
    yShift = -8 * swirlDirection;
    transition = "opacity 0.7s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.8s cubic-bezier(0.34, 1.2, 0.64, 1)";
  } else if (bloomPhase === "dormant") {
    // Pre-intro: tiny, nearly invisible
    scale = 0.5;
    opacity = isDark ? 0.08 : 0.04;
    rotate = 0;
    yShift = 15 * bloomDir;
    transition = "none";
  } else if (bloomPhase === "opening") {
    // Bloom expanding with progress (0 → 1)
    scale = 0.85 + bloomProgress * 0.35;
    opacity = (isDark ? 0.4 : 0.35) + bloomProgress * (isDark ? 0.6 : 0.65);
    rotate = 0;
    yShift = (6 * bloomDir) - bloomProgress * (6 * bloomDir);
    transition = "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
  } else {
    // Full / settled
    scale = 1.2;
    opacity = 1;
    rotate = 0;
    yShift = 0;
    transition = "opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)";
  }

  const settled = bloomPhase === "full" && !isSwirling;

  return (
    <div
      ref={driftElRef}
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
      <div className="day-cycle-base day-cycle-morning" />
      <div className="day-cycle-base day-cycle-day" />
    </div>
  );
}

function DialogueShell({ children }) {
  const { isDark, themeReady, contentVisible } = useDialogue();

  return (
    <div
      className={`${newsreader.variable} ${overpassMono.variable} min-h-screen dialogue-page${isDark ? " dark-mode" : ""}`}
      style={{
        backgroundColor: "var(--d-bg)",
        color: "var(--d-text)",
        opacity: themeReady ? 1 : 0,
        transition: "background-color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <ThemeToggle />
      <GradientBloom />

      {/* Content wrapper — fades on page transitions */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function DialogueLayout({ children }) {
  return (
    <DialogueProvider>
      <DialogueShell>{children}</DialogueShell>
    </DialogueProvider>
  );
}
