"use client";

import { ArrowLeft, ArrowRight } from "iconoir-react";

import TransitionLink from "./TransitionLink";
import { cascadeStyle, useCascade } from "./motion";
import { Figure } from "./mdx";

function BackLink({ href = "/work", children = "All work" }) {
  return (
    <TransitionLink
      href={href}
      className="mono inline-flex items-center gap-2 text-sm transition-colors duration-[375ms] hover:text-[var(--accent)]"
      style={{ color: "var(--d-detail)" }}
    >
      <ArrowLeft width={16} height={16} /> {children}
    </TransitionLink>
  );
}

function Meta({ story }) {
  const items = [
    story.role && { term: "Role", value: story.role },
    story.timeline && { term: "Timeline", value: story.timeline },
    story.team && { term: "Team", value: story.team },
    story.links.length > 0 && {
      term: "Links",
      value: story.links.map((link, i) => (
        <span key={link.href}>
          {i > 0 ? " · " : ""}
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-1 transition-colors duration-[375ms] hover:text-[var(--accent)]"
          >
            {link.label}
          </a>
        </span>
      )),
    },
  ].filter(Boolean);
  if (!items.length) return null;
  return (
    <dl
      className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 sm:grid-cols-4"
      style={{ borderColor: "var(--d-border)" }}
    >
      {items.map((item) => (
        <div key={item.term}>
          <dt className="eyebrow">{item.term}</dt>
          <dd className="mono mt-2 text-[0.8rem] leading-relaxed" style={{ color: "var(--d-subtext)" }}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function StoryPage({ story, next, children }) {
  const visible = useCascade(3, { startDelay: 200, stagger: 300 });

  return (
    <main className="mx-auto px-6 sm:px-8 relative" style={{ maxWidth: "720px" }}>
      <div className="pt-8 sm:pt-12" style={cascadeStyle(visible, 1)}>
        <BackLink />
      </div>

      <header className="pt-12 sm:pt-16 pb-12" style={cascadeStyle(visible, 1)}>
        <p className="eyebrow mb-4">{story.eyebrow}</p>
        <h1 className="serif text-4xl sm:text-5xl font-light leading-tight">{story.title}</h1>
        {story.dek ? (
          <p className="serif mt-4 text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
            {story.dek}
          </p>
        ) : null}
        {story.stack.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {story.stack.map((tag) => (
              <span
                key={tag}
                className="mono text-xs px-3 py-1 rounded-full border"
                style={{ borderColor: "var(--d-border)", color: "var(--d-detail)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <Meta story={story} />
      </header>

      <div style={cascadeStyle(visible, 2)}>
        {story.image || story.imageCaption ? (
          <Figure src={story.image} alt={story.image ? story.title : "[Hero image]"} caption={story.imageCaption} />
        ) : null}
        <article className="prose-site pb-16">{children}</article>
      </div>

      <nav
        className="border-t pt-8 pb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "var(--d-border)", ...cascadeStyle(visible, 3) }}
      >
        <BackLink />
        {next ? (
          <TransitionLink
            href={`/work/${encodeURIComponent(next.slug)}`}
            className="mono inline-flex items-center gap-2 text-sm transition-colors duration-[375ms] hover:text-[var(--accent)]"
            style={{ color: "var(--d-detail)" }}
          >
            Next: {next.title} <ArrowRight width={16} height={16} />
          </TransitionLink>
        ) : null}
      </nav>
    </main>
  );
}
