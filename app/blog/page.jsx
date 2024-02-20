import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";

import Header from "@/components/header";

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

  // TODO: Add SEO meta tags.
  // TODO: Dark Mode
  // TODO: Add Project Pages
  return (
    <>
      <Header activePage="blog" />
      <section>
        <BlogList blogs={blogs} />
      </section>
    </>
  );
}
/*
 * BlogList
 *
 * This component takes a list of blog posts and renders them as a list of links.
 * It also filters out any blog posts that are hidden or in the future.
 *
 * @param {Array} blogs - An array of blog post objects
 */
function BlogList({ blogs }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only by date, not time

  return (
    <ol className="flex flex-col space-y-3 pt-8">
      {blogs.map((blog) => {
        const options = { year: "numeric", month: "short", day: "2-digit" };
        const formattedDate = blog.date.toLocaleDateString("en-US", options);
        if (blog.meta.hide) {
          return <></>;
        }

        return (
          <Link
            href={`/blog/${blog.slug}`}
            className={`group flex flex-row space-x-8 text-neutral-600`}
          >
            <span className="font-light w-50 text-l font-mono text-neutral-500 group-hover:text-neutral-800 dark:text-zinc-400 dark:group-hover:text-zinc-300">
              {formattedDate}
            </span>
            <span className="text-neutral-600 text-l font-medium group-hover:text-neutral-800 dark:text-zinc-300 dark:group-hover:text-zinc-100">
              {blog.meta.title}
            </span>
          </Link>
        );
      })}
    </ol>
  );
}
