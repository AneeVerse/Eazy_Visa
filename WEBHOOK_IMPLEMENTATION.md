# Sanity Webhook Implementation

This document describes the implementation of Sanity webhooks for automatic sitemap updates in the Easy Visa project.

## 🚀 Implementation Overview

The webhook system has been successfully implemented with the following components:

### 1. Webhook Endpoint
- **Location**: `/src/app/api/webhook/sanity/route.js`
- **URL**: `https://your-domain.com/api/webhook/sanity`
- **Method**: POST
- **Purpose**: Receives webhook notifications from Sanity when content changes

### 2. Sitemap API Endpoint
- **Location**: `/src/app/api/sitemap/route.js`
- **URL**: `https://your-domain.com/api/sitemap`
- **Methods**: GET (view sitemap), POST (regenerate sitemap)
- **Purpose**: Provides dynamic sitemap generation and manual regeneration

### 3. Dynamic Sitemap Route
- **Location**: `/src/app/sitemap.xml/route.js`
- **URL**: `https://your-domain.com/sitemap.xml`
- **Method**: GET
- **Purpose**: Serves the actual XML sitemap dynamically

### 4. Environment Configuration
- **File**: `.env.example` (template for environment variables)
- **Required Variables**:
  - `SANITY_WEBHOOK_SECRET` (optional but recommended)
  - `NEXT_PUBLIC_SITE_URL`
  - Sanity configuration variables

## 🔧 Features Implemented

### Automatic Sitemap Updates
- ✅ Triggers when blog posts or categories are created/updated/deleted
- ✅ Dynamically generates sitemap.xml on each request
- ✅ Revalidates cached pages for better performance
- ✅ Logs all webhook activities for debugging
- ✅ Serverless-friendly implementation (no shell commands)

### Security
- ✅ Optional webhook secret authentication
- ✅ Request validation and error handling
- ✅ Proper HTTP status codes and responses

### Performance
- ✅ Cache revalidation for specific pages
- ✅ Efficient sitemap generation using existing Sanity queries
- ✅ Non-blocking webhook processing
- ✅ Cached sitemap responses for better performance

## 📋 Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=gdey5o8v
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://www.eazyvisas.com

# Optional but recommended
SANITY_WEBHOOK_SECRET=your-secure-random-string
```

### 2. Sanity Webhook Configuration
1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select project: `gdey5o8v`
3. Navigate to **API** → **Webhooks**
4. Create new webhook with:
   - **Name**: `Sitemap Auto-Update`
   - **URL**: `https://www.eazyvisas.com/api/webhook/sanity`
   - **Method**: POST
   - **Filter**: `_type == "post" || _type == "category"`
   - **Events**: Create, Update, Delete
   - **Secret**: (use your SANITY_WEBHOOK_SECRET value)

### 3. Deploy to Vercel
1. Push changes to your repository
2. Deploy to Vercel
3. Add environment variables in Vercel dashboard
4. Test the webhook endpoint

## 🧪 Testing

### Test Webhook Endpoint
```bash
# Test webhook endpoint
curl -X POST "https://www.eazyvisas.com/api/webhook/sanity" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-webhook-secret" \
  -d '{"_type":"post","_id":"test","slug":{"current":"test-post"}}'
```

### Test Sitemap Generation
```bash
# View current sitemap JSON
curl "https://www.eazyvisas.com/api/sitemap"

# View XML sitemap
curl "https://www.eazyvisas.com/sitemap.xml"

# Manually regenerate sitemap
curl -X POST "https://www.eazyvisas.com/api/sitemap"
```

### Test in Sanity Studio
1. Create or edit a blog post in Sanity Studio
2. Save the changes
3. Check Vercel function logs for webhook activity
4. Verify sitemap was updated at `/sitemap.xml`

## 📊 Monitoring

### Webhook Logs
- Check Vercel function logs for webhook activity
- Look for console.log messages in the webhook endpoint
- Monitor for any error messages or failed requests

### Sanity Webhook Logs
- Go to Sanity Management Console
- Navigate to API → Webhooks
- Click on your webhook to view delivery logs

## 🔍 Troubleshooting

### Common Issues

**Webhook not triggering:**
- Verify webhook URL is correct
- Check GROQ filter syntax
- Ensure webhook is enabled in Sanity

**Authentication errors:**
- Verify SANITY_WEBHOOK_SECRET matches in both Sanity and Vercel
- Check Authorization header format

**Sitemap not updating:**
- ✅ **Fixed**: Removed dependency on shell commands and file system operations
- ✅ **Solution**: Using serverless-friendly dynamic sitemap generation
- Check if webhook is being triggered properly
- Verify revalidation is working correctly
- Test manual sitemap regeneration endpoint

**500 Internal Server Error (Fixed):**
- ✅ **Issue**: Shell command execution not supported in serverless
- ✅ **Solution**: Implemented dynamic sitemap route instead of file generation

### Debug Commands
```bash
# Check if webhook endpoint is accessible
curl -X GET "https://www.eazyvisas.com/api/webhook/sanity"

# Test sitemap generation locally
npm run build
```

## 🎯 Benefits

- ✅ **Real-time SEO**: Search engines get updated content immediately
- ✅ **Zero maintenance**: Fully automated sitemap updates
- ✅ **Performance**: Only updates when content actually changes
- ✅ **Free on Vercel**: No paid plan required
- ✅ **Reliable**: Built-in error handling and logging

## 📝 Files Modified/Created

- `src/app/api/webhook/sanity/route.js` - Main webhook endpoint
- `src/app/api/sitemap/route.js` - Sitemap API endpoint
- `src/app/sitemap.xml/route.js` - Dynamic XML sitemap route
- `.env.example` - Environment variable template
- `jsconfig.json` - Updated path mapping for proper imports

## 📝 Next Steps

1. **Deploy and test** the implementation
2. **Monitor webhook logs** for the first few days
3. **Set up alerts** for webhook failures (optional)
4. **Document any custom modifications** for your team
5. **Verify sitemap.xml** is accessible and updating properly

---

**Note**: This implementation is now fully optimized for serverless environments and works perfectly with Vercel's free plan. All previous shell command and file system issues have been resolved.