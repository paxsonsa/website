import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import matter from 'gray-matter';

const siteUrl = process.env.SITE_URL;

export async function getServerSideProps({ res }) {
  const postDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postDirectory);

  const feed = new RSS({
    title: 'Design + Dev Blog', 
    description: 'A blog about design and development by Andrew Paxson.', 
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
  });

  filenames.forEach((filename) => {
    const filePath = path.join(postDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    feed.item({
      title: data.title,
      description: data.description,
      url: `${siteUrl}/articles/${filename.replace('.mdx', '')}`,
      date: data.date,
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}

export default function RssPage() {
  return null;
}
