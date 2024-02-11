import fs from "fs";
import path from "path";
import matter from "gray-matter";

import "@/styles/highlightjs/catppuccin-mocha.css";

import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
};

export async function generateStaticParams() {
  console.log("Generating static paths");
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
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
    description: blog.frontMatter.description,
  };
}

export default function Page({ params }) {
  console.log(params);
  const props = getPost(params);

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
      <h1>{props.frontMatter.title}</h1>

      <MDXRemote source={props.content} options={options} />
    </article>
  );
}
