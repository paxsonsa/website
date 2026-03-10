import Link from "next/link";

const concepts = [
  {
    id: "dialogue",
    number: "01",
    title: "Dialogue",
    description: "Conversational, personal. Types 'Hi, I'm Andrew' then reveals the rest. Brighter accent, breathing feel, socials at top.",
    mood: "Human, warm, alive",
    palette: "Off-white + vibrant cyan",
  },
  {
    id: "light-table",
    number: "02",
    title: "Light Table",
    description: "Cinematic VFX workspace. Boot-up animation, frosted glass, film grain, timecodes. Fixed layer labels on work cards.",
    mood: "Cinematic, atmospheric",
    palette: "Dark + amber/cyan",
  },
  {
    id: "signals",
    number: "03",
    title: "Network",
    description: "Interconnected node graph as background atmosphere. Clean scrolling content, network fades as you go deeper. Socials at top.",
    mood: "Connected, technical",
    palette: "Dark navy + blue/gold",
  },
];

export default function ConceptsIndex() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-3">
          Website Concepts — Round 5
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Pick a direction
        </h1>
        <p className="text-lg text-neutral-400 mb-12">
          3 concepts. Click to view.
        </p>

        <div className="space-y-4">
          {concepts.map((concept) => (
            <Link
              key={concept.id}
              href={`/concepts/${concept.id}`}
              className="group block border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 hover:bg-neutral-900/50 transition-all duration-200"
            >
              <div className="flex items-start gap-6">
                <span className="text-3xl font-mono text-neutral-700 group-hover:text-neutral-400 transition-colors shrink-0">
                  {concept.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-semibold group-hover:text-white transition-colors">
                      {concept.title}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                      {concept.palette}
                    </span>
                    {concept.isNew && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-teal-900/50 text-teal-400 uppercase tracking-wider font-mono">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-400 text-sm mb-2">
                    {concept.description}
                  </p>
                  <span className="text-xs uppercase tracking-wider text-neutral-600">
                    {concept.mood}
                  </span>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-1 transition-all text-lg">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
