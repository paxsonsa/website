import fs from "fs";
import path from "path";
import matter from "gray-matter";

import "@/styles/highlightjs/catppuccin-mocha.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Header from "@/components/Header";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
};

export async function generateStaticParams() {
  console.log("!!!! Generating static paths");
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  console.log("Generated static paths", paths);

  return paths;
}

function getPost({ slug }) {
  const source = fs.readFileSync(path.join("posts", `${slug}.mdx`), "utf-8");
  const { data, content } = matter(source);
  return {
    frontMatter: data,
    slug,
    content,
  };
}

export async function generateMetadata({ params }) {
  const blog = getPost(params);
  return {
    title: blog.frontMatter.title,
    author: "Andrew Paxson @MrPaxson",
    description: blog.frontMatter.description,
  };
}

export default function Page({ params }) {
  console.log(params);
  const props = getPost(params);

  const date = new Date(props.frontMatter.date);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <Header activePage="blog" />
      <article className="prose prose-sm md:prose-base lg:2xl prose-neutral dark:prose-invert">
        <h1 className="pt-8 font-bold">{props.frontMatter.title}</h1>
        <div className="flex-row space-x-4 text-mono">
          <span classNmae="text-md font-bold">{formattedDate}</span>
          <span classNmae="text-md font-bold">By: Andrew Paxson</span>
        </div>
        <meta name="description" content={props.frontMatter.description} />

        <MDXRemote source={props.content} options={options} />
      </article>
    </>
  );
}
