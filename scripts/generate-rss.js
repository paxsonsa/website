const fs = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

const siteUrl = 'https://andrewpaxson.com'

process.env.TZ = 'America/Los_Angeles'; 

const generateRSS = () => {
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

    if (!data.hidden) {
      const pubDate = new Date(data.date);  
      feed.item({
        title: data.title,
        description: data.description,
        url: `${siteUrl}/articles/${filename.replace('.mdx', '')}`,
        date: pubDate.toISOString(),  
      });
    }
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(process.cwd(), 'out', 'rss.xml'), rss);
};

generateRSS();
