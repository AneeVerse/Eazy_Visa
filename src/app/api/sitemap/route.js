import { NextResponse } from 'next/server';
import { getAllBlogs } from '../../../lib/sanity';

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
    
    return NextResponse.json(
      { 
        error: 'Failed to generate sitemap',
        message: error.message 
      },
      { status: 500 }
    );
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

// Handle POST requests for manual sitemap regeneration
export async function POST() {
  try {
    // In serverless environment, we can't run shell commands
    // Instead, we'll trigger cache revalidation and return the generated sitemap
    const { revalidatePath } = require('next/cache');
    
    // Revalidate the sitemap path
    revalidatePath('/sitemap.xml');
    
    // Generate and return the sitemap content
    const blogs = await getAllBlogs();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eazyvisas.com';
    const sitemap = generateSitemapXML(baseUrl, blogs);
    
    return NextResponse.json({
      success: true,
      message: 'Sitemap regenerated successfully',
      timestamp: new Date().toISOString(),
      sitemapLength: sitemap.length
    });
    
  } catch (error) {
    console.error('Error regenerating sitemap:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to regenerate sitemap',
        message: error.message 
      },
      { status: 500 }
    );
  }
}