import { ArticlesIndex } from "@/components/site/ArticlesPage";
import { formatDate, getPosts } from "@/lib/posts";

export const metadata = {
  title: "Writing · Andrew Paxson",
  description: "Essays on art, engineering, and product thinking.",
};

export default function Articles() {
  const posts = getPosts().map(({ slug, title, description, date }) => ({
    slug,
    title,
    description,
    dateLabel: formatDate(date),
  }));
  return <ArticlesIndex posts={posts} />;
}
