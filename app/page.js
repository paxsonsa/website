import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'

export default function Home() {
  const postDirectory = "posts";

  const posts = fs. readdirSync(path.join(postDirectory));

  const blogs = posts.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(postDirectory, filename), "utf-8");
    const { data:frontMatter } = matter(markdownWithMeta);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });

  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold">
        My Blogging Site
      </h1>


      <section className='py-10'>
        <h2 className='text-2xl font-bold'>
          Latest Blogs
        </h2>

        <div className='py-2'>
          {blogs.map(blog => (
            <Link href={'/blog/' + blog.slug} passHref key={blog.slug}>
              <div className='py-2 flex justify-between align-middle gap-2'>
                  <div>
                      <h3 className="text-lg font-bold">{blog.meta.title}</h3>
                      <p className="text-gray-400">{blog.meta.description}</p>
                  </div>
                  <div className="my-auto text-gray-400">
                      <p>{blog.meta.date}</p>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

