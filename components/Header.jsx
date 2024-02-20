import Link from "next/link";

import { GithubCircle, Linkedin, X } from "iconoir-react";

export default function Header({ activePage }) {
  const isActive = (page) => {
    return activePage == page
      ? "font-bold text-neutral-800 dark:text-zinc-100"
      : "hover:text-neutral-700 hover:font-medium dark:text-zinc-200 dark:hover:text-zinc-100";
  };

  const linkCss =
    "dark:text-zinc-300 dark:hover:text-zinc-800 hover:text-neutral-700 hover:font-medium hover:bg-zinc-200 hover:bg-neutral-100 rounded border-transparent p-1";

  return (
    <div>
      <Link href="/">
        <h1 className="text-neutral-900 dark:text-zinc-50 text-3xl font-bold">
          💻 Andrew Paxson
        </h1>
        <span className="text-neutral-500 dark:text-zinc-300 text-lg font-light">
          Product Designer | Software Engineer
        </span>
      </Link>
      <div className="flex justify-between items-center border-b border-b-neutral-300 dark:border-b-zinc-400 pb-3">
        <nav className="flex space-x-3 dark:text-zinc-300 text-neutral-500 pt-12 text-lg font-light">
          <Link href="/">
            <span className={`${isActive("about")}`}>about</span>
          </Link>
          <Link href="/projects">
            <span className={`${isActive("projects")}`}>projects</span>
          </Link>
          <Link href="/blog">
            <span className={`${isActive("blog")}`}>blog</span>
          </Link>
        </nav>

        <div className="flex space-x-3 text-neutral-500 pt-12 text-lg font-light">
          {/* Example social links */}
          <Link href="https://twitter.com" className={linkCss}>
            <X />
          </Link>
          <Link href="https://github.com" className={linkCss}>
            <GithubCircle />
          </Link>
          <Link href="https://linkedin.com" className={linkCss}>
            <Linkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}
