"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ sticky }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/work", label: "Work", isExternal: false },
    {
      href: "https://andrewpaxson.substack.com",
      label: "Articles",
      isExternal: true,
    },
  ];

  let withSticky = "";
  if (sticky) {
    withSticky = "sticky top-0";
  }

  const isHome = pathname === "/";

  return (
    <div
      className={`${withSticky} z-30 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800/90 dark:bg-neutral-950/85`}
    >
      <nav className="m-auto flex w-full max-w-5xl items-center justify-between px-6 py-3 md:px-8">
        <Link
          href="/"
          className={`text-lg tracking-tight transition-colors dark:text-neutral-100 dark:hover:text-neutral-300 ${
            isHome
              ? "text-neutral-950"
              : "text-neutral-900 hover:text-neutral-700"
          }`}
        >
          <span className="font-semibold">ap:</span> design+dev
        </Link>

        <ul className="flex items-center gap-5 text-sm font-medium text-neutral-600 dark:text-neutral-300 md:gap-7">
          {navItems.map((item) => {
            const active = !item.isExternal && pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative pb-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:transition-transform ${
                    active
                      ? "text-neutral-900 after:scale-x-100 after:bg-neutral-900 dark:text-neutral-100 dark:after:bg-neutral-100"
                      : "hover:text-neutral-900 after:scale-x-0 after:bg-neutral-500 hover:after:scale-x-100 dark:hover:text-neutral-100 dark:after:bg-neutral-400"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
