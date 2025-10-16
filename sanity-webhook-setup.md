# Sanity Webhook Setup Guide

This guide explains how to set up Sanity webhooks to automatically trigger sitemap updates when your blog content changes.

## 🎯 Overview

## 📁 What's Included

Your project now has these essential files for the Sanity webhook solution:

- `src/app/api/webhook/sanity/route.js` - Webhook endpoint that receives Sanity updates
- `src/app/sitemap.xml/route.js` - Dynamic sitemap generator
- `sanity-webhook-setup.md` - Detailed webhook configuration guide

## 🔧 Setup Steps

### 1. Access Sanity Management Console

1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select your project: `gdey5o8v`
3. Navigate to **API** → **Webhooks**

### 2. Create New Webhook

Click **"Create webhook"** and configure:

**Basic Settings:**
- **Name**: `Sitemap Auto-Update`
- **Description**: `Automatically update sitemap when blog content changes`

**URL Configuration:**
- **URL**: `https://www.jmvisaservices.com/api/webhook/sanity`
- **Method**: `POST`

**Trigger Configuration:**
- **Dataset**: `production`
- **Filter**: 
  ```groq
  _type == "post" || _type == "category"
  ```

**HTTP Headers** (Optional but recommended):
```
Content-Type: application/json
User-Agent: Sanity-Webhook/1.0
```

**Secret** (Optional but recommended):
- Generate a secure secret token
- Add it as `SANITY_WEBHOOK_SECRET` in your Vercel environment variables

### 3. Configure Webhook Events

Select the following events to trigger the webhook:

- ✅ **Create** - When new posts/categories are created
- ✅ **Update** - When posts/categories are updated
- ✅ **Delete** - When posts/categories are deleted

### 4. Test the Webhook

After creating the webhook:

1. **Test Connection**: Use Sanity's built-in test feature
2. **Create Test Content**: Add a new blog post in Sanity Studio
3. **Verify Response**: Check that the webhook receives a 200 OK response
4. **Check Sitemap**: Visit `https://www.jmvisaservices.com/sitemap.xml` to verify updates

## 🔍 Webhook Payload Example

When content changes, Sanity sends a payload like this:

```json
{
  "_type": "post",
  "_id": "drafts.post-123",
  "_rev": "abc123",
  "slug": {
    "current": "my-new-blog-post"
  },
  "title": "My New Blog Post",
  "publishedAt": "2024-01-15T10:00:00Z",
  "_updatedAt": "2024-01-15T10:30:00Z"
}
```

## 🛠️ Environment Variables

Add these to your Vercel project:

```bash
# Optional: Webhook security
SANITY_WEBHOOK_SECRET=your-secure-secret-token

# Sanity credentials (if not already set)
SANITY_PROJECT_ID=gdey5o8v
SANITY_DATASET=production
SANITY_API_VERSION=2024-03-13
```

## 📊 Monitoring Webhook Activity

### In Sanity Console:
1. Go to **API** → **Webhooks**
2. Click on your webhook
3. View **Delivery Log** to see recent triggers

### In Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Functions** tab
4. Check logs for `/api/webhook/sanity`

## 🔧 Troubleshooting

### Common Issues:

**1. Webhook not triggering:**
- Check the GROQ filter syntax
- Verify the webhook URL is correct
- Ensure the webhook is enabled

**2. 500 errors in webhook:**
- Check Vercel function logs
- Verify environment variables are set
- Test the endpoint manually

**3. Sitemap not updating:**
- Check if revalidation is working
- Verify the sitemap endpoint is accessible
- Test manual sitemap generation

### Debug Commands:

```bash
# Test webhook endpoint manually
curl -X POST "https://www.jmvisaservices.com/api/webhook/sanity" \
  -H "Content-Type: application/json" \
  -d '{"_type":"post","_id":"test","slug":{"current":"test"}}'

# Check sitemap directly
curl "https://www.jmvisaservices.com/sitemap.xml"
```

## 🎯 Benefits of Webhook Approach

- ✅ **Real-time updates** - Sitemap updates immediately when content changes
- ✅ **Free on Vercel** - No paid plan required
- ✅ **Efficient** - Only updates when needed, not on schedule
- ✅ **Automatic** - No manual intervention required
- ✅ **SEO friendly** - Search engines get fresh content faster

## 🔄 Alternative: Manual Webhook Testing

If you want to test without changing content:

1. Go to Sanity Studio
2. Edit any blog post (make a small change)
3. Save the post
4. Check Vercel function logs
5. Verify sitemap was updated

## 📝 Next Steps

After setting up the webhook:

1. **Test thoroughly** with different content types
2. **Monitor webhook delivery logs** for the first few days
3. **Set up alerts** if webhook failures occur frequently
4. **Document the process** for your team

---

