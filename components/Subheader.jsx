import Link from "next/link";

export default function Subheader({ title, href }) {
  return (
    <div className="justify-center border-b border-b-neutral-200 p-4 md:px-8">
      <nav className="flex justify-center md:justify-start md:max-w-screen-lg md:justify-start m-auto">
        <Link className="text-lg font-semibold" href={href}>
          {title}
        </Link>
      </nav>
    </div>
  );
}
