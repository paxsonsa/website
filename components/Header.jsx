import Link from "next/link";

export default function Header({ sticky }) {
  console.log(sticky);
  let withSticky = "";
  if (sticky) {
    withSticky = "sticky top-0";
  }
  return (
    <div
      className={`${withSticky} justify-center backdrop-blur-lg bg-neutral-100/70 dark:bg-neutral-800/80 bg-blur- md:px-8`}
    >
      <nav className="flex justify-center md:max-w-screen-lg items-center md:justify-start m-auto">
        <div className="flex justify-center py-3">
          <Link
            href="/"
            className="text-xl flex flex-col items-center text-neutral-800 transition-colors ease-in-out delay-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-100"
          >
            <span className="text-xl">
              <span className="font-semibold">ap:</span> design+dev
            </span>
          </Link>
        </div>

        <ul className="font-light ml-4 md:ml-12 justify-start bg-transparent flex items-center space-x-8 p-2 dark:text-neutral-400 dark:hover:*:text-neutral-300 dark:hover:*:no-underline hover:*:underline">
          <li key="work">
            <Link href="/work">Work</Link>
          </li>
          <li key="articles">
            <Link href="https://andrewpaxson.substack.com">Articles</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
