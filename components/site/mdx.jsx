/*
 * MDX building blocks for stories and articles. No hooks, so they work
 * inside the server-rendered MDXRemote tree:
 *
 *   <Figure src="/img/x.webp" alt="..." caption="..." />
 *   <Outcomes>
 *     <Outcome value="[XX%]" label="reduction in review turnaround" />
 *   </Outcomes>
 *   <Note title="What is left out, and why">...</Note>
 */

export function Figure({ src, alt = "", caption, ratio = "16 / 9" }) {
  return (
    <figure className="not-prose my-8">
      {src ? (
        <img
          className="w-full rounded-xl border object-cover"
          style={{ borderColor: "var(--d-border)" }}
          src={src}
          alt={alt}
        />
      ) : (
        <div
          className="mono flex w-full items-center justify-center rounded-xl border text-xs tracking-[0.05em]"
          style={{
            aspectRatio: ratio,
            borderColor: "var(--d-border)",
            backgroundColor: "var(--d-surface)",
            color: "var(--d-muted)",
          }}
        >
          {alt || "[Figure]"}
        </div>
      )}
      {caption ? <figcaption className="figcaption">{caption}</figcaption> : null}
    </figure>
  );
}

export function Outcomes({ children }) {
  return (
    <div className="not-prose my-8 space-y-5">
      {children}
    </div>
  );
}

export function Outcome({ value, label }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="serif text-3xl sm:text-4xl font-light" style={{ color: "var(--accent)" }}>
        {value}
      </span>
      <span className="serif text-base sm:text-lg leading-relaxed" style={{ color: "var(--d-subtext)" }}>
        {label}
      </span>
    </div>
  );
}

export function Note({ title, children }) {
  return (
    <aside
      className="not-prose my-8 rounded-lg border px-5 py-4"
      style={{ borderColor: "var(--d-border)", backgroundColor: "var(--d-surface)" }}
    >
      {title ? <p className="eyebrow">{title}</p> : null}
      <div className="serif mt-2 text-base sm:text-lg leading-relaxed font-light" style={{ color: "var(--d-subtext)" }}>
        {children}
      </div>
    </aside>
  );
}

export const mdxComponents = { Figure, Outcomes, Outcome, Note };
