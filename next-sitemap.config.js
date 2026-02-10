const { getAllBlogs } = require('./src/lib/sanity');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.eazyvisas.com',
  generateRobotsTxt: false, // We manage robots.txt manually to include AI bot rules
  sitemapSize: 5000,
  outDir: './public', // Output directory for sitemap
  generateIndex: false, // do not generate index, output only sitemap.xml
  additionalPaths: async (config) => {
    // Fetch all blog posts from Sanity
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
      loc: `/blogs/${blog.slug.current}`,
      lastmod: blog.publishedAt,
      changefreq: 'daily',
      priority: 0.7,
    }));
  },
}; 