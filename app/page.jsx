import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { GithubCircle, Linkedin, X, Youtube } from "iconoir-react";

export default function Home() {
  return (
    <>
      <Header sticky />
      <section className="flex flex-col items-center p-8 my-24 md:my-2 md:mt-8">
        <div className="flex flex-col items-center m-auto text-neutral-900 dark:text-white">
          <h1 className="text-4xl text-center font-bold">
            Hello,{"  "}I'm Andrew!
          </h1>
          <h2 className="font-light text-xl p-4 text-neutral-700 dark:text-neutral-200 dark:font-medium">
            Product Designer | Engineer
          </h2>
          <div className="flex space-x-4 pt-2">
            <Link
              className="p-2 hover:bg-zinc-800 hover:text-zinc-100 dark:text-neutral-400 dark:hover:bg-neutral-800 rounded"
              href="https://twitter.com/MrPaxson"
            >
              <X />
            </Link>
            <Link
              className="p-2 hover:bg-zinc-800 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-zinc-100 rounded"
              href="https://github.com/paxsonsa"
            >
              <GithubCircle />
            </Link>
            <Link
              className="p-2 hover:bg-zinc-800 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-zinc-100 rounded"
              href="https://www.linkedin.com/in/andrewpaxson"
            >
              <Linkedin />
            </Link>
            <Link
              className="p-2 hover:bg-zinc-800 dark:text-neutral-400 dark:hover:bg-neutral-800 hover:text-zinc-100 rounded"
              href="https://www.youtube.com/channel/UCl1JA8NsoeGxRGHxE8Z0T9Q"
            >
              <Youtube />
            </Link>

          </div>
        </div>
      </section>
      <div className="md:justify-center md:items-start md:max-w-screen-md md:m-auto">
        <Section
          title="I build products that help creative teams be better."
          content={
            <>
              I'm a product designer and software engineer with over a decade
              experience building things for creative teams. I am currently a
              Staff Engineer at{" "}
              {
                <Link
                  className="font-semibold hover:underline"
                  href="https://ilm.com"
                >
                  Industrial Light & Magic
                </Link>
              }
              , where I have led the design and engineering of multiple products
              that improve creative workflows and teams by making them more
              collaborative, global, and focused on what they do best, creating.
            </>
          }
        />
        <Section
          title="Experience building from concept to deployment"
          content={
            <>
              I have a unique skillset and experience as a designer doubling as
              a software engineer. I have designed and written low-level systems
              such as software build, distribution and packaging systems to
              higher level tooling for creative workflows and UIs for artists.
              This has given me the ability to take a product from conception to
              full deployment and evolution by directly participating the entire
              process from top to bottom; This includes getting my hands dirty
              with code, coordinating infrastruture, strategy and business
              design with leadership, and interacting with users and
              stakeholders to ensure the product is always exactly what they
              need.
            </>
          }
        />
        <Section
          title="I lead global teams to succcess"
          content={
            <>
              I am responsible for leading a small global team of engineers and
              designers to build and maintain a critical suite of products that
              are used by artists and production teams to share and manage data
              (images, 3D models, files, etc) across the globe. This requires me
              communicate and coordinate with a large number stakeholders to
              ensure our product suite is always meeting the needs of the studio
              and artists.
            </>
          }
        />
      </div>
      <Footer />
    </>
  );
}

function Section({ title, content }) {
  return (
    <section className="flex flex-col justify-center text-center items-center my-12 md:my-2 flex-1">
      <div className="flex flex-col justify-center items-center m-auto p-8 space-y-4">
        <h3 className="text-xl font-semibold dark:font-bold dark:text-neutral-50">
          {title}
        </h3>
        <p className="text-lg dark:font-light dark:text-neutral-100">
          {content}
        </p>
      </div>
    </section>
  );
}
