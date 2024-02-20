import Link from "next/link";

import Header from "../components/Header";

export default function Home() {
  const skills = [
    "Product Design",
    "Systems Design",
    "3D & Realtime Graphics",
    "Visual Effects & Animation",
    "Platform Systems (Software Distribution, Packaging Systems, Release/Testing)",
    "Distributed Systems (Event Sourcing, CQRS, Multi-DC, Rendering, ETL)",
    "Fullstack",
    "Kubernetes",
    "Hybrid Cloud",
    "Python",
    "Rust",
    "Golang",
    "Swift",
    "C/C++",
    "Elixir",
    "Javascript/Typescript",
    "Postgres/MySQL",
    "Redis",
    "ScyllaDB",
    "Elasticsearch",
    "Ansible",
  ];

  return (
    <>
      <Header activePage="about" />
      <section>
        <h1 className="text-neutral-800 dark:text-zinc-100 font-bold text-2xl pt-8">
          <span className="pr-4">👋🏻</span>Hi, I'm Andrew
        </h1>
        <h2 className="text-neutral-700 dark:text-zinc-200 text-lg font-medium pt-4">
          I like to build things that empower creativity
        </h2>
        <p className="dark:text-zinc-300 pt-8">
          I am a Product Designer with over a decade of experience crafting
          tools and systems for creative teams. I am currently working as a
          Staff Engineer at Industrial Light & Magic, where I have led the
          design and engineering of multiple products that enhance creative
          workflows and developer experience. I have unique skillset as designer
          having built large services from the ground up, designed and
          maintained developer platforms, and created UIs and systems for
          artists. This gives me the ability to take a product from conception
          to full deployment and evolution by being a individual contributor in
          every part of a project. My approach is to create product experiences
          that get out of the way of the users by focusing on designing useful
          solutions that empower the creative process. My current role involves
          leading a team of engineers and designers, interacting with users and
          leadership teams, and driving the design and engineering of our global
          creative processes and systems. Outside of work, I am passionate about
          astrophotography, a fervent supporter of Liverpool FC (#YNWA), and
          take great pride in being a husband and father. I am always open for
          new opportunities and networking! Feel free to reach out to me on
          social!
        </p>
        <h2 className="text-neutral-700 dark:text-zinc-100 text-lg pt-8 font-medium">
          Skills and Knowledge
        </h2>
        <p className="text-sm pt-2 pb-4 dark:text-zinc-200">
          Everything listed I have direct production experience and expertise
          with.
        </p>
        {skills.map((skill) => (
          <span>
            <span className="border border-transparent hover:border-b-neutral-500 dark:text-zinc-300">
              {skill}
            </span>
            <span>{", "}</span>
          </span>
        ))}
      </section>
    </>
  );
}
