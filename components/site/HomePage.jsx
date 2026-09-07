"use client";

import { useEffect, useRef, useState } from "react";
import { GithubCircle, Linkedin, Threads, Youtube } from "iconoir-react";

import { useSite } from "./SiteContext";
import TransitionLink from "./TransitionLink";
import { Reveal, cascadeStyle } from "./motion";

/* ---------- Intro timing ---------- */
const GREETING = "Hi, I’m Andrew.";
const TYPING_SEGMENTS = [
  { text: "Hi,", pauseAfter: 400 },
  { text: " I’m Andrew.", pauseAfter: 0 },
];
const CHAR_MS = 110;
const START_DELAY_MS = 700;
const TYPING_MS =
  START_DELAY_MS +
  GREETING.length * CHAR_MS +
  TYPING_SEGMENTS.reduce((sum, s) => sum + s.pauseAfter, 0);
const INTRO_MS = TYPING_MS + 500;

// Offsets after the greeting lands. Tighter than the concept: the whole
// intro is about 7s instead of 12s, and any scroll or key press ends it.
const SUBTITLE_MS = INTRO_MS + 150;
const BELIEF_MS = INTRO_MS + 900;
const ROLE_MS = INTRO_MS + 1500;
const SOCIALS_MS = INTRO_MS + 1900;
const SOCIAL_STAGGER_MS = 110;
const HEADER_COMPLETE_MS = INTRO_MS + 2500;
const BLOOM_LEAD_MS = 400;
const SECTION_STAGGER_MS = 250;
const CASCADING_SECTIONS = 5;

const INTRO_KEY = "intro-played";
let introHasPlayed = false;

function introAlreadyPlayed() {
  if (introHasPlayed) return true;
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroPlayed() {
  introHasPlayed = true;
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
}

/* ---------- Typewriter ---------- */
function useTypewriter(enabled) {
  const [displayed, setDisplayed] = useState(enabled ? "" : GREETING);
  const [done, setDone] = useState(!enabled);
  const [started, setStarted] = useState(!enabled);
  const finishRef = useRef(() => {});

  useEffect(() => {
    if (!enabled) {
      setDisplayed(GREETING);
      setDone(true);
      setStarted(true);
      return;
    }
    // Fresh run: clear whatever the non-enabled initial state left behind.
    setDisplayed("");
    setDone(false);
    setStarted(false);
    let cancelled = false;
    let charIndex = 0;
    let segIndex = 0;
    let segChar = 0;
    let timer = null;

    finishRef.current = () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      setDisplayed(GREETING);
      setStarted(true);
      setDone(true);
    };

    function typeNext() {
      if (cancelled) return;
      if (charIndex >= GREETING.length) {
        setDone(true);
        return;
      }
      charIndex++;
      segChar++;
      setDisplayed(GREETING.slice(0, charIndex));
      const seg = TYPING_SEGMENTS[segIndex];
      if (segChar >= seg.text.length && segIndex < TYPING_SEGMENTS.length - 1) {
        segIndex++;
        segChar = 0;
        timer = setTimeout(typeNext, seg.pauseAfter);
      } else {
        timer = setTimeout(typeNext, CHAR_MS + (Math.random() - 0.5) * 60);
      }
    }

    timer = setTimeout(() => {
      setStarted(true);
      typeNext();
    }, START_DELAY_MS);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [enabled]);

  return { displayed, done, started, finish: () => finishRef.current() };
}

/* ---------- Small parts ---------- */
function hoverable(setHovered) {
  return {
    onMouseEnter: () => {
      if (window.matchMedia("(hover: hover)").matches) setHovered(true);
    },
    onMouseLeave: () => {
      if (window.matchMedia("(hover: hover)").matches) setHovered(false);
    },
  };
}

function Statement({ text, detail }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="cursor-pointer py-3"
      onClick={() => setExpanded((v) => !v)}
      {...hoverable(setExpanded)}
    >
      <p
        className="serif text-xl sm:text-2xl leading-relaxed transition-colors duration-[375ms]"
        style={{ color: expanded ? "var(--accent)" : "var(--d-text)" }}
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
        <p className="mono mt-2 text-[0.85rem] leading-relaxed" style={{ color: "var(--d-detail)" }}>
          {detail}
        </p>
      </div>
    </div>
  );
}

