import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";

import Header from "../../components/header";

export default function Blog() {
  const postDirectory = "posts";

  const posts = fs.readdirSync(path.join(postDirectory));

  // Get the current date at the start of the day for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only by date, not time

  const blogs = posts
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join(postDirectory, filename),
        "utf-8",
      );
      const { data: frontMatter } = matter(markdownWithMeta);
      return {
        meta: frontMatter,
        date: new Date(frontMatter.date),
        slug: filename.replace(".mdx", ""),
      };
    })
    .sort((a, b) => b.date - a.date);

  // TODO: Add hover effect to blog list links
  // TODO: Add Blog post Page Styling and navigation.
  // TODO: Add soical share buttons.
  // TODO: Add SEO meta tags.
  // TODO: Make clicking on name/title take home
  // TODO: Add Project Pages

  return (
    <>
      <Header activePage="blog" />
      <section>
        <ol className="flex flex-col space-y-3 pt-8">
          {blogs.map((blog) => {
            const options = { year: "numeric", month: "long", day: "2-digit" };
            const formattedDate = blog.date.toLocaleDateString(
              "en-US",
              options,
            );
            return (
              <Link
                href={`/blog/${blog.slug}`}
                className="flex flex-row space-x-8 border-b border-transparent hover:border-neutral-300"
              >
                <span className="font-light w-60 text-xl font-mono text-neutral-500">
                  {formattedDate}
                </span>
                <span className="text-neutral-500 text-xl">
                  {blog.meta.title}
                </span>
              </Link>
            );
          })}
        </ol>
      </section>
    </>
  );
}
