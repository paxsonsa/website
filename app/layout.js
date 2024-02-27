import "./globals.css";
import Header from "@/components/Header";

import Link from "next/link";

export const metadata = {
  title: "🕹️ Andrew Paxson",
  description: "I like to make things for creative people.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col bg-white dark:bg-black text-neutral-800 dark:text-neutral-50 dark:font-light">
        <main className="flex-row justify-center items-center mb-auto">
          {children}
        </main>
        <footer className="w-full text-sm p-4 mb-2 flex-row justify-center m-auto text-center text-neutral-400">
          <p>© 2024 Andrew Paxson</p>
          <p>This website was made with ♥️ using next.js and tailwindcss.</p>
          <Link
            className="font-medium hover:underline"
            href="https://github.com/paxsonsa/website"
          >
            Check out the code here
          </Link>
        </footer>
      </body>
    </html>
  );
}
