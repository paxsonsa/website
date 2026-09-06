import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "@/styles/highlightjs/catppuccin-mocha.css";
import Header from "@/components/Header";
import {
  BackLink,
  Figure,
  StoryHeader,
  StoryNav,
  storyComponents,
} from "@/components/story";
import { getStories, getStory, storyEyebrow } from "@/lib/stories";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
};

export async function generateStaticParams() {
  return getStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: `${story.title} · Andrew Paxson`,
    description: story.summary,
    openGraph: story.image ? { images: story.image } : undefined,
    // Drafts build (static export needs a path) but stay out of search.
    robots: story.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const next = story.next ? getStory(story.next) : null;

  return (
    <>
      <Header sticky />
      <article className="mx-auto w-full max-w-[52rem] px-6 pt-8 md:px-8 md:pt-10">
        <BackLink />
        <StoryHeader story={story} eyebrow={storyEyebrow(story)} />

        {story.image || story.imageCaption ? (
          <div className="mt-10">
            <Figure
              src={story.image}
              alt={story.image ? story.title : "[Hero image]"}
              caption={story.imageCaption}
            />
          </div>
        ) : null}

        <div className="prose prose-neutral mt-12 max-w-3xl prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-2xl prose-p:leading-7 dark:prose-invert dark:prose-p:text-neutral-200">
          <MDXRemote
            source={story.content}
            options={options}
            components={storyComponents}
          />
        </div>

        <StoryNav next={next && !next.draft ? next : null} />
      </article>
    </>
  );
}