function StoryLine({ story }) {
  const [hovered, setHovered] = useState(false);
  const linked = !story.draft;
  const inner = (
    <>
      <span
        className="serif block text-3xl sm:text-4xl font-light transition-colors duration-[375ms]"
        style={{ color: hovered && linked ? "var(--accent)" : "var(--d-text)" }}
      >
        {story.title}
      </span>
      <span className="mono block mt-1.5 text-[0.85rem] leading-relaxed" style={{ color: "var(--d-detail)" }}>
        {story.summary}
        {story.draft ? (
          <span style={{ color: "var(--d-muted)" }}> &middot; {story.labels.status}</span>
        ) : null}
      </span>
    </>
  );
  if (!linked) {
    return <div className="block py-4">{inner}</div>;
  }
  return (
    <TransitionLink
      href={`/work/${encodeURIComponent(story.slug)}`}
      className="block py-4"
      {...hoverable(setHovered)}
    >
      {inner}
    </TransitionLink>
  );
}

function PostLine({ post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <TransitionLink
      href={`/articles/${encodeURIComponent(post.slug)}`}
      className="block py-3"
      {...hoverable(setHovered)}
    >
      <span
        className="serif block text-xl sm:text-2xl font-light leading-snug transition-colors duration-[375ms]"
        style={{ color: hovered ? "var(--accent)" : "var(--d-text)" }}
      >
        {post.title}
      </span>
      <span className="mono block mt-1 text-xs tracking-[0.05em]" style={{ color: "var(--d-muted)" }}>
        {post.dateLabel}
      </span>
    </TransitionLink>
  );
}

