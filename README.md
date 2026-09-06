# [andrewpaxson.com](https://andrewpaxson.com)

This is the repo for my personal website.

## Stack Notes:

- NextJS Static Build
- TailwindCSS
- React
- Hosted on Cloudflare Pages.

## Development

```bash
# Run the development server
> npm install
> npm run dev

# Build the static site
> npm run build
```

## Content

- `posts/` — articles, rendered at `/articles/<slug>`.
- `stories/` — product and project stories, rendered at `/work/<slug>` and listed on `/work`.
  Copy a template from `stories/_templates/` (`project-story.mdx` or `product-story.mdx`),
  fill in the frontmatter, and write the body in MDX. `draft: true` keeps the story unlisted
  (card on `/work` is unlinked, page is `noindex`, nothing links to it); `featured: true`
  puts it under "Selected work" on the home page. Story MDX can use `<Figure>`,
  `<Outcomes>`/`<Outcome>`, and `<Note>` from `components/story.jsx`.
