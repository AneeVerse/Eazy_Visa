import { getAllBlogs } from '../../lib/sanity';

export async function GET() {
  try {
    // Fetch all blog posts from Sanity
    const blogs = await getAllBlogs();
    
    // Base URL for the site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eazyvisas.com';
    
    // Generate sitemap XML
    const sitemap = generateSitemapXML(baseUrl, blogs);
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic sitemap if there's an error
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eazyvisas.com';
    const basicSitemap = generateBasicSitemap(baseUrl);
    
    return new Response(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      }
    });
  }
}

function generateSitemapXML(baseUrl, blogs) {
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/countries', priority: '0.9', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/tourist-visa', priority: '0.8', changefreq: 'weekly' },
    { url: '/services/dummy-flight', priority: '0.8', changefreq: 'weekly' },
    { url: '/services/dummy-hotel', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/blogs', priority: '0.8', changefreq: 'daily' }
  ];

  const currentDate = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add blog posts
  blogs.forEach(blog => {
    const lastmod = blog.publishedAt || blog._updatedAt || currentDate;
    xml += `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug.current}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

function generateBasicSitemap(baseUrl) {
  const currentDate = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/countries</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blogs</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
}