function SocialCard({ href, icon: Icon, label, subtitle }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 px-5 py-4 rounded-lg border transition-all duration-[375ms]"
      style={{
        borderColor: hovered ? "var(--accent)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
      }}
      {...hoverable(setHovered)}
    >
      <Icon
        className="flex-shrink-0 transition-colors duration-[375ms]"
        width={28}
        height={28}
        strokeWidth={1.4}
        style={{ color: hovered ? "var(--accent)" : "var(--d-detail)" }}
      />
      <div className="flex-1 min-w-0">
        <span
          className="serif block text-lg transition-colors duration-[375ms]"
          style={{ color: hovered ? "var(--accent)" : "var(--d-text)" }}
        >
          {label}
        </span>
        <span className="mono block text-xs mt-0.5" style={{ color: "var(--d-muted)" }}>
          {subtitle}
        </span>
      </div>
      <span
        className="text-lg transition-all duration-[375ms]"
        style={{
          color: hovered ? "var(--accent)" : "var(--d-muted)",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        &rarr;
      </span>
    </a>
  );
}

function SocialLinkSmall({ href, icon: Icon, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-md border transition-all duration-[375ms]"
      style={{
        borderColor: hovered ? "var(--accent)" : "var(--d-border)",
        backgroundColor: hovered ? "var(--d-hover-bg)" : "transparent",
      }}
      {...hoverable(setHovered)}
    >
      <Icon
        width={18}
        height={18}
        strokeWidth={1.5}
        className="transition-colors duration-[375ms]"
        style={{ color: hovered ? "var(--accent)" : "var(--d-detail)" }}
      />
      <span
        className="mono text-sm transition-colors duration-[375ms]"
        style={{ color: hovered ? "var(--accent)" : "var(--d-text)" }}
      >
        {label}
      </span>
    </a>
  );
}

function SocialIconSmall({ href, icon: Icon, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center transition-colors duration-[375ms]"
      style={{ color: hovered ? "var(--accent)" : "var(--d-detail)" }}
      {...hoverable(setHovered)}
    >
      <Icon width={20} height={20} strokeWidth={1.5} />
    </a>
  );
}

function SectionLabel({ children }) {
  return <p className="eyebrow mb-6">{children}</p>;
}

function MonoLink({ href, children, pulse = false }) {
  return (
    <TransitionLink
      href={href}
      className={`mono inline-block text-sm font-semibold border-b-2 pb-0.5 transition-opacity duration-[375ms] hover:opacity-80${pulse ? " accent-pulse" : ""}`}
      style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
    >
      {children}
    </TransitionLink>
  );
}

const SOCIALS = [
  { href: "https://www.linkedin.com/in/andrewpaxson", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/paxsonsa", icon: GithubCircle, label: "GitHub" },
  { href: "https://www.threads.com/@paxsonsa", icon: Threads, label: "Threads" },
  { href: "https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q", icon: Youtube, label: "YouTube" },
];

/* ---------- Page ---------- */
export default function HomePage({ stories, posts }) {
  const { setBloomPhase, setBloomProgress, setChromeVisible } = useSite();

  // Decide once, on the client, whether the intro plays. It plays on the
  // first visit of a session, and never under prefers-reduced-motion.
  const [mode, setMode] = useState("pending"); // pending | intro | skip
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduced || introAlreadyPlayed() ? "skip" : "intro");
  }, []);

  const playing = mode === "intro";
  const typewriter = useTypewriter(playing);
  const [introDone, setIntroDone] = useState(false);
  const [headerComplete, setHeaderComplete] = useState(false);
  const [visibleSections, setVisibleSections] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (mode === "pending") return;
    const timers = [];

    function finishNow() {
      if (finishedRef.current) return;
      finishedRef.current = true;
      timers.forEach(clearTimeout);
      typewriter.finish();
      setIntroDone(true);
      setHeaderComplete(true);
      setVisibleSections(CASCADING_SECTIONS);
      setBloomPhase("full");
      setBloomProgress(1);
      setChromeVisible(true);
      markIntroPlayed();
    }

    if (mode === "skip") {
      finishNow();
      return;
    }

    setChromeVisible(false);
    setBloomPhase("dormant");
    setBloomProgress(0);

    timers.push(setTimeout(() => setIntroDone(true), INTRO_MS));
    timers.push(
      setTimeout(() => {
        setBloomPhase("opening");
        setBloomProgress(0);
      }, HEADER_COMPLETE_MS - BLOOM_LEAD_MS),
    );
    timers.push(
      setTimeout(() => {
        setHeaderComplete(true);
        setChromeVisible(true);
      }, HEADER_COMPLETE_MS),
    );
    for (let i = 0; i < CASCADING_SECTIONS; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleSections((v) => Math.max(v, i + 1));
          setBloomProgress((i + 1) / CASCADING_SECTIONS);
        }, HEADER_COMPLETE_MS + (i + 1) * SECTION_STAGGER_MS),
      );
    }
    timers.push(
      setTimeout(() => {
        finishedRef.current = true;
        setBloomPhase("full");
        markIntroPlayed();
      }, HEADER_COMPLETE_MS + CASCADING_SECTIONS * SECTION_STAGGER_MS + 500),
    );

    // Any intent to move on ends the theatre.
    const events = ["wheel", "touchstart", "keydown", "pointerdown"];
    events.forEach((ev) => window.addEventListener(ev, finishNow, { passive: true }));

    return () => {
      timers.forEach(clearTimeout);
      events.forEach((ev) => window.removeEventListener(ev, finishNow));
      setChromeVisible(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const skipped = mode === "skip" || headerComplete;
  const delay = (ms) => ({ "--delay": `${ms}ms` });

  return (
    <main
      className={`mx-auto px-6 sm:px-8 breathing relative${skipped ? " stagger-done" : ""}`}
      style={{ maxWidth: "720px", visibility: mode === "pending" ? "hidden" : "visible" }}
    >
      {/* 1. Opening */}
      <section className="pt-24 sm:pt-36 pb-24">
        <h1 className="serif text-5xl sm:text-6xl font-light leading-tight">
          <span className="inline-block whitespace-nowrap">
            {typewriter.displayed}
            {typewriter.started ? (
              <span
                className={`typewriter-cursor${typewriter.done && introDone ? " is-done" : ""}`}
                aria-hidden="true"
              />
            ) : null}
          </span>
        </h1>

        <p
          className="stagger serif mt-4 text-xl sm:text-2xl leading-relaxed font-light"
          style={{ color: "var(--d-subtext)", ...delay(SUBTITLE_MS) }}
        >
          I&rsquo;m a product designer and engineer who builds tools for creative teams.
        </p>

        <p
          className="stagger serif mt-3 text-lg sm:text-xl leading-relaxed font-light"
          style={{ color: "var(--accent)", ...delay(BELIEF_MS) }}
        >
          I believe the best software disappears into the work it enables.
        </p>

        <p
          className="stagger mono mt-6 text-base"
          style={{ color: "var(--d-detail)", letterSpacing: "0.02em", ...delay(ROLE_MS) }}
        >
          Staff Engineer at Industrial Light &amp; Magic
        </p>

        <div className="mt-5 flex items-center gap-5">
          {SOCIALS.map((social, i) => (
            <span
              key={social.href}
              className="social-pile-in"
              style={delay(SOCIALS_MS + i * SOCIAL_STAGGER_MS)}
            >
              <SocialIconSmall {...social} />
            </span>
          ))}
        </div>
      </section>

      {/* 2. Narrative */}
      <section className="pb-20 space-y-14" style={cascadeStyle(visibleSections, 1)}>
        <Reveal>
          <p className="serif text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
            For the past decade, I&rsquo;ve worked at the intersection of design and
            engineering: the place where taste meets craft, and ideas become tools
            people actually reach for.
          </p>
        </Reveal>
        <Reveal>
          <p className="serif text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
            Currently at{" "}
            <span style={{ color: "var(--d-text)", fontWeight: 400 }}>Industrial Light &amp; Magic</span>,
            where I build the internal tools that help artists create the impossible.
          </p>
        </Reveal>
      </section>

      {/* 3. What I do */}
      <section className="pb-24" style={cascadeStyle(visibleSections, 2)}>
        <Reveal>
          <SectionLabel>What I do</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <Statement
            text="I design products end-to-end, from research to shipped code."
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

      {/* 4. Selected work */}
      {stories.length > 0 ? (
        <section className="pb-24" style={cascadeStyle(visibleSections, 3)}>
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
          </Reveal>
          {stories.map((story, i) => (
            <Reveal key={story.slug} delay={0.1 + i * 0.05}>
              <StoryLine story={story} />
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <div className="mt-6">
              <MonoLink href="/work">All work &rarr;</MonoLink>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* 5. Writing */}
      <section className="pb-24" style={cascadeStyle(visibleSections, 4)}>
        <Reveal>
          <p className="serif text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
            I write about the intersection of art, engineering, and product thinking in a
            blog called{" "}
            <span style={{ color: "var(--d-text)", fontWeight: 400 }}>Mosaic and Monoliths</span>:
            mosaics of art and product systems, monoliths as engineering simplicity.
          </p>
        </Reveal>
        {posts.length > 0 ? (
          <div className="mt-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={0.1 + i * 0.05}>
                <PostLine post={post} />
              </Reveal>
            ))}
          </div>
        ) : null}
        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <MonoLink href="https://andrewpaxson.substack.com" pulse>
              Read the blog &rarr;
            </MonoLink>
            <MonoLink href="/articles">All writing &rarr;</MonoLink>
          </div>
        </Reveal>
      </section>

      {/* 6. Connect */}
      <section className="pb-20" style={cascadeStyle(visibleSections, 5)}>
        <Reveal>
          <p className="serif text-xl sm:text-2xl leading-relaxed font-light mb-8" style={{ color: "var(--d-subtext)" }}>
            The best way to find me:
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-3">
            <SocialCard href={SOCIALS[0].href} icon={Linkedin} label="LinkedIn" subtitle="Resume & Career" />
            <SocialCard href={SOCIALS[1].href} icon={GithubCircle} label="GitHub" subtitle="Engineering Work" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex gap-3 mt-4">
            <SocialLinkSmall href={SOCIALS[2].href} icon={Threads} label="Threads" />
            <SocialLinkSmall href={SOCIALS[3].href} icon={Youtube} label="YouTube" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
