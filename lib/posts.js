import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = "posts";

export function getPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, name), "utf-8"));
      return {
        slug: name.replace(/\.mdx$/, ""),
        title: data.title ?? name,
        description: data.description ?? "",
        date: data.date ?? null,
        image: data.image ?? null,
        imageCaption: data.imageCaption ?? null,
        hidden: Boolean(data.hidden || data.hide),
        content,
      };
    })
    .filter((post) => !post.hidden)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? null,
    image: data.image ?? null,
    imageCaption: data.imageCaption ?? null,
    hidden: Boolean(data.hidden || data.hide),
    content,
  };
}

export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
