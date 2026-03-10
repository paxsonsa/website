"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const THEME_KEY = "dialogue-theme";

const DialogueContext = createContext(null);

export function useDialogue() {
  const ctx = useContext(DialogueContext);
  if (!ctx) throw new Error("useDialogue must be used within DialogueProvider");
  return ctx;
}

// --- Accent color palettes ---
const CYCLE_DURATION = 1800000;
const LIGHT_ACCENTS = [
  { pos: 0,    color: [59, 130, 246] },
  { pos: 0.20, color: [8, 145, 178] },
  { pos: 0.42, color: [180, 83, 9] },
  { pos: 0.60, color: [168, 34, 104] },
  { pos: 0.78, color: [88, 80, 180] },
  { pos: 1.0,  color: [59, 130, 246] },
];
const DARK_ACCENTS = [
  { pos: 0,    color: [129, 185, 255] },
  { pos: 0.20, color: [34, 211, 238] },
  { pos: 0.42, color: [251, 191, 36] },
  { pos: 0.60, color: [244, 114, 182] },
  { pos: 0.78, color: [165, 148, 255] },
  { pos: 1.0,  color: [129, 185, 255] },
];

function lerpColor(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function getAccentRgbAt(elapsed, isDark) {
  const palette = isDark ? DARK_ACCENTS : LIGHT_ACCENTS;
  const t = (elapsed % CYCLE_DURATION) / CYCLE_DURATION;
  for (let i = 0; i < palette.length - 1; i++) {
    const curr = palette[i];
    const next = palette[i + 1];
    if (t >= curr.pos && t <= next.pos) {
      const local = (t - curr.pos) / (next.pos - curr.pos);
      return lerpColor(curr.color, next.color, local);
    }
  }
  return isDark ? [34, 211, 238] : [8, 145, 178];
}

function getAccentAt(elapsed, isDark) {
  const rgb = getAccentRgbAt(elapsed, isDark);
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function applyAccentRgb(rgb) {
  const el = document.documentElement;
  el.style.setProperty("--accent", `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  el.style.setProperty("--accent-r", rgb[0]);
  el.style.setProperty("--accent-g", rgb[1]);
  el.style.setProperty("--accent-b", rgb[2]);
}

function applyAccent(elapsed, isDark) {
  applyAccentRgb(getAccentRgbAt(elapsed, isDark));
}

// Animated accent transition — lerps from current to target over duration
let accentLerpRaf = null;
let currentAccentRgb = null;

function animateAccentTo(targetRgb, durationMs = 800) {
  if (accentLerpRaf) cancelAnimationFrame(accentLerpRaf);
  const startRgb = currentAccentRgb || targetRgb;
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - startTime) / durationMs);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    const rgb = lerpColor(startRgb, targetRgb, ease);
    currentAccentRgb = rgb;
    applyAccentRgb(rgb);
    if (t < 1) {
      accentLerpRaf = requestAnimationFrame(tick);
    } else {
      accentLerpRaf = null;
    }
  }
  accentLerpRaf = requestAnimationFrame(tick);
}

export function DialogueProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Theme
  const [isDark, setIsDark] = useState(false);
  const isDarkRef = useRef(false);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      setIsDark(saved === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    setThemeReady(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem(THEME_KEY)) setIsDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  // Bloom control — pages set this to drive the intro bloom
  // "dormant" = pre-intro, "opening" = bloom expanding, "full" = settled
  const [bloomPhase, setBloomPhase] = useState("full");
  // 0-1 progress for bloom opening animation
  const [bloomProgress, setBloomProgress] = useState(1);

  // Page transition with direction tracking
  const [transitioning, setTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [swirlDirection, setSwirlDirection] = useState(0);
  const pendingHref = useRef(null);
  // Store scroll position to restore on return
  const savedScrollRef = useRef(0);
  const returnScrollRef = useRef(null);

  const navigateWithFade = useCallback((href, { scrollTarget } = {}) => {
    if (href === pathname) return;
    const isForward = href.length > pathname.length;
    setSwirlDirection(isForward ? 1 : -1);
    setTransitioning(true);
    setContentVisible(false);
    pendingHref.current = href;

    // Save current scroll position if navigating forward
    if (isForward) {
      savedScrollRef.current = window.scrollY;
    }
    // If going back, we'll restore scroll after navigation
    if (!isForward) {
      returnScrollRef.current = savedScrollRef.current;
    }

    // Shift accent color during transition (bigger jump: ~45% of cycle = ~2.5 color stops)
    const shiftMs = (isForward ? 1 : -1) * CYCLE_DURATION * 0.45;
    accentOffsetRef.current += shiftMs;

    // Animate accent color to the new position over 800ms
    const elapsed = (Date.now() - accentStartRef.current) + accentRandomRef.current + accentOffsetRef.current;
    const targetRgb = getAccentRgbAt(elapsed, isDarkRef.current);
    animateAccentTo(targetRgb, 800);

    setTimeout(() => {
      router.push(href);
    }, 600);
  }, [router, pathname]);

  // When pathname changes, fade content back in
  useEffect(() => {
    if (transitioning) {
      const scrollTo = returnScrollRef.current;
      returnScrollRef.current = null;
      const timer = setTimeout(() => {
        setContentVisible(true);
        setTransitioning(false);
        setSwirlDirection(0);
        pendingHref.current = null;
        // Restore scroll position on back navigation, top on forward
        if (scrollTo != null) {
          window.scrollTo(0, scrollTo);
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

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

  // Accent color cycle with shiftable offset
  const accentOffsetRef = useRef(0);
  const accentStartRef = useRef(null);
  const accentRandomRef = useRef(0);

  useEffect(() => {
    accentRandomRef.current = Math.random() * CYCLE_DURATION;
    accentStartRef.current = Date.now();

    const initRgb = getAccentRgbAt(accentRandomRef.current, isDarkRef.current);
    currentAccentRgb = initRgb;
    applyAccentRgb(initRgb);

    const accentInterval = setInterval(() => {
      // Skip interval updates while a transition animation is running
      if (accentLerpRaf) return;
      const elapsed = (Date.now() - accentStartRef.current) + accentRandomRef.current + accentOffsetRef.current;
      const rgb = getAccentRgbAt(elapsed, isDarkRef.current);
      currentAccentRgb = rgb;
      applyAccentRgb(rgb);
    }, 200);

    return () => {
      clearInterval(accentInterval);
      document.documentElement.style.removeProperty("--accent");
      document.documentElement.style.removeProperty("--accent-r");
      document.documentElement.style.removeProperty("--accent-g");
      document.documentElement.style.removeProperty("--accent-b");
    };
  }, []);

  return (
    <DialogueContext.Provider
      value={{
        isDark,
        isDarkRef,
        themeReady,
        toggleTheme,
        navigateWithFade,
        transitioning,
        contentVisible,
        swirlDirection,
        driftElRef,
        bloomPhase,
        setBloomPhase,
        bloomProgress,
        setBloomProgress,
      }}
    >
      {children}
    </DialogueContext.Provider>
  );
}
