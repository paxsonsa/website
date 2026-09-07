import WorkPage from "@/components/site/WorkPage";
import { getStories } from "@/lib/stories";

export const metadata = {
  title: "Work · Andrew Paxson",
  description: "Product and project stories: public repository-backed builds and NDA-scoped product work at ILM.",
};

export default function Work() {
  return <WorkPage stories={getStories()} />;
}
