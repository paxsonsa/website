"use client";

import { useEffect, useRef, useState } from "react";
import { Threads, GithubCircle, Linkedin, Youtube } from "iconoir-react";
import { useDialogue } from "./DialogueContext";

// --- Custom hook: trigger a CSS class when an element scrolls into view ---

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// --- Scroll-reveal wrapper ---

function Reveal({ children, className = "", delay = 0, style = {} }) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// --- Expandable statement ---

function Statement({ text, detail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group cursor-pointer py-3"
      onClick={() => setExpanded((v) => !v)}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setExpanded(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) setExpanded(false);
      }}
    >
      <p
        className="text-xl sm:text-2xl leading-relaxed transition-colors duration-[375ms]"
        style={{
          fontFamily: "var(--font-newsreader)",
          color: expanded ? "var(--accent, #0891B2)" : "var(--d-text)",
        }}
      >
        {text}
      </p>
      <div
        style={{
          maxHeight: expanded ? "80px" : "0",
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease-out, opacity 0.4s ease-out",
        }}
      >
        <p
          className="text-base leading-relaxed mt-2"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-detail)",
            fontSize: "0.85rem",
          }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

// --- Project line ---

function ProjectLine({ name, description, href }) {
  const [hovered, setHovered] = useState(false);
  const { navigateWithFade } = useDialogue();

  const inner = (
    <>
      <span
        className="text-3xl sm:text-4xl font-light transition-colors duration-[375ms]"
        style={{
          fontFamily: "var(--font-newsreader)",
          color: hovered ? "var(--accent, #0891B2)" : "var(--d-text)",
        }}
      >
        {name}
      </span>
      <div
        style={{
          maxHeight: hovered ? "60px" : "0",
          opacity: hovered ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease-out, opacity 0.35s ease-out",
        }}
      >
        <p
          className="text-base leading-relaxed mt-1"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-detail)",
            fontSize: "0.85rem",
          }}
        >
          {description}
        </p>
      </div>
    </>
  );

  const handlers = {
    onMouseEnter: () => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); },
    onMouseLeave: () => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); },
  };

  if (href) {
    return (
      <div
        className="block py-4 cursor-pointer"
        onClick={(e) => { e.preventDefault(); navigateWithFade(href); }}
        {...handlers}
      >
        {inner}
      </div>
    );
  }

  return (
    <div className="py-4 cursor-pointer" onClick={() => setHovered((v) => !v)} {...handlers}>
      {inner}
    </div>
  );
}

// --- Social card (large) ---

function SocialCard({ href, icon: Icon, label, subtitle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-5 px-5 py-4 rounded-lg border transition-all duration-[375ms]"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
      }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
      onClick={() => setHovered((v) => !v)}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-[375ms]"
        width={28}
        height={28}
        strokeWidth={1.4}
        style={{ color: hovered ? "var(--accent, #0891B2)" : "var(--d-social-icon)" }}
      />
      <div className="flex-1 min-w-0">
        <span
          className="block text-lg font-normal transition-colors duration-[375ms]"
          style={{
            fontFamily: "var(--font-newsreader)",
            color: hovered ? "var(--accent, #0891B2)" : "var(--d-text)",
          }}
        >
          {label}
        </span>
        <span
          className="block text-xs mt-0.5"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-muted)",
          }}
        >
          {subtitle}
        </span>
      </div>
      <span
        className="text-lg transition-all duration-[375ms]"
        style={{
          color: hovered ? "var(--accent, #0891B2)" : "var(--d-muted)",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        &rarr;
      </span>
    </a>
  );
}

// --- Social link (small) ---

function SocialLinkSmall({ href, icon: Icon, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-md border transition-all duration-[375ms]"
      style={{
        borderColor: hovered ? "var(--accent, #0891B2)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
        color: "var(--d-text)",
      }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-[375ms]"
        width={18}
        height={18}
        strokeWidth={1.5}
        style={{ color: hovered ? "var(--accent, #0891B2)" : "var(--d-social-icon)" }}
      />
      <span
        className="text-sm font-normal transition-colors duration-[375ms]"
        style={{
          fontFamily: "var(--font-overpass-mono)",
          color: hovered ? "var(--accent, #0891B2)" : "var(--d-social-label)",
        }}
      >
        {label}
      </span>
    </a>
  );
}

// --- Compact social icon for header row ---

function SocialIconSmall({ href, icon: Icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center transition-colors duration-[375ms]"
      style={{ color: hovered ? "var(--accent, #0891B2)" : "var(--d-muted)" }}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(true); }}
      onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setHovered(false); }}
    >
      <Icon width={20} height={20} strokeWidth={1.5} />
    </a>
  );
}

// --- Constants ---

