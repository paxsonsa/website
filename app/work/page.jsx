import Link from "next/link";

import Header from "@/components/Header";
import { getStories, storyEyebrow } from "@/lib/stories";

export const metadata = {
  title: "Work · Andrew Paxson",
  description:
    "Case studies for product systems, databases, and studio platforms.",
};

const groups = [
  {
    visibility: "public",
    title: "Public projects",
    note: "Architecture, implementation detail, and links to the repositories.",
    columns: "md:grid-cols-3",
  },
  {
    visibility: "nda",
    title: "Product work at ILM",
    note: "Process, leadership, and impact, written within confidentiality limits.",
    columns: "md:grid-cols-2",
  },
];

export default function Work() {
  const stories = getStories();

  return (
    <>
      <Header sticky />

      <section className="mx-auto mt-10 w-full max-w-5xl px-6 md:mt-16 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Work
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
            Case studies for product systems, databases, and studio platforms.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            Five stories. Three are public, repository-backed project stories.
            Two are product stories from ILM, scoped to what an NDA allows.
          </p>
        </div>
      </section>

      {groups.map((group) => {
        const items = stories.filter(
          (story) => story.visibility === group.visibility,
        );
        if (items.length === 0) return null;

        return (
          <section
            key={group.visibility}
            className="mx-auto mt-12 w-full max-w-5xl px-6 md:mt-16 md:px-8"
          >
            <div className="flex flex-col gap-1 border-t border-neutral-200 pt-6 md:flex-row md:items-baseline md:justify-between dark:border-neutral-800">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                {group.title}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {group.note}
              </p>
            </div>
            <div className={`mt-6 grid gap-4 ${group.columns}`}>
              {items.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mx-auto mb-12 mt-12 w-full max-w-5xl px-6 md:mt-16 md:px-8">
        <div className="flex flex-col gap-5 border-t border-neutral-200 pt-6 md:flex-row md:items-center md:justify-between dark:border-neutral-800">
          <p className="text-[15px] leading-6 text-neutral-700 dark:text-neutral-300">
            Stories publish as they are finished. New ones go out on Substack
            first.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              href="https://andrewpaxson.substack.com"
            >
              Follow Updates
            </Link>
            <Link
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-500 dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-neutral-400"
              href="https://www.linkedin.com/in/andrewpaxson"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StoryCard({ story }) {
  const facts = [
    story.year,
    story.role,
    story.stack.length > 0 ? story.stack.join(" · ") : null,
  ].filter(Boolean);

  const body = (
    <>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
        {storyEyebrow(story)}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        {story.title}
      </h3>
      <p className="mt-3 grow text-sm leading-6 text-neutral-700 dark:text-neutral-300">
        {story.summary}
      </p>
      {facts.length > 0 ? (
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
          {facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </p>
      ) : null}
    </>
  );

  const surface =
    story.visibility === "public"
      ? "bg-white shadow-sm dark:bg-neutral-950"
      : "";
  const className = `flex h-full flex-col rounded-xl border border-neutral-200 p-6 dark:border-neutral-800 ${surface}`;

  if (story.draft) {
    return <article className={className}>{body}</article>;
  }

  return (
    <Link
      href={`/work/${encodeURIComponent(story.slug)}`}
      className={`${className} transition hover:border-neutral-400 dark:hover:border-neutral-600`}
    >
      {body}
    </Link>
  );
}
