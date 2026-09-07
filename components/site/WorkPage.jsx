"use client";

import { useState } from "react";

import TransitionLink from "./TransitionLink";
import { Reveal, cascadeStyle, useCascade } from "./motion";

const GROUPS = [
  {
    visibility: "public",
    title: "Public projects",
    note: "Architecture, implementation detail, and links to the repositories.",
  },
  {
    visibility: "nda",
    title: "Product work at ILM",
    note: "Process, leadership, and impact, written within confidentiality limits.",
  },
];

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

function StoryLine({ story }) {
  const [hovered, setHovered] = useState(false);
  const linked = !story.draft;
  const facts = [story.year, story.role, story.stack.length ? story.stack.join(" · ") : null].filter(Boolean);

  const inner = (
    <>
      <span className="mono block text-[0.7rem] tracking-[0.18em] uppercase" style={{ color: "var(--d-muted)" }}>
        {story.eyebrow}
      </span>
      <span
        className="serif block mt-2 text-3xl sm:text-4xl font-light leading-tight transition-colors duration-[375ms]"
        style={{ color: hovered && linked ? "var(--accent)" : "var(--d-text)" }}
      >
        {story.title}
      </span>
      <span className="serif block mt-2 text-lg sm:text-xl font-light leading-relaxed" style={{ color: "var(--d-subtext)" }}>
        {story.summary}
      </span>
      {facts.length ? (
        <span className="mono block mt-3 text-xs tracking-[0.03em]" style={{ color: "var(--d-muted)" }}>
          {facts.join("   ·   ")}
        </span>
      ) : null}
      {linked ? (
        <span
          className="mono block mt-3 text-xs transition-all duration-[375ms]"
          style={{
            color: "var(--accent)",
            opacity: hovered ? 1 : 0.7,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          Read the story &rarr;
        </span>
      ) : null}
    </>
  );

  const className = "block py-8 border-t";
  const style = { borderColor: "var(--d-border)" };
  if (!linked) {
    return (
      <div className={className} style={style}>
        {inner}
      </div>
    );
  }
  return (
    <TransitionLink
      href={`/work/${encodeURIComponent(story.slug)}`}
      className={className}
      style={style}
      {...hoverable(setHovered)}
    >
      {inner}
    </TransitionLink>
  );
}

export default function WorkPage({ stories }) {
  const visible = useCascade(GROUPS.length + 2, { startDelay: 200, stagger: 250 });
  const publicCount = stories.filter((s) => s.visibility === "public").length;
  const ndaCount = stories.length - publicCount;

  return (
    <main className="mx-auto px-6 sm:px-8 relative" style={{ maxWidth: "720px" }}>
      <section className="pt-16 sm:pt-24 pb-16" style={cascadeStyle(visible, 1)}>
        <p className="eyebrow mb-5">Work</p>
        <h1 className="serif text-5xl sm:text-6xl font-light leading-tight">Things I&rsquo;ve built.</h1>
        <p className="serif mt-5 text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
          {stories.length} stories. {publicCount} public, repository-backed projects, and{" "}
          {ndaCount} product stories from ILM scoped to what an NDA allows.
        </p>
      </section>

      {GROUPS.map((group, gi) => {
        const items = stories.filter((s) => s.visibility === group.visibility);
        if (!items.length) return null;
        return (
          <section key={group.visibility} className="pb-16" style={cascadeStyle(visible, gi + 2)}>
            <Reveal>
              <p className="eyebrow">{group.title}</p>
              <p className="mono mt-2 mb-4 text-[0.8rem] leading-relaxed" style={{ color: "var(--d-detail)" }}>
                {group.note}
              </p>
            </Reveal>
            {items.map((story, i) => (
              <Reveal key={story.slug} delay={0.05 * i}>
                <StoryLine story={story} />
              </Reveal>
            ))}
          </section>
        );
      })}

      <section className="pb-20" style={cascadeStyle(visible, GROUPS.length + 2)}>
        <Reveal>
          <p className="serif text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
            Stories publish as they&rsquo;re finished. New ones go out on Substack first.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <TransitionLink
              href="https://andrewpaxson.substack.com"
              className="mono inline-block text-sm font-semibold border-b-2 pb-0.5 transition-opacity duration-[375ms] hover:opacity-80"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Follow on Substack &rarr;
            </TransitionLink>
            <TransitionLink
              href="https://www.linkedin.com/in/andrewpaxson"
              className="mono inline-block text-sm font-semibold border-b-2 pb-0.5 transition-opacity duration-[375ms] hover:opacity-80"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Get in touch &rarr;
            </TransitionLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
