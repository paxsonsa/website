import Link from "next/link";

import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header activePage="about" />
      <section>
        <h1 className="text-neutral-700 font-mono font-bold text-2xl pt-8 pb-4">
          👋🏻 Hi, I'm Andrew
        </h1>
        <h2 className="text-neutral-500 text-lg pb-6 font-mono">
          I like to build things that empower creativity
        </h2>
        <p>
          I am a Product Designer with a decade of experience, currently working
          as a Staff Engineer at Industrial Light & Magic, where I apply my
          design skills to engineer pioneering tools and systems that enhance
          creative workflows. My passion and approach are deeply rooted in
          product design and engineering, focusing on creating intuitive and
          feasible solutions that empower creatives. My role involves leading
          the Core Pipeline Data Team, driving the design and engineering of
          collaborative tools for global filmmaking processes. Outside of work,
          I am passionate about astrophotography, a fervent supporter of
          Liverpool FC (#YNWA), and take great pride in being a husband and
          father. With over a decade of experience in crafting tools for
          creative teams, I am committed to improving the creative experience
          through innovation and design.
        </p>
      </section>
    </>
  );
}
