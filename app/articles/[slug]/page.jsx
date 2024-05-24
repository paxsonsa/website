import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "@/styles/highlightjs/catppuccin-mocha.css";
import Header from "@/components/Header";
import Subheader from "@/components/Subheader";
import Subscribe from "@/components/Subscribe";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
};

export async function generateStaticParams() {
  console.log("!!!! Generating static paths");
  const files = fs.readdirSync(path.join("posts"));
  const paths = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => ({
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
    metadataBase: new URL('https://andrewpaxson.com'),
    title: `${blog.frontMatter.title}`,
    author: "Andrew Paxson @MrPaxson",
    description: blog.frontMatter.description,
    openGraph: {
      images: `/${blog.frontMatter.image}`
    },
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
      <title>{props.frontMatter.title}</title>
      <meta name="title" content={props.frontMatter.title} />
      <meta name="description" content={props.frontMatter.description} />

      <Header />
      <Subheader title="Articles & Posts" href="/articles" />
      <div className="bg-white dark:bg-black justify-center p-4 pb-16 border-b border-b-neutral-200">
        <article className="max-w-screen-md m-auto pt-8">
          <h2 className="text-2xl font-medium">{props.frontMatter.title}</h2>
          <h3 className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 mb-4 dark:mb-8">
            {formattedDate}
          </h3>
          <HeroImage imageUrl={props.frontMatter.image} imageCaption={props.frontMatter.imageCaption} />
          <div className="prose prose-neutral dark:prose-invert dark:prose-p:text-neutral-50">
            <MDXRemote source={props.content} options={options} />
          </div>
        </article>
        <div className="md:max-w-screen-md flex justify-start my-8 space-x-8 m-auto">
          <Link
            className="hover:underline rounded text-sky-500 dark:text-sky-400 dark:hover:no-underline dark:hover:text-sky-500 font-semibold"
            href="/articles"
          >
            See All Articles
          </Link>
        </div>
        <div className="max-w-screen-md m-auto pt-8">
          <Subscribe />
        </div>
      </div>
    </>
  );
}

function HeroImage({ imageUrl, imageCaption = null }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="md:pr-16 mb-4 dark:mb-8">
      <img
        className="object-cover rounded-2xl"
        src={imageUrl}
        alt="Hero Image"
      />
      { imageCaption ? <span className="text-neutral-500 italic text-xs">{imageCaption}</span> : null }
    </div>
  );
}
