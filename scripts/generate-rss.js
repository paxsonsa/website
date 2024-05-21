const fs = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');



// Modify site url to: https://andrewpaxson.com
// Modify feed url to: https://andrewpaxson.com/rss.xml

const generateRSS = () => {
  const postDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postDirectory);

  const feed = new RSS({
    title: 'Design + Dev Blog',
    description: 'A blog about design and development by Andrew Paxson.',
    site_url: `https://ap-demo.michellef.dev`,
    feed_url: `https://ap-demo.michellef.dev/rss.xml`,
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

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
};

generateRSS();
