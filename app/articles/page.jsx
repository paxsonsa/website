import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";

import Header from "@/components/Header";
import Subheader from "@/components/Subheader";

export default function Articles() {
  const postDirectory = "posts";

  const posts = fs.readdirSync(path.join(postDirectory));

  // Get the current date at the start of the day for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only by date, not time

  const articles = posts
    .filter((filename) => filename.endsWith(".mdx"))
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
    .filter(
      (article) =>
        !article.meta.hidden || process.env.NODE_ENV === "development",
    )
    .sort((a, b) => b.date - a.date);

  return (
    <>
      <Subheader title="Articles and Posts" href="/articles" />
      <section className="md:*:max-w-screen-md *:m-auto">
        <ArticleList articles={articles} />
      </section>
    </>
  );
}
/*
 * ArticleList
 *
 * This component takes a list of article posts and renders them as a list of links.
 * It also filters out any article posts that are hidden or in the future.
 *
 * @param {Array} articles - An array of article post objects
 */
function ArticleList({ articles }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only by date, not time

  return (
    <ol className="flex flex-col sm:space-y-4 pt-8 ">
      {articles.map((article) => {
        const options = { year: "numeric", month: "short", day: "2-digit" };
        const formattedDate = article.date.toLocaleDateString("en-US", options);
        if (article.meta.hide) {
          return <></>;
        }

        return (
          <li
            key="article.slug"
            className="px-4 md:px-0 pt-4 pb-24 md:pb-8 md:border-b border-b-neutral-200 last:border-transparent"
          >
            <Link
              className="text-2xl hover:underline"
              href={`/articles/${article.slug}`}
            >
              <h2>{article.meta.title}</h2>
            </Link>
            <h3 className="text-sm text-neutral-500 mt-1">{formattedDate}</h3>
            <HeroImage imageUrl={article.meta.image} />
            <p className="pr-16 my-4">{article.meta.description}</p>
            <Link
              href={`/articles/${article.slug}`}
              className="text-sky-500 font-medium text-sm hover:underline"
            >
              Read More
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function HeroImage({ imageUrl }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="md:pr-16 mt-4">
      <img
        className="object-cover rounded-2xl"
        src={imageUrl}
        alt="Hero Image"
      />
    </div>
  );
}
