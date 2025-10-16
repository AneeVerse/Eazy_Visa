import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Webhook secret for security (optional but recommended)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    // Verify webhook secret if configured
    if (WEBHOOK_SECRET) {
      const authHeader = request.headers.get('authorization');
      const providedSecret = authHeader?.replace('Bearer ', '');
      
      if (providedSecret !== WEBHOOK_SECRET) {
        console.log('Webhook authentication failed');
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Parse the webhook payload
    const body = await request.json();
    
    // Log the webhook trigger for debugging
    console.log('Sanity webhook triggered:', {
      type: body._type,
      id: body._id,
      slug: body.slug?.current,
      timestamp: new Date().toISOString()
    });

    // Check if this is a blog post or category change
    if (body._type === 'post' || body._type === 'category') {
      
      // Trigger sitemap regeneration
      await regenerateSitemap();
      
      // Revalidate relevant paths
      if (body._type === 'post' && body.slug?.current) {
        // Revalidate the specific blog post page
        revalidatePath(`/blogs/${body.slug.current}`);
        console.log(`Revalidated blog post: /blogs/${body.slug.current}`);
      }
      
      // Revalidate the blogs listing page
      revalidatePath('/blogs');
      
      // Revalidate the home page (in case it shows recent blogs)
      revalidatePath('/');
      
      console.log('Sitemap regeneration and cache revalidation completed');
      
      return NextResponse.json({
        success: true,
        message: 'Sitemap updated and cache revalidated',
        timestamp: new Date().toISOString(),
        type: body._type,
        slug: body.slug?.current
      });
    }

    // If it's not a relevant content type, still return success
    return NextResponse.json({
      success: true,
      message: 'Webhook received but no action needed',
      type: body._type
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Function to regenerate sitemap
async function regenerateSitemap() {
  try {
    // In serverless environment, we'll trigger revalidation of the sitemap endpoint
    // This will cause Next.js to regenerate the sitemap on the next request
    const { revalidatePath } = require('next/cache');
    
    // Revalidate the sitemap path to force regeneration
    revalidatePath('/sitemap.xml');
    
    console.log('Sitemap revalidation triggered successfully');
    
    // Optionally, we can also call our sitemap API endpoint to generate it immediately
    try {
      const sitemapResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eazyvisas.com'}/api/sitemap`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Webhook-Sitemap-Generator'
        }
      });
      
      if (sitemapResponse.ok) {
        console.log('Sitemap generated successfully via API');
      } else {
        console.warn('Sitemap API call failed, but revalidation was triggered');
      }
    } catch (fetchError) {
      console.warn('Could not fetch sitemap API, but revalidation was triggered:', fetchError.message);
    }
    
  } catch (error) {
    console.error('Error regenerating sitemap:', error);
    throw error;
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({
    message: 'Sanity webhook endpoint is active',
    timestamp: new Date().toISOString(),
    methods: ['POST']
  });
}