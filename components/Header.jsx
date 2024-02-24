import Link from "next/link";

export default function Header({ activePage }) {
  const isActive = (page) => {
    return activePage == page ? "" : "";
  };

  const linkCss = "";

  return (
    <div className="justify-center bg-neutral-100 md:px-8">
      <nav className="flex justify-center md:max-w-screen-lg items-center md:justify-start m-auto">
        <div className="flex justify-center py-2">
          <Link
            href="/"
            className="text-lg flex flex-col items-center text-neutral-800 hover:text-neutral-900"
          >
            <span className="text-xl">
              <span className="font-semibold">ap:</span> design+dev
            </span>
          </Link>
        </div>

        <ul className="font-light ml-4 md:ml-12 justify-start bg-transparent  flex items-center space-x-8 p-2">
          <li key="work">
            <Link href="/work" className="hover:underline">
              Work
            </Link>
          </li>
          <li key="articles">
            <Link href="/articles" className="hover:underline">
              Articles
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