**Note**: This webhook approach works perfectly with Vercel's free plan and provides real-time sitemap updates without requiring cron jobs or paid features.
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Webhook handler for Sanity content changes
export async function POST(request) {
  try {
    // Verify webhook signature (optional but recommended)
    const signature = request.headers.get('sanity-webhook-signature');
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      // Verify the signature matches (implement signature verification if needed)
      console.log('🔐 Webhook signature verification (implement if needed)');
    }
    
    // Get the webhook payload
    const body = await request.json();
    
    console.log('📡 Received Sanity webhook:', {
      type: body._type,
      id: body._id,
      operation: body.operation || 'unknown'
    });
    
    // Check if this is a relevant content type that should trigger sitemap update
    const relevantTypes = ['post', 'category'];
    
    if (body._type && relevantTypes.includes(body._type)) {
      console.log('🔄 Triggering sitemap revalidation for content type:', body._type);
      
      // Revalidate the sitemap route to force regeneration
      revalidatePath('/sitemap.xml');
      
      // Also revalidate blog pages if it's a post
      if (body._type === 'post') {
        revalidatePath('/blog');
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`);
        }
      }
      
      // Revalidate category pages if it's a category
      if (body._type === 'category') {
        if (body.slug?.current) {
          revalidatePath(`/blog/category/${body.slug.current}`);
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Sitemap revalidated for ${body._type} change`,
        timestamp: new Date().toISOString(),
        revalidated: ['/sitemap.xml']
      });
    }
    
    // If not a relevant content type, just acknowledge
    return NextResponse.json({
      success: true,
      message: 'Webhook received but no action needed',
      timestamp: new Date().toISOString(),
      contentType: body._type
    });
    
  } catch (error) {
    console.error('❌ Error processing Sanity webhook:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook verification
export async function GET() {
  return NextResponse.json({
    message: 'Sanity webhook endpoint is active',
    timestamp: new Date().toISOString(),
    supportedMethods: ['POST'],
    contentTypes: ['post', 'category']
  });
}

import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Sanity client configuration
const sanityClient = createClient({
  projectId: 'gdey5o8v',
  dataset: 'production',
  apiVersion: '2024-03-13',
  useCdn: false,
});

// Configuration
const CONFIG = {
  baseUrl: 'https://www.jmvisaservices.com',
};

// Function to fetch blog posts from Sanity
async function fetchBlogPosts() {
  try {
    const posts = await sanityClient.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        _updatedAt,
        publishedAt
      }
    `);
    
    return posts.map(post => ({
      url: `${CONFIG.baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.7
    }));
  } catch (error) {
    console.error(`Error fetching blog posts: ${error.message}`);
    return [];
  }
}

// Function to fetch categories from Sanity
async function fetchCategories() {
  try {
    const categories = await sanityClient.fetch(`
      *[_type == "category"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    
    return categories.map(category => ({
      url: `${CONFIG.baseUrl}/blog/category/${category.slug}`,
      lastModified: new Date(category._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6
    }));
  } catch (error) {
    console.error(`Error fetching categories: ${error.message}`);
    return [];
  }
}

// Static URLs configuration
function getStaticUrls() {
  return [
    {
      url: CONFIG.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${CONFIG.baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/study-abroad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/work-visa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/tourist-visa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/business-visa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/residence-visa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/overseas-education`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/dummy-ticket-booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/english-proficiency-test`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/foreign-exchange`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/passport-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/services/us-interview-dates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Country pages
    {
      url: `${CONFIG.baseUrl}/country/Oceania/Australia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Oceania/New%20Zealand`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/NorthAmerica/United%20States`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/NorthAmerica/Canada`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/United%20Kingdom`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Ireland`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Austria`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Belgium`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Denmark`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Finland`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/France`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Germany`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/country/Europe/Greece`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/franchise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${CONFIG.baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${CONFIG.baseUrl}/terms-and-condition`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${CONFIG.baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}

// Function to generate sitemap XML content
function generateSitemapXML(urls) {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urlEntries = urls.map(url => {
    const lastmod = url.lastModified ? url.lastModified.toISOString() : new Date().toISOString();
    const changefreq = url.changeFrequency || 'monthly';
    const priority = url.priority || 0.5;
    
    return `  <url>
    <loc>${url.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  return `${xmlHeader}
${urlsetOpen}
${urlEntries}
${urlsetClose}`;
}

// API Route Handler for sitemap.xml
export async function GET() {
  try {
    // Get static URLs
    const staticUrls = getStaticUrls();
    
    // Fetch dynamic content from Sanity
    const [blogPosts, categories] = await Promise.all([
      fetchBlogPosts(),
      fetchCategories()
    ]);
    
    // Combine all URLs
    const allUrls = [...staticUrls, ...blogPosts, ...categories];
    
    // Generate XML content
    const sitemapXML = generateSitemapXML(allUrls);
    
    // Return XML response with proper headers
    return new NextResponse(sitemapXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
    
  } catch (error) {
    console.error(`Error generating sitemap: ${error.message}`);
    
    // Return a basic sitemap with just the homepage if there's an error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${CONFIG.baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes on error
      },
    });
  }
}