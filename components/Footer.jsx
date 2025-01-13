
import Link from "next/link";
import { GithubCircle, Linkedin, X, Youtube } from "iconoir-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-screen-md mx-auto px-8">
        <div className="flex justify-center space-x-4">
          <Link
            className="p-2 hover:bg-zinc-800 hover:text-zinc-100 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded"
            href="https://twitter.com/MrPaxson"
          >
            <X />
          </Link>
          <Link
            className="p-2 hover:bg-zinc-800 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-zinc-100 rounded"
            href="https://github.com/paxsonsa"
          >
            <GithubCircle />
          </Link>
          <Link
            className="p-2 hover:bg-zinc-800 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-zinc-100 rounded"
            href="https://www.linkedin.com/in/andrewpaxson"
          >
            <Linkedin />
          </Link>
          <Link
            className="p-2 hover:bg-zinc-800 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-zinc-100 rounded"
            href="https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q"
          >
            <Youtube />
          </Link>
        </div>
      </div>
    </footer>
  );
}
