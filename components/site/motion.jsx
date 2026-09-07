"use client";

import { useEffect, useRef, useState } from "react";

/* Scroll-triggered reveal. Fires once. */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, isVisible];
}

export function Reveal({ children, className = "", delay = 0, style = {} }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Style for a section that cascades in after the page header. */
export function cascadeStyle(visible, index) {
  return {
    opacity: visible >= index ? 1 : 0,
    transform: visible >= index ? "translateY(0)" : "translateY(8px)",
    transition:
      "opacity 1.1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
  };
}

/*
 * Runs a cascade of `count` sections after `startDelay`, `stagger` apart.
 * Returns how many are visible. Skips straight to done under reduced motion.
 */
export function useCascade(count, { startDelay = 300, stagger = 250, skip = false } = {}) {
  const [visible, setVisible] = useState(skip ? count : 0);
  useEffect(() => {
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(count);
      return;
    }
    const timers = [];
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => setVisible((v) => Math.max(v, i + 1)), startDelay + (i + 1) * stagger));
    }
    return () => timers.forEach(clearTimeout);
  }, [count, startDelay, stagger, skip]);
  return visible;
}