const GREETING = "Hi, I\u2019m Andrew.";
const TYPING_DURATION_MS = 1800;
const CURSOR_PAUSE_MS = 600;
const TOTAL_INTRO_DELAY_MS = TYPING_DURATION_MS + CURSOR_PAUSE_MS;

const SUBTITLE_DELAY_MS = TOTAL_INTRO_DELAY_MS + 200;
const BELIEF_DELAY_MS = TOTAL_INTRO_DELAY_MS + 2200;
const ROLE_DELAY_MS = TOTAL_INTRO_DELAY_MS + 4200;
const SOCIALS_DELAY_MS = TOTAL_INTRO_DELAY_MS + 5000;
const SOCIAL_ICON_STAGGER_MS = 120;
const HEADER_COMPLETE_MS = TOTAL_INTRO_DELAY_MS + 6200;
const SECTION_STAGGER_MS = 350;
const CASCADING_SECTIONS = 6;

// Module-level flag — survives client-side navigations but resets on full page refresh
let introHasPlayed = false;

export default function DialoguePage() {
  const { navigateWithFade, setBloomPhase, setBloomProgress } = useDialogue();

  // Animation states
  const [typingDone, setTypingDone] = useState(false);
  const [bloomStarted, setBloomStarted] = useState(false);
  const [headerComplete, setHeaderComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);

  useEffect(() => {
    const timers = [];

    if (introHasPlayed) {
      // Returning via client-side nav — skip intro, bloom stays full
      setBloomPhase("full");
      setBloomProgress(1);
      requestAnimationFrame(() => {
        setTypingDone(true);
        setBloomStarted(true);
        setHeaderComplete(true);
        setVisibleSections(CASCADING_SECTIONS);
      });
    } else {
      // Fresh page load — start bloom dormant, run intro
      setBloomPhase("dormant");
      setBloomProgress(0);

      timers.push(setTimeout(() => setTypingDone(true), TOTAL_INTRO_DELAY_MS));

      // Bloom starts opening before header completes
      const BLOOM_LEAD_MS = 400;
      timers.push(setTimeout(() => {
        setBloomStarted(true);
        setBloomPhase("opening");
        setBloomProgress(0);
      }, HEADER_COMPLETE_MS - BLOOM_LEAD_MS));

      timers.push(setTimeout(() => setHeaderComplete(true), HEADER_COMPLETE_MS));

      // Cascade sections and advance bloom progress together
      for (let i = 0; i < CASCADING_SECTIONS; i++) {
        timers.push(
          setTimeout(() => {
            setVisibleSections((v) => v + 1);
            setBloomProgress((i + 1) / CASCADING_SECTIONS);
          }, HEADER_COMPLETE_MS + (i + 1) * SECTION_STAGGER_MS)
        );
      }

      // Mark intro complete
      timers.push(
        setTimeout(() => {
          introHasPlayed = true;
          setBloomPhase("full");
        }, HEADER_COMPLETE_MS + CASCADING_SECTIONS * SECTION_STAGGER_MS + 500)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  const cascadeStyle = (visible, index) => ({
    opacity: visible >= index ? 1 : 0,
    transform: visible >= index ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  return (
    <main
      className="mx-auto px-6 sm:px-8 breathing relative"
      style={{ maxWidth: "720px" }}
    >
      {/* 1. Opening — Typing animation + compact social row */}
      <section className="pt-32 sm:pt-44 pb-24">
        <h1
          className="text-5xl sm:text-6xl font-light leading-tight"
          style={{ fontFamily: "var(--font-newsreader)" }}
        >
          <span className="typewriter-wrapper">
            <span className="typewriter-text">{GREETING}</span>
          </span>
        </h1>

        <p
          className="stagger-after-1 mt-4 text-xl sm:text-2xl leading-relaxed font-light"
          style={{
            fontFamily: "var(--font-newsreader)",
            color: "var(--d-subtext)",
          }}
        >
          I&rsquo;m a product designer and engineer who builds tools for
          creative teams.
        </p>

        <p
          className="stagger-after-1b mt-3 text-lg sm:text-xl leading-relaxed font-light"
          style={{
            fontFamily: "var(--font-newsreader)",
            color: "var(--accent, #0891B2)",
          }}
        >
          I believe the best software disappears into the work it enables.
        </p>

        <p
          className="stagger-after-2 mt-6 text-base"
          style={{
            fontFamily: "var(--font-overpass-mono)",
            color: "var(--d-muted)",
            letterSpacing: "0.02em",
          }}
        >
          Staff Engineer at Industrial Light &amp; Magic
        </p>

        {/* Compact social icon row — pile in one by one */}
        <div className="mt-5 flex items-center gap-5">
          {[
            { href: "https://www.linkedin.com/in/andrewpaxson", icon: Linkedin },
            { href: "https://github.com/paxsonsa", icon: GithubCircle },
            { href: "https://www.threads.com/@paxsonsa", icon: Threads },
            { href: "https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q", icon: Youtube },
          ].map((social, i) => (
            <span
              key={social.href}
              className="social-pile-in"
              style={{ animationDelay: `${SOCIALS_DELAY_MS + i * SOCIAL_ICON_STAGGER_MS}ms` }}
            >
              <SocialIconSmall href={social.href} icon={social.icon} />
            </span>
          ))}
        </div>
      </section>

      {/* Below-header content — cascades in section by section */}
      <div>
        {/* 2. Flowing narrative */}
        <section className="pb-20 space-y-16 cascade-section" style={cascadeStyle(visibleSections, 1)}>
          <Reveal>
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--d-subtext)",
              }}
            >
              For the past decade, I&rsquo;ve worked at the intersection of
              design and engineering&mdash;the place where taste meets
              craft, and ideas become tools people actually reach for.
            </p>
          </Reveal>

          <Reveal>
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--d-subtext)",
              }}
            >
              Currently at{" "}
              <span style={{ color: "var(--d-text)", fontWeight: 400 }}>
                Industrial Light &amp; Magic
              </span>
              , where I build the internal tools that help artists create
              the impossible.
            </p>
          </Reveal>
        </section>

        {/* 3. What I do */}
        <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 2)}>
          <Reveal>
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "var(--d-muted)",
              }}
            >
              What I do
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Statement
              text="I design products end-to-end — from research to shipped code."
              detail="User research, system design, prototyping, production frontend and backend implementation."
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Statement
              text="I build tools for complex creative workflows."
              detail="VFX production pipelines, asset management, artist-facing applications at studio scale."
            />
          </Reveal>
          <Reveal delay={0.2}>
            <Statement
              text="I lead distributed teams that ship."
              detail="Cross-functional collaboration across studios, time zones, and disciplines."
            />
          </Reveal>
        </section>

        {/* 4. Work */}
        <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 3)}>
          <Reveal>
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "var(--d-muted)",
              }}
            >
              Selected work
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ProjectLine
              name="MotionStage"
              description="Pipeline tooling for motion-capture workflows at ILM."
              href="/concepts/dialogue/projects/motion-stage"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <ProjectLine
              name="PelagoDB"
              description="High-performance data platform for production VFX assets."
            />
          </Reveal>
          <Reveal delay={0.2}>
            <ProjectLine
              name="KnowledgeDB"
              description="Internal knowledge graph for studio institutional memory."
            />
          </Reveal>
        </section>

        {/* 5. Writing */}
        <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 4)}>
          <Reveal>
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--d-subtext)",
              }}
            >
              I write about the intersection of art, engineering, and product
              thinking in a blog called{" "}
              <span style={{ color: "var(--d-text)", fontWeight: 400 }}>
                Mosaic and Monoliths
              </span>
              &mdash;mosaics of art and product systems, monoliths as
              engineering simplicity.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="https://andrewpaxson.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-base font-semibold transition-colors duration-[375ms] border-b-2 teal-pulse"
              style={{
                fontFamily: "var(--font-overpass-mono)",
                color: "var(--accent, #0891B2)",
                borderColor: "var(--accent, #0891B2)",
                paddingBottom: "2px",
              }}
            >
              Read the blog &rarr;
            </a>
          </Reveal>
        </section>

        {/* 6. Connect */}
        <section className="pb-24 cascade-section" style={cascadeStyle(visibleSections, 5)}>
          <Reveal>
            <p
              className="text-xl sm:text-2xl leading-relaxed font-light mb-8"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--d-subtext)",
              }}
            >
              The best way to find me:
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              <SocialCard
                href="https://www.linkedin.com/in/andrewpaxson"
                icon={Linkedin}
                label="LinkedIn"
                subtitle="Resume & Career"
              />
              <SocialCard
                href="https://github.com/paxsonsa"
                icon={GithubCircle}
                label="GitHub"
                subtitle="Engineering Work"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex gap-3 mt-4">
              <SocialLinkSmall
                href="https://www.threads.com/@paxsonsa"
                icon={Threads}
                label="Threads"
              />
              <SocialLinkSmall
                href="https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q"
                icon={Youtube}
                label="YouTube"
              />
            </div>
          </Reveal>
        </section>

        {/* 7. Footer */}
        <footer className="border-t pt-8 pb-16 cascade-section" style={{ borderColor: "var(--d-border)", ...cascadeStyle(visibleSections, 6) }}>
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
      </div>
    </main>
  );
}
