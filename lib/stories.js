import fs from "fs";
import path from "path";
import matter from "gray-matter";

/*
 * Stories live in /stories as MDX files with frontmatter. Two kinds:
 *
 *   kind: project  — a public, repository-backed build (MotionStage, PelagoDB)
 *   kind: product  — product work, usually NDA-scoped (Qi, software management)
 *
 * Copy a template from /stories/_templates to start one. Files that begin
 * with an underscore and anything inside _templates are ignored.
 *
 * Frontmatter reference (see the templates for the full set):
 *   title, kind, visibility (public | nda), status (in-progress | published)
 *   draft (true keeps the page unlisted: unlinked card, noindex, no Next link), featured (true shows it in "Selected work" on the
 *   home page), order (sort key, ascending), year, role, timeline, stack,
 *   team, links [{label, href}], summary, dek, image, imageCaption, next
 */

const STORIES_DIR = "stories";
const KIND_LABELS = {
  project: "Project story",
  product: "Product story",
};

const VISIBILITY_LABELS = {
  public: "Public",
  nda: "NDA-scoped",
};

const STATUS_LABELS = {
  "in-progress": "Case study in progress",
  published: null,
};

function storyFiles() {
  return fs
    .readdirSync(STORIES_DIR)
    .filter((name) => name.endsWith(".mdx") && !name.startsWith("_"));
}

function normalize(slug, data, content) {
  const draft = Boolean(data.draft);
  return {
    slug,
    content,
    title: data.title ?? slug,
    kind: data.kind === "product" ? "product" : "project",
    visibility: data.visibility === "nda" ? "nda" : "public",
    status: data.status ?? "in-progress",
    // Drafts still build (static export needs at least one path per route),
    // but they are unlisted: cards are unlinked, pages are noindex, and no
    // story links to them as "Next".
    draft,
    featured: Boolean(data.featured),
    order: Number.isFinite(data.order) ? data.order : 999,
    year: data.year ?? null,
    role: data.role ?? null,
    timeline: data.timeline ?? null,
    stack: Array.isArray(data.stack) ? data.stack : [],
    team: data.team ?? null,
    links: Array.isArray(data.links) ? data.links : [],
    summary: data.summary ?? "",
    dek: data.dek ?? data.summary ?? "",
    image: data.image ?? null,
    imageCaption: data.imageCaption ?? null,
    next: data.next ?? null,
    labels: {
      kind: KIND_LABELS[data.kind] ?? KIND_LABELS.project,
      visibility: VISIBILITY_LABELS[data.visibility] ?? VISIBILITY_LABELS.public,
      status: STATUS_LABELS[data.status] ?? STATUS_LABELS["in-progress"],
    },
  };
}

export function getStories() {
  return storyFiles()
    .map((name) => {
      const source = fs.readFileSync(path.join(STORIES_DIR, name), "utf-8");
      const { data, content } = matter(source);
      return normalize(name.replace(/\.mdx$/, ""), data, content);
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getStory(slug) {
  const file = path.join(STORIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return normalize(slug, data, content);
}

export function getFeaturedStories(limit = 3) {
  return getStories()
    .filter((story) => story.featured)
    .slice(0, limit);
}

/* Eyebrow text: "Project story · Public · Case study in progress" */
export function storyEyebrow(story) {
  return [story.labels.kind, story.labels.visibility, story.labels.status]
    .filter(Boolean)
    .join(" · ");
}
