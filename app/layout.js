import "./globals.css";
import Header from "@/components/Header";

import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://andrewpaxson.com"),
  title: "🕹️ Andrew Paxson",
  description:
    "Product designer and software engineer building practical tools for creative teams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col bg-white dark:bg-black text-neutral-800 dark:text-neutral-50 dark:font-light">
        <main className="flex-row justify-center items-center mb-auto">
          {children}
        </main>
        <footer className="w-full text-sm p-4 mb-2 flex-row justify-center m-auto text-center text-neutral-500">
          <p>© 2024 Andrew Paxson</p>
          <p>Built with Next.js and Tailwind CSS.</p>
          <Link
            className="font-medium hover:underline"
            href="https://github.com/paxsonsa/website"
          >
            Source on GitHub
          </Link>
        </footer>
      </body>
    </html>
  );
}
