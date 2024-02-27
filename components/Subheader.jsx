import Link from "next/link";

export default function Subheader({ title, href }) {
  return (
    <div className="sticky top-0 bg-white/50 backdrop-blur-lg justify-center border-b border-b-neutral-200 dark:bg-neutral-900/70 dark:text-neutral-200 dark:bg-neutral-900 dark:border-b-neutral-700 p-2 md:px-8">
      <nav className="flex justify-center md:justify-start md:max-w-screen-lg md:justify-start m-auto">
        <Link className="text-xl font-semibold" href={href}>
          {title}
        </Link>
      </nav>
    </div>
  );
}
