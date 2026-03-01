import Link from "next/link";

import Header from "../components/Header";
import { GithubCircle, Linkedin, X, Youtube } from "iconoir-react";

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

const sections = [
  {
    title: "Build strategy and execution end to end",
    intro:
      "I translate product goals into shipped systems by combining design leadership with production-grade engineering.",
    points: [
      "Lead product direction with stakeholders, then implement critical paths in code.",
      "Own architecture decisions across UX, APIs, and infrastructure.",
      "Balance long-term platform health with near-term delivery goals.",
    ],
  },
  {
    title: "Design for high-complexity creative workflows",
    intro:
      "I focus on clarity and speed for tools used by artists and production teams every day.",
    points: [
      "Simplify complex data and workflows into usable, dependable interfaces.",
      "Partner closely with users to validate assumptions and reduce rework.",
      "Ship practical improvements that increase collaboration across teams.",
    ],
  },
  {
    title: "Lead globally distributed teams",
    intro:
      "I help small cross-functional teams operate with strong alignment and steady execution.",
    points: [
      "Coordinate priorities across engineering, design, and production stakeholders.",
      "Create decision frameworks that keep teams moving without sacrificing quality.",
      "Coach engineers and designers while maintaining delivery momentum.",
    ],
  },
];

const socialLinks = [
  {
    href: "https://twitter.com/MrPaxson",
    label: "X",
    icon: X,
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
              <div key={credential.label} className="border-l border-neutral-200 pl-4 sm:border-l-0 sm:border-t sm:border-neutral-200 sm:px-3 sm:pt-4 dark:border-neutral-800">
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

      <section className="mx-auto my-12 md:my-16 grid w-full max-w-5xl gap-5 px-6 md:grid-cols-3 md:px-8">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-xl border border-neutral-200 bg-white p-6 text-left shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-neutral-700 dark:text-neutral-300">
              {section.intro}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              {section.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
