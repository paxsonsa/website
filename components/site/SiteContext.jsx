"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

/*
 * Site-wide state: theme, accent color, gradient bloom, and fade navigation.
 * Ported from the Dialogue concept with three changes:
 *   - the theme class is set before paint by app/layout.js; this only syncs it
 *   - the accent starts on cyan instead of a random point in the cycle
 *   - prefers-reduced-motion is exposed so pages can skip the intro theatre
 */

const THEME_KEY = "site-theme";
const SiteContext = createContext(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

// --- Accent color cycle (30 minutes end to end) ---
const CYCLE_DURATION = 1800000;
const CYAN_POS = 0.2;
const LIGHT_ACCENTS = [
  { pos: 0, color: [59, 130, 246] },
  { pos: 0.2, color: [8, 145, 178] },
  { pos: 0.42, color: [180, 83, 9] },
  { pos: 0.6, color: [168, 34, 104] },
  { pos: 0.78, color: [88, 80, 180] },
  { pos: 1.0, color: [59, 130, 246] },
];
const DARK_ACCENTS = [
  { pos: 0, color: [129, 185, 255] },
  { pos: 0.2, color: [34, 211, 238] },
  { pos: 0.42, color: [251, 191, 36] },
  { pos: 0.6, color: [244, 114, 182] },
  { pos: 0.78, color: [165, 148, 255] },
  { pos: 1.0, color: [129, 185, 255] },
];

function lerpColor(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

function getAccentRgbAt(elapsed, isDark) {
  const palette = isDark ? DARK_ACCENTS : LIGHT_ACCENTS;
  const t = (((elapsed % CYCLE_DURATION) + CYCLE_DURATION) % CYCLE_DURATION) / CYCLE_DURATION;
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

function applyAccentRgb(rgb) {
  const el = document.documentElement.style;
  el.setProperty("--accent", `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  el.setProperty("--accent-r", rgb[0]);
  el.setProperty("--accent-g", rgb[1]);
  el.setProperty("--accent-b", rgb[2]);
}

let accentLerpRaf = null;
let currentAccentRgb = null;

function animateAccentTo(targetRgb, durationMs = 800) {
  if (accentLerpRaf) cancelAnimationFrame(accentLerpRaf);
  const startRgb = currentAccentRgb || targetRgb;
  const startTime = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - startTime) / durationMs);
    const ease = 1 - Math.pow(1 - t, 3);
    const rgb = lerpColor(startRgb, targetRgb, ease);
    currentAccentRgb = rgb;
    applyAccentRgb(rgb);
    accentLerpRaf = t < 1 ? requestAnimationFrame(tick) : null;
  }
  accentLerpRaf = requestAnimationFrame(tick);
}

function depth(path) {
  return path.split("/").filter(Boolean).length;
}

export function SiteProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // --- Theme: the class is already on <html>; mirror it into state ---
  const [isDark, setIsDark] = useState(false);
  const isDarkRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark-mode"));

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = (e) => {
      if (localStorage.getItem(THEME_KEY)) return;
      root.classList.toggle("dark-mode", e.matches);
      setIsDark(e.matches);
    };
    mq.addEventListener("change", onScheme);

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(rm.matches);
    const onMotion = (e) => setReducedMotion(e.matches);
    rm.addEventListener("change", onMotion);

    return () => {
      mq.removeEventListener("change", onScheme);
      rm.removeEventListener("change", onMotion);
    };
  }, []);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark-mode", next);
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  // --- Bloom: pages drive the intro bloom ("dormant" → "opening" → "full") ---
  const [bloomPhase, setBloomPhase] = useState("full");
  const [bloomProgress, setBloomProgress] = useState(1);

  // --- Chrome visibility: the home intro hides nav until the greeting lands ---
  const [chromeVisible, setChromeVisible] = useState(true);

  // --- Fade navigation with direction ---
  const [transitioning, setTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [swirlDirection, setSwirlDirection] = useState(0);
  const savedScrollRef = useRef(0);
  const returnScrollRef = useRef(null);

  const accentOffsetRef = useRef(0);
  const accentStartRef = useRef(null);
  const accentBaseRef = useRef(CYAN_POS * CYCLE_DURATION);

  const navigateWithFade = useCallback(
    (href) => {
      if (href === pathname) return;
      const isForward = depth(href) > depth(pathname);
      setSwirlDirection(isForward ? 1 : -1);
      setTransitioning(true);
      setContentVisible(false);

      if (isForward) savedScrollRef.current = window.scrollY;
      else returnScrollRef.current = savedScrollRef.current;

      // Shift the accent along the cycle so each page gets its own color.
      accentOffsetRef.current += (isForward ? 1 : -1) * CYCLE_DURATION * 0.45;
      const elapsed =
        Date.now() - accentStartRef.current + accentBaseRef.current + accentOffsetRef.current;
      animateAccentTo(getAccentRgbAt(elapsed, isDarkRef.current), 800);

      setTimeout(() => router.push(href), 600);
    },
    [router, pathname],
  );

  useEffect(() => {
    if (!transitioning) return;
    const scrollTo = returnScrollRef.current;
    returnScrollRef.current = null;
    const timer = setTimeout(() => {
      setContentVisible(true);
      setTransitioning(false);
      setSwirlDirection(0);
      window.scrollTo(0, scrollTo != null ? scrollTo : 0);
    }, 50);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // --- Gradient drift follows the pointer (or scroll on touch) ---
  const driftRef = useRef({ x: 0, y: 0 });
  const driftTargetRef = useRef({ x: 0, y: 0 });
  const driftElRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const MAX_DRIFT = 1.5;
    const LERP = 0.015;
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    let lastScrollY = window.scrollY;
    let raf = null;

    function onMouseMove(e) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      driftTargetRef.current = { x: nx * MAX_DRIFT, y: ny * MAX_DRIFT };
    }
    function onScroll() {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const nudge = Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, delta * 0.02));
      driftTargetRef.current = { x: driftTargetRef.current.x, y: nudge };
    }
    function tick() {
      const d = driftRef.current;
      const t = driftTargetRef.current;
      d.x += (t.x - d.x) * LERP;
      d.y += (t.y - d.y) * LERP;
      if (driftElRef.current) {
        driftElRef.current.style.setProperty("--drift-x", `${d.x}%`);
        driftElRef.current.style.setProperty("--drift-y", `${d.y}%`);
      }
      if (isTouch) {
        t.x *= 0.98;
        t.y *= 0.98;
      }
      raf = requestAnimationFrame(tick);
    }

    if (isTouch) window.addEventListener("scroll", onScroll, { passive: true });
    else window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // --- Accent cycle: starts on cyan, drifts slowly, jumps on navigation ---
  useEffect(() => {
    accentStartRef.current = Date.now();
    const init = getAccentRgbAt(accentBaseRef.current, isDarkRef.current);
    currentAccentRgb = init;
    applyAccentRgb(init);

    const interval = setInterval(() => {
      if (accentLerpRaf) return;
      const elapsed =
        Date.now() - accentStartRef.current + accentBaseRef.current + accentOffsetRef.current;
      const rgb = getAccentRgbAt(elapsed, isDarkRef.current);
      currentAccentRgb = rgb;
      applyAccentRgb(rgb);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Re-sample the accent from the other palette when the theme flips.
  useEffect(() => {
    if (accentStartRef.current == null) return;
    const elapsed =
      Date.now() - accentStartRef.current + accentBaseRef.current + accentOffsetRef.current;
    animateAccentTo(getAccentRgbAt(elapsed, isDark), 600);
  }, [isDark]);

  return (
    <SiteContext.Provider
      value={{
        isDark,
        toggleTheme,
        reducedMotion,
        navigateWithFade,
        transitioning,
        contentVisible,
        swirlDirection,
        driftElRef,
        bloomPhase,
        setBloomPhase,
        bloomProgress,
        setBloomProgress,
        chromeVisible,
        setChromeVisible,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}
