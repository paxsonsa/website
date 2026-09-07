import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "@/styles/highlightjs/catppuccin-mocha.css";
import { ArticlePage } from "@/components/site/ArticlesPage";
import { mdxComponents } from "@/components/site/mdx";
import { formatDate, getPost } from "@/lib/posts";
import fs from "fs";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
};

export async function generateStaticParams() {
  // Hidden posts still build so old links keep working; they are just unlisted.
  return fs
    .readdirSync("posts")
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => ({ slug: name.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Andrew Paxson`,
    description: post.description,
    openGraph: post.image ? { images: post.image } : undefined,
    robots: post.hidden ? { index: false, follow: false } : undefined,
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content, ...meta } = post;
  return (
    <ArticlePage post={{ ...meta, dateLabel: formatDate(post.date) }}>
      <MDXRemote source={content} options={options} components={mdxComponents} />
    </ArticlePage>
  );
}
