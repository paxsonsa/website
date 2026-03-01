import Link from "next/link";

import Header from "@/components/Header";

const focusAreas = [
  {
    title: "Workflow Platforms",
    description:
      "Design and engineering for internal products that help creative teams share data, review work, and stay aligned across productions.",
  },
  {
    title: "Design + Engineering Systems",
    description:
      "End-to-end ownership from product framing through architecture and implementation, with a focus on durable systems and practical UX.",
  },
  {
    title: "Team Leadership",
    description:
      "Guiding globally distributed teams with clear priorities, strong execution habits, and close partnership with stakeholders.",
  },
];

const outcomes = [
  "Shipped tools used daily by artists and production teams.",
  "Reduced workflow friction by translating complex operations into clear interfaces.",
  "Balanced product strategy, technical depth, and team delivery across long-running efforts.",
];

export default function Projects() {
  return (
    <>
      <Header sticky />

      <section className="mx-auto mt-10 w-full max-w-5xl px-6 md:mt-16 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Work
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100">
            Selected product and platform work for creative teams.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            This page is being expanded with detailed case studies. In the
            meantime, here is a clear summary of the problems I solve and the
            outcomes I typically deliver.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 grid w-full max-w-5xl gap-5 px-6 md:grid-cols-3 md:px-8">
        {focusAreas.map((area) => (
          <article
            key={area.title}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {area.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-neutral-700 dark:text-neutral-300">
              {area.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 w-full max-w-5xl px-6 pb-6 md:px-8">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/40">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Representative Outcomes
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-7 text-neutral-700 dark:text-neutral-300">
            {outcomes.map((outcome) => (
              <li key={outcome}>• {outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mb-12 w-full max-w-5xl px-6 md:px-8">
        <div className="rounded-xl border border-neutral-200 p-6 md:p-8 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Case Studies In Progress
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700 dark:text-neutral-300">
            I am preparing detailed write-ups that cover product context,
            constraints, architecture decisions, and measurable impact.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              href="https://andrewpaxson.substack.com"
            >
              Read Articles
            </Link>
            <Link
              className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-500 dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-neutral-400"
              href="https://www.linkedin.com/in/andrewpaxson"
            >
              Connect on LinkedIn
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-6 w-full max-w-5xl px-6 md:px-8">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Looking for specific examples from workflow tooling, platform
          architecture, or design systems? Reach out and I can share relevant
          context.
        </p>
      </section>
    </>
  );
}
