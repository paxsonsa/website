import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "@/styles/highlightjs/catppuccin-mocha.css";
import StoryPage from "@/components/site/StoryPage";
import { mdxComponents } from "@/components/site/mdx";
import { getStories, getStory } from "@/lib/stories";

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

export default async function Story({ params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const { content, ...meta } = story;
  const nextStory = story.next ? getStory(story.next) : null;
  const next = nextStory && !nextStory.draft ? { slug: nextStory.slug, title: nextStory.title } : null;

  return (
    <StoryPage story={meta} next={next}>
      <MDXRemote source={content} options={options} components={mdxComponents} />
    </StoryPage>
  );
}
