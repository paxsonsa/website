import HomePage from "@/components/site/HomePage";
import { getFeaturedStories } from "@/lib/stories";
import { formatDate, getPosts } from "@/lib/posts";

export default function Home() {
  const stories = getFeaturedStories(3);
  const posts = getPosts()
    .slice(0, 3)
    .map(({ slug, title, date }) => ({ slug, title, dateLabel: formatDate(date) }));

  return <HomePage stories={stories} posts={posts} />;
}
