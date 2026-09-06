import Link from "next/link";
import { ArrowRight, GithubCircle, Linkedin, Threads, Youtube } from "iconoir-react";

import Header from "@/components/Header";
import { getFeaturedStories, storyEyebrow } from "@/lib/stories";

const credentials = [
  {
    label: "Experience",
    value: "10+ years shipping products for creative teams",
  },
  {
    label: "Current Role",
    value: "Staff Engineer at Industrial Light & Magic",
  },
  {
    label: "Operating Scope",
    value: "Hands-on from discovery through deployment",
  },
];

const practice = [
  {
    title: "Build strategy and execution end to end",
    intro:
      "I translate product goals into shipped systems by combining design leadership with production-grade engineering.",
  },
  {
    title: "Design for high-complexity creative workflows",
    intro:
      "I focus on clarity and speed for tools used by artists and production teams every day.",
  },
  {
    title: "Lead globally distributed teams",
    intro:
      "I help small cross-functional teams operate with strong alignment and steady execution.",
  },
];

const socialLinks = [
  {
    href: "https://www.threads.com/@paxsonsa",
    label: "Threads",
    icon: Threads,
  },
  {
    href: "https://github.com/paxsonsa",
    label: "GitHub",
    icon: GithubCircle,
  },
  {
    href: "https://www.linkedin.com/in/andrewpaxson",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q",
    label: "YouTube",
    icon: Youtube,
  },
];

export default function Home() {
  const featured = getFeaturedStories(3);

  return (
    <>
      <Header sticky />
      <section className="mx-auto mt-10 md:mt-16 w-full max-w-5xl px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Product Design + Engineering Leadership
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
            I design and ship products that help creative teams move faster.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-200">
            I am Andrew Paxson, a product designer and software engineer with
            over a decade of experience building tools for artists and
            production teams. I currently serve as a Staff Engineer at{" "}
            <Link className="font-semibold hover:underline" href="https://ilm.com">
              Industrial Light & Magic
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/work"
              className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              View Work
            </Link>
            <Link
              href="https://andrewpaxson.substack.com"
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-500 dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-neutral-400"
            >
              Read Articles
            </Link>
          </div>
          <dl className="mt-9 grid w-full max-w-3xl grid-cols-1 gap-5 text-left sm:grid-cols-3 sm:text-center">
            {credentials.map((credential) => (
              <div
                key={credential.label}
                className="border-l border-neutral-200 pl-4 sm:border-l-0 sm:border-t sm:border-neutral-200 sm:px-3 sm:pt-4 dark:border-neutral-800"
              >
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                  {credential.label}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
                  {credential.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex justify-center space-x-2 pt-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                className="rounded p-2 text-neutral-700 transition hover:bg-zinc-800 hover:text-zinc-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                href={href}
                aria-label={label}
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-5xl px-6 md:mt-20 md:px-8">
        <div className="grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-3 md:gap-10 dark:border-neutral-800">
          {practice.map((item) => (
            <div key={item.title}>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {item.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                {item.intro}
              </p>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="mx-auto mb-12 mt-16 w-full max-w-5xl px-6 md:mt-20 md:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Selected work
            </h2>
            <Link
              href="/work"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:underline dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              All work
            </Link>
          </div>
          <ol className="mt-4 border-b border-neutral-200 dark:border-neutral-800">
            {featured.map((story) => (
              <li
                key={story.slug}
                className="border-t border-neutral-200 dark:border-neutral-800"
              >
                <StoryRow story={story} />
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}

function StoryRow({ story }) {
  const body = (
    <>
      <div className="max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
          {storyEyebrow(story)}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {story.title}
        </h3>
        <p className="mt-1.5 text-[15px] leading-6 text-neutral-700 dark:text-neutral-300">
          {story.summary}
        </p>
      </div>
      {!story.draft ? (
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-neutral-900 group-hover:underline sm:pt-6 dark:text-neutral-100">
          Read story <ArrowRight width={16} height={16} />
        </span>
      ) : null}
    </>
  );

  const className =
    "group flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8";

  if (story.draft) {
    return <div className={className}>{body}</div>;
  }

  return (
    <Link href={`/work/${encodeURIComponent(story.slug)}`} className={className}>
      {body}
    </Link>
  );
}
