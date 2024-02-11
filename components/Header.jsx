import Link from "next/link";

import { GithubCircle, Linkedin, X } from "iconoir-react";

export default function Header({ activePage }) {
  const isActive = (page) => {
    return activePage == page
      ? "font-bold text-neutral-800"
      : "hover:text-neutral-700 hover:font-medium";
  };

  return (
    <div>
      <h1 className="text-neutral-900 text-3xl font-bold">💻 Andrew Paxson</h1>
      <span className="text-neutral-500 text-lg font-light">
        Product Designer | Software Engineer
      </span>

      <div className="flex justify-between items-center border-b border-b-neutral-300 pb-3">
        <nav className="flex space-x-3 text-neutral-500 pt-12 text-lg font-light">
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
          <Link
            href="https://twitter.com"
            className="hover:text-neutral-700 hover:font-medium"
          >
            <X />
          </Link>
          <Link
            href="https://github.com"
            className="hover:text-neutral-700 hover:font-medium"
          >
            <GithubCircle />
          </Link>
          <Link
            href="https://linkedin.com"
            className="hover:text-neutral-700 hover:font-medium"
          >
            <Linkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}
