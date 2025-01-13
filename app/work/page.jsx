import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";

import Header from "@/components/Header";
import Subheader from "@/components/Subheader";
import Footer from "@/components/Footer";

export default function Projects() {
  return (
    <>
      <Header />
      <Subheader title="Projects and Work" href="/work" />
      <section className="flex flex-col text-center p-4 mt-16">
        <h1 className="text-neutral-800 dark:text-neutral-50 text-2xl font-semibold m-auto">
          Sorry, still working on sharing my latest work!
        </h1>
        <p className="pt-2 m-auto">
          Thanks for taking a peek at my work. I am working on compiling all of
          that together!
        </p>
        <Link
          className="mt-4 text-semibold text-sm text-sky-500 hover:underline"
          href="https://andrewpaxson.substack.com"
        >
          Checkout my blog while you are here!
        </Link>
      </section>
      <Footer />
    </>
  );
}
