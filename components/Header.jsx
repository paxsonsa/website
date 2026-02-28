import Link from "next/link";

export default function Header({ sticky }) {
  let withSticky = "";
  if (sticky) {
    withSticky = "sticky top-0";
  }
  return (
    <div
      className={`${withSticky} z-30 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md dark:border-neutral-800/90 dark:bg-neutral-950/80`}
    >
      <nav className="m-auto flex w-full max-w-5xl items-center justify-between px-6 py-3 md:px-8">
        <Link
          href="/"
          className="text-lg tracking-tight text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
        >
          <span className="font-semibold">ap:</span> design+dev
        </Link>

        <ul className="flex items-center gap-5 text-sm font-medium text-neutral-600 dark:text-neutral-300 md:gap-7">
          <li key="work">
            <Link className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100" href="/work">
              Work
            </Link>
          </li>
          <li key="articles">
            <Link
              className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              href="https://andrewpaxson.substack.com"
            >
              Articles
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
