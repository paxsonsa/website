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

## Structure

- `app/layout.js` loads the fonts (Newsreader, Overpass Mono), sets the theme class before
  paint, and wraps every page in `components/site/SiteShell.jsx` (gradient bloom, nav,
  theme toggle, fade navigation).
- `components/site/SiteContext.jsx` holds theme, accent-color cycle, bloom phase, and the
  fade navigation used by `TransitionLink`.
- Design tokens and the prose styles live in `app/globals.css`.

## Content

- `posts/` — articles, rendered at `/articles/<slug>`.
- `stories/` — product and project stories, rendered at `/work/<slug>` and listed on `/work`.
  Copy a template from `stories/_templates/` (`project-story.mdx` or `product-story.mdx`),
  fill in the frontmatter, and write the body in MDX. `draft: true` keeps the story unlisted
  (card on `/work` is unlinked, page is `noindex`, nothing links to it); `featured: true`
  puts it under "Selected work" on the home page. Story MDX can use `<Figure>`,
  `<Outcomes>`/`<Outcome>`, and `<Note>` from `components/story.jsx`.
