import Link from "next/link";

import Header from "@/components/Header";

const publicCaseStudies = [
  {
    name: "MotionStage",
    stage: "Case Study In Progress",
    description:
      "A public project with supporting repository artifacts that demonstrate architecture and implementation choices.",
  },
  {
    name: "PelagoDB",
    stage: "Case Study In Progress",
    description:
      "A public database-focused project that will include a technical deep dive on core design decisions and tradeoffs.",
  },
  {
    name: "KnowledgeDB",
    stage: "Case Study In Progress",
    description:
      "A public project that will be documented with product intent, system design, and implementation details.",
  },
];

const ndaCaseStudies = [
  {
    name: "Software Management at ILM",
    stage: "NDA: Scope-Limited Write-Up",
    description:
      "Internal platform work focused on software lifecycle management at studio scale. Public documentation will focus on problem framing, leadership, and non-sensitive architecture patterns.",
  },
  {
    name: "Qi: ILM Data Tracking and Management System",
    stage: "NDA: Scope-Limited Write-Up",
    description:
      "Data tracking and management platform work. Public case study content will emphasize outcomes, constraints, and decision process without exposing proprietary details.",
  },
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
            Case studies for product systems, databases, and studio platforms.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            I am documenting five projects. Three are public repository-backed
            case studies, and two are NDA projects with carefully scoped public
            summaries.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-5xl px-6 pb-6 md:px-8">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/40">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Public Projects
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-300">
            These case studies will include architecture, implementation details,
            and links to supporting repositories.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {publicCaseStudies.map((project) => (
              <article
                key={project.name}
                className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-950"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  {project.stage}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mb-8 w-full max-w-5xl px-6 md:px-8">
        <div className="rounded-xl border border-neutral-200 p-6 md:p-8 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            NDA Projects
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700 dark:text-neutral-300">
            These case studies are written to communicate process, leadership,
            and impact while respecting confidentiality requirements.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ndaCaseStudies.map((project) => (
              <article
                key={project.name}
                className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-700"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  {project.stage}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mb-12 w-full max-w-5xl px-6 md:px-8">
        <div className="rounded-xl border border-neutral-200 p-6 md:p-8 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Documentation Roadmap
          </h2>
          <ol className="mt-4 space-y-2 text-base leading-7 text-neutral-700 dark:text-neutral-300">
            <li>1. Publish MotionStage case study with repo references.</li>
            <li>2. Publish PelagoDB and KnowledgeDB technical case studies.</li>
            <li>3. Publish scope-limited ILM case studies with NDA-safe details.</li>
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
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
