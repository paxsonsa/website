"use client";

import Link from "next/link";
import { useSite } from "./SiteContext";

/*
 * A real <a> that still uses the site's fade navigation for plain left
 * clicks. Middle-click, cmd-click, and crawlers get the normal href.
 */
export default function TransitionLink({ href, children, onClick, ...rest }) {
  const { navigateWithFade } = useSite();
  const internal = typeof href === "string" && href.startsWith("/");

  function handleClick(e) {
    if (onClick) onClick(e);
    if (!internal || e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigateWithFade(href);
  }

  if (!internal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
