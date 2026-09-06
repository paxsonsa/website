import Link from "next/link";
import { ArrowLeft, ArrowRight } from "iconoir-react";

/*
 * Building blocks for story pages. The layout pieces (StoryHeader, StoryNav)
 * are used by app/work/[slug]/page.jsx; the MDX pieces (Figure, Outcomes,
 * Outcome, Note) are passed to MDXRemote so a story can use them directly:
 *
 *   <Figure src="/img/x.webp" alt="..." caption="..." />
 *   <Outcomes>
 *     <Outcome value="[XX%]" label="reduction in review turnaround" />
 *   </Outcomes>
 *   <Note title="What is left out, and why">...</Note>
 */

const label =
  "text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400";

export function StoryHeader({ story, eyebrow }) {
  const meta = [
    story.role && { term: "Role", value: story.role },
    story.timeline && { term: "Timeline", value: story.timeline },
    story.stack.length > 0 && { term: "Stack", value: story.stack.join(" · ") },
    story.team && { term: "Team", value: story.team },
    story.links.length > 0 && {
      term: "Links",
      value: (
        <span className="flex flex-wrap gap-x-3">
          {story.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </span>
      ),
    },
  ].filter(Boolean);

  return (
    <header className="mt-10">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
        {story.title}
      </h1>
      {story.dek ? (
        <p className="mt-5 text-lg leading-7 text-neutral-700 md:text-xl md:leading-8 dark:text-neutral-300">
          {story.dek}
        </p>
      ) : null}
      {meta.length > 0 ? (
        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-200 pt-5 md:grid-cols-4 md:gap-5 dark:border-neutral-800">
          {meta.map((item) => (
            <div key={item.term}>
              <dt className={label}>{item.term}</dt>
              <dd className="mt-2 text-sm leading-6 text-neutral-800 dark:text-neutral-200">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}

export function StoryNav({ next }) {
  return (
    <nav className="mt-16 flex flex-col gap-3 border-t border-neutral-200 py-8 text-sm font-medium sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
      >
        <ArrowLeft width={16} height={16} /> All work
      </Link>
      {next ? (
        <Link
          href={`/work/${encodeURIComponent(next.slug)}`}
          className="inline-flex items-center gap-1.5 text-neutral-900 hover:underline dark:text-neutral-100"
        >
          Next: {next.title} <ArrowRight width={16} height={16} />
        </Link>
      ) : null}
    </nav>
  );
}

export function BackLink() {
  return (
    <Link
      href="/work"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:underline dark:hover:text-neutral-100"
    >
      <ArrowLeft width={16} height={16} /> All work
    </Link>
  );
}

/* ---- MDX components ---- */

export function Figure({ src, alt = "", caption, ratio = "16 / 9" }) {
  return (
    <figure className="my-6 not-prose">
      {src ? (
        <img
          className="w-full rounded-xl border border-neutral-200 object-cover dark:border-neutral-800"
          src={src}
          alt={alt}
        />
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 text-sm text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500"
          style={{ aspectRatio: ratio }}
        >
          {alt || "[Figure]"}
        </div>
      )}
      {caption ? (
        <figcaption className="mt-2 text-xs italic text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Outcomes({ children }) {
  return (
    <div className="not-prose my-5 grid grid-cols-1 gap-4 border-t border-neutral-200 pt-5 sm:grid-cols-3 sm:gap-6 dark:border-neutral-800">
      {children}
    </div>
  );
}

export function Outcome({ value, label: text }) {
  return (
    <div className="flex items-baseline gap-3 sm:block">
      <div className="min-w-[88px] text-3xl font-semibold tracking-tight text-neutral-900 sm:min-w-0 sm:text-4xl dark:text-neutral-100">
        {value}
      </div>
      <div className="text-sm leading-6 text-neutral-600 sm:mt-2 dark:text-neutral-400">
        {text}
      </div>
    </div>
  );
}

export function Note({ title, children }) {
  return (
    <aside className="not-prose my-8 rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900/40">
      {title ? <div className={label}>{title}</div> : null}
      <div className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        {children}
      </div>
    </aside>
  );
}

export const storyComponents = { Figure, Outcomes, Outcome, Note };
