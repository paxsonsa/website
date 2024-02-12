import fs from "fs";
import path from "path";
import matter from "gray-matter";


import Header from "../../components/header";
import BlogList from "@/components/BlogList";

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

  // TODO: Add Blog post navigation arrows and keys.
  // TODO: make hitting enter on blog page goes to latest post.
  // TODO: Make hitting J and K go to previous and next blog posts.
  // TODO: Make hitting H and L go to next 'tab' (about, projects, blog)
  // TODO: Add social share buttons?
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
