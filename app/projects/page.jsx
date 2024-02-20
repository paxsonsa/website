import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Header from "@/components/header";

export default function Projects() {
  return (
    <>
      <Header activePage="projects" />
      <section className="flex flex-col pt-32">
        <h1 className="text-neutral-800 dark:text-zinc-100 text-2xl font-bold m-auto">
          Sorry, still working on sharing my latest work!
        </h1>
        <p className="pt-2 m-auto">
          Thanks for taking a peek at my work. I am working on compiling all of
          that together!
        </p>
      </section>
    </>
  );
}
