"use client";

import { useState } from "react";
import { ArrowLeft } from "iconoir-react";

import TransitionLink from "./TransitionLink";
import { Reveal, cascadeStyle, useCascade } from "./motion";

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

function PostLine({ post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <TransitionLink
      href={`/articles/${encodeURIComponent(post.slug)}`}
      className="block py-8 border-t"
      style={{ borderColor: "var(--d-border)" }}
      {...hoverable(setHovered)}
    >
      <span className="mono block text-xs tracking-[0.05em]" style={{ color: "var(--d-muted)" }}>
        {post.dateLabel}
      </span>
      <span
        className="serif block mt-2 text-3xl sm:text-4xl font-light leading-tight transition-colors duration-[375ms]"
        style={{ color: hovered ? "var(--accent)" : "var(--d-text)" }}
      >
        {post.title}
      </span>
      {post.description ? (
        <span className="serif block mt-3 text-lg sm:text-xl font-light leading-relaxed" style={{ color: "var(--d-subtext)" }}>
          {post.description}
        </span>
      ) : null}
    </TransitionLink>
  );
}

export function ArticlesIndex({ posts }) {
  const visible = useCascade(2, { startDelay: 200, stagger: 300 });
  return (
    <main className="mx-auto px-6 sm:px-8 relative" style={{ maxWidth: "720px" }}>
      <section className="pt-16 sm:pt-24 pb-12" style={cascadeStyle(visible, 1)}>
        <p className="eyebrow mb-5">Writing</p>
        <h1 className="serif text-5xl sm:text-6xl font-light leading-tight">Notes from the work.</h1>
        <p className="serif mt-5 text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
          Essays on art, engineering, and product thinking. Newer pieces go out first on{" "}
          <a
            href="https://andrewpaxson.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-1"
            style={{ color: "var(--accent)" }}
          >
            Mosaic and Monoliths
          </a>
          , my Substack.
        </p>
      </section>
      <section className="pb-20" style={cascadeStyle(visible, 2)}>
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={0.05 * i}>
            <PostLine post={post} />
          </Reveal>
        ))}
      </section>
    </main>
  );
}

export function ArticlePage({ post, children }) {
  const visible = useCascade(2, { startDelay: 200, stagger: 300 });
  return (
    <main className="mx-auto px-6 sm:px-8 relative" style={{ maxWidth: "720px" }}>
      <div className="pt-8 sm:pt-12" style={cascadeStyle(visible, 1)}>
        <TransitionLink
          href="/articles"
          className="mono inline-flex items-center gap-2 text-sm transition-colors duration-[375ms] hover:text-[var(--accent)]"
          style={{ color: "var(--d-detail)" }}
        >
          <ArrowLeft width={16} height={16} /> All writing
        </TransitionLink>
      </div>
      <header className="pt-12 sm:pt-16 pb-10" style={cascadeStyle(visible, 1)}>
        <p className="mono text-xs tracking-[0.05em] mb-4" style={{ color: "var(--d-muted)" }}>
          {post.dateLabel}
        </p>
        <h1 className="serif text-4xl sm:text-5xl font-light leading-tight">{post.title}</h1>
        {post.description ? (
          <p className="serif mt-4 text-xl sm:text-2xl leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
            {post.description}
          </p>
        ) : null}
        {post.image ? (
          <figure className="mt-10">
            <img
              className="w-full rounded-xl border object-cover"
              style={{ borderColor: "var(--d-border)" }}
              src={post.image}
              alt={post.imageCaption || post.title}
            />
            {post.imageCaption ? <figcaption className="figcaption">{post.imageCaption}</figcaption> : null}
          </figure>
        ) : null}
      </header>
      <article className="prose-site pb-20" style={cascadeStyle(visible, 2)}>
        {children}
      </article>
    </main>
  );
}
