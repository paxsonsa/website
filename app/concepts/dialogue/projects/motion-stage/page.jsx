"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "iconoir-react";
import { useDialogue } from "../../DialogueContext";
import "./motion-stage.css";

// --- Timing ---
const CONTENT_DELAY_MS = 300;
const SECTION_STAGGER_MS = 300;
const CASCADING_SECTIONS = 5;

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
  const { navigateWithFade } = useDialogue();
  const [contentReady, setContentReady] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const contentTimer = setTimeout(() => setContentReady(true), CONTENT_DELAY_MS);
    const sectionTimers = [];
    for (let i = 0; i < CASCADING_SECTIONS; i++) {
      sectionTimers.push(
        setTimeout(() => setVisibleSections((v) => v + 1), CONTENT_DELAY_MS + (i + 1) * SECTION_STAGGER_MS)
      );
    }
    return () => {
      clearTimeout(contentTimer);
      sectionTimers.forEach(clearTimeout);
    };
  }, []);

  const cascadeStyle = (visible, index) => ({
    opacity: visible >= index ? 1 : 0,
    transform: visible >= index ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  return (
    <main
      className="mx-auto px-6 sm:px-8 relative"
      style={{ maxWidth: "720px" }}
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
            color: "var(--d-muted)",
            background: "none",
            border: "none",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent, #0891B2)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--d-muted)")}
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
            color: "var(--d-muted)",
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
            color: "var(--d-subtext)",
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
              style={{ borderColor: "var(--d-border)", color: "var(--d-detail)" }}
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
            style={{ fontFamily: "var(--font-overpass-mono)", color: "var(--d-muted)" }}
          >
            Overview
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="text-xl sm:text-2xl leading-relaxed font-light"
            style={{ fontFamily: "var(--font-newsreader)", color: "var(--d-subtext)" }}
          >
            Motion-capture sessions at ILM generate terabytes of data per day.
            Artists needed a way to review, tag, and route takes through the
            production pipeline without losing context or time.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p
            className="mt-6 text-xl sm:text-2xl leading-relaxed font-light"
            style={{ fontFamily: "var(--font-newsreader)", color: "var(--d-subtext)" }}
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
            style={{ fontFamily: "var(--font-overpass-mono)", color: "var(--d-muted)" }}
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
                style={{ fontFamily: "var(--font-newsreader)", color: "var(--d-text)" }}
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
            style={{ fontFamily: "var(--font-overpass-mono)", color: "var(--d-muted)" }}
          >
            Approach
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="text-xl sm:text-2xl leading-relaxed font-light"
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
            style={{ fontFamily: "var(--font-newsreader)", color: "var(--d-subtext)" }}
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
            style={{ fontFamily: "var(--font-overpass-mono)", color: "var(--d-muted)" }}
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
                    color: "var(--d-subtext)",
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
        <div className="border-t pt-8" style={{ borderColor: "var(--d-border)" }}>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigateWithFade("/concepts/dialogue")}
              className="text-sm transition-colors duration-[375ms] cursor-pointer"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "var(--d-muted)",
                background: "none",
                border: "none",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent, #0891B2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--d-muted)")}
            >
              &larr; All Work
            </button>
            <button
              onClick={() => navigateWithFade("/concepts/dialogue/projects/motion-stage")}
              className="text-sm transition-colors duration-[375ms] cursor-pointer"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "var(--d-muted)",
                background: "none",
                border: "none",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent, #0891B2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--d-muted)")}
            >
              Next Project &rarr;
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t pt-8 pb-16" style={{ borderColor: "var(--d-border)" }}>
        <p
          className="text-xs"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-muted)",
          }}
        >
          &copy; 2025 Andrew Paxson
        </p>
      </footer>
    </main>
  );
}
