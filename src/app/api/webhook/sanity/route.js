import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import { webhookRetryOperations, CircuitBreaker } from './retry.js';

// Create a circuit breaker for sitemap operations
const sitemapCircuitBreaker = new CircuitBreaker(3, 30000); // 3 failures, 30 second timeout

// Webhook secret for security (optional but recommended)
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request) {
  const startTime = Date.now();
  
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    
    // Verify webhook secret if configured
    if (process.env.SANITY_WEBHOOK_SECRET) {
      const signature = request.headers.get('sanity-webhook-signature');
      
      if (!signature) {
        console.error('Missing webhook signature');
        return NextResponse.json(
          { error: 'Missing webhook signature' },
          { status: 401 }
        );
      }
      
      // Verify the signature (basic implementation)
      const expectedSignature = `sha256=${crypto
        .createHmac('sha256', process.env.SANITY_WEBHOOK_SECRET)
        .update(body)
        .digest('hex')}`;
      
      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        );
      }
    }
    
    // Parse the webhook payload
    const payload = await webhookRetryOperations.parseWebhookPayload(body);
    
    console.log('Webhook received:', {
      type: payload._type,
      id: payload._id,
      slug: payload.slug?.current,
      timestamp: new Date().toISOString()
    });
    
    // Handle different content types
    if (payload._type === 'post' || payload._type === 'category') {
      // Import revalidatePath at the top level for better performance
      const { revalidatePath } = require('next/cache');
      
      // Perform revalidation with retry logic
       try {
         // Always revalidate these paths with retry
         await webhookRetryOperations.revalidatePath(revalidatePath, '/', 'page');
         await webhookRetryOperations.revalidatePath(revalidatePath, '/blogs', 'page');
         
         // If it's a specific post, revalidate that post's page
         if (payload._type === 'post' && payload.slug?.current) {
           await webhookRetryOperations.revalidatePath(revalidatePath, `/blogs/${payload.slug.current}`, 'page');
         }
         
         // Revalidate sitemap
         await webhookRetryOperations.revalidatePath(revalidatePath, '/sitemap.xml', 'page');
         
         console.log('Cache revalidation completed with retry protection');
       } catch (revalidationError) {
         console.warn('Revalidation failed after retries:', revalidationError.message);
         // Continue processing even if revalidation has issues
       }
      
      // Trigger sitemap regeneration with circuit breaker protection
       sitemapCircuitBreaker.execute(
         () => regenerateSitemap(),
         { operation: 'sitemap_regeneration', type: payload._type, slug: payload.slug?.current }
       ).catch(error => {
         console.warn('Sitemap regeneration failed with circuit breaker:', error.message);
       });
      
      const processingTime = Date.now() - startTime;
      
      console.log('Webhook processed successfully:', {
        type: payload._type,
        slug: payload.slug?.current,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({
        success: true,
        message: 'Content updated and cache revalidated',
        timestamp: new Date().toISOString(),
        type: payload._type,
        slug: payload.slug?.current,
        processingTime: `${processingTime}ms`
      });
    }
    
    // For other content types, just acknowledge quickly
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      message: 'Webhook received but no action taken',
      timestamp: new Date().toISOString(),
      type: payload._type,
      processingTime: `${processingTime}ms`
    });
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Webhook error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString(),
        processingTime: `${processingTime}ms`
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
    revalidatePath('/sitemap.xml', 'page');
    
    console.log('Sitemap revalidation triggered successfully');
    
    // Optionally, we can also call our sitemap API endpoint to generate it immediately
    // But we'll do this asynchronously to not block the webhook response
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eazyvisas.com';
    
    try {
      const sitemapResponse = await webhookRetryOperations.fetchSitemap(`${baseUrl}/api/sitemap`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Webhook-Sitemap-Generator',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (sitemapResponse.ok) {
        console.log('Sitemap generated successfully via API with retry protection');
      } else {
        console.warn('Sitemap API call failed after retries, but revalidation was triggered');
      }
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        console.warn('Sitemap API call timed out after retries, but revalidation was triggered');
      } else {
        console.warn('Could not fetch sitemap API after retries, but revalidation was triggered:', fetchError.message);
      }
    }
    
  } catch (error) {
    console.error('Error regenerating sitemap:', error);
    // Don't throw the error - we want the webhook to succeed even if sitemap fails
